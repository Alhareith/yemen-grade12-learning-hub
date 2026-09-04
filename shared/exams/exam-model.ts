import {
  isQuestionReadyForStudents,
  validateExamQuestion,
  type ExamQuestion,
} from "./question-model";

export type ExamAvailability = "draft" | "blocked-source-access" | "ready";

export type ExamSourceReference = {
  title: string;
  publisher: string;
  primaryUrl: string;
  mirrorUrl?: string;
  fileName?: string;
};

export type ExamDefinition = {
  schemaVersion: "1.0";
  id: string;
  title: string;
  subject: string;
  branch: string;
  year: number;
  durationMinutes: number;
  availability: ExamAvailability;
  source: ExamSourceReference;
  questions: ExamQuestion[];
  blockingNotes: string[];
};

export function validateExamDefinition(
  exam: ExamDefinition,
  allowedSkillIds?: ReadonlySet<string>,
): string[] {
  const errors: string[] = [];

  requireText(exam.id, "id", errors);
  requireText(exam.title, "title", errors);
  requireText(exam.subject, "subject", errors);
  requireText(exam.branch, "branch", errors);
  requireText(exam.source.title, "source.title", errors);
  requireText(exam.source.publisher, "source.publisher", errors);
  requireText(exam.source.primaryUrl, "source.primaryUrl", errors);

  if (!Number.isInteger(exam.year) || exam.year < 2000) {
    errors.push("year must be a valid modern exam year");
  }

  if (!Number.isInteger(exam.durationMinutes) || exam.durationMinutes < 1) {
    errors.push("durationMinutes must be a positive integer");
  }

  const questionIds = new Set<string>();
  const questionOrders = new Set<number>();

  for (let index = 0; index < exam.questions.length; index += 1) {
    const question = exam.questions[index];

    if (question.examId !== exam.id) {
      errors.push(`questions[${index}].examId must equal exam.id`);
    }

    if (questionIds.has(question.id)) {
      errors.push(`duplicate question id: ${question.id}`);
    }
    questionIds.add(question.id);

    if (questionOrders.has(question.order)) {
      errors.push(`duplicate question order: ${question.order}`);
    }
    questionOrders.add(question.order);

    const questionErrors = validateExamQuestion(question, allowedSkillIds);
    for (let errorIndex = 0; errorIndex < questionErrors.length; errorIndex += 1) {
      errors.push(`questions[${index}]: ${questionErrors[errorIndex]}`);
    }
  }

  for (let index = 0; index < exam.blockingNotes.length; index += 1) {
    requireText(exam.blockingNotes[index], `blockingNotes[${index}]`, errors);
  }

  if (exam.availability === "blocked-source-access" && exam.blockingNotes.length === 0) {
    errors.push("blocked-source-access exam must explain why it is blocked");
  }

  if (exam.availability === "ready") {
    if (exam.questions.length === 0) {
      errors.push("ready exam must contain at least one question");
    }

    if (exam.blockingNotes.length > 0) {
      errors.push("ready exam cannot contain blockingNotes");
    }

    for (let index = 0; index < exam.questions.length; index += 1) {
      if (!isQuestionReadyForStudents(exam.questions[index], allowedSkillIds)) {
        errors.push(`questions[${index}] is not verified and student-ready`);
      }
    }
  }

  return errors;
}

export function getStudentReadyQuestions(
  exam: ExamDefinition,
  allowedSkillIds?: ReadonlySet<string>,
): ExamQuestion[] {
  return exam.questions
    .filter((question) => isQuestionReadyForStudents(question, allowedSkillIds))
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function isExamReadyForStudents(
  exam: ExamDefinition,
  allowedSkillIds?: ReadonlySet<string>,
): boolean {
  if (exam.availability !== "ready") return false;
  if (validateExamDefinition(exam, allowedSkillIds).length > 0) return false;

  const readyQuestions = getStudentReadyQuestions(exam, allowedSkillIds);
  return readyQuestions.length > 0 && readyQuestions.length === exam.questions.length;
}

function requireText(value: string, path: string, errors: string[]) {
  if (!value.trim()) {
    errors.push(`${path} cannot be empty`);
  }
}
