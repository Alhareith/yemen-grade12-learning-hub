import { describe, expect, it } from "vitest";
import { isExamReadyForStudents, validateExamDefinition } from "@shared/exams/exam-model";
import { createExamSession, answerQuestion, scoreSession, submitSession } from "@shared/exams/session-engine";
import { pilotCalculusExam } from "@/data/exams/pilotExam";

const allowedSkills = new Set(["APP-NORMAL", "APP-TANGENT", "CONT-PARAMETER", "CONT-POINT", "DER-CHAIN", "DER-EXP-LOG", "DER-NTH", "DER-RULES", "DER-TRIG", "INT-ANTIDERIVATIVE", "INT-BASIC-RULES", "INT-BY-PARTS-APPLY", "INT-COMPARISON", "INT-DEF", "INT-DEFINITE-PROPERTIES", "INT-EXP", "INT-MEAN-VALUE", "INT-SUBSTITUTION-APPLY", "INT-SUBSTITUTION-RECOGNIZE", "INT-TRIG", "LIM-FACTOR", "LIM-INFINITY", "LIM-RATIONALIZE", "LIM-TRIG", "THM-MVT-APPLY", "THM-ROLLE-APPLY", "THM-ROLLE-CHECK", "VAR-CRITICAL", "VAR-EXTREMA", "VAR-INFLECTION", "VAR-MONOTONICITY"]);

describe("stage 4 verified pilot content", () => {
  it("publishes exactly 50 verified questions for 80 points", () => {
    expect(pilotCalculusExam.questions).toHaveLength(50);
    expect(pilotCalculusExam.questions.slice(0, 20).every((question) => question.type === "true-false")).toBe(true);
    expect(pilotCalculusExam.questions.slice(20).every((question) => question.type === "single-choice")).toBe(true);
    expect(pilotCalculusExam.questions.every((question) => question.verification.status === "verified")).toBe(true);
    expect(pilotCalculusExam.questions.reduce((sum, question) => sum + question.answer.points, 0)).toBe(80);
    expect(new Set(pilotCalculusExam.questions.map((question) => question.id)).size).toBe(50);
  });

  it("passes the strict exam and skill contract", () => {
    expect(validateExamDefinition(pilotCalculusExam, allowedSkills)).toEqual([]);
    expect(isExamReadyForStudents(pilotCalculusExam, allowedSkills)).toBe(true);
  });

  it("keeps provenance explicit: adapted questions with independent verification", () => {
    for (const question of pilotCalculusExam.questions) {
      expect(question.source.relation).toBe("adapted");
      expect(question.source.adaptationNote?.length).toBeGreaterThan(20);
      expect(question.answer.answerEvidence.type).toBe("independent-verification");
      expect(question.answer.answerEvidence.locator).toContain("independent mathematical verification");
    }
  });

  it("can run and deterministically score a perfect 80-point attempt", () => {
    let session = createExamSession(pilotCalculusExam, { timingMode: "untimed", nowMs: 1_000 });
    for (const question of pilotCalculusExam.questions) {
      session = answerQuestion(pilotCalculusExam, session, question.id, question.answer.correctOptionId, session.updatedAt + 1);
    }
    const submitted = submitSession(pilotCalculusExam, session, session.updatedAt + 1);
    const score = scoreSession(pilotCalculusExam, submitted);
    expect(score.earnedPoints).toBe(80);
    expect(score.totalPoints).toBe(80);
    expect(score.correctCount).toBe(50);
    expect(score.percentage).toBe(100);
  });
});
