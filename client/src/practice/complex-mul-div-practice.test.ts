import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  complexMulDivPracticeQuestions,
  complexMulDivPracticeSet,
  complexMulDivPracticeSkillId,
} from "@/data/mathComplexMulDivPractice";
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

function visibleText(question: (typeof complexMulDivPracticeQuestions)[number]) {
  const segments = [
    ...question.stem,
    ...question.options.flatMap((option) => option.content),
    ...question.answer.explanation,
  ];
  return segments.map((segment) => segment.type === "text" ? segment.text : segment.altText).join(" ");
}

function correctText(questionId: string) {
  const question = complexMulDivPracticeQuestions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.id === question.answer.correctOptionId);
  const segment = option?.content[0];
  return segment?.type === "text" ? segment.text : segment?.altText;
}

describe("lesson 03 complex multiply-divide practice", () => {
  it("publishes exactly ten source-adapted verified questions for the curriculum skill", () => {
    expect(complexMulDivPracticeSkillId).toBe("CPLX-MUL-DIV-APPLY");
    expect(curriculumSkillIds.has(complexMulDivPracticeSkillId)).toBe(true);
    expect(complexMulDivPracticeQuestions).toHaveLength(10);
    expect(complexMulDivPracticeSet.questionIds).toHaveLength(10);
    expect(complexMulDivPracticeSet.roundSize).toBe(5);
    expect(complexMulDivPracticeSet.status).toBe("ready");

    complexMulDivPracticeQuestions.forEach((question) => {
      expect(question.provenance.origin).toBe("adapted");
      expect(question.provenance.sourceLabel).toContain("2025");
      expect(question.provenance.sourceUrl).toContain("2025-agp-complex-mul-div-source.md");
      expect(question.verification.status).toBe("verified");
      expect(question.verification.blockingNotes).toEqual([]);
      expect(isPracticeQuestionReadyForStudents(question, curriculumSkillIds)).toBe(true);
      expect(reservedExamQuestionIds.has(question.id)).toBe(false);
      expect(visibleText(question)).not.toMatch(/[A-Za-z]/);
    });
  });

  it("keeps direct-key and independently computed division evidence explicit", () => {
    for (const question of complexMulDivPracticeQuestions.slice(0, 5)) {
      expect(question.provenance.adaptationNote).toContain("مطابق لمفتاح الاختيار المنشور");
    }
    for (const question of complexMulDivPracticeQuestions.slice(5)) {
      expect(question.provenance.adaptationNote).toContain("قيمة التبسيط في هذا التدريب حُسبت مستقلًا");
    }
  });

  it("supports two five-question rounds without reusing a question", () => {
    expect(isPracticeSetReadyForStudents(practiceBank, complexMulDivPracticeSet.id, curriculumSkillIds)).toBe(true);
    const first = selectFreshPracticeQuestionIds(practiceBank, complexMulDivPracticeSet.id, { seed: "complex-mul-div:first" });
    const second = selectFreshPracticeQuestionIds(practiceBank, complexMulDivPracticeSet.id, {
      seed: "complex-mul-div:second",
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

  it("locks the independently recomputed answers from the 2025 source expressions", () => {
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:01")).toBe("٣٦");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:02")).toBe("٢٥");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:03")).toBe("١٨");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:04")).toBe("١٣");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:05")).toBe("١٢");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:06")).toBe("−١⁄٢ + (√٣⁄٢)ت");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:07")).toBe("١⁄٢ − (√٣⁄٢)ت");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:08")).toBe("ت");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:09")).toBe("ت");
    expect(correctText("practice:CPLX-MUL-DIV-APPLY:10")).toBe("ت");
  });
});
