import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "COUNT-PRINCIPLE-APPLY";
const SOURCE_RECORD_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/2025-agp-counting-principle-source.md";

type SourceSpec = {
  model: number;
  page: number;
  answerKeyPage: number;
  question: 14;
  originalKey: 1 | 2;
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
    difficulty: "easy",
    stem: "رُمِي حجر نرد منتظم مرتين متتاليتين. كم عدد النواتج الممكنة للتجربة؟",
    options: ["١٢", "٢٤", "٣٦", "٧٢"],
    correctIndex: 2,
    explanation: "للرمية الأولى ٦ نواتج، ولكل واحد منها ٦ نواتج في الرمية الثانية؛ لذلك وفق مبدأ العد: ٦ × ٦ = ٣٦ ناتجًا.",
    source: { model: 1, page: 6, answerKeyPage: 8, question: 14, originalKey: 1 },
  },
  {
    difficulty: "medium",
    stem: "رُمِيت أربعة أحجار نرد منتظمة ومتميزة معًا. كم عدد النواتج الممكنة؟",
    options: ["٢٤", "٢١٦", "١٢٩٦", "٤٠٩٦"],
    correctIndex: 2,
    explanation: "لكل حجر ٦ نواتج، والأحجار الأربعة متميزة؛ لذلك نضرب عدد الاختيارات أربع مرات: ٦ × ٦ × ٦ × ٦ = ١٢٩٦.",
    source: { model: 2, page: 9, answerKeyPage: 11, question: 14, originalKey: 2 },
  },
  {
    difficulty: "hard",
    stem: "رُمِيت خمسة أحجار نرد منتظمة ومتميزة معًا. كم عدد عناصر فضاء العينة؟",
    options: ["١٢٩٦", "٧٧٧٦", "٣١٢٥", "٤٦٦٥٦"],
    correctIndex: 1,
    explanation: "كل حجر يضيف ٦ اختيارات مستقلة، لذلك عدد النواتج = ٦ × ٦ × ٦ × ٦ × ٦ = ٧٧٧٦.",
    source: { model: 4, page: 15, answerKeyPage: 17, question: 14, originalKey: 2 },
  },
  {
    difficulty: "hard",
    stem: "رُمِيت ستة أحجار نرد منتظمة ومتميزة معًا. كم عدد النواتج الممكنة؟",
    options: ["٧٧٧٦", "١٢٩٦", "٤٦٦٥٦", "٦٤"],
    correctIndex: 2,
    explanation: "لدينا ٦ اختيارات لكل حجر من ستة أحجار؛ إذن عدد النواتج = ٦⁶ = ٤٦٦٥٦.",
    source: { model: 6, page: 21, answerKeyPage: 23, question: 14, originalKey: 2 },
  },
  {
    difficulty: "medium",
    stem: "رُمِيت قطعة نقود منتظمة ست مرات متتالية. كم عدد النواتج الممكنة للسلسلة كاملة؟",
    options: ["١٢", "٣٢", "٦٤", "٣٦"],
    correctIndex: 2,
    explanation: "لكل رمية نتيجتان، ومع ست رميات نطبق قاعدة الضرب: ٢⁶ = ٦٤ سلسلة ممكنة.",
    source: { model: 7, page: 24, answerKeyPage: 26, question: 14, originalKey: 2 },
  },
  {
    difficulty: "easy",
    stem: "رُمِي حجر نرد منتظم وقطعة نقود منتظمة معًا. كم عدد النواتج الممكنة؟",
    options: ["٨", "١٢", "١٦", "٣٦"],
    correctIndex: 1,
    explanation: "لحجر النرد ٦ نواتج ولقطعة النقود نتيجتان؛ لكل ناتج من النرد نتيجتان للنقود، لذلك ٦ × ٢ = ١٢.",
    source: { model: 8, page: 27, answerKeyPage: 29, question: 14, originalKey: 2 },
  },
  {
    difficulty: "medium",
    stem: "رُمِيت قطعتا نقود منتظمتان ومتميزتان وحجر نرد منتظم معًا. كم عدد النواتج الممكنة؟",
    options: ["١٢", "٢٤", "٣٦", "٤٨"],
    correctIndex: 1,
    explanation: "لكل قطعة نقود نتيجتان ولحجر النرد ٦ نواتج؛ إذن عدد النواتج = ٢ × ٢ × ٦ = ٢٤.",
    source: { model: 12, page: 39, answerKeyPage: 41, question: 14, originalKey: 2 },
  },
  {
    difficulty: "medium",
    stem: "رُمِي حجر نرد منتظم ثلاث مرات متتالية. كم عدد النواتج الممكنة؟",
    options: ["٣٦", "٦٤", "٢١٦", "١٢٩٦"],
    correctIndex: 2,
    explanation: "في كل رمية ٦ اختيارات، ومع ثلاث رميات يصبح العدد ٦ × ٦ × ٦ = ٢١٦.",
    source: { model: 13, page: 42, answerKeyPage: 44, question: 14, originalKey: 1 },
  },
  {
    difficulty: "easy",
    stem: "رُمِيت ثلاث قطع نقود منتظمة ومتميزة معًا. كم عدد النواتج الممكنة؟",
    options: ["٦", "٨", "١٢", "٢٤"],
    correctIndex: 1,
    explanation: "لكل قطعة نتيجتان، والقطع الثلاث متميزة؛ لذلك عدد النواتج = ٢ × ٢ × ٢ = ٨.",
    source: { model: 14, page: 45, answerKeyPage: 47, question: 14, originalKey: 2 },
  },
  {
    difficulty: "hard",
    stem: "رُمِي حجر نرد منتظم خمس مرات متتالية. كم عدد النواتج الممكنة؟",
    options: ["٢١٦", "١٢٩٦", "٧٧٧٦", "٤٦٦٥٦"],
    correctIndex: 2,
    explanation: "نكرر ٦ اختيارات في كل واحدة من خمس رميات، لذلك العدد = ٦⁵ = ٧٧٧٦.",
    source: { model: 17, page: 54, answerKeyPage: 56, question: 14, originalKey: 1 },
  },
];

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(spec: LessonSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
  const originalVerdict = spec.source.originalKey === 1 ? "صح" : "خطأ";
  const sourceLabel = `نماذج الجبر والهندسة ثالث ثانوي 2025م — النموذج ${spec.source.model} — السؤال 14 — صفحة PDF ${spec.source.page} — صفحة المفتاح ${spec.source.answerKeyPage} — المفتاح الأصلي ${originalVerdict}`;
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
      adaptationNote: `حُفظت تجربة النموذج ${spec.source.model} في السؤال 14، وحُولت صيغة صح/خطأ إلى سؤال مباشر عن عدد عناصر فضاء العينة، ثم حُسبت الإجابة بصورة مستقلة باستخدام قاعدة الضرب.`,
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-10T02:30:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const countingPrinciplePracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const countingPrinciplePracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:2025-models-v1`,
  skillId: SKILL_ID,
  title: "تدريب: تطبيق مبدأ العد",
  questionIds: countingPrinciplePracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const countingPrinciplePracticeSkillId = SKILL_ID;
