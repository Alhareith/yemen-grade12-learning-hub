import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clipboard,
  ClipboardPaste,
  ChevronLeft,
  Eraser,
  Sparkles,
} from "lucide-react";
import {
  getRecommendedPrompts,
  promptSituationGroups,
  type PromptSituation,
  type StudyPrompt,
} from "@/data/promptCatalog";
import { buildArabicOutputPolicy } from "@shared/prompts/arabic-output-policy";

type PromptLibraryProps = {
  subject: string;
  units?: string[];
};

export default function PromptLibrary({ subject, units = [] }: PromptLibraryProps) {
  const [situation, setSituation] = useState<PromptSituation>("lost");
  const [selectedPrompt, setSelectedPrompt] = useState<StudyPrompt | null>(null);
  const [unit, setUnit] = useState("");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSituation("lost");
    setSelectedPrompt(null);
    setUnit("");
    setInput("");
    setCopied(false);
  }, [subject]);

  const prompts = useMemo(
    () => getRecommendedPrompts(subject, situation),
    [subject, situation],
  );

  const generatedPrompt = useMemo(() => {
    if (!selectedPrompt) return "";

    const basePrompt = selectedPrompt.build({
      subject,
      unit: unit || undefined,
      input: input || undefined,
    });

    const extraContext = input && !selectedPrompt.inputLabel
      ? `\n\nسياق إضافي من الطالب:\n${input}`
      : "";

    return `${basePrompt}${extraContext}\n\n${buildArabicOutputPolicy(subject)}`;
  }, [input, selectedPrompt, subject, unit]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closePrompt = () => {
    setSelectedPrompt(null);
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyPrompt = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = generatedPrompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) setInput(text.trim());
    } catch {
      // Clipboard read can be blocked by browser permissions; manual paste remains available.
    }
  };

  if (selectedPrompt) {
    const inputLabel = selectedPrompt.inputLabel ?? "أضف سؤالك أو النص — اختياري";
    const inputPlaceholder = selectedPrompt.inputPlaceholder
      ?? "الصق السؤال أو الفقرة أو محاولتك كما هي، أو اكتب النقطة التي تريد التركيز عليها…";

    return (
      <div data-prompt-library dir="rtl" className="mx-auto w-full max-w-4xl px-4 pb-28 pt-4 sm:px-6 md:pb-10">
        <button
          type="button"
          onClick={closePrompt}
          className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 text-sm font-extrabold text-slate-700 shadow-sm ring-1 ring-slate-200"
        >
          <ArrowRight className="h-4 w-4" />
          الرجوع إلى الأوامر
        </button>

        <article className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,.06)]">
          <div className="border-b border-slate-100 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[11px] font-extrabold text-violet-700">{stageLabel(selectedPrompt.stage)} · {subject}</span>
                <h2 className="mt-2 text-xl font-black leading-8 text-slate-950 sm:text-2xl">{selectedPrompt.title}</h2>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-500">{selectedPrompt.shortDescription}</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <Sparkles className="h-5 w-5" />
              </span>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-7">
            {units.length > 0 && (
              <label className="block">
                <span className="mb-2 block text-xs font-extrabold text-slate-700">الوحدة أو المحور — اختياري</span>
                <select
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-800 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                >
                  <option value="">لا أعرف الوحدة / لا أحتاج تحديدها</option>
                  {units.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            )}

            <label className="block">
              <span className="mb-2 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <span className="text-xs font-extrabold text-slate-700">{inputLabel}</span>
                <span className="text-[10px] font-bold leading-5 text-slate-400">كلما كان النص الأصلي أوضح كانت النتيجة أدق</span>
              </span>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={inputPlaceholder}
                rows={6}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-medium leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-700 transition hover:bg-slate-50"
              >
                <ClipboardPaste className="h-4 w-4" />
                لصق من الحافظة
              </button>
              {input && (
                <button
                  type="button"
                  onClick={() => setInput("")}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-500 transition hover:bg-slate-50"
                >
                  <Eraser className="h-4 w-4" />
                  مسح
                </button>
              )}
            </div>

            <div>
              <div className="mb-2">
                <span className="block text-xs font-extrabold text-slate-700">الأمر الجاهز</span>
                <span className="mt-1 block text-[10px] font-bold leading-5 text-slate-400">انسخه كما هو واسأل به أي ذكاء اصطناعي متوفر لديك.</span>
              </div>
              <pre data-generated-prompt className="whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-slate-950 p-4 text-right font-sans text-[13px] font-medium leading-7 text-slate-100 sm:p-5">{generatedPrompt}</pre>
            </div>

            <button
              data-copy-prompt
              type="button"
              onClick={copyPrompt}
              className={`hidden min-h-13 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-extrabold text-white transition md:flex ${copied ? "bg-emerald-600" : "bg-violet-700 hover:bg-violet-800"}`}
            >
              {copied ? <Check className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}
              {copied ? "تم نسخ الأمر" : "انسخ الأمر"}
            </button>
          </div>
        </article>

        <div className="fixed inset-x-0 bottom-[74px] z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-xl md:hidden">
          <button
            data-copy-prompt-mobile
            type="button"
            onClick={copyPrompt}
            className={`mx-auto flex min-h-13 w-full max-w-4xl items-center justify-center gap-2 rounded-2xl px-5 text-sm font-extrabold text-white ${copied ? "bg-emerald-600" : "bg-violet-700"}`}
          >
            {copied ? <Check className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}
            {copied ? "تم النسخ" : "انسخ الأمر"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-prompt-library dir="rtl" className="mx-auto w-full max-w-5xl px-4 pb-24 pt-4 sm:px-6 md:pb-10">
      <div className="mb-5">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-violet-700">
          <Sparkles className="h-4 w-4" />
          أوامر جاهزة
        </span>
        <h1 className="mt-2 max-w-3xl text-2xl font-black leading-10 text-slate-950">أوامر اسأل بها أي ذكاء اصطناعي متوفر لديك</h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-500">اختر حالتك في {subject}، ثم اختر الأمر المناسب وانسخه. أضف سؤالك فقط عندما تحتاج إلى تخصيصه.</p>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-4" role="tablist" aria-label="حالة الطالب">
        {promptSituationGroups.map((group) => {
          const active = group.id === situation;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => chooseSituation(group.id)}
              className={`min-h-[76px] w-[168px] shrink-0 rounded-2xl border p-3.5 text-right sm:w-auto ${active ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white"}`}
              role="tab"
              aria-selected={active}
            >
              <strong className={`block text-xs font-black leading-5 ${active ? "text-violet-800" : "text-slate-900"}`}>{group.title}</strong>
              <span className="mt-1 block text-[10px] font-medium leading-5 text-slate-500">{group.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-3">
          <span className="text-xs font-extrabold text-slate-500">الأنسب لحالتك · {prompts.length} خيارات</span>
        </div>
        <div className="divide-y divide-slate-100">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => choosePrompt(prompt)}
              className="flex w-full items-center gap-3 p-4 text-right transition hover:bg-slate-50 active:bg-slate-100 sm:p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold text-violet-700">{stageLabel(prompt.stage)}</span>
                <strong className="mt-0.5 block text-sm font-black leading-6 text-slate-950">{prompt.title}</strong>
                <span className="mt-1 block text-xs font-medium leading-6 text-slate-500">{prompt.shortDescription}</span>
              </span>
              <ChevronLeft className="h-5 w-5 shrink-0 text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function stageLabel(stage: StudyPrompt["stage"]) {
  const labels: Record<StudyPrompt["stage"], string> = {
    diagnose: "تشخيص",
    learn: "فهم",
    apply: "تطبيق",
    correct: "تصحيح",
    retain: "تثبيت",
    master: "إتقان",
    exam: "اختبار",
  };
  return labels[stage];
}
