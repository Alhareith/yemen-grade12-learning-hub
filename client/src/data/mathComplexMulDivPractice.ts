import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "CPLX-MUL-DIV-APPLY";
const SOURCE_RECORD_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/2025-agp-complex-mul-div-source.md";

type SourceSpec = {
  model: number;
  page: number;
  question: number;
  evidence: "direct-key" | "expression-adapted";
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
    stem: "إذا كان ع = −٣ − ٣√٣ ت، فما قيمة ع × ع̄؟",
    options: ["٩", "٢٧", "√٦٩", "٣٦"],
    correctIndex: 3,
    explanation: "عند ضرب العدد في مرافقه نستخدم أ² + ب². هنا أ = −٣، وب = −٣√٣؛ لذلك ٩ + ٢٧ = ٣٦.",
    source: { model: 2, page: 9, question: 23, evidence: "direct-key" },
  },
  {
    difficulty: "easy",
    stem: "إذا كان ع = ٣ + ٤ت، فما قيمة ع × ع̄؟",
    options: ["√٢٥", "٢٥", "√١٣", "١٣"],
    correctIndex: 1,
    explanation: "مرافق ع هو ٣ − ٤ت، وحاصل الضرب يساوي ٣² + ٤² = ٩ + ١٦ = ٢٥.",
    source: { model: 3, page: 12, question: 23, evidence: "direct-key" },
  },
  {
    difficulty: "easy",
    stem: "إذا كان ع = ٣ − ٣ت، فما قيمة ع × ع̄؟",
    options: ["٩", "١٢", "١٨", "٢٧"],
    correctIndex: 2,
    explanation: "مرافق ع هو ٣ + ٣ت. حاصل الضرب يساوي ٣² + (−٣)² = ٩ + ٩ = ١٨.",
    source: { model: 4, page: 15, question: 23, evidence: "direct-key" },
  },
  {
    difficulty: "medium",
    stem: "إذا كان ع = −٣ − ٢ت، فما قيمة ع × ع̄؟",
    options: ["٥", "١٣", "√١٣", "√٥"],
    correctIndex: 1,
    explanation: "ع × ع̄ = أ² + ب²، لذلك (−٣)² + (−٢)² = ٩ + ٤ = ١٣.",
    source: { model: 5, page: 18, question: 23, evidence: "direct-key" },
  },
  {
    difficulty: "medium",
    stem: "إذا كان ع = √٣ + ٣ت، فما قيمة ع × ع̄؟",
    options: ["٢٧", "١٢", "٣√٣", "٣"],
    correctIndex: 1,
    explanation: "نربع الجزأين: (√٣)² + ٣² = ٣ + ٩ = ١٢.",
    source: { model: 6, page: 21, question: 23, evidence: "direct-key" },
  },
  {
    difficulty: "hard",
    stem: "بسّط: (١ + √٣ ت) ÷ (١ − √٣ ت).",
    options: ["−١⁄٢ + (√٣⁄٢)ت", "١⁄٢ + (√٣⁄٢)ت", "−١⁄٢ − (√٣⁄٢)ت", "ت"],
    correctIndex: 0,
    explanation: "نضرب البسط والمقام في ١ + √٣ ت. المقام يصبح ١ + ٣ = ٤، والبسط (١ + √٣ ت)² = −٢ + ٢√٣ ت؛ إذن الناتج −١⁄٢ + (√٣⁄٢)ت.",
    source: { model: 2, page: 9, question: 4, evidence: "expression-adapted" },
  },
  {
    difficulty: "hard",
    stem: "بسّط: (√٣ − ت) ÷ (√٣ + ت).",
    options: ["١⁄٢ + (√٣⁄٢)ت", "−١⁄٢ − (√٣⁄٢)ت", "١⁄٢ − (√٣⁄٢)ت", "−ت"],
    correctIndex: 2,
    explanation: "نضرب في مرافق المقام √٣ − ت. المقام يصبح ٣ + ١ = ٤، والبسط (√٣ − ت)² = ٢ − ٢√٣ ت؛ فيكون الناتج ١⁄٢ − (√٣⁄٢)ت.",
    source: { model: 3, page: 12, question: 4, evidence: "expression-adapted" },
  },
  {
    difficulty: "hard",
    stem: "بسّط: (√٣ + √٢ ت) ÷ (√٢ − √٣ ت).",
    options: ["−ت", "ت", "١", "−١"],
    correctIndex: 1,
    explanation: "مرافق المقام هو √٢ + √٣ ت. بعد الضرب يصبح المقام ٢ + ٣ = ٥، بينما البسط يساوي ٥ت؛ لذلك الناتج ت.",
    source: { model: 4, page: 15, question: 4, evidence: "expression-adapted" },
  },
  {
    difficulty: "medium",
    stem: "بسّط: (√٢ + √٢ ت) ÷ (√٢ − √٢ ت).",
    options: ["١", "−١", "ت", "−ت"],
    correctIndex: 2,
    explanation: "نضرب في √٢ + √٢ ت. المقام يساوي ٢ + ٢ = ٤، والبسط (√٢ + √٢ ت)² = ٤ت؛ إذن الناتج ت.",
    source: { model: 6, page: 21, question: 4, evidence: "expression-adapted" },
  },
  {
    difficulty: "hard",
    stem: "بسّط: (√٢ + √٥ ت) ÷ (√٥ − √٢ ت).",
    options: ["ت", "−ت", "√١٠", "١"],
    correctIndex: 0,
    explanation: "نضرب في مرافق المقام √٥ + √٢ ت. المقام يصبح ٥ + ٢ = ٧، والجزء الحقيقي في البسط يتلاشى بينما يصبح الجزء التخيلي ٧ت؛ لذلك الناتج ت.",
    source: { model: 8, page: 27, question: 4, evidence: "expression-adapted" },
  },
];

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(spec: LessonSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
  const evidenceText = spec.source.evidence === "direct-key"
    ? "الناتج مطلوب مباشرة في السؤال الأصلي ومطابق لمفتاح الاختيار المنشور، ثم أعيد حسابه مستقلًا."
    : "التعبير الكسري مأخوذ من السؤال الأصلي عن الترافق؛ قيمة التبسيط في هذا التدريب حُسبت مستقلًا ولا يدّعي السجل أن مفتاح الصح والخطأ يطبعها صراحة.";
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
      adaptationNote: `${evidenceText} صيغت المسألة كتدريب اختيار من متعدد مناسب للهاتف مع الحفاظ على التعبير الرياضي المعتمد من المصدر.`,
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-08T00:12:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const complexMulDivPracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const complexMulDivPracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:2025-models-v1`,
  skillId: SKILL_ID,
  title: "تدريب: إجراء ضرب وقسمة الأعداد المركبة",
  questionIds: complexMulDivPracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const complexMulDivPracticeSkillId = SKILL_ID;
