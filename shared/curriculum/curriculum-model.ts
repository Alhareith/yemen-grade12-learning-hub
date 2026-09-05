export type CurriculumMappingStatus = "unit-only" | "lesson-skill";
export type CurriculumSourceKind = "catalog" | "unit-link" | "simulation-source";

export type CurriculumPrerequisite =
  | { type: "skill"; skillId: string }
  | { type: "knowledge"; title: string };

export type CurriculumPromptRef = {
  id: string;
  title: string;
};

export type CurriculumSourceRef = {
  id: string;
  title: string;
  url: string;
  kind: CurriculumSourceKind;
  subjectId: string;
  unitId?: string;
};

export type CurriculumSubject = {
  id: string;
  title: string;
  unitIds: string[];
  sourceIds: string[];
  promptIds: string[];
};

export type CurriculumUnit = {
  id: string;
  subjectId: string;
  title: string;
  mappingStatus: CurriculumMappingStatus;
  lessonIds: string[];
  sourceIds: string[];
  promptIds: string[];
};

export type CurriculumLesson = {
  id: string;
  unitId: string;
  title: string;
  groupId?: string;
  groupTitle?: string;
  skillIds: string[];
  sourceIds: string[];
  promptIds: string[];
};

export type CurriculumSkill = {
  id: string;
  lessonId: string;
  title: string;
  prerequisites: CurriculumPrerequisite[];
  sourceIds: string[];
  promptIds: string[];
};

export type CurriculumStructure = {
  schemaVersion: "1.0";
  subjects: CurriculumSubject[];
  units: CurriculumUnit[];
  lessons: CurriculumLesson[];
  skills: CurriculumSkill[];
  sources: CurriculumSourceRef[];
  prompts: CurriculumPromptRef[];
};

export type CurriculumQuestionLink = {
  id: string;
  examId: string;
  primarySkillId: string;
  secondarySkillIds: string[];
};

export type CurriculumSimulationLink = {
  id: string;
  examId: string;
  title: string;
  subjectId: string;
  unitId: string;
  questionIds: string[];
  sourceId?: string;
};

export type CurriculumGraph = CurriculumStructure & {
  questions: CurriculumQuestionLink[];
  simulations: CurriculumSimulationLink[];
};

export type CurriculumSkillContext = {
  subject: CurriculumSubject;
  unit: CurriculumUnit;
  lesson: CurriculumLesson;
  skill: CurriculumSkill;
  sources: CurriculumSourceRef[];
  prompts: CurriculumPromptRef[];
  questions: CurriculumQuestionLink[];
  simulations: CurriculumSimulationLink[];
};

export function validateCurriculumStructure(structure: CurriculumStructure): string[] {
  const errors: string[] = [];
  const subjects = indexUnique(structure.subjects, "subjects", errors);
  const units = indexUnique(structure.units, "units", errors);
  const lessons = indexUnique(structure.lessons, "lessons", errors);
  const skills = indexUnique(structure.skills, "skills", errors);
  const sources = indexUnique(structure.sources, "sources", errors);
  const prompts = indexUnique(structure.prompts, "prompts", errors);

  structure.sources.forEach((source) => {
    requireText(source.title, `sources.${source.id}.title`, errors);
    requireText(source.url, `sources.${source.id}.url`, errors);
    const subject = subjects.get(source.subjectId);
    if (!subject) errors.push(`source ${source.id} references unknown subject ${source.subjectId}`);
    if (source.unitId) {
      const unit = units.get(source.unitId);
      if (!unit) errors.push(`source ${source.id} references unknown unit ${source.unitId}`);
      else if (unit.subjectId !== source.subjectId) errors.push(`source ${source.id} subjectId does not match unit subjectId`);
    }
  });

  structure.subjects.forEach((subject) => {
    requireText(subject.title, `subjects.${subject.id}.title`, errors);
    validateReferenceList(subject.unitIds, units, `subject ${subject.id} unitIds`, errors);
    validateReferenceList(subject.sourceIds, sources, `subject ${subject.id} sourceIds`, errors);
    validateReferenceList(subject.promptIds, prompts, `subject ${subject.id} promptIds`, errors);

    subject.unitIds.forEach((unitId) => {
      const unit = units.get(unitId);
      if (unit && unit.subjectId !== subject.id) errors.push(`subject ${subject.id} lists unit ${unitId} owned by ${unit.subjectId}`);
    });
  });

  structure.units.forEach((unit) => {
    requireText(unit.title, `units.${unit.id}.title`, errors);
    const subject = subjects.get(unit.subjectId);
    if (!subject) errors.push(`unit ${unit.id} references unknown subject ${unit.subjectId}`);
    else if (!subject.unitIds.includes(unit.id)) errors.push(`unit ${unit.id} is not listed by subject ${unit.subjectId}`);

    validateReferenceList(unit.lessonIds, lessons, `unit ${unit.id} lessonIds`, errors);
    validateReferenceList(unit.sourceIds, sources, `unit ${unit.id} sourceIds`, errors);
    validateReferenceList(unit.promptIds, prompts, `unit ${unit.id} promptIds`, errors);

    if (unit.mappingStatus === "lesson-skill" && unit.lessonIds.length === 0) {
      errors.push(`unit ${unit.id} is lesson-skill but has no lessons`);
    }

    unit.lessonIds.forEach((lessonId) => {
      const lesson = lessons.get(lessonId);
      if (lesson && lesson.unitId !== unit.id) errors.push(`unit ${unit.id} lists lesson ${lessonId} owned by ${lesson.unitId}`);
    });
  });

  structure.lessons.forEach((lesson) => {
    requireText(lesson.title, `lessons.${lesson.id}.title`, errors);
    const unit = units.get(lesson.unitId);
    if (!unit) errors.push(`lesson ${lesson.id} references unknown unit ${lesson.unitId}`);
    else if (!unit.lessonIds.includes(lesson.id)) errors.push(`lesson ${lesson.id} is not listed by unit ${lesson.unitId}`);

    validateReferenceList(lesson.skillIds, skills, `lesson ${lesson.id} skillIds`, errors);
    validateReferenceList(lesson.sourceIds, sources, `lesson ${lesson.id} sourceIds`, errors);
    validateReferenceList(lesson.promptIds, prompts, `lesson ${lesson.id} promptIds`, errors);

    lesson.skillIds.forEach((skillId) => {
      const skill = skills.get(skillId);
      if (skill && skill.lessonId !== lesson.id) errors.push(`lesson ${lesson.id} lists skill ${skillId} owned by ${skill.lessonId}`);
    });
  });

  structure.skills.forEach((skill) => {
    requireText(skill.title, `skills.${skill.id}.title`, errors);
    const lesson = lessons.get(skill.lessonId);
    if (!lesson) errors.push(`skill ${skill.id} references unknown lesson ${skill.lessonId}`);
    else if (!lesson.skillIds.includes(skill.id)) errors.push(`skill ${skill.id} is not listed by lesson ${skill.lessonId}`);

    validateReferenceList(skill.sourceIds, sources, `skill ${skill.id} sourceIds`, errors);
    validateReferenceList(skill.promptIds, prompts, `skill ${skill.id} promptIds`, errors);

    skill.prerequisites.forEach((prerequisite, index) => {
      if (prerequisite.type === "skill") {
        if (!skills.has(prerequisite.skillId)) errors.push(`skill ${skill.id} prerequisite[${index}] references unknown skill ${prerequisite.skillId}`);
        if (prerequisite.skillId === skill.id) errors.push(`skill ${skill.id} cannot depend on itself`);
      } else {
        requireText(prerequisite.title, `skills.${skill.id}.prerequisites[${index}].title`, errors);
      }
    });
  });

  return errors;
}

export function validateCurriculumGraph(graph: CurriculumGraph): string[] {
  const errors = validateCurriculumStructure(graph);
  const subjects = new Map(graph.subjects.map((item) => [item.id, item]));
  const units = new Map(graph.units.map((item) => [item.id, item]));
  const skills = new Map(graph.skills.map((item) => [item.id, item]));
  const sources = new Map(graph.sources.map((item) => [item.id, item]));
  const questions = indexUnique(graph.questions, "questions", errors);
  const simulations = indexUnique(graph.simulations, "simulations", errors);
  const simulationsByExamId = new Map<string, CurriculumSimulationLink>();

  graph.simulations.forEach((simulation) => {
    requireText(simulation.title, `simulations.${simulation.id}.title`, errors);
    if (simulationsByExamId.has(simulation.examId)) errors.push(`duplicate simulation examId: ${simulation.examId}`);
    simulationsByExamId.set(simulation.examId, simulation);

    const subject = subjects.get(simulation.subjectId);
    const unit = units.get(simulation.unitId);
    if (!subject) errors.push(`simulation ${simulation.id} references unknown subject ${simulation.subjectId}`);
    if (!unit) errors.push(`simulation ${simulation.id} references unknown unit ${simulation.unitId}`);
    else if (unit.subjectId !== simulation.subjectId) errors.push(`simulation ${simulation.id} subjectId does not match unit subjectId`);
    if (simulation.sourceId && !sources.has(simulation.sourceId)) errors.push(`simulation ${simulation.id} references unknown source ${simulation.sourceId}`);

    const seenQuestionIds = new Set<string>();
    simulation.questionIds.forEach((questionId) => {
      if (seenQuestionIds.has(questionId)) errors.push(`simulation ${simulation.id} contains duplicate question ${questionId}`);
      seenQuestionIds.add(questionId);
      const question = questions.get(questionId);
      if (!question) errors.push(`simulation ${simulation.id} references unknown question ${questionId}`);
      else if (question.examId !== simulation.examId) errors.push(`simulation ${simulation.id} question ${questionId} belongs to exam ${question.examId}`);
    });
  });

  graph.questions.forEach((question) => {
    const simulation = simulationsByExamId.get(question.examId);
    if (!simulation) errors.push(`question ${question.id} references exam ${question.examId} without a simulation`);
    else if (!simulation.questionIds.includes(question.id)) errors.push(`question ${question.id} is not listed by simulation ${simulation.id}`);

    if (!skills.has(question.primarySkillId)) errors.push(`question ${question.id} references unknown primary skill ${question.primarySkillId}`);
    const seenSecondary = new Set<string>();
    question.secondarySkillIds.forEach((skillId) => {
      if (!skills.has(skillId)) errors.push(`question ${question.id} references unknown secondary skill ${skillId}`);
      if (seenSecondary.has(skillId)) errors.push(`question ${question.id} repeats secondary skill ${skillId}`);
      seenSecondary.add(skillId);
      if (skillId === question.primarySkillId) errors.push(`question ${question.id} repeats its primary skill as secondary`);
    });
  });

  return errors;
}

export function createCurriculumStructureIndex(structure: CurriculumStructure) {
  const errors = validateCurriculumStructure(structure);
  if (errors.length > 0) throw new Error(`Invalid curriculum structure:\n${errors.join("\n")}`);

  const subjects = new Map(structure.subjects.map((item) => [item.id, item]));
  const units = new Map(structure.units.map((item) => [item.id, item]));
  const lessons = new Map(structure.lessons.map((item) => [item.id, item]));
  const skills = new Map(structure.skills.map((item) => [item.id, item]));
  const sources = new Map(structure.sources.map((item) => [item.id, item]));
  const prompts = new Map(structure.prompts.map((item) => [item.id, item]));

  return {
    structure,
    subjects,
    units,
    lessons,
    skills,
    sources,
    prompts,
    getUnitsForSubject(subjectId: string) {
      const subject = subjects.get(subjectId);
      return subject ? subject.unitIds.map((id) => units.get(id)).filter(isDefined) : [];
    },
    getLessonsForUnit(unitId: string) {
      const unit = units.get(unitId);
      return unit ? unit.lessonIds.map((id) => lessons.get(id)).filter(isDefined) : [];
    },
    getSkillsForLesson(lessonId: string) {
      const lesson = lessons.get(lessonId);
      return lesson ? lesson.skillIds.map((id) => skills.get(id)).filter(isDefined) : [];
    },
    getResolvedSourcesForSkill(skillId: string) {
      const path = resolveSkillPath(skillId, skills, lessons, units, subjects);
      if (!path) return [];
      return uniqueIds([
        ...path.subject.sourceIds,
        ...path.unit.sourceIds,
        ...path.lesson.sourceIds,
        ...path.skill.sourceIds,
      ]).map((id) => sources.get(id)).filter(isDefined);
    },
    getResolvedPromptsForSkill(skillId: string) {
      const path = resolveSkillPath(skillId, skills, lessons, units, subjects);
      if (!path) return [];
      return uniqueIds([
        ...path.subject.promptIds,
        ...path.unit.promptIds,
        ...path.lesson.promptIds,
        ...path.skill.promptIds,
      ]).map((id) => prompts.get(id)).filter(isDefined);
    },
  };
}

export function createCurriculumIndex(graph: CurriculumGraph) {
  const errors = validateCurriculumGraph(graph);
  if (errors.length > 0) throw new Error(`Invalid curriculum graph:\n${errors.join("\n")}`);

  const base = createCurriculumStructureIndex(graph);
  const questions = new Map(graph.questions.map((item) => [item.id, item]));
  const simulations = new Map(graph.simulations.map((item) => [item.id, item]));

  const getQuestionsForSkill = (skillId: string) => graph.questions.filter(
    (question) => question.primarySkillId === skillId || question.secondarySkillIds.includes(skillId),
  );

  const getSimulationsForSkill = (skillId: string) => {
    const examIds = new Set(getQuestionsForSkill(skillId).map((question) => question.examId));
    return graph.simulations.filter((simulation) => examIds.has(simulation.examId));
  };

  return {
    ...base,
    graph,
    questions,
    simulations,
    getQuestionsForSkill,
    getSimulationsForSkill,
    getSkillContext(skillId: string): CurriculumSkillContext | null {
      const skill = base.skills.get(skillId);
      if (!skill) return null;
      const lesson = base.lessons.get(skill.lessonId);
      if (!lesson) return null;
      const unit = base.units.get(lesson.unitId);
      if (!unit) return null;
      const subject = base.subjects.get(unit.subjectId);
      if (!subject) return null;
      return {
        subject,
        unit,
        lesson,
        skill,
        sources: base.getResolvedSourcesForSkill(skillId),
        prompts: base.getResolvedPromptsForSkill(skillId),
        questions: getQuestionsForSkill(skillId),
        simulations: getSimulationsForSkill(skillId),
      };
    },
  };
}

function resolveSkillPath(
  skillId: string,
  skills: Map<string, CurriculumSkill>,
  lessons: Map<string, CurriculumLesson>,
  units: Map<string, CurriculumUnit>,
  subjects: Map<string, CurriculumSubject>,
) {
  const skill = skills.get(skillId);
  if (!skill) return null;
  const lesson = lessons.get(skill.lessonId);
  if (!lesson) return null;
  const unit = units.get(lesson.unitId);
  if (!unit) return null;
  const subject = subjects.get(unit.subjectId);
  if (!subject) return null;
  return { skill, lesson, unit, subject };
}

function indexUnique<T extends { id: string }>(items: T[], label: string, errors: string[]): Map<string, T> {
  const map = new Map<string, T>();
  items.forEach((item, index) => {
    requireText(item.id, `${label}[${index}].id`, errors);
    if (map.has(item.id)) errors.push(`duplicate ${label} id: ${item.id}`);
    map.set(item.id, item);
  });
  return map;
}

function validateReferenceList<T>(ids: string[], target: Map<string, T>, label: string, errors: string[]) {
  const seen = new Set<string>();
  ids.forEach((id) => {
    if (seen.has(id)) errors.push(`${label} contains duplicate reference ${id}`);
    seen.add(id);
    if (!target.has(id)) errors.push(`${label} references unknown id ${id}`);
  });
}

function requireText(value: string, path: string, errors: string[]) {
  if (!value.trim()) errors.push(`${path} cannot be empty`);
}

function uniqueIds(ids: string[]) {
  return [...new Set(ids)];
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
