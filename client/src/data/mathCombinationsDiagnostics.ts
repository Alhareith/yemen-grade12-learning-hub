import type { PracticeDiagnosticRule } from "@shared/practice/practice-diagnostics";

export const combinationsDiagnosticSkillId = "COUNT-COMBINATIONS-APPLY";

export const combinationsDiagnosticRules: readonly PracticeDiagnosticRule[] = [
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:01",
    focusId: "combination-vs-order",
    focusLabel: "تمييز التوافيق عن الترتيب",
    deepeningGoal: "أن أقرر من صياغة المسألة هل ترتيب المختارين مهم أم لا قبل اختيار القانون.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:02",
    focusId: "combination-formula",
    focusLabel: "تطبيق قانون ن ق ر مباشرة",
    deepeningGoal: "أن أطبق ن ق ر وأبسط المضروبات دون تحويل المسألة إلى تباديل.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:03",
    focusId: "combination-formula",
    focusLabel: "تطبيق قانون ن ق ر مباشرة",
    deepeningGoal: "أن أحسب التوافيق للأعداد المتوسطة باختصار ودون أخطاء في المضروبات.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:04",
    focusId: "combination-required-member",
    focusLabel: "التوافيق مع عنصر مطلوب وجوده",
    deepeningGoal: "أن أثبت العنصر المطلوب أولًا ثم أختار العدد المتبقي من بقية العناصر.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:05",
    focusId: "combination-excluded-member",
    focusLabel: "التوافيق مع عنصر مستبعد",
    deepeningGoal: "أن أحذف العنصر الممنوع من فضاء الاختيار قبل تطبيق قانون التوافيق.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:06",
    focusId: "combination-product-rule",
    focusLabel: "اختيارات من مجموعتين مستقلتين",
    deepeningGoal: "أن أحسب توافيق كل مجموعة على حدة ثم أستخدم مبدأ الضرب عندما يجب تحقيق الشرطين معًا.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:07",
    focusId: "combination-required-members",
    focusLabel: "تثبيت أكثر من عنصر مطلوب",
    deepeningGoal: "أن أثبت جميع العناصر المطلوبة وأحسب فقط عدد الأماكن الباقية التي تحتاج اختيارًا.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:08",
    focusId: "combination-forbidden-pair",
    focusLabel: "استبعاد حالة اجتماع عنصرين",
    deepeningGoal: "أن أحسب جميع الاختيارات ثم أطرح الحالات التي يجتمع فيها العنصران الممنوع اجتماعهما.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:09",
    focusId: "combination-complement",
    focusLabel: "استخدام المتممة في مسائل التوافيق",
    deepeningGoal: "أن أترجم عبارة «واحد على الأقل» إلى كل الحالات ناقص حالة عدم اختيار أي عنصر من المجموعة المحددة.",
  },
  {
    questionId: "practice:COUNT-COMBINATIONS-APPLY:10",
    focusId: "combination-vs-order",
    focusLabel: "تمييز التوافيق عن الترتيب",
    deepeningGoal: "أن أفهم أن المجموعة نفسها لا تتغير بتبديل ترتيب عناصرها، لذلك نعدها مرة واحدة فقط.",
  },
];
