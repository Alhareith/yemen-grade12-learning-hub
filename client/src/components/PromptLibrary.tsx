import { useMemo, useState } from "react";
import { Check, Clipboard, Sparkles } from "lucide-react";
import {
  getRecommendedPrompts,
  promptSituationGroups,
  type PromptSituation,
  type StudyPrompt,
} from "@/data/promptCatalog";

type PromptLibraryProps = {
  subject: string;
  units?: string[];
};

export default function PromptLibrary({ subject, units = [] }: PromptLibraryProps) {
  const [situation, setSituation] = useState<PromptSituation>("lost");
  const [selectedPrompt, setSelectedPrompt] = useState<StudyPrompt | null>(null);
  const [unit, setUnit] = useState(units[0] ?? "");
  const [lesson, setLesson] = useState("");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const prompts = useMemo(
    () => getRecommendedPrompts(subject, situation),
    [subject, situation],
  );

  const generatedPrompt = selectedPrompt?.build({
    subject,
    unit: unit || undefined,
    lesson: lesson || undefined,
    input: input || undefined,
  }) ?? "";

  const chooseSituation = (next: PromptSituation) => {
    setSituation(next);
    setSelectedPrompt(null);
    setInput("");
    setCopied(false);
  };

  const choosePrompt = (prompt: StudyPrompt) => {
    setSelectedPrompt(prompt);
    setInput("");
    setCopied(false);
  };

  const copyPrompt = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = generatedPrompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="prompts" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,.06)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-extrabold text-violet-700">
              <Sparkles className="h-4 w-4" />
              مساعد البرومبتات
            </span>
            <h2 className="mt-4 font-kufi text-2xl leading-relaxed text-slate-950 sm:text-3xl">
              ما وضعك الآن في {subject}؟
            </h2>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-500 sm:text-base">
              لا تحتاج أن تعرف كيف تكتب برومبت. اختر مشكلتك، ثم انسخ توجيهًا مصممًا ليجعل الذكاء الاصطناعي يعلّمك بدل أن يحل عنك.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs font-bold leading-6 text-slate-500">
            لا توجد دردشة داخل الموقع · البرومبت يُنسخ لاستخدامه في الأداة التي تفضّلها
          </div>
        </div>

        <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {promptSituationGroups.map((group) => {
            const active = group.id === situation;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => chooseSituation(group.id)}
                className={`min-h-[92px] rounded-2xl border p-4 text-right transition-all ${active ? "border-violet-500 bg-violet-50 shadow-[0_10px_30px_rgba(109,40,217,.08)]" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
              >
                <strong className={`block text-sm ${active ? "text-violet-800" : "text-slate-900"}`}>{group.title}</strong>
                <span className="mt-1.5 block text-xs font-medium leading-5 text-slate-500">{group.description}</span>
              </button>
            );
          })}
        </div>

        {(units.length > 0 || true) && (
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {units.length > 0 && (
              <label className="block">
                <span className="mb-2 block text-xs font-extrabold text-slate-600">الوحدة أو المحور</span>
                <select
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                >
                  <option value="">بدون تحديد وحدة</option>
                  {units.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            )}
            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-600">اسم الدرس أو الفكرة — اختياري</span>
              <input
                value={lesson}
                onChange={(event) => setLesson(event.target.value)}
                placeholder="مثال: مشتقة الدالة، الأكسدة والاختزال…"
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>
          </div>
        )}

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-violet-700">الأنسب لحالتك</span>
              <h3 className="mt-1 text-lg font-black text-slate-950">اختر نوع المساعدة</h3>
            </div>
            <span className="text-xs font-bold text-slate-400">{prompts.length} خيارات مرتبة</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => {
              const active = selectedPrompt?.id === prompt.id;
              return (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => choosePrompt(prompt)}
                  className={`group rounded-2xl border p-4 text-right transition-all ${active ? "border-slate-900 bg-slate-950 text-white shadow-[0_16px_35px_rgba(15,23,42,.16)]" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,.06)]"}`}
                >
                  <span className={`text-[10px] font-extrabold ${active ? "text-violet-300" : "text-violet-700"}`}>مرحلة {stageLabel(prompt.stage)}</span>
                  <strong className="mt-2 block text-sm font-black">{prompt.title}</strong>
                  <span className={`mt-2 block text-xs font-medium leading-6 ${active ? "text-slate-300" : "text-slate-500"}`}>{prompt.shortDescription}</span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedPrompt && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
              <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-l lg:p-6">
                <span className="text-xs font-extrabold text-violet-700">خصّصه قبل النسخ</span>
                <h3 className="mt-2 text-xl font-black text-slate-950">{selectedPrompt.title}</h3>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-500">{selectedPrompt.shortDescription}</p>

                {selectedPrompt.inputLabel && (
                  <label className="mt-5 block">
                    <span className="mb-2 block text-xs font-extrabold text-slate-700">{selectedPrompt.inputLabel}</span>
                    <textarea
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder={selectedPrompt.inputPlaceholder}
                      rows={7}
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />
                  </label>
                )}
              </div>

              <div className="flex min-h-[300px] flex-col p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-extrabold text-slate-500">البرومبت الجاهز</span>
                    <p className="mt-1 text-xs font-medium text-slate-400">يمكنك نسخه كما هو أو إضافة تفاصيلك أولًا.</p>
                  </div>
                  <button
                    type="button"
                    onClick={copyPrompt}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-extrabold transition ${copied ? "bg-emerald-600 text-white" : "bg-slate-950 text-white hover:bg-slate-800"}`}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    {copied ? "تم النسخ" : "نسخ البرومبت"}
                  </button>
                </div>
                <pre className="mt-4 flex-1 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-4 text-right font-sans text-[13px] font-medium leading-7 text-slate-700">{generatedPrompt}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function stageLabel(stage: StudyPrompt["stage"]) {
  const labels: Record<StudyPrompt["stage"], string> = {
    diagnose: "التشخيص",
    learn: "الفهم",
    apply: "التطبيق",
    correct: "التصحيح",
    retain: "التثبيت",
    master: "الإتقان",
    exam: "الاختبار",
  };
  return labels[stage];
}
