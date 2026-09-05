import { describe, expect, it } from "vitest";
import { validateCurriculumGraph } from "@shared/curriculum/curriculum-model";
import { curriculumGraph, curriculumIndex, curriculumSkillIds } from "./curriculum";
import {
  MATH_CALCULUS_UNIT_ID,
  curriculumStructure,
  curriculumTaxonomyMetadata,
} from "./curriculumStructure";
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
    expect(detailedUnits.map((unit) => unit.id)).toEqual([MATH_CALCULUS_UNIT_ID]);
    expect(curriculumStructure.units.filter((unit) => unit.mappingStatus === "unit-only")).toHaveLength(unitExpansions.length - 1);
  });

  it("promotes the existing calculus taxonomy to canonical lessons and skills", () => {
    expect(curriculumTaxonomyMetadata.calculusTaxonomyId).toBe("YEMEN-G12-MATH-CALCULUS-V1");
    expect(curriculumTaxonomyMetadata.calculusSubject).toBe("رياضيات");
    expect(curriculumTaxonomyMetadata.calculusTrack).toBe("التفاضل والتكامل");

    const lessons = curriculumIndex.getLessonsForUnit(MATH_CALCULUS_UNIT_ID);
    expect(lessons).toHaveLength(11);
    expect(curriculumStructure.skills).toHaveLength(39);
    expect(curriculumSkillIds.size).toBe(39);
    expect(lessons.some((lesson) => lesson.title === "النهايات")).toBe(true);
    expect(lessons.some((lesson) => lesson.title === "قواعد الاشتقاق")).toBe(true);
    expect(lessons.some((lesson) => lesson.title === "طرق التكامل")).toBe(true);
  });

  it("links every pilot question to known curriculum skills and one simulation", () => {
    expect(curriculumGraph.questions).toHaveLength(50);
    expect(curriculumGraph.simulations).toHaveLength(1);
    expect(curriculumGraph.simulations[0].questionIds).toHaveLength(50);
    expect(curriculumGraph.simulations[0].examId).toBe(pilotCalculusExam.id);

    for (const question of curriculumGraph.questions) {
      expect(curriculumSkillIds.has(question.primarySkillId)).toBe(true);
      expect(question.secondarySkillIds.every((skillId) => curriculumSkillIds.has(skillId))).toBe(true);
      expect(curriculumIndex.questions.has(question.id)).toBe(true);
    }
  });

  it("resolves a skill to subject, unit, lesson, sources, prompts, questions and simulation", () => {
    const context = curriculumIndex.getSkillContext("DER-CHAIN");
    expect(context).not.toBeNull();
    expect(context?.subject.id).toBe("رياضيات");
    expect(context?.unit.id).toBe(MATH_CALCULUS_UNIT_ID);
    expect(context?.lesson.title).toBe("الدوال المركبة وقاعدة التسلسل");
    expect(context?.skill.title).toBe("تطبيق قاعدة التسلسل");
    expect(context?.sources.length).toBeGreaterThan(0);
    expect(context?.prompts.length).toBeGreaterThan(0);
    expect(context?.questions.length).toBeGreaterThan(0);
    expect(context?.simulations.map((simulation) => simulation.examId)).toContain(pilotCalculusExam.id);
  });

  it("keeps unassessed taxonomy skills linked to learning resources without pretending the simulation measures them", () => {
    const context = curriculumIndex.getSkillContext("LIM-DIRECT");
    expect(context).not.toBeNull();
    expect(context?.lesson.title).toBe("النهايات");
    expect(context?.sources.length).toBeGreaterThan(0);
    expect(context?.prompts.length).toBeGreaterThan(0);
    expect(context?.questions).toEqual([]);
    expect(context?.simulations).toEqual([]);
  });

  it("inherits real unit sources and subject prompts down to each calculus skill", () => {
    const context = curriculumIndex.getSkillContext("LIM-TRIG");
    expect(context?.sources.some((source) => source.title === "شرح النهايات المثلثية")).toBe(true);
    expect(context?.prompts.some((prompt) => prompt.id === "math-read-problem")).toBe(true);
  });
});
