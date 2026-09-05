import type { ExamDefinition } from "@shared/exams/exam-model";
import { AGP_EXAM_ID } from "./agpExamQuestionFactory";
import { agpExamQuestions } from "./agpExamQuestions";

export const agpGeneralExam: ExamDefinition = {
  schemaVersion: "1.0",
  id: AGP_EXAM_ID,
  title: "رياضيات — الجبر والهندسة والاحتمالات — النموذج العام ٢",
  subject: "رياضيات",
  branch: "الجبر والهندسة والاحتمالات",
  year: 2026,
  durationMinutes: 60,
  availability: "ready",
  source: {
    title: "مقرر رياضيات الثالث الثانوي اليمني — الجبر والهندسة والاحتمالات",
    publisher: "مقرر الثالث الثانوي اليمني — مرجع موضوعات وتدريبات",
    primaryUrl: "https://sahl.io/ye/book/567/ثالث-ثانوي/رياضيات-التمارين-علمي",
    mirrorUrl: "https://www.youtube.com/playlist?list=PLiLqqc43AoR3lQJ1YiLjFq4PRD95lO_rY",
    fileName: "النموذج العام ٢ — صياغة تدريبية جديدة مرتبطة بخريطة المنهج، لا نقل حرفي لاختبار وزاري",
  },
  questions: agpExamQuestions,
  blockingNotes: [],
};

export const agpExamReferences = {
  curriculumSource: agpGeneralExam.source.primaryUrl,
  skillMap: "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/curriculum/math-algebra-geometry-probability-skill-map.json",
  verification: "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/05-agp-model-02-verification.md",
} as const;
