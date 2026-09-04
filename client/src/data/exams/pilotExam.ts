import type { ExamDefinition } from "@shared/exams/exam-model";
import { pilotExamQuestions01 } from "./pilotExamQuestions01";
import { pilotExamQuestions02 } from "./pilotExamQuestions02";
import { PILOT_EXAM_ID, pilotExamProvenance } from "./pilotExamProvenance";

export const pilotCalculusExam: ExamDefinition = {
  schemaVersion: "1.0",
  id: PILOT_EXAM_ID,
  title: "رياضيات — التفاضل والتكامل — محاكاة وزارية تدريبية",
  subject: "رياضيات",
  branch: "التفاضل والتكامل",
  year: 2020,
  durationMinutes: pilotExamProvenance.referenceFormat.durationMinutes,
  availability: "ready",
  source: {
    title: "مرجع بنية: نماذج اختبارات وزارية في التفاضل والتكامل 2020",
    publisher: pilotExamProvenance.primaryReference.publisher,
    primaryUrl: pilotExamProvenance.primaryReference.url,
    mirrorUrl: pilotExamProvenance.readableSolvedMirror.url,
    fileName: "اختبارات التفاضل والتكامل مع الإجابة 2020م — مرجع بنية، لا نص حرفي للمحاكاة",
  },
  questions: [...pilotExamQuestions01, ...pilotExamQuestions02],
  blockingNotes: [],
};

export const pilotExamReferences = {
  officialArchive: "https://meoh.gov.ye/services/high-school-exam-forms/",
  primarySource: pilotCalculusExam.source.primaryUrl,
  readableSolvedMirror: pilotExamProvenance.readableSolvedMirror.url,
  provenance: pilotExamProvenance,
} as const;
