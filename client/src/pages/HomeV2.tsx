import { useMemo, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  Atom,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  BookOpenText,
  BrainCircuit,
  ChevronDown,
  Compass,
  Dna,
  ExternalLink,
  FileQuestion,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Languages,
  Library,
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

type SubjectTone = {
  icon: string;
  active: string;
  dot: string;
};

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

const subjectTones: Record<string, SubjectTone> = {
  "رياضيات": { icon: "bg-violet-50 text-violet-700", active: "border-violet-500 bg-violet-50/60", dot: "bg-violet-500" },
  "فيزياء": { icon: "bg-blue-50 text-blue-700", active: "border-blue-500 bg-blue-50/60", dot: "bg-blue-500" },
  "كيمياء": { icon: "bg-emerald-50 text-emerald-700", active: "border-emerald-500 bg-emerald-50/60", dot: "bg-emerald-500" },
  "أحياء": { icon: "bg-teal-50 text-teal-700", active: "border-teal-500 bg-teal-50/60", dot: "bg-teal-500" },
  "لغة إنجليزية": { icon: "bg-amber-50 text-amber-700", active: "border-amber-500 bg-amber-50/60", dot: "bg-amber-500" },
  "نحو وصرف": { icon: "bg-rose-50 text-rose-700", active: "border-rose-500 bg-rose-50/60", dot: "bg-rose-500" },
  "أدب ونصوص وبلاغة": { icon: "bg-fuchsia-50 text-fuchsia-700", active: "border-fuchsia-500 bg-fuchsia-50/60", dot: "bg-fuchsia-500" },
  "قراءة": { icon: "bg-orange-50 text-orange-700", active: "border-orange-500 bg-orange-50/60", dot: "bg-orange-500" },
};

const defaultTone: SubjectTone = {
  icon: "bg-slate-100 text-slate-700",
  active: "border-slate-500 bg-slate-50",
  dot: "bg-slate-500",
};

const categoryIcons: Record<string, IconType> = {
  books: BookOpenCheck,
  youtube: PlayCircle,
  telegram: Send,
  tests: FileQuestion,
  reviews: FileText,
};

function scrollToSection(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomeV2() {
  const [selectedId, setSelectedId] = useState("رياضيات");
  const [filter, setFilter] = useState("all");

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

  const chooseMaterial = (material: MaterialCatalog) => {
    setSelectedId(material.id);
    setFilter("all");
    requestAnimationFrame(() => scrollToSection("#subject-space"));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f7f7fb] pb-20 font-sans text-slate-950 md:pb-0">
      <Header />

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)] lg:items-center">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-extrabold text-violet-700 shadow-sm">
                <GraduationCap className="h-4 w-4" />
                للثالث الثانوي · اليمن
              </span>
              <h1 className="mt-5 font-kufi text-[32px] leading-[1.7] tracking-[-.02em] text-slate-950 sm:text-[44px] lg:text-[52px]">
                ماذا تريد أن تدرس <span className="text-violet-700">اليوم؟</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] font-medium leading-8 text-slate-500 sm:text-lg">
                اختر المادة، ثم انتقل مباشرة إلى الكتاب أو الشرح أو التدريب. وإذا توقفت، استخدم برومبتًا جاهزًا يجعل الذكاء الاصطناعي يشرح لك ويختبرك بدل أن يحل عنك.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("#materials")}
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(15,23,42,.14)] transition hover:bg-slate-800 active:scale-[.98]"
                >
                  اختر مادة
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("#prompts")}
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-800 transition hover:border-violet-200 hover:bg-violet-50 active:scale-[.98]"
                >
                  <Sparkles className="h-4 w-4 text-violet-700" />
                  البرومبتات الجاهزة
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,.07)] sm:p-6">
              <span className="text-xs font-extrabold text-violet-700">مسارك عند التعلم الذاتي</span>
              <h2 className="mt-2 text-xl font-black text-slate-950">لا تبدأ من الأداة، ابدأ من حاجتك.</h2>
              <div className="mt-5 space-y-2">
                <JourneyRow number="1" title="اختر المادة" description="حدد ما تدرسه الآن." />
                <JourneyRow number="2" title="اعرف حالتك" description="ضايع؟ متوقف؟ تريد اختبار نفسك؟" />
                <JourneyRow number="3" title="خذ أقصر مساعدة" description="مصدر أو برومبت يناسب هذه اللحظة." />
                <JourneyRow number="4" title="ارجع وحاول بنفسك" description="الفهم والتطبيق قبل الإجابة الجاهزة." />
              </div>
            </div>
          </div>
        </section>

        <section id="materials" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="المواد"
            title="ابدأ من مادتك"
            description="كل مادة لها مصادرها، وحداتها، وطريقة مختلفة للاستفادة من الذكاء الاصطناعي."
          />

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {materials.map((material) => (
              <SubjectCard
                key={material.id}
                material={material}
                active={material.id === selected.id}
                onClick={() => chooseMaterial(material)}
              />
            ))}
          </div>
        </section>

        <section id="subject-space" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SubjectWorkspace
            material={selected}
            unitCount={selectedUnits.length}
            onPrompts={() => scrollToSection("#prompts")}
            onResources={() => scrollToSection("#resources")}
            onUnits={() => scrollToSection("#units")}
            onExams={() => scrollToSection("#exams")}
          />
        </section>

        <PromptLibrary subject={selected.title} units={selectedUnitTitles} />

        <section id="resources" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`مصادر ${selected.title}`}
            title="خذ المصدر الذي تحتاجه الآن"
            description="بدل قائمة طويلة، اختر نوع المصدر ثم افتح ما يناسب خطوتك الحالية."
          />

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="تصنيف المصادر">
            {resourceCategories.map((category) => {
              const count = category.id === "all"
                ? selected.sources.length
                : selected.sources.filter((source) => source.category === category.id).length;
              if (category.id !== "all" && count === 0) return null;
              const active = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold transition ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                  role="tab"
                  aria-selected={active}
                >
                  {category.label} <span className="mr-1 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleSources.map((source) => <ResourceCardV2 key={source.id} source={source} />)}
          </div>
        </section>

        {selectedUnits.length > 0 && (
          <section id="units" className="scroll-mt-24 border-y border-slate-200/80 bg-white/70 py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="حسب الوحدة"
                title={`تقوية مركزة في ${selected.title}`}
                description="افتح الوحدة التي تراجعها، وستجد مسارًا قصيرًا من المصادر المنتقاة."
              />
              <div className="mt-6 grid gap-3 lg:grid-cols-2">
                {selectedUnits.map((unit, index) => (
                  <details key={unit.title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-start gap-4 p-5 text-right [&::-webkit-details-marker]:hidden">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="text-[10px] font-extrabold text-violet-700">{unit.label}</span>
                        <strong className="mt-1 block text-base font-black text-slate-950">{unit.title}</strong>
                        <small className="mt-1 block text-xs font-medium leading-6 text-slate-500">{unit.note}</small>
                      </span>
                      <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-slate-100 p-3 sm:p-4">
                      <div className="space-y-2">
                        {unit.links.map((link) => <UnitLinkV2 key={`${unit.title}-${link.title}`} link={link} />)}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="exams" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="الاختبارات"
            title="اختبر نفسك قبل أن تقول: فهمت"
            description="نماذج وقنوات مراجعة تساعدك على الانتقال من الدراسة إلى الأداء الفعلي."
          />
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {examChannels.map((channel) => (
              <article key={channel.url} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(15,23,42,.06)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold text-amber-700">{channel.badge}</span>
                  <Target className="h-5 w-5 text-slate-300" />
                </div>
                <h3 className="mt-4 text-sm font-black leading-7 text-slate-950">{channel.title}</h3>
                <p className="mt-2 text-xs font-medium leading-6 text-slate-500"><strong className="text-slate-700">{channel.handle}</strong> · {channel.detail}</p>
                <a href={channel.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 text-xs font-extrabold text-slate-800 transition hover:bg-slate-200">
                  افتح المصدر
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f7f7fb]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => scrollToSection("#home")} className="flex items-center gap-3 text-right">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white"><BookOpen className="h-5 w-5" /></span>
          <span>
            <strong className="block font-kufi text-sm text-slate-950">دليل الثالث</strong>
            <small className="block text-[10px] font-bold text-slate-400">تعلّم بوضوح</small>
          </span>
        </button>
        <nav className="hidden items-center gap-6 text-xs font-extrabold text-slate-500 md:flex" aria-label="التنقل الرئيسي">
          <a className="transition hover:text-slate-950" href="#materials">المواد</a>
          <a className="transition hover:text-violet-700" href="#prompts">البرومبتات</a>
          <a className="transition hover:text-slate-950" href="#resources">المصادر</a>
          <a className="transition hover:text-slate-950" href="#exams">الاختبارات</a>
        </nav>
        <button type="button" onClick={() => scrollToSection("#prompts")} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-violet-700 px-3.5 text-xs font-extrabold text-white transition hover:bg-violet-800">
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">استخدم برومبت</span>
          <span className="sm:hidden">برومبت</span>
        </button>
      </div>
    </header>
  );
}

function JourneyRow({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3.5 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-black text-violet-700 shadow-sm">{number}</span>
      <span className="min-w-0">
        <strong className="block text-xs font-black text-slate-900">{title}</strong>
        <small className="mt-0.5 block text-[11px] font-medium text-slate-500">{description}</small>
      </span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs font-extrabold text-violet-700">{eyebrow}</span>
      <h2 className="mt-2 font-kufi text-2xl leading-relaxed text-slate-950 sm:text-3xl">{title}</h2>
      <p className="mt-1 text-sm font-medium leading-7 text-slate-500 sm:text-[15px]">{description}</p>
    </div>
  );
}

function SubjectCard({ material, active, onClick }: { material: MaterialCatalog; active: boolean; onClick: () => void }) {
  const Icon = subjectIcons[material.id] ?? BookOpenText;
  const tone = subjectTones[material.id] ?? defaultTone;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative min-h-[132px] rounded-3xl border p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(15,23,42,.06)] ${active ? tone.active : "border-slate-200 bg-white"}`}
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone.icon}`}><Icon className="h-5 w-5" strokeWidth={1.9} /></span>
      <strong className="mt-4 block text-sm font-black leading-6 text-slate-950">{material.title}</strong>
      <span className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
        <i className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
        {material.sources.length} مصادر
      </span>
    </button>
  );
}

function SubjectWorkspace({ material, unitCount, onPrompts, onResources, onUnits, onExams }: {
  material: MaterialCatalog;
  unitCount: number;
  onPrompts: () => void;
  onResources: () => void;
  onUnits: () => void;
  onExams: () => void;
}) {
  const Icon = subjectIcons[material.id] ?? BookOpenText;
  const tone = subjectTones[material.id] ?? defaultTone;
  return (
    <div className="overflow-hidden rounded-[32px] bg-slate-950 text-white shadow-[0_24px_60px_rgba(15,23,42,.13)]">
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-center lg:p-9">
        <div>
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone.icon}`}><Icon className="h-6 w-6" /></span>
          <span className="mt-5 block text-xs font-extrabold text-violet-300">مساحة المادة</span>
          <h2 className="mt-1 font-kufi text-2xl leading-relaxed sm:text-3xl">{material.title}</h2>
          <p className="mt-2 max-w-xl text-sm font-medium leading-7 text-slate-300">
            اختر ما تحتاجه الآن. لا يلزم أن تمر بكل الأقسام بالترتيب.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span className="rounded-full bg-white/7 px-2.5 py-1.5">{material.sources.length} مصادر</span>
            {unitCount > 0 && <span className="rounded-full bg-white/7 px-2.5 py-1.5">{unitCount} وحدات مركزة</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <WorkspaceAction icon={Library} title="المصادر" description="كتاب وشرح ومراجعة" onClick={onResources} />
          <WorkspaceAction icon={BrainCircuit} title="البرومبتات" description="مساعدة حسب حالتك" onClick={onPrompts} featured />
          <WorkspaceAction icon={BookOpenCheck} title="الوحدات" description={unitCount > 0 ? "تقوية حسب المحور" : "حدد الدرس يدويًا"} onClick={unitCount > 0 ? onUnits : onPrompts} />
          <WorkspaceAction icon={FileQuestion} title="الاختبارات" description="اختبر ما أتقنته" onClick={onExams} />
        </div>
      </div>
    </div>
  );
}

function WorkspaceAction({ icon: Icon, title, description, onClick, featured = false }: {
  icon: IconType;
  title: string;
  description: string;
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className={`min-h-[116px] rounded-2xl border p-4 text-right transition active:scale-[.98] ${featured ? "border-violet-400/40 bg-violet-500/15 hover:bg-violet-500/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
      <Icon className={`h-5 w-5 ${featured ? "text-violet-300" : "text-slate-300"}`} />
      <strong className="mt-3 block text-sm font-black">{title}</strong>
      <small className="mt-1 block text-[10px] font-medium leading-5 text-slate-400">{description}</small>
    </button>
  );
}

function ResourceCardV2({ source }: { source: ResourceCard }) {
  const Icon = categoryIcons[source.category] ?? FileText;
  const action = source.category === "books"
    ? "افتح الكتاب"
    : source.category === "youtube"
      ? "شاهد الشرح"
      : source.category === "tests"
        ? "افتح الاختبار"
        : source.category === "telegram"
          ? "افتح Telegram"
          : "افتح المصدر";
  return (
    <article className="flex min-h-[225px] flex-col rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_15px_35px_rgba(15,23,42,.06)]">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-600"><Icon className="h-3.5 w-3.5" />{source.badge}</span>
        {source.handle && <span className="truncate text-[10px] font-extrabold text-sky-600">{source.handle}</span>}
      </div>
      <h3 className="mt-4 text-sm font-black leading-7 text-slate-950">{source.title}</h3>
      <p className="mt-2 line-clamp-3 text-xs font-medium leading-6 text-slate-500">{source.detail || source.platform}</p>
      <a href={source.url} target="_blank" rel="noreferrer" className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-extrabold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100">
        {action}
        <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}

function UnitLinkV2({ link }: { link: UnitLink }) {
  const Icon = link.kind === "قناة Telegram" ? Send : link.kind === "اختبارات" ? FileQuestion : PlayCircle;
  return (
    <a href={link.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-2xl border border-transparent bg-slate-50 p-3.5 transition hover:border-slate-200 hover:bg-white">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm"><Icon className="h-4 w-4" /></span>
      <span className="min-w-0 flex-1">
        <small className="text-[9px] font-extrabold text-violet-700">{link.kind}</small>
        <strong className="mt-0.5 block text-xs font-black leading-6 text-slate-900">{link.title}</strong>
        <em className="mt-0.5 block text-[10px] not-italic font-medium leading-5 text-slate-500">{link.description}</em>
      </span>
      <ExternalLink className="mt-2 h-4 w-4 shrink-0 text-slate-300" />
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white"><BookOpen className="h-5 w-5" /></span>
          <span>
            <strong className="block font-kufi text-sm text-slate-950">دليل الثالث</strong>
            <small className="block text-[10px] font-medium text-slate-400">المصادر الخارجية تفتح في منصاتها الأصلية.</small>
          </span>
        </div>
        <p className="text-xs font-medium text-slate-400">تصميم وتطوير <a href="https://alharethprofilo.netlify.app/" target="_blank" rel="noreferrer" className="font-extrabold text-slate-700 hover:text-violet-700">الحارث الداهية</a></p>
      </div>
    </footer>
  );
}

function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-[0_18px_50px_rgba(15,23,42,.16)] backdrop-blur-xl md:hidden" aria-label="تنقل الهاتف">
      <MobileNavItem href="#home" icon={BookOpen} label="الرئيسية" />
      <MobileNavItem href="#materials" icon={Library} label="المواد" />
      <MobileNavItem href="#prompts" icon={Sparkles} label="البرومبتات" />
      <MobileNavItem href="#exams" icon={FileQuestion} label="الاختبارات" />
    </nav>
  );
}

function MobileNavItem({ href, icon: Icon, label }: { href: string; icon: IconType; label: string }) {
  return (
    <a href={href} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-extrabold text-slate-500 transition active:bg-slate-100 active:text-violet-700">
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}
