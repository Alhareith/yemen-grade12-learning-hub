import { describe, expect, it } from "vitest";
import type { RichContent } from "@shared/exams/question-model";
import { validateExamDefinition } from "@shared/exams/exam-model";
import { arabicMathPlainText } from "@/exams/arabic-math";
import { curriculumSkillIds } from "@/data/curriculum";
import { agpGeneralExam } from "./agpExam";
import { agpExamProvenance } from "./agpExamProvenance";

const LATIN = /[A-Za-z]/;

function visibleText(content: RichContent): string[] {
  return content.map((segment) =>
    segment.type === "text" ? segment.text : arabicMathPlainText(segment.latex),
  );
}

describe("AGP general model 2 Arabic and provenance contract", () => {
  it("remains a valid 50-question student-ready exam", () => {
    expect(validateExamDefinition(agpGeneralExam, curriculumSkillIds)).toEqual([]);
    expect(agpGeneralExam.questions).toHaveLength(50);
    expect(agpGeneralExam.questions.filter((question) => question.type === "true-false")).toHaveLength(20);
    expect(agpGeneralExam.questions.filter((question) => question.type === "single-choice")).toHaveLength(30);
    expect(agpGeneralExam.questions.reduce((sum, question) => sum + question.answer.points, 0)).toBe(80);
  });

  it("uses one question model and the published solution for that same model", () => {
    expect(agpGeneralExam.year).toBe(2024);
    expect(agpGeneralExam.source.primaryUrl).toBe(agpExamProvenance.questionReference.url);
    expect(agpGeneralExam.source.mirrorUrl).toBe(agpExamProvenance.publishedSolution.url);

    for (const question of agpGeneralExam.questions) {
      expect(question.source.sourcePackageUrl).toBe(agpExamProvenance.questionReference.url);
      expect(question.source.relation).toBe("adapted");
      expect(question.sourceQuestionNumber).toBe(String(question.order));
      expect(question.answer.answerEvidence.type).toBe("published-solution");
      expect(question.answer.answerEvidence.sourceUrl).toBe(agpExamProvenance.publishedSolution.url);
      expect(question.answer.answerEvidence.locator).toContain(`السؤال ${question.order}`);
    }
  });

  it("contains no Latin letters in any student-visible question content", () => {
    const violations: string[] = [];

    for (const question of agpGeneralExam.questions) {
      const fields = [
        ...visibleText(question.stem),
        ...question.options.flatMap((option) => visibleText(option.content)),
        ...(question.explanation ? visibleText(question.explanation.content) : []),
      ];

      fields.forEach((value, index) => {
        if (LATIN.test(value)) violations.push(`س${question.order}#${index + 1}: ${value}`);
      });
    }

    expect(violations).toEqual([]);
  });

  it("keeps every question tied to a known curriculum skill", () => {
    for (const question of agpGeneralExam.questions) {
      expect(curriculumSkillIds.has(question.analysis.primarySkillId)).toBe(true);
      expect(question.analysis.secondarySkillIds.every((skillId) => curriculumSkillIds.has(skillId))).toBe(true);
    }
  });
});
