import { useMemo } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Target,
} from "lucide-react";
import type { ExamResultReport } from "@shared/exams/result-report";
import {
  buildLearningDashboard,
  type DomainPerformance,
} from "@shared/exams/learning-dashboard";

export default function LearningDashboard({ report }: { report: ExamResultReport }) {
  const dashboard = useMemo(() => buildLearningDashboard(report), [report]);
  const primary = dashboard.primaryFocus;

  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,.05)]">
      <div className="border-b border-slate-100 bg-slate-50/80 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Target className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-extrabold text-violet-700">تحليل هذه المحاولة</span>
            <h2 className="mt-1 text-lg font-black leading-7 text-slate-950">{dashboard.headline}</h2>
            <p className="mt-1 text-[11px] font-medium leading-6 text-slate-500">{dashboard.summary}</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <span className="text-[10px] font-extrabold text-violet-300">القراءة السريعة</span>
            <strong className="mt-1 block text-base font-black">{dashboard.attemptLabel}</strong>
            <p className="mt-2 text-[11px] font-medium leading-6 text-slate-300">
              هذا تحليل لأسئلة هذه المحاولة فقط، وليس حكمًا نهائيًا على مستواك. نرفع ثقتنا فقط عندما يكون لدينا عدد كافٍ من الأسئلة في المجال.
            </p>
          </div>

          <div className={`rounded-2xl border p-4 ${primary ? "border-rose-100 bg-rose-50" : "border-emerald-100 bg-emerald-50"}`}>
            {primary ? (
              <>
                <span className="flex items-center gap-2 text-[10px] font-extrabold text-rose-700"><AlertTriangle className="h-4 w-4" />ابدأ من هنا</span>
                <strong className="mt-1 block text-sm font-black leading-6 text-slate-950">{primary.title}</strong>
                <p className="mt-1 text-[10px] font-medium leading-5 text-slate-600">{primary.statusLabel} · {primary.confidenceLabel}</p>
                {primary.weakSkills[0] && (
                  <p className="mt-2 text-[11px] font-bold leading-5 text-rose-900">أول نقطة داخل المجال: {primary.weakSkills[0].title}</p>
                )}
              </>
            ) : (
              <>
                <span className="flex items-center gap-2 text-[10px] font-extrabold text-emerald-700"><CheckCircle2 className="h-4 w-4" />لا توجد أولوية ضعف واضحة</span>
                <strong className="mt-1 block text-sm font-black leading-6 text-slate-950">ركز على تثبيت الأداء</strong>
                <p className="mt-1 text-[10px] font-medium leading-5 text-slate-600">راجع الأخطاء الفردية إن وجدت ثم أعد المحاكاة في وقت لاحق.</p>
              </>
            )}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400">الخريطة الكبيرة</span>
              <h3 className="mt-0.5 text-sm font-black text-slate-950">أداؤك حسب محاور التفاضل والتكامل</h3>
            </div>
            <span className="text-[9px] font-bold text-slate-400">بالنقاط الفعلية</span>
          </div>

          <div className="mt-3 space-y-2.5">
            {dashboard.domains.map((domain) => <DomainRow key={domain.id} domain={domain} />)}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-4">
          <span className="text-[10px] font-extrabold text-violet-700">ماذا أفعل الآن؟</span>
          <div className="mt-3 space-y-3">
            {dashboard.plan.map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-violet-700 text-[10px] font-black text-white">{index + 1}</span>
                <p className="pt-0.5 text-[11px] font-bold leading-6 text-violet-950">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {dashboard.strongestDomains.length > 0 && (
          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <span className="flex items-center gap-2 text-[10px] font-extrabold text-emerald-700"><CheckCircle2 className="h-4 w-4" />نقطة قوة ظهرت في هذه المحاولة</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {dashboard.strongestDomains.slice(0, 3).map((domain) => (
                <span key={domain.id} className="rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold text-emerald-800 ring-1 ring-emerald-100">
                  {domain.title} · {domain.percentage}%
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DomainRow({ domain }: { domain: DomainPerformance }) {
  const needsWork = domain.missedCount > 0;
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${needsWork ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
          {needsWork ? <ChevronLeft className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <strong className="text-xs font-black leading-6 text-slate-950">{domain.title}</strong>
            <span className="text-xs font-black text-slate-900">{domain.percentage}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200/80">
            <div className={`h-full rounded-full ${domain.percentage >= 85 ? "bg-emerald-600" : domain.percentage >= 70 ? "bg-violet-600" : domain.percentage >= 50 ? "bg-amber-500" : "bg-rose-600"}`} style={{ width: `${Math.max(3, domain.percentage)}%` }} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-bold text-slate-500">
            <span>{domain.statusLabel}</span>
            <span>{domain.confidenceLabel}</span>
            <span>{domain.correctCount} صحيح · {domain.incorrectCount} خطأ · {domain.unansweredCount} بدون إجابة</span>
          </div>
          {domain.weakSkills.length > 0 && (
            <p className="mt-2 text-[10px] font-bold leading-5 text-slate-700">
              راجع داخل هذا المحور: {domain.weakSkills.map((skill) => skill.title).join("، ")}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
