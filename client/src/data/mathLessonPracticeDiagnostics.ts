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

const complexAddSubRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:01",
    focusId: "complex-pair-form",
    focusLabel: "تحويل الزوج المرتب إلى الصورة الجبرية",
    deepeningGoal: "أن أحول (أ، ب) مباشرة إلى أ + ب ت ثم أبدأ العملية دون تبديل الجزأين أو إشاراتهما.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:02",
    focusId: "complex-add-like-parts",
    focusLabel: "جمع الأجزاء المتناظرة في العددين المركبين",
    deepeningGoal: "أن أجمع الحقيقي مع الحقيقي والتخيلي مع التخيلي وأحافظ على إشارة كل حد.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:03",
    focusId: "complex-cancellation",
    focusLabel: "ملاحظة إلغاء الحدود المتعاكسة",
    deepeningGoal: "أن ألاحظ بسرعة متى يتلاشى الجزء الحقيقي أو التخيلي بسبب وجود حدين متعاكسين.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:04",
    focusId: "complex-cancellation",
    focusLabel: "ملاحظة إلغاء الحدود المتعاكسة",
    deepeningGoal: "أن أرتب الحدود بعد الطرح وأتعرف على الأجزاء المتساوية التي تتلاشى بدل إجراء خطوات زائدة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:05",
    focusId: "complex-subtraction-sign",
    focusLabel: "توزيع إشارة السالب عند طرح عدد مركب",
    deepeningGoal: "أن أغير إشارة كل حد داخل العدد المركب المطروح قبل جمع الحدود المتشابهة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:06",
    focusId: "complex-pair-form",
    focusLabel: "تحويل الزوج المرتب إلى الصورة الجبرية",
    deepeningGoal: "أن أربط الزوج (أ، ب) بالصورة أ + ب ت وأستخدمها بثقة داخل عملية جمع.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:07",
    focusId: "complex-subtraction-sign",
    focusLabel: "توزيع إشارة السالب عند طرح عدد مركب",
    deepeningGoal: "أن أطرح الحقيقي والتخيلي كلًا مع نظيره دون فقد إشارة السالب أو تحويلها في حد واحد فقط.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:08",
    focusId: "complex-negative-root",
    focusLabel: "تحويل الجذر السالب إلى صورة تحتوي ت قبل الجمع أو الطرح",
    deepeningGoal: "أن أحول √−٤ إلى ٢ت أولًا ثم أتعامل مع المسألة كجمع أو طرح عادي للأعداد المركبة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:09",
    focusId: "complex-subtraction-sign",
    focusLabel: "توزيع إشارة السالب عند طرح عدد مركب",
    deepeningGoal: "أن أوزع السالب على عدد مركب يحتوي حدودًا سالبة دون الوقوع في خطأ الإشارات المزدوجة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:10",
    focusId: "complex-negative-root",
    focusLabel: "تحويل الجذر السالب إلى صورة تحتوي ت قبل الجمع أو الطرح",
    deepeningGoal: "أن أتعرف بعد تحويل الجذر السالب على حالتي العددين المتساويين وأن طرح أحدهما من الآخر يساوي صفرًا.",
  },
];

const diagnosticRulesBySkill: Record<string, readonly PracticeDiagnosticRule[]> = {
  "CPLX-NUMBER-USE": complexNumberRules,
  "CPLX-ADD-SUB-APPLY": complexAddSubRules,
};

export function getPracticeDiagnosticRulesForSkill(skillId: string): readonly PracticeDiagnosticRule[] {
  return diagnosticRulesBySkill[skillId] ?? [];
}

export const mathLessonPracticeDiagnosticSkillIds = Object.freeze(Object.keys(diagnosticRulesBySkill));
