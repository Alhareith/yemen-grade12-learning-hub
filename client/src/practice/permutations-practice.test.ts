import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  permutationsPracticeQuestions,
  permutationsPracticeSet,
  permutationsPracticeSkillId,
} from "@/data/mathPermutationsPractice";
import { practiceBank, reservedExamQuestionIds } from "@/data/practiceBank";
import { selectFreshPracticeQuestionIds } from "@shared/practice/practice-engine";
import {
  isPracticeQuestionReadyForStudents,
  isPracticeSetReadyForStudents,
  validatePracticeBank,
} from "@shared/practice/practice-model";

function visibleText(question: (typeof permutationsPracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = permutationsPracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 08 permutations practice", () => {
  it("publishes ten verified source-adapted questions for the permutations skill", () => {
    expect(permutationsPracticeSkillId).toBe("COUNT-PERMUTATIONS-APPLY");
    expect(curriculumSkillIds.has(permutationsPracticeSkillId)).toBe(true);
    expect(permutationsPracticeQuestions).toHaveLength(10);
    expect(permutationsPracticeSet.questionIds).toHaveLength(10);
    expect(permutationsPracticeSet.roundSize).toBe(5);
    expect(permutationsPracticeSet.status).toBe("ready");

    expect(permutationsPracticeQuestions.filter((question) => question.difficulty === "easy")).toHaveLength(3);
    expect(permutationsPracticeQuestions.filter((question) => question.difficulty === "medium")).toHaveLength(4);
    expect(permutationsPracticeQuestions.filter((question) => question.difficulty === "hard")).toHaveLength(3);

    permutationsPracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("adapted");
      expect(question.provenance.sourceLabel).toContain("2025");
      expect(question.provenance.sourceLabel).toContain("السؤال 9");
      expect(question.provenance.sourceUrl).toContain("2025-agp-permutations-source.md");
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("supports two fresh five-question rounds", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, permutationsPracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, permutationsPracticeSet.id, { seed: "permutations:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, permutationsPracticeSet.id, {
      seed: "permutations:second",
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

  it("locks the independently recomputed permutation counts", () => {
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:01")).toBe("٦٠");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:02")).toBe("١٨٠");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:03")).toBe("٣٠");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:04")).toBe("٦٠");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:05")).toBe("٢٤");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:06")).toBe("٦٠");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:07")).toBe("١٢");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:08")).toBe("٦٠");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:09")).toBe("١٢٠");
    expect(correctText("practice:COUNT-PERMUTATIONS-APPLY:10")).toBe("٦");
  });
});
