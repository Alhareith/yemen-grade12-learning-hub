import { describe, expect, it } from "vitest";
import type { ExamDefinition } from "@shared/exams/exam-model";
import type { ExamQuestion } from "@shared/exams/question-model";
import {
  answerQuestion,
  createExamSession,
  getSessionStorageKey,
} from "@shared/exams/session-engine";
import {
  loadSessionForRecovery,
  saveSessionSafely,
  type StorageLike,
} from "./session-storage";

class MemoryStorage implements StorageLike {
  private data = new Map<string, string>();
  throwOnGet = false;
  throwOnSet = false;
  throwOnRemove = false;

  getItem(key: string): string | null {
    if (this.throwOnGet) throw new Error("storage unavailable");
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    if (this.throwOnSet) throw new Error("storage unavailable");
    this.data.set(key, value);
  }

  removeItem(key: string): void {
    if (this.throwOnRemove) throw new Error("storage unavailable");
    this.data.delete(key);
  }
}

function makeQuestion(id: string, order: number): ExamQuestion {
  return {
    schemaVersion: "1.0",
    id,
    examId: "TEST-EXAM",
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
      correctOptionId: "A",
      points: 1,
      answerEvidence: {
        type: "published-key",
        sourceUrl: "https://example.test/key",
        locator: String(order),
      },
    },
    source: {
      sourcePackageUrl: "https://example.test/source",
      sourceFileName: "fixture.pdf",
      questionPage: 1,
      digitizationMethod: "manual",
    },
    analysis: { primarySkillId: "TEST-SKILL", secondarySkillIds: [] },
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

function makeExam(): ExamDefinition {
  return {
    schemaVersion: "1.0",
    id: "TEST-EXAM",
    title: "اختبار تقني",
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
    questions: [makeQuestion("Q1", 1), makeQuestion("Q2", 2)],
    blockingNotes: [],
  };
}

describe("exam session storage recovery", () => {
  it("returns a resumable session without auto-starting it", () => {
    const exam = makeExam();
    const storage = new MemoryStorage();
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    storage.setItem(getSessionStorageKey(exam.id), JSON.stringify(session));

    const result = loadSessionForRecovery(exam, storage, 500);

    expect(result.kind).toBe("resumable");
    if (result.kind === "resumable") {
      expect(result.expired).toBe(false);
      expect(result.session.currentIndex).toBe(0);
    }
  });

  it("detects that a timed saved attempt expired while the page was closed", () => {
    const exam = makeExam();
    const storage = new MemoryStorage();
    const session = createExamSession(exam, { timingMode: "timed", nowMs: 1_000 });
    storage.setItem(getSessionStorageKey(exam.id), JSON.stringify(session));

    const result = loadSessionForRecovery(exam, storage, session.deadlineAt ?? 0);

    expect(result.kind).toBe("resumable");
    if (result.kind === "resumable") expect(result.expired).toBe(true);
  });

  it("discards corrupt JSON instead of crashing the exam screen", () => {
    const exam = makeExam();
    const storage = new MemoryStorage();
    const key = getSessionStorageKey(exam.id);
    storage.setItem(key, "{broken-json");

    expect(loadSessionForRecovery(exam, storage)).toEqual({
      kind: "discarded",
      reason: "invalid-json",
    });
    expect(storage.getItem(key)).toBeNull();
  });

  it("does not overwrite a newer attempt saved by another tab", () => {
    const exam = makeExam();
    const storage = new MemoryStorage();
    const older = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    const newer = answerQuestion(exam, older, "Q1", "A", 500);
    storage.setItem(getSessionStorageKey(exam.id), JSON.stringify(newer));

    const result = saveSessionSafely(exam, older, storage);

    expect(result.kind).toBe("conflict");
    if (result.kind === "conflict") expect(result.newerSession.updatedAt).toBe(500);
  });

  it("reports storage unavailability instead of throwing", () => {
    const exam = makeExam();
    const storage = new MemoryStorage();
    storage.throwOnGet = true;

    expect(loadSessionForRecovery(exam, storage)).toEqual({ kind: "unavailable" });
  });

  it("rejects a corrupted saved answer before recovery", () => {
    const exam = makeExam();
    const storage = new MemoryStorage();
    const session = createExamSession(exam, { timingMode: "untimed", nowMs: 100 });
    const corrupted = { ...session, answers: { Q1: "INVALID" } };
    storage.setItem(getSessionStorageKey(exam.id), JSON.stringify(corrupted));

    const result = loadSessionForRecovery(exam, storage);

    expect(result).toEqual({ kind: "discarded", reason: "invalid-answer-option" });
  });
});
