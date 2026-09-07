import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  complexAddSubPracticeQuestions,
  complexAddSubPracticeSet,
  complexAddSubPracticeSkillId,
} from "@/data/mathComplexAddSubPractice";
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

function visibleText(question: (typeof complexAddSubPracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = complexAddSubPracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 02 complex add-sub practice", () => {
  it("publishes exactly ten source-adapted verified questions for the curriculum skill", () => {
    expect(complexAddSubPracticeSkillId).toBe("CPLX-ADD-SUB-APPLY");
    expect(curriculumSkillIds.has(complexAddSubPracticeSkillId)).toBe(true);
    expect(complexAddSubPracticeQuestions).toHaveLength(10);
    expect(complexAddSubPracticeSet.questionIds).toHaveLength(10);
    expect(complexAddSubPracticeSet.roundSize).toBe(5);
    expect(complexAddSubPracticeSet.status).toBe("ready");

    expect(complexAddSubPracticeQuestions.filter((question) => question.difficulty === "easy")).toHaveLength(3);
    expect(complexAddSubPracticeQuestions.filter((question) => question.difficulty === "medium")).toHaveLength(4);
    expect(complexAddSubPracticeQuestions.filter((question) => question.difficulty === "hard")).toHaveLength(3);

    complexAddSubPracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("adapted");
      expect(question.provenance.sourceLabel).toContain("2025");
      expect(question.provenance.sourceLabel).toContain("السؤال 2");
      expect(question.provenance.sourceUrl).toContain("2025-agp-complex-add-sub-source.md");
      expect(question.provenance.adaptationNote).toContain("صيغة صح/خطأ الأصلية");
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("supports two five-question rounds without reusing a question", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, complexAddSubPracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, complexAddSubPracticeSet.id, { seed: "complex-add-sub:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, complexAddSubPracticeSet.id, {
      seed: "complex-add-sub:second",
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

  it("locks the independently recomputed answers from the 2025 source operations", () => {
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:01")).toBe("٦ − ٤ت");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:02")).toBe("١٠ − ٢ت");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:03")).toBe("−٤ت");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:04")).toBe("−٦");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:05")).toBe("−٣ − ت");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:06")).toBe("٤");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:07")).toBe("−١ + ت");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:08")).toBe("−٤ت");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:09")).toBe("١");
    expect(correctText("practice:CPLX-ADD-SUB-APPLY:10")).toBe("٠");
  });
});
