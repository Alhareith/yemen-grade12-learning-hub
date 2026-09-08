import { describe, expect, it } from "vitest";
import { getPracticeDiagnosticRulesForSkill } from "@/data/mathLessonPracticeDiagnostics";
import {
  buildPracticeDiagnosticProfile,
  buildPracticeDeepeningPrompt,
} from "@shared/practice/practice-diagnostics";
import { buildEvidenceFromResults } from "@shared/practice/practice-evidence";
import type { PracticeSessionResult } from "@shared/practice/practice-engine";

const SKILL_ID = "CPLX-POLAR-USE";

function makeResult(entries: Array<[number, boolean]>): PracticeSessionResult {
  const questions = entries.map(([number, correct]) => ({
    questionId: `practice:${SKILL_ID}:${String(number).padStart(2, "0")}`,
    selectedOptionId: correct ? "a" : "b",
    correctOptionId: "a",
    correct,
  }));
  const correctCount = questions.filter((question) => question.correct).length;
  return {
    sessionId: "complex-polar-diagnostic-test",
    setId: `practice-set:${SKILL_ID}:2025-models-v1`,
    skillId: SKILL_ID,
    questionCount: questions.length,
    correctCount,
    incorrectCount: questions.length - correctCount,
    percentage: Math.round((correctCount / questions.length) * 100),
    questions,
  };
}

describe("lesson 04 complex polar diagnostics", () => {
  it("classifies every sourced polar question", () => {
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    expect(rules).toHaveLength(10);
    expect(new Set(rules.map((rule) => rule.questionId)).size).toBe(10);
  });

  it("turns repeated third-quadrant mistakes into the first deepening priority", () => {
    const result = makeResult([
      [1, true],
      [2, false],
      [6, false],
      [9, true],
      [10, false],
    ]);
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    const diagnostic = buildPracticeDiagnosticProfile(SKILL_ID, [result], rules);
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);

    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("تحديد الزاوية الصحيحة في الربع الثالث");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(3);

    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "الصورة القطبية للعدد المركب",
      skill: "تمثيل العدد المركب بالصورة القطبية",
      evidence,
      diagnostic,
    });

    expect(prompt).toContain("الصورة القطبية للعدد المركب");
    expect(prompt).toContain("تحديد الزاوية الصحيحة في الربع الثالث");
    expect(prompt).toContain("لا تعِد شرح كل الدرس من البداية");
  });

  it("targets fourth-quadrant angle handling when that pattern repeats", () => {
    const result = makeResult([
      [1, true],
      [3, true],
      [4, false],
      [8, false],
      [9, true],
    ]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("تحديد الزاوية الصحيحة في الربع الرابع");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(2);
  });

  it("does not invent a weak point after a fully correct round", () => {
    const result = makeResult([[1, true], [2, true], [4, true], [7, true], [10, true]]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);
    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "الصورة القطبية للعدد المركب",
      skill: "تمثيل العدد المركب بالصورة القطبية",
      evidence,
      diagnostic,
    });

    expect(diagnostic.weakFocuses).toEqual([]);
    expect(prompt).toContain("لم تظهر نقطة ضعف واضحة");
    expect(prompt).toContain("مثالين أعمق قليلًا");
  });
});
