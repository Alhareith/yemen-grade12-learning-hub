import {
  createCurriculumStructureIndex,
  type CurriculumLesson,
  type CurriculumSkill,
  type CurriculumSourceRef,
  type CurriculumStructure,
  type CurriculumUnit,
} from "@shared/curriculum/curriculum-model";
import algebraGeometryProbabilitySkillMapJson from "../../../research/curriculum/math-algebra-geometry-probability-skill-map.json";
import calculusSkillMapJson from "../../../research/exams/calculus-skill-map.json";
import { getPromptsForSubject, selfStudyPrompts } from "./promptCatalog";
import { materials } from "./richCatalog";
import { unitExpansions } from "./unitExpansions";

type RawSkill = { id: string; title: string; prerequisites: string[] };
type RawTopic = { id: string; title: string; skills: RawSkill[] };
type RawGroup = { id: string; title: string; topics: RawTopic[] };
type RawTaxonomy = {
  schemaVersion: string;
  taxonomyId: string;
  subject: string;
  track: string;
  strands?: RawGroup[];
  groups?: RawGroup[];
};

const calculusSkillMap = calculusSkillMapJson as RawTaxonomy;
const algebraGeometryProbabilitySkillMap = algebraGeometryProbabilitySkillMapJson as RawTaxonomy;

export const MATH_AGP_UNIT_ID = "math-algebra-geometry-probability";
export const MATH_CALCULUS_UNIT_ID = "math-calculus";

const UNIT_IDS: Record<string, string> = {
  "رياضيات|الجبر والهندسة والاحتمالات": MATH_AGP_UNIT_ID,
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

const DETAILED_UNIT_IDS = new Set([MATH_AGP_UNIT_ID, MATH_CALCULUS_UNIT_ID]);

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

function taxonomyGroups(taxonomy: RawTaxonomy) {
  return taxonomy.strands ?? taxonomy.groups ?? [];
}

function buildTaxonomyEntries(taxonomy: RawTaxonomy, unitId: string) {
  const groups = taxonomyGroups(taxonomy);
  const lessonIds = new Set<string>();
  const lessons: CurriculumLesson[] = [];
  const skills: CurriculumSkill[] = [];
  const taxonomySkillIds = new Set(
    groups.flatMap((group) => group.topics.flatMap((topic) => topic.skills.map((skill) => skill.id))),
  );

  for (const group of groups) {
    for (const topic of group.topics) {
      const lessonId = `${unitId}:${topic.id}`;
      lessonIds.add(lessonId);
      lessons.push({
        id: lessonId,
        unitId,
        title: topic.title,
        groupId: group.id,
        groupTitle: group.title,
        skillIds: topic.skills.map((skill) => skill.id),
        sourceIds: [],
        promptIds: [],
      });

      for (const skill of topic.skills) {
        skills.push({
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

  return { lessonIds, lessons, skills };
}

const agpTaxonomy = buildTaxonomyEntries(algebraGeometryProbabilitySkillMap, MATH_AGP_UNIT_ID);
const calculusTaxonomy = buildTaxonomyEntries(calculusSkillMap, MATH_CALCULUS_UNIT_ID);

const lessonIdsByUnit = new Map<string, Set<string>>([
  [MATH_AGP_UNIT_ID, agpTaxonomy.lessonIds],
  [MATH_CALCULUS_UNIT_ID, calculusTaxonomy.lessonIds],
]);

const units: CurriculumUnit[] = unitExpansions.map((unit) => {
  const id = unitIdFor(unit.subjectId, unit.title);
  const lessonIds = lessonIdsByUnit.get(id);
  return {
    id,
    subjectId: unit.subjectId,
    title: unit.title,
    mappingStatus: DETAILED_UNIT_IDS.has(id) ? "lesson-skill" : "unit-only",
    lessonIds: lessonIds ? Array.from(lessonIds) : [],
    sourceIds: unit.links.map((_, index) => unitLinkSourceId(id, index)),
    promptIds: [],
  };
});

export const curriculumStructure: CurriculumStructure = {
  schemaVersion: "1.1",
  subjects: materials.map((material) => ({
    id: material.id,
    title: material.title,
    unitIds: units.filter((unit) => unit.subjectId === material.id).map((unit) => unit.id),
    sourceIds: material.sources.map((source) => catalogSourceId(source.id)),
    promptIds: getPromptsForSubject(material.id).map((prompt) => prompt.id),
  })),
  units,
  lessons: [...agpTaxonomy.lessons, ...calculusTaxonomy.lessons],
  skills: [...agpTaxonomy.skills, ...calculusTaxonomy.skills],
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
  algebraGeometryProbabilityTaxonomyId: algebraGeometryProbabilitySkillMap.taxonomyId,
  algebraGeometryProbabilitySubject: algebraGeometryProbabilitySkillMap.subject,
  algebraGeometryProbabilityTrack: algebraGeometryProbabilitySkillMap.track,
  calculusTaxonomyId: calculusSkillMap.taxonomyId,
  calculusSubject: calculusSkillMap.subject,
  calculusTrack: calculusSkillMap.track,
} as const;