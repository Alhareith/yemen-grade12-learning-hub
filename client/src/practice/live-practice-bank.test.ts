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
import { complexQuadraticPracticeSkillId } from "@/data/mathComplexQuadraticPractice";
import { countingPrinciplePracticeSkillId } from "@/data/mathCountingPrinciplePractice";
import { permutationsPracticeSkillId } from "@/data/mathPermutationsPractice";
import { combinationsPracticeSkillId, combinationsPracticeSet } from "@/data/mathCombinationsPractice";
import { pilotPracticeSkillIds } from "@/data/mathPracticePilot";
import { validatePracticeBank } from "@shared/practice/practice-model";

describe("live practice registry", () => {
  it("publishes one ready set per live skill and graduates combinations from the pilot copy", () => {
    expect(practiceBank.questions).toHaveLength(130);
    expect(practiceBank.sets).toHaveLength(13);
    expect(new Set(pilotPracticeSkillIds).size).toBe(6);
    expect(pilotPracticeSkillIds).not.toContain(complexAddSubPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(complexMulDivPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(complexPolarPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(complexPowersRootsPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(complexQuadraticPracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(countingPrinciplePracticeSkillId);
    expect(pilotPracticeSkillIds).not.toContain(permutationsPracticeSkillId);
    expect(pilotPracticeSkillIds).toContain(combinationsPracticeSkillId);

    const liveSkillIds = new Set(practiceBank.sets.map((set) => set.skillId));
    expect(liveSkillIds.size).toBe(practiceBank.sets.length);
    expect(practiceIndex.getSetsForSkill(combinationsPracticeSkillId)).toEqual([combinationsPracticeSet]);
    expect(combinationsPracticeSet.id).toBe("practice-set:COUNT-COMBINATIONS-APPLY:reviewed-v1");

    for (const set of practiceBank.sets) {
      expect(set.status).toBe("ready");
      expect(set.roundSize).toBe(5);
      expect(set.questionIds).toHaveLength(10);
    }
  });

  it("remains wired to curriculum skills and protected from simulation id collisions", () => {
    expect(curriculumSkillIds.size).toBeGreaterThan(0);
    expect(reservedExamQuestionIds.size).toBeGreaterThan(0);
    expect(validatePracticeBank(practiceBank, curriculumSkillIds, reservedExamQuestionIds)).toEqual([]);
  });
});
