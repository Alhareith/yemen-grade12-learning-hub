import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  complexQuadraticPracticeQuestions,
  complexQuadraticPracticeSet,
  complexQuadraticPracticeSkillId,
} from "@/data/mathComplexQuadraticPractice";
import { practiceBank, reservedExamQuestionIds } from "@/data/practiceBank";
import { selectFreshPracticeQuestionIds } from "@shared/practice/practice-engine";
import {
  isPracticeQuestionReadyForStudents,
  isPracticeSetReadyForStudents,
  validatePracticeBank,
} from "@shared/practice/practice-model";

function visibleText(question: (typeof complexQuadraticPracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = complexQuadraticPracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 06 complex quadratic practice", () => {
  it("publishes ten verified source-adapted questions for the quadratic curriculum skill", () => {
    expect(complexQuadraticPracticeSkillId).toBe("CPLX-QUADRATIC-SOLVE");
    expect(curriculumSkillIds.has(complexQuadraticPracticeSkillId)).toBe(true);
    expect(complexQuadraticPracticeQuestions).toHaveLength(10);
    expect(complexQuadraticPracticeSet.questionIds).toHaveLength(10);
    expect(complexQuadraticPracticeSet.roundSize).toBe(5);
    expect(complexQuadraticPracticeSet.status).toBe("ready");

    expect(complexQuadraticPracticeQuestions.filter((question) => question.difficulty === "easy")).toHaveLength(3);
    expect(complexQuadraticPracticeQuestions.filter((question) => question.difficulty === "medium")).toHaveLength(4);
    expect(complexQuadraticPracticeQuestions.filter((question) => question.difficulty === "hard")).toHaveLength(3);

    complexQuadraticPracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("adapted");
      expect(question.provenance.sourceLabel).toContain("2025");
      expect(question.provenance.sourceLabel).toContain("السؤال 27");
      expect(question.provenance.sourceLabel).toContain("مفتاح الإجابة");
      expect(question.provenance.sourceUrl).toContain("2025-agp-complex-quadratic-source.md");
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("supports two five-question rounds without reusing a question", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, complexQuadraticPracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, complexQuadraticPracticeSet.id, { seed: "complex-quadratic:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, complexQuadraticPracticeSet.id, {
      seed: "complex-quadratic:second",
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

  it("locks the independently recomputed quadratic solution sets", () => {
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:01")).toBe("{−ت، −٥ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:02")).toBe("{−ت، ٩ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:03")).toBe("{ت، ٥ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:04")).toBe("{−٣ت، ٤ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:05")).toBe("{ت، −٥ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:06")).toBe("{−ت، −٦ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:07")).toBe("{−ت، ٣ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:08")).toBe("{ت، −٦ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:09")).toBe("{ت، ٢ت}");
    expect(correctText("practice:CPLX-QUADRATIC-SOLVE:10")).toBe("{−ت، ٨ت}");
  });
});
