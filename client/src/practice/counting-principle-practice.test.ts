import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  countingPrinciplePracticeQuestions,
  countingPrinciplePracticeSet,
  countingPrinciplePracticeSkillId,
} from "@/data/mathCountingPrinciplePractice";
import { practiceBank, reservedExamQuestionIds } from "@/data/practiceBank";
import { selectFreshPracticeQuestionIds } from "@shared/practice/practice-engine";
import {
  isPracticeQuestionReadyForStudents,
  isPracticeSetReadyForStudents,
  validatePracticeBank,
} from "@shared/practice/practice-model";

function visibleText(question: (typeof countingPrinciplePracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = countingPrinciplePracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 07 counting principle practice", () => {
  it("publishes ten verified source-adapted questions for the counting skill", () => {
    expect(countingPrinciplePracticeSkillId).toBe("COUNT-PRINCIPLE-APPLY");
    expect(curriculumSkillIds.has(countingPrinciplePracticeSkillId)).toBe(true);
    expect(countingPrinciplePracticeQuestions).toHaveLength(10);
    expect(countingPrinciplePracticeSet.questionIds).toHaveLength(10);
    expect(countingPrinciplePracticeSet.roundSize).toBe(5);
    expect(countingPrinciplePracticeSet.status).toBe("ready");

    expect(countingPrinciplePracticeQuestions.filter((question) => question.difficulty === "easy")).toHaveLength(3);
    expect(countingPrinciplePracticeQuestions.filter((question) => question.difficulty === "medium")).toHaveLength(4);
    expect(countingPrinciplePracticeQuestions.filter((question) => question.difficulty === "hard")).toHaveLength(3);

    countingPrinciplePracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("adapted");
      expect(question.provenance.sourceLabel).toContain("2025");
      expect(question.provenance.sourceLabel).toContain("السؤال 14");
      expect(question.provenance.sourceUrl).toContain("2025-agp-counting-principle-source.md");
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("supports two five-question rounds without reusing a question", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, countingPrinciplePracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, countingPrinciplePracticeSet.id, { seed: "counting:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, countingPrinciplePracticeSet.id, {
      seed: "counting:second",
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

  it("locks the independently recomputed result counts", () => {
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:01")).toBe("٣٦");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:02")).toBe("١٢٩٦");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:03")).toBe("٧٧٧٦");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:04")).toBe("٤٦٦٥٦");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:05")).toBe("٦٤");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:06")).toBe("١٢");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:07")).toBe("٢٤");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:08")).toBe("٢١٦");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:09")).toBe("٨");
    expect(correctText("practice:COUNT-PRINCIPLE-APPLY:10")).toBe("٧٧٧٦");
  });
});
