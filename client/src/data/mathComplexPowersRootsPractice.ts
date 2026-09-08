import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "CPLX-POWERS-ROOTS-APPLY";
const SOURCE_RECORD_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/2025-agp-complex-powers-roots-source.md";

type SourceSpec = {
  model: number;
  page: number;
  question: number;
  keyOption: 1 | 2 | 3 | 4;
};

type LessonSpec = {
  kind: "power" | "root";
  difficulty: PracticeQuestion["difficulty"];
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  source: SourceSpec;
};

const specs: LessonSpec[] = [
  {
    kind: "power",
    difficulty: "medium",
    stem: "احسب ت⁵ × ((١ + ت) ÷ (١ − ت))⁸⁴.",
    options: ["١", "−١", "ت", "−ت"],
    correctIndex: 2,
    explanation: "النسبة (١ + ت) ÷ (١ − ت) تساوي ت، لذلك يصبح التعبير ت⁵ × ت⁸⁴ = ت⁸⁹. وبما أن ٨٩ عند القسمة على ٤ يبقى ١، فالناتج ت.",
    source: { model: 1, page: 6, question: 22, keyOption: 3 },
  },
  {
    kind: "root",
    difficulty: "easy",
    stem: "إذا كان √ع = ±(٢ + √٣ ت)، فما قيمة ع؟",
    options: ["٧ + ٤√٣ ت", "١ − ٤√٣ ت", "١ + ٤√٣ ت", "٧ − ٤√٣ ت"],
    correctIndex: 2,
    explanation: "نربع أحد الجذرين: (٢ + √٣ ت)² = ٤ + ٤√٣ ت + ٣ت². ولأن ت² = −١، فإن ع = ١ + ٤√٣ ت.",
    source: { model: 2, page: 9, question: 26, keyOption: 3 },
  },
  {
    kind: "power",
    difficulty: "medium",
    stem: "احسب ت⁶ × ((ت − ١) ÷ (ت + ١))⁸⁴.",
    options: ["−١", "١", "ت", "−ت"],
    correctIndex: 0,
    explanation: "النسبة (ت − ١) ÷ (ت + ١) تساوي ت، فيصبح التعبير ت⁶ × ت⁸⁴ = ت⁹⁰. وبما أن ٩٠ عند القسمة على ٤ يبقى ٢، فإن ت⁹⁰ = ت² = −١.",
    source: { model: 3, page: 12, question: 21, keyOption: 1 },
  },
  {
    kind: "root",
    difficulty: "easy",
    stem: "إذا كان √ع = ±(٢ − √٣ ت)، فما قيمة ع؟",
    options: ["١ − ٤√٣ ت", "٧ − ٤√٣ ت", "١ + ٤√٣ ت", "٧ + ٤√٣ ت"],
    correctIndex: 0,
    explanation: "نربع: (٢ − √٣ ت)² = ٤ − ٤√٣ ت + ٣ت² = ١ − ٤√٣ ت، لأن ت² = −١.",
    source: { model: 4, page: 15, question: 26, keyOption: 1 },
  },
  {
    kind: "power",
    difficulty: "hard",
    stem: "احسب −ت × ((١ − ت) ÷ (١ + ت))⁶⁴.",
    options: ["١", "−١", "ت", "−ت"],
    correctIndex: 3,
    explanation: "النسبة (١ − ت) ÷ (١ + ت) تساوي −ت. والقوة (−ت)⁶⁴ تساوي ١ لأن الأس ٦٤ من مضاعفات ٤، لذلك يبقى الناتج −ت.",
    source: { model: 5, page: 18, question: 21, keyOption: 4 },
  },
  {
    kind: "power",
    difficulty: "easy",
    stem: "احسب ت⁵ × ((١ + ت) ÷ (١ − ت))¹².",
    options: ["−ت", "ت", "−١", "١"],
    correctIndex: 1,
    explanation: "النسبة (١ + ت) ÷ (١ − ت) تساوي ت، فيصبح التعبير ت⁵ × ت¹² = ت¹⁷. والأس ١٧ عند القسمة على ٤ يبقى ١، فالناتج ت.",
    source: { model: 6, page: 21, question: 21, keyOption: 2 },
  },
  {
    kind: "root",
    difficulty: "hard",
    stem: "إذا كان √ع = ±(√٣ − ٢ت)، فما قيمة ع؟",
    options: ["٧ − ٤√٣ ت", "−١ − ٤√٣ ت", "−١ + ٤√٣ ت", "٧ + ٤√٣ ت"],
    correctIndex: 1,
    explanation: "نربع: (√٣ − ٢ت)² = ٣ − ٤√٣ ت + ٤ت². وباستخدام ت² = −١ نحصل على ع = −١ − ٤√٣ ت.",
    source: { model: 7, page: 24, question: 26, keyOption: 2 },
  },
  {
    kind: "power",
    difficulty: "medium",
    stem: "احسب ت³ × ((١ + ت) ÷ (١ − ت))⁸⁴.",
    options: ["١", "−١", "ت", "−ت"],
    correctIndex: 3,
    explanation: "النسبة تساوي ت، لذا يصبح التعبير ت³ × ت⁸⁴ = ت⁸⁷. وبما أن ٨٧ عند القسمة على ٤ يبقى ٣، فإن ت⁸⁷ = ت³ = −ت.",
    source: { model: 8, page: 27, question: 21, keyOption: 4 },
  },
  {
    kind: "root",
    difficulty: "medium",
    stem: "إذا كان √ع = ±(١ + √٢ ت)، فما قيمة ع؟",
    options: ["٣ + ٢√٢ ت", "١ − ٢√٢ ت", "−١ + ٢√٢ ت", "−١ − ٢√٢ ت"],
    correctIndex: 2,
    explanation: "نربع: (١ + √٢ ت)² = ١ + ٢√٢ ت + ٢ت². ولأن ت² = −١، فإن ع = −١ + ٢√٢ ت.",
    source: { model: 9, page: 31, question: 26, keyOption: 3 },
  },
  {
    kind: "root",
    difficulty: "hard",
    stem: "إذا كان √ع = ±(√٣ − √٢ ت)، فما قيمة ع؟",
    options: ["١ − ٢√٦ ت", "٥ − ٢√٦ ت", "١ + ٢√٦ ت", "٥ + ٢√٦ ت"],
    correctIndex: 0,
    explanation: "نربع: (√٣ − √٢ ت)² = ٣ − ٢√٦ ت + ٢ت². وبما أن ت² = −١، فإن ع = ١ − ٢√٦ ت.",
    source: { model: 10, page: 34, question: 26, keyOption: 1 },
  },
];

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(spec: LessonSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
  const sourceLabel = `نماذج الجبر والهندسة ثالث ثانوي 2025م — النموذج ${spec.source.model} — السؤال ${spec.source.question} — صفحة PDF ${spec.source.page} — مفتاح الإجابة ${spec.source.keyOption}`;
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
      adaptationNote: `حُفظ الكائن الرياضي المقصود من النموذج ${spec.source.model} سؤال ${spec.source.question}، وأعيدت صياغته كتمرين ${spec.kind === "power" ? "قوى" : "جذور"} أوضح للهاتف، مع إبقاء موضع الاختيار الصحيح مطابقًا للمفتاح وإعادة الحساب بصورة مستقلة.`,
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-08T16:00:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const complexPowersRootsPracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const complexPowersRootsPracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:2025-models-v1`,
  skillId: SKILL_ID,
  title: "تدريب: القوى والجذور في الأعداد المركبة",
  questionIds: complexPowersRootsPracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const complexPowersRootsPracticeSkillId = SKILL_ID;
