import { describe, expect, it } from "vitest";
import { getPracticeDiagnosticRulesForSkill } from "@/data/mathLessonPracticeDiagnostics";
import {
  buildPracticeDiagnosticProfile,
  buildPracticeDeepeningPrompt,
} from "@shared/practice/practice-diagnostics";
import { buildEvidenceFromResults } from "@shared/practice/practice-evidence";
import type { PracticeSessionResult } from "@shared/practice/practice-engine";

const SKILL_ID = "COUNT-COMBINATIONS-APPLY";

function makeResult(entries: Array<[number, boolean]>): PracticeSessionResult {
  const questions = entries.map(([number, correct]) => ({
    questionId: `practice:${SKILL_ID}:${String(number).padStart(2, "0")}`,
    selectedOptionId: correct ? "a" : "b",
    correctOptionId: "a",
    correct,
  }));
  const correctCount = questions.filter((question) => question.correct).length;
  return {
    sessionId: "combinations-diagnostic-test",
    setId: `practice-set:${SKILL_ID}:reviewed-v1`,
    skillId: SKILL_ID,
    questionCount: questions.length,
    correctCount,
    incorrectCount: questions.length - correctCount,
    percentage: Math.round((correctCount / questions.length) * 100),
    questions,
  };
}

describe("lesson 09 combinations diagnostics", () => {
  it("classifies all ten combinations questions", () => {
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    expect(rules).toHaveLength(10);
    expect(new Set(rules.map((rule) => rule.questionId)).size).toBe(10);
  });

  it("prioritizes distinguishing combinations from order when those errors repeat", () => {
    const result = makeResult([[1, false], [2, true], [3, true], [5, true], [10, false]]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);

    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("تمييز التوافيق عن الترتيب");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(2);

    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "التوافيق",
      skill: "تطبيق التوافيق",
      evidence,
      diagnostic,
    });

    expect(prompt).toContain("التوافيق");
    expect(prompt).toContain("تمييز التوافيق عن الترتيب");
    expect(prompt).toContain("لا تعِد شرح كل الدرس من البداية");
  });

  it("targets complement reasoning when that is the actual error", () => {
    const result = makeResult([[2, true], [4, true], [6, true], [8, true], [9, false]]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("استخدام المتممة في مسائل التوافيق");
  });

  it("does not invent weakness after a perfect round", () => {
    const result = makeResult([[1, true], [3, true], [5, true], [7, true], [9, true]]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    expect(diagnostic.weakFocuses).toEqual([]);
  });
});
