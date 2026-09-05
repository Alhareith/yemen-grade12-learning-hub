import { ArrowRight, CheckCircle2, ExternalLink, FileCheck2, ShieldAlert } from "lucide-react";
import ExamRunner from "@/components/ExamRunner";
import { curriculumSkillIds } from "@/data/curriculum";
import { pilotCalculusExam, pilotExamReferences } from "@/data/exams/pilotExam";
import { isExamReadyForStudents } from "@shared/exams/exam-model";

export default function ExamPilot({ onBack }: { onBack: () => void }) {
  const ready = isExamReadyForStudents(pilotCalculusExam, curriculumSkillIds);

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f6fa] px-4 py-5 font-sans text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <button type="button" onClick={onBack} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
          <ArrowRight className="h-4 w-4" /> العودة إلى دليل الثالث
        </button>
        <div className="mt-4">{ready ? <ExamRunner exam={pilotCalculusExam} /> : <BlockedPilot />}</div>
      </div>
    </div>
  );
}

function BlockedPilot() {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="bg-slate-950 p-5 text-white sm:p-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 text-[10px] font-extrabold text-amber-200">
          <ShieldAlert className="h-4 w-4" /> قيد التحقق — غير متاح للاختبار بعد
        </span>
        <h1 className="mt-4 text-xl font-black leading-9 sm:text-2xl">رياضيات — التفاضل والتكامل — محاكاة تدريبية</h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-300">
          لا تُفتح المحاكاة إلا عندما تكون كل الأسئلة المخصصة لها مراجعَة، مرتبطة بمهارات صحيحة، وإجاباتها موثقة. الأسئلة المتكيفة تُعرَّف بوضوح ولا تُقدَّم كنص وزاري حرفي.
        </p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-2">
          <GateRow done title="مرجع بنية الاختبار مثبت" detail="الزمن، توزيع الأنواع والدرجات، ومسار المصدر موثق." />
          <GateRow done title="عقد provenance صريح" detail="السؤال المتكيف يحمل علاقة adapted ولا يحتاج صفحة مصدر وهمية." />
          <GateRow done={pilotCalculusExam.questions.length === 50} title="بنك الأسئلة مكتمل" detail={`الأسئلة الحالية: ${pilotCalculusExam.questions.length} من 50.`} />
          <GateRow done={pilotCalculusExam.blockingNotes.length === 0} title="بوابة النشر" detail="تظل الصفحة محجوبة تلقائيًا إذا فشل أي سؤال في عقد التحقق أو ظهرت ملاحظة مانعة." />
        </div>
        <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-4">
          <span className="text-[10px] font-extrabold text-violet-700">قاعدة الدقة</span>
          <p className="mt-1 text-xs font-bold leading-6 text-violet-950">المحاكاة تستفيد من بنية النماذج الموثقة، لكنها لا تنسب صياغة جديدة إلى الوزارة. التصحيح يعتمد على سجل تحقق مستقل للأسئلة المنشورة نفسها.</p>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <a href={pilotExamReferences.primarySource} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-extrabold text-white">مرجع بنية الاختبار <ExternalLink className="h-4 w-4" /></a>
          <a href={pilotExamReferences.officialArchive} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 text-xs font-extrabold text-slate-800">الأرشيف الرسمي المساعد <ExternalLink className="h-4 w-4" /></a>
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