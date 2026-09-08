import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "CPLX-POLAR-USE";
const SOURCE_RECORD_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/2025-agp-complex-polar-source.md";

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
    difficulty: "easy",
    stem: "حوّل ع = ١ + √٣ ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢، π⁄٣]", "[٢، π⁄٦]", "[٢، −π⁄٣]", "[√٣، π⁄٣]"],
    correctIndex: 0,
    explanation: "ر = √(١² + (√٣)²) = ٢. العدد في الربع الأول، وظا θ = √٣؛ إذن θ = π⁄٣، فالصورة [٢، π⁄٣].",
    source: { model: 1, page: 6, question: 25 },
  },
  {
    difficulty: "medium",
    stem: "حوّل ع = −٢ − ٢ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢√٢، π⁄٤]", "[٢√٢، ٥π⁄٤]", "[٢، ٥π⁄٤]", "[٢√٢، ٣π⁄٤]"],
    correctIndex: 1,
    explanation: "ر = √(٤ + ٤) = ٢√٢. الجزآن الحقيقي والتخيلي سالبان، فالعدد في الربع الثالث، والزاوية المرجعية π⁄٤؛ لذلك θ = ٥π⁄٤.",
    source: { model: 2, page: 9, question: 24 },
  },
  {
    difficulty: "medium",
    stem: "حوّل ع = −١ + √٣ ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢، ٢π⁄٣]", "[٢، π⁄٣]", "[٢، ٤π⁄٣]", "[√٣، ٢π⁄٣]"],
    correctIndex: 0,
    explanation: "ر = √(١ + ٣) = ٢. العدد في الربع الثاني، والزاوية المرجعية π⁄٣؛ إذن θ = π − π⁄٣ = ٢π⁄٣.",
    source: { model: 3, page: 12, question: 24 },
  },
  {
    difficulty: "medium",
    stem: "حوّل ع = ٣ − √٣ ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢√٣، π⁄٦]", "[٢√٣، −π⁄٣]", "[٢√٣، −π⁄٦]", "[٢، −π⁄٦]"],
    correctIndex: 2,
    explanation: "ر = √(٩ + ٣) = ٢√٣. العدد في الربع الرابع، والزاوية المرجعية π⁄٦؛ لذا يمكن كتابة θ = −π⁄٦.",
    source: { model: 4, page: 15, question: 24 },
  },
  {
    difficulty: "easy",
    stem: "حوّل ع = √٣ + ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢، π⁄٣]", "[٢، π⁄٦]", "[√٣، π⁄٦]", "[٢، ٥π⁄٦]"],
    correctIndex: 1,
    explanation: "ر = √(٣ + ١) = ٢. العدد في الربع الأول، وظا θ = ١⁄√٣؛ إذن θ = π⁄٦.",
    source: { model: 5, page: 18, question: 24 },
  },
  {
    difficulty: "hard",
    stem: "حوّل ع = −٣ − √٣ ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢√٣، ٧π⁄٦]", "[٢√٣، ٥π⁄٦]", "[٢√٣، −π⁄٦]", "[٣، ٧π⁄٦]"],
    correctIndex: 0,
    explanation: "ر = √(٩ + ٣) = ٢√٣. العدد في الربع الثالث، والزاوية المرجعية π⁄٦؛ لذلك θ = π + π⁄٦ = ٧π⁄٦.",
    source: { model: 6, page: 21, question: 24 },
  },
  {
    difficulty: "medium",
    stem: "حوّل ع = −√٣ + ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢، π⁄٦]", "[٢، ٥π⁄٦]", "[٢، −π⁄٦]", "[√٣، ٥π⁄٦]"],
    correctIndex: 1,
    explanation: "ر = √(٣ + ١) = ٢. العدد في الربع الثاني، والزاوية المرجعية π⁄٦؛ إذن θ = π − π⁄٦ = ٥π⁄٦.",
    source: { model: 7, page: 24, question: 24 },
  },
  {
    difficulty: "hard",
    stem: "حوّل ع = √٣ − ٣ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢√٣، π⁄٣]", "[٢√٣، −π⁄٦]", "[٢، −π⁄٣]", "[٢√٣، −π⁄٣]"],
    correctIndex: 3,
    explanation: "ر = √(٣ + ٩) = ٢√٣. العدد في الربع الرابع، وظا الزاوية المرجعية = √٣؛ فهي π⁄٣، ولذلك θ = −π⁄٣.",
    source: { model: 8, page: 27, question: 24 },
  },
  {
    difficulty: "easy",
    stem: "حوّل ع = √٢ + √٢ ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢، π⁄٢]", "[٢، π⁄٤]", "[٢√٢، π⁄٤]", "[√٢، π⁄٤]"],
    correctIndex: 1,
    explanation: "ر = √(٢ + ٢) = ٢. الجزآن متساويان وموجبان، فالعدد في الربع الأول وزاويته π⁄٤.",
    source: { model: 9, page: 30, question: 24 },
  },
  {
    difficulty: "hard",
    stem: "حوّل ع = −√٣ − ٣ت إلى الصورة القطبية [ر، θ].",
    options: ["[٢√٣، ٧π⁄٦]", "[٢√٣، ٤π⁄٣]", "[٢√٣، −π⁄٣]", "[٢، ٤π⁄٣]"],
    correctIndex: 1,
    explanation: "ر = √(٣ + ٩) = ٢√٣. العدد في الربع الثالث، والزاوية المرجعية π⁄٣؛ لذلك θ = π + π⁄٣ = ٤π⁄٣.",
    source: { model: 10, page: 33, question: 24 },
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
      adaptationNote: `حُفظ العدد المركب من النموذج ${spec.source.model} سؤال ${spec.source.question}، وأعيدت صياغة السؤال والاختيارات لعرض تدريبي أوضح، مع مطابقة مفتاح الإجابة وحساب الصورة القطبية بصورة مستقلة.`,
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-08T15:00:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const complexPolarPracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const complexPolarPracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:2025-models-v1`,
  skillId: SKILL_ID,
  title: "تدريب: تمثيل العدد المركب بالصورة القطبية",
  questionIds: complexPolarPracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const complexPolarPracticeSkillId = SKILL_ID;
