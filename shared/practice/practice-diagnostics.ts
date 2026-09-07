import type { PracticeSessionResult } from "./practice-engine";
import type { SkillPracticeEvidence } from "./practice-evidence";

export type PracticeDiagnosticRule = {
  questionId: string;
  focusId: string;
  focusLabel: string;
  deepeningGoal: string;
};

export type PracticeFocusDiagnostic = {
  focusId: string;
  focusLabel: string;
  deepeningGoal: string;
  askedCount: number;
  missCount: number;
  correctCount: number;
  missRate: number;
};

export type PracticeDiagnosticProfile = {
  skillId: string;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  weakFocuses: PracticeFocusDiagnostic[];
  observedFocuses: PracticeFocusDiagnostic[];
  unclassifiedMissQuestionIds: string[];
};

export function buildPracticeDiagnosticProfile(
  skillId: string,
  results: PracticeSessionResult[],
  rules: readonly PracticeDiagnosticRule[],
): PracticeDiagnosticProfile {
  const relevantResults = results.filter((result) => result.skillId === skillId);
  const ruleByQuestionId = new Map(rules.map((rule) => [rule.questionId, rule]));
  const focusStats = new Map<string, PracticeFocusDiagnostic>();
  const unclassifiedMissQuestionIds: string[] = [];
  let answeredCount = 0;
  let correctCount = 0;

  relevantResults.forEach((result) => {
    result.questions.forEach((question) => {
      answeredCount += 1;
      if (question.correct) correctCount += 1;
      const rule = ruleByQuestionId.get(question.questionId);
      if (!rule) {
        if (!question.correct) unclassifiedMissQuestionIds.push(question.questionId);
        return;
      }

      const current = focusStats.get(rule.focusId) ?? {
        focusId: rule.focusId,
        focusLabel: rule.focusLabel,
        deepeningGoal: rule.deepeningGoal,
        askedCount: 0,
        missCount: 0,
        correctCount: 0,
        missRate: 0,
      };
      current.askedCount += 1;
      if (question.correct) current.correctCount += 1;
      else current.missCount += 1;
      current.missRate = Math.round((current.missCount / current.askedCount) * 100);
      focusStats.set(rule.focusId, current);
    });
  });

  const observedFocuses = Array.from(focusStats.values()).sort((a, b) => {
    if (b.missCount !== a.missCount) return b.missCount - a.missCount;
    if (b.missRate !== a.missRate) return b.missRate - a.missRate;
    return a.focusLabel.localeCompare(b.focusLabel, "ar");
  });

  return {
    skillId,
    answeredCount,
    correctCount,
    incorrectCount: answeredCount - correctCount,
    percentage: answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100),
    weakFocuses: observedFocuses.filter((focus) => focus.missCount > 0),
    observedFocuses,
    unclassifiedMissQuestionIds: Array.from(new Set(unclassifiedMissQuestionIds)).sort(),
  };
}

export function buildPracticeDeepeningPrompt(input: {
  subject: string;
  unit: string;
  lesson: string;
  skill: string;
  evidence: SkillPracticeEvidence;
  diagnostic: PracticeDiagnosticProfile;
}): string {
  const weakPoints = input.diagnostic.weakFocuses.length > 0
    ? input.diagnostic.weakFocuses.map((focus, index) => (
      `${index + 1}. ${focus.focusLabel}: أخطأت في ${focus.missCount} من ${focus.askedCount} سؤال/أسئلة ظهرت لي. هدفي: ${focus.deepeningGoal}`
    )).join("\n")
    : "لم تظهر نقطة ضعف واضحة في الأسئلة التي أجبت عنها حتى الآن؛ أريد تعميق الفهم بمسائل أوسع وأصعب قليلًا دون الخروج عن هذا الدرس.";

  return `أنا طالب في الصف الثالث الثانوي في اليمن وأريد تعميق فهمي بناءً على نتيجة تدريب فعلية، لا شرحًا عامًا للدرس كله.

المادة: ${input.subject}
الوحدة: ${input.unit}
الدرس: ${input.lesson}
المهارة: ${input.skill}

نتيجتي الحالية:
- الإجابات الصحيحة: ${input.diagnostic.correctCount} من ${input.diagnostic.answeredCount}
- النسبة: ${input.diagnostic.percentage}٪
- قراءة النظام: ${input.evidence.statusLabel}
- قوة الدليل: ${input.evidence.confidenceLabel}

النقاط التي أحتاج تعميقها حسب أخطائي:
${weakPoints}

أريد منك أن تبني الشرح على هذا التحليل فقط:
- لا تعِد شرح كل الدرس من البداية إلا إذا كانت نقطة الضعف نفسها تحتاج ذلك.
- ابدأ بأكثر نقطة ظهر فيها خطأ، ثم انتقل إلى التي بعدها.
- لكل نقطة: وضّح الفكرة، ثم سبب الخطأ الشائع، ثم مثالًا محلولًا خطوة بخطوة من مستوى الثالث الثانوي اليمني، ثم سؤال تحقق قصير لي.
- لا تعطِ إجابة سؤال التحقق قبل أن أجيب عنه.
- إذا كان الخطأ بسبب خلط بين مفهومين، قارن بينهما بمثالين قصيرين.
- إذا لم تظهر أخطاء، أعطني مثالين أعمق قليلًا ثم سؤال تحقق يختبر الفهم لا الحفظ.
- لا تقل إنني أتقنت المهارة نهائيًا؛ هذه نتيجة تدريب قصيرة وليست حكمًا نهائيًا.
- التزم بمحتوى هذا الدرس ولا تنتقل إلى درس لاحق إلا إذا احتجت متطلبًا سابقًا لتصحيح الفهم.`;
}
