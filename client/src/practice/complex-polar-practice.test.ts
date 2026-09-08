import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  complexPolarPracticeQuestions,
  complexPolarPracticeSet,
  complexPolarPracticeSkillId,
} from "@/data/mathComplexPolarPractice";
import { practiceBank, reservedExamQuestionIds } from "@/data/practiceBank";
import { selectFreshPracticeQuestionIds } from "@shared/practice/practice-engine";
import {
  isPracticeQuestionReadyForStudents,
  isPracticeSetReadyForStudents,
  validatePracticeBank,
} from "@shared/practice/practice-model";

function visibleText(question: (typeof complexPolarPracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = complexPolarPracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 04 complex polar practice", () => {
  it("publishes ten verified source-adapted questions for the polar-form curriculum skill", () => {
    expect(complexPolarPracticeSkillId).toBe("CPLX-POLAR-USE");
    expect(curriculumSkillIds.has(complexPolarPracticeSkillId)).toBe(true);
    expect(complexPolarPracticeQuestions).toHaveLength(10);
    expect(complexPolarPracticeSet.questionIds).toHaveLength(10);
    expect(complexPolarPracticeSet.roundSize).toBe(5);
    expect(complexPolarPracticeSet.status).toBe("ready");

    expect(complexPolarPracticeQuestions.filter((question) => question.difficulty === "easy")).toHaveLength(3);
    expect(complexPolarPracticeQuestions.filter((question) => question.difficulty === "medium")).toHaveLength(4);
    expect(complexPolarPracticeQuestions.filter((question) => question.difficulty === "hard")).toHaveLength(3);

    complexPolarPracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("adapted");
      expect(question.provenance.sourceLabel).toContain("2025");
      expect(question.provenance.sourceUrl).toContain("2025-agp-complex-polar-source.md");
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("supports two five-question rounds without reusing a question", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, complexPolarPracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, complexPolarPracticeSet.id, { seed: "complex-polar:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, complexPolarPracticeSet.id, {
      seed: "complex-polar:second",
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

  it("locks the independently recomputed polar answers", () => {
    expect(correctText("practice:CPLX-POLAR-USE:01")).toBe("[٢، π⁄٣]");
    expect(correctText("practice:CPLX-POLAR-USE:02")).toBe("[٢√٢، ٥π⁄٤]");
    expect(correctText("practice:CPLX-POLAR-USE:03")).toBe("[٢، ٢π⁄٣]");
    expect(correctText("practice:CPLX-POLAR-USE:04")).toBe("[٢√٣، −π⁄٦]");
    expect(correctText("practice:CPLX-POLAR-USE:05")).toBe("[٢، π⁄٦]");
    expect(correctText("practice:CPLX-POLAR-USE:06")).toBe("[٢√٣، ٧π⁄٦]");
    expect(correctText("practice:CPLX-POLAR-USE:07")).toBe("[٢، ٥π⁄٦]");
    expect(correctText("practice:CPLX-POLAR-USE:08")).toBe("[٢√٣، −π⁄٣]");
    expect(correctText("practice:CPLX-POLAR-USE:09")).toBe("[٢، π⁄٤]");
    expect(correctText("practice:CPLX-POLAR-USE:10")).toBe("[٢√٣، ٤π⁄٣]");
  });
});
