import { curriculumSkillIds } from "./curriculum";
import { agpGeneralExam } from "./exams/agpExam";
import { pilotCalculusExam } from "./exams/pilotExam";
import {
  complexAddSubPracticeQuestions,
  complexAddSubPracticeSet,
} from "./mathComplexAddSubPractice";
import {
  complexMulDivPracticeQuestions,
  complexMulDivPracticeSet,
} from "./mathComplexMulDivPractice";
import {
  complexPolarPracticeQuestions,
  complexPolarPracticeSet,
} from "./mathComplexPolarPractice";
import {
  complexPowersRootsPracticeQuestions,
  complexPowersRootsPracticeSet,
} from "./mathComplexPowersRootsPractice";
import {
  complexQuadraticPracticeQuestions,
  complexQuadraticPracticeSet,
} from "./mathComplexQuadraticPractice";
import {
  countingPrinciplePracticeQuestions,
  countingPrinciplePracticeSet,
} from "./mathCountingPrinciplePractice";
import {
  permutationsPracticeQuestions,
  permutationsPracticeSet,
} from "./mathPermutationsPractice";
import {
  mathPracticePilotQuestions,
  mathPracticePilotSets,
} from "./mathPracticePilot";
import {
  createPracticeBankIndex,
  validatePracticeBank,
  type PracticeBank,
} from "@shared/practice/practice-model";

export const practiceBank: PracticeBank = {
  schemaVersion: "1.0",
  questions: [
    ...mathPracticePilotQuestions,
    ...complexAddSubPracticeQuestions,
    ...complexMulDivPracticeQuestions,
    ...complexPolarPracticeQuestions,
    ...complexPowersRootsPracticeQuestions,
    ...complexQuadraticPracticeQuestions,
    ...countingPrinciplePracticeQuestions,
    ...permutationsPracticeQuestions,
  ],
  sets: [
    ...mathPracticePilotSets,
    complexAddSubPracticeSet,
    complexMulDivPracticeSet,
    complexPolarPracticeSet,
    complexPowersRootsPracticeSet,
    complexQuadraticPracticeSet,
    countingPrinciplePracticeSet,
    permutationsPracticeSet,
  ],
};

export const reservedExamQuestionIds: ReadonlySet<string> = new Set([
  ...pilotCalculusExam.questions.map((question) => question.id),
  ...agpGeneralExam.questions.map((question) => question.id),
]);

const practiceBankErrors = validatePracticeBank(
  practiceBank,
  curriculumSkillIds,
  reservedExamQuestionIds,
);

if (practiceBankErrors.length > 0) {
  throw new Error(`Invalid live practice bank:\n${practiceBankErrors.join("\n")}`);
}

export const practiceIndex = createPracticeBankIndex(practiceBank);

export function getReadyPracticeSetForSkill(skillId: string) {
  return practiceIndex.getSetsForSkill(skillId).find((set) => set.status === "ready") ?? null;
}
