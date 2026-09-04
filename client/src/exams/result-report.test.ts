import { describe, expect, it } from "vitest";
import type { ExamDefinition } from "@shared/exams/exam-model";
import type { ExamQuestion } from "@shared/exams/question-model";
import { buildExamResultReport } from "@shared/exams/result-report";
import { answerQuestion, createExamSession, submitSession } from "@shared/exams/session-engine";

function makeQuestion(
  id: string,
  order: number,
  correctOptionId: "A" | "B",
  explanationStatus?: "draft" | "reviewed",
): ExamQuestion {
  return {
    schemaVersion: "1.0",
    id,
    examId: "RESULT-TEST",
    order,
    sourceQuestionNumber: String(order),
    type: "single-choice",
    stem: [{ type: "text", text: `سؤال ${order}` }],
    options: [
      { id: "A", label: "أ", content: [{ type: "text", text: "الأول" }] },
      { id: "B", label: "ب", content: [{ type: "text", text: "الثاني" }] },
    ],
    assets: [],
    answer: {
      correctOptionId,
      points: order,
      answerEvidence: {
        type: "published-key",
        sourceUrl: "https://example.test/key",
        sourcePage: 5,
        locator: `key-${order}`,
      },
    },
    source: {
      sourcePackageUrl: "https://example.test/exam",
      sourceFileName: "exam.pdf",
      questionPage: order,
      digitizationMethod: "manual",
    },
    analysis: {
      primarySkillId: `SKILL-${order}`,
      secondarySkillIds: order === 2 ? ["SECONDARY"] : [],
    },
    difficulty: "unrated",
    explanation: explanationStatus ? {
      status: explanationStatus,
      content: [{ type: "text", text: `شرح ${order}` }],
    } : undefined,
    verification: {
      status: "verified",
      checks: {
        sourceMatched: true,
        textReviewed: true,
        mathReviewed: true,
        optionsReviewed: true,
        answerVerified: true,
        skillReviewed: true,
        mediaReviewed: true,
      },
      blockingNotes: [],
    },
  };
}

function makeExam(): ExamDefinition {
  return {
    schemaVersion: "1.0",
    id: "RESULT-TEST",
    title: "اختبار التقرير",
    subject: "رياضيات",
    branch: "اختبار",
    year: 2024,
    durationMinutes: 60,
    availability: "ready",
    source: {
      title: "Fixture",
      publisher: "Tests",
      primaryUrl: "https://example.test/exam",
    },
    questions: [
      makeQuestion("Q1", 1, "A", "reviewed"),
      makeQuestion("Q2", 2, "B", "draft"),
      makeQuestion("Q3", 3, "A"),
    ],
    blockingNotes: [],
  };
}

describe("stage 8 exam result report", () => {
  it("classifies correct, incorrect and unanswered without duplicating scoring logic", () => {
    const exam = makeExam();
    let session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    session = answerQuestion(exam, session, "Q1", "A", 200);
    session = answerQuestion(exam, session, "Q2", "A", 300);
    session = submitSession(exam, session, 400);

    const report = buildExamResultReport(exam, session);

    expect(report.score.correctCount).toBe(1);
    expect(report.score.incorrectCount).toBe(1);
    expect(report.score.unansweredCount).toBe(1);
    expect(report.answeredCount).toBe(2);
    expect(report.completionPercentage).toBe(66.67);
    expect(report.reviews.map((item) => item.status)).toEqual([
      "correct",
      "incorrect",
      "unanswered",
    ]);
  });

  it("exposes answer evidence and stable question/source metadata for review", () => {
    const exam = makeExam();
    let session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    session = submitSession(exam, session, 200);

    const report = buildExamResultReport(exam, session);
    const first = report.reviews[0];

    expect(first.sourceQuestionNumber).toBe("1");
    expect(first.correctOptionId).toBe("A");
    expect(first.answerEvidence.locator).toBe("key-1");
    expect(first.answerEvidence.sourcePage).toBe(5);
    expect(first.source.questionPage).toBe(1);
    expect(first.primarySkillId).toBe("SKILL-1");
  });

  it("shows only reviewed explanations and never leaks draft explanations", () => {
    const exam = makeExam();
    let session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    session = submitSession(exam, session, 200);

    const report = buildExamResultReport(exam, session);

    expect(report.reviews[0].reviewedExplanation).toEqual([{ type: "text", text: "شرح 1" }]);
    expect(report.reviews[1].reviewedExplanation).toBeUndefined();
    expect(report.reviews[2].reviewedExplanation).toBeUndefined();
  });

  it("preserves points from the deterministic score for each question", () => {
    const exam = makeExam();
    let session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    session = answerQuestion(exam, session, "Q2", "B", 200);
    session = submitSession(exam, session, 300);

    const report = buildExamResultReport(exam, session);
    const second = report.reviews[1];

    expect(second.earnedPoints).toBe(2);
    expect(second.maxPoints).toBe(2);
    expect(report.score.earnedPoints).toBe(2);
    expect(report.score.totalPoints).toBe(6);
  });
});
