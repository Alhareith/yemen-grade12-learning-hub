import { describe, expect, it } from "vitest";
import type { ExamDefinition } from "@shared/exams/exam-model";
import type { ExamQuestion } from "@shared/exams/question-model";
import {
  answerQuestion,
  canResumeSession,
  createExamSession,
  getSessionProgress,
  scoreSession,
  submitSession,
} from "@shared/exams/session-engine";

function makeQuestion(id: string, order: number, correctOptionId: "A" | "B"): ExamQuestion {
  return {
    schemaVersion: "1.0",
    id,
    examId: "TEST-EXAM",
    order,
    sourceQuestionNumber: String(order),
    type: "single-choice",
    stem: [{ type: "text", text: `سؤال تجريبي ${order}` }],
    options: [
      { id: "A", label: "أ", content: [{ type: "text", text: "الخيار الأول" }] },
      { id: "B", label: "ب", content: [{ type: "text", text: "الخيار الثاني" }] },
    ],
    assets: [],
    answer: {
      correctOptionId,
      points: 1,
      answerEvidence: {
        type: "published-key",
        sourceUrl: "https://example.test/key",
        locator: `test-key-${order}`,
      },
    },
    source: {
      sourcePackageUrl: "https://example.test/source",
      sourceFileName: "fixture.pdf",
      questionPage: 1,
      digitizationMethod: "manual",
    },
    analysis: {
      primarySkillId: "TEST-SKILL",
      secondarySkillIds: [],
    },
    difficulty: "unrated",
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

function makeReadyExam(): ExamDefinition {
  return {
    schemaVersion: "1.0",
    id: "TEST-EXAM",
    title: "اختبار تقني فقط",
    subject: "رياضيات",
    branch: "اختبار",
    year: 2024,
    durationMinutes: 60,
    availability: "ready",
    source: {
      title: "Fixture",
      publisher: "Tests",
      primaryUrl: "https://example.test/source",
    },
    questions: [makeQuestion("Q1", 1, "A"), makeQuestion("Q2", 2, "B")],
    blockingNotes: [],
  };
}

describe("exam session engine", () => {
  it("refuses to start an exam that is blocked at the source gate", () => {
    const exam = makeReadyExam();
    exam.availability = "blocked-source-access";
    exam.questions = [];
    exam.blockingNotes = ["source pages unavailable"];

    expect(() => createExamSession(exam, 100)).toThrow("Exam is not ready for students");
  });

  it("creates an immutable resumable session and records valid answers", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, 100);
    const updated = answerQuestion(exam, session, "Q1", "A", 200);

    expect(session.answers).toEqual({});
    expect(updated.answers).toEqual({ Q1: "A" });
    expect(updated.updatedAt).toBe(200);
    expect(canResumeSession(exam, updated)).toBe(true);
    expect(getSessionProgress(updated)).toEqual({
      answeredCount: 1,
      unansweredCount: 1,
      totalCount: 2,
      percentage: 50,
    });
  });

  it("rejects an option that does not belong to the question", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, 100);

    expect(() => answerQuestion(exam, session, "Q1", "X", 200)).toThrow(
      "does not belong to question",
    );
  });

  it("scores correct, wrong and unanswered questions deterministically after submit", () => {
    const exam = makeReadyExam();
    let session = createExamSession(exam, 100);
    session = answerQuestion(exam, session, "Q1", "B", 200);
    session = submitSession(exam, session, 300);

    const score = scoreSession(exam, session);

    expect(score.earnedPoints).toBe(0);
    expect(score.totalPoints).toBe(2);
    expect(score.percentage).toBe(0);
    expect(score.correctCount).toBe(0);
    expect(score.incorrectCount).toBe(1);
    expect(score.unansweredCount).toBe(1);
  });

  it("does not resume a session after the verified question set changes", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, 100);
    const changedExam: ExamDefinition = {
      ...exam,
      questions: [exam.questions[0]],
    };

    expect(canResumeSession(changedExam, session)).toBe(false);
  });
});
