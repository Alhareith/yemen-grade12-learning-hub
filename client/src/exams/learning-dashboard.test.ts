import { describe, expect, it } from "vitest";
import { pilotCalculusExam } from "@/data/exams/pilotExam";
import { buildLearningDashboard } from "@shared/exams/learning-dashboard";
import { buildExamResultReport } from "@shared/exams/result-report";
import {
  answerQuestion,
  createExamSession,
  submitSession,
} from "@shared/exams/session-engine";

function wrongOptionId(question: (typeof pilotCalculusExam.questions)[number]): string {
  const option = question.options.find((item) => item.id !== question.answer.correctOptionId);
  if (!option) throw new Error(`No wrong option for ${question.id}`);
  return option.id;
}

describe("learning dashboard", () => {
  it("groups detailed skills into student-friendly calculus domains", () => {
    let session = createExamSession(pilotCalculusExam, { timingMode: "untimed", nowMs: 1_000 });

    for (const question of pilotCalculusExam.questions) {
      const makeWrong = question.analysis.primarySkillId.startsWith("INT-");
      session = answerQuestion(
        pilotCalculusExam,
        session,
        question.id,
        makeWrong ? wrongOptionId(question) : question.answer.correctOptionId,
        session.updatedAt + 1,
      );
    }

    const submitted = submitSession(pilotCalculusExam, session, session.updatedAt + 1);
    const report = buildExamResultReport(pilotCalculusExam, submitted);
    const dashboard = buildLearningDashboard(report);

    expect(dashboard.domains.map((domain) => domain.title)).toContain("التكامل");
    expect(dashboard.primaryFocus?.id).toBe("integration");
    expect(dashboard.primaryFocus?.missedCount).toBeGreaterThan(0);
    expect(dashboard.primaryFocus?.weakSkills.length).toBeGreaterThan(0);
    expect(dashboard.plan).toHaveLength(3);
  });

  it("does not invent a weakness when the attempt is fully correct", () => {
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
    const dashboard = buildLearningDashboard(report);

    expect(dashboard.primaryFocus).toBeUndefined();
    expect(dashboard.focusDomains).toEqual([]);
    expect(dashboard.headline).toContain("لا توجد فجوة واضحة");
  });

  it("keeps confidence conservative for small domains", () => {
    let session = createExamSession(pilotCalculusExam, { timingMode: "untimed", nowMs: 1_000 });
    const firstQuestion = pilotCalculusExam.questions[0];
    session = answerQuestion(pilotCalculusExam, session, firstQuestion.id, wrongOptionId(firstQuestion), 2_000);

    const submitted = submitSession(pilotCalculusExam, session, 3_000);
    const report = buildExamResultReport(pilotCalculusExam, submitted);
    const dashboard = buildLearningDashboard(report);

    const domain = dashboard.domains.find((item) => item.id === "limits-continuity");
    expect(domain).toBeDefined();
    if ((domain?.questionCount ?? 0) <= 2) {
      expect(domain?.confidence).toBe("signal");
    }
  });
});
