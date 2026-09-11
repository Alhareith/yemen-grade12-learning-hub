import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "COUNT-PERMUTATIONS-APPLY";
const SOURCE_RECORD_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/2025-agp-permutations-source.md";

type SourceSpec = {
  model: number;
  page: number;
  answerKeyPage: number;
  question: 9;
  originalKey: 1 | 2;
};

type LessonSpec = {
  difficulty: PracticeQuestion["difficulty"];
  word: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  source: SourceSpec;
};

const specs: LessonSpec[] = [
  {
    difficulty: "easy",
    word: "تصميم",
    options: ["٢٠", "٣٠", "٦٠", "١٢٠"],
    correctIndex: 2,
    explanation: "الكلمة من خمسة أحرف، وحرف م مكرر مرتين؛ لذلك عدد الترتيبات = ٥! ÷ ٢! = ٦٠.",
    source: { model: 4, page: 15, answerKeyPage: 17, question: 9, originalKey: 1 },
  },
  {
    difficulty: "hard",
    word: "سلسبيل",
    options: ["٩٠", "١٢٠", "١٨٠", "٣٦٠"],
    correctIndex: 2,
    explanation: "الكلمة من ستة أحرف، ويتكرر س مرتين ول مرتين؛ لذلك العدد = ٦! ÷ (٢! × ٢!) = ١٨٠.",
    source: { model: 5, page: 18, answerKeyPage: 20, question: 9, originalKey: 1 },
  },
  {
    difficulty: "hard",
    word: "سلاسل",
    options: ["٢٠", "٣٠", "٦٠", "١٢٠"],
    correctIndex: 1,
    explanation: "الكلمة من خمسة أحرف، ويتكرر س مرتين ول مرتين؛ إذن ٥! ÷ (٢! × ٢!) = ٣٠.",
    source: { model: 7, page: 24, answerKeyPage: 26, question: 9, originalKey: 1 },
  },
  {
    difficulty: "medium",
    word: "مقاوم",
    options: ["٣٠", "٦٠", "١٢٠", "٢٤٠"],
    correctIndex: 1,
    explanation: "هناك خمسة أحرف وحرف م يتكرر مرتين؛ لذلك عدد الترتيبات المختلفة = ٥! ÷ ٢! = ٦٠.",
    source: { model: 11, page: 36, answerKeyPage: 38, question: 9, originalKey: 2 },
  },
  {
    difficulty: "easy",
    word: "بيان",
    options: ["١٢", "٢٤", "٦٠", "١٢٠"],
    correctIndex: 1,
    explanation: "الأحرف الأربعة مختلفة، لذلك عدد الترتيبات = ٤! = ٢٤.",
    source: { model: 12, page: 39, answerKeyPage: 41, question: 9, originalKey: 2 },
  },
  {
    difficulty: "medium",
    word: "بنيان",
    options: ["٣٠", "٦٠", "٩٠", "١٢٠"],
    correctIndex: 1,
    explanation: "الكلمة من خمسة أحرف وحرف ن مكرر مرتين؛ لذلك ٥! ÷ ٢! = ٦٠.",
    source: { model: 14, page: 45, answerKeyPage: 47, question: 9, originalKey: 1 },
  },
  {
    difficulty: "easy",
    word: "بنان",
    options: ["٦", "١٢", "٢٤", "٤٨"],
    correctIndex: 1,
    explanation: "الكلمة من أربعة أحرف وحرف ن مكرر مرتين؛ لذلك ٤! ÷ ٢! = ١٢.",
    source: { model: 16, page: 51, answerKeyPage: 53, question: 9, originalKey: 1 },
  },
  {
    difficulty: "medium",
    word: "تشديد",
    options: ["٣٠", "٦٠", "١٢٠", "٢٤٠"],
    correctIndex: 1,
    explanation: "الكلمة من خمسة أحرف وحرف د مكرر مرتين؛ لذلك ٥! ÷ ٢! = ٦٠.",
    source: { model: 17, page: 54, answerKeyPage: 56, question: 9, originalKey: 1 },
  },
  {
    difficulty: "medium",
    word: "تحشيد",
    options: ["٦٠", "٩٠", "١٢٠", "٢٤٠"],
    correctIndex: 2,
    explanation: "الأحرف الخمسة مختلفة؛ لذلك عدد الترتيبات = ٥! = ١٢٠.",
    source: { model: 19, page: 60, answerKeyPage: 62, question: 9, originalKey: 1 },
  },
  {
    difficulty: "hard",
    word: "بلبل",
    options: ["٤", "٦", "١٢", "٢٤"],
    correctIndex: 1,
    explanation: "الكلمة من أربعة أحرف، ويتكرر ب مرتين ول مرتين؛ لذلك ٤! ÷ (٢! × ٢!) = ٦.",
    source: { model: 24, page: 75, answerKeyPage: 77, question: 9, originalKey: 2 },
  },
];

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(spec: LessonSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
  const originalVerdict = spec.source.originalKey === 1 ? "صح" : "خطأ";
  const sourceLabel = `نماذج الجبر والهندسة ثالث ثانوي 2025م — النموذج ${spec.source.model} — السؤال 9 — صفحة PDF ${spec.source.page} — صفحة المفتاح ${spec.source.answerKeyPage} — المفتاح الأصلي ${originalVerdict}`;
  return {
    schemaVersion: "1.0",
    kind: "practice",
    id: `practice:${SKILL_ID}:${number}`,
    skillId: SKILL_ID,
    type: "single-choice",
    difficulty: spec.difficulty,
    stem: [{ type: "text", text: `كم عدد الترتيبات المختلفة الممكنة لأحرف كلمة «${spec.word}»؟` }],
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
      adaptationNote: `حُفظت كلمة النموذج ${spec.source.model} في السؤال 9، وحُولت صيغة صح/خطأ الأصلية إلى سؤال مباشر لحساب عدد الترتيبات، ثم أُعيد الحساب مستقلًا قبل النشر.`,
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-11T18:05:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const permutationsPracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const permutationsPracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:2025-models-v1`,
  skillId: SKILL_ID,
  title: "تدريب: تطبيق التباديل",
  questionIds: permutationsPracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const permutationsPracticeSkillId = SKILL_ID;
