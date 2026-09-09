import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "CPLX-QUADRATIC-SOLVE";
const SOURCE_RECORD_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/2025-agp-complex-quadratic-source.md";

type SourceSpec = {
  model: number;
  page: number;
  answerKeyPage: number;
  question: 27;
  keyOption: 1 | 2 | 3 | 4;
};

type LessonSpec = {
  difficulty: PracticeQuestion["difficulty"];
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  source: SourceSpec;
};

const specs: LessonSpec[] = [
  {
    difficulty: "medium",
    stem: "أوجد مجموعة حل المعادلة ع² + ٦ت ع − ٥ = ٠ في مجموعة الأعداد المركبة.",
    options: ["{ت، ٥ت}", "{−ت، ٥ت}", "{ت، −٥ت}", "{−ت، −٥ت}"],
    correctIndex: 3,
    explanation: "المميز = (٦ت)² − ٤(١)(−٥) = −١٦، ومنه √−١٦ = ٤ت. إذن ع = (−٦ت ± ٤ت) ÷ ٢، فتكون مجموعة الحل {−ت، −٥ت}.",
    source: { model: 13, page: 43, answerKeyPage: 44, question: 27, keyOption: 4 },
  },
  {
    difficulty: "medium",
    stem: "أوجد مجموعة حل المعادلة ع² − ٨ت ع + ٩ = ٠ في مجموعة الأعداد المركبة.",
    options: ["{ت، ٩ت}", "{−ت، −٩ت}", "{−ت، ٩ت}", "{ت، −٩ت}"],
    correctIndex: 2,
    explanation: "المميز = (−٨ت)² − ٤(١)(٩) = −١٠٠، ومنه √−١٠٠ = ١٠ت. إذن ع = (٨ت ± ١٠ت) ÷ ٢، فتكون الجذور ٩ت و−ت.",
    source: { model: 14, page: 46, answerKeyPage: 47, question: 27, keyOption: 3 },
  },
  {
    difficulty: "hard",
    stem: "أوجد مجموعة حل المعادلة ع² − ٦ت ع + ٥ت² = ٠ في مجموعة الأعداد المركبة.",
    options: ["{ت، ٥ت}", "{−ت، ٥ت}", "{ت، −٥ت}", "{−ت، −٥ت}"],
    correctIndex: 0,
    explanation: "نبدأ من ت² = −١، فتصبح المعادلة ع² − ٦ت ع − ٥ = ٠. المميز = −١٦، لذلك √المميز = ٤ت، ومن الصيغة العامة نحصل على ع = ت أو ٥ت.",
    source: { model: 15, page: 49, answerKeyPage: 50, question: 27, keyOption: 1 },
  },
  {
    difficulty: "easy",
    stem: "أوجد مجموعة حل المعادلة ع² − ت ع + ١٢ = ٠ في مجموعة الأعداد المركبة.",
    options: ["{٣ت، ٤ت}", "{−٣ت، −٤ت}", "{−٣ت، ٤ت}", "{٣ت، −٤ت}"],
    correctIndex: 2,
    explanation: "المميز = (−ت)² − ٤(١)(١٢) = −٤٩، ومنه √−٤٩ = ٧ت. إذن ع = (ت ± ٧ت) ÷ ٢، فتكون الجذور ٤ت و−٣ت.",
    source: { model: 16, page: 52, answerKeyPage: 53, question: 27, keyOption: 3 },
  },
  {
    difficulty: "hard",
    stem: "أوجد مجموعة حل المعادلة ع² + ٤ت ع − ٥ت² = ٠ في مجموعة الأعداد المركبة.",
    options: ["{ت، ٥ت}", "{ت، −٥ت}", "{−ت، −٥ت}", "{−ت، ٥ت}"],
    correctIndex: 1,
    explanation: "بما أن ت² = −١ فإن −٥ت² = ٥، فتصبح المعادلة ع² + ٤ت ع + ٥ = ٠. المميز = −٣٦، ومنه √المميز = ٦ت، فتكون الجذور ت و−٥ت.",
    source: { model: 17, page: 55, answerKeyPage: 56, question: 27, keyOption: 2 },
  },
  {
    difficulty: "hard",
    stem: "أوجد مجموعة حل المعادلة ع² + ٧ت ع + ٦ت² = ٠ في مجموعة الأعداد المركبة.",
    options: ["{ت، ٦ت}", "{−ت، ٦ت}", "{ت، −٦ت}", "{−ت، −٦ت}"],
    correctIndex: 3,
    explanation: "نعوض ت² = −١ فتصبح المعادلة ع² + ٧ت ع − ٦ = ٠. المميز = −٢٥، ومنه √المميز = ٥ت. إذن الجذور −ت و−٦ت.",
    source: { model: 19, page: 61, answerKeyPage: 62, question: 27, keyOption: 4 },
  },
  {
    difficulty: "easy",
    stem: "أوجد مجموعة حل المعادلة ع² − ٢ت ع + ٣ = ٠ في مجموعة الأعداد المركبة.",
    options: ["{−ت، ٣ت}", "{ت، ٣ت}", "{−ت، −٣ت}", "{ت، −٣ت}"],
    correctIndex: 0,
    explanation: "المميز = (−٢ت)² − ١٢ = −١٦، ومنه √−١٦ = ٤ت. إذن ع = (٢ت ± ٤ت) ÷ ٢، فتكون مجموعة الحل {−ت، ٣ت}.",
    source: { model: 20, page: 64, answerKeyPage: 65, question: 27, keyOption: 1 },
  },
  {
    difficulty: "medium",
    stem: "أوجد مجموعة حل المعادلة ع² + ٥ت ع + ٦ = ٠ في مجموعة الأعداد المركبة.",
    options: ["{−ت، −٦ت}", "{ت، ٦ت}", "{ت، −٦ت}", "{−ت، ٦ت}"],
    correctIndex: 2,
    explanation: "المميز = (٥ت)² − ٢٤ = −٤٩، ومنه √−٤٩ = ٧ت. إذن ع = (−٥ت ± ٧ت) ÷ ٢، فتكون الجذور ت و−٦ت.",
    source: { model: 21, page: 67, answerKeyPage: 68, question: 27, keyOption: 3 },
  },
  {
    difficulty: "easy",
    stem: "أوجد مجموعة حل المعادلة ع² − ٣ت ع − ٢ = ٠ في مجموعة الأعداد المركبة.",
    options: ["{ت، ٢ت}", "{−ت، ٢ت}", "{ت، −٢ت}", "{−ت، −٢ت}"],
    correctIndex: 0,
    explanation: "المميز = (−٣ت)² − ٤(١)(−٢) = −١، ومنه √−١ = ت. إذن ع = (٣ت ± ت) ÷ ٢، فتكون الجذور ت و٢ت.",
    source: { model: 22, page: 70, answerKeyPage: 71, question: 27, keyOption: 1 },
  },
  {
    difficulty: "medium",
    stem: "أوجد مجموعة حل المعادلة ع² − ٧ت ع + ٨ = ٠ في مجموعة الأعداد المركبة.",
    options: ["{ت، ٨ت}", "{−ت، ٨ت}", "{−ت، −٨ت}", "{ت، −٨ت}"],
    correctIndex: 1,
    explanation: "المميز = (−٧ت)² − ٣٢ = −٨١، ومنه √−٨١ = ٩ت. إذن ع = (٧ت ± ٩ت) ÷ ٢، فتكون الجذور ٨ت و−ت.",
    source: { model: 23, page: 73, answerKeyPage: 74, question: 27, keyOption: 2 },
  },
];

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(spec: LessonSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
  const sourceLabel = `نماذج الجبر والهندسة ثالث ثانوي 2025م — النموذج ${spec.source.model} — السؤال 27 — صفحة PDF ${spec.source.page} — صفحة المفتاح ${spec.source.answerKeyPage} — مفتاح الإجابة ${spec.source.keyOption}`;
  return {
    schemaVersion: "1.0",
    kind: "practice",
    id: `practice:${SKILL_ID}:${number}`,
    skillId: SKILL_ID,
    type: "single-choice",
    difficulty: spec.difficulty,
    stem: [{ type: "text", text: spec.stem }],
    options: spec.options.map((text, optionIndex) => ({
      id: optionIds[optionIndex],
      label: optionLabels[optionIndex],
      content: [{ type: "text", text }],
    })),
    answer: {
      correctOptionId: optionIds[spec.correctIndex],
      explanation: [{ type: "text", text: spec.explanation }],
    },
    provenance: {
      origin: "adapted",
      sourceLabel,
      sourceUrl: SOURCE_RECORD_URL,
      adaptationNote: `حُفظت معادلة النموذج ${spec.source.model} سؤال 27 ومجموعة حلها، ونُظفت صياغة السؤال والبدائل لعرض أوضح على الهاتف مع إبقاء موضع الإجابة الصحيحة مطابقًا للمفتاح وإعادة الحل بصورة مستقلة.`,
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-08T22:55:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const complexQuadraticPracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const complexQuadraticPracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:2025-models-v1`,
  skillId: SKILL_ID,
  title: "تدريب: حل معادلات الدرجة الثانية في الأعداد المركبة",
  questionIds: complexQuadraticPracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const complexQuadraticPracticeSkillId = SKILL_ID;
