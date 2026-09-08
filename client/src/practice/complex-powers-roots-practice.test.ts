import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  complexPowersRootsPracticeQuestions,
  complexPowersRootsPracticeSet,
  complexPowersRootsPracticeSkillId,
} from "@/data/mathComplexPowersRootsPractice";
import { practiceBank, reservedExamQuestionIds } from "@/data/practiceBank";
import { selectFreshPracticeQuestionIds } from "@shared/practice/practice-engine";
import {
  isPracticeQuestionReadyForStudents,
  isPracticeSetReadyForStudents,
  validatePracticeBank,
} from "@shared/practice/practice-model";

function visibleText(question: (typeof complexPowersRootsPracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = complexPowersRootsPracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 05 complex powers and roots practice", () => {
  it("publishes ten verified source-adapted questions for the powers-roots curriculum skill", () => {
    expect(complexPowersRootsPracticeSkillId).toBe("CPLX-POWERS-ROOTS-APPLY");
    expect(curriculumSkillIds.has(complexPowersRootsPracticeSkillId)).toBe(true);
    expect(complexPowersRootsPracticeQuestions).toHaveLength(10);
    expect(complexPowersRootsPracticeSet.questionIds).toHaveLength(10);
    expect(complexPowersRootsPracticeSet.roundSize).toBe(5);
    expect(complexPowersRootsPracticeSet.status).toBe("ready");

    expect(complexPowersRootsPracticeQuestions.filter((question) => question.difficulty === "easy")).toHaveLength(3);
    expect(complexPowersRootsPracticeQuestions.filter((question) => question.difficulty === "medium")).toHaveLength(4);
    expect(complexPowersRootsPracticeQuestions.filter((question) => question.difficulty === "hard")).toHaveLength(3);

    complexPowersRootsPracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("adapted");
      expect(question.provenance.sourceLabel).toContain("2025");
      expect(question.provenance.sourceLabel).toContain("مفتاح الإجابة");
      expect(question.provenance.sourceUrl).toContain("2025-agp-complex-powers-roots-source.md");
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("supports two five-question rounds without reusing a question", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, complexPowersRootsPracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, complexPowersRootsPracticeSet.id, { seed: "complex-powers-roots:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, complexPowersRootsPracticeSet.id, {
      seed: "complex-powers-roots:second",
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

  it("locks the independently recomputed powers and roots answers", () => {
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:01")).toBe("ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:02")).toBe("١ + ٤√٣ ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:03")).toBe("−١");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:04")).toBe("١ − ٤√٣ ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:05")).toBe("−ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:06")).toBe("ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:07")).toBe("−١ − ٤√٣ ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:08")).toBe("−ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:09")).toBe("−١ + ٢√٢ ت");
    expect(correctText("practice:CPLX-POWERS-ROOTS-APPLY:10")).toBe("١ − ٢√٦ ت");
  });
});
