import { createCurriculumIndex, type CurriculumGraph } from "@shared/curriculum/curriculum-model";
import { agpGeneralExam } from "./exams/agpExam";
import { pilotCalculusExam } from "./exams/pilotExam";
import {
  MATH_AGP_UNIT_ID,
  MATH_CALCULUS_UNIT_ID,
  curriculumStructure,
} from "./curriculumStructure";

const examEntries = [
  { exam: pilotCalculusExam, unitId: MATH_CALCULUS_UNIT_ID },
  { exam: agpGeneralExam, unitId: MATH_AGP_UNIT_ID },
] as const;

export const curriculumGraph: CurriculumGraph = {
  ...curriculumStructure,
  sources: [
    ...curriculumStructure.sources,
    ...examEntries.map(({ exam, unitId }) => ({
      id: `simulation-source:${exam.id}`,
      title: exam.source.title,
      url: exam.source.primaryUrl,
      kind: "simulation-source" as const,
      subjectId: exam.subject,
      unitId,
    })),
  ],
  questions: examEntries.flatMap(({ exam }) => exam.questions.map((question) => ({
    id: question.id,
    examId: question.examId,
    primarySkillId: question.analysis.primarySkillId,
    secondarySkillIds: [...question.analysis.secondarySkillIds],
  }))),
  simulations: examEntries.map(({ exam, unitId }) => ({
    id: `simulation:${exam.id}`,
    examId: exam.id,
    title: exam.title,
    subjectId: exam.subject,
    unitId,
    questionIds: exam.questions.map((question) => question.id),
    sourceId: `simulation-source:${exam.id}`,
  })),
};

export const curriculumIndex = createCurriculumIndex(curriculumGraph);
export const curriculumSkillIds: ReadonlySet<string> = new Set(curriculumGraph.skills.map((skill) => skill.id));

export function getCurriculumSkillContext(skillId: string) {
  return curriculumIndex.getSkillContext(skillId);
}

export function getCurriculumQuestionsForSkill(skillId: string) {
  return curriculumIndex.getQuestionsForSkill(skillId);
}

export function getCurriculumSimulationsForSkill(skillId: string) {
  return curriculumIndex.getSimulationsForSkill(skillId);
}
