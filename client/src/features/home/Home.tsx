import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Atom,
  BookMarked,
  BookOpenCheck,
  BookOpenText,
  ChevronDown,
  ChevronLeft,
  Compass,
  Dna,
  ExternalLink,
  Facebook,
  FileQuestion,
  FileText,
  FlaskConical,
  Globe2,
  HeartHandshake,
  Languages,
  Linkedin,
  Mail,
  PlayCircle,
  Quote,
  Scale,
  ScrollText,
  Send,
  Sigma,
  Type,
} from "lucide-react";
import PromptLibrary from "@/features/prompts/PromptLibrary";
import HomeExperience from "@/features/home/HomeExperience";
import {
  materials,
  resourceCategories,
  type MaterialCatalog,
  type ResourceCard,
} from "@/data/richCatalog";
import { unitExpansions, type UnitLink } from "@/data/unitExpansions";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;
export type HomeRouteView = "home" | "prompts" | "resources";
type View = HomeRouteView | "subjects";
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

const socialLinks = [
  { label: "الموقع الشخصي", href: "https://alharethprofilo.netlify.app/", icon: Globe2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB-%D8%A7%D9%84%D8%AF%D8%A7%D9%87%D9%8A%D8%A9-95b4a831a", icon: Linkedin },
  { label: "Telegram", href: "https://t.me/devhareth", icon: Send },
  { label: "Facebook", href: "https://www.facebook.com/alharth.aldahyt/", icon: Facebook },
  { label: "البريد", href: "mailto:alhareithaldahia@gmail.com", icon: Mail },
];

type HomeV4Props = {
  routeView?: HomeRouteView;
  resetSignal?: number;
  onRouteNavigate?: (view: HomeRouteView) => void;
};

export default function HomeV4({
  routeView = "home",
  resetSignal = 0,
  onRouteNavigate,
}: HomeV4Props) {
  const [view, setView] = useState<View>(() => routeView);
  const [selectedId, setSelectedId] = useState("رياضيات");
  const [filter, setFilter] = useState("all");
  const [resourceMode, setResourceMode] = useState<ResourceMode>("sources");

  useEffect(() => {
    setView(routeView);
  }, [routeView, resetSignal]);

  const selected = materials.find((material) => material.id === selectedId) ?? materials[0];
  const selectedUnits = useMemo(() => unitExpansions.filter((unit) => unit.subjectId === selected.id), [selected.id]);
  const selectedUnitTitles = useMemo(() => selectedUnits.map((unit) => unit.title), [selectedUnits]);
  const visibleSources = useMemo(
    () => filter === "all" ? selected.sources : selected.sources.filter((source) => source.category === filter),
    [filter, selected],
  );

  const go = (next: View) => {
    setView(next);

    if (onRouteNavigate && (next === "home" || next === "prompts" || next === "resources")) {
      onRouteNavigate(next);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const chooseSubject = (material: MaterialCatalog) => {
    setSelectedId(material.id);
    setFilter("all");
    setResourceMode("sources");
    go("home");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f6fa] font-sans text-slate-950">
      <main className="min-h-[70vh]">
        {view === "home" && <HomeExperience />}
        {view === "prompts" && <PromptLibrary subject={selected.title} units={selectedUnitTitles} />}
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
        {view === "subjects" && <SubjectsView selectedId={selected.id} onSelect={chooseSubject} />}
      </main>
      {view !== "prompts" && view !== "home" && <DeveloperFooter />}
    </div>
  );
}

function SubjectsView({ selectedId, onSelect }: { selectedId: string; onSelect: (material: MaterialCatalog) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8">
      <PageHeading title="اختر المادة" description="اخترها مرة، ثم استخدم الأوامر الجاهزة والمصادر في نفس السياق." />
      <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {materials.map((material) => {
          const Icon = subjectIcons[material.id] ?? BookOpenText;
          const tone = subjectTone[material.id] ?? "bg-slate-100 text-slate-700";
          const active = selectedId === material.id;
          return <button key={material.id} type="button" onClick={() => onSelect(material)} className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-right last:border-0 sm:p-5 ${active ? "bg-violet-50/50" : "hover:bg-slate-50"}`}><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><strong className="block text-sm font-black text-slate-950">{material.title}</strong><span className="mt-1 block text-xs font-medium text-slate-500">{material.sources.length} مصادر {material.bookOnly ? "· كتاب رسمي" : "· شرح وتدريب"}</span></span>{active && <span className="rounded-full bg-violet-100 px-2 py-1 text-[9px] font-extrabold text-violet-700">الحالية</span>}<ChevronLeft className="h-5 w-5 text-slate-300" /></button>;
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
      <div className="flex items-end justify-between gap-3"><PageHeading title={`مصادر ${selected.title}`} description="المصادر هنا لتدعم فهمك بعد الأوامر والمحاكاة، لا لتغرقك في الروابط." /><button type="button" onClick={onChangeSubject} className="mb-1 shrink-0 rounded-xl bg-white px-3 py-2 text-[10px] font-extrabold text-violet-700 ring-1 ring-slate-200">تغيير المادة</button></div>
      <div className="mt-5 grid grid-cols-2 rounded-2xl bg-slate-200/70 p-1"><button type="button" onClick={() => onMode("sources")} className={`min-h-10 rounded-xl text-xs font-extrabold ${mode === "sources" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>المصادر</button><button type="button" onClick={() => onMode("units")} className={`min-h-10 rounded-xl text-xs font-extrabold ${mode === "units" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>حسب الوحدة</button></div>
      {mode === "sources" ? (
        <>
          <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">{resourceCategories.map((category) => { const count = category.id === "all" ? selected.sources.length : selected.sources.filter((source) => source.category === category.id).length; if (category.id !== "all" && count === 0) return null; const active = filter === category.id; return <button key={category.id} type="button" onClick={() => onFilter(category.id)} className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-extrabold ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{category.label} · {count}</button>; })}</div>
          <div className="mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white">{visibleSources.map((source) => <ResourceRow key={source.id} source={source} />)}</div>
        </>
      ) : (
        <div className="mt-4 space-y-3">{selectedUnits.length > 0 ? selectedUnits.map((unit, index) => <details key={unit.title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white" open={index === 0}><summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden sm:p-5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">{index + 1}</span><span className="min-w-0 flex-1"><small className="text-[9px] font-extrabold text-violet-700">{unit.label}</small><strong className="block text-sm font-black leading-6 text-slate-950">{unit.title}</strong><span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{unit.note}</span></span><ChevronDown className="mt-2 h-4 w-4 text-slate-400 transition group-open:rotate-180" /></summary><div className="divide-y divide-slate-100 border-t border-slate-100">{unit.links.map((link) => <UnitRow key={`${unit.title}-${link.title}`} link={link} />)}</div></details>) : <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center"><BookOpenCheck className="mx-auto h-8 w-8 text-slate-300" /><strong className="mt-3 block text-sm font-black text-slate-900">لا توجد وحدات مفهرسة لهذه المادة بعد</strong></div>}</div>
      )}
    </div>
  );
}

function ResourceRow({ source }: { source: ResourceCard }) {
  const Icon = categoryIcons[source.category] ?? FileText;
  return <a href={source.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-slate-100 p-4 text-right last:border-0 hover:bg-slate-50 sm:p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600"><Icon className="h-4.5 w-4.5" /></span><span className="min-w-0 flex-1"><small className="text-[9px] font-extrabold text-violet-700">{source.badge}{source.handle ? ` · ${source.handle}` : ""}</small><strong className="mt-0.5 block text-xs font-black leading-6 text-slate-950 sm:text-sm">{source.title}</strong><span className="mt-1 line-clamp-2 block text-[11px] font-medium leading-5 text-slate-500">{source.detail || source.platform}</span></span><ExternalLink className="h-4 w-4 text-slate-300" /></a>;
}

function UnitRow({ link }: { link: UnitLink }) {
  const Icon = link.kind === "قناة Telegram" ? Send : link.kind === "اختبارات" ? FileQuestion : PlayCircle;
  return <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 text-right hover:bg-slate-50"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><small className="text-[9px] font-extrabold text-violet-700">{link.kind}</small><strong className="block text-xs font-black leading-6 text-slate-950">{link.title}</strong></span><ExternalLink className="h-4 w-4 text-slate-300" /></a>;
}

function PageHeading({ title, description }: { title: string; description: string }) {
  return <div><h1 className="text-2xl font-black leading-9 text-slate-950">{title}</h1><p className="mt-1 max-w-2xl text-sm font-medium leading-7 text-slate-500">{description}</p></div>;
}

function DeveloperFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-lg font-black text-slate-950">من نحن</h2>
        <p className="mt-1 max-w-2xl text-xs font-medium leading-6 text-slate-500">دليل تعليمي يساعد طالب الثالث الثانوي اليمني على الوصول إلى شرح واضح، محاكاة مفيدة، ومصادر مرتبة دون تشتيت.</p>

        <a href="https://alharethprofilo.netlify.app/" target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
          <img src={PROFILE_IMAGE_URL} alt="الحارث الداهية" loading="lazy" decoding="async" className="h-12 w-12 rounded-2xl object-cover" />
          <span className="min-w-0 flex-1"><small className="text-[9px] font-extrabold text-violet-700">تصميم وتطوير</small><strong className="block text-sm font-black text-slate-950">الحارث الداهية</strong><span className="block text-[10px] font-medium leading-5 text-slate-500">زيارة الموقع الشخصي والملف التعريفي</span></span>
          <ExternalLink className="h-4 w-4 shrink-0 text-slate-300" />
        </a>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{socialLinks.map((social) => { const Icon = social.icon; const email = social.href.startsWith("mailto:"); return <a key={social.label} href={social.href} target={email ? undefined : "_blank"} rel={email ? undefined : "noreferrer"} className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-2 text-[10px] font-extrabold text-slate-600 hover:border-violet-200 hover:text-violet-700"><Icon className="h-3.5 w-3.5" />{social.label}</a>; })}</div>
        <p className="mt-5 text-center text-[10px] font-medium leading-5 text-slate-400">ابدأ بالفهم والمحاكاة، واستخدم المصادر عندما تحتاجها · دليل الثالث الثانوي اليمني</p>
      </div>
    </footer>
  );
}
