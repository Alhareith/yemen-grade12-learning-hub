import type { ExamResultReport, QuestionResultReview } from "./result-report";
import type { RichContent } from "./question-model";
import { buildArabicOutputPolicy } from "../prompts/arabic-output-policy";

export type RemediationConfidence = "signal-only" | "limited" | "good" | "strong";

export type SkillRemediation = {
  skillId: string;
  skillTitle: string;
  questionCount: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  missedCount: number;
  masteryPercentage: number;
  confidence: RemediationConfidence;
  confidenceLabel: string;
  statusLabel: string;
  recommendation: string;
  questionIds: string[];
};

const SKILL_TITLES: Record<string, string> = {
  "LIM-DIRECT": "التعويض المباشر في النهاية",
  "LIM-FACTOR": "النهايات بالتحليل والاختصار",
  "LIM-RATIONALIZE": "النهايات باستخدام المرافق",
  "LIM-INFINITY": "النهايات عند ما لا نهاية",
  "LIM-TRIG": "النهايات المثلثية",
  "CONT-POINT": "اتصال الدالة عند نقطة",
  "CONT-PARAMETER": "إيجاد قيمة تجعل الدالة متصلة",
  "DER-RULES": "قواعد الاشتقاق الأساسية",
  "DER-NTH": "المشتقات من رتب أعلى",
  "DER-EXP-LOG": "اشتقاق الدوال الأسية واللوغاريتمية",
  "DER-TRIG": "اشتقاق الدوال المثلثية",
  "DER-COMPOSITION": "التعرف على تركيب الدوال",
  "DER-CHAIN": "قاعدة التسلسل",
  "APP-TANGENT": "معادلة المماس",
  "APP-NORMAL": "معادلة الناظم",
  "THM-ROLLE-CHECK": "شروط مبرهنة رول",
  "THM-ROLLE-APPLY": "تطبيق مبرهنة رول",
  "THM-MVT-CHECK": "شروط مبرهنة القيمة المتوسطة",
  "THM-MVT-APPLY": "تطبيق مبرهنة القيمة المتوسطة",
  "VAR-CRITICAL": "النقاط الحرجة",
  "VAR-MONOTONICITY": "فترات التزايد والتناقص",
  "VAR-EXTREMA": "القيم القصوى",
  "VAR-INFLECTION": "نقاط الانعطاف",
  "VAR-FULL-STUDY": "دراسة تغيرات الدالة",
  "INT-SUM-LAWS": "قوانين حساب المجموع",
  "INT-DEF": "التكامل المحدد",
  "INT-INTEGRABILITY": "قابلية الدالة للتكامل",
  "INT-COMPARISON": "مبرهنة المقارنة في التكامل",
  "INT-BOUNDS": "الحدان الأعلى والأدنى للتكامل",
  "INT-BASIC-RULES": "قواعد التكامل غير المحدد",
  "INT-TRIG": "تكامل الدوال المثلثية",
  "INT-EXP": "تكامل الدوال الأسية",
  "INT-ANTIDERIVATIVE": "الدالة الأصلية ومعادلة المنحنى",
  "INT-MEAN-VALUE": "القيمة المتوسطة في التكامل",
  "INT-SUBSTITUTION-RECOGNIZE": "اختيار التكامل بالتعويض",
  "INT-SUBSTITUTION-APPLY": "التكامل بالتعويض",
  "INT-BY-PARTS-RECOGNIZE": "اختيار التكامل بالتجزئة",
  "INT-BY-PARTS-APPLY": "التكامل بالتجزئة",
  "INT-DEFINITE-PROPERTIES": "خواص التكامل المحدد",
};

export function getSkillTitle(skillId: string): string {
  return SKILL_TITLES[skillId] ?? skillId;
}

export function buildSkillRemediation(report: ExamResultReport): SkillRemediation[] {
  const groups = new Map<string, QuestionResultReview[]>();

  for (let index = 0; index < report.reviews.length; index += 1) {
    const review = report.reviews[index];
    const current = groups.get(review.primarySkillId) ?? [];
    current.push(review);
    groups.set(review.primarySkillId, current);
  }

  const remediation: SkillRemediation[] = [];
  const entries = Array.from(groups.entries());

  for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
    const [skillId, reviews] = entries[entryIndex];
    const correctCount = reviews.filter((item: QuestionResultReview) => item.status === "correct").length;
    const incorrectCount = reviews.filter((item: QuestionResultReview) => item.status === "incorrect").length;
    const unansweredCount = reviews.filter((item: QuestionResultReview) => item.status === "unanswered").length;
    const attemptedCount = correctCount + incorrectCount;
    const missedCount = incorrectCount + unansweredCount;

    if (missedCount === 0) continue;

    const masteryPercentage = attemptedCount > 0
      ? Math.round((correctCount / attemptedCount) * 100)
      : 0;
    const confidence = confidenceFor(reviews.length);

    remediation.push({
      skillId,
      skillTitle: getSkillTitle(skillId),
      questionCount: reviews.length,
      attemptedCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      missedCount,
      masteryPercentage,
      confidence,
      confidenceLabel: confidenceLabel(confidence),
      statusLabel: statusLabel(confidence, masteryPercentage, attemptedCount),
      recommendation: recommendationFor(confidence, masteryPercentage, attemptedCount),
      questionIds: reviews
        .filter((item: QuestionResultReview) => item.status !== "correct")
        .map((item: QuestionResultReview) => item.questionId),
    });
  }

  return remediation.sort((a, b) => {
    if (b.missedCount !== a.missedCount) return b.missedCount - a.missedCount;
    const confidenceDelta = confidenceRank(b.confidence) - confidenceRank(a.confidence);
    if (confidenceDelta !== 0) return confidenceDelta;
    if (a.masteryPercentage !== b.masteryPercentage) return a.masteryPercentage - b.masteryPercentage;
    return a.skillTitle.localeCompare(b.skillTitle, "ar");
  });
}

export function buildQuestionHelpPrompt(review: QuestionResultReview): string {
  const selected = review.options.find((option) => option.id === review.selectedOptionId);
  const correct = review.options.find((option) => option.id === review.correctOptionId);
  const options = review.options
    .map((option) => `${option.label}) ${richContentToPlainText(option.content)}`)
    .join("\n");

  return [
    "أنا طالب في الصف الثالث الثانوي في اليمن، وأريد فهم خطئي في سؤال رياضيات من التفاضل والتكامل.",
    `المهارة: ${getSkillTitle(review.primarySkillId)}.`,
    "",
    `السؤال: ${richContentToPlainText(review.stem)}`,
    "الخيارات:",
    options,
    `إجابتي: ${selected ? `${selected.label}) ${richContentToPlainText(selected.content)}` : "لم أجب"}`,
    `الإجابة الصحيحة: ${correct ? `${correct.label}) ${richContentToPlainText(correct.content)}` : review.correctOptionId}`,
    "",
    "اشرح لي سبب صحة الإجابة الصحيحة وسبب خطئي خطوة بخطوة بلغة عربية واضحة مناسبة للثالث الثانوي، واذكر القاعدة أو الفكرة التي يجب أن أراجعها، ثم أعطني مثالًا مشابهًا محلولًا وتمرينًا واحدًا مع الإجابة في النهاية.",
    "أكمل الإجابة كاملة في رد واحد ولا تنتظر مني ردًا أثناء الشرح.",
    "",
    buildArabicOutputPolicy("رياضيات"),
  ].join("\n");
}

function richContentToPlainText(content: RichContent): string {
  return content
    .map((segment) => segment.type === "text" ? segment.text : segment.latex)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function confidenceFor(questionCount: number): RemediationConfidence {
  if (questionCount <= 1) return "signal-only";
  if (questionCount === 2) return "limited";
  if (questionCount <= 4) return "good";
  return "strong";
}

function confidenceLabel(confidence: RemediationConfidence): string {
  if (confidence === "signal-only") return "إشارة فقط — تحتاج أسئلة إضافية";
  if (confidence === "limited") return "دليل محدود";
  if (confidence === "good") return "دليل كافٍ لتصنيف أولي";
  return "دليل قوي";
}

function statusLabel(confidence: RemediationConfidence, mastery: number, attemptedCount: number): string {
  if (attemptedCount === 0) return "لم تُختبر المهارة فعليًا";
  if (confidence === "signal-only") return "ظهرت إشارة تحتاج تحقق";
  if (confidence === "limited") return "يبدو أنك تحتاج مراجعة";
  if (mastery < 50) return "فجوة واضحة";
  if (mastery < 70) return "تحتاج مراجعة";
  if (mastery < 85) return "جيد وتحتاج تثبيت";
  return "قوي مع خطأ عابر";
}

function recommendationFor(confidence: RemediationConfidence, mastery: number, attemptedCount: number): string {
  if (attemptedCount === 0) {
    return "راجع الفكرة الأساسية ثم جرّب سؤالين أو ثلاثة قبل الحكم على مستواك.";
  }
  if (confidence === "signal-only") {
    return "لا نحكم من سؤال واحد: راجع المثال المرتبط ثم حل سؤالين مشابهين للتحقق.";
  }
  if (confidence === "limited") {
    return "راجع القاعدة سريعًا ثم حل 3 أسئلة متدرجة قبل إعادة المحاكاة.";
  }
  if (mastery < 50) {
    return "ابدأ بشرح المفهوم من الأساس، ثم مثال محلول، ثم 5 أسئلة متدرجة على المهارة.";
  }
  if (mastery < 70) {
    return "راجع طريقة الحل وحدد موضع الخطأ، ثم تدرب على 4 أسئلة قبل إعادة الاختبار.";
  }
  if (mastery < 85) {
    return "الفهم موجود؛ ركز على تثبيت القاعدة وحل 3 أسئلة متنوعة.";
  }
  return "راجع السؤال الذي أخطأت فيه فقط ثم حل سؤال تحقق واحد؛ لا توجد إشارة لضعف عام.";
}

function confidenceRank(confidence: RemediationConfidence): number {
  if (confidence === "strong") return 4;
  if (confidence === "good") return 3;
  if (confidence === "limited") return 2;
  return 1;
}
