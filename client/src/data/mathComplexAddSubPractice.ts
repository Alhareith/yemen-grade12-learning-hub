import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "CPLX-ADD-SUB-APPLY";
const SOURCE_RECORD_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/2025-agp-complex-add-sub-source.md";

type SourceSpec = {
  model: number;
  page: number;
  question: number;
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
    stem: "احسب: (٣ − ٢ت) − (−٣ + ٢ت).",
    options: ["٦ − ٤ت", "٦", "−٤ت", "−٦ + ٤ت"],
    correctIndex: 0,
    explanation: "نطرح الجزأين المتناظرين: ٣ − (−٣) = ٦، و−٢ت − ٢ت = −٤ت؛ إذن الناتج ٦ − ٤ت.",
    source: { model: 2, page: 9, question: 2 },
  },
  {
    difficulty: "medium",
    stem: "يمثل الزوج المرتب (٥، ٢) العدد ٥ + ٢ت. احسب: (٥ + ٢ت) + (٥ − ٤ت).",
    options: ["١٠ + ٦ت", "١٠ − ٢ت", "−٢ت", "١٠ + ٢ت"],
    correctIndex: 1,
    explanation: "نجمع الحقيقي مع الحقيقي والتخيلي مع التخيلي: ٥ + ٥ = ١٠، و٢ت − ٤ت = −٢ت؛ فيكون الناتج ١٠ − ٢ت.",
    source: { model: 3, page: 12, question: 2 },
  },
  {
    difficulty: "easy",
    stem: "يمثل الزوج المرتب (٣، −٢) العدد ٣ − ٢ت. احسب: (٣ − ٢ت) + (−٣ − ٢ت).",
    options: ["−٤ت", "٦ − ٤ت", "−٦", "٤ت"],
    correctIndex: 0,
    explanation: "الجزآن الحقيقيان ٣ و−٣ يتلاشيان، ثم −٢ت − ٢ت = −٤ت؛ إذن الناتج −٤ت.",
    source: { model: 4, page: 15, question: 2 },
  },
  {
    difficulty: "easy",
    stem: "يمثل الزوج المرتب (−٣، ٢) العدد −٣ + ٢ت. احسب: (−٣ + ٢ت) − (٣ + ٢ت).",
    options: ["−٦", "−٦ + ٤ت", "٤ت", "٦"],
    correctIndex: 0,
    explanation: "نوزع الطرح: −٣ + ٢ت − ٣ − ٢ت. يتلاشى الجزآن التخيليان ويبقى −٣ − ٣ = −٦.",
    source: { model: 5, page: 18, question: 2 },
  },
  {
    difficulty: "medium",
    stem: "يمثل الزوج المرتب (−١، −٢) العدد −١ − ٢ت. احسب: (−١ − ٢ت) − (٢ − ت).",
    options: ["−٣ − ت", "١ + ت", "−٣ − ٣ت", "١ − ت"],
    correctIndex: 0,
    explanation: "عند طرح ٢ − ت تتغير إشارتا الحدين: −١ − ٢ت − ٢ + ت = −٣ − ت.",
    source: { model: 6, page: 21, question: 2 },
  },
  {
    difficulty: "medium",
    stem: "يمثل الزوج المرتب (٢، ٣) العدد ٢ + ٣ت. احسب: (٢ − ٣ت) + (٢ + ٣ت).",
    options: ["٤", "٤ت", "−٦ت", "٤ + ٦ت"],
    correctIndex: 0,
    explanation: "−٣ت و+٣ت حدان متعاكسان فيتلاشيان، بينما ٢ + ٢ = ٤؛ إذن الناتج ٤.",
    source: { model: 7, page: 24, question: 2 },
  },
  {
    difficulty: "easy",
    stem: "يمثل الزوج المرتب (١، ٢) العدد ١ + ٢ت. احسب: (١ + ٢ت) − (٢ + ت).",
    options: ["−١ + ت", "−١ − ت", "٣ + ٣ت", "١ + ت"],
    correctIndex: 0,
    explanation: "نطرح الحقيقي من الحقيقي والتخيلي من التخيلي: ١ − ٢ = −١، و٢ت − ت = ت؛ فالناتج −١ + ت.",
    source: { model: 8, page: 27, question: 2 },
  },
  {
    difficulty: "hard",
    stem: "إذا كان √−٤ = ٢ت، فاحسب: (٤ − √−٤) − (٤ + ٢ت).",
    options: ["−٤ت", "٤ت", "٠", "٨ − ٤ت"],
    correctIndex: 0,
    explanation: "نحوّل أولًا √−٤ إلى ٢ت، فتصبح العملية (٤ − ٢ت) − (٤ + ٢ت) = ٤ − ٢ت − ٤ − ٢ت = −٤ت.",
    source: { model: 9, page: 30, question: 2 },
  },
  {
    difficulty: "hard",
    stem: "يمثل الزوج المرتب (−١، −٢) العدد −١ − ٢ت. احسب: (−١ − ٢ت) − (−٢ − ٢ت).",
    options: ["١", "−٣", "١ − ٤ت", "−٣ − ٤ت"],
    correctIndex: 0,
    explanation: "نوزع إشارة الطرح: −١ − ٢ت + ٢ + ٢ت. يتلاشى الجزء التخيلي ويكون الجزء الحقيقي −١ + ٢ = ١.",
    source: { model: 10, page: 33, question: 2 },
  },
  {
    difficulty: "hard",
    stem: "إذا كان √−٤ = ٢ت، فاحسب: (٤ + √−٤) − (٤ + ٢ت).",
    options: ["٠", "٤ت", "٨ + ٤ت", "−٤ت"],
    correctIndex: 0,
    explanation: "بالتعويض √−٤ = ٢ت نحصل على (٤ + ٢ت) − (٤ + ٢ت)، وطرح العدد المركب من نفسه يساوي صفرًا.",
    source: { model: 11, page: 36, question: 2 },
  },
];

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(spec: LessonSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
  const sourceLabel = `نماذج الجبر والهندسة ثالث ثانوي 2025م — النموذج ${spec.source.model} — السؤال ${spec.source.question} — صفحة PDF ${spec.source.page}`;
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
      adaptationNote: `حُفظت العملية الرياضية من النموذج ${spec.source.model} سؤال ${spec.source.question}، وحُولت صيغة صح/خطأ الأصلية إلى اختيار من متعدد أو صياغة تدريبية أوضح، مع مراجعة الناتج مقابل مفتاح الإجابة المنشور للنموذج.`,
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-07T18:00:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const complexAddSubPracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const complexAddSubPracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:2025-models-v1`,
  skillId: SKILL_ID,
  title: "تدريب: إجراء جمع وطرح الأعداد المركبة",
  questionIds: complexAddSubPracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const complexAddSubPracticeSkillId = SKILL_ID;
