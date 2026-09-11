import { getPracticeDiagnosticRulesForSkill as getLessonDiagnosticRules } from "./mathLessonPracticeDiagnostics";
import {
  permutationsDiagnosticRules,
  permutationsDiagnosticSkillId,
} from "./mathPermutationsDiagnostics";

export function getPracticeDiagnosticRulesForSkill(skillId: string) {
  if (skillId === permutationsDiagnosticSkillId) return permutationsDiagnosticRules;
  return getLessonDiagnosticRules(skillId);
}
