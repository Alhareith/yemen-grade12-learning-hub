import type { ExamResultReport, QuestionResultReview } from "./result-report";
import { getSkillTitle } from "./remediation";

export type DashboardConfidence = "signal" | "limited" | "good" | "strong";
export type LearningDomainId =
  | "limits-continuity"
  | "derivatives"
  | "applications-theorems"
  | "curve-analysis"
  | "integration";

export type DomainPerformance = {
  id: LearningDomainId;
  title: string;
  questionCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  missedCount: number;
  earnedPoints: number;
  maxPoints: number;
  percentage: number;
  confidence: DashboardConfidence;
  confidenceLabel: string;
  statusLabel: string;
  priorityScore: number;
  weakSkills: Array<{
    skillId: string;
    title: string;
    missedCount: number;
    questionCount: number;
  }>;
};

export type LearningDashboard = {
  attemptLabel: string;
  headline: string;
  summary: string;
  domains: DomainPerformance[];
  focusDomains: DomainPerformance[];
  strongestDomains: DomainPerformance[];
  primaryFocus?: DomainPerformance;
  plan: string[];
};

const DOMAIN_META: Record<LearningDomainId, { title: string; prefixes: string[] }> = {
  "limits-continuity": {
    title: "النهايات والاتصال",
    prefixes: ["LIM-", "CONT-"],
  },
  derivatives: {
    title: "الاشتقاق وقواعده",
    prefixes: ["DER-"],
  },
  "applications-theorems": {
    title: "تطبيقات الاشتقاق والمبرهنات",
    prefixes: ["APP-", "THM-"],
  },
  "curve-analysis": {
    title: "دراسة تغيرات الدالة",
    prefixes: ["VAR-"],
  },
  integration: {
    title: "التكامل",
    prefixes: ["INT-"],
  },
};

export function buildLearningDashboard(report: ExamResultReport): LearningDashboard {
  const domainIds = Object.keys(DOMAIN_META) as LearningDomainId[];
  const domains = domainIds
    .map((id) => buildDomain(id, report.reviews))
    .filter((domain) => domain.questionCount > 0);

  const focusDomains = domains
    .filter((domain) => domain.missedCount > 0)
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
      if (a.percentage !== b.percentage) return a.percentage - b.percentage;
      return b.questionCount - a.questionCount;
    });

  const strongestDomains = domains
    .filter((domain) => domain.questionCount >= 3 && domain.percentage >= 80)
    .sort((a, b) => b.percentage - a.percentage || b.questionCount - a.questionCount);

  const primaryFocus = focusDomains[0];
  const attemptLabel = attemptLabelFor(report.score.percentage);
  const headline = headlineFor(report.score.percentage, primaryFocus);
  const summary = summaryFor(report, primaryFocus, focusDomains.length, strongestDomains.length);
  const plan = buildPlan(primaryFocus, focusDomains[1]);

  return {
    attemptLabel,
    headline,
    summary,
    domains,
    focusDomains,
    strongestDomains,
    primaryFocus,
    plan,
  };
}

function buildDomain(id: LearningDomainId, reviews: QuestionResultReview[]): DomainPerformance {
  const meta = DOMAIN_META[id];
  const domainReviews = reviews.filter((review) =>
    meta.prefixes.some((prefix) => review.primarySkillId.startsWith(prefix)),
  );

  const correctCount = countStatus(domainReviews, "correct");
  const incorrectCount = countStatus(domainReviews, "incorrect");
  const unansweredCount = countStatus(domainReviews, "unanswered");
  const missedCount = incorrectCount + unansweredCount;
  const earnedPoints = domainReviews.reduce((sum, review) => sum + review.earnedPoints, 0);
  const maxPoints = domainReviews.reduce((sum, review) => sum + review.maxPoints, 0);
  const percentage = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;
  const confidence = confidenceFor(domainReviews.length);
  const weakSkills = buildWeakSkills(domainReviews);
  const priorityScore = missedCount === 0
    ? 0
    : ((100 - percentage) * confidenceWeight(confidence)) + (missedCount * 12) + (unansweredCount * 4);

  return {
    id,
    title: meta.title,
    questionCount: domainReviews.length,
    correctCount,
    incorrectCount,
    unansweredCount,
    missedCount,
    earnedPoints,
    maxPoints,
    percentage,
    confidence,
    confidenceLabel: confidenceLabel(confidence, domainReviews.length),
    statusLabel: statusLabel(percentage, confidence, domainReviews.length),
    priorityScore,
    weakSkills,
  };
}

function buildWeakSkills(reviews: QuestionResultReview[]) {
  const groups = new Map<string, { questionCount: number; missedCount: number }>();

  for (const review of reviews) {
    const current = groups.get(review.primarySkillId) ?? { questionCount: 0, missedCount: 0 };
    current.questionCount += 1;
    if (review.status !== "correct") current.missedCount += 1;
    groups.set(review.primarySkillId, current);
  }

  return Array.from(groups.entries())
    .filter(([, counts]) => counts.missedCount > 0)
    .map(([skillId, counts]) => ({
      skillId,
      title: getSkillTitle(skillId),
      missedCount: counts.missedCount,
      questionCount: counts.questionCount,
    }))
    .sort((a, b) => b.missedCount - a.missedCount || b.questionCount - a.questionCount)
    .slice(0, 3);
}

function countStatus(reviews: QuestionResultReview[], status: QuestionResultReview["status"]): number {
  return reviews.filter((review) => review.status === status).length;
}

function confidenceFor(questionCount: number): DashboardConfidence {
  if (questionCount <= 2) return "signal";
  if (questionCount <= 4) return "limited";
  if (questionCount <= 7) return "good";
  return "strong";
}

function confidenceWeight(confidence: DashboardConfidence): number {
  if (confidence === "strong") return 4;
  if (confidence === "good") return 3;
  if (confidence === "limited") return 2;
  return 1;
}

function confidenceLabel(confidence: DashboardConfidence, questionCount: number): string {
  if (confidence === "signal") return `إشارة أولية من ${questionCount} سؤال`;
  if (confidence === "limited") return `دليل محدود من ${questionCount} أسئلة`;
  if (confidence === "good") return `دليل جيد من ${questionCount} أسئلة`;
  return `دليل قوي من ${questionCount} أسئلة`;
}

function statusLabel(percentage: number, confidence: DashboardConfidence, questionCount: number): string {
  if (questionCount <= 2) return "إشارة تحتاج تحقق";
  if (percentage < 50) return "يحتاج بناء من الأساس";
  if (percentage < 70) return "يحتاج مراجعة مركزة";
  if (percentage < 85) return "جيد ويحتاج تثبيت";
  if (confidence === "limited") return "أداء جيد مع دليل محدود";
  return "قوي في هذه المحاولة";
}

function attemptLabelFor(percentage: number): string {
  if (percentage >= 85) return "أداء قوي";
  if (percentage >= 70) return "قريب من الإتقان";
  if (percentage >= 50) return "أساس موجود ويحتاج مراجعة";
  return "تحتاج إعادة بناء مركزة";
}

function headlineFor(percentage: number, primaryFocus?: DomainPerformance): string {
  if (!primaryFocus) {
    return percentage >= 85
      ? "نتيجتك قوية ولا توجد فجوة واضحة في هذه المحاولة"
      : "لا توجد أولوية ضعف واضحة من الأسئلة التي ظهرت لك";
  }

  if (percentage >= 85) return `درجتك قوية، لكن ابدأ بتثبيت ${primaryFocus.title}`;
  if (percentage >= 70) return `أقصر طريق للتحسن الآن: ${primaryFocus.title}`;
  if (percentage >= 50) return `ابدأ بـ ${primaryFocus.title} قبل إعادة المحاكاة`;
  return `لا تراجع كل شيء دفعة واحدة؛ ابدأ بـ ${primaryFocus.title}`;
}

function summaryFor(
  report: ExamResultReport,
  primaryFocus: DomainPerformance | undefined,
  focusCount: number,
  strongCount: number,
): string {
  if (!primaryFocus) {
    return `أجبت ${report.score.correctCount} سؤالًا بصورة صحيحة. استخدم مراجعة الأسئلة أدناه للتأكد من أي خطأ فردي، ثم أعد المحاكاة لاحقًا للتحقق من الثبات.`;
  }

  const strongPart = strongCount > 0
    ? ` وفي المقابل لديك ${strongCount} مجال ظهر فيه أداء قوي.`
    : "";
  return `أعلى أولوية ظهرت في ${primaryFocus.title}: ${primaryFocus.missedCount} خطأ أو سؤال غير مجاب من أصل ${primaryFocus.questionCount}. يوجد ${focusCount} مجال يحتاج انتباهًا في هذه المحاولة.${strongPart}`;
}

function buildPlan(primary?: DomainPerformance, secondary?: DomainPerformance): string[] {
  if (!primary) {
    return [
      "راجع أي سؤال فردي أخطأت فيه من قائمة المراجعة.",
      "إذا وجدت سؤالًا لم تفهمه، استخدم زر «انسخ برومبت لشرح خطئي» بدل حفظ الإجابة.",
      "أعد المحاكاة لاحقًا للتأكد أن الأداء ثابت وليس نتيجة محاولة واحدة فقط.",
    ];
  }

  const firstSkill = primary.weakSkills[0]?.title;
  const firstStep = firstSkill
    ? `ابدأ داخل ${primary.title} بمراجعة «${firstSkill}»؛ فهي أول مهارة ظهرت فيها أخطاء ضمن هذا المجال.`
    : `ابدأ بمراجعة الفكرة الأساسية في ${primary.title}.`;
  const secondStep = secondary
    ? `بعدها انتقل إلى ${secondary.title}، ولا تفتح مجالًا ثالثًا قبل إنهاء أولويتين.`
    : "بعد المراجعة حل ٣ أسئلة مشابهة قبل الانتقال إلى موضوع آخر.";

  return [
    firstStep,
    "افتح أول سؤال خاطئ في هذا المجال، واقرأ الشرح المراجع ثم انسخ برومبت شرح الخطأ إذا بقي السبب غير واضح.",
    secondStep,
  ];
}
