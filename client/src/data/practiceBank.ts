import { curriculumSkillIds } from "./curriculum";
import { agpGeneralExam } from "./exams/agpExam";
import { pilotCalculusExam } from "./exams/pilotExam";
import {
  createPracticeBankIndex,
  validatePracticeBank,
  type PracticeBank,
} from "@shared/practice/practice-model";

/**
 * The live training registry starts empty on purpose.
 * Practice questions are added only after the domain contract and review workflow are stable.
 */
export const practiceBank: PracticeBank = {
  schemaVersion: "1.0",
  questions: [],
  sets: [],
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
