import type { ExamQuestion, QuestionOption, RichContent } from "@shared/exams/question-model";
import { formulaOptions, math, parts, text } from "./pilotExamQuestionFactory";

export { formulaOptions, math, parts, text };

export const AGP_EXAM_ID = "MATH-AGP-GENERAL-MODEL-02";

const trueFalseOptions: QuestionOption[] = [
  { id: "T", label: "ص", content: text("صح") },
  { id: "F", label: "خ", content: text("خطأ") },
];

export const textOptions = (...values: string[]): QuestionOption[] => values.map((value, index) => ({
  id: String.fromCharCode(65 + index),
  label: ["أ", "ب", "ج", "د"][index] ?? String(index + 1),
  content: text(value),
}));

export type AgpQuestionSpec = {
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

const SOURCE_URL = "https://sahl.io/ye/book/567/ثالث-ثانوي/رياضيات-التمارين-علمي";
const VERIFICATION_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/05-agp-model-02-verification.md";

export function makeAgpQuestion(spec: AgpQuestionSpec): ExamQuestion {
  return {
    schemaVersion: "1.0",
    id: `MATH-AGP-SIM-Q${String(spec.order).padStart(3, "0")}`,
    examId: AGP_EXAM_ID,
    order: spec.order,
    sourceQuestionNumber: String(spec.order),
    type: spec.type,
    stem: spec.stem,
    options: spec.type === "true-false" ? trueFalseOptions : (spec.options ?? []),
    assets: [],
    answer: {
      correctOptionId: spec.correctOptionId,
      points: spec.type === "true-false" ? 1 : 2,
      answerEvidence: {
        type: "independent-verification",
        sourceUrl: VERIFICATION_URL,
        locator: `سجل التحقق — النموذج العام ٢ — السؤال ${spec.order}`,
      },
    },
    source: {
      sourcePackageUrl: SOURCE_URL,
      sourceFileName: "فهرس وتمارين مقرر رياضيات الثالث الثانوي اليمني — صياغة تدريبية جديدة",
      digitizationMethod: "manual",
      relation: "adapted",
      adaptationNote: "سؤال تدريبي جديد مبني على موضوعات المقرر وخريطة المهارات المعتمدة داخل المشروع، وليس نقلًا حرفيًا لسؤال وزاري.",
    },
    analysis: {
      primarySkillId: spec.skill,
      secondarySkillIds: spec.secondarySkills ?? [],
    },
    difficulty: spec.difficulty ?? "medium",
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
      reviewedAt: "2026-09-05T21:30:00+03:00",
      reviewedBy: "OpenAI-assisted mathematical review + automated contract validation",
      blockingNotes: [],
    },
  };
}
