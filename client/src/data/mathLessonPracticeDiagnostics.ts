import {
  getPracticeDiagnosticRulesForSkill as getLegacyPracticeDiagnosticRulesForSkill,
  mathLessonPracticeDiagnosticSkillIds as legacyDiagnosticSkillIds,
} from "./mathLegacyLessonPracticeDiagnostics";
import {
  permutationsDiagnosticRules,
  permutationsDiagnosticSkillId,
} from "./mathPermutationsDiagnostics";
import {
  combinationsDiagnosticRules,
  combinationsDiagnosticSkillId,
} from "./mathCombinationsDiagnostics";

export function getPracticeDiagnosticRulesForSkill(skillId: string) {
  if (skillId === permutationsDiagnosticSkillId) return permutationsDiagnosticRules;
  if (skillId === combinationsDiagnosticSkillId) return combinationsDiagnosticRules;
  return getLegacyPracticeDiagnosticRulesForSkill(skillId);
}

export const mathLessonPracticeDiagnosticSkillIds = Object.freeze([
  ...legacyDiagnosticSkillIds,
  permutationsDiagnosticSkillId,
  combinationsDiagnosticSkillId,
]);
