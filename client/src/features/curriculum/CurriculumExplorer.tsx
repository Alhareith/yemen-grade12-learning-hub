import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Copy,
  Dumbbell,
  Layers3,
} from "lucide-react";
import { buildPracticeHash } from "@/app/routing";
import { SubjectCard, type SubjectTone } from "@/design-system/components";
import { v3AssetPaths } from "@/design-system/assets/asset-paths";
import { Button, Chip, Surface } from "@/design-system/primitives";
import "@/design-system/primitives/primitives.css";
import { curriculumGraph, curriculumIndex } from "@/data/curriculum";
import { getReadyPracticeSetForSkill } from "@/data/practiceBank";
import { selfStudyPrompts } from "@/data/promptCatalog";
import { buildArabicOutputPolicy } from "@shared/prompts/arabic-output-policy";
import "./curriculum-explorer.css";

const explainPrompt =
  selfStudyPrompts.find((prompt) => prompt.id === "rebuild-from-zero") ??
  selfStudyPrompts[0];

const numberFormatter = new Intl.NumberFormat("ar");

const subjectVisuals: Record<
  string,
  { tone: SubjectTone; illustrationSrc: string }
> = {
  رياضيات: {
    tone: "math",
    illustrationSrc: v3AssetPaths.subjects.math,
  },
  فيزياء: {
    tone: "physics",
    illustrationSrc: v3AssetPaths.subjects.physics,
  },
  كيمياء: {
    tone: "chemistry",
    illustrationSrc: v3AssetPaths.subjects.chemistry,
  },
  أحياء: {
    tone: "biology",
    illustrationSrc: v3AssetPaths.subjects.biology,
  },
  "لغة إنجليزية": {
    tone: "english",
    illustrationSrc: v3AssetPaths.subjects.english,
  },
};

type CurriculumStage = "subjects" | "units" | "lessons" | "detail";

type LessonGroup = {
  id: string;
  title: string | null;
  lessons: ReturnType<typeof curriculumIndex.getLessonsForUnit>;
};

export default function CurriculumExplorer({
  onBack: _onBack,
}: {
  onBack: () => void;
}) {
  const subjectsWithUnits = useMemo(
    () =>
      curriculumGraph.subjects.filter(
        (subject) =>
          curriculumIndex.getUnitsForSubject(subject.id).length > 0,
      ),
    [],
  );

  const [subjectId, setSubjectId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [copied, setCopied] = useState(false);
  const [focusVersion, setFocusVersion] = useState(0);

  const subject = subjectId
    ? curriculumIndex.subjects.get(subjectId)
    : undefined;
  const units = subject
    ? curriculumIndex.getUnitsForSubject(subject.id)
    : [];
  const activeUnit = unitId
    ? curriculumIndex.units.get(unitId)
    : undefined;
  const lessons = activeUnit
    ? curriculumIndex.getLessonsForUnit(activeUnit.id)
    : [];
  const activeLesson = lessonId
    ? curriculumIndex.lessons.get(lessonId)
    : undefined;
  const skills = activeLesson
    ? curriculumIndex.getSkillsForLesson(activeLesson.id)
    : [];
  const activeSkill =
    skills.length === 1
      ? skills[0]
      : skillId
        ? curriculumIndex.skills.get(skillId)
        : undefined;
  const practiceSet = activeSkill
    ? getReadyPracticeSetForSkill(activeSkill.id)
    : null;
  const subjectVisual = subject ? subjectVisuals[subject.id] : undefined;

  const stage: CurriculumStage = !subject
    ? "subjects"
    : !activeUnit
      ? "units"
      : activeUnit.mappingStatus !== "lesson-skill" || !activeLesson
        ? "lessons"
        : "detail";

  const lessonGroups = useMemo(
    () => groupLessons(lessons),
    [lessons],
  );

  useEffect(() => {
    if (focusVersion === 0) return;

    const frame = window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>(
        '[data-curriculum-panel][data-active="true"] [data-curriculum-focus-heading]',
      );
      heading?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusVersion, stage]);

  const advanceFocus = () => setFocusVersion((value) => value + 1);

  const chooseSubject = (nextSubjectId: string) => {
    setSubjectId(nextSubjectId);
    setUnitId("");
    setLessonId("");
    setSkillId("");
    setCopied(false);
    advanceFocus();
  };

  const chooseUnit = (nextUnitId: string) => {
    setUnitId(nextUnitId);
    setLessonId("");
    setSkillId("");
    setCopied(false);
    advanceFocus();
  };

  const chooseLesson = (nextLessonId: string) => {
    setLessonId(nextLessonId);
    setSkillId("");
    setCopied(false);
    advanceFocus();
  };

  const chooseSkill = (nextSkillId: string) => {
    setSkillId(nextSkillId);
    setCopied(false);
  };

  const backToSubjects = () => {
    setSubjectId("");
    setUnitId("");
    setLessonId("");
    setSkillId("");
    setCopied(false);
    advanceFocus();
  };

  const backToUnits = () => {
    setUnitId("");
    setLessonId("");
    setSkillId("");
    setCopied(false);
    advanceFocus();
  };

  const backToLessons = () => {
    setLessonId("");
    setSkillId("");
    setCopied(false);
    advanceFocus();
  };

  const copyLessonPrompt = async () => {
    if (!subject || !activeUnit || !activeLesson || !explainPrompt) return;

    const basePrompt = explainPrompt.build({
      subject: subject.title,
      unit: activeUnit.title,
      lesson: activeLesson.title,
      input: activeSkill?.title ?? activeLesson.title,
    });
    const prompt = `${basePrompt}\n\n${buildArabicOutputPolicy(subject.title)}`;

    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      className="v3-curriculum"
      data-curriculum-explorer
      data-curriculum-has-subject={subject ? "true" : "false"}
      data-curriculum-mapping-status={activeUnit?.mappingStatus ?? "none"}
      data-curriculum-stage={stage}
      data-v3-ui
      dir="rtl"
      lang="ar"
    >
      <div className="v3-curriculum__shell">
        <header className="v3-curriculum__page-header">
          <div>
            <span className="v3-curriculum__eyebrow">
              <Layers3 aria-hidden="true" />
              المسار الدراسي
            </span>
            <h1>المنهج</h1>
            <p>
              اختر المادة، ثم الوحدة، ثم الدرس. تظهر المهارات داخل الدرس
              عندما تكون موثقة.
            </p>
          </div>
        </header>

        {subject ? (
          <div
            className="v3-curriculum__desktop-context"
            data-curriculum-desktop-context
          >
            <div className="v3-curriculum__desktop-subject">
              {subjectVisual ? (
                <img
                  alt=""
                  aria-hidden="true"
                  src={subjectVisual.illustrationSrc}
                />
              ) : null}
              <div>
                <small>المادة الحالية</small>
                <strong>{subject.title}</strong>
                <span>
                  {formatCount(units.length, "وحدة واحدة", "وحدتان", "وحدات")}
                </span>
              </div>
            </div>
            <Button
              data-curriculum-change-subject
              onClick={backToSubjects}
              size="sm"
              variant="secondary"
            >
              تغيير المادة
            </Button>
          </div>
        ) : null}

        <div
          className="v3-curriculum__flow"
          data-curriculum-desktop-workspace={subject ? "true" : "false"}
        >
          <section
            aria-labelledby="curriculum-subjects-heading"
            className="v3-curriculum__panel"
            data-active={stage === "subjects"}
            data-curriculum-panel="subjects"
          >
            <div className="v3-curriculum__panel-heading">
              <div>
                <p className="v3-curriculum__step">١ · المادة</p>
                <h2
                  className="v3-curriculum__focus-heading"
                  data-curriculum-focus-heading
                  id="curriculum-subjects-heading"
                  tabIndex={-1}
                >
                  اختر المادة
                </h2>
                <p>نعرض هنا المواد التي لديها وحدات فعلية في المنهج الحالي.</p>
              </div>
            </div>

            {subjectsWithUnits.length > 0 ? (
              <div
                className="v3-curriculum__subject-grid"
                data-curriculum-subject-grid
              >
                {subjectsWithUnits.map((item) => {
                  const visual = subjectVisuals[item.id];
                  const itemUnits = curriculumIndex.getUnitsForSubject(item.id);
                  const lessonCount = itemUnits.reduce(
                    (total, unit) =>
                      total +
                      curriculumIndex.getLessonsForUnit(unit.id).length,
                    0,
                  );
                  const meta =
                    lessonCount > 0
                      ? `${formatCount(itemUnits.length, "وحدة", "وحدتان", "وحدات")} · ${numberFormatter.format(lessonCount)} درسًا موثقًا`
                      : `${formatCount(itemUnits.length, "وحدة", "وحدتان", "وحدات")} · تفاصيل الدروس قيد التوثيق`;

                  if (!visual) return null;

                  return (
                    <div data-curriculum-subject={item.id} key={item.id}>
                      <SubjectCard
                        actionLabel={`عرض وحدات ${item.title}`}
                        illustrationAlt=""
                        illustrationSrc={visual.illustrationSrc}
                        meta={meta}
                        onAction={() => chooseSubject(item.id)}
                        title={item.title}
                        tone={visual.tone}
                        variant="actionable"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <Surface padding="lg" variant="subtle">
                <div className="v3-curriculum__empty" role="status">
                  <AlertTriangle aria-hidden="true" />
                  <strong>المنهج غير متاح حاليًا.</strong>
                  <span>لم نجد مواد تحتوي وحدات قابلة للتصفح.</span>
                </div>
              </Surface>
            )}
          </section>

          {subject ? (
            <section
              aria-labelledby="curriculum-units-heading"
              className="v3-curriculum__panel"
              data-active={stage === "units"}
              data-curriculum-panel="units"
            >
              <HierarchyBack
                label="العودة إلى المواد"
                onClick={backToSubjects}
              />

              <CurriculumContext subject={subject.title} />

              <div className="v3-curriculum__panel-heading">
                <div>
                  <p className="v3-curriculum__step">٢ · الوحدة</p>
                  <h2
                    className="v3-curriculum__focus-heading"
                    data-curriculum-focus-heading
                    id="curriculum-units-heading"
                    tabIndex={-1}
                  >
                    وحدات {subject.title}
                  </h2>
                  <p>اختر الوحدة التي تدرسها الآن.</p>
                </div>
              </div>

              <div className="v3-curriculum__list" data-curriculum-unit-list>
                {units.map((unit) => {
                  const unitLessons = curriculumIndex.getLessonsForUnit(unit.id);
                  const selected = activeUnit?.id === unit.id;

                  return (
                    <button
                      aria-pressed={selected}
                      className="v3-curriculum__nav-item"
                      data-curriculum-unit={unit.id}
                      data-selected={selected}
                      key={unit.id}
                      onClick={() => chooseUnit(unit.id)}
                      type="button"
                    >
                      <span className="v3-curriculum__nav-copy">
                        <strong>{unit.title}</strong>
                        <small>
                          {unit.mappingStatus === "lesson-skill"
                            ? `${numberFormatter.format(unitLessons.length)} درسًا موثقًا`
                            : "الوحدة موثقة · تفاصيل الدروس قيد التوثيق"}
                        </small>
                      </span>
                      <span
                        aria-hidden="true"
                        className="v3-curriculum__nav-state"
                      >
                        {selected ? (
                          <CheckCircle2 />
                        ) : (
                          <ChevronLeft />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          {subject && !activeUnit ? (
            <DesktopPlaceholder
              className="v3-curriculum__desktop-placeholder--next"
              description="اختر وحدة من القائمة لتظهر الدروس الموثقة أو حالة التوثيق الحقيقية لهذه الوحدة."
              title="اختر وحدة للمتابعة"
            />
          ) : null}

          {subject && activeUnit ? (
            <section
              aria-labelledby="curriculum-lessons-heading"
              className="v3-curriculum__panel"
              data-active={stage === "lessons"}
              data-curriculum-panel="lessons"
            >
              <HierarchyBack
                label="العودة إلى الوحدات"
                onClick={backToUnits}
              />

              <CurriculumContext
                subject={subject.title}
                unit={activeUnit.title}
              />

              <div className="v3-curriculum__panel-heading">
                <div>
                  <p className="v3-curriculum__step">٣ · الدرس</p>
                  <h2
                    className="v3-curriculum__focus-heading"
                    data-curriculum-focus-heading
                    id="curriculum-lessons-heading"
                    tabIndex={-1}
                  >
                    {activeUnit.mappingStatus === "lesson-skill"
                      ? `دروس ${activeUnit.title}`
                      : activeUnit.title}
                  </h2>
                  <p>
                    {activeUnit.mappingStatus === "lesson-skill"
                      ? "اختر درسًا موثقًا لفتح تفاصيله."
                      : "هذه الوحدة موجودة في المنهج، لكن تفاصيل الدروس لم تُعتمد بعد."}
                  </p>
                </div>
              </div>

              {activeUnit.mappingStatus === "lesson-skill" ? (
                <div
                  className="v3-curriculum__lesson-groups"
                  data-curriculum-lesson-list
                >
                  {lessonGroups.map((group) => (
                    <section
                      className="v3-curriculum__lesson-group"
                      key={group.id}
                    >
                      {group.title ? <h3>{group.title}</h3> : null}
                      <div className="v3-curriculum__list">
                        {group.lessons.map((lesson) => {
                          const selected = activeLesson?.id === lesson.id;

                          return (
                            <button
                              aria-pressed={selected}
                              className="v3-curriculum__nav-item v3-curriculum__nav-item--lesson"
                              data-curriculum-lesson={lesson.id}
                              data-selected={selected}
                              key={lesson.id}
                              onClick={() => chooseLesson(lesson.id)}
                              type="button"
                            >
                              <span className="v3-curriculum__nav-copy">
                                <strong>{lesson.title}</strong>
                                <small>
                                  {formatCount(
                                    curriculumIndex.getSkillsForLesson(lesson.id)
                                      .length,
                                    "مهارة واحدة",
                                    "مهارتان",
                                    "مهارات",
                                  )}
                                </small>
                              </span>
                              <span
                                aria-hidden="true"
                                className="v3-curriculum__nav-state"
                              >
                                {selected ? (
                                  <CheckCircle2 />
                                ) : (
                                  <ChevronLeft />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <Surface
                  className="v3-curriculum__unmapped"
                  padding="lg"
                  variant="subtle"
                >
                  <div role="status">
                    <AlertTriangle aria-hidden="true" />
                    <div>
                      <strong>تفاصيل الدروس لم تُعتمد بعد.</strong>
                      <p>
                        لن نعرض أسماء دروس أو مهارات غير موجودة في البيانات
                        الموثقة.
                      </p>
                    </div>
                  </div>
                </Surface>
              )}
            </section>
          ) : null}

          {subject &&
          activeUnit?.mappingStatus === "lesson-skill" &&
          !activeLesson ? (
            <DesktopPlaceholder
              className="v3-curriculum__desktop-placeholder--detail"
              description="اختر درسًا من القائمة، وستظهر تفاصيله هنا دون أن تفقد سياق المادة والوحدة."
              title="اختر درسًا لعرض التفاصيل"
            />
          ) : null}

          {subject && activeUnit && activeLesson ? (
            <section
              aria-labelledby="curriculum-detail-heading"
              className="v3-curriculum__panel"
              data-active={stage === "detail"}
              data-curriculum-panel="detail"
            >
              <HierarchyBack
                label="العودة إلى الدروس"
                onClick={backToLessons}
              />

              <CurriculumContext
                lesson={activeLesson.title}
                subject={subject.title}
                unit={activeUnit.title}
              />

              <Surface
                className="v3-curriculum__detail"
                data-skill-detail
                padding="lg"
                variant="raised"
              >
                <div className="v3-curriculum__detail-heading">
                  <div>
                    <p className="v3-curriculum__step">
                      {activeLesson.groupTitle ?? "الدرس"}
                    </p>
                    <h2
                      className="v3-curriculum__focus-heading"
                      data-curriculum-focus-heading
                      id="curriculum-detail-heading"
                      tabIndex={-1}
                    >
                      {activeLesson.title}
                    </h2>
                    <p>
                      افتح الشرح مباشرة، واختر مهارة فقط عندما تحتاج سياقًا
                      أدق أو تدريبًا متاحًا لها.
                    </p>
                  </div>
                </div>

                {skills.length > 0 ? (
                  <div className="v3-curriculum__skills">
                    <span className="v3-curriculum__section-label">
                      {skills.length === 1 ? "المهارة" : "مهارات الدرس"}
                    </span>

                    {skills.length === 1 ? (
                      <span
                        className="v3-curriculum__single-skill"
                        data-curriculum-skill={skills[0].id}
                      >
                        <CheckCircle2 aria-hidden="true" />
                        {skills[0].title}
                      </span>
                    ) : (
                      <div
                        className="v3-curriculum__skill-list"
                        data-curriculum-skill-list
                      >
                        {skills.map((skill) => (
                          <Chip
                            data-curriculum-skill={skill.id}
                            key={skill.id}
                            onClick={() => chooseSkill(skill.id)}
                            selected={activeSkill?.id === skill.id}
                            tone="primary"
                          >
                            {skill.title}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                <div
                  className="v3-curriculum__actions"
                  data-curriculum-lesson-actions
                >
                  <Button
                    data-skill-prompt-action
                    icon={copied ? Check : Copy}
                    onClick={copyLessonPrompt}
                    variant="primary"
                  >
                    {copied
                      ? "تم نسخ أمر الشرح"
                      : "انسخ أمر شرح هذا الدرس"}
                  </Button>

                  {practiceSet && activeSkill ? (
                    <Button
                      data-skill-practice-action
                      icon={Dumbbell}
                      onClick={() => {
                        window.location.hash = buildPracticeHash(activeSkill.id);
                      }}
                      variant="secondary"
                    >
                      تدرّب على هذه المهارة
                    </Button>
                  ) : null}
                </div>

                {skills.length > 1 && !activeSkill ? (
                  <p className="v3-curriculum__practice-note">
                    التدريب الحالي مرتبط بالمهارة. اختر مهارة فقط إذا أردت
                    التحقق من وجود تدريب جاهز لها.
                  </p>
                ) : null}
              </Surface>
            </section>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function DesktopPlaceholder({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className: string;
}) {
  return (
    <Surface
      className={`v3-curriculum__desktop-placeholder ${className}`}
      data-curriculum-desktop-placeholder
      padding="lg"
      variant="subtle"
    >
      <Layers3 aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </Surface>
  );
}

function CurriculumContext({
  subject,
  unit,
  lesson,
}: {
  subject: string;
  unit?: string;
  lesson?: string;
}) {
  return (
    <nav
      aria-label="مسار المنهج الحالي"
      className="v3-curriculum__context"
      data-curriculum-context
    >
      <span>{subject}</span>
      {unit ? (
        <>
          <ChevronLeft aria-hidden="true" />
          <span>{unit}</span>
        </>
      ) : null}
      {lesson ? (
        <>
          <ChevronLeft aria-hidden="true" />
          <span>{lesson}</span>
        </>
      ) : null}
    </nav>
  );
}

function HierarchyBack({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      className="v3-curriculum__back"
      icon={ArrowRight}
      onClick={onClick}
      size="sm"
      variant="ghost"
    >
      {label}
    </Button>
  );
}

function groupLessons(
  lessons: ReturnType<typeof curriculumIndex.getLessonsForUnit>,
): LessonGroup[] {
  const groups: LessonGroup[] = [];
  const byKey = new Map<string, LessonGroup>();

  lessons.forEach((lesson, index) => {
    const key = lesson.groupTitle ?? `ungrouped:${index}`;
    let group = byKey.get(key);

    if (!group) {
      group = {
        id: lesson.groupId ?? key,
        title: lesson.groupTitle ?? null,
        lessons: [],
      };
      byKey.set(key, group);
      groups.push(group);
    }

    group.lessons.push(lesson);
  });

  return groups;
}

function formatCount(
  value: number,
  singular: string,
  dual: string,
  plural: string,
) {
  if (value === 1) return singular;
  if (value === 2) return dual;
  return `${numberFormatter.format(value)} ${plural}`;
}
