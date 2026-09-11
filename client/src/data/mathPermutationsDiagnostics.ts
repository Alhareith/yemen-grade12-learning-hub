import type { PracticeDiagnosticRule } from "@shared/practice/practice-diagnostics";

const SKILL_ID = "COUNT-PERMUTATIONS-APPLY";

export const permutationsDiagnosticRules: readonly PracticeDiagnosticRule[] = [
  {
    questionId: `practice:${SKILL_ID}:01`,
    focusId: "permutation-one-repeat",
    focusLabel: "قسمة المضروب عند تكرار حرف واحد",
    deepeningGoal: "أن أحدد عدد الأحرف كلها ثم أقسم ن! على مضروب عدد مرات تكرار الحرف بدل استخدام ن! مباشرة.",
  },
  {
    questionId: `practice:${SKILL_ID}:02`,
    focusId: "permutation-two-repeats",
    focusLabel: "التعامل مع مجموعتي تكرار داخل الكلمة",
    deepeningGoal: "أن أقسم ن! على حاصل ضرب مضروبي التكرارين عندما يوجد حرفان مختلفان يتكرر كل منهما أكثر من مرة.",
  },
  {
    questionId: `practice:${SKILL_ID}:03`,
    focusId: "permutation-two-repeats",
    focusLabel: "التعامل مع مجموعتي تكرار داخل الكلمة",
    deepeningGoal: "أن ألاحظ تكرار كل من س ول مرتين وأستخدم ٥! ÷ (٢! × ٢!) بدل القسمة على ٢! مرة واحدة.",
  },
  {
    questionId: `practice:${SKILL_ID}:04`,
    focusId: "permutation-one-repeat",
    focusLabel: "قسمة المضروب عند تكرار حرف واحد",
    deepeningGoal: "أن أميز الحرف المتكرر مرة إضافية وأصحح عدد الترتيبات بقسمة ٥! على ٢!.",
  },
  {
    questionId: `practice:${SKILL_ID}:05`,
    focusId: "permutation-all-distinct",
    focusLabel: "استخدام المضروب عندما تكون العناصر مختلفة",
    deepeningGoal: "أن أتعرف على الحالة التي لا يوجد فيها تكرار فأستخدم ن! مباشرة دون قسمة إضافية.",
  },
  {
    questionId: `practice:${SKILL_ID}:06`,
    focusId: "permutation-one-repeat",
    focusLabel: "قسمة المضروب عند تكرار حرف واحد",
    deepeningGoal: "أن أعد تكرار حرف ن بدقة ثم أستخدم ٥! ÷ ٢! للوصول إلى عدد الترتيبات المختلفة.",
  },
  {
    questionId: `practice:${SKILL_ID}:07`,
    focusId: "permutation-one-repeat",
    focusLabel: "قسمة المضروب عند تكرار حرف واحد",
    deepeningGoal: "أن أربط تكرار حرف واحد مرتين بالصيغة ٤! ÷ ٢! بدل اعتبار الأحرف الأربعة مختلفة.",
  },
  {
    questionId: `practice:${SKILL_ID}:08`,
    focusId: "permutation-one-repeat",
    focusLabel: "قسمة المضروب عند تكرار حرف واحد",
    deepeningGoal: "أن أحدد أن حرف د هو المتكرر ثم أقسم ٥! على ٢! بثبات.",
  },
  {
    questionId: `practice:${SKILL_ID}:09`,
    focusId: "permutation-all-distinct",
    focusLabel: "استخدام المضروب عندما تكون العناصر مختلفة",
    deepeningGoal: "أن أتأكد أولًا من عدم وجود أحرف مكررة، ثم أستخدم ٥! = ١٢٠ مباشرة.",
  },
  {
    questionId: `practice:${SKILL_ID}:10`,
    focusId: "permutation-two-repeats",
    focusLabel: "التعامل مع مجموعتي تكرار داخل الكلمة",
    deepeningGoal: "أن ألاحظ أن ب ول يتكرر كل منهما مرتين، لذلك أقسم ٤! على ٢! × ٢! لا على ٢! فقط.",
  },
];

export const permutationsDiagnosticSkillId = SKILL_ID;
