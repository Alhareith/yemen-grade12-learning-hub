import { describe, expect, it } from "vitest";
import { pilotCalculusExam } from "@/data/exams/pilotExam";
import { buildExamResultReport } from "@shared/exams/result-report";
import {
  answerQuestion,
  createExamSession,
  submitSession,
} from "@shared/exams/session-engine";
import {
  buildQuestionHelpPrompt,
  buildSkillRemediation,
} from "@shared/exams/remediation";

function wrongOptionId(question: (typeof pilotCalculusExam.questions)[number]): string {
  const option = question.options.find((item) => item.id !== question.answer.correctOptionId);
  if (!option) throw new Error(`No wrong option for ${question.id}`);
  return option.id;
}

describe("stage 9 remediation", () => {
  it("aggregates mistakes by primary skill and keeps evidence confidence conservative", () => {
    const targetSkill = "DER-RULES";
    const targetQuestions = pilotCalculusExam.questions.filter(
      (question) => question.analysis.primarySkillId === targetSkill,
    );
    expect(targetQuestions.length).toBeGreaterThan(0);

    let session = createExamSession(pilotCalculusExam, { timingMode: "untimed", nowMs: 1_000 });

    for (const question of pilotCalculusExam.questions) {
      const answer = question.analysis.primarySkillId === targetSkill
        ? wrongOptionId(question)
        : question.answer.correctOptionId;
      session = answerQuestion(pilotCalculusExam, session, question.id, answer, session.updatedAt + 1);
    }

    const submitted = submitSession(pilotCalculusExam, session, session.updatedAt + 1);
    const report = buildExamResultReport(pilotCalculusExam, submitted);
    const remediation = buildSkillRemediation(report);
    const target = remediation.find((item) => item.skillId === targetSkill);

    expect(target).toBeDefined();
    expect(target?.missedCount).toBe(targetQuestions.length);
    expect(target?.correctCount).toBe(0);
    expect(target?.masteryPercentage).toBe(0);
    if (targetQuestions.length === 1) {
      expect(target?.confidence).toBe("signal-only");
    }
  });

  it("does not create remediation for skills answered fully correctly", () => {
    let session = createExamSession(pilotCalculusExam, { timingMode: "untimed", nowMs: 1_000 });
    for (const question of pilotCalculusExam.questions) {
      session = answerQuestion(
        pilotCalculusExam,
        session,
        question.id,
        question.answer.correctOptionId,
        session.updatedAt + 1,
      );
    }
    const submitted = submitSession(pilotCalculusExam, session, session.updatedAt + 1);
    const report = buildExamResultReport(pilotCalculusExam, submitted);
    expect(buildSkillRemediation(report)).toEqual([]);
  });

  it("builds a complete Arabic-first external-AI help prompt for a wrong answer", () => {
    const question = pilotCalculusExam.questions[0];
    let session = createExamSession(pilotCalculusExam, { timingMode: "untimed", nowMs: 1_000 });
    session = answerQuestion(
      pilotCalculusExam,
      session,
      question.id,
      wrongOptionId(question),
      2_000,
    );
    const submitted = submitSession(pilotCalculusExam, session, 3_000);
    const report = buildExamResultReport(pilotCalculusExam, submitted);
    const review = report.reviews.find((item) => item.questionId === question.id);
    if (!review) throw new Error("Missing review");

    const prompt = buildQuestionHelpPrompt(review);
    expect(prompt).toContain("أنا طالب في الصف الثالث الثانوي في اليمن");
    expect(prompt).toContain("إجابتي:");
    expect(prompt).toContain("الإجابة الصحيحة:");
    expect(prompt).toContain("أكمل الإجابة كاملة في رد واحد");
    expect(prompt).toContain("قاعدة الرياضيات صارمة");
    expect(prompt).toContain("x→س");
    expect(prompt).toContain("لا تستخدم x أو y أو f(x)");
  });
});
