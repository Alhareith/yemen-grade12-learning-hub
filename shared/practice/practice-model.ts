import type {
  Difficulty,
  QuestionOption,
  QuestionType,
  RichContent,
} from "../exams/question-model";

export type PracticeQuestionOrigin = "authored" | "adapted";
export type PracticeQuestionStatus = "draft" | "reviewed" | "verified" | "blocked";
export type PracticeSetStatus = "draft" | "ready";

export type PracticeQuestionProvenance = {
  origin: PracticeQuestionOrigin;
  sourceLabel?: string;
  sourceUrl?: string;
  adaptationNote?: string;
};

export type PracticeQuestionVerification = {
  status: PracticeQuestionStatus;
  checks: {
    contentReviewed: boolean;
    answerReviewed: boolean;
    explanationReviewed: boolean;
    skillReviewed: boolean;
  };
  reviewedAt?: string;
  reviewedBy?: string;
  blockingNotes: string[];
};

export type PracticeQuestion = {
  schemaVersion: "1.0";
  kind: "practice";
  id: string;
  skillId: string;
  type: QuestionType;
  difficulty: Exclude<Difficulty, "unrated">;
  stem: RichContent;
  options: QuestionOption[];
  answer: {
    correctOptionId: string;
    explanation: RichContent;
  };
  provenance: PracticeQuestionProvenance;
  verification: PracticeQuestionVerification;
};

export type PracticeSet = {
  schemaVersion: "1.0";
  id: string;
  skillId: string;
  title: string;
  questionIds: string[];
  roundSize: number;
  status: PracticeSetStatus;
};

export type PracticeBank = {
  schemaVersion: "1.0";
  questions: PracticeQuestion[];
  sets: PracticeSet[];
};

export function validatePracticeQuestion(
  question: PracticeQuestion,
  allowedSkillIds?: ReadonlySet<string>,
): string[] {
  const errors: string[] = [];
  requireText(question.id, "id", errors);
  requireText(question.skillId, "skillId", errors);
  if (question.kind !== "practice") errors.push("kind must be practice");
  if (allowedSkillIds && !allowedSkillIds.has(question.skillId)) {
    errors.push(`unknown skill id: ${question.skillId}`);
  }

  validateRichContent(question.stem, "stem", errors);
  if (question.options.length < 2) errors.push("options must contain at least two choices");
  if (question.type === "true-false" && question.options.length !== 2) {
    errors.push("true-false questions must contain exactly two options");
  }

  const optionIds = new Set<string>();
  question.options.forEach((option, index) => {
    requireText(option.id, `options[${index}].id`, errors);
    requireText(option.label, `options[${index}].label`, errors);
    validateRichContent(option.content, `options[${index}].content`, errors);
    if (optionIds.has(option.id)) errors.push(`duplicate option id: ${option.id}`);
    optionIds.add(option.id);
  });

  if (!optionIds.has(question.answer.correctOptionId)) {
    errors.push("answer.correctOptionId must reference an existing option id");
  }
  validateRichContent(question.answer.explanation, "answer.explanation", errors);

  if (question.provenance.origin === "adapted") {
    requireText(question.provenance.sourceLabel ?? "", "provenance.sourceLabel", errors);
    requireText(question.provenance.sourceUrl ?? "", "provenance.sourceUrl", errors);
    requireText(question.provenance.adaptationNote ?? "", "provenance.adaptationNote", errors);
  }

  question.verification.blockingNotes.forEach((note, index) => {
    requireText(note, `verification.blockingNotes[${index}]`, errors);
  });
  if (question.verification.reviewedAt && Number.isNaN(Date.parse(question.verification.reviewedAt))) {
    errors.push("verification.reviewedAt must be a valid ISO-compatible date when provided");
  }

  if (question.verification.status === "verified") {
    const checks = question.verification.checks;
    if (!checks.contentReviewed) errors.push("verified practice question requires contentReviewed=true");
    if (!checks.answerReviewed) errors.push("verified practice question requires answerReviewed=true");
    if (!checks.explanationReviewed) errors.push("verified practice question requires explanationReviewed=true");
    if (!checks.skillReviewed) errors.push("verified practice question requires skillReviewed=true");
    if (question.verification.blockingNotes.length > 0) {
      errors.push("verified practice question cannot contain blockingNotes");
    }
  }

  return errors;
}

export function validatePracticeBank(
  bank: PracticeBank,
  allowedSkillIds?: ReadonlySet<string>,
  reservedExamQuestionIds?: ReadonlySet<string>,
): string[] {
  const errors: string[] = [];
  const questions = indexUnique(bank.questions, "practice questions", errors);
  indexUnique(bank.sets, "practice sets", errors);

  bank.questions.forEach((question) => {
    validatePracticeQuestion(question, allowedSkillIds).forEach((error) => {
      errors.push(`question ${question.id}: ${error}`);
    });
    if (reservedExamQuestionIds?.has(question.id)) {
      errors.push(`practice question ${question.id} collides with an exam question id`);
    }
  });

  bank.sets.forEach((set) => {
    requireText(set.id, "practice set id", errors);
    requireText(set.skillId, `set ${set.id}.skillId`, errors);
    requireText(set.title, `set ${set.id}.title`, errors);
    if (allowedSkillIds && !allowedSkillIds.has(set.skillId)) {
      errors.push(`set ${set.id} references unknown skill ${set.skillId}`);
    }
    if (!Number.isInteger(set.roundSize) || set.roundSize < 3 || set.roundSize > 10) {
      errors.push(`set ${set.id}.roundSize must be an integer between 3 and 10`);
    }

    const seenQuestionIds = new Set<string>();
    set.questionIds.forEach((questionId) => {
      if (seenQuestionIds.has(questionId)) {
        errors.push(`set ${set.id} contains duplicate question ${questionId}`);
      }
      seenQuestionIds.add(questionId);
      const question = questions.get(questionId);
      if (!question) {
        errors.push(`set ${set.id} references unknown practice question ${questionId}`);
        return;
      }
      if (question.skillId !== set.skillId) {
        errors.push(`set ${set.id} mixes skill ${question.skillId} into ${set.skillId}`);
      }
    });

    if (set.status === "ready") {
      if (set.questionIds.length < set.roundSize * 2) {
        errors.push(`ready set ${set.id} must support two fresh rounds without direct repetition`);
      }
      set.questionIds.forEach((questionId) => {
        const question = questions.get(questionId);
        if (question && !isPracticeQuestionReadyForStudents(question, allowedSkillIds)) {
          errors.push(`ready set ${set.id} contains non-ready question ${questionId}`);
        }
      });
    }
  });

  return errors;
}

export function isPracticeQuestionReadyForStudents(
  question: PracticeQuestion,
  allowedSkillIds?: ReadonlySet<string>,
): boolean {
  return question.verification.status === "verified"
    && validatePracticeQuestion(question, allowedSkillIds).length === 0;
}

export function isPracticeSetReadyForStudents(
  bank: PracticeBank,
  setId: string,
  allowedSkillIds?: ReadonlySet<string>,
): boolean {
  const set = bank.sets.find((item) => item.id === setId);
  if (!set || set.status !== "ready") return false;
  return validatePracticeBank(bank, allowedSkillIds).every((error) => !error.startsWith(`set ${setId}`) && !error.startsWith(`ready set ${setId}`));
}

export function createPracticeBankIndex(bank: PracticeBank) {
  const questions = new Map(bank.questions.map((question) => [question.id, question]));
  const sets = new Map(bank.sets.map((set) => [set.id, set]));
  return {
    bank,
    questions,
    sets,
    getSetsForSkill(skillId: string) {
      return bank.sets.filter((set) => set.skillId === skillId);
    },
    getQuestionsForSkill(skillId: string) {
      return bank.questions.filter((question) => question.skillId === skillId);
    },
  };
}

function validateRichContent(content: RichContent, path: string, errors: string[]) {
  if (content.length === 0) {
    errors.push(`${path} must contain at least one segment`);
    return;
  }
  content.forEach((segment, index) => {
    if (segment.type === "text") {
      requireText(segment.text, `${path}[${index}].text`, errors);
      return;
    }
    requireText(segment.latex, `${path}[${index}].latex`, errors);
    requireText(segment.altText, `${path}[${index}].altText`, errors);
  });
}

function indexUnique<T extends { id: string }>(items: T[], label: string, errors: string[]) {
  const map = new Map<string, T>();
  items.forEach((item) => {
    if (map.has(item.id)) errors.push(`duplicate ${label} id: ${item.id}`);
    map.set(item.id, item);
  });
  return map;
}

function requireText(value: string, path: string, errors: string[]) {
  if (!value.trim()) errors.push(`${path} cannot be empty`);
}
