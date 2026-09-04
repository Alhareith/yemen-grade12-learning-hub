import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Flag, RotateCcw } from "lucide-react";
import type { ExamDefinition } from "@shared/exams/exam-model";
import { getStudentReadyQuestions } from "@shared/exams/exam-model";
import type { RichContent } from "@shared/exams/question-model";
import {
  answerQuestion,
  canResumeSession,
  createExamSession,
  getSessionProgress,
  getSessionStorageKey,
  scoreSession,
  setCurrentQuestion,
  submitSession,
  type ExamSession,
} from "@shared/exams/session-engine";

export default function ExamRunner({ exam }: { exam: ExamDefinition }) {
  const questions = useMemo(() => getStudentReadyQuestions(exam), [exam]);
  const [session, setSession] = useState<ExamSession | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    const key = getSessionStorageKey(exam.id);
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as ExamSession;
        if (canResumeSession(exam, parsed)) setSession(parsed);
        else window.localStorage.removeItem(key);
      }
    } catch {
      window.localStorage.removeItem(key);
    }
    setLoaded(true);
  }, [exam]);

  useEffect(() => {
    if (!loaded || !session) return;
    const key = getSessionStorageKey(exam.id);
    if (session.status === "in-progress") {
      window.localStorage.setItem(key, JSON.stringify(session));
    }
  }, [exam.id, loaded, session]);

  if (!loaded) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm font-bold text-slate-500">جاري تجهيز الاختبار…</div>;
  }

  if (!session) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
        <span className="text-[10px] font-extrabold text-violet-700">محاكاة داخل الموقع</span>
        <h1 className="mt-2 text-xl font-black leading-9 text-slate-950">{exam.title}</h1>
        <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
          {questions.length} سؤالًا · {exam.durationMinutes} دقيقة مقترحة. لن تظهر صحة الإجابات أثناء المحاكاة.
        </p>
        <button
          type="button"
          onClick={() => setSession(createExamSession(exam))}
          className="mt-5 min-h-12 w-full rounded-2xl bg-violet-700 px-5 text-sm font-extrabold text-white hover:bg-violet-800 sm:w-auto"
        >
          ابدأ الاختبار
        </button>
      </section>
    );
  }

  if (session.status === "submitted") {
    const score = scoreSession(exam, session);
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
        <span className="text-[10px] font-extrabold text-violet-700">تم تسليم المحاكاة</span>
        <h1 className="mt-2 text-3xl font-black text-slate-950">{score.percentage}%</h1>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <ResultStat label="صحيح" value={score.correctCount} />
          <ResultStat label="خطأ" value={score.incorrectCount} />
          <ResultStat label="بدون إجابة" value={score.unansweredCount} />
        </div>
        <p className="mt-5 text-xs font-medium leading-6 text-slate-500">
          هذه نتيجة تصحيح حتمية من مفتاح الإجابة. تحليل المهارات وأسباب الخطأ سيبنى في المراحل التشخيصية اللاحقة.
        </p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem(getSessionStorageKey(exam.id));
            setSession(null);
          }}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-100 px-4 text-xs font-extrabold text-slate-800 hover:bg-slate-200"
        >
          <RotateCcw className="h-4 w-4" />
          محاولة جديدة
        </button>
      </section>
    );
  }

  const question = questions[session.currentIndex];
  const selectedOptionId = session.answers[question.id];
  const progress = getSessionProgress(session);

  const move = (index: number) => setSession((current) => current ? setCurrentQuestion(exam, current, index) : current);
  const finalize = () => {
    setConfirmSubmit(false);
    setSession((current) => current ? submitSession(exam, current) : current);
    window.localStorage.removeItem(getSessionStorageKey(exam.id));
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <header className="border-b border-slate-100 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <small className="text-[9px] font-extrabold text-violet-700">{exam.subject} · {exam.branch}</small>
            <strong className="block text-sm font-black text-slate-950">السؤال {session.currentIndex + 1} من {questions.length}</strong>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-extrabold text-slate-600">تمت الإجابة {progress.answeredCount}/{progress.totalCount}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${((session.currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </header>

      <div className="p-4 sm:p-6">
        <div className="text-sm font-bold leading-8 text-slate-950 sm:text-base">
          <RichContentView content={question.stem} />
        </div>

        <div className="mt-5 space-y-2">
          {question.options.map((option) => {
            const active = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSession((current) => current ? answerQuestion(exam, current, question.id, option.id) : current)}
                className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border p-3.5 text-right transition ${active ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${active ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-600"}`}>{option.label}</span>
                <span className="min-w-0 flex-1 text-sm font-bold leading-7 text-slate-900"><RichContentView content={option.content} /></span>
                {active && <Check className="h-4 w-4 shrink-0 text-violet-700" />}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-5 gap-1.5" aria-label="خريطة الأسئلة">
          {questions.map((candidate, index) => {
            const answered = session.answers[candidate.id] !== undefined;
            const current = index === session.currentIndex;
            return (
              <button
                key={candidate.id}
                type="button"
                onClick={() => move(index)}
                className={`min-h-10 rounded-xl text-[10px] font-black ${current ? "bg-slate-950 text-white" : answered ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <footer className="border-t border-slate-100 p-3 sm:p-4">
        {confirmSubmit && (
          <div className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs font-bold leading-6 text-amber-900">
            بقي {progress.unansweredCount} سؤالًا بدون إجابة. يمكنك الرجوع إليها أو التسليم كما هو.
          </div>
        )}
        <div className="flex items-center gap-2">
          <button type="button" disabled={session.currentIndex === 0} onClick={() => move(session.currentIndex - 1)} className="inline-flex min-h-11 items-center gap-1 rounded-xl bg-slate-100 px-3 text-xs font-extrabold text-slate-700 disabled:opacity-40"><ChevronRight className="h-4 w-4" />السابق</button>
          {session.currentIndex < questions.length - 1 ? (
            <button type="button" onClick={() => move(session.currentIndex + 1)} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl bg-slate-950 px-4 text-xs font-extrabold text-white">التالي<ChevronLeft className="h-4 w-4" /></button>
          ) : (
            <button type="button" onClick={() => progress.unansweredCount > 0 && !confirmSubmit ? setConfirmSubmit(true) : finalize()} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 text-xs font-extrabold text-white"><Flag className="h-4 w-4" />تسليم الاختبار</button>
          )}
        </div>
      </footer>
    </section>
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
          className={`${segment.display === "block" ? "my-2 block overflow-x-auto py-2 text-center" : "mx-1 inline-block"} rounded-lg bg-slate-50 px-2 font-mono text-[.95em] text-slate-900`}
        >
          {segment.latex}
        </span>
      ))}
    </>
  );
}

function ResultStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <strong className="block text-xl font-black text-slate-950">{value}</strong>
      <small className="text-[9px] font-extrabold text-slate-500">{label}</small>
    </div>
  );
}
