import { describe, expect, it } from "vitest";
import { getPracticeDiagnosticRulesForSkill } from "@/data/mathLessonPracticeDiagnostics";
import {
  buildPracticeDiagnosticProfile,
  buildPracticeDeepeningPrompt,
} from "@shared/practice/practice-diagnostics";
import { buildEvidenceFromResults } from "@shared/practice/practice-evidence";
import type { PracticeSessionResult } from "@shared/practice/practice-engine";

const SKILL_ID = "CPLX-MUL-DIV-APPLY";

function makeResult(entries: Array<[number, boolean]>): PracticeSessionResult {
  const questions = entries.map(([number, correct]) => ({
    questionId: `practice:${SKILL_ID}:${String(number).padStart(2, "0")}`,
    selectedOptionId: correct ? "a" : "b",
    correctOptionId: "a",
    correct,
  }));
  const correctCount = questions.filter((question) => question.correct).length;
  return {
    sessionId: "complex-mul-div-diagnostic-test",
    setId: `practice-set:${SKILL_ID}:2025-models-v1`,
    skillId: SKILL_ID,
    questionCount: questions.length,
    correctCount,
    incorrectCount: questions.length - correctCount,
    percentage: Math.round((correctCount / questions.length) * 100),
    questions,
  };
}

describe("lesson 03 complex multiply-divide diagnostics", () => {
  it("classifies every question in the lesson independently", () => {
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    expect(rules).toHaveLength(10);
    expect(new Set(rules.map((rule) => rule.questionId)).size).toBe(10);
    expect(rules.every((rule) => rule.questionId.startsWith(`practice:${SKILL_ID}:`))).toBe(true);
  });

  it("turns repeated denominator-conjugate mistakes into the first deepening priority", () => {
    const result = makeResult([
      [1, true],
      [6, false],
      [7, false],
      [8, true],
      [9, false],
    ]);
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    const diagnostic = buildPracticeDiagnosticProfile(SKILL_ID, [result], rules);
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);

    expect(diagnostic.correctCount).toBe(2);
    expect(diagnostic.percentage).toBe(40);
    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("استخدام مرافق المقام في قسمة الأعداد المركبة");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(3);

    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "ضرب وقسمة الأعداد المركبة",
      skill: "إجراء ضرب وقسمة الأعداد المركبة",
      evidence,
      diagnostic,
    });

    expect(prompt).toContain("ضرب وقسمة الأعداد المركبة");
    expect(prompt).toContain("استخدام مرافق المقام في قسمة الأعداد المركبة");
    expect(prompt).toContain("الإجابات الصحيحة: 2 من 5");
    expect(prompt).toContain("لا تعِد شرح كل الدرس من البداية");
  });

  it("targets cancellation after rationalization when that is the actual error pattern", () => {
    const result = makeResult([
      [2, true],
      [5, true],
      [6, true],
      [8, false],
      [10, false],
    ]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("ملاحظة إلغاء الجزء الحقيقي بعد ترشيد المقام");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(2);
  });

  it("does not invent a weak point after a fully correct round", () => {
    const result = makeResult([[1, true], [3, true], [6, true], [8, true], [10, true]]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);
    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "ضرب وقسمة الأعداد المركبة",
      skill: "إجراء ضرب وقسمة الأعداد المركبة",
      evidence,
      diagnostic,
    });

    expect(diagnostic.weakFocuses).toEqual([]);
    expect(prompt).toContain("لم تظهر نقطة ضعف واضحة");
    expect(prompt).toContain("مثالين أعمق قليلًا");
  });
});
