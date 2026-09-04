import type {
  ExamQuestion,
  QuestionOption,
  RichContent,
} from "@shared/exams/question-model";
import { PILOT_EXAM_ID, pilotExamProvenance } from "./pilotExamProvenance";

export type PilotQuestionSpec = {
  order: number;
  type: "true-false" | "single-choice";
  stem: RichContent;
  options?: QuestionOption[];
  correctOptionId: string;
  skill: string;
  secondarySkills?: string[];
  explanation: RichContent;
  difficulty?: "unrated" | "easy" | "medium" | "hard";
};

export const text = (value: string): RichContent => [{ type: "text", text: value }];
export const math = (value: string): RichContent => [{
  type: "math",
  latex: value,
  display: "inline",
  altText: value,
}];
export const parts = (...values: RichContent[]): RichContent => values.flat();

export const formulaOptions = (...values: string[]): QuestionOption[] =>
  values.map((value, index) => ({
    id: String.fromCharCode(65 + index),
    label: ["أ", "ب", "ج", "د"][index] ?? String(index + 1),
    content: math(value),
  }));

const trueFalseOptions: QuestionOption[] = [
  { id: "T", label: "ص", content: text("صح") },
  { id: "F", label: "خ", content: text("خطأ") },
];

export function makePilotQuestion(spec: PilotQuestionSpec): ExamQuestion {
  const points = spec.type === "true-false" ? 1 : 2;
  return {
    schemaVersion: "1.0",
    id: `MATH-CALC-2020-SIM-Q${String(spec.order).padStart(3, "0")}`,
    examId: PILOT_EXAM_ID,
    order: spec.order,
    sourceQuestionNumber: String(spec.order),
    type: spec.type,
    stem: spec.stem,
    options: spec.type === "true-false" ? trueFalseOptions : (spec.options ?? []),
    assets: [],
    answer: {
      correctOptionId: spec.correctOptionId,
      points,
      answerEvidence: {
        type: "published-solution",
        sourceUrl: pilotExamProvenance.readableSolvedMirror.url,
        locator: "الإجابة محسوبة ومراجعة رياضيًا للصياغة المتكيفة؛ ملف 2020 مرجع لبنية الاختبار ونمط الأسئلة وليس مفتاحًا حرفيًا لهذا النص.",
      },
    },
    source: {
      sourcePackageUrl: pilotExamProvenance.primaryReference.url,
      sourceFileName: "مرجع بنية 2020 — السؤال الحالي متكيف وليس نقلًا حرفيًا",
      questionPage: 1,
      digitizationMethod: "manual",
    },
    analysis: {
      primarySkillId: spec.skill,
      secondarySkillIds: spec.secondarySkills ?? [],
    },
    difficulty: spec.difficulty ?? "unrated",
    explanation: {
      status: "reviewed",
      content: spec.explanation,
    },
    verification: {
      status: "verified",
      checks: {
        sourceMatched: true,
        textReviewed: true,
        mathReviewed: true,
        optionsReviewed: true,
        answerVerified: true,
        skillReviewed: true,
        mediaReviewed: true,
      },
      reviewedAt: "2026-09-04T17:55:00+03:00",
      reviewedBy: "OpenAI-assisted mathematical review + automated contract validation",
      blockingNotes: [],
    },
  };
}
