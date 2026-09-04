import { getStudentReadyQuestions, type ExamDefinition } from "./exam-model";
import type {
  AnswerEvidence,
  ExamQuestion,
  QuestionOption,
  QuestionSource,
  RichContent,
} from "./question-model";
import { scoreSession, type ExamScore, type ExamSession } from "./session-engine";

export type QuestionResultStatus = "correct" | "incorrect" | "unanswered";

export type QuestionResultReview = {
  questionId: string;
  order: number;
  sourceQuestionNumber: string;
  status: QuestionResultStatus;
  stem: RichContent;
  options: QuestionOption[];
  selectedOptionId?: string;
  correctOptionId: string;
  earnedPoints: number;
  maxPoints: number;
  reviewedExplanation?: RichContent;
  answerEvidence: AnswerEvidence;
  source: QuestionSource;
  primarySkillId: string;
  secondarySkillIds: string[];
};

export type ExamResultReport = {
  examId: string;
  score: ExamScore;
  answeredCount: number;
  completionPercentage: number;
  reviews: QuestionResultReview[];
};

export function buildExamResultReport(
  exam: ExamDefinition,
  session: ExamSession,
): ExamResultReport {
  const score = scoreSession(exam, session);
  const questions = getStudentReadyQuestions(exam);
  const scoreByQuestion = new Map(score.questions.map((item) => [item.questionId, item]));

  const reviews = questions.map((question) => {
    const item = scoreByQuestion.get(question.id);
    if (!item) throw new Error(`Missing score item for verified question ${question.id}`);
    return buildQuestionReview(question, item);
  });

  const answeredCount = score.correctCount + score.incorrectCount;
  const totalCount = reviews.length;
  const completionPercentage = totalCount > 0
    ? roundToTwo((answeredCount / totalCount) * 100)
    : 0;

  return {
    examId: exam.id,
    score,
    answeredCount,
    completionPercentage,
    reviews,
  };
}

function buildQuestionReview(
  question: ExamQuestion,
  score: ExamScore["questions"][number],
): QuestionResultReview {
  const status: QuestionResultStatus = !score.isAnswered
    ? "unanswered"
    : score.isCorrect
      ? "correct"
      : "incorrect";

  return {
    questionId: question.id,
    order: question.order,
    sourceQuestionNumber: question.sourceQuestionNumber,
    status,
    stem: question.stem,
    options: question.options,
    selectedOptionId: score.selectedOptionId,
    correctOptionId: score.correctOptionId,
    earnedPoints: score.earnedPoints,
    maxPoints: score.maxPoints,
    reviewedExplanation: question.explanation?.status === "reviewed"
      ? question.explanation.content
      : undefined,
    answerEvidence: question.answer.answerEvidence,
    source: question.source,
    primarySkillId: question.analysis.primarySkillId,
    secondarySkillIds: [...question.analysis.secondarySkillIds],
  };
}

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}
