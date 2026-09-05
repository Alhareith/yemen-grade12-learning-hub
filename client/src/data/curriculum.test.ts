import { describe, expect, it } from "vitest";
import { validateCurriculumGraph } from "@shared/curriculum/curriculum-model";
import { curriculumGraph, curriculumIndex, curriculumSkillIds } from "./curriculum";
import {
  MATH_AGP_UNIT_ID,
  MATH_CALCULUS_UNIT_ID,
  curriculumStructure,
  curriculumTaxonomyMetadata,
} from "./curriculumStructure";
import { agpGeneralExam } from "./exams/agpExam";
import { pilotCalculusExam } from "./exams/pilotExam";
import { materials } from "./richCatalog";
import { unitExpansions } from "./unitExpansions";

describe("unified Yemen Grade 12 curriculum graph", () => {
  it("has no orphan or duplicate references", () => {
    expect(validateCurriculumGraph(curriculumGraph)).toEqual([]);
  });

  it("covers every live subject and curated unit without inventing missing lessons", () => {
    expect(curriculumStructure.subjects).toHaveLength(materials.length);
    expect(curriculumStructure.units).toHaveLength(unitExpansions.length);

    for (const material of materials) {
      const subject = curriculumIndex.subjects.get(material.id);
      expect(subject?.title).toBe(material.title);
    }

    const detailedUnits = curriculumStructure.units.filter((unit) => unit.mappingStatus === "lesson-skill");
    expect(detailedUnits.map((unit) => unit.id)).toEqual([MATH_AGP_UNIT_ID, MATH_CALCULUS_UNIT_ID]);
    expect(curriculumStructure.units.filter((unit) => unit.mappingStatus === "unit-only")).toHaveLength(unitExpansions.length - 2);
  });

  it("maps the verified algebra, geometry and probability table of contents", () => {
    expect(curriculumTaxonomyMetadata.algebraGeometryProbabilityTaxonomyId).toBe("YEMEN-G12-MATH-AGP-V1");
    expect(curriculumTaxonomyMetadata.algebraGeometryProbabilitySubject).toBe("رياضيات");
    expect(curriculumTaxonomyMetadata.algebraGeometryProbabilityTrack).toBe("الجبر والهندسة والاحتمالات");

    const lessons = curriculumIndex.getLessonsForUnit(MATH_AGP_UNIT_ID);
    expect(lessons).toHaveLength(26);
    expect(new Set(lessons.map((lesson) => lesson.groupTitle))).toEqual(new Set([
      "الأعداد المركبة",
      "مبدأ العد ومبرهنة ذات الحدين",
      "القطوع المخروطية",
      "الهندسة الفضائية",
      "الاحتمالات",
    ]));
  });

  it("keeps the existing calculus taxonomy canonical alongside the second math track", () => {
    expect(curriculumTaxonomyMetadata.calculusTaxonomyId).toBe("YEMEN-G12-MATH-CALCULUS-V1");
    const calculusLessons = curriculumIndex.getLessonsForUnit(MATH_CALCULUS_UNIT_ID);
    expect(calculusLessons).toHaveLength(11);
    expect(curriculumStructure.lessons).toHaveLength(37);
    expect(curriculumStructure.skills).toHaveLength(65);
    expect(curriculumSkillIds.size).toBe(65);
  });

  it("registers two complete 50-question math simulations", () => {
    expect(curriculumGraph.questions).toHaveLength(100);
    expect(curriculumGraph.simulations).toHaveLength(2);

    const calculusSimulation = curriculumGraph.simulations.find((simulation) => simulation.examId === pilotCalculusExam.id);
    const agpSimulation = curriculumGraph.simulations.find((simulation) => simulation.examId === agpGeneralExam.id);
    expect(calculusSimulation?.questionIds).toHaveLength(50);
    expect(agpSimulation?.questionIds).toHaveLength(50);

    for (const question of curriculumGraph.questions) {
      expect(curriculumSkillIds.has(question.primarySkillId)).toBe(true);
      expect(question.secondarySkillIds.every((skillId) => curriculumSkillIds.has(skillId))).toBe(true);
      expect(curriculumIndex.questions.has(question.id)).toBe(true);
    }
  });

  it("resolves an assessed calculus skill to model 1", () => {
    const context = curriculumIndex.getSkillContext("DER-CHAIN");
    expect(context).not.toBeNull();
    expect(context?.unit.id).toBe(MATH_CALCULUS_UNIT_ID);
    expect(context?.questions.length).toBeGreaterThan(0);
    expect(context?.simulations.map((simulation) => simulation.examId)).toContain(pilotCalculusExam.id);
  });

  it("resolves a complex-number skill to model 2", () => {
    const context = curriculumIndex.getSkillContext("CPLX-NUMBER-USE");
    expect(context).not.toBeNull();
    expect(context?.unit.id).toBe(MATH_AGP_UNIT_ID);
    expect(context?.lesson.groupTitle).toBe("الأعداد المركبة");
    expect(context?.sources.length).toBeGreaterThan(0);
    expect(context?.prompts.some((prompt) => prompt.id === "math-read-problem")).toBe(true);
    expect(context?.questions.length).toBeGreaterThan(0);
    expect(context?.simulations.map((simulation) => simulation.examId)).toContain(agpGeneralExam.id);
  });

  it("connects probability skills to the second model", () => {
    const conditional = curriculumIndex.getSkillContext("PROB-CONDITIONAL-APPLY");
    const drawing = curriculumIndex.getSkillContext("PROB-DRAWING-APPLY");
    const binomial = curriculumIndex.getSkillContext("PROB-BINOMIAL-APPLY");
    expect(conditional?.questions.length).toBeGreaterThan(0);
    expect(drawing?.questions.length).toBeGreaterThan(0);
    expect(binomial?.questions.length).toBeGreaterThan(0);
    expect(binomial?.simulations.map((simulation) => simulation.examId)).toContain(agpGeneralExam.id);
  });

  it("keeps genuinely unassessed calculus taxonomy skills unclaimed", () => {
    const context = curriculumIndex.getSkillContext("LIM-DIRECT");
    expect(context).not.toBeNull();
    expect(context?.sources.length).toBeGreaterThan(0);
    expect(context?.prompts.length).toBeGreaterThan(0);
    expect(context?.questions).toEqual([]);
    expect(context?.simulations).toEqual([]);
  });
});
