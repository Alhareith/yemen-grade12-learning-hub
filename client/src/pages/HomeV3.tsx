import { useMemo, useState, type ComponentType } from "react";
import {
  Atom,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  BookOpenText,
  BrainCircuit,
  ChevronDown,
  ChevronLeft,
  Compass,
  Dna,
  ExternalLink,
  Facebook,
  FileQuestion,
  FileText,
  FlaskConical,
  Github,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Home,
  Languages,
  Library,
  Linkedin,
  Mail,
  PlayCircle,
  Quote,
  Scale,
  ScrollText,
  Send,
  Sigma,
  Sparkles,
  Target,
  Type,
} from "lucide-react";
import PromptLibrary from "@/components/PromptLibrary";
import {
  examChannels,
  materials,
  resourceCategories,
  type MaterialCatalog,
  type ResourceCard,
} from "@/data/richCatalog";
import { unitExpansions, type UnitLink } from "@/data/unitExpansions";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;
type View = "home" | "subjects" | "prompts" | "resources" | "exams";
type ResourceMode = "sources" | "units";

const PROFILE_IMAGE_URL = "https://alharethprofilo.netlify.app/assets/alhareth-profile.webp";

const subjectIcons: Record<string, IconType> = {
  "رياضيات": Sigma,
  "فيزياء": Atom,
  "كيمياء": FlaskConical,
  "أحياء": Dna,
  "لغة إنجليزية": Languages,
  "نحو وصرف": Type,
  "أدب ونصوص وبلاغة": BookOpenText,
  "قراءة": BookMarked,
  "قرآن كريم": ScrollText,
  "حديث وتهذيب": Quote,
  "إيمان": HeartHandshake,
  "فقه": Scale,
  "سيرة نبوية": Compass,
};

const subjectTone: Record<string, string> = {
  "رياضيات": "bg-violet-50 text-violet-700",
  "فيزياء": "bg-blue-50 text-blue-700",
  "كيمياء": "bg-emerald-50 text-emerald-700",
  "أحياء": "bg-teal-50 text-teal-700",
  "لغة إنجليزية": "bg-amber-50 text-amber-700",
  "نحو وصرف": "bg-rose-50 text-rose-700",
  "أدب ونصوص وبلاغة": "bg-fuchsia-50 text-fuchsia-700",
  "قراءة": "bg-orange-50 text-orange-700",
};

const categoryIcons: Record<string, IconType> = {
  books: BookOpenCheck,
  youtube: PlayCircle,
  telegram: Send,
  tests: FileQuestion,
  reviews: FileText,
};

const viewTitles: Record<View, string> = {
  home: "الرئيسية",
  subjects: "المواد",
  prompts: "البرومبتات",
  resources: "المصادر",
  exams: "الاختبارات",
};

const socialLinks = [
  { label: "الموقع الشخصي", href: "https://alharethprofilo.netlify.app/", icon: Globe2 },
  { label: "GitHub", href: "https://github.com/Alhareith", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB-%D8%A7%D9%84%D8%AF%D8%A7%D9%87%D9%8A%D8%A9-95b4a831a", icon: Linkedin },
  { label: "Hugging Face", href: "https://huggingface.co/Alhareith7790", icon: Sparkles },
  { label: "Telegram", href: "https://t.me/devhareth", icon: Send },
  { label: "Facebook", href: "https://www.facebook.com/alharth.aldahyt/", icon: Facebook },
  { label: "البريد", href: "mailto:alhareithaldahia@gmail.com", icon: Mail },
];

export default function HomeV3() {
  const [view, setView] = useState<View>("home");
  const [selectedId, setSelectedId] = useState("رياضيات");
  const [filter, setFilter] = useState("all");
  const [resourceMode, setResourceMode] = useState<ResourceMode>("sources");

  const selected = materials.find((material) => material.id === selectedId) ?? materials[0];
  const selectedUnits = useMemo(
    () => unitExpansions.filter((unit) => unit.subjectId === selected.id),
    [selected.id],
  );
  const selectedUnitTitles = useMemo(
    () => selectedUnits.map((unit) => unit.title),
    [selectedUnits],
  );
  const visibleSources = useMemo(
    () => filter === "all" ? selected.sources : selected.sources.filter((source) => source.category === filter),
    [filter, selected],
  );

  const go = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseSubject = (material: MaterialCatalog) => {
    setSelectedId(material.id);
    setFilter("all");
    setResourceMode("sources");
    go("home");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f6fa] pb-24 font-sans text-slate-950 md:pb-0">
      <AppHeader view={view} onNavigate={go} />

      <main className="min-h-[70vh]">
        {view === "home" && (
          <HomeView
            selected={selected}
            unitCount={selectedUnits.length}
            onNavigate={go}
            onOpenUnits={() => {
              setResourceMode("units");
              go("resources");
            }}
          />
        )}

        {view === "subjects" && (
          <SubjectsView selectedId={selected.id} onSelect={chooseSubject} />
        )}

        {view === "prompts" && (
          <PromptLibrary subject={selected.title} units={selectedUnitTitles} />
        )}

        {view === "resources" && (
          <ResourcesView
            selected={selected}
            selectedUnits={selectedUnits}
            visibleSources={visibleSources}
            filter={filter}
            onFilter={setFilter}
            mode={resourceMode}
            onMode={setResourceMode}
            onChangeSubject={() => go("subjects")}
          />
        )}

        {view === "exams" && <ExamsView />}
      </main>

      {view !== "prompts" && <DeveloperFooter />}
      <MobileTabs view={view} onNavigate={go} />
    </div>
  );
}

function AppHeader({ view, onNavigate }: { view: View; onNavigate: (view: View) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={() => onNavigate("home")} className="flex items-center gap-2.5 text-right">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white"><BookOpen className="h-4.5 w-4.5" /></span>
          <span>
            <strong className="block text-sm font-black text-slate-950">دليل الثالث</strong>
            <small className="block text-[10px] font-bold text-slate-400">{viewTitles[view]}</small>
          </span>
        </button>

        <nav className="hidden items-center gap-1 rounded-2xl bg-slate-100 p-1 md:flex" aria-label="أقسام الموقع">
          <DesktopTab active={view === "home"} onClick={() => onNavigate("home")} label="الرئيسية" />
          <DesktopTab active={view === "subjects"} onClick={() => onNavigate("subjects")} label="المواد" />
          <DesktopTab active={view === "prompts"} onClick={() => onNavigate("prompts")} label="البرومبتات" />
          <DesktopTab active={view === "resources"} onClick={() => onNavigate("resources")} label="المصادر" />
          <DesktopTab active={view === "exams"} onClick={() => onNavigate("exams")} label="الاختبارات" />
        </nav>

        <button type="button" onClick={() => onNavigate("prompts")} className="flex min-h-10 items-center gap-2 rounded-xl bg-violet-700 px-3 text-xs font-extrabold text-white md:hidden">
          <Sparkles className="h-4 w-4" />
          برومبت
        </button>
      </div>
    </header>
  );
}

function DesktopTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button type="button" onClick={onClick} className={`rounded-xl px-3 py-2 text-xs font-extrabold ${active ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>{label}</button>;
}

function HomeView({ selected, unitCount, onNavigate, onOpenUnits }: {
  selected: MaterialCatalog;
  unitCount: number;
  onNavigate: (view: View) => void;
  onOpenUnits: () => void;
}) {
  const Icon = subjectIcons[selected.id] ?? BookOpenText;
  const tone = subjectTone[selected.id] ?? "bg-slate-100 text-slate-700";

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
      <section className="rounded-[26px] bg-slate-950 p-5 text-white sm:p-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-extrabold text-violet-300"><GraduationCap className="h-4 w-4" /> الثالث الثانوي · اليمن</span>
        <h1 className="mt-3 text-2xl font-black leading-10 sm:text-3xl">ماذا تريد أن تفعل الآن؟</h1>
        <p className="mt-2 max-w-xl text-sm font-medium leading-7 text-slate-300">الموقع مقسّم إلى شاشات واضحة. اختر حاجتك وانتقل لها مباشرة، بدون تمرير طويل بين أقسام لا تحتاجها.</p>
      </section>

      <section className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <button type="button" onClick={() => onNavigate("subjects")} className="flex w-full items-center gap-3 border-b border-slate-100 p-4 text-right sm:p-5">
          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></span>
          <span className="min-w-0 flex-1">
            <small className="text-[10px] font-extrabold text-slate-400">المادة الحالية</small>
            <strong className="block text-base font-black text-slate-950">{selected.title}</strong>
          </span>
          <span className="text-[10px] font-extrabold text-violet-700">تغيير</span>
          <ChevronLeft className="h-4 w-4 text-slate-300" />
        </button>

        <ActionRow icon={BrainCircuit} title="استخدم برومبت جاهز" description="اختر حالتك وافتح البرومبت ثم انسخه." accent onClick={() => onNavigate("prompts")} />
        <ActionRow icon={Library} title="افتح مصادر المادة" description={`${selected.sources.length} مصدرًا منظمًا حسب النوع.`} onClick={() => onNavigate("resources")} />
        <ActionRow icon={BookOpenCheck} title="راجع حسب الوحدة" description={unitCount > 0 ? `${unitCount} وحدات أو محاور مركزة.` : "يمكنك تحديد اسم الدرس داخل البرومبت."} onClick={unitCount > 0 ? onOpenUnits : () => onNavigate("prompts")} />
        <ActionRow icon={Target} title="اختبر نفسك" description="نماذج واختبارات ومصادر مراجعة." onClick={() => onNavigate("exams")} />
      </section>

      <section className="mt-5 rounded-3xl border border-violet-100 bg-violet-50 p-4 sm:p-5">
        <span className="text-[10px] font-extrabold text-violet-700">فكرة الاستخدام</span>
        <p className="mt-1 text-sm font-bold leading-7 text-violet-950">إذا لم تفهم: افتح البرومبتات. إذا فهمت وتريد مصدرًا أو فيديو: افتح المصادر. إذا تريد قياس نفسك: افتح الاختبارات.</p>
      </section>
    </div>
  );
}

function ActionRow({ icon: Icon, title, description, onClick, accent = false }: {
  icon: IconType;
  title: string;
  description: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 border-b border-slate-100 p-4 text-right transition last:border-0 hover:bg-slate-50 active:bg-slate-100 sm:p-5">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${accent ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-600"}`}><Icon className="h-4.5 w-4.5" /></span>
      <span className="min-w-0 flex-1">
        <strong className="block text-sm font-black text-slate-950">{title}</strong>
        <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{description}</span>
      </span>
      <ChevronLeft className="h-5 w-5 shrink-0 text-slate-300" />
    </button>
  );
}

function SubjectsView({ selectedId, onSelect }: { selectedId: string; onSelect: (material: MaterialCatalog) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8">
      <PageHeading title="اختر المادة" description="بعد الاختيار ستصبح هذه المادة هي السياق المشترك للمصادر والبرومبتات." />
      <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {materials.map((material) => {
          const Icon = subjectIcons[material.id] ?? BookOpenText;
          const tone = subjectTone[material.id] ?? "bg-slate-100 text-slate-700";
          const active = selectedId === material.id;
          return (
            <button key={material.id} type="button" onClick={() => onSelect(material)} className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-right last:border-0 sm:p-5 ${active ? "bg-violet-50/50" : "hover:bg-slate-50"}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm font-black text-slate-950">{material.title}</strong>
                <span className="mt-1 block text-xs font-medium text-slate-500">{material.sources.length} مصادر {material.bookOnly ? "· كتاب رسمي" : "· شرح وتدريب"}</span>
              </span>
              {active && <span className="rounded-full bg-violet-100 px-2 py-1 text-[9px] font-extrabold text-violet-700">الحالية</span>}
              <ChevronLeft className="h-5 w-5 shrink-0 text-slate-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResourcesView({ selected, selectedUnits, visibleSources, filter, onFilter, mode, onMode, onChangeSubject }: {
  selected: MaterialCatalog;
  selectedUnits: ReturnType<typeof unitExpansions.filter>;
  visibleSources: ResourceCard[];
  filter: string;
  onFilter: (value: string) => void;
  mode: ResourceMode;
  onMode: (mode: ResourceMode) => void;
  onChangeSubject: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
      <div className="flex items-end justify-between gap-3">
        <PageHeading title={`مصادر ${selected.title}`} description="اختر المصادر أو الوحدات، ثم افتح ما تحتاجه فقط." />
        <button type="button" onClick={onChangeSubject} className="mb-1 shrink-0 rounded-xl bg-white px-3 py-2 text-[10px] font-extrabold text-violet-700 ring-1 ring-slate-200">تغيير المادة</button>
      </div>

      <div className="mt-5 grid grid-cols-2 rounded-2xl bg-slate-200/70 p-1">
        <button type="button" onClick={() => onMode("sources")} className={`min-h-10 rounded-xl text-xs font-extrabold ${mode === "sources" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>المصادر</button>
        <button type="button" onClick={() => onMode("units")} className={`min-h-10 rounded-xl text-xs font-extrabold ${mode === "units" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>حسب الوحدة</button>
      </div>

      {mode === "sources" ? (
        <>
          <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="tablist" aria-label="نوع المصدر">
            {resourceCategories.map((category) => {
              const count = category.id === "all" ? selected.sources.length : selected.sources.filter((source) => source.category === category.id).length;
              if (category.id !== "all" && count === 0) return null;
              const active = filter === category.id;
              return <button key={category.id} type="button" onClick={() => onFilter(category.id)} className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-extrabold ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{category.label} · {count}</button>;
            })}
          </div>
          <div className="mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            {visibleSources.map((source) => <ResourceRow key={source.id} source={source} />)}
          </div>
        </>
      ) : (
        <div className="mt-4 space-y-3">
          {selectedUnits.length > 0 ? selectedUnits.map((unit, index) => (
            <details key={unit.title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden sm:p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <small className="text-[9px] font-extrabold text-violet-700">{unit.label}</small>
                  <strong className="block text-sm font-black leading-6 text-slate-950">{unit.title}</strong>
                  <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{unit.note}</span>
                </span>
                <ChevronDown className="mt-2 h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <div className="border-t border-slate-100 divide-y divide-slate-100">
                {unit.links.map((link) => <UnitRow key={`${unit.title}-${link.title}`} link={link} />)}
              </div>
            </details>
          )) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
              <BookOpenCheck className="mx-auto h-8 w-8 text-slate-300" />
              <strong className="mt-3 block text-sm font-black text-slate-900">لا توجد وحدات مفهرسة لهذه المادة بعد</strong>
              <p className="mt-1 text-xs font-medium leading-6 text-slate-500">يمكنك استخدام الكتاب الرسمي أو تحديد اسم الدرس يدويًا في قسم البرومبتات.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResourceRow({ source }: { source: ResourceCard }) {
  const Icon = categoryIcons[source.category] ?? FileText;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-slate-100 p-4 text-right last:border-0 hover:bg-slate-50 sm:p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600"><Icon className="h-4.5 w-4.5" /></span>
      <span className="min-w-0 flex-1">
        <small className="text-[9px] font-extrabold text-violet-700">{source.badge}{source.handle ? ` · ${source.handle}` : ""}</small>
        <strong className="mt-0.5 block text-xs font-black leading-6 text-slate-950 sm:text-sm">{source.title}</strong>
        <span className="mt-1 line-clamp-2 block text-[11px] font-medium leading-5 text-slate-500">{source.detail || source.platform}</span>
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 text-slate-300" />
    </a>
  );
}

function UnitRow({ link }: { link: UnitLink }) {
  const Icon = link.kind === "قناة Telegram" ? Send : link.kind === "اختبارات" ? FileQuestion : PlayCircle;
  return (
    <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 text-right hover:bg-slate-50">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Icon className="h-4 w-4" /></span>
      <span className="min-w-0 flex-1"><small className="text-[9px] font-extrabold text-violet-700">{link.kind}</small><strong className="block text-xs font-black leading-6 text-slate-950">{link.title}</strong></span>
      <ExternalLink className="h-4 w-4 text-slate-300" />
    </a>
  );
}

function ExamsView() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8">
      <PageHeading title="الاختبارات والمراجعة" description="ابدأ بالمحاكاة التفاعلية داخل الموقع، أو افتح مصادر اختبارات إضافية." />

      <a href="#exam-pilot" className="mt-5 block overflow-hidden rounded-3xl border border-violet-200 bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,.08)] transition hover:-translate-y-0.5">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200"><Target className="h-6 w-6" /></span>
            <span className="min-w-0 flex-1">
              <small className="text-[10px] font-extrabold text-violet-300">اختبار تفاعلي داخل الموقع · متاح الآن</small>
              <strong className="mt-1 block text-lg font-black leading-8">محاكاة التفاضل والتكامل</strong>
              <span className="mt-1 block text-xs font-medium leading-6 text-slate-300">50 سؤالًا · 80 درجة · مؤقت اختياري · حفظ واستكمال · نتيجة ومراجعة أخطاء وتحليل مهارات.</span>
            </span>
            <ChevronLeft className="mt-4 h-5 w-5 shrink-0 text-violet-300" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[9px] font-extrabold text-slate-300">
            <span className="rounded-full bg-white/10 px-2.5 py-1.5">20 صح/خطأ</span>
            <span className="rounded-full bg-white/10 px-2.5 py-1.5">30 اختيارًا</span>
            <span className="rounded-full bg-white/10 px-2.5 py-1.5">مراجعة موجهة بعد التسليم</span>
          </div>
        </div>
      </a>

      <div className="mt-6">
        <span className="text-[10px] font-extrabold text-slate-400">مصادر اختبارات إضافية</span>
        <div className="mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          {examChannels.map((channel) => (
            <a key={channel.url} href={channel.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-slate-100 p-4 text-right last:border-0 hover:bg-slate-50 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><FileQuestion className="h-4.5 w-4.5" /></span>
              <span className="min-w-0 flex-1">
                <small className="text-[9px] font-extrabold text-amber-700">{channel.badge}</small>
                <strong className="block text-sm font-black leading-6 text-slate-950">{channel.title}</strong>
                <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{channel.handle} · {channel.detail}</span>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-300" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageHeading({ title, description }: { title: string; description: string }) {
  return <div><h1 className="text-2xl font-black leading-9 text-slate-950">{title}</h1><p className="mt-1 max-w-2xl text-sm font-medium leading-7 text-slate-500">{description}</p></div>;
}

function DeveloperFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <a href="https://alharethprofilo.netlify.app/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
          <img src={PROFILE_IMAGE_URL} alt="الحارث الداهية" loading="lazy" decoding="async" className="h-12 w-12 rounded-2xl object-cover" />
          <span className="min-w-0 flex-1">
            <small className="text-[9px] font-extrabold text-violet-700">تصميم وتطوير</small>
            <strong className="block text-sm font-black text-slate-950">الحارث الداهية</strong>
            <span className="block text-[10px] font-medium text-slate-500">زيارة الموقع الشخصي والملف التعريفي</span>
          </span>
          <ExternalLink className="h-4 w-4 text-slate-300" />
        </a>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            const email = social.href.startsWith("mailto:");
            return <a key={social.label} href={social.href} target={email ? undefined : "_blank"} rel={email ? undefined : "noreferrer"} className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-2 text-[10px] font-extrabold text-slate-600 hover:border-violet-200 hover:text-violet-700"><Icon className="h-3.5 w-3.5" />{social.label}</a>;
          })}
        </div>

        <p className="mt-5 text-center text-[10px] font-medium leading-5 text-slate-400">المصادر الخارجية تفتح في منصاتها الأصلية · دليل الثالث الثانوي اليمني</p>
      </div>
    </footer>
  );
}

function MobileTabs({ view, onNavigate }: { view: View; onNavigate: (view: View) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white/98 px-1 pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-8px_30px_rgba(15,23,42,.08)] backdrop-blur-xl md:hidden" aria-label="أقسام الموقع">
      <MobileTab icon={Home} label="الرئيسية" active={view === "home"} onClick={() => onNavigate("home")} />
      <MobileTab icon={Library} label="المواد" active={view === "subjects"} onClick={() => onNavigate("subjects")} />
      <MobileTab icon={Sparkles} label="البرومبتات" active={view === "prompts"} onClick={() => onNavigate("prompts")} />
      <MobileTab icon={BookOpenCheck} label="المصادر" active={view === "resources"} onClick={() => onNavigate("resources")} />
      <MobileTab icon={FileQuestion} label="الاختبارات" active={view === "exams"} onClick={() => onNavigate("exams")} />
    </nav>
  );
}

function MobileTab({ icon: Icon, label, active, onClick }: { icon: IconType; label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-extrabold ${active ? "text-violet-700" : "text-slate-400"}`}>
      <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
      {label}
    </button>
  );
}
