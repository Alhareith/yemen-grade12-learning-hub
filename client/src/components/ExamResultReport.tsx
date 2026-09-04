import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  ExternalLink,
  RotateCcw,
  XCircle,
} from "lucide-react";
import type { ExamDefinition } from "@shared/exams/exam-model";
import type { RichContent } from "@shared/exams/question-model";
import {
  buildExamResultReport,
  type QuestionResultReview,
  type QuestionResultStatus,
} from "@shared/exams/result-report";
import type { ExamSession } from "@shared/exams/session-engine";

type ReviewFilter = "all" | QuestionResultStatus;

export default function ExamResultReport({
  exam,
  session,
  onRestart,
}: {
  exam: ExamDefinition;
  session: ExamSession;
  onRestart: () => void;
}) {
  const report = useMemo(() => buildExamResultReport(exam, session), [exam, session]);
  const [filter, setFilter] = useState<ReviewFilter>(() =>
    report.score.incorrectCount > 0 ? "incorrect" : report.score.unansweredCount > 0 ? "unanswered" : "all",
  );
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const timedOut = session.timingMode === "timed"
    && session.deadlineAt !== undefined
    && (session.submittedAt ?? 0) >= session.deadlineAt;
  const elapsedMs = Math.max(0, (session.submittedAt ?? session.updatedAt) - session.startedAt);
  const visibleReviews = filter === "all"
    ? report.reviews
    : report.reviews.filter((review) => review.status === filter);

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.06)]">
      <div className="bg-slate-950 p-5 text-white sm:p-7">
        <span className="text-[10px] font-extrabold text-violet-300">
          {timedOut ? "انتهى وقت المحاكاة" : "تم تسليم المحاكاة"}
        </span>
        <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
          <strong className="text-4xl font-black">{report.score.percentage}%</strong>
          <span className="pb-1 text-xs font-bold text-slate-400">
            {report.score.earnedPoints} من {report.score.totalPoints} نقطة
          </span>
        </div>
        <p className="mt-2 text-xs font-medium text-slate-400">
          الوقت المستخدم: {formatElapsed(elapsedMs)} · أجبت عن {report.answeredCount} من {report.reviews.length}
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-2 text-center">
          <ResultStat label="صحيح" value={report.score.correctCount} tone="good" />
          <ResultStat label="خطأ" value={report.score.incorrectCount} tone="bad" />
          <ResultStat label="بدون إجابة" value={report.score.unansweredCount} />
        </div>

        <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-4">
          <strong className="block text-xs font-black text-violet-950">ابدأ بالأخطاء، لا بالدرجة فقط</strong>
          <p className="mt-1 text-[11px] font-medium leading-6 text-violet-900">
            التصحيح أدناه مبني على مفتاح الإجابة الموثق. نعرض الشرح فقط عندما يكون مراجعًا؛ تحليل المهارات والتوصيات الدراسية سيأتي في المرحلة التشخيصية التالية.
          </p>
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500">مراجعة الإجابات</span>
              <h2 className="mt-1 text-lg font-black text-slate-950">اعرف أين أخطأت بالضبط</h2>
            </div>
            <span className="shrink-0 text-[10px] font-bold text-slate-400">{visibleReviews.length} سؤال</span>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <FilterButton active={filter === "incorrect"} onClick={() => setFilter("incorrect")}>
              الخطأ {report.score.incorrectCount}
            </FilterButton>
            <FilterButton active={filter === "unanswered"} onClick={() => setFilter("unanswered")}>
              غير المجاب {report.score.unansweredCount}
            </FilterButton>
            <FilterButton active={filter === "correct"} onClick={() => setFilter("correct")}>
              الصحيح {report.score.correctCount}
            </FilterButton>
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              الكل {report.reviews.length}
            </FilterButton>
          </div>

          {visibleReviews.length > 0 ? (
            <div className="mt-3 space-y-2.5">
              {visibleReviews.map((review) => (
                <QuestionReviewCard
                  key={review.questionId}
                  review={review}
                  expanded={expandedQuestionId === review.questionId}
                  onToggle={() => setExpandedQuestionId((current) => current === review.questionId ? null : review.questionId)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl bg-emerald-50 p-4 text-xs font-bold leading-6 text-emerald-900">
              لا توجد أسئلة في هذا التصنيف.
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-100 px-4 text-xs font-extrabold text-slate-800 hover:bg-slate-200"
        >
          <RotateCcw className="h-4 w-4" />
          محاولة جديدة
        </button>
      </div>
    </section>
  );
}

function QuestionReviewCard({
  review,
  expanded,
  onToggle,
}: {
  review: QuestionResultReview;
  expanded: boolean;
  onToggle: () => void;
}) {
  const StatusIcon = review.status === "correct"
    ? CheckCircle2
    : review.status === "incorrect"
      ? XCircle
      : CircleHelp;
  const tone = review.status === "correct"
    ? "border-emerald-200 bg-emerald-50/40 text-emerald-700"
    : review.status === "incorrect"
      ? "border-rose-200 bg-rose-50/45 text-rose-700"
      : "border-amber-200 bg-amber-50/45 text-amber-800";
  const statusLabel = review.status === "correct"
    ? "صحيح"
    : review.status === "incorrect"
      ? "خطأ"
      : "بدون إجابة";

  return (
    <article className={`overflow-hidden rounded-2xl border ${tone}`}>
      <button type="button" onClick={onToggle} className="flex min-h-16 w-full items-center gap-3 p-3.5 text-right">
        <StatusIcon className="h-5 w-5 shrink-0" />
        <span className="min-w-0 flex-1">
          <strong className="block text-xs font-black text-slate-950">السؤال {review.sourceQuestionNumber}</strong>
          <span className="mt-0.5 block text-[10px] font-bold opacity-85">{statusLabel} · {review.earnedPoints}/{review.maxPoints} نقطة</span>
        </span>
        {expanded ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-current/10 bg-white p-4 text-slate-950">
          <div className="rounded-xl bg-slate-50 p-3.5 text-sm font-bold leading-8">
            <RichContentView content={review.stem} />
          </div>

          <div className="mt-3 space-y-2">
            {review.options.map((option) => {
              const selected = review.selectedOptionId === option.id;
              const correct = review.correctOptionId === option.id;
              const optionTone = correct
                ? "border-emerald-300 bg-emerald-50"
                : selected
                  ? "border-rose-300 bg-rose-50"
                  : "border-slate-200 bg-white";

              return (
                <div key={option.id} className={`flex min-h-12 items-center gap-3 rounded-xl border p-3 ${optionTone}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black ${correct ? "bg-emerald-600 text-white" : selected ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {option.label}
                  </span>
                  <span className="min-w-0 flex-1 text-xs font-bold leading-6">
                    <RichContentView content={option.content} />
                  </span>
                  <span className="shrink-0 text-[9px] font-black">
                    {correct && selected ? "إجابتك الصحيحة" : correct ? "الإجابة الصحيحة" : selected ? "إجابتك" : ""}
                  </span>
                </div>
              );
            })}
          </div>

          {review.status === "unanswered" && (
            <div className="mt-3 rounded-xl bg-amber-50 p-3 text-[11px] font-bold leading-5 text-amber-900">
              لم تسجل إجابة لهذا السؤال قبل التسليم.
            </div>
          )}

          {review.reviewedExplanation && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <strong className="flex items-center gap-2 text-[11px] font-black text-slate-900">
                <Check className="h-4 w-4 text-emerald-600" />
                شرح مراجع
              </strong>
              <div className="mt-2 text-xs font-medium leading-7 text-slate-700">
                <RichContentView content={review.reviewedExplanation} />
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={review.answerEvidence.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-slate-950 px-3 text-[10px] font-extrabold text-white"
            >
              مفتاح الإجابة
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {review.source.sourcePackageUrl !== review.answerEvidence.sourceUrl && (
              <a
                href={review.source.sourcePackageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-slate-100 px-3 text-[10px] font-extrabold text-slate-700"
              >
                مصدر السؤال
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <p className="mt-2 text-[9px] font-bold leading-5 text-slate-400">
            مرجع الإجابة: {review.answerEvidence.locator}
            {review.answerEvidence.sourcePage ? ` · صفحة ${review.answerEvidence.sourcePage}` : ""}
            {` · صفحة السؤال ${review.source.questionPage}`}
          </p>
        </div>
      )}
    </article>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-10 shrink-0 rounded-xl px-3 text-[10px] font-extrabold ${active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"}`}
    >
      {children}
    </button>
  );
}

function RichContentView({ content }: { content: RichContent }) {
  return (
    <>
      {content.map((segment, index) => segment.type === "text" ? (
        <span key={index}>{segment.text}</span>
      ) : (
        <span
          key={index}
          dir="ltr"
          title={segment.altText}
          aria-label={segment.altText}
          className={`${segment.display === "block" ? "my-2 block overflow-x-auto py-2 text-center" : "mx-1 inline-block"} rounded-lg bg-white px-2 font-mono text-[.95em] text-slate-900`}
        >
          {segment.latex}
        </span>
      ))}
    </>
  );
}

function ResultStat({ label, value, tone = "neutral" }: { label: string; value: number; tone?: "neutral" | "good" | "bad" }) {
  const className = tone === "good"
    ? "bg-emerald-50 text-emerald-800"
    : tone === "bad"
      ? "bg-rose-50 text-rose-800"
      : "bg-slate-50 text-slate-800";

  return (
    <div className={`rounded-2xl p-3 ${className}`}>
      <strong className="block text-xl font-black">{value}</strong>
      <small className="text-[9px] font-extrabold opacity-70">{label}</small>
    </div>
  );
}

function formatElapsed(ms: number): string {
  const totalMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours} س و${minutes} د`;
  return `${minutes} دقيقة`;
}
