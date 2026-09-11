import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

const SKILL_ID = "COUNT-COMBINATIONS-APPLY";

type LessonSpec = {
  difficulty: PracticeQuestion["difficulty"];
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

const specs: LessonSpec[] = [
  {
    difficulty: "easy",
    stem: "كم طريقة لاختيار طالبين من خمسة طلاب إذا كان ترتيب الطالبين غير مهم؟",
    options: ["٥", "١٠", "٢٠", "٢٥"],
    correctIndex: 1,
    explanation: "لأن الترتيب غير مهم نستخدم التوافيق: ٥ ق ٢ = ٥! ÷ (٢! × ٣!) = ١٠.",
  },
  {
    difficulty: "easy",
    stem: "كم لجنة مختلفة من ثلاثة طلاب يمكن اختيارها من سبعة طلاب؟",
    options: ["٢١", "٣٥", "٤٢", "٢١٠"],
    correctIndex: 1,
    explanation: "اللجنة لا تتغير بتغيير ترتيب أعضائها، لذلك نستخدم ٧ ق ٣ = ٣٥.",
  },
  {
    difficulty: "medium",
    stem: "لدى مكتبة ثمانية كتب مختلفة. كم طريقة لاختيار أربعة كتب منها دون اعتبار للترتيب؟",
    options: ["٣٢", "٥٦", "٧٠", "١٦٨٠"],
    correctIndex: 2,
    explanation: "المطلوب اختيار أربعة من ثمانية بلا ترتيب؛ إذن ٨ ق ٤ = ٧٠.",
  },
  {
    difficulty: "medium",
    stem: "يراد اختيار ثلاثة طلاب من ثمانية، على أن يكون طالب محدد ضمن المجموعة. كم اختيارًا ممكنًا؟",
    options: ["١٥", "٢١", "٣٥", "٥٦"],
    correctIndex: 1,
    explanation: "ثبتنا الطالب المحدد، وبقي اختيار طالبين من السبعة الآخرين: ٧ ق ٢ = ٢١.",
  },
  {
    difficulty: "medium",
    stem: "يراد اختيار ثلاثة طلاب من ثمانية، على ألا يكون طالب محدد ضمن المجموعة. كم اختيارًا ممكنًا؟",
    options: ["٢١", "٣٥", "٥٦", "١٦٨"],
    correctIndex: 1,
    explanation: "نستبعد الطالب المحدد أولًا، فيبقى سبعة طلاب نختار منهم ثلاثة: ٧ ق ٣ = ٣٥.",
  },
  {
    difficulty: "hard",
    stem: "من خمسة طلاب وست طالبات، كم طريقة لاختيار لجنة فيها طالبان وطالبتان؟",
    options: ["٦٠", "١٢٠", "١٥٠", "٣٠٠"],
    correctIndex: 2,
    explanation: "نختار طالبين من خمسة: ٥ ق ٢ = ١٠، وطالبتين من ست: ٦ ق ٢ = ١٥. الاختياران مستقلان، لذلك ١٠ × ١٥ = ١٥٠.",
  },
  {
    difficulty: "hard",
    stem: "يراد اختيار أربعة أشخاص من عشرة، بشرط أن يكون شخصان محددان ضمن المجموعة معًا. كم طريقة ممكنة؟",
    options: ["٢١", "٢٨", "٤٥", "٧٠"],
    correctIndex: 1,
    explanation: "الشخصان المحددان موجودان مسبقًا، فيبقى اختيار شخصين من الثمانية الآخرين: ٨ ق ٢ = ٢٨.",
  },
  {
    difficulty: "hard",
    stem: "يراد اختيار ثلاثة أشخاص من ستة، بشرط ألا يجتمع شخصان محددان معًا في الاختيار. كم طريقة ممكنة؟",
    options: ["١٢", "١٦", "٢٠", "٢٤"],
    correctIndex: 1,
    explanation: "كل الاختيارات = ٦ ق ٣ = ٢٠. الاختيارات التي تجمع الشخصين المحددين معًا تحتاج شخصًا ثالثًا من الأربعة الباقين، وعددها ٤. إذن ٢٠ − ٤ = ١٦.",
  },
  {
    difficulty: "hard",
    stem: "من تسعة أشخاص بينهم شخصان محددان، كم طريقة لاختيار خمسة أشخاص بحيث تضم المجموعة واحدًا على الأقل من الشخصين المحددين؟",
    options: ["٨٤", "١٠٥", "١٢٦", "١٤٧"],
    correctIndex: 1,
    explanation: "نستخدم المتممة: كل الاختيارات = ٩ ق ٥ = ١٢٦. الاختيارات التي لا تضم أيًا من الشخصين = ٧ ق ٥ = ٢١. إذن المطلوب ١٢٦ − ٢١ = ١٠٥.",
  },
  {
    difficulty: "medium",
    stem: "كم مجموعة مختلفة من ثلاثة أعداد يمكن اختيارها من الأعداد {١، ٢، ٣، ٤، ٥، ٦} دون اعتبار لترتيبها؟",
    options: ["١٥", "٢٠", "٣٠", "١٢٠"],
    correctIndex: 1,
    explanation: "كل مجموعة تتحدد بعناصرها لا بترتيبها، لذلك عدد المجموعات = ٦ ق ٣ = ٢٠.",
  },
];

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(spec: LessonSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
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
      origin: "authored",
      adaptationNote: "تدريب أصلي مراجع لدرس التوافيق؛ لا يُنسب إلى نموذج وزاري بعينه.",
    },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-12T02:10:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const combinationsPracticeQuestions: PracticeQuestion[] = specs.map(toQuestion);

export const combinationsPracticeSet: PracticeSet = {
  schemaVersion: "1.0",
  id: `practice-set:${SKILL_ID}:reviewed-v1`,
  skillId: SKILL_ID,
  title: "تدريب: تطبيق التوافيق",
  questionIds: combinationsPracticeQuestions.map((question) => question.id),
  roundSize: 5,
  status: "ready",
};

export const combinationsPracticeSkillId = SKILL_ID;
