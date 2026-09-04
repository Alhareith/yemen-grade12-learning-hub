import { describe, expect, it } from "vitest";
import { isExamReadyForStudents, validateExamDefinition } from "@shared/exams/exam-model";
import {
  answerQuestion,
  createExamSession,
  scoreSession,
  submitSession,
} from "@shared/exams/session-engine";
import { pilotCalculusExam } from "../data/exams/pilotExam";
import { PILOT_EXAM_ID, pilotExamProvenance } from "../data/exams/pilotExamProvenance";

const questions = pilotCalculusExam.questions;
const allowedSkillIds = new Set([
  "LIM-DIRECT", "LIM-FACTOR", "LIM-RATIONALIZE", "LIM-INFINITY", "LIM-TRIG",
  "CONT-POINT", "CONT-PARAMETER",
  "DER-RULES", "DER-NTH", "DER-EXP-LOG", "DER-TRIG", "DER-COMPOSITION", "DER-CHAIN",
  "APP-TANGENT", "APP-NORMAL",
  "THM-ROLLE-CHECK", "THM-ROLLE-APPLY", "THM-MVT-CHECK", "THM-MVT-APPLY",
  "VAR-CRITICAL", "VAR-MONOTONICITY", "VAR-EXTREMA", "VAR-INFLECTION", "VAR-FULL-STUDY",
  "INT-SUM-LAWS", "INT-DEF", "INT-INTEGRABILITY", "INT-COMPARISON", "INT-BOUNDS",
  "INT-BASIC-RULES", "INT-TRIG", "INT-EXP", "INT-ANTIDERIVATIVE", "INT-MEAN-VALUE",
  "INT-SUBSTITUTION-RECOGNIZE", "INT-SUBSTITUTION-APPLY",
  "INT-BY-PARTS-RECOGNIZE", "INT-BY-PARTS-APPLY", "INT-DEFINITE-PROPERTIES",
]);

describe("stage 4 verified adapted calculus pilot", () => {
  it("matches the documented 2020 reference format exactly", () => {
    expect(pilotCalculusExam.id).toBe(PILOT_EXAM_ID);
    expect(pilotCalculusExam.durationMinutes).toBe(180);
    expect(questions).toHaveLength(50);
    expect(questions.filter((q) => q.type === "true-false")).toHaveLength(20);
    expect(questions.filter((q) => q.type === "single-choice")).toHaveLength(30);
    expect(questions.reduce((sum, q) => sum + q.answer.points, 0)).toBe(80);
    expect(pilotExamProvenance.relation).toBe("adapted");
  });

  it("contains a complete unique ordered question set", () => {
    const ids = new Set(questions.map((q) => q.id));
    const orders = new Set(questions.map((q) => q.order));
    expect(ids.size).toBe(50);
    expect(orders.size).toBe(50);
    expect([...orders].sort((a, b) => a - b)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
  });

  it("passes the strict exam and skill publication gate", () => {
    expect(validateExamDefinition(pilotCalculusExam, allowedSkillIds)).toEqual([]);
    expect(questions.every((q) => q.verification.status === "verified")).toBe(true);
    expect(questions.every((q) => allowedSkillIds.has(q.analysis.primarySkillId))).toBe(true);
    expect(questions.every((q) => q.analysis.secondarySkillIds.every((id) => allowedSkillIds.has(id)))).toBe(true);
    expect(isExamReadyForStudents(pilotCalculusExam, allowedSkillIds)).toBe(true);
  });

  it("scores 80/80 deterministically when every verified key is selected", () => {
    let session = createExamSession(pilotCalculusExam, { timingMode: "untimed", nowMs: 1_000 });
    for (let index = 0; index < questions.length; index += 1) {
      session = answerQuestion(
        pilotCalculusExam,
        session,
        questions[index].id,
        questions[index].answer.correctOptionId,
        2_000 + index,
      );
    }
    session = submitSession(pilotCalculusExam, session, 10_000);
    const score = scoreSession(pilotCalculusExam, session);
    expect(score.earnedPoints).toBe(80);
    expect(score.totalPoints).toBe(80);
    expect(score.percentage).toBe(100);
    expect(score.correctCount).toBe(50);
    expect(score.incorrectCount).toBe(0);
    expect(score.unansweredCount).toBe(0);
  });

  it("keeps adapted provenance explicit instead of claiming verbatim ministerial text", () => {
    expect(pilotExamProvenance.publicLabel).toContain("ليست نسخة حرفية");
    expect(questions.every((q) => q.source.sourceFileName.includes("متكيف"))).toBe(true);
    expect(pilotCalculusExam.source.fileName).toContain("لا نص حرفي");
  });
});
