import { describe, expect, it } from "vitest";
import { getPracticeDiagnosticRulesForSkill } from "@/data/mathLessonPracticeDiagnostics";
import {
  buildPracticeDiagnosticProfile,
  buildPracticeDeepeningPrompt,
} from "@shared/practice/practice-diagnostics";
import { buildEvidenceFromResults } from "@shared/practice/practice-evidence";
import type { PracticeSessionResult } from "@shared/practice/practice-engine";

const SKILL_ID = "CPLX-ADD-SUB-APPLY";

function makeResult(entries: Array<[number, boolean]>): PracticeSessionResult {
  const questions = entries.map(([number, correct]) => ({
    questionId: `practice:${SKILL_ID}:${String(number).padStart(2, "0")}`,
    selectedOptionId: correct ? "a" : "b",
    correctOptionId: "a",
    correct,
  }));
  const correctCount = questions.filter((question) => question.correct).length;
  return {
    sessionId: "complex-add-sub-diagnostic-test",
    setId: `practice-set:${SKILL_ID}:2025-models-v1`,
    skillId: SKILL_ID,
    questionCount: questions.length,
    correctCount,
    incorrectCount: questions.length - correctCount,
    percentage: Math.round((correctCount / questions.length) * 100),
    questions,
  };
}

describe("lesson 02 complex add-sub diagnostics", () => {
  it("classifies every question in the lesson independently", () => {
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    expect(rules).toHaveLength(10);
    expect(new Set(rules.map((rule) => rule.questionId)).size).toBe(10);
    expect(rules.every((rule) => rule.questionId.startsWith(`practice:${SKILL_ID}:`))).toBe(true);
  });

  it("turns repeated sign mistakes into the first deepening priority", () => {
    const result = makeResult([
      [1, true],
      [5, false],
      [7, false],
      [8, true],
      [9, false],
    ]);
    const rules = getPracticeDiagnosticRulesForSkill(SKILL_ID);
    const diagnostic = buildPracticeDiagnosticProfile(SKILL_ID, [result], rules);
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);

    expect(diagnostic.correctCount).toBe(2);
    expect(diagnostic.percentage).toBe(40);
    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("توزيع إشارة السالب عند طرح عدد مركب");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(3);

    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "جمع وطرح الأعداد المركبة",
      skill: "إجراء جمع وطرح الأعداد المركبة",
      evidence,
      diagnostic,
    });

    expect(prompt).toContain("جمع وطرح الأعداد المركبة");
    expect(prompt).toContain("توزيع إشارة السالب عند طرح عدد مركب");
    expect(prompt).toContain("الإجابات الصحيحة: 2 من 5");
    expect(prompt).toContain("لا تعِد شرح كل الدرس من البداية");
    expect(prompt).toContain("لا تعطِ إجابة سؤال التحقق قبل أن أجيب عنه");
  });

  it("targets negative-root conversion when that is the actual error pattern", () => {
    const result = makeResult([
      [2, true],
      [3, true],
      [6, true],
      [8, false],
      [10, false],
    ]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    expect(diagnostic.weakFocuses[0]?.focusLabel).toBe("تحويل الجذر السالب إلى صورة تحتوي ت قبل الجمع أو الطرح");
    expect(diagnostic.weakFocuses[0]?.missCount).toBe(2);
  });

  it("does not invent a weak point after a fully correct round", () => {
    const result = makeResult([[1, true], [3, true], [5, true], [8, true], [10, true]]);
    const diagnostic = buildPracticeDiagnosticProfile(
      SKILL_ID,
      [result],
      getPracticeDiagnosticRulesForSkill(SKILL_ID),
    );
    const evidence = buildEvidenceFromResults(SKILL_ID, [result]);
    const prompt = buildPracticeDeepeningPrompt({
      subject: "رياضيات",
      unit: "الجبر والهندسة والاحتمالات",
      lesson: "جمع وطرح الأعداد المركبة",
      skill: "إجراء جمع وطرح الأعداد المركبة",
      evidence,
      diagnostic,
    });

    expect(diagnostic.weakFocuses).toEqual([]);
    expect(prompt).toContain("لم تظهر نقطة ضعف واضحة");
    expect(prompt).toContain("مثالين أعمق قليلًا");
  });
});
