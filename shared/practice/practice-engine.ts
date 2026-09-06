import type { PracticeBank, PracticeQuestion, PracticeSet } from "./practice-model";
import { isPracticeQuestionReadyForStudents } from "./practice-model";

export type PracticeAnswerRecord = {
  optionId: string;
  answeredAt: number;
};

export type PracticeSession = {
  schemaVersion: "1.0";
  kind: "practice-session";
  id: string;
  setId: string;
  skillId: string;
  questionIds: string[];
  answers: Record<string, PracticeAnswerRecord>;
  seed: string;
  startedAt: number;
  updatedAt: number;
  completedAt?: number;
};

export type PracticeQuestionResult = {
  questionId: string;
  selectedOptionId: string;
  correctOptionId: string;
  correct: boolean;
};

export type PracticeSessionResult = {
  sessionId: string;
  setId: string;
  skillId: string;
  questionCount: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  questions: PracticeQuestionResult[];
};

export function selectFreshPracticeQuestionIds(
  bank: PracticeBank,
  setId: string,
  options: {
    count?: number;
    excludedQuestionIds?: ReadonlySet<string>;
    seed?: string;
  } = {},
): string[] {
  const set = getReadySet(bank, setId);
  const count = options.count ?? set.roundSize;
  if (!Number.isInteger(count) || count < 1 || count > set.roundSize) {
    throw new Error(`practice question count must be between 1 and ${set.roundSize}`);
  }

  const excluded = options.excludedQuestionIds ?? new Set<string>();
  const eligible = set.questionIds.filter((questionId) => !excluded.has(questionId));
  if (eligible.length < count) {
    throw new Error(`practice set ${setId} does not have ${count} fresh questions after exclusions`);
  }

  const seed = options.seed ?? `${setId}:default`;
  const offset = stableHash(seed) % eligible.length;
  const rotated = eligible.slice(offset).concat(eligible.slice(0, offset));
  return rotated.slice(0, count);
}

export function createPracticeSession(
  bank: PracticeBank,
  options: {
    setId: string;
    sessionId: string;
    now: number;
    seed?: string;
    excludedQuestionIds?: ReadonlySet<string>;
  },
): PracticeSession {
  requireText(options.sessionId, "sessionId");
  requireTimestamp(options.now, "now");
  const set = getReadySet(bank, options.setId);
  const seed = options.seed ?? options.sessionId;
  const questionIds = selectFreshPracticeQuestionIds(bank, set.id, {
    count: set.roundSize,
    excludedQuestionIds: options.excludedQuestionIds,
    seed,
  });

  return {
    schemaVersion: "1.0",
    kind: "practice-session",
    id: options.sessionId,
    setId: set.id,
    skillId: set.skillId,
    questionIds,
    answers: {},
    seed,
    startedAt: options.now,
    updatedAt: options.now,
  };
}

export function recordPracticeAnswer(
  session: PracticeSession,
  bank: PracticeBank,
  questionId: string,
  optionId: string,
  now: number,
): PracticeSession {
  if (session.completedAt !== undefined) throw new Error("cannot answer a completed practice session");
  if (!session.questionIds.includes(questionId)) throw new Error(`question ${questionId} is not part of this practice round`);
  if (session.answers[questionId]) throw new Error(`question ${questionId} is already answered in this practice round`);
  requireTimestamp(now, "now");
  if (now < session.updatedAt) throw new Error("answer timestamp cannot move backwards");

  const question = getPracticeQuestion(bank, questionId);
  if (!question.options.some((option) => option.id === optionId)) {
    throw new Error(`option ${optionId} does not belong to practice question ${questionId}`);
  }

  return {
    ...session,
    answers: {
      ...session.answers,
      [questionId]: { optionId, answeredAt: now },
    },
    updatedAt: now,
  };
}

export function completePracticeSession(
  session: PracticeSession,
  bank: PracticeBank,
  now: number,
): PracticeSession {
  if (session.completedAt !== undefined) return session;
  requireTimestamp(now, "now");
  if (now < session.updatedAt) throw new Error("completion timestamp cannot move backwards");
  const errors = validatePracticeSession(session, bank);
  if (errors.length > 0) throw new Error(`invalid practice session:\n${errors.join("\n")}`);
  const unanswered = session.questionIds.filter((questionId) => !session.answers[questionId]);
  if (unanswered.length > 0) {
    throw new Error(`cannot complete practice session with unanswered questions: ${unanswered.join(", ")}`);
  }
  return { ...session, updatedAt: now, completedAt: now };
}

export function buildPracticeSessionResult(
  session: PracticeSession,
  bank: PracticeBank,
): PracticeSessionResult {
  if (session.completedAt === undefined) throw new Error("practice session must be completed before building a result");
  const errors = validatePracticeSession(session, bank);
  if (errors.length > 0) throw new Error(`invalid practice session:\n${errors.join("\n")}`);

  const questions = session.questionIds.map((questionId): PracticeQuestionResult => {
    const question = getPracticeQuestion(bank, questionId);
    const selectedOptionId = session.answers[questionId]?.optionId;
    if (!selectedOptionId) throw new Error(`completed session is missing answer for ${questionId}`);
    return {
      questionId,
      selectedOptionId,
      correctOptionId: question.answer.correctOptionId,
      correct: selectedOptionId === question.answer.correctOptionId,
    };
  });
  const correctCount = questions.filter((result) => result.correct).length;
  const questionCount = questions.length;
  return {
    sessionId: session.id,
    setId: session.setId,
    skillId: session.skillId,
    questionCount,
    correctCount,
    incorrectCount: questionCount - correctCount,
    percentage: questionCount === 0 ? 0 : Math.round((correctCount / questionCount) * 100),
    questions,
  };
}

export function validatePracticeSession(session: PracticeSession, bank: PracticeBank): string[] {
  const errors: string[] = [];
  if (!session.id.trim()) errors.push("session id cannot be empty");
  const set = bank.sets.find((item) => item.id === session.setId);
  if (!set) errors.push(`session references unknown practice set ${session.setId}`);
  else if (set.skillId !== session.skillId) errors.push(`session skill ${session.skillId} does not match set skill ${set.skillId}`);
  if (new Set(session.questionIds).size !== session.questionIds.length) errors.push("session questionIds cannot contain duplicates");
  if (set && session.questionIds.length !== set.roundSize) errors.push(`session must contain exactly ${set.roundSize} questions`);

  session.questionIds.forEach((questionId) => {
    const question = bank.questions.find((item) => item.id === questionId);
    if (!question) {
      errors.push(`session references unknown practice question ${questionId}`);
      return;
    }
    if (question.skillId !== session.skillId) errors.push(`session question ${questionId} belongs to skill ${question.skillId}`);
    if (set && !set.questionIds.includes(questionId)) errors.push(`session question ${questionId} is not listed by set ${set.id}`);
    const answer = session.answers[questionId];
    if (answer && !question.options.some((option) => option.id === answer.optionId)) {
      errors.push(`session answer for ${questionId} references unknown option ${answer.optionId}`);
    }
  });

  Object.keys(session.answers).forEach((questionId) => {
    if (!session.questionIds.includes(questionId)) errors.push(`session contains answer for out-of-round question ${questionId}`);
  });
  if (!Number.isFinite(session.startedAt) || !Number.isFinite(session.updatedAt)) errors.push("session timestamps must be finite numbers");
  if (session.updatedAt < session.startedAt) errors.push("session updatedAt cannot be before startedAt");
  if (session.completedAt !== undefined && session.completedAt < session.updatedAt) errors.push("session completedAt cannot be before updatedAt");
  return errors;
}

function getReadySet(bank: PracticeBank, setId: string): PracticeSet {
  const set = bank.sets.find((item) => item.id === setId);
  if (!set) throw new Error(`unknown practice set ${setId}`);
  if (set.status !== "ready") throw new Error(`practice set ${setId} is not ready for students`);
  if (set.questionIds.length < set.roundSize * 2) {
    throw new Error(`practice set ${setId} cannot provide two fresh rounds`);
  }
  set.questionIds.forEach((questionId) => {
    const question = getPracticeQuestion(bank, questionId);
    if (question.skillId !== set.skillId) throw new Error(`practice set ${setId} mixes multiple skills`);
    if (!isPracticeQuestionReadyForStudents(question)) throw new Error(`practice question ${questionId} is not ready for students`);
  });
  return set;
}

function getPracticeQuestion(bank: PracticeBank, questionId: string): PracticeQuestion {
  const question = bank.questions.find((item) => item.id === questionId);
  if (!question) throw new Error(`unknown practice question ${questionId}`);
  return question;
}

function stableHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function requireText(value: string, label: string) {
  if (!value.trim()) throw new Error(`${label} cannot be empty`);
}

function requireTimestamp(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${label} must be a non-negative finite timestamp`);
}
