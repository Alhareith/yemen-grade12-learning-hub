export type QuestionType = "single-choice" | "true-false";
export type QuestionStatus =
  | "digitized"
  | "reviewed"
  | "answer-verified"
  | "verified"
  | "blocked";

export type Difficulty = "unrated" | "easy" | "medium" | "hard";
export type DigitizationMethod = "manual" | "ocr-assisted";
export type ExplanationStatus = "draft" | "reviewed";
export type InsightReviewStatus = "draft" | "reviewed";
export type MathDisplay = "inline" | "block";

export type TextSegment = {
  type: "text";
  text: string;
};

export type MathSegment = {
  type: "math";
  latex: string;
  display: MathDisplay;
  altText: string;
};

export type RichSegment = TextSegment | MathSegment;
export type RichContent = RichSegment[];

export type QuestionOption = {
  id: string;
  label: string;
  content: RichContent;
};

export type QuestionAsset = {
  id: string;
  kind: "image" | "diagram";
  path: string;
  altText: string;
  sourcePage: number;
};

export type AnswerEvidence = {
  type: "published-key" | "published-solution";
  sourceUrl: string;
  sourcePage?: number;
  locator: string;
};

export type QuestionAnswer = {
  correctOptionId: string;
  points: number;
  answerEvidence: AnswerEvidence;
};

export type QuestionSource = {
  sourcePackageUrl: string;
  sourceFileName: string;
  questionPage: number;
  digitizationMethod: DigitizationMethod;
};

export type ErrorInsight = {
  optionId: string;
  errorTagId: ErrorTagId;
  message: string;
  reviewStatus: InsightReviewStatus;
};

export type QuestionAnalysis = {
  primarySkillId: string;
  secondarySkillIds: string[];
  errorInsights?: ErrorInsight[];
};

export type QuestionExplanation = {
  status: ExplanationStatus;
  content: RichContent;
};

export type VerificationChecks = {
  sourceMatched: boolean;
  textReviewed: boolean;
  mathReviewed: boolean;
  optionsReviewed: boolean;
  answerVerified: boolean;
  skillReviewed: boolean;
  mediaReviewed: boolean;
};

export type QuestionVerification = {
  status: QuestionStatus;
  checks: VerificationChecks;
  reviewedAt?: string;
  reviewedBy?: string;
  blockingNotes: string[];
};

export type ExamQuestion = {
  schemaVersion: "1.0";
  id: string;
  examId: string;
  order: number;
  sourceQuestionNumber: string;
  type: QuestionType;
  stem: RichContent;
  options: QuestionOption[];
  assets: QuestionAsset[];
  answer: QuestionAnswer;
  source: QuestionSource;
  analysis: QuestionAnalysis;
  difficulty: Difficulty;
  explanation?: QuestionExplanation;
  verification: QuestionVerification;
};

export const ERROR_TAG_IDS = [
  "ERR-CONCEPT",
  "ERR-RULE-SELECTION",
  "ERR-CONDITION",
  "ERR-ALGEBRA",
  "ERR-SIGN",
  "ERR-SUBSTITUTION",
  "ERR-NOTATION",
  "ERR-INTERVAL",
  "ERR-INCOMPLETE",
] as const;

export type ErrorTagId = (typeof ERROR_TAG_IDS)[number];

const errorTagSet: ReadonlySet<string> = new Set(ERROR_TAG_IDS);

export function validateExamQuestion(
  question: ExamQuestion,
  allowedSkillIds?: ReadonlySet<string>,
): string[] {
  const errors: string[] = [];

  requireText(question.id, "id", errors);
  requireText(question.examId, "examId", errors);
  requireText(question.sourceQuestionNumber, "sourceQuestionNumber", errors);

  if (!Number.isInteger(question.order) || question.order < 1) {
    errors.push("order must be a positive integer");
  }

  validateRichContent(question.stem, "stem", errors);

  if (question.options.length < 2) {
    errors.push("options must contain at least two choices");
  }

  if (question.type === "true-false" && question.options.length !== 2) {
    errors.push("true-false questions must contain exactly two options");
  }

  const optionIds = new Set<string>();
  for (let index = 0; index < question.options.length; index += 1) {
    const option = question.options[index];
    requireText(option.id, `options[${index}].id`, errors);
    requireText(option.label, `options[${index}].label`, errors);
    validateRichContent(option.content, `options[${index}].content`, errors);

    if (optionIds.has(option.id)) {
      errors.push(`duplicate option id: ${option.id}`);
    }
    optionIds.add(option.id);
  }

  if (!optionIds.has(question.answer.correctOptionId)) {
    errors.push("answer.correctOptionId must reference an existing option id");
  }

  if (!Number.isFinite(question.answer.points) || question.answer.points <= 0) {
    errors.push("answer.points must be a positive number");
  }

  requireText(question.answer.answerEvidence.sourceUrl, "answer.answerEvidence.sourceUrl", errors);
  requireText(question.answer.answerEvidence.locator, "answer.answerEvidence.locator", errors);
  if (
    question.answer.answerEvidence.sourcePage !== undefined &&
    (!Number.isInteger(question.answer.answerEvidence.sourcePage) ||
      question.answer.answerEvidence.sourcePage < 1)
  ) {
    errors.push("answer.answerEvidence.sourcePage must be a positive integer when provided");
  }

  requireText(question.source.sourcePackageUrl, "source.sourcePackageUrl", errors);
  requireText(question.source.sourceFileName, "source.sourceFileName", errors);
  if (!Number.isInteger(question.source.questionPage) || question.source.questionPage < 1) {
    errors.push("source.questionPage must be a positive integer");
  }

  for (let index = 0; index < question.assets.length; index += 1) {
    const asset = question.assets[index];
    requireText(asset.id, `assets[${index}].id`, errors);
    requireText(asset.path, `assets[${index}].path`, errors);
    requireText(asset.altText, `assets[${index}].altText`, errors);

    if (/^https?:\/\//i.test(asset.path)) {
      errors.push(`assets[${index}].path must be a local project path, not a remote URL`);
    }

    if (!Number.isInteger(asset.sourcePage) || asset.sourcePage < 1) {
      errors.push(`assets[${index}].sourcePage must be a positive integer`);
    }
  }

  requireText(question.analysis.primarySkillId, "analysis.primarySkillId", errors);

  if (question.analysis.secondarySkillIds.length > 2) {
    errors.push("analysis.secondarySkillIds cannot contain more than two skills");
  }

  const secondarySkillSet = new Set(question.analysis.secondarySkillIds);
  if (secondarySkillSet.size !== question.analysis.secondarySkillIds.length) {
    errors.push("analysis.secondarySkillIds cannot contain duplicates");
  }

  if (secondarySkillSet.has(question.analysis.primarySkillId)) {
    errors.push("analysis.primarySkillId cannot also appear in secondarySkillIds");
  }

  if (allowedSkillIds) {
    if (!allowedSkillIds.has(question.analysis.primarySkillId)) {
      errors.push(`unknown primary skill id: ${question.analysis.primarySkillId}`);
    }
    for (const skillId of question.analysis.secondarySkillIds) {
      if (!allowedSkillIds.has(skillId)) {
        errors.push(`unknown secondary skill id: ${skillId}`);
      }
    }
  }

  const errorInsights = question.analysis.errorInsights ?? [];
  for (let index = 0; index < errorInsights.length; index += 1) {
    const insight = errorInsights[index];
    if (!optionIds.has(insight.optionId)) {
      errors.push(`analysis.errorInsights[${index}].optionId must reference an existing option`);
    }
    if (insight.optionId === question.answer.correctOptionId) {
      errors.push(`analysis.errorInsights[${index}] cannot target the correct option`);
    }
    if (!errorTagSet.has(insight.errorTagId)) {
      errors.push(`analysis.errorInsights[${index}] has an unknown errorTagId`);
    }
    requireText(insight.message, `analysis.errorInsights[${index}].message`, errors);
  }

  if (question.explanation) {
    validateRichContent(question.explanation.content, "explanation.content", errors);
  }

  for (let index = 0; index < question.verification.blockingNotes.length; index += 1) {
    requireText(question.verification.blockingNotes[index], `verification.blockingNotes[${index}]`, errors);
  }

  if (question.verification.reviewedAt && Number.isNaN(Date.parse(question.verification.reviewedAt))) {
    errors.push("verification.reviewedAt must be a valid ISO-compatible date when provided");
  }

  if (question.verification.status === "verified") {
    const checks = question.verification.checks;
    const requiredChecks: Array<[keyof VerificationChecks, boolean]> = [
      ["sourceMatched", checks.sourceMatched],
      ["textReviewed", checks.textReviewed],
      ["mathReviewed", checks.mathReviewed],
      ["optionsReviewed", checks.optionsReviewed],
      ["answerVerified", checks.answerVerified],
      ["skillReviewed", checks.skillReviewed],
    ];

    if (question.assets.length > 0) {
      requiredChecks.push(["mediaReviewed", checks.mediaReviewed]);
    }

    for (const [name, value] of requiredChecks) {
      if (!value) {
        errors.push(`verified question requires verification.checks.${name}=true`);
      }
    }

    if (question.verification.blockingNotes.length > 0) {
      errors.push("verified question cannot contain blockingNotes");
    }
  }

  return errors;
}

export function isQuestionReadyForStudents(
  question: ExamQuestion,
  allowedSkillIds?: ReadonlySet<string>,
): boolean {
  return question.verification.status === "verified" && validateExamQuestion(question, allowedSkillIds).length === 0;
}

export function getReviewedErrorInsights(question: ExamQuestion): ErrorInsight[] {
  return (question.analysis.errorInsights ?? []).filter(
    (insight) => insight.reviewStatus === "reviewed",
  );
}

function validateRichContent(content: RichContent, path: string, errors: string[]) {
  if (content.length === 0) {
    errors.push(`${path} must contain at least one segment`);
    return;
  }

  for (let index = 0; index < content.length; index += 1) {
    const segment = content[index];
    if (segment.type === "text") {
      requireText(segment.text, `${path}[${index}].text`, errors);
      continue;
    }

    requireText(segment.latex, `${path}[${index}].latex`, errors);
    requireText(segment.altText, `${path}[${index}].altText`, errors);
  }
}

function requireText(value: string, path: string, errors: string[]) {
  if (!value.trim()) {
    errors.push(`${path} cannot be empty`);
  }
}
