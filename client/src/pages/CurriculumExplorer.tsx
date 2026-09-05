import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  Copy,
  ExternalLink,
  Layers3,
  Library,
  Sigma,
  Target,
} from "lucide-react";
import { curriculumGraph, curriculumIndex } from "@/data/curriculum";
import { selfStudyPrompts } from "@/data/promptCatalog";

const explainPrompt = selfStudyPrompts.find((prompt) => prompt.id === "rebuild-from-zero") ?? selfStudyPrompts[0];

export default function CurriculumExplorer({ onBack }: { onBack: () => void }) {
  const subjectsWithUnits = useMemo(
    () => curriculumGraph.subjects.filter((subject) => curriculumIndex.getUnitsForSubject(subject.id).length > 0),
    [],
  );
  const [subjectId, setSubjectId] = useState(subjectsWithUnits.find((subject) => subject.id === "رياضيات")?.id ?? subjectsWithUnits[0]?.id ?? "");
  const subject = curriculumIndex.subjects.get(subjectId) ?? subjectsWithUnits[0];
  const units = subject ? curriculumIndex.getUnitsForSubject(subject.id) : [];
  const [unitId, setUnitId] = useState(() => units[0]?.id ?? "");
  const activeUnit = curriculumIndex.units.get(unitId) ?? units[0];
  const lessons = activeUnit ? curriculumIndex.getLessonsForUnit(activeUnit.id) : [];
  const [lessonId, setLessonId] = useState(() => lessons[0]?.id ?? "");
  const activeLesson = curriculumIndex.lessons.get(lessonId) ?? lessons[0];
  const skills = activeLesson ? curriculumIndex.getSkillsForLesson(activeLesson.id) : [];
  const [skillId, setSkillId] = useState(() => skills[0]?.id ?? "");
  const activeSkill = curriculumIndex.skills.get(skillId) ?? skills[0];
  const skillContext = activeSkill ? curriculumIndex.getSkillContext(activeSkill.id) : null;
  const [copied, setCopied] = useState(false);

  const chooseSubject = (nextSubjectId: string) => {
    const nextUnits = curriculumIndex.getUnitsForSubject(nextSubjectId);
    const nextUnit = nextUnits[0];
    const nextLessons = nextUnit ? curriculumIndex.getLessonsForUnit(nextUnit.id) : [];
    const nextLesson = nextLessons[0];
    const nextSkills = nextLesson ? curriculumIndex.getSkillsForLesson(nextLesson.id) : [];
    setSubjectId(nextSubjectId);
    setUnitId(nextUnit?.id ?? "");
    setLessonId(nextLesson?.id ?? "");
    setSkillId(nextSkills[0]?.id ?? "");
    setCopied(false);
  };

  const chooseUnit = (nextUnitId: string) => {
    const nextLessons = curriculumIndex.getLessonsForUnit(nextUnitId);
    const nextLesson = nextLessons[0];
    const nextSkills = nextLesson ? curriculumIndex.getSkillsForLesson(nextLesson.id) : [];
    setUnitId(nextUnitId);
    setLessonId(nextLesson?.id ?? "");
    setSkillId(nextSkills[0]?.id ?? "");
    setCopied(false);
  };

  const chooseLesson = (nextLessonId: string) => {
    const nextSkills = curriculumIndex.getSkillsForLesson(nextLessonId);
    setLessonId(nextLessonId);
    setSkillId(nextSkills[0]?.id ?? "");
    setCopied(false);
  };

  const copySkillPrompt = async () => {
    if (!skillContext || !explainPrompt) return;
    const prompt = explainPrompt.build({
      subject: skillContext.subject.title,
      unit: skillContext.unit.title,
      lesson: skillContext.lesson.title,
      input: skillContext.skill.title,
    });
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div dir="rtl" data-curriculum-explorer className="min-h-screen bg-[#f5f6fa] px-4 py-5 font-sans text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={onBack} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
            <ArrowRight className="h-4 w-4" /> العودة للرئيسية
          </button>
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-[10px] font-extrabold text-violet-800">
            <Layers3 className="h-4 w-4" /> مسار المنهج الموحد
          </span>
        </div>

        <section className="mt-4 overflow-hidden rounded-[28px] bg-slate-950 p-5 text-white sm:p-7">
          <span className="text-[10px] font-extrabold text-violet-300">ابدأ من مكانك الحقيقي في المنهج</span>
          <h1 className="mt-2 text-2xl font-black leading-10 sm:text-3xl">المادة ← الوحدة ← الدرس ← المهارة</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-300">اختر ما تدرسه، وسيجمع لك الموقع المصادر والبرومبتات والأسئلة والمحاكاة المرتبطة بهذه المهارة فقط. إذا لم توجد أسئلة بعد، سيظهر ذلك بوضوح.</p>
        </section>

        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <StepTitle number="١" title="اختر المادة" />
          <div className="mt-3 flex flex-wrap gap-2">
            {subjectsWithUnits.map((item) => (
              <button key={item.id} type="button" onClick={() => chooseSubject(item.id)} className={`rounded-xl px-3 py-2 text-xs font-extrabold ${subject?.id === item.id ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"}`}>
                {item.title}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
          <div className="space-y-4">
            <section className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
              <StepTitle number="٢" title="اختر الوحدة" />
              <div className="mt-3 space-y-2">
                {units.map((unit) => (
                  <button key={unit.id} type="button" onClick={() => chooseUnit(unit.id)} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-right ${activeUnit?.id === unit.id ? "bg-violet-50 ring-1 ring-violet-200" : "bg-slate-50"}`}>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activeUnit?.id === unit.id ? "bg-violet-700 text-white" : "bg-white text-slate-500"}`}><Library className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1"><strong className="block text-xs font-black leading-6">{unit.title}</strong><small className="text-[9px] font-bold text-slate-400">{unit.mappingStatus === "lesson-skill" ? "خريطة دروس ومهارات متاحة" : "الوحدة مسجلة — التفصيل قيد التوثيق"}</small></span>
                    <ChevronLeft className="h-4 w-4 text-slate-300" />
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
              <StepTitle number="٣" title="اختر الدرس" />
              {activeUnit?.mappingStatus === "lesson-skill" ? (
                <div className="mt-3 max-h-[410px] space-y-2 overflow-y-auto pl-1">
                  {lessons.map((lesson) => (
                    <button key={lesson.id} type="button" onClick={() => chooseLesson(lesson.id)} className={`w-full rounded-2xl p-3 text-right ${activeLesson?.id === lesson.id ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800"}`}>
                      {lesson.groupTitle && <small className={`block text-[9px] font-extrabold ${activeLesson?.id === lesson.id ? "text-violet-300" : "text-violet-700"}`}>{lesson.groupTitle}</small>}
                      <strong className="mt-0.5 block text-xs font-black leading-6">{lesson.title}</strong>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-3 rounded-2xl bg-amber-50 p-4 text-xs font-bold leading-6 text-amber-900">تفصيل هذه الوحدة إلى دروس ومهارات لم يُعتمد بعد، لذلك لن نعرض أسماء مخمّنة.</div>
              )}
            </section>
          </div>

          <div className="space-y-4">
            <section className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
              <StepTitle number="٤" title="اختر المهارة" />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {skills.map((skill) => (
                  <button key={skill.id} data-curriculum-skill={skill.id} type="button" onClick={() => { setSkillId(skill.id); setCopied(false); }} className={`rounded-2xl border p-3 text-right ${activeSkill?.id === skill.id ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"}`}>
                    <small className="text-[9px] font-extrabold text-slate-400">{skill.id}</small>
                    <strong className="mt-1 block text-xs font-black leading-6 text-slate-950">{skill.title}</strong>
                  </button>
                ))}
              </div>
            </section>

            {skillContext && (
              <section className="overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,.06)]">
                <div className="bg-violet-50 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-700 text-white"><Sigma className="h-5 w-5" /></span>
                    <span className="min-w-0 flex-1">
                      <small className="text-[9px] font-extrabold text-violet-700">{skillContext.subject.title} · {skillContext.unit.title}</small>
                      <strong className="mt-1 block text-base font-black leading-7 text-slate-950">{skillContext.skill.title}</strong>
                      <span className="mt-1 block text-[11px] font-bold text-slate-500">الدرس: {skillContext.lesson.title}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <Metric icon={BookOpenCheck} value={skillContext.sources.length} label="مصادر" />
                    <Metric icon={BrainCircuit} value={skillContext.prompts.length} label="برومبتات" />
                    <Metric icon={CheckCircle2} value={skillContext.questions.length} label="أسئلة تقيسها" />
                    <Metric icon={Target} value={skillContext.simulations.length} label="محاكاة" />
                  </div>

                  <button type="button" onClick={copySkillPrompt} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 text-xs font-black text-white">
                    <Copy className="h-4 w-4" /> {copied ? "تم نسخ برومبت الشرح" : "انسخ برومبت لشرح هذه المهارة"}
                  </button>

                  {skillContext.simulations.length > 0 ? (
                    <a href="#exam-pilot" className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-xs font-black text-white">
                      <Target className="h-4 w-4" /> اختبر هذه المهارة داخل المحاكاة
                    </a>
                  ) : (
                    <div className="mt-2 rounded-2xl bg-slate-50 p-3 text-center text-[10px] font-bold leading-5 text-slate-500">لا توجد محاكاة تقيس هذه المهارة حاليًا؛ لن نعرض اختبارًا غير موجود.</div>
                  )}

                  <div className="mt-5">
                    <span className="text-[10px] font-extrabold text-slate-400">مصادر مرتبطة بهذه المهارة</span>
                    <div className="mt-2 space-y-2">
                      {skillContext.sources.slice(0, 6).map((source) => (
                        <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-right hover:bg-slate-50">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><BookOpenCheck className="h-4 w-4" /></span>
                          <span className="min-w-0 flex-1"><strong className="block text-xs font-black leading-6 text-slate-900">{source.title}</strong><small className="text-[9px] font-bold text-slate-400">{source.kind === "simulation-source" ? "مرجع المحاكاة" : "مصدر تعلّم"}</small></span>
                          <ExternalLink className="h-4 w-4 text-slate-300" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTitle({ number, title }: { number: string; title: string }) {
  return <div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-[10px] font-black text-white">{number}</span><strong className="text-sm font-black text-slate-950">{title}</strong></div>;
}

function Metric({ icon: Icon, value, label }: { icon: typeof BookOpenCheck; value: number; label: string }) {
  return <div className="rounded-2xl bg-slate-50 p-3 text-center"><Icon className="mx-auto h-4 w-4 text-violet-700" /><strong className="mt-1 block text-lg font-black text-slate-950">{value}</strong><small className="text-[9px] font-extrabold text-slate-500">{label}</small></div>;
}
