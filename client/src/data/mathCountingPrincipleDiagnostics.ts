import type { PracticeDiagnosticRule } from "@shared/practice/practice-diagnostics";

const SKILL_ID = "COUNT-PRINCIPLE-APPLY";

export const countingPrincipleDiagnosticRules: readonly PracticeDiagnosticRule[] = [
  {
    questionId: `practice:${SKILL_ID}:01`,
    focusId: "counting-repeated-die",
    focusLabel: "تطبيق قاعدة الضرب على الرميات المتكررة",
    deepeningGoal: "أن أفهم أن لكل رمية حجر نرد ٦ اختيارات، وأن عدد السلاسل الكلي ينتج من ضرب ٦ في نفسها بعدد الرميات.",
  },
  {
    questionId: `practice:${SKILL_ID}:02`,
    focusId: "counting-distinct-dice",
    focusLabel: "تمييز عدد الخيارات لكل عنصر في تجربة مركبة",
    deepeningGoal: "أن أحدد ٦ اختيارات لكل حجر نرد مميز، ثم أضرب أعداد الاختيارات بدل جمعها.",
  },
  {
    questionId: `practice:${SKILL_ID}:03`,
    focusId: "counting-power-form",
    focusLabel: "تحويل الضرب المتكرر إلى قوة",
    deepeningGoal: "أن أربط تكرار ستة اختيارات خمس مرات بالصيغة ٦⁵ وأحسبها دون إسقاط مرحلة من المراحل.",
  },
  {
    questionId: `practice:${SKILL_ID}:04`,
    focusId: "counting-power-form",
    focusLabel: "تحويل الضرب المتكرر إلى قوة",
    deepeningGoal: "أن أمثل ست مراحل لكل منها ٦ اختيارات بالصيغة ٦⁶ وأميزها عن ٦×٦ أو ٦×٦×٦ فقط.",
  },
  {
    questionId: `practice:${SKILL_ID}:05`,
    focusId: "counting-repeated-coin",
    focusLabel: "عد نواتج رميات قطعة النقود المتكررة",
    deepeningGoal: "أن أفهم أن لكل رمية قطعة نقود نتيجتين، ولذلك نستخدم ٢^ن عند تكرار الرمية ن مرات.",
  },
  {
    questionId: `practice:${SKILL_ID}:06`,
    focusId: "counting-mixed-stages",
    focusLabel: "ضرب عدد النتائج في تجربة من نوعين",
    deepeningGoal: "أن أضرب عدد نواتج حجر النرد في عدد نواتج قطعة النقود عندما تحدث المرحلتان معًا، بدل جمعهما.",
  },
  {
    questionId: `practice:${SKILL_ID}:07`,
    focusId: "counting-mixed-stages",
    focusLabel: "ضرب عدد النتائج في تجربة من عدة أنواع",
    deepeningGoal: "أن أفكك التجربة إلى مراحل: قطعة أولى × قطعة ثانية × حجر نرد، ثم أضرب ٢×٢×٦ بثبات.",
  },
  {
    questionId: `practice:${SKILL_ID}:08`,
    focusId: "counting-power-form",
    focusLabel: "استخدام القوة لتمثيل تكرار المرحلة نفسها",
    deepeningGoal: "أن أميز أن ثلاث رميات لحجر النرد تعني ٦³ لا ٦×٣، ثم أربط القوة بمبدأ العد.",
  },
  {
    questionId: `practice:${SKILL_ID}:09`,
    focusId: "counting-distinct-coins",
    focusLabel: "عد نواتج قطع نقود متميزة",
    deepeningGoal: "أن أتعامل مع كل قطعة نقود متميزة كمرحلة لها نتيجتان وأحسب ٢×٢×٢ دون حذف ترتيب القطع.",
  },
  {
    questionId: `practice:${SKILL_ID}:10`,
    focusId: "counting-power-form",
    focusLabel: "استخدام القوة لعدد كبير من المراحل المتكررة",
    deepeningGoal: "أن أحول خمس رميات لحجر النرد إلى ٦⁵ وأحسب الناتج بالتدرج مع التحقق من عدم نسيان رمية.",
  },
];

export const countingPrincipleDiagnosticSkillId = SKILL_ID;
