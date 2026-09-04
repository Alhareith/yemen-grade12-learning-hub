import type { ExamDefinition } from "@shared/exams/exam-model";

export const pilotCalculusExam: ExamDefinition = {
  schemaVersion: "1.0",
  id: "MATH-CALC-2024-PILOT-01",
  title: "رياضيات — التفاضل والتكامل — النموذج التجريبي 2024",
  subject: "رياضيات",
  branch: "التفاضل والتكامل",
  year: 2024,
  durationMinutes: 180,
  availability: "blocked-source-access",
  source: {
    title: "جميع نماذج التفاضل وزاري ٢٠٢٤م",
    publisher: "الإدارة العامة للإعلام التربوي والقناة التعليمية-اليمن",
    primaryUrl: "https://t.me/YemenEducationC/23345",
    mirrorUrl: "https://t.me/s/YemenEducationC/27047",
    fileName: "جميع_نماذج_التفاضل_وزاري_٢٠٢٤م_تجميع_أ_عبير_حيدر_.pdf",
  },
  questions: [],
  blockingNotes: [
    "هوية الحزمة ووجود الحل منشوران، لكن صفحات ملف النموذج ومفتاح الإجابة لم تصبح قابلة للفحص المباشر سؤالًا سؤالًا في مسار الاسترجاع الحالي.",
    "لن يدخل أي سؤال في النسخة العامة قبل مطابقة نصه ورموزه وخياراته وإجابته بالمصدر الأصلي ثم وصوله إلى verified.",
  ],
};

export const pilotExamReferences = {
  officialArchive: "https://meoh.gov.ye/services/high-school-exam-forms/",
  primarySource: pilotCalculusExam.source.primaryUrl,
  mirrorSource: pilotCalculusExam.source.mirrorUrl,
} as const;
