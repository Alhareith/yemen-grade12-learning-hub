import type { ExamDefinition } from "@shared/exams/exam-model";
import {
  getSessionIntegrityIssue,
  getSessionStorageKey,
  isSessionTimeExpired,
  type ExamSession,
  type SessionIntegrityIssue,
} from "@shared/exams/session-engine";

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type SessionRecoveryResult =
  | { kind: "none" }
  | { kind: "resumable"; session: ExamSession; expired: boolean }
  | { kind: "discarded"; reason: "invalid-json" | "not-in-progress" | SessionIntegrityIssue }
  | { kind: "unavailable" };

export type SessionSaveResult =
  | { kind: "saved" }
  | { kind: "removed" }
  | { kind: "conflict"; newerSession: ExamSession }
  | { kind: "invalid-session"; reason: SessionIntegrityIssue }
  | { kind: "unavailable" };

export function loadSessionForRecovery(
  exam: ExamDefinition,
  storage: StorageLike,
  nowMs = Date.now(),
): SessionRecoveryResult {
  const key = getSessionStorageKey(exam.id);
  let raw: string | null;

  try {
    raw = storage.getItem(key);
  } catch {
    return { kind: "unavailable" };
  }

  if (raw === null) return { kind: "none" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    safeRemove(storage, key);
    return { kind: "discarded", reason: "invalid-json" };
  }

  const issue = getSessionIntegrityIssue(exam, parsed);
  if (issue) {
    safeRemove(storage, key);
    return { kind: "discarded", reason: issue };
  }

  const session = parsed as ExamSession;
  if (session.status !== "in-progress") {
    safeRemove(storage, key);
    return { kind: "discarded", reason: "not-in-progress" };
  }

  return {
    kind: "resumable",
    session,
    expired: isSessionTimeExpired(exam, session, nowMs),
  };
}

export function saveSessionSafely(
  exam: ExamDefinition,
  session: ExamSession,
  storage: StorageLike,
): SessionSaveResult {
  const issue = getSessionIntegrityIssue(exam, session);
  if (issue) return { kind: "invalid-session", reason: issue };

  const key = getSessionStorageKey(exam.id);
  if (session.status !== "in-progress") {
    return safeRemove(storage, key) ? { kind: "removed" } : { kind: "unavailable" };
  }

  try {
    const existingRaw = storage.getItem(key);
    if (existingRaw) {
      try {
        const existing = JSON.parse(existingRaw) as unknown;
        if (
          getSessionIntegrityIssue(exam, existing) === null
          && isExamSession(existing)
          && existing.status === "in-progress"
          && existing.updatedAt > session.updatedAt
        ) {
          return { kind: "conflict", newerSession: existing };
        }
      } catch {
        // A corrupt older value is safely replaced by the valid current session.
      }
    }

    storage.setItem(key, JSON.stringify(session));
    return { kind: "saved" };
  } catch {
    return { kind: "unavailable" };
  }
}

export function removeStoredSession(examId: string, storage: StorageLike): boolean {
  return safeRemove(storage, getSessionStorageKey(examId));
}

function safeRemove(storage: StorageLike, key: string): boolean {
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function isExamSession(value: unknown): value is ExamSession {
  return typeof value === "object" && value !== null;
}
