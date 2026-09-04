import { getStudentReadyQuestions, isExamReadyForStudents, type ExamDefinition } from "./exam-model";
import type { ExamQuestion } from "./question-model";

export type ExamSessionStatus = "in-progress" | "submitted";
export type ExamTimingMode = "timed" | "untimed";

export type CreateExamSessionOptions = {
  timingMode?: ExamTimingMode;
  nowMs?: number;
};

export type ExamSession = {
  version: 2;
  examId: string;
  status: ExamSessionStatus;
  timingMode: ExamTimingMode;
  questionIds: string[];
  answers: Record<string, string>;
  flaggedQuestionIds: string[];
  currentIndex: number;
  startedAt: number;
  updatedAt: number;
  deadlineAt?: number;
  submittedAt?: number;
};

export type QuestionScore = {
  questionId: string;
  selectedOptionId?: string;
  correctOptionId: string;
  isCorrect: boolean;
  isAnswered: boolean;
  earnedPoints: number;
  maxPoints: number;
};

export type ExamScore = {
  examId: string;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  questions: QuestionScore[];
};

export type SessionProgress = {
  answeredCount: number;
  unansweredCount: number;
  flaggedCount: number;
  totalCount: number;
  percentage: number;
};

export function createExamSession(
  exam: ExamDefinition,
  options: CreateExamSessionOptions = {},
): ExamSession {
  assertExamReady(exam);
  const questions = getStudentReadyQuestions(exam);
  const timingMode = options.timingMode ?? "timed";
  const nowMs = options.nowMs ?? Date.now();
  const deadlineAt = timingMode === "timed"
    ? nowMs + exam.durationMinutes * 60_000
    : undefined;

  return {
    version: 2,
    examId: exam.id,
    status: "in-progress",
    timingMode,
    questionIds: questions.map((question) => question.id),
    answers: {},
    flaggedQuestionIds: [],
    currentIndex: 0,
    startedAt: nowMs,
    updatedAt: nowMs,
    deadlineAt,
  };
}

export function answerQuestion(
  exam: ExamDefinition,
  session: ExamSession,
  questionId: string,
  optionId: string,
  nowMs = Date.now(),
): ExamSession {
  assertSessionCanAnswer(exam, session, nowMs);
  const question = findSessionQuestion(exam, session, questionId);

  if (!question.options.some((option) => option.id === optionId)) {
    throw new Error(`Option ${optionId} does not belong to question ${questionId}`);
  }

  return {
    ...session,
    answers: { ...session.answers, [questionId]: optionId },
    updatedAt: nowMs,
  };
}

export function clearQuestionAnswer(
  exam: ExamDefinition,
  session: ExamSession,
  questionId: string,
  nowMs = Date.now(),
): ExamSession {
  assertSessionCanAnswer(exam, session, nowMs);
  findSessionQuestion(exam, session, questionId);

  const answers = { ...session.answers };
  delete answers[questionId];

  return { ...session, answers, updatedAt: nowMs };
}

export function toggleQuestionFlag(
  exam: ExamDefinition,
  session: ExamSession,
  questionId: string,
  nowMs = Date.now(),
): ExamSession {
  assertSessionCanNavigate(exam, session);
  findSessionQuestion(exam, session, questionId);

  const isFlagged = session.flaggedQuestionIds.includes(questionId);
  const flaggedQuestionIds = isFlagged
    ? session.flaggedQuestionIds.filter((id) => id !== questionId)
    : [...session.flaggedQuestionIds, questionId];

  return { ...session, flaggedQuestionIds, updatedAt: nowMs };
}

export function setCurrentQuestion(
  exam: ExamDefinition,
  session: ExamSession,
  index: number,
  nowMs = Date.now(),
): ExamSession {
  assertSessionCanNavigate(exam, session);

  if (!Number.isInteger(index) || index < 0 || index >= session.questionIds.length) {
    throw new Error("Question index is outside the current exam session");
  }

  return { ...session, currentIndex: index, updatedAt: nowMs };
}

export function submitSession(
  exam: ExamDefinition,
  session: ExamSession,
  nowMs = Date.now(),
): ExamSession {
  assertSessionCanNavigate(exam, session);

  return {
    ...session,
    status: "submitted",
    updatedAt: nowMs,
    submittedAt: nowMs,
  };
}

export function scoreSession(exam: ExamDefinition, session: ExamSession): ExamScore {
  assertExamReady(exam);

  if (session.status !== "submitted") {
    throw new Error("Session must be submitted before it can be scored");
  }

  if (!isSessionCompatibleWithExam(exam, session)) {
    throw new Error("Session does not match the current verified exam question set");
  }

  const readyQuestions = getStudentReadyQuestions(exam);
  const questionScores: QuestionScore[] = [];
  let totalPoints = 0;
  let earnedPoints = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  for (let index = 0; index < readyQuestions.length; index += 1) {
    const question = readyQuestions[index];
    const selectedOptionId = session.answers[question.id];
    const isAnswered = selectedOptionId !== undefined;
    const isCorrect = isAnswered && selectedOptionId === question.answer.correctOptionId;
    const maxPoints = question.answer.points;
    const questionEarnedPoints = isCorrect ? maxPoints : 0;

    totalPoints += maxPoints;
    earnedPoints += questionEarnedPoints;

    if (!isAnswered) unansweredCount += 1;
    else if (isCorrect) correctCount += 1;
    else incorrectCount += 1;

    questionScores.push({
      questionId: question.id,
      selectedOptionId,
      correctOptionId: question.answer.correctOptionId,
      isCorrect,
      isAnswered,
      earnedPoints: questionEarnedPoints,
      maxPoints,
    });
  }

  const percentage = totalPoints > 0 ? roundToTwo((earnedPoints / totalPoints) * 100) : 0;

  return {
    examId: exam.id,
    totalPoints,
    earnedPoints,
    percentage,
    correctCount,
    incorrectCount,
    unansweredCount,
    questions: questionScores,
  };
}

export function getSessionProgress(session: ExamSession): SessionProgress {
  let answeredCount = 0;

  for (let index = 0; index < session.questionIds.length; index += 1) {
    if (session.answers[session.questionIds[index]] !== undefined) answeredCount += 1;
  }

  const totalCount = session.questionIds.length;
  const unansweredCount = Math.max(0, totalCount - answeredCount);
  const percentage = totalCount > 0 ? roundToTwo((answeredCount / totalCount) * 100) : 0;

  return {
    answeredCount,
    unansweredCount,
    flaggedCount: session.flaggedQuestionIds.length,
    totalCount,
    percentage,
  };
}

export function getRemainingTimeMs(
  exam: ExamDefinition,
  session: ExamSession,
  nowMs = Date.now(),
): number | null {
  if (session.timingMode === "untimed") return null;
  if (!isSessionCompatibleWithExam(exam, session)) return 0;
  if (session.deadlineAt === undefined) return 0;
  return Math.max(0, session.deadlineAt - nowMs);
}

export function isSessionTimeExpired(
  exam: ExamDefinition,
  session: ExamSession,
  nowMs = Date.now(),
): boolean {
  const remaining = getRemainingTimeMs(exam, session, nowMs);
  return remaining !== null && remaining <= 0;
}

export function canResumeSession(exam: ExamDefinition, session: ExamSession): boolean {
  return session.status === "in-progress" && isSessionCompatibleWithExam(exam, session);
}

export function isSessionCompatibleWithExam(exam: ExamDefinition, session: ExamSession): boolean {
  if (!isExamReadyForStudents(exam)) return false;
  if (session.version !== 2 || session.examId !== exam.id) return false;
  if (session.timingMode !== "timed" && session.timingMode !== "untimed") return false;

  if (session.timingMode === "timed") {
    if (!Number.isFinite(session.deadlineAt) || (session.deadlineAt ?? 0) <= session.startedAt) return false;
  } else if (session.deadlineAt !== undefined) {
    return false;
  }

  const readyQuestions = getStudentReadyQuestions(exam);
  if (readyQuestions.length !== session.questionIds.length) return false;

  for (let index = 0; index < readyQuestions.length; index += 1) {
    if (readyQuestions[index].id !== session.questionIds[index]) return false;
  }

  const questionIdSet = new Set(session.questionIds);
  const flagSet = new Set(session.flaggedQuestionIds);
  if (flagSet.size !== session.flaggedQuestionIds.length) return false;

  for (let index = 0; index < session.flaggedQuestionIds.length; index += 1) {
    if (!questionIdSet.has(session.flaggedQuestionIds[index])) return false;
  }

  for (const questionId of Object.keys(session.answers)) {
    if (!questionIdSet.has(questionId)) return false;
  }

  return true;
}

export function getSessionStorageKey(examId: string): string {
  return `yemen-grade12:exam-session:v2:${examId}`;
}

function assertExamReady(exam: ExamDefinition) {
  if (!isExamReadyForStudents(exam)) {
    throw new Error("Exam is not ready for students");
  }
}

function assertSessionCanNavigate(exam: ExamDefinition, session: ExamSession) {
  if (session.status !== "in-progress") {
    throw new Error("Submitted exam session cannot be changed");
  }

  if (!isSessionCompatibleWithExam(exam, session)) {
    throw new Error("Exam session is stale or incompatible with the verified exam");
  }
}

function assertSessionCanAnswer(
  exam: ExamDefinition,
  session: ExamSession,
  nowMs: number,
) {
  assertSessionCanNavigate(exam, session);

  if (isSessionTimeExpired(exam, session, nowMs)) {
    throw new Error("Exam time has expired");
  }
}

function findSessionQuestion(
  exam: ExamDefinition,
  session: ExamSession,
  questionId: string,
): ExamQuestion {
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Question ${questionId} is not part of this session`);
  }

  const questions = getStudentReadyQuestions(exam);
  const question = questions.find((candidate) => candidate.id === questionId);
  if (!question) throw new Error(`Verified question ${questionId} is unavailable`);
  return question;
}

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}
