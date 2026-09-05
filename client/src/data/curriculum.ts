import { createCurriculumIndex, type CurriculumGraph } from "@shared/curriculum/curriculum-model";
import { pilotCalculusExam } from "./exams/pilotExam";
import {
  MATH_CALCULUS_UNIT_ID,
  curriculumStructure,
} from "./curriculumStructure";

const pilotSimulationId = `simulation:${pilotCalculusExam.id}`;
const pilotSourceId = `simulation-source:${pilotCalculusExam.id}`;

export const curriculumGraph: CurriculumGraph = {
  ...curriculumStructure,
  sources: [
    ...curriculumStructure.sources,
    {
      id: pilotSourceId,
      title: pilotCalculusExam.source.title,
      url: pilotCalculusExam.source.primaryUrl,
      kind: "simulation-source",
      subjectId: pilotCalculusExam.subject,
      unitId: MATH_CALCULUS_UNIT_ID,
    },
  ],
  questions: pilotCalculusExam.questions.map((question) => ({
    id: question.id,
    examId: question.examId,
    primarySkillId: question.analysis.primarySkillId,
    secondarySkillIds: [...question.analysis.secondarySkillIds],
  })),
  simulations: [
    {
      id: pilotSimulationId,
      examId: pilotCalculusExam.id,
      title: pilotCalculusExam.title,
      subjectId: pilotCalculusExam.subject,
      unitId: MATH_CALCULUS_UNIT_ID,
      questionIds: pilotCalculusExam.questions.map((question) => question.id),
      sourceId: pilotSourceId,
    },
  ],
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
