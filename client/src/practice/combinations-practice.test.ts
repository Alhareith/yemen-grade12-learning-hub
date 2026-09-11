import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  combinationsPracticeQuestions,
  combinationsPracticeSet,
  combinationsPracticeSkillId,
} from "@/data/mathCombinationsPractice";
import { practiceBank, reservedExamQuestionIds } from "@/data/practiceBank";
import { selectFreshPracticeQuestionIds } from "@shared/practice/practice-engine";
import {
  isPracticeQuestionReadyForStudents,
  isPracticeSetReadyForStudents,
  validatePracticeBank,
} from "@shared/practice/practice-model";

function visibleText(question: (typeof combinationsPracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = combinationsPracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 09 combinations practice", () => {
  it("publishes ten reviewed authored questions without false ministerial provenance", () => {
    expect(combinationsPracticeSkillId).toBe("COUNT-COMBINATIONS-APPLY");
    expect(curriculumSkillIds.has(combinationsPracticeSkillId)).toBe(true);
    expect(combinationsPracticeQuestions).toHaveLength(10);
    expect(combinationsPracticeSet.questionIds).toHaveLength(10);
    expect(combinationsPracticeSet.roundSize).toBe(5);
    expect(combinationsPracticeSet.status).toBe("ready");

    combinationsPracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("authored");
      expect(question.provenance.sourceLabel).toBeUndefined();
      expect(question.provenance.sourceUrl).toBeUndefined();
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("supports two fresh five-question rounds", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, combinationsPracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, combinationsPracticeSet.id, { seed: "combinations:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, combinationsPracticeSet.id, {
      seed: "combinations:second",
      excludedQuestionIds: new Set(first),
    });
    expect(first).toHaveLength(5);
    expect(second).toHaveLength(5);
    expect(first.filter((id) => second.includes(id))).toEqual([]);
    expect(new Set([...first, ...second]).size).toBe(10);
  });

  it("keeps the combined live practice bank valid", () => {
    expect(validatePracticeBank(practiceBank, curriculumSkillIds, reservedExamQuestionIds)).toEqual([]);
  });

  it("locks the independently reviewed answers", () => {
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:01")).toBe("١٠");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:02")).toBe("٣٥");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:03")).toBe("٧٠");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:04")).toBe("٢١");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:05")).toBe("٣٥");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:06")).toBe("١٥٠");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:07")).toBe("٢٨");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:08")).toBe("١٦");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:09")).toBe("١٠٥");
    expect(correctText("practice:COUNT-COMBINATIONS-APPLY:10")).toBe("٢٠");
  });
});
