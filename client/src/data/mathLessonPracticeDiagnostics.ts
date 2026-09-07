import type { PracticeDiagnosticRule } from "@shared/practice/practice-diagnostics";

const complexNumberRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-NUMBER-USE:01",
    focusId: "complex-components",
    focusLabel: "تمييز الجزء الحقيقي من الجزء التخيلي",
    deepeningGoal: "أن أقرأ العدد أ + ب ت وأحدد الجزء الحقيقي ومعامل الجزء التخيلي دون خلط.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:02",
    focusId: "complex-components",
    focusLabel: "تمييز الجزء الحقيقي من الجزء التخيلي",
    deepeningGoal: "أن أقرأ العدد أ + ب ت وأحدد الجزء الحقيقي ومعامل الجزء التخيلي دون خلط.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:03",
    focusId: "imaginary-unit-powers",
    focusLabel: "قوى الوحدة التخيلية ت",
    deepeningGoal: "أن أفهم ت² = −١ وأستخدم دورة قوى ت بدل الحفظ المتقطع.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:04",
    focusId: "imaginary-unit-powers",
    focusLabel: "قوى الوحدة التخيلية ت",
    deepeningGoal: "أن أفهم ت² = −١ وأستخدم دورة قوى ت بدل الحفظ المتقطع.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:05",
    focusId: "conjugate-modulus",
    focusLabel: "المرافق والمقياس وعلاقتهما بالعدد المركب",
    deepeningGoal: "أن أميز المرافق عن المقياس وأفهم لماذا يتغير الجزء التخيلي فقط في المرافق.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:06",
    focusId: "conjugate-modulus",
    focusLabel: "المرافق والمقياس وعلاقتهما بالعدد المركب",
    deepeningGoal: "أن أميز المرافق عن المقياس وأحسب المقياس من الجزأين الحقيقي والتخيلي.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:07",
    focusId: "complex-equality",
    focusLabel: "تساوي عددين مركبين",
    deepeningGoal: "أن أساوي الجزأين الحقيقيين والتخيليين كلًا مع نظيره وأستخرج المجهولات بثقة.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:08",
    focusId: "complex-classification",
    focusLabel: "تمييز العدد الحقيقي والتخيلي داخل الصورة المركبة",
    deepeningGoal: "أن أحدد متى يكون العدد المركب حقيقيًا أو تخيليًا من قيمة أ أو ب.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:09",
    focusId: "conjugate-modulus",
    focusLabel: "المرافق والمقياس وعلاقتهما بالعدد المركب",
    deepeningGoal: "أن أفهم حاصل ضرب العدد في مرافقه وعلاقته بأ² + ب² بدل تطبيق قاعدة بلا معنى.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:10",
    focusId: "complex-plane",
    focusLabel: "تمثيل العدد المركب على المستوى",
    deepeningGoal: "أن أربط أ + ب ت بالنقطة (أ، ب) وأميز ترتيب الإحداثيين وإشاراتهما.",
  },
];

const diagnosticRulesBySkill: Record<string, readonly PracticeDiagnosticRule[]> = {
  "CPLX-NUMBER-USE": complexNumberRules,
};

export function getPracticeDiagnosticRulesForSkill(skillId: string): readonly PracticeDiagnosticRule[] {
  return diagnosticRulesBySkill[skillId] ?? [];
}

export const mathLessonPracticeDiagnosticSkillIds = Object.freeze(Object.keys(diagnosticRulesBySkill));
