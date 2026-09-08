import { describe, expect, it } from "vitest";
import { curriculumSkillIds } from "@/data/curriculum";
import {
  practiceBank,
  practiceIndex,
  reservedExamQuestionIds,
} from "@/data/practiceBank";
import { complexAddSubPracticeSkillId } from "@/data/mathComplexAddSubPractice";
import { complexMulDivPracticeSkillId } from "@/data/mathComplexMulDivPractice";
import { complexPolarPracticeSkillId } from "@/data/mathComplexPolarPractice";
import { complexPowersRootsPracticeSkillId } from "@/data/mathComplexPowersRootsPractice";
import { pilotPracticeSkillIds } from "@/data/mathPracticePilot";
import { validatePracticeBank } from "@shared/practice/practice-model";

describe("live practice registry", () => {
  it("publishes the six-skill pilot plus independently completed complex-number lessons", () => {
    expect(practiceBank.questions).toHaveLength(100);
    expect(practiceBank.sets).toHaveLength(10);
    expect(new Set(pilotPracticeSkillIds).size).toBe(6);
    expect(pilotPracticeSkillIds).not.toContain(complexAddSubPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(complexMulDivPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(complexPolarPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(complexPowersRootsPracticeSkillId);

    for (const skillId of [
      ...pilotPracticeSkillIds,
      complexAddSubPracticeSkillId,
      complexMulDivPracticeSkillId,
      complexPolarPracticeSkillId,
      complexPowersRootsPracticeSkillId,
    ]) {
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
