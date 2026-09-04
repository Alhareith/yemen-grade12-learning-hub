import { describe, expect, it } from "vitest";
import type { ExamDefinition } from "@shared/exams/exam-model";
import type { ExamQuestion } from "@shared/exams/question-model";
import {
  answerQuestion,
  canResumeSession,
  createExamSession,
  getRemainingTimeMs,
  getSessionIntegrityIssue,
  getSessionProgress,
  isSessionTimeExpired,
  scoreSession,
  submitSession,
  toggleQuestionFlag,
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

export function makeReadyExam(): ExamDefinition {
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

    expect(() => createExamSession(exam, { nowMs: 100 })).toThrow(
      "Exam is not ready for students",
    );
  });

  it("creates a timed session with a stable deadline", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "timed", nowMs: 1_000 });

    expect(session.version).toBe(2);
    expect(session.timingMode).toBe("timed");
    expect(session.deadlineAt).toBe(3_601_000);
    expect(getRemainingTimeMs(exam, session, 2_000)).toBe(3_599_000);
    expect(isSessionTimeExpired(exam, session, 3_601_000)).toBe(true);
  });

  it("supports an untimed session without inventing a deadline", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 1_000 });

    expect(session.deadlineAt).toBeUndefined();
    expect(getRemainingTimeMs(exam, session, 999_999)).toBeNull();
    expect(isSessionTimeExpired(exam, session, 999_999)).toBe(false);
  });

  it("records valid answers immutably and tracks review flags", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    const answered = answerQuestion(exam, session, "Q1", "A", 200);
    const flagged = toggleQuestionFlag(exam, answered, "Q2", 300);

    expect(session.answers).toEqual({});
    expect(answered.answers).toEqual({ Q1: "A" });
    expect(flagged.flaggedQuestionIds).toEqual(["Q2"]);
    expect(canResumeSession(exam, flagged)).toBe(true);
    expect(getSessionProgress(flagged)).toEqual({
      answeredCount: 1,
      unansweredCount: 1,
      flaggedCount: 1,
      totalCount: 2,
      percentage: 50,
    });
  });

  it("toggles a review flag without creating duplicates", () => {
    const exam = makeReadyExam();
    let session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    session = toggleQuestionFlag(exam, session, "Q1", 200);
    session = toggleQuestionFlag(exam, session, "Q1", 300);

    expect(session.flaggedQuestionIds).toEqual([]);
  });

  it("rejects an option that does not belong to the question", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });

    expect(() => answerQuestion(exam, session, "Q1", "X", 200)).toThrow(
      "does not belong to question",
    );
  });

  it("prevents answers after time expires but still permits final submission", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "timed", nowMs: 100 });
    const expiredAt = 100 + exam.durationMinutes * 60_000;

    expect(() => answerQuestion(exam, session, "Q1", "A", expiredAt)).toThrow(
      "Exam time has expired",
    );

    const submitted = submitSession(exam, session, expiredAt);
    expect(submitted.status).toBe("submitted");
  });

  it("scores correct, wrong and unanswered questions deterministically after submit", () => {
    const exam = makeReadyExam();
    let session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
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
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    const changedExam: ExamDefinition = {
      ...exam,
      questions: [exam.questions[0]],
    };

    expect(canResumeSession(changedExam, session)).toBe(false);
  });

  it("rejects a stored session with an invalid current question index", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    const corrupted = { ...session, currentIndex: 99 };

    expect(getSessionIntegrityIssue(exam, corrupted)).toBe("invalid-current-index");
    expect(canResumeSession(exam, corrupted)).toBe(false);
  });

  it("rejects a stored answer whose option does not belong to its question", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    const corrupted = { ...session, answers: { Q1: "NOT-AN-OPTION" } };

    expect(getSessionIntegrityIssue(exam, corrupted)).toBe("invalid-answer-option");
  });

  it("rejects a timed session when its persisted deadline was extended", () => {
    const exam = makeReadyExam();
    const session = createExamSession(exam, { timingMode: "timed", nowMs: 1_000 });
    const corrupted = { ...session, deadlineAt: (session.deadlineAt ?? 0) + 60_000 };

    expect(getSessionIntegrityIssue(exam, corrupted)).toBe("invalid-deadline");
  });
});
