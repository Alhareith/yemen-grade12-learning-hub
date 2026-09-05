import {
  createCurriculumStructureIndex,
  type CurriculumLesson,
  type CurriculumSkill,
  type CurriculumSourceRef,
  type CurriculumStructure,
  type CurriculumUnit,
} from "@shared/curriculum/curriculum-model";
import calculusSkillMapJson from "../../../research/exams/calculus-skill-map.json";
import { getPromptsForSubject, selfStudyPrompts } from "./promptCatalog";
import { materials } from "./richCatalog";
import { unitExpansions } from "./unitExpansions";

type RawSkill = { id: string; title: string; prerequisites: string[] };
type RawTopic = { id: string; title: string; skills: RawSkill[] };
type RawStrand = { id: string; title: string; topics: RawTopic[] };
type RawCalculusSkillMap = {
  schemaVersion: string;
  taxonomyId: string;
  subject: string;
  track: string;
  strands: RawStrand[];
};

const calculusSkillMap = calculusSkillMapJson as RawCalculusSkillMap;

export const MATH_CALCULUS_UNIT_ID = "math-calculus";

const UNIT_IDS: Record<string, string> = {
  "رياضيات|الجبر والهندسة والاحتمالات": "math-algebra-geometry-probability",
  "رياضيات|التفاضل والتكامل": MATH_CALCULUS_UNIT_ID,
  "لغة إنجليزية|قواعد المنهج والمراجعات اللغوية": "english-grammar-review",
  "لغة إنجليزية|الكتاب والتدريب قبل الاختبار": "english-workbook-exam-practice",
  "فيزياء|الكهرباء والتيار المتردد والموصلات": "physics-electricity-ac-conductors",
  "فيزياء|النماذج الوزارية وحل المسائل": "physics-ministry-models-problem-solving",
  "كيمياء|التفاعلات والأكسدة والاختزال": "chemistry-reactions-redox",
  "كيمياء|المراجعة النهائية والنماذج الوزارية": "chemistry-final-review-ministry-models",
  "أحياء|التنظيم العصبي والهرموني": "biology-neural-hormonal-regulation",
  "أحياء|التكاثر والوراثة": "biology-reproduction-genetics",
};

function unitIdFor(subjectId: string, title: string) {
  const id = UNIT_IDS[`${subjectId}|${title}`];
  if (!id) throw new Error(`Missing stable curriculum unit id for ${subjectId} / ${title}`);
  return id;
}

function catalogSourceId(resourceId: string) {
  return `catalog:${resourceId}`;
}

function unitLinkSourceId(unitId: string, index: number) {
  return `unit-link:${unitId}:${index + 1}`;
}

const catalogSources: CurriculumSourceRef[] = materials.flatMap((material) =>
  material.sources.map((source) => ({
    id: catalogSourceId(source.id),
    title: source.title,
    url: source.url,
    kind: "catalog" as const,
    subjectId: material.id,
  })),
);

const unitLinkSources: CurriculumSourceRef[] = unitExpansions.flatMap((unit) => {
  const unitId = unitIdFor(unit.subjectId, unit.title);
  return unit.links.map((link, index) => ({
    id: unitLinkSourceId(unitId, index),
    title: link.title,
    url: link.url,
    kind: "unit-link" as const,
    subjectId: unit.subjectId,
    unitId,
  }));
});

const promptRefs = selfStudyPrompts.map((prompt) => ({ id: prompt.id, title: prompt.title }));

const calculusLessonIds = new Set<string>();
const calculusLessons: CurriculumLesson[] = [];
const calculusSkills: CurriculumSkill[] = [];
const taxonomySkillIds = new Set(
  calculusSkillMap.strands.flatMap((strand) => strand.topics.flatMap((topic) => topic.skills.map((skill) => skill.id))),
);

for (const strand of calculusSkillMap.strands) {
  for (const topic of strand.topics) {
    const lessonId = `${MATH_CALCULUS_UNIT_ID}:${topic.id}`;
    calculusLessonIds.add(lessonId);
    calculusLessons.push({
      id: lessonId,
      unitId: MATH_CALCULUS_UNIT_ID,
      title: topic.title,
      groupId: strand.id,
      groupTitle: strand.title,
      skillIds: topic.skills.map((skill) => skill.id),
      sourceIds: [],
      promptIds: [],
    });

    for (const skill of topic.skills) {
      calculusSkills.push({
        id: skill.id,
        lessonId,
        title: skill.title,
        prerequisites: skill.prerequisites.map((prerequisite) =>
          taxonomySkillIds.has(prerequisite)
            ? { type: "skill" as const, skillId: prerequisite }
            : { type: "knowledge" as const, title: prerequisite },
        ),
        sourceIds: [],
        promptIds: [],
      });
    }
  }
}

const units: CurriculumUnit[] = unitExpansions.map((unit) => {
  const id = unitIdFor(unit.subjectId, unit.title);
  return {
    id,
    subjectId: unit.subjectId,
    title: unit.title,
    mappingStatus: id === MATH_CALCULUS_UNIT_ID ? "lesson-skill" : "unit-only",
    lessonIds: id === MATH_CALCULUS_UNIT_ID ? Array.from(calculusLessonIds) : [],
    sourceIds: unit.links.map((_, index) => unitLinkSourceId(id, index)),
    promptIds: [],
  };
});

export const curriculumStructure: CurriculumStructure = {
  schemaVersion: "1.0",
  subjects: materials.map((material) => ({
    id: material.id,
    title: material.title,
    unitIds: units.filter((unit) => unit.subjectId === material.id).map((unit) => unit.id),
    sourceIds: material.sources.map((source) => catalogSourceId(source.id)),
    promptIds: getPromptsForSubject(material.id).map((prompt) => prompt.id),
  })),
  units,
  lessons: calculusLessons,
  skills: calculusSkills,
  sources: [...catalogSources, ...unitLinkSources],
  prompts: promptRefs,
};

export const curriculumStructureIndex = createCurriculumStructureIndex(curriculumStructure);

export function getCurriculumUnitsForSubject(subjectId: string) {
  return curriculumStructureIndex.getUnitsForSubject(subjectId);
}

export function getCurriculumUnitTitlesForSubject(subjectId: string) {
  return getCurriculumUnitsForSubject(subjectId).map((unit) => unit.title);
}

export function getCurriculumLessonsForUnit(unitId: string) {
  return curriculumStructureIndex.getLessonsForUnit(unitId);
}

export function getCurriculumSkillsForLesson(lessonId: string) {
  return curriculumStructureIndex.getSkillsForLesson(lessonId);
}

export const curriculumTaxonomyMetadata = {
  calculusTaxonomyId: calculusSkillMap.taxonomyId,
  calculusSubject: calculusSkillMap.subject,
  calculusTrack: calculusSkillMap.track,
} as const;
