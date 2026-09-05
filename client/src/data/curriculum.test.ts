import { describe, expect, it } from "vitest";
import { validateCurriculumGraph } from "@shared/curriculum/curriculum-model";
import { curriculumGraph, curriculumIndex, curriculumSkillIds } from "./curriculum";
import {
  MATH_AGP_UNIT_ID,
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
    expect(lessons.some((lesson) => lesson.title === "العدد المركب")).toBe(true);
    expect(lessons.some((lesson) => lesson.title === "الاستقراء الرياضي")).toBe(true);
    expect(lessons.some((lesson) => lesson.title === "المساقط")).toBe(true);
    expect(lessons.some((lesson) => lesson.title === "السحب مع الإعادة وبدون إعادة")).toBe(true);
  });

  it("keeps the existing calculus taxonomy canonical alongside the new math track", () => {
    expect(curriculumTaxonomyMetadata.calculusTaxonomyId).toBe("YEMEN-G12-MATH-CALCULUS-V1");
    expect(curriculumTaxonomyMetadata.calculusSubject).toBe("رياضيات");
    expect(curriculumTaxonomyMetadata.calculusTrack).toBe("التفاضل والتكامل");

    const calculusLessons = curriculumIndex.getLessonsForUnit(MATH_CALCULUS_UNIT_ID);
    expect(calculusLessons).toHaveLength(11);
    expect(curriculumStructure.lessons).toHaveLength(37);
    expect(curriculumStructure.skills).toHaveLength(65);
    expect(curriculumSkillIds.size).toBe(65);
    expect(calculusLessons.some((lesson) => lesson.title === "النهايات")).toBe(true);
    expect(calculusLessons.some((lesson) => lesson.title === "قواعد الاشتقاق")).toBe(true);
    expect(calculusLessons.some((lesson) => lesson.title === "طرق التكامل")).toBe(true);
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

  it("resolves an assessed calculus skill to its complete learning context", () => {
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

  it("links a complex-number skill to current learning resources and prompts without pretending it is assessed", () => {
    const context = curriculumIndex.getSkillContext("CPLX-NUMBER-USE");
    expect(context).not.toBeNull();
    expect(context?.subject.id).toBe("رياضيات");
    expect(context?.unit.id).toBe(MATH_AGP_UNIT_ID);
    expect(context?.lesson.groupTitle).toBe("الأعداد المركبة");
    expect(context?.lesson.title).toBe("العدد المركب");
    expect(context?.sources.some((source) => source.title === "الأعداد المركبة — رياضيات أتمتة")).toBe(true);
    expect(context?.prompts.some((prompt) => prompt.id === "math-read-problem")).toBe(true);
    expect(context?.questions).toEqual([]);
    expect(context?.simulations).toEqual([]);
  });

  it("keeps unassessed calculus taxonomy skills linked to learning resources without pretending the simulation measures them", () => {
    const context = curriculumIndex.getSkillContext("LIM-DIRECT");
    expect(context).not.toBeNull();
    expect(context?.lesson.title).toBe("النهايات");
    expect(context?.sources.length).toBeGreaterThan(0);
    expect(context?.prompts.length).toBeGreaterThan(0);
    expect(context?.questions).toEqual([]);
    expect(context?.simulations).toEqual([]);
  });

  it("inherits real unit sources and subject prompts down to mapped math skills", () => {
    const calculusContext = curriculumIndex.getSkillContext("LIM-TRIG");
    expect(calculusContext?.sources.some((source) => source.title === "شرح النهايات المثلثية")).toBe(true);
    expect(calculusContext?.prompts.some((prompt) => prompt.id === "math-read-problem")).toBe(true);

    const probabilityContext = curriculumIndex.getSkillContext("PROB-CONDITIONAL-APPLY");
    expect(probabilityContext?.lesson.groupTitle).toBe("الاحتمالات");
    expect(probabilityContext?.sources.length).toBeGreaterThan(0);
    expect(probabilityContext?.prompts.some((prompt) => prompt.id === "math-read-problem")).toBe(true);
    expect(probabilityContext?.questions).toEqual([]);
    expect(probabilityContext?.simulations).toEqual([]);
  });
});
