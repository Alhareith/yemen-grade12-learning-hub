import {
  getPracticeDiagnosticRulesForSkill as getLegacyPracticeDiagnosticRulesForSkill,
  mathLessonPracticeDiagnosticSkillIds as legacyDiagnosticSkillIds,
} from "./mathLegacyLessonPracticeDiagnostics";
import {
  permutationsDiagnosticRules,
  permutationsDiagnosticSkillId,
} from "./mathPermutationsDiagnostics";

export function getPracticeDiagnosticRulesForSkill(skillId: string) {
  if (skillId === permutationsDiagnosticSkillId) return permutationsDiagnosticRules;
  return getLegacyPracticeDiagnosticRulesForSkill(skillId);
}

export const mathLessonPracticeDiagnosticSkillIds = Object.freeze([
  ...legacyDiagnosticSkillIds,
  permutationsDiagnosticSkillId,
]);
