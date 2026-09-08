import type { PracticeDiagnosticRule } from "@shared/practice/practice-diagnostics";
import {
  getPracticeDiagnosticRulesForSkill as getBasePracticeDiagnosticRulesForSkill,
  mathLessonPracticeDiagnosticSkillIds as baseMathLessonPracticeDiagnosticSkillIds,
} from "./mathLessonPracticeDiagnosticsBase";

const complexQuadraticRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:01",
    focusId: "quadratic-discriminant-i",
    focusLabel: "حساب المميز عندما يحتوي معامل ع على ت",
    deepeningGoal: "أن أحسب (ب ت)² باستخدام ت² = −١ قبل متابعة المميز، فلا أتعامل مع ت كعدد حقيقي.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:02",
    focusId: "quadratic-formula-signs",
    focusLabel: "ضبط إشارة −ب وإشارة ± في الصيغة العامة",
    deepeningGoal: "أن أنقل معامل ع إلى البسط بإشارة −ب الصحيحة ثم أتعامل مع فرعي ± دون قلب إشارة أحد الجذرين.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:03",
    focusId: "quadratic-normalize-i-square",
    focusLabel: "تبسيط ت² قبل حل المعادلة",
    deepeningGoal: "أن أحول ت² إلى −١ أولًا عندما تظهر في الحد الثابت، ثم أحل معادلة تربيعية مبسطة بدل إبقاء ت² كما هي.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:04",
    focusId: "quadratic-imaginary-square-root",
    focusLabel: "استخراج الجذر التربيعي لمميز سالب",
    deepeningGoal: "أن أحول √−٤٩ إلى ٧ت وأدخله في الصيغة العامة بدقة بدل إيقاف الحل عند مميز سالب.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:05",
    focusId: "quadratic-normalize-i-square",
    focusLabel: "تبسيط ت² قبل حل المعادلة",
    deepeningGoal: "أن ألاحظ أن −٥ت² = +٥ لأن ت² = −١، وأضبط الإشارة قبل حساب المميز.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:06",
    focusId: "quadratic-normalize-i-square",
    focusLabel: "تبسيط ت² قبل حل المعادلة",
    deepeningGoal: "أن أحول +٦ت² إلى −٦ أولًا ثم أحسب المميز والجذور دون خلط بين معامل ت والحد الحقيقي.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:07",
    focusId: "quadratic-formula-signs",
    focusLabel: "ضبط إشارة −ب وإشارة ± في الصيغة العامة",
    deepeningGoal: "أن أكتب −ب بصورة صحيحة عندما يكون ب سالبًا ثم أقسم كلا فرعي البسط كاملين على ٢.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:08",
    focusId: "quadratic-discriminant-i",
    focusLabel: "حساب المميز عندما يحتوي معامل ع على ت",
    deepeningGoal: "أن أحسب (٥ت)² = −٢٥ ثم أطرح ٤أج، فأصل إلى المميز الحقيقي السالب الصحيح.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:09",
    focusId: "quadratic-imaginary-square-root",
    focusLabel: "استخراج الجذر التربيعي لمميز سالب",
    deepeningGoal: "أن أتعرف على √−١ = ت ثم أستخدمه في الصيغة العامة للوصول إلى الجذرين بدل اعتبار المعادلة بلا حل.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:10",
    focusId: "quadratic-root-pair-check",
    focusLabel: "مراجعة زوج الجذور بعد الحل",
    deepeningGoal: "أن أراجع مجموع الجذرين وحاصل ضربهما مع −ب÷أ و ج÷أ للتأكد من الإشارات قبل اعتماد الإجابة.",
  },
];

export function getPracticeDiagnosticRulesForSkill(skillId: string): readonly PracticeDiagnosticRule[] {
  if (skillId === "CPLX-QUADRATIC-SOLVE") return complexQuadraticRules;
  return getBasePracticeDiagnosticRulesForSkill(skillId);
}

export const mathLessonPracticeDiagnosticSkillIds = Object.freeze([
  ...baseMathLessonPracticeDiagnosticSkillIds,
  "CPLX-QUADRATIC-SOLVE",
]);
