import { describe, expect, it } from "vitest";
import { pilotCalculusExam } from "@/data/exams/pilotExam";
import { createExamSession, getRemainingTimeMs } from "@shared/exams/session-engine";

describe("pilot timed simulation", () => {
  it("uses exactly one hour when the student chooses the timer", () => {
    expect(pilotCalculusExam.durationMinutes).toBe(60);

    const startedAt = 1_000_000;
    const session = createExamSession(pilotCalculusExam, { timingMode: "timed", nowMs: startedAt });

    expect(session.deadlineAt).toBe(startedAt + 60 * 60_000);
    expect(getRemainingTimeMs(pilotCalculusExam, session, startedAt)).toBe(60 * 60_000);
  });
});
