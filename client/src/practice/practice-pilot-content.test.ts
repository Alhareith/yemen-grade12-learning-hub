import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  mathPracticePilotQuestions,
  mathPracticePilotSets,
  pilotPracticeSkillIds,
} from "@/data/mathPracticePilot";
import {
  practiceBank,
  reservedExamQuestionIds,
} from "@/data/practiceBank";
import { selectFreshPracticeQuestionIds } from "@shared/practice/practice-engine";
import {
  isPracticeQuestionReadyForStudents,
  isPracticeSetReadyForStudents,
  validatePracticeBank,
} from "@shared/practice/practice-model";

function studentText(question: (typeof mathPracticePilotQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

describe("math skill practice pilot content", () => {
  it("covers six representative curriculum skills with ten reviewed questions each", () => {
    expect(pilotPracticeSkillIds).toEqual([
      "CPLX-NUMBER-USE",
      "COUNT-COMBINATIONS-APPLY",
      "CONIC-PARABOLA-APPLY",
      "PROB-CONDITIONAL-APPLY",
      "DER-CHAIN",
      "INT-SUBSTITUTION-APPLY",
    ]);
    expect(mathPracticePilotQuestions).toHaveLength(60);
    expect(mathPracticePilotSets).toHaveLength(6);

    for (const skillId of pilotPracticeSkillIds) {
      expect(curriculumSkillIds.has(skillId)).toBe(true);
      const questions = mathPracticePilotQuestions.filter((question) => question.skillId === skillId);
      expect(questions).toHaveLength(10);
      expect(questions.filter((question) => question.difficulty === "easy")).toHaveLength(3);
      expect(questions.filter((question) => question.difficulty === "medium")).toHaveLength(4);
      expect(questions.filter((question) => question.difficulty === "hard")).toHaveLength(3);
      questions.forEach((question) => {
        expect(question.provenance.origin).toBe("authored");
        expect(question.verification.status).toBe("verified");
        expect(question.verification.blockingNotes).toEqual([]);
        expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
        expect(reservedExamQuestionIds.has(question.id)).toBe(false);
        expect(studentText(question)).not.toMatch(/[A-Za-z]/);
      });
    }
  });

  it("supports two complete five-question rounds without direct repetition for every skill", () => {
    for (const set of mathPracticePilotSets) {
      expect(isPracticeSetReadyForStudents(practiceBank, set.id, curriculumSkillIds)).toBe(true);
      const first = selectFreshPracticeQuestionIds(practiceBank, set.id, { seed: `${set.id}:round-1` });
      const second = selectFreshPracticeQuestionIds(practiceBank, set.id, {
        seed: `${set.id}:round-2`,
        excludedQuestionIds: new Set(first),
      });
      expect(first).toHaveLength(5);
      expect(second).toHaveLength(5);
      expect(first.filter((id) => second.includes(id))).toEqual([]);
      expect(new Set([...first, ...second]).size).toBe(10);
    }
  });

  it("keeps the full live bank valid", () => {
    expect(validatePracticeBank(practiceBank, curriculumSkillIds, reservedExamQuestionIds)).toEqual([]);
  });

  it("locks representative reviewed answers for mathematical regression protection", () => {
    const byId = new Map(mathPracticePilotQuestions.map((question) => [question.id, question]));
    expect(byId.get("practice:CPLX-NUMBER-USE:06")?.options.find((option) => option.id === byId.get("practice:CPLX-NUMBER-USE:06")?.answer.correctOptionId)?.content[0]).toMatchObject({ type: "text", text: "٥" });
    expect(byId.get("practice:COUNT-COMBINATIONS-APPLY:09")?.options.find((option) => option.id === byId.get("practice:COUNT-COMBINATIONS-APPLY:09")?.answer.correctOptionId)?.content[0]).toMatchObject({ type: "text", text: "٨٤" });
    expect(byId.get("practice:CONIC-PARABOLA-APPLY:09")?.options.find((option) => option.id === byId.get("practice:CONIC-PARABOLA-APPLY:09")?.answer.correctOptionId)?.content[0]).toMatchObject({ type: "text", text: "ص² = ١٢س" });
    expect(byId.get("practice:PROB-CONDITIONAL-APPLY:08")?.options.find((option) => option.id === byId.get("practice:PROB-CONDITIONAL-APPLY:08")?.answer.correctOptionId)?.content[0]).toMatchObject({ type: "text", text: "٢/٣" });
    expect(byId.get("practice:DER-CHAIN:01")?.options.find((option) => option.id === byId.get("practice:DER-CHAIN:01")?.answer.correctOptionId)?.content[0]).toMatchObject({ type: "text", text: "٦س(س² + ١)²" });
    expect(byId.get("practice:INT-SUBSTITUTION-APPLY:09")?.options.find((option) => option.id === byId.get("practice:INT-SUBSTITUTION-APPLY:09")?.answer.correctOptionId)?.content[0]).toMatchObject({ type: "text", text: "(٢س + ١)⁶/١٢ + ث" });
  });
});
