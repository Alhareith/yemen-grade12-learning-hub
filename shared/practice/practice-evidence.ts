import type { PracticeBank } from "./practice-model";
import {
  buildPracticeSessionResult,
  type PracticeSession,
  type PracticeSessionResult,
} from "./practice-engine";

export type PracticeEvidenceConfidence = "none" | "signal-only" | "limited" | "good" | "strong";
export type PracticeEvidenceStatus = "insufficient-evidence" | "needs-review" | "developing" | "promising" | "strong-round";

export type SkillPracticeEvidence = {
  schemaVersion: "1.0";
  skillId: string;
  completedSessionCount: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  uniqueQuestionCount: number;
  repeatedMissQuestionIds: string[];
  confidence: PracticeEvidenceConfidence;
  confidenceLabel: string;
  status: PracticeEvidenceStatus;
  statusLabel: string;
  recommendation: string;
};

export function buildSkillPracticeEvidence(
  sessions: PracticeSession[],
  bank: PracticeBank,
  skillId: string,
): SkillPracticeEvidence {
  const completed = sessions.filter((session) => session.skillId === skillId && session.completedAt !== undefined);
  const results = completed.map((session) => buildPracticeSessionResult(session, bank));
  return buildEvidenceFromResults(skillId, results);
}

export function buildEvidenceFromResults(
  skillId: string,
  results: PracticeSessionResult[],
): SkillPracticeEvidence {
  const relevant = results.filter((result) => result.skillId === skillId);
  const answeredCount = relevant.reduce((sum, result) => sum + result.questionCount, 0);
  const correctCount = relevant.reduce((sum, result) => sum + result.correctCount, 0);
  const incorrectCount = relevant.reduce((sum, result) => sum + result.incorrectCount, 0);
  const percentage = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);
  const uniqueQuestionIds = new Set<string>();
  const missCounts = new Map<string, number>();

  relevant.forEach((result) => {
    result.questions.forEach((question) => {
      uniqueQuestionIds.add(question.questionId);
      if (!question.correct) missCounts.set(question.questionId, (missCounts.get(question.questionId) ?? 0) + 1);
    });
  });

  const repeatedMissQuestionIds = Array.from(missCounts.entries())
    .filter(([, count]) => count >= 2)
    .map(([questionId]) => questionId)
    .sort();
  const confidence = confidenceFor(uniqueQuestionIds.size, relevant.length);
  const status = statusFor({ answeredCount, percentage, confidence, repeatedMissCount: repeatedMissQuestionIds.length });

  return {
    schemaVersion: "1.0",
    skillId,
    completedSessionCount: relevant.length,
    answeredCount,
    correctCount,
    incorrectCount,
    percentage,
    uniqueQuestionCount: uniqueQuestionIds.size,
    repeatedMissQuestionIds,
    confidence,
    confidenceLabel: confidenceLabel(confidence),
    status,
    statusLabel: statusLabel(status),
    recommendation: recommendationFor(status, confidence, repeatedMissQuestionIds.length),
  };
}

function confidenceFor(uniqueQuestionCount: number, completedSessionCount: number): PracticeEvidenceConfidence {
  if (uniqueQuestionCount === 0) return "none";
  if (uniqueQuestionCount <= 2) return "signal-only";
  if (uniqueQuestionCount <= 4) return "limited";
  if (uniqueQuestionCount >= 8 && completedSessionCount >= 2) return "strong";
  return "good";
}

function statusFor(input: {
  answeredCount: number;
  percentage: number;
  confidence: PracticeEvidenceConfidence;
  repeatedMissCount: number;
}): PracticeEvidenceStatus {
  if (input.answeredCount === 0) return "insufficient-evidence";
  if (input.percentage < 50) return "needs-review";
  if (input.repeatedMissCount > 0 && input.percentage < 80) return "needs-review";
  if (input.percentage < 80) return "developing";
  if (input.confidence === "signal-only" || input.confidence === "limited") return "promising";
  return "strong-round";
}

function confidenceLabel(confidence: PracticeEvidenceConfidence): string {
  if (confidence === "none") return "لا يوجد دليل تدريبي بعد";
  if (confidence === "signal-only") return "إشارة أولية فقط";
  if (confidence === "limited") return "دليل محدود";
  if (confidence === "good") return "دليل تدريبي جيد";
  return "دليل تدريبي قوي عبر أكثر من جولة";
}

function statusLabel(status: PracticeEvidenceStatus): string {
  if (status === "insufficient-evidence") return "ابدأ التدريب أولًا";
  if (status === "needs-review") return "تحتاج مراجعة هذه المهارة";
  if (status === "developing") return "الفهم يتطور ويحتاج تثبيتًا";
  if (status === "promising") return "بداية جيدة وتحتاج أسئلة إضافية";
  return "أداء قوي في التدريب — يحتاج تحقق لاحقًا بالمحاكاة";
}

function recommendationFor(
  status: PracticeEvidenceStatus,
  confidence: PracticeEvidenceConfidence,
  repeatedMissCount: number,
): string {
  if (status === "insufficient-evidence") return "ابدأ جولة تدريب قصيرة على هذه المهارة قبل الحكم على مستواك.";
  if (status === "needs-review") {
    if (repeatedMissCount > 0) return "هناك خطأ تكرر في أكثر من جولة؛ راجع الفكرة والشرح المرتبط ثم ابدأ جولة جديدة بأسئلة مختلفة.";
    return "راجع الفكرة الأساسية ومثالًا محلولًا، ثم ابدأ جولة جديدة بأسئلة مختلفة.";
  }
  if (status === "developing") return "أكمل جولة تدريب جديدة لتثبيت طريقة الحل وتقليل الأخطاء المتفرقة.";
  if (status === "promising") return "النتيجة جيدة، لكن عدد الأسئلة لا يكفي لحكم قوي؛ أكمل جولة جديدة دون تكرار مباشر.";
  if (confidence === "strong") return "أداؤك التدريبي ثابت عبر أكثر من جولة. أعد المحاكاة لاحقًا للتحقق من ثبات الفهم في سياق قياس مستقل.";
  return "أداؤك قوي في هذه الجولة. لا نعدّه إتقانًا نهائيًا؛ أكمل جولة أخرى أو تحقق لاحقًا بالمحاكاة.";
}
