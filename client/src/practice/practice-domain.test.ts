import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import { agpGeneralExam } from "@/data/exams/agpExam";
import { pilotCalculusExam } from "@/data/exams/pilotExam";
import type { PracticeBank, PracticeQuestion } from "@shared/practice/practice-model";
import {
  isPracticeSetReadyForStudents,
  validatePracticeBank,
  validatePracticeQuestion,
} from "@shared/practice/practice-model";
import {
  buildPracticeSessionResult,
  completePracticeSession,
  createPracticeSession,
  recordPracticeAnswer,
  selectFreshPracticeQuestionIds,
  validatePracticeSession,
  type PracticeSession,
} from "@shared/practice/practice-engine";
import {
  buildEvidenceFromResults,
  buildSkillPracticeEvidence,
} from "@shared/practice/practice-evidence";

const SKILL_ID = "DER-CHAIN";
const SET_ID = "practice-set:DER-CHAIN:pilot";

function makeQuestion(index: number, overrides: Partial<PracticeQuestion> = {}): PracticeQuestion {
  const id = `practice:DER-CHAIN:${String(index).padStart(2, "0")}`;
  return {
    schemaVersion: "1.0",
    kind: "practice",
    id,
    skillId: SKILL_ID,
    type: "single-choice",
    difficulty: index <= 3 ? "easy" : index <= 7 ? "medium" : "hard",
    stem: [{ type: "text", text: `سؤال تدريبي ${index} على قاعدة التسلسل` }],
    options: [
      { id: "a", label: "أ", content: [{ type: "text", text: "الإجابة الصحيحة" }] },
      { id: "b", label: "ب", content: [{ type: "text", text: "مشتت تدريبي" }] },
    ],
    answer: {
      correctOptionId: "a",
      explanation: [{ type: "text", text: "نحدد الدالة الخارجية والداخلية ثم نطبق قاعدة التسلسل بالترتيب." }],
    },
    provenance: { origin: "authored" },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-06T00:00:00Z",
      reviewedBy: "practice-domain-test",
      blockingNotes: [],
    },
    ...overrides,
  };
}

function makeBank(questionCount = 10): PracticeBank {
  const questions = Array.from({ length: questionCount }, (_, index) => makeQuestion(index + 1));
  return {
    schemaVersion: "1.0",
    questions,
    sets: [{
      schemaVersion: "1.0",
      id: SET_ID,
      skillId: SKILL_ID,
      title: "تدريب قاعدة التسلسل",
      questionIds: questions.map((question) => question.id),
      roundSize: 5,
      status: "ready",
    }],
  };
}

function answerAndComplete(
  bank: PracticeBank,
  session: PracticeSession,
  correctQuestionCount: number,
  startTime: number,
) {
  let next = session;
  session.questionIds.forEach((questionId, index) => {
    next = recordPracticeAnswer(next, bank, questionId, index < correctQuestionCount ? "a" : "b", startTime + index + 1);
  });
  return completePracticeSession(next, bank, startTime + session.questionIds.length + 2);
}

describe("practice domain model", () => {
  it("accepts a verified training question linked to a real curriculum skill", () => {
    expect(curriculumSkillIds.has(SKILL_ID)).toBe(true);
    expect(validatePracticeQuestion(makeQuestion(1), curriculumSkillIds)).toEqual([]);
  });

  it("rejects unknown skills and answer ids that do not exist", () => {
    const invalid = makeQuestion(1, {
      skillId: "NOT-A-REAL-SKILL",
      answer: {
        correctOptionId: "missing",
        explanation: [{ type: "text", text: "شرح" }],
      },
    });
    const errors = validatePracticeQuestion(invalid, curriculumSkillIds);
    expect(errors).toContain("unknown skill id: NOT-A-REAL-SKILL");
    expect(errors).toContain("answer.correctOptionId must reference an existing option id");
  });

  it("requires source traceability for adapted training questions", () => {
    const adapted = makeQuestion(1, { provenance: { origin: "adapted" } });
    const errors = validatePracticeQuestion(adapted, curriculumSkillIds);
    expect(errors).toContain("provenance.sourceLabel cannot be empty");
    expect(errors).toContain("provenance.sourceUrl cannot be empty");
    expect(errors).toContain("provenance.adaptationNote cannot be empty");
  });

  it("does not mark a set ready unless it supports two fresh rounds", () => {
    const bank = makeBank(5);
    const errors = validatePracticeBank(bank, curriculumSkillIds);
    expect(errors).toContain(`ready set ${SET_ID} must support two fresh rounds without direct repetition`);
    expect(isPracticeSetReadyForStudents(bank, SET_ID, curriculumSkillIds)).toBe(false);
  });

  it("prevents practice question ids from colliding with simulation question ids", () => {
    const bank = makeBank();
    const examQuestionIds = new Set([
      ...pilotCalculusExam.questions.map((question) => question.id),
      ...agpGeneralExam.questions.map((question) => question.id),
    ]);
    bank.questions[0] = { ...bank.questions[0], id: pilotCalculusExam.questions[0].id };
    bank.sets[0] = {
      ...bank.sets[0],
      questionIds: [pilotCalculusExam.questions[0].id, ...bank.sets[0].questionIds.slice(1)],
    };
    expect(validatePracticeBank(bank, curriculumSkillIds, examQuestionIds))
      .toContain(`practice question ${pilotCalculusExam.questions[0].id} collides with an exam question id`);
  });

  it("accepts a ready single-skill bank only when every question is student-ready", () => {
    const bank = makeBank();
    const examQuestionIds = new Set([
      ...pilotCalculusExam.questions.map((question) => question.id),
      ...agpGeneralExam.questions.map((question) => question.id),
    ]);
    expect(validatePracticeBank(bank, curriculumSkillIds, examQuestionIds)).toEqual([]);
    expect(isPracticeSetReadyForStudents(bank, SET_ID, curriculumSkillIds)).toBe(true);
  });
});

describe("practice session engine", () => {
  it("creates two complete fresh rounds without direct repetition", () => {
    const bank = makeBank();
    const firstIds = selectFreshPracticeQuestionIds(bank, SET_ID, { seed: "round-1" });
    const secondIds = selectFreshPracticeQuestionIds(bank, SET_ID, {
      seed: "round-2",
      excludedQuestionIds: new Set(firstIds),
    });
    expect(firstIds).toHaveLength(5);
    expect(secondIds).toHaveLength(5);
    expect(new Set(firstIds).size).toBe(5);
    expect(secondIds.some((questionId) => firstIds.includes(questionId))).toBe(false);
  });

  it("locks answered questions and refuses answers outside the current round", () => {
    const bank = makeBank();
    const session = createPracticeSession(bank, { setId: SET_ID, sessionId: "session-1", now: 1000 });
    const questionId = session.questionIds[0];
    const answered = recordPracticeAnswer(session, bank, questionId, "a", 1001);
    expect(() => recordPracticeAnswer(answered, bank, questionId, "b", 1002)).toThrow("already answered");
    const outside = bank.questions.find((question) => !session.questionIds.includes(question.id));
    expect(outside).toBeDefined();
    expect(() => recordPracticeAnswer(answered, bank, outside!.id, "a", 1002)).toThrow("not part of this practice round");
  });

  it("requires the full learning round before completion and produces a deterministic result", () => {
    const bank = makeBank();
    const session = createPracticeSession(bank, { setId: SET_ID, sessionId: "session-result", now: 2000, seed: "fixed" });
    expect(() => completePracticeSession(session, bank, 2001)).toThrow("unanswered questions");
    const completed = answerAndComplete(bank, session, 4, 2000);
    expect(validatePracticeSession(completed, bank)).toEqual([]);
    const result = buildPracticeSessionResult(completed, bank);
    expect(result.correctCount).toBe(4);
    expect(result.incorrectCount).toBe(1);
    expect(result.percentage).toBe(80);
  });
});

describe("practice evidence", () => {
  it("describes one strong round cautiously instead of declaring mastery", () => {
    const bank = makeBank();
    const session = createPracticeSession(bank, { setId: SET_ID, sessionId: "single-round", now: 3000 });
    const completed = answerAndComplete(bank, session, 5, 3000);
    const evidence = buildSkillPracticeEvidence([completed], bank, SKILL_ID);
    expect(evidence.uniqueQuestionCount).toBe(5);
    expect(evidence.confidence).toBe("good");
    expect(evidence.status).toBe("strong-round");
    expect(evidence.statusLabel).toContain("يحتاج تحقق لاحقًا بالمحاكاة");
    expect(evidence.recommendation).toContain("لا نعدّه إتقانًا نهائيًا");
  });

  it("upgrades confidence only after a second fresh round", () => {
    const bank = makeBank();
    const first = createPracticeSession(bank, { setId: SET_ID, sessionId: "evidence-1", now: 4000, seed: "e1" });
    const firstCompleted = answerAndComplete(bank, first, 4, 4000);
    const second = createPracticeSession(bank, {
      setId: SET_ID,
      sessionId: "evidence-2",
      now: 5000,
      seed: "e2",
      excludedQuestionIds: new Set(first.questionIds),
    });
    const secondCompleted = answerAndComplete(bank, second, 4, 5000);
    const evidence = buildSkillPracticeEvidence([firstCompleted, secondCompleted], bank, SKILL_ID);
    expect(evidence.uniqueQuestionCount).toBe(10);
    expect(evidence.completedSessionCount).toBe(2);
    expect(evidence.confidence).toBe("strong");
    expect(evidence.percentage).toBe(80);
  });

  it("detects repeated misses instead of hiding them behind an average", () => {
    const evidence = buildEvidenceFromResults(SKILL_ID, [
      {
        sessionId: "r1",
        setId: SET_ID,
        skillId: SKILL_ID,
        questionCount: 3,
        correctCount: 2,
        incorrectCount: 1,
        percentage: 67,
        questions: [
          { questionId: "q-repeat", selectedOptionId: "b", correctOptionId: "a", correct: false },
          { questionId: "q-2", selectedOptionId: "a", correctOptionId: "a", correct: true },
          { questionId: "q-3", selectedOptionId: "a", correctOptionId: "a", correct: true },
        ],
      },
      {
        sessionId: "r2",
        setId: SET_ID,
        skillId: SKILL_ID,
        questionCount: 3,
        correctCount: 2,
        incorrectCount: 1,
        percentage: 67,
        questions: [
          { questionId: "q-repeat", selectedOptionId: "b", correctOptionId: "a", correct: false },
          { questionId: "q-4", selectedOptionId: "a", correctOptionId: "a", correct: true },
          { questionId: "q-5", selectedOptionId: "a", correctOptionId: "a", correct: true },
        ],
      },
    ]);
    expect(evidence.repeatedMissQuestionIds).toEqual(["q-repeat"]);
    expect(evidence.status).toBe("needs-review");
    expect(evidence.recommendation).toContain("خطأ تكرر");
  });
});
