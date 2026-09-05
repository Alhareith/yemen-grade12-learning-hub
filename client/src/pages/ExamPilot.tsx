import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ExternalLink, FileCheck2, ShieldAlert, Target } from "lucide-react";
import ExamRunner from "@/components/ExamRunner";
import { curriculumSkillIds } from "@/data/curriculum";
import { agpGeneralExam, agpExamReferences } from "@/data/exams/agpExam";
import { pilotCalculusExam, pilotExamReferences } from "@/data/exams/pilotExam";
import { isExamReadyForStudents, type ExamDefinition } from "@shared/exams/exam-model";

const models = [
  {
    number: "١",
    label: "النموذج العام ١",
    description: "التفاضل والتكامل",
    exam: pilotCalculusExam,
  },
  {
    number: "٢",
    label: "النموذج العام ٢",
    description: "الجبر والهندسة والاحتمالات",
    exam: agpGeneralExam,
  },
] as const;

export default function ExamPilot({ onBack }: { onBack: () => void }) {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const selected = useMemo(() => models.find((model) => model.exam.id === selectedExamId) ?? null, [selectedExamId]);

  if (selected) {
    const ready = isExamReadyForStudents(selected.exam, curriculumSkillIds);
    return (
      <div dir="rtl" className="min-h-screen bg-[#f5f6fa] px-4 py-5 font-sans text-slate-950 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button type="button" onClick={() => setSelectedExamId(null)} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
              <ArrowRight className="h-4 w-4" /> كل النماذج
            </button>
            <button type="button" onClick={onBack} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-slate-500 ring-1 ring-slate-200">
              العودة إلى دليل الثالث
            </button>
          </div>
          <div className="mt-4">{ready ? <ExamRunner exam={selected.exam} /> : <BlockedPilot exam={selected.exam} />}</div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" data-exam-model-selector className="min-h-screen bg-[#f5f6fa] px-4 py-5 font-sans text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <button type="button" onClick={onBack} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
          <ArrowRight className="h-4 w-4" /> العودة إلى دليل الثالث
        </button>

        <section className="mt-4 overflow-hidden rounded-[28px] bg-slate-950 p-5 text-white sm:p-7">
          <span className="text-[10px] font-extrabold text-violet-300">رياضيات الثالث الثانوي اليمني</span>
          <h1 className="mt-2 text-2xl font-black leading-10 sm:text-3xl">اختر النموذج الذي تريد تجربته</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-300">النموذجان يعملان بنفس تجربة الاختبار: ٥٠ سؤالًا، ٨٠ درجة، مؤقت ساعة اختياري، حفظ المحاولة، ثم مراجعة وتحليل للمهارات بعد التسليم.</p>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          {models.map((model) => {
            const ready = isExamReadyForStudents(model.exam, curriculumSkillIds);
            return (
              <button
                key={model.exam.id}
                type="button"
                data-exam-model={model.exam.id}
                disabled={!ready}
                onClick={() => setSelectedExamId(model.exam.id)}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white text-right shadow-[0_18px_45px_rgba(15,23,42,.05)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg font-black text-violet-800">{model.number}</span>
                    <span className="min-w-0 flex-1">
                      <small className="text-[10px] font-extrabold text-violet-700">{model.label} · {ready ? "متاح الآن" : "قيد التحقق"}</small>
                      <strong className="mt-1 block text-lg font-black leading-8 text-slate-950">{model.description}</strong>
                      <span className="mt-1 block text-xs font-medium leading-6 text-slate-500">٥٠ سؤالًا · ٢٠ صح/خطأ · ٣٠ اختيارًا · ٨٠ درجة · ٦٠ دقيقة اختيارية</span>
                    </span>
                    <ChevronLeft className="mt-3 h-5 w-5 text-violet-400" />
                  </div>
                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5">
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold text-slate-600"><Target className="h-4 w-4 text-violet-700" /> تحليل مهارات بعد النتيجة</span>
                    <span className="text-[10px] font-black text-violet-700">ابدأ</span>
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        <p className="mt-4 text-center text-[10px] font-bold leading-5 text-slate-400">هذه نماذج تدريبية مرتبطة بالمقرر ومهاراته، وليست ادعاءً بأنها نصوص وزارية حرفية.</p>
      </div>
    </div>
  );
}

function BlockedPilot({ exam }: { exam: ExamDefinition }) {
  const isAgp = exam.id === agpGeneralExam.id;
  const primarySource = isAgp ? agpExamReferences.curriculumSource : pilotExamReferences.primarySource;
  const secondSource = isAgp ? agpExamReferences.skillMap : pilotExamReferences.officialArchive;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="bg-slate-950 p-5 text-white sm:p-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 text-[10px] font-extrabold text-amber-200">
          <ShieldAlert className="h-4 w-4" /> قيد التحقق — غير متاح للاختبار بعد
        </span>
        <h1 className="mt-4 text-xl font-black leading-9 sm:text-2xl">{exam.title}</h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-300">لا تُفتح المحاكاة إلا عندما تكون كل الأسئلة مراجعَة، مرتبطة بمهارات صحيحة، وإجاباتها موثقة.</p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-2">
          <GateRow done title="مرجع المقرر مثبت" detail="كل نموذج مرتبط بمرجع موضوعاته وخريطة مهاراته." />
          <GateRow done={exam.questions.length === 50} title="بنك الأسئلة مكتمل" detail={`الأسئلة الحالية: ${exam.questions.length} من 50.`} />
          <GateRow done={exam.blockingNotes.length === 0} title="بوابة النشر" detail="تظل الصفحة محجوبة إذا فشل سؤال في عقد التحقق أو ظهرت ملاحظة مانعة." />
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <a href={primarySource} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-extrabold text-white">مرجع النموذج <ExternalLink className="h-4 w-4" /></a>
          <a href={secondSource} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 text-xs font-extrabold text-slate-800">مرجع المهارات <ExternalLink className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

function GateRow({ done = false, title, detail }: { done?: boolean; title: string; detail: string }) {
  const Icon = done ? CheckCircle2 : FileCheck2;
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}><Icon className="h-4 w-4" /></span>
      <span className="min-w-0"><strong className="block text-xs font-black leading-6 text-slate-900">{title}</strong><span className="mt-0.5 block text-[11px] font-medium leading-5 text-slate-500">{detail}</span></span>
    </div>
  );
}
