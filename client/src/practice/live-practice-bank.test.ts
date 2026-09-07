import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  practiceBank,
  practiceIndex,
  reservedExamQuestionIds,
} from "@/data/practiceBank";
import { pilotPracticeSkillIds } from "@/data/mathPracticePilot";
import { validatePracticeBank } from "@shared/practice/practice-model";

describe("live practice registry", () => {
  it("publishes exactly the reviewed six-skill pilot", () => {
    expect(practiceBank.questions).toHaveLength(60);
    expect(practiceBank.sets).toHaveLength(6);
    expect(new Set(pilotPracticeSkillIds).size).toBe(6);

    for (const skillId of pilotPracticeSkillIds) {
      const sets = practiceIndex.getSetsForSkill(skillId);
      expect(sets).toHaveLength(1);
      expect(sets[0]?.status).toBe("ready");
      expect(sets[0]?.roundSize).toBe(5);
      expect(sets[0]?.questionIds).toHaveLength(10);
    }
  });

  it("remains wired to curriculum skills and protected from simulation id collisions", () => {
    expect(curriculumSkillIds.size).toBeGreaterThan(0);
    expect(reservedExamQuestionIds.size).toBeGreaterThan(0);
    expect(validatePracticeBank(practiceBank, curriculumSkillIds, reservedExamQuestionIds)).toEqual([]);
  });
});
