import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  practiceBank,
  practiceIndex,
  reservedExamQuestionIds,
} from "@/data/practiceBank";
import { validatePracticeBank } from "@shared/practice/practice-model";

describe("live practice registry", () => {
  it("starts empty until reviewed training content is added", () => {
    expect(practiceBank.questions).toEqual([]);
    expect(practiceBank.sets).toEqual([]);
    expect(practiceIndex.getSetsForSkill("DER-CHAIN")).toEqual([]);
  });

  it("is already wired to curriculum skills and reserved simulation ids", () => {
    expect(curriculumSkillIds.size).toBeGreaterThan(0);
    expect(reservedExamQuestionIds.size).toBeGreaterThan(0);
    expect(validatePracticeBank(practiceBank, curriculumSkillIds, reservedExamQuestionIds)).toEqual([]);
  });
});
