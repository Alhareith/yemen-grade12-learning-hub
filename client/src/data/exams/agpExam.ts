import type { ExamDefinition } from "@shared/exams/exam-model";
import { AGP_EXAM_ID, agpExamProvenance } from "./agpExamProvenance";
import { agpExamQuestions } from "./agpExamQuestions";

export const agpGeneralExam: ExamDefinition = {
  schemaVersion: "1.0",
  id: AGP_EXAM_ID,
  title: "رياضيات — الجبر والهندسة والاحتمالات — النموذج العام ٢",
  subject: "رياضيات",
  branch: "الجبر والهندسة والاحتمالات",
  year: agpExamProvenance.referenceYear,
  durationMinutes: 60,
  availability: "ready",
  source: {
    title: agpExamProvenance.questionReference.title,
    publisher: agpExamProvenance.questionReference.publisher,
    primaryUrl: agpExamProvenance.questionReference.url,
    mirrorUrl: agpExamProvenance.publishedSolution.url,
    fileName: "النموذج الوزاري 2024 رقم (1) — أمانة العاصمة صنعاء — مرجع وحيد لصياغة النموذج العام ٢",
  },
  questions: agpExamQuestions,
  blockingNotes: [],
};

export const agpExamReferences = {
  questionModel: agpExamProvenance.questionReference.url,
  publishedSolution: agpExamProvenance.publishedSolution.url,
  skillMap: "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/curriculum/math-algebra-geometry-probability-skill-map.json",
  verification: "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/05-agp-model-02-verification.md",
} as const;
