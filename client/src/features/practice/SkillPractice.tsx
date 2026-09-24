import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Copy,
  Dumbbell,
  RotateCcw,
  XCircle,
} from "lucide-react";
import ArabicRichContent from "@/components/ArabicRichContent";
import { curriculumIndex } from "@/data/curriculum";
import { getPracticeDiagnosticRulesForSkill } from "@/data/mathLessonPracticeDiagnostics";
import {
  getReadyPracticeSetForSkill,
  practiceBank,
  practiceIndex,
} from "@/data/practiceBank";
import {
  buildPracticeDiagnosticProfile,
  buildPracticeDeepeningPrompt,
} from "@shared/practice/practice-diagnostics";
import {
  buildPracticeSessionResult,
  completePracticeSession,
  createPracticeSession,
  recordPracticeAnswer,
  type PracticeSession,
  type PracticeSessionResult,
} from "@shared/practice/practice-engine";
import { buildSkillPracticeEvidence } from "@shared/practice/practice-evidence";
import { buildArabicOutputPolicy } from "@shared/prompts/arabic-output-policy";

export default function SkillPractice({ skillId, onBack }: { skillId: string; onBack: () => void }) {
  const skillContext = curriculumIndex.getSkillContext(skillId);
  const set = getReadyPracticeSetForSkill(skillId);
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [completedSessions, setCompletedSessions] = useState<PracticeSession[]>([]);
  const [result, setResult] = useState<PracticeSessionResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deepeningCopied, setDeepeningCopied] = useState(false);

  const evidence = useMemo(
    () => buildSkillPracticeEvidence(completedSessions, practiceBank, skillId),
    [completedSessions, skillId],
  );
  const completedResults = useMemo(
    () => completedSessions.map((item) => buildPracticeSessionResult(item, practiceBank)),
    [completedSessions],
  );
  const diagnosticRules = useMemo(
    () => getPracticeDiagnosticRulesForSkill(skillId),
    [skillId],
  );
  const diagnostic = useMemo(
    () => buildPracticeDiagnosticProfile(skillId, completedResults, diagnosticRules),
    [skillId, completedResults, diagnosticRules],
  );
  const deepeningPrompt = useMemo(() => {
    if (!skillContext || diagnosticRules.length === 0 || diagnostic.answeredCount === 0) return "";
    const personalized = buildPracticeDeepeningPrompt({
      subject: skillContext.subject.title,
      unit: skillContext.unit.title,
      lesson: skillContext.lesson.title,
      skill: skillContext.skill.title,
      evidence,
      diagnostic,
    });
    return `${personalized}\n\n${buildArabicOutputPolicy(skillContext.subject.title)}`;
  }, [skillContext, diagnosticRules.length, diagnostic, evidence]);

  if (!skillContext || !set) {
    return (
      <div dir="rtl" lang="ar" data-practice-page className="min-h-screen bg-[#f5f6fa] px-4 py-6 font-sans text-slate-950 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
            <ArrowRight className="h-4 w-4" /> العودة إلى المنهج
          </button>
          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <Dumbbell className="mx-auto h-9 w-9 text-slate-300" />
            <h1 className="mt-3 text-lg font-black">التدريب لهذه المهارة غير متاح بعد</h1>
            <p className="mt-2 text-xs font-medium leading-6 text-slate-500">لن نعرض تدريبًا قبل وجود بنك أسئلة مراجع وكافٍ لجولتين دون تكرار مباشر.</p>
          </div>
        </div>
      </div>
    );
  }

  const startRound = () => {
    const seen = new Set(completedSessions.flatMap((item) => item.questionIds));
    const roundNumber = completedSessions.length + 1;
    const next = createPracticeSession(practiceBank, {
      setId: set.id,
      sessionId: `practice-session:${skillId}:${roundNumber}:${Date.now()}`,
      now: Date.now(),
      seed: `${set.id}:round-${roundNumber}`,
      excludedQuestionIds: seen,
    });
    setSession(next);
    setCurrentIndex(0);
    setResult(null);
    setDeepeningCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finishRound = (workingSession: PracticeSession) => {
    const finished = completePracticeSession(workingSession, practiceBank, Math.max(Date.now(), workingSession.updatedAt));
    const nextResult = buildPracticeSessionResult(finished, practiceBank);
    setSession(finished);
    setCompletedSessions((current) => [...current, finished]);
    setResult(nextResult);
    setDeepeningCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answerCurrent = (optionId: string) => {
    if (!session || session.completedAt !== undefined) return;
    const questionId = session.questionIds[currentIndex];
    if (!questionId || session.answers[questionId]) return;
    const next = recordPracticeAnswer(session, practiceBank, questionId, optionId, Math.max(Date.now(), session.updatedAt));
    setSession(next);
  };

  const goNext = () => {
    if (!session) return;
    const questionId = session.questionIds[currentIndex];
    if (!questionId || !session.answers[questionId]) return;
    if (currentIndex < session.questionIds.length - 1) {
      setCurrentIndex((index) => index + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    finishRound(session);
  };

  const copyDeepeningPrompt = async () => {
    if (!deepeningPrompt) return;
    try {
      await navigator.clipboard.writeText(deepeningPrompt);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = deepeningPrompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setDeepeningCopied(true);
    window.setTimeout(() => setDeepeningCopied(false), 1800);
  };

  const currentQuestionId = session?.questionIds[currentIndex];
  const currentQuestion = currentQuestionId ? practiceIndex.questions.get(currentQuestionId) : undefined;
  const currentAnswer = currentQuestionId ? session?.answers[currentQuestionId] : undefined;
  const selectedCorrect = currentQuestion && currentAnswer
    ? currentAnswer.optionId === currentQuestion.answer.correctOptionId
    : false;

  return (
    <div dir="rtl" lang="ar" data-practice-page className="min-h-screen bg-[#f5f6fa] px-4 py-5 font-sans text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
            <ArrowRight className="h-4 w-4" /> المنهج
          </button>
          <span className="rounded-full bg-violet-100 px-3 py-1.5 text-[10px] font-extrabold text-violet-800">تدريب على مهارة واحدة</span>
        </div>

        <section className="mt-4 overflow-hidden rounded-[28px] bg-slate-950 p-5 text-white sm:p-7">
          <small className="text-[10px] font-extrabold text-violet-300">{skillContext.unit.title} · {skillContext.lesson.title}</small>
          <h1 className="mt-2 text-2xl font-black leading-10">{skillContext.skill.title}</h1>
          <p className="mt-2 text-xs font-medium leading-6 text-slate-300">كل جولة ٥ أسئلة. بعد كل إجابة سترى التصحيح والسبب مباشرة، والجولة الثانية تستخدم أسئلة مختلفة تمامًا.</p>
        </section>

        {!session && completedSessions.length === 0 && (
          <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="grid grid-cols-2 gap-3">
              <InfoStat value="٥" label="أسئلة في الجولة" />
              <InfoStat value="٢" label="جولتان بلا تكرار" />
            </div>
            <div className="mt-4 rounded-2xl bg-violet-50 p-4 text-xs font-medium leading-6 text-violet-950">
              الهدف هنا أن تتعلم من الخطأ، وليس أن تحصل على درجة فقط. اختر إجابتك أولًا؛ بعدها يظهر الشرح ولا يمكنك تغيير الإجابة داخل نفس الجولة.
            </div>
            <button data-practice-start type="button" onClick={startRound} className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 text-sm font-black text-white">
              <Dumbbell className="h-5 w-5" /> ابدأ الجولة الأولى
            </button>
          </section>
        )}

        {session && !result && currentQuestion && (
          <section data-practice-question data-question-id={currentQuestion.id} className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,.06)]">
            <div className="border-b border-slate-100 bg-slate-50/80 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black text-slate-950">السؤال {currentIndex + 1} من {session.questionIds.length}</span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold text-slate-500 ring-1 ring-slate-200">{difficultyLabel(currentQuestion.difficulty)}</span>
              </div>
              <div className="mt-4 text-base font-black leading-9 text-slate-950"><ArabicRichContent content={currentQuestion.stem} /></div>
            </div>

            <div className="space-y-2.5 p-4 sm:p-5">
              {currentQuestion.options.map((option) => {
                const selected = currentAnswer?.optionId === option.id;
                const correct = option.id === currentQuestion.answer.correctOptionId;
                const answered = Boolean(currentAnswer);
                const tone = !answered
                  ? "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/40"
                  : correct
                    ? "border-emerald-300 bg-emerald-50"
                    : selected
                      ? "border-rose-300 bg-rose-50"
                      : "border-slate-200 bg-slate-50 text-slate-400";
                return (
                  <button
                    key={option.id}
                    data-practice-option
                    type="button"
                    disabled={answered}
                    onClick={() => answerCurrent(option.id)}
                    className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border p-3.5 text-right transition ${tone}`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${answered && correct ? "bg-emerald-600 text-white" : answered && selected ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"}`}>{option.label}</span>
                    <span className="min-w-0 flex-1 text-sm font-bold leading-7"><ArabicRichContent content={option.content} /></span>
                  </button>
                );
              })}

              {currentAnswer && (
                <div data-practice-feedback className={`mt-4 rounded-2xl border p-4 ${selectedCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
                  <strong className={`flex items-center gap-2 text-sm font-black ${selectedCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                    {selectedCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    {selectedCorrect ? "إجابة صحيحة" : "ليست الإجابة الصحيحة"}
                  </strong>
                  <div className="mt-2 text-xs font-medium leading-7 text-slate-700"><ArabicRichContent content={currentQuestion.answer.explanation} /></div>
                </div>
              )}

              <button
                data-practice-next
                type="button"
                disabled={!currentAnswer}
                onClick={goNext}
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                {currentIndex === session.questionIds.length - 1 ? "اعرض نتيجة الجولة" : "السؤال التالي"}
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {result && (
          <section data-practice-round-result className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="bg-slate-950 p-5 text-white sm:p-6">
              <small className="text-[10px] font-extrabold text-violet-300">نتيجة الجولة {completedSessions.length}</small>
              <div className="mt-2 flex items-end gap-3">
                <strong className="text-4xl font-black">{result.correctCount}/{result.questionCount}</strong>
                <span className="pb-1 text-xs font-bold text-slate-400">إجابات صحيحة · {result.percentage}٪</span>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="rounded-2xl bg-violet-50 p-4">
                <span className="text-[10px] font-extrabold text-violet-700">قراءة حذرة للنتيجة</span>
                <strong className="mt-1 block text-sm font-black leading-7 text-violet-950">{evidence.statusLabel}</strong>
                <p className="mt-1 text-xs font-medium leading-6 text-violet-900">{evidence.confidenceLabel}</p>
                <p className="mt-2 text-xs font-bold leading-6 text-slate-700">{evidence.recommendation}</p>
              </div>

              {diagnosticRules.length > 0 && diagnostic.answeredCount > 0 && (
                <div data-practice-diagnostic className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="text-[10px] font-extrabold text-slate-500">تحليل ما يحتاج تعميقًا</span>
                  {diagnostic.weakFocuses.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {diagnostic.weakFocuses.map((focus) => (
                        <div key={focus.focusId} className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                          <strong className="block text-xs font-black leading-6 text-slate-900">{focus.focusLabel}</strong>
                          <span className="mt-0.5 block text-[10px] font-bold leading-5 text-rose-700">أخطأت في {focus.missCount} من {focus.askedCount} سؤال/أسئلة ظهرت في هذه النقطة.</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs font-bold leading-6 text-emerald-800">لم تظهر نقطة ضعف واضحة في الأسئلة التي أجبت عنها؛ سيطلب الأمر التالي تعميق الفهم بمسائل أصعب قليلًا داخل نفس الدرس.</p>
                  )}

                  <button
                    data-practice-deepening-prompt
                    type="button"
                    onClick={copyDeepeningPrompt}
                    className={`mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-3 text-center text-xs font-black text-white ${deepeningCopied ? "bg-emerald-600" : "bg-slate-950"}`}
                  >
                    <Copy className="h-4 w-4" />
                    {deepeningCopied ? "تم نسخ أمر تعميق الفهم" : "انسخ أمر تعميق الفهم بناءً على نتيجتك"}
                  </button>
                  <p className="mt-2 text-[9px] font-medium leading-5 text-slate-500">الأمر المنسوخ يصف النتيجة ونقاط الضعف التعليمية فقط، ثم يطلب شرحًا وأمثلة وتحققًا مناسبًا لها.</p>
                </div>
              )}

              {completedSessions.length < 2 ? (
                <button data-practice-next-round type="button" onClick={startRound} className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 text-sm font-black text-white">
                  <RotateCcw className="h-4 w-4" /> ابدأ الجولة الثانية بأسئلة جديدة
                </button>
              ) : (
                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-center">
                  <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-700" />
                  <strong className="mt-2 block text-sm font-black text-emerald-950">أكملت جولتين دون تكرار مباشر</strong>
                  <p className="mt-1 text-xs font-medium leading-6 text-emerald-900">أجبت عن {evidence.uniqueQuestionCount} أسئلة مختلفة على هذه المهارة.</p>
                </div>
              )}

              <button type="button" onClick={onBack} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-xs font-extrabold text-slate-700">
                <ArrowRight className="h-4 w-4" /> العودة إلى المنهج
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function InfoStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4 text-center"><strong className="block text-2xl font-black text-slate-950">{value}</strong><span className="mt-1 block text-[10px] font-extrabold text-slate-500">{label}</span></div>;
}

function difficultyLabel(difficulty: "easy" | "medium" | "hard") {
  if (difficulty === "easy") return "سهل";
  if (difficulty === "medium") return "متوسط";
  return "متقدم";
}
