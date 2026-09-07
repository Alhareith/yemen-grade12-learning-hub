import { describe, expect, it } from "vitest";
import { getPracticeDiagnosticRulesForSkill } from "@/data/mathLessonPracticeDiagnostics";
import {
  buildPracticeDiagnosticProfile,
  buildPracticeDeepeningPrompt,
} from "@shared/practice/practice-diagnostics";
import { buildEvidenceFromResults } from "@shared/practice/practice-evidence";
import type { PracticeSessionResult } from "@shared/practice/practice-engine";

const SKILL_ID = "CPLX-NUMBER-USE";

function makeResult(entries: Array<[number, boolean]>): PracticeSessionResult {
  const questions = entries.map(([number, correct]) => ({
    questionId: `practice:${SKILL_ID}:${String(number).padStart(2, "0")}`,
    selectedOptionId: correct ? "a" : "b",
    correctOptionId: "a",
    correct,
  }));
  const correctCount = questions.filter((question) => question.correct).length;
  return {
    sessionId: "diagnostic-test-session",
    setId: `practice-set:${SKILL_ID}:pilot-v1`,
    skillId: SKILL_ID,
    questionCount: questions.length,
    correctCount,
    incorrectCount: questions.length - correctCount,
    percentage: Math.round((correctCount / questions.length) * 100),
    questions,
  };
}

describe("lesson 01 complex-number practice diagnostics", () => {
  it("classifies all ten lesson questions without leaking diagnostics to unfinished lessons", () => {
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    expect(rules).toHaveLength(10);
    expect(new Set(rules.map((rule) => rule.questionId)).size).toBe(10);
    expect(rules.every((rule) => rule.questionId.startsWith(`practice:${SKILL_ID}:`))).toBe(true);
    expect(getPracticeDiagnosticRulesForSkill("COUNT-COMBINATIONS-APPLY")).toEqual([]);
  });

  it("turns actual misses into ranked weak points and a targeted deepening prompt", () => {
    const result = makeResult([
      [1, false],
      [2, true],
      [3, false],
      [4, false],
      [5, true],
    ]);
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    const diagnostic = buildPracticeDiagnosticProfile(SKILL_ID, [result], rules);
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);

    expect(diagnostic.answeredCount).toBe(5);
    expect(diagnostic.correctCount).toBe(2);
    expect(diagnostic.percentage).toBe(40);
    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("قوى الوحدة التخيلية ت");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(2);
    expect(diagnostic.weakFocuses.some((focus) => focus.focusLabel === "تمييز الجزء الحقيقي من الجزء التخيلي")).toBe(true);

    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "العدد المركب",
      skill: "فهم وتمثيل العدد المركب",
      evidence,
      diagnostic,
    });

    expect(prompt).toContain("بناءً على نتيجة تدريب فعلية");
    expect(prompt).toContain("قوى الوحدة التخيلية ت");
    expect(prompt).toContain("تمييز الجزء الحقيقي من الجزء التخيلي");
    expect(prompt).toContain("الإجابات الصحيحة: 2 من 5");
    expect(prompt).toContain("لا تعِد شرح كل الدرس من البداية");
    expect(prompt).toContain("لا تعطِ إجابة سؤال التحقق قبل أن أجيب عنه");
    expect(prompt).toContain("لا تقل إنني أتقنت المهارة نهائيًا");
  });

  it("asks for deeper transfer when no weakness appears", () => {
    const result = makeResult([[1, true], [3, true], [5, true], [7, true], [10, true]]);
    const diagnostic = buildPracticeDiagnosticProfile(SKILL_ID, [result], getPracticeDiagnosticRulesForSkill(SKILL_ID));
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);
    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "العدد المركب",
      skill: "فهم وتمثيل العدد المركب",
      evidence,
      diagnostic,
    });

    expect(diagnostic.weakFocuses).toEqual([]);
    expect(prompt).toContain("لم تظهر نقطة ضعف واضحة");
    expect(prompt).toContain("مثالين أعمق قليلًا");
  });
});
