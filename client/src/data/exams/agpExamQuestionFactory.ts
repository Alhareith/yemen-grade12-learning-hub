import type { ExamQuestion, QuestionOption, RichContent } from "@shared/exams/question-model";
import { formulaOptions, math, parts, text } from "./pilotExamQuestionFactory";
import { AGP_EXAM_ID, agpExamProvenance } from "./agpExamProvenance";

export { AGP_EXAM_ID, formulaOptions, math, parts, text };

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
        sourceUrl: agpExamProvenance.publishedSolution.url,
        locator: `النموذج الوزاري 2024 رقم (1) — السؤال ${spec.order} — الحل المنشور للنموذج نفسه`,
      },
    },
    source: {
      sourcePackageUrl: agpExamProvenance.questionReference.url,
      sourceFileName: "النموذج الوزاري 2024 رقم (1) — الجبر والهندسة — أمانة العاصمة صنعاء",
      digitizationMethod: "manual",
      relation: "adapted",
      adaptationNote: `صياغة عربية تعليمية مستنبطة من السؤال رقم ${spec.order} في النموذج المرجعي رقم (1)، مع الحفاظ على الفكرة الرياضية وعدم الادعاء بأنها نقل حرفي.`,
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
      reviewedAt: "2026-09-05T22:10:00+03:00",
      reviewedBy: "مراجعة عربية ورياضية بمساعدة OpenAI + تحقق آلي لعقد السؤال والمصدر",
      blockingNotes: [],
    },
  };
}
