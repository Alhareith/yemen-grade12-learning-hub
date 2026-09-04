import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eraser,
  Flag,
  Grid2X2,
  History,
  ShieldCheck,
  TimerOff,
  X,
} from "lucide-react";
import type { ExamDefinition } from "@shared/exams/exam-model";
import { getStudentReadyQuestions } from "@shared/exams/exam-model";
import type { RichContent } from "@shared/exams/question-model";
import {
  answerQuestion,
  clearQuestionAnswer,
  createExamSession,
  getRemainingTimeMs,
  getSessionProgress,
  setCurrentQuestion,
  submitSession,
  toggleQuestionFlag,
  type ExamSession,
  type ExamTimingMode,
} from "@shared/exams/session-engine";
import {
  loadSessionForRecovery,
  removeStoredSession,
  saveSessionSafely,
  type SessionRecoveryResult,
} from "@/exams/session-storage";
import ExamResultReport from "@/components/ExamResultReport";

type RecoveryCandidate = Extract<SessionRecoveryResult, { kind: "resumable" }>;
type StorageState = "ok" | "unavailable" | "conflict";

export default function ExamRunner({ exam }: { exam: ExamDefinition }) {
  const questions = useMemo(() => getStudentReadyQuestions(exam), [exam]);
  const [session, setSession] = useState<ExamSession | null>(null);
  const [recovery, setRecovery] = useState<RecoveryCandidate | null>(null);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);
  const [storageState, setStorageState] = useState<StorageState>("ok");
  const [newerSession, setNewerSession] = useState<ExamSession | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [startMode, setStartMode] = useState<ExamTimingMode>("timed");
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const result = loadSessionForRecovery(exam, window.localStorage);
    if (result.kind === "resumable") {
      setRecovery(result);
    } else if (result.kind === "discarded") {
      setRecoveryNotice(recoveryReasonText(result.reason));
    } else if (result.kind === "unavailable") {
      setStorageState("unavailable");
    }
    setLoaded(true);
  }, [exam]);

  useEffect(() => {
    if (!loaded || !session) return;
    const result = saveSessionSafely(exam, session, window.localStorage);
    if (result.kind === "unavailable" || result.kind === "invalid-session") {
      setStorageState("unavailable");
      return;
    }
    if (result.kind === "conflict") {
      setNewerSession(result.newerSession);
      setStorageState("conflict");
    }
  }, [exam, loaded, session]);

  useEffect(() => {
    if (!session || session.status !== "in-progress") return;
    const flush = () => {
      saveSessionSafely(exam, session, window.localStorage);
    };
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, [exam, session]);

  useEffect(() => {
    if (!session || session.status !== "in-progress") return;
    const key = `yemen-grade12:exam-session:v2:${exam.id}`;
    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== key || event.newValue === null) return;
      const result = loadSessionForRecovery(exam, window.localStorage);
      if (
        result.kind === "resumable"
        && result.session.updatedAt > session.updatedAt
      ) {
        setNewerSession(result.session);
        setStorageState("conflict");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [exam, session]);

  useEffect(() => {
    if (!session || session.status !== "in-progress" || session.timingMode !== "timed") return;
    setNowMs(Date.now());
    const interval = window.setInterval(() => setNowMs(Date.now()), 1_000);
    return () => window.clearInterval(interval);
  }, [session?.status, session?.timingMode]);

  useEffect(() => {
    if (!session || session.status !== "in-progress" || session.timingMode !== "timed") return;
    const remaining = getRemainingTimeMs(exam, session, nowMs);
    if (remaining !== 0) return;

    setShowMap(false);
    setConfirmSubmit(false);
    setSession((current) => {
      if (!current || current.status !== "in-progress") return current;
      return submitSession(exam, current, Date.now());
    });
  }, [exam, nowMs, session]);

  if (!loaded) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm font-bold text-slate-500">
        جاري تجهيز الاختبار…
      </div>
    );
  }

  if (session && storageState === "conflict" && newerSession) {
    const newerProgress = getSessionProgress(newerSession);
    return (
      <section className="overflow-hidden rounded-[28px] border border-amber-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.06)]">
        <div className="bg-amber-950 p-5 text-white sm:p-7">
          <span className="inline-flex items-center gap-2 text-[10px] font-extrabold text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            حماية من تعارض المحاولات
          </span>
          <h1 className="mt-3 text-xl font-black leading-8">وجدنا نسخة أحدث من هذه المحاولة</h1>
          <p className="mt-2 text-sm font-medium leading-7 text-amber-100/80">
            يبدو أن الاختبار مفتوح في تبويب آخر أو على نسخة أحدث في المتصفح. لن نكتب فوقها حتى لا نفقد إجاباتك.
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="rounded-2xl bg-amber-50 p-4 text-xs font-bold leading-6 text-amber-950">
            النسخة الأحدث تحتوي {newerProgress.answeredCount} إجابة من أصل {newerProgress.totalCount}.
          </div>
          <button
            type="button"
            onClick={() => {
              setSession(newerSession);
              setNowMs(Date.now());
              setNewerSession(null);
              setStorageState("ok");
            }}
            className="mt-4 min-h-12 w-full rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white sm:w-auto"
          >
            استعادة النسخة الأحدث
          </button>
        </div>
      </section>
    );
  }

  if (!session && recovery) {
    const progress = getSessionProgress(recovery.session);
    const remaining = getRemainingTimeMs(exam, recovery.session, Date.now());
    return (
      <section className="overflow-hidden rounded-[28px] border border-violet-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.06)]">
        <div className="bg-slate-950 p-5 text-white sm:p-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-400/10 px-3 py-1.5 text-[10px] font-extrabold text-violet-200">
            <History className="h-4 w-4" />
            محاولة محفوظة على هذا الجهاز
          </span>
          <h1 className="mt-4 text-xl font-black leading-9">{recovery.expired ? "انتهى وقت محاولتك السابقة" : "هل تريد إكمال محاولتك السابقة؟"}</h1>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-300">
            آخر حفظ: {formatSavedAt(recovery.session.updatedAt)} · أجبت {progress.answeredCount} من {progress.totalCount}.
          </p>
          {!recovery.expired && remaining !== null && (
            <p className="mt-1 text-xs font-bold text-violet-200">الوقت المتبقي محفوظ كما هو: {formatCountdown(remaining)}</p>
          )}
        </div>

        <div className="p-4 sm:p-6">
          {recovery.expired ? (
            <div className="rounded-2xl bg-amber-50 p-4 text-xs font-bold leading-6 text-amber-950">
              انتهى المؤقت أثناء غيابك. لن نفتح الإجابات للتعديل؛ يمكنك عرض النتيجة كما كانت عند انتهاء الوقت.
            </div>
          ) : (
            <div className="rounded-2xl bg-violet-50 p-4 text-xs font-medium leading-6 text-violet-950">
              لن نبدأ محاولة جديدة فوق إجاباتك المحفوظة إلا إذا اخترت ذلك بنفسك.
            </div>
          )}

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                if (recovery.expired) {
                  const submittedAt = Math.max(Date.now(), recovery.session.deadlineAt ?? Date.now());
                  setSession(submitSession(exam, recovery.session, submittedAt));
                  removeStoredSession(exam.id, window.localStorage);
                } else {
                  setSession(recovery.session);
                  setNowMs(Date.now());
                }
                setRecovery(null);
              }}
              className="min-h-12 rounded-2xl bg-violet-700 px-4 text-sm font-extrabold text-white"
            >
              {recovery.expired ? "عرض النتيجة" : "متابعة المحاولة"}
            </button>
            <button
              type="button"
              onClick={() => {
                removeStoredSession(exam.id, window.localStorage);
                setRecovery(null);
                setRecoveryNotice("تم حذف المحاولة السابقة. يمكنك بدء محاولة جديدة.");
              }}
              className="min-h-12 rounded-2xl bg-slate-100 px-4 text-sm font-extrabold text-slate-700"
            >
              حذفها والبدء من جديد
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.06)]">
        <div className="bg-slate-950 p-5 text-white sm:p-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] font-extrabold text-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            نموذج موثّق وجاهز للمحاكاة
          </span>
          <h1 className="mt-4 text-xl font-black leading-9 sm:text-2xl">{exam.title}</h1>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-300">
            {questions.length} سؤالًا · الزمن الرسمي للمحاكاة {exam.durationMinutes} دقيقة. لن تظهر صحة الإجابات قبل التسليم.
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {recoveryNotice && (
            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-[11px] font-bold leading-6 text-slate-700">
              {recoveryNotice}
            </div>
          )}
          {storageState === "unavailable" && <StorageUnavailableNotice />}

          <span className="text-[10px] font-extrabold text-slate-500">اختر طريقة المحاكاة</span>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <ModeButton
              active={startMode === "timed"}
              icon={Clock3}
              title="محاكاة بالوقت"
              description="المؤقت يستمر حتى عند إغلاق الصفحة، وينتهي الاختبار تلقائيًا عند انتهاء الزمن."
              onClick={() => setStartMode("timed")}
            />
            <ModeButton
              active={startMode === "untimed"}
              icon={TimerOff}
              title="بدون مؤقت"
              description="نفس الأسئلة ونفس التصحيح، لكن للتركيز على التدريب دون ضغط الزمن."
              onClick={() => setStartMode("untimed")}
            />
          </div>

          {storageState !== "unavailable" && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs font-medium leading-6 text-slate-600">
              تُحفظ إجاباتك تلقائيًا على هذا الجهاز. عند العودة سنعرض المحاولة المحفوظة أولًا ولن نستبدلها بصمت.
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              removeStoredSession(exam.id, window.localStorage);
              setNowMs(Date.now());
              setSession(createExamSession(exam, { timingMode: startMode }));
            }}
            className="mt-5 min-h-12 w-full rounded-2xl bg-violet-700 px-5 text-sm font-extrabold text-white transition hover:bg-violet-800 active:scale-[.99] sm:w-auto sm:min-w-48"
          >
            ابدأ المحاكاة
          </button>
        </div>
      </section>
    );
  }

  if (session.status === "submitted") {
    return (
      <ExamResultReport
        exam={exam}
        session={session}
        onRestart={() => {
          removeStoredSession(exam.id, window.localStorage);
          setSession(null);
          setConfirmSubmit(false);
          setShowMap(false);
          setRecovery(null);
          setNewerSession(null);
          setStorageState("ok");
        }}
      />
    );
  }

  const question = questions[session.currentIndex];
  const selectedOptionId = session.answers[question.id];
  const progress = getSessionProgress(session);
  const flagged = session.flaggedQuestionIds.includes(question.id);
  const remainingTimeMs = getRemainingTimeMs(exam, session, nowMs);
  const timeUrgency = remainingTimeMs === null
    ? "none"
    : remainingTimeMs <= 60_000
      ? "critical"
      : remainingTimeMs <= 5 * 60_000
        ? "warning"
        : "normal";

  const move = (index: number) => {
    setConfirmSubmit(false);
    setSession((current) => current ? setCurrentQuestion(exam, current, index) : current);
  };

  const finalize = () => {
    setConfirmSubmit(false);
    setShowMap(false);
    setSession((current) => current ? submitSession(exam, current) : current);
  };

  const firstUnansweredIndex = questions.findIndex(
    (candidate) => session.answers[candidate.id] === undefined,
  );

  return (
    <section className="relative flex min-h-[calc(100dvh-6.5rem)] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.06)]">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/96 p-3.5 backdrop-blur-xl sm:p-4">
        {storageState === "unavailable" && (
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-[10px] font-bold leading-5 text-amber-900">
            الحفظ التلقائي غير متاح الآن. يمكنك إكمال الاختبار، لكن لا تغلق الصفحة قبل التسليم.
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <small className="block truncate text-[9px] font-extrabold text-violet-700">{exam.subject} · {exam.branch}</small>
            <strong className="block text-sm font-black text-slate-950">السؤال {session.currentIndex + 1} من {questions.length}</strong>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <TimeBadge remainingMs={remainingTimeMs} urgency={timeUrgency} />
            <button
              type="button"
              onClick={() => setShowMap(true)}
              aria-label="فتح خريطة الأسئلة"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700"
            >
              <Grid2X2 className="h-4.5 w-4.5" />
              {progress.flaggedCount > 0 && (
                <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-black text-white">
                  {progress.flaggedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="shrink-0 text-[9px] font-extrabold text-slate-500">أجبت {progress.answeredCount}/{progress.totalCount}</span>
        </div>
      </header>

      <div className="flex-1 p-4 pb-7 sm:p-6 sm:pb-8">
        <div className="rounded-2xl bg-slate-50/80 p-4 text-sm font-bold leading-8 text-slate-950 sm:p-5 sm:text-base">
          <RichContentView content={question.stem} />
        </div>

        <div className="mt-4 space-y-2.5">
          {question.options.map((option) => {
            const active = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSession((current) => current ? answerQuestion(exam, current, question.id, option.id) : current)}
                className={`flex min-h-[60px] w-full items-center gap-3 rounded-2xl border p-3.5 text-right transition active:scale-[.995] ${active ? "border-violet-500 bg-violet-50 ring-1 ring-violet-100" : "border-slate-200 bg-white hover:bg-slate-50"}`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${active ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {option.label}
                </span>
                <span className="min-w-0 flex-1 text-sm font-bold leading-7 text-slate-900">
                  <RichContentView content={option.content} />
                </span>
                {active && <Check className="h-4.5 w-4.5 shrink-0 text-violet-700" />}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSession((current) => current ? toggleQuestionFlag(exam, current, question.id) : current)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-[11px] font-extrabold ${flagged ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}
          >
            <Flag className={`h-4 w-4 ${flagged ? "fill-current" : ""}`} />
            {flagged ? "معلّم للمراجعة" : "علّم للمراجعة"}
          </button>

          {selectedOptionId && (
            <button
              type="button"
              onClick={() => setSession((current) => current ? clearQuestionAnswer(exam, current, question.id) : current)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-100 px-3 text-[11px] font-extrabold text-slate-600"
            >
              <Eraser className="h-4 w-4" />
              إلغاء الاختيار
            </button>
          )}
        </div>
      </div>

      <footer className="sticky bottom-0 z-20 border-t border-slate-100 bg-white/96 p-3 backdrop-blur-xl sm:p-4">
        {confirmSubmit && (
          <div className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 p-3.5">
            <strong className="block text-xs font-black text-amber-950">راجع قبل التسليم</strong>
            <p className="mt-1 text-[11px] font-medium leading-5 text-amber-900">
              {progress.unansweredCount > 0 ? `بقي ${progress.unansweredCount} سؤالًا بدون إجابة. ` : "أجبت عن جميع الأسئلة. "}
              {progress.flaggedCount > 0 ? `ولديك ${progress.flaggedCount} سؤالًا معلّمًا للمراجعة.` : "لا توجد أسئلة معلّمة للمراجعة."}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setConfirmSubmit(false)} className="min-h-10 rounded-xl bg-white px-3 text-[10px] font-extrabold text-slate-700 ring-1 ring-amber-200">متابعة المراجعة</button>
              <button type="button" onClick={finalize} className="min-h-10 rounded-xl bg-violet-700 px-3 text-[10px] font-extrabold text-white">تسليم الآن</button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={session.currentIndex === 0}
            onClick={() => move(session.currentIndex - 1)}
            className="inline-flex min-h-12 items-center gap-1 rounded-xl bg-slate-100 px-3.5 text-xs font-extrabold text-slate-700 disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
            السابق
          </button>

          {session.currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => move(session.currentIndex + 1)}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-xl bg-slate-950 px-4 text-xs font-extrabold text-white active:scale-[.995]"
            >
              التالي
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmSubmit(true)}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 text-xs font-extrabold text-white active:scale-[.995]"
            >
              <Flag className="h-4 w-4" />
              مراجعة وتسليم
            </button>
          )}
        </div>
      </footer>

      {showMap && (
        <div className="fixed inset-0 z-[80] flex items-end bg-slate-950/45 p-3 backdrop-blur-[2px] sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-label="خريطة الأسئلة">
          <div className="max-h-[82dvh] w-full overflow-y-auto rounded-[26px] bg-white p-4 shadow-2xl sm:max-w-lg sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold text-violet-700">خريطة المحاكاة</span>
                <h2 className="mt-1 text-lg font-black text-slate-950">انتقل للسؤال الذي تريده</h2>
              </div>
              <button type="button" onClick={() => setShowMap(false)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600" aria-label="إغلاق خريطة الأسئلة"><X className="h-4 w-4" /></button>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8">
              {questions.map((candidate, index) => {
                const answered = session.answers[candidate.id] !== undefined;
                const isCurrent = index === session.currentIndex;
                const isFlagged = session.flaggedQuestionIds.includes(candidate.id);
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => {
                      move(index);
                      setShowMap(false);
                    }}
                    className={`relative min-h-12 rounded-xl text-xs font-black ${isCurrent ? "bg-slate-950 text-white" : answered ? "bg-violet-100 text-violet-800" : "bg-slate-100 text-slate-500"}`}
                  >
                    {index + 1}
                    {isFlagged && <span className="absolute left-1 top-1 h-2 w-2 rounded-full bg-amber-500" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-slate-500">
              <Legend swatch="bg-slate-950" label="الحالي" />
              <Legend swatch="bg-violet-200" label="مجاب" />
              <Legend swatch="bg-slate-200" label="غير مجاب" />
              <Legend swatch="bg-amber-500" label="للمراجعة" dot />
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {firstUnansweredIndex >= 0 && (
                <button
                  type="button"
                  onClick={() => {
                    move(firstUnansweredIndex);
                    setShowMap(false);
                  }}
                  className="min-h-11 rounded-xl bg-slate-100 px-3 text-xs font-extrabold text-slate-700"
                >
                  اذهب لأول سؤال غير مجاب
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowMap(false);
                  setConfirmSubmit(true);
                }}
                className="min-h-11 rounded-xl bg-violet-700 px-3 text-xs font-extrabold text-white"
              >
                مراجعة ثم تسليم
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StorageUnavailableNotice() {
  return (
    <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-3.5">
      <strong className="flex items-center gap-2 text-xs font-black text-amber-950">
        <AlertTriangle className="h-4 w-4" />
        الحفظ التلقائي غير متاح في هذا المتصفح
      </strong>
      <p className="mt-1 text-[11px] font-medium leading-5 text-amber-900">
        يمكنك أداء الاختبار، لكن إذا أغلقت الصفحة قد لا نستطيع استعادة المحاولة. أبقِ الصفحة مفتوحة حتى التسليم.
      </p>
    </div>
  );
}

function ModeButton({ active, icon: Icon, title, description, onClick }: {
  active: boolean;
  icon: typeof Clock3;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[112px] items-start gap-3 rounded-2xl border p-4 text-right transition ${active ? "border-violet-500 bg-violet-50 ring-1 ring-violet-100" : "border-slate-200 bg-white hover:bg-slate-50"}`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-600"}`}><Icon className="h-4.5 w-4.5" /></span>
      <span className="min-w-0">
        <strong className="block text-sm font-black text-slate-950">{title}</strong>
        <span className="mt-1 block text-[11px] font-medium leading-5 text-slate-500">{description}</span>
      </span>
    </button>
  );
}

function TimeBadge({ remainingMs, urgency }: { remainingMs: number | null; urgency: "none" | "normal" | "warning" | "critical" }) {
  if (remainingMs === null) {
    return (
      <span className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-slate-100 px-3 text-[10px] font-extrabold text-slate-600">
        <TimerOff className="h-4 w-4" />
        بدون وقت
      </span>
    );
  }

  const tone = urgency === "critical"
    ? "bg-red-50 text-red-700 ring-red-100"
    : urgency === "warning"
      ? "bg-amber-50 text-amber-800 ring-amber-100"
      : "bg-slate-100 text-slate-700 ring-slate-100";

  return (
    <span dir="ltr" aria-label={`الوقت المتبقي ${formatCountdown(remainingMs)}`} className={`inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-[11px] font-black tabular-nums ring-1 ${tone}`}>
      <Clock3 className="h-4 w-4" />
      {formatCountdown(remainingMs)}
    </span>
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

function Legend({ swatch, label, dot = false }: { swatch: string; label: string; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <i className={`${dot ? "h-2 w-2" : "h-3 w-3 rounded"} rounded-full ${swatch}`} />
      {label}
    </span>
  );
}

function recoveryReasonText(reason: string): string {
  if (reason === "unsupported-version" || reason === "invalid-question-set" || reason === "wrong-exam") {
    return "وجدنا محاولة محفوظة لنسخة قديمة من الاختبار، فتجاهلناها حفاظًا على دقة النتيجة.";
  }
  if (reason === "not-in-progress") {
    return "وجدنا بيانات محاولة منتهية قديمة، فتم تنظيفها قبل بدء محاولة جديدة.";
  }
  return "وجدنا محاولة محفوظة غير سليمة، فلم نستخدمها حتى لا تتأثر إجاباتك أو نتيجتك.";
}

function formatSavedAt(timestamp: number): string {
  try {
    return new Intl.DateTimeFormat("ar-YE", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(timestamp));
  } catch {
    return "وقت سابق";
  }
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1_000));
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}