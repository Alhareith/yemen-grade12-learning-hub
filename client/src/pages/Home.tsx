/**
 * Design note — دفتر الوصول: an asymmetric, phone-first study route. The current subject is always the clearest action.
 */
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Atom,
  BadgeCheck,
  BookMarked,
  BookOpenText,
  CheckCircle2,
  ChevronLeft,
  Compass,
  Dna,
  ExternalLink,
  FileText,
  FlaskConical,
  HeartHandshake,
  Languages,
  PlayCircle,
  Quote,
  Scale,
  ScrollText,
  Search,
  Sigma,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { learningSources, subjectMeta, type LearningSource } from "@/data/catalog";

const LOGO_URL = "/manus-storage/yemen_learning_logo_d4c14700.png";
const HERO_URL = "/manus-storage/yemen_learning_hero_2c99a99c.jpg";
const PATH_URL = "/manus-storage/yemen_learning_study_path_d4114b00.jpg";
const SUBJECTS_URL = "/manus-storage/yemen_learning_subjects_2e6313c9.jpg";

const subjectOrder = [
  "رياضيات",
  "فيزياء",
  "كيمياء",
  "أحياء",
  "لغة إنجليزية",
  "نحو وصرف",
  "أدب ونصوص وبلاغة",
  "قراءة",
  "قرآن كريم",
  "حديث وتهذيب",
  "إيمان",
  "فقه",
  "سيرة نبوية",
];

const subjectIcons: Record<string, LucideIcon> = {
  رياضيات: Sigma,
  فيزياء: Atom,
  كيمياء: FlaskConical,
  أحياء: Dna,
  "لغة إنجليزية": Languages,
  "نحو وصرف": Type,
  "أدب ونصوص وبلاغة": BookOpenText,
  قراءة: BookMarked,
  "قرآن كريم": ScrollText,
  "حديث وتهذيب": Quote,
  إيمان: HeartHandshake,
  فقه: Scale,
  "سيرة نبوية": Compass,
};

const resourceMeta: Record<string, { label: string; icon: LucideIcon }> = {
  textbook: { label: "الكتاب الرسمي", icon: BookOpenText },
  activity_book: { label: "كتاب الأنشطة", icon: FileText },
  workbook: { label: "كتاب التمارين", icon: FileText },
  playlist: { label: "شرح بالفيديو", icon: PlayCircle },
  video: { label: "شرح بالفيديو", icon: PlayCircle },
  teacher_channel: { label: "شرح موصى به", icon: PlayCircle },
  specialized_channel: { label: "قناة متخصصة", icon: Sparkles },
  official_exam_portal: { label: "نماذج اختبارات", icon: CheckCircle2 },
  exam_page: { label: "نماذج اختبارات", icon: CheckCircle2 },
  summary_page: { label: "ملخص ومراجعة", icon: FileText },
  textbook_mirror: { label: "نسخة احتياطية", icon: BookOpenText },
  official_education_channel: { label: "قناة تعليمية", icon: BadgeCheck },
  subject_hub: { label: "مصادر المادة", icon: BookMarked },
};

const resourceRank: Record<string, number> = {
  textbook: 0,
  activity_book: 1,
  workbook: 1,
  official_exam_portal: 2,
  playlist: 3,
  video: 3,
  teacher_channel: 4,
  specialized_channel: 4,
  official_education_channel: 4,
  exam_page: 5,
  summary_page: 6,
  textbook_mirror: 7,
  subject_hub: 8,
};

const learningStations = [
  {
    id: "curriculum",
    order: "01",
    title: "ابدأ بالمنهج",
    shortTitle: "المنهج",
    description: "افتح الكتاب أولًا، ثم ارجع إليه كلما احتجت تثبيت فكرة.",
    action: "ابدأ هنا",
    types: ["textbook", "activity_book", "workbook"],
    icon: BookOpenText,
    tone: "station-blue",
  },
  {
    id: "explain",
    order: "02",
    title: "افهم بالشرح",
    shortTitle: "الشرح",
    description: "اختر شرحًا واحدًا مرتبطًا بالمادة بدل التنقل بين القنوات.",
    action: "شاهد الشرح",
    types: ["playlist", "video", "teacher_channel", "specialized_channel", "official_education_channel", "subject_hub", "textbook_mirror"],
    icon: PlayCircle,
    tone: "station-mint",
  },
  {
    id: "practice",
    order: "03",
    title: "ثبت بالتدريب",
    shortTitle: "التدريب",
    description: "اختبر فهمك بنموذج أو ملخص بعد إتمام الدرس.",
    action: "تدرّب الآن",
    types: ["official_exam_portal", "exam_page", "summary_page"],
    icon: CheckCircle2,
    tone: "station-clay",
  },
] as const;

function sourceTrustClass(source: LearningSource) {
  if (source.trustLevel.includes("مرتفع")) return "trust-official";
  if (source.trustLevel.includes("مراجعة")) return "trust-review";
  return "trust-recommended";
}

function sourceTrustLabel(source: LearningSource) {
  if (source.trustLevel.includes("مرتفع")) return "رسمي أو موثق";
  if (source.trustLevel.includes("مراجعة")) return "راجع قبل الاعتماد";
  return "مصدر موصى به";
}

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState("رياضيات");
  const [query, setQuery] = useState("");
  const [onlyOfficial, setOnlyOfficial] = useState(false);

  const sourcesBySubject = useMemo(() => {
    return subjectOrder.reduce<Record<string, LearningSource[]>>((result, subject) => {
      result[subject] = learningSources
        .filter((source) => source.subject === subject)
        .sort((first, second) => (resourceRank[first.resourceType] ?? 9) - (resourceRank[second.resourceType] ?? 9));
      return result;
    }, {});
  }, []);

  const subjects = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("ar");
    return subjectOrder.filter((subject) => {
      const sourceText = sourcesBySubject[subject]
        .map((source) => `${source.title} ${source.unit} ${source.platform}`)
        .join(" ")
        .toLocaleLowerCase("ar");
      return !term || subject.toLocaleLowerCase("ar").includes(term) || sourceText.includes(term);
    });
  }, [query, sourcesBySubject]);

  const selectedSources = useMemo(() => {
    const sources = sourcesBySubject[selectedSubject] ?? [];
    return onlyOfficial ? sources.filter((source) => source.trustLevel.includes("مرتفع")) : sources;
  }, [onlyOfficial, selectedSubject, sourcesBySubject]);

  const stationSources = useMemo(() => {
    return learningStations
      .map((station) => ({ ...station, sources: selectedSources.filter((source) => station.types.includes(source.resourceType as never)) }))
      .filter((station) => station.sources.length > 0);
  }, [selectedSources]);

  const selectSubject = (subject: string) => {
    setSelectedSubject(subject);
    requestAnimationFrame(() => document.querySelector("#subject-route")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const selectedMeta = subjectMeta[selectedSubject as keyof typeof subjectMeta];
  const SelectedIcon = subjectIcons[selectedSubject] ?? BookOpenText;

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#fbf8f0] text-[#17354a] selection:bg-[#c7ece0]">
      <header className="sticky top-0 z-40 border-b border-[#dce7e5]/80 bg-[#fbf8f0]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-right" aria-label="العودة للبداية">
            <img src={LOGO_URL} alt="رمز دليل الثالث الثانوي" className="h-12 w-12 object-contain" />
            <span className="leading-tight">
              <strong className="block font-kufi text-[13px] text-[#175A7A]">دليل الثالث</strong>
              <span className="block text-[11px] font-medium text-[#617783]">علمي · اليمن</span>
            </span>
          </button>
          <a href="#materials" className="rounded-full bg-[#175A7A] px-4 py-2 text-xs font-bold text-white shadow-[0_7px_18px_rgba(23,90,122,.18)] transition-transform duration-150 active:scale-[.97]">اختر مادة</a>
        </div>
      </header>

      <main>
        <section className="relative mx-auto min-h-[595px] max-w-7xl overflow-hidden px-4 pb-12 pt-8 sm:min-h-[530px] sm:px-6 sm:pt-12 lg:px-8">
          <div className="paper-grain absolute inset-0 rounded-b-[2.3rem] bg-[#eaf4ef]" />
          <img src={HERO_URL} alt="مساحة دراسة منظمة" className="absolute bottom-0 left-0 h-[47%] w-full object-cover object-right opacity-80 sm:right-0 sm:left-auto sm:h-full sm:w-[58%] sm:object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#eaf4ef] via-[#eaf4ef]/80 to-transparent sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[63%] sm:bg-gradient-to-l sm:from-transparent sm:via-[#eaf4ef]/40 sm:to-[#eaf4ef]" />
          <div className="relative z-10 max-w-xl pt-2 sm:pt-10">
            <div className="rise-in inline-flex items-center gap-2 border border-[#b4d8d4] bg-white/80 px-3 py-1.5 text-xs font-bold text-[#175A7A] shadow-sm">
              <BadgeCheck className="h-4 w-4" />
              مصادر مرتبة للثالث الثانوي العلمي
            </div>
            <h1 className="rise-in mt-5 font-kufi text-3xl leading-[1.5] text-[#17354a] sm:text-4xl">
              لا تحتار أين تبدأ.
              <span className="block text-[#175A7A]">اختر المادة، وخذ الطريق الواضح.</span>
            </h1>
            <p className="rise-in mt-4 max-w-lg text-[15px] leading-8 text-[#526a75] sm:text-base">كتاب المنهج، شرح موصى به، وتدريب للمراجعة — من دون قنوات مشتتة أو روابط مبعثرة.</p>
            <div className="rise-in route-note mt-6 max-w-xl" aria-label="خطوات مسار المراجعة">
              {learningStations.map((station, index) => {
                const StationIcon = station.icon;
                return <div key={station.id} className="route-note-step"><span className="route-note-number">{station.order}</span><StationIcon className="h-4 w-4" /><strong>{station.shortTitle}</strong>{index < learningStations.length - 1 && <span className="route-note-line" />}</div>;
              })}
            </div>
            <div className="rise-in mt-7 max-w-md rounded-[1.25rem] border border-white/90 bg-white/90 p-2 shadow-[0_16px_35px_rgba(25,74,82,.12)] backdrop-blur">
              <label className="flex items-center gap-2 px-3 text-[#75909a]" htmlFor="search-sources"><Search className="h-5 w-5" /><span className="sr-only">ابحث عن مادة أو مصدر</span></label>
              <input id="search-sources" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث: فيزياء، كتاب، اختبار..." className="mt-1 h-12 w-full bg-transparent px-3 text-sm font-medium text-[#17354a] outline-none placeholder:text-[#8ba0a7]" />
            </div>
            <div className="rise-in mt-5 flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="rounded-full bg-[#175A7A] px-3 py-2 text-white">{learningSources.length} مصدرًا منظمًا</span>
              <span className="rounded-full border border-[#cbded8] bg-white/75 px-3 py-2 text-[#52727a]">راجعنا حالة الروابط</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="materials">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-kufi text-xs text-[#d1774e]">المحطة الأولى</p>
              <h2 className="mt-2 font-kufi text-2xl text-[#17354a]">اختر مادتك الآن</h2>
              <p className="mt-2 text-sm text-[#667d86]">اضغط المادة، ثم تظهر لك المصادر المرتبة حسب أهميتها.</p>
            </div>
            {query && <button onClick={() => setQuery("")} className="text-sm font-bold text-[#175A7A] underline underline-offset-4">مسح البحث</button>}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {subjects.map((subject, index) => {
              const Icon = subjectIcons[subject] ?? BookOpenText;
              const meta = subjectMeta[subject as keyof typeof subjectMeta];
              const isSelected = selectedSubject === subject;
              return (
                <button key={subject} onClick={() => selectSubject(subject)} className={`rise-in subject-card group min-h-[150px] p-4 text-right ${index === 0 ? "subject-card-featured col-span-2" : ""} ${index === 1 || index === 2 ? "subject-card-tall" : ""} ${isSelected ? "subject-card-active" : ""}`} style={{ animationDelay: `${Math.min(index * 38, 320)}ms` }}>
                  <span className="flex h-10 w-10 items-center justify-center bg-[#e8f2ef] text-[#175A7A] transition-transform duration-200 group-hover:-translate-y-1"><Icon className="h-5 w-5" strokeWidth={1.9} /></span>
                  <span className="mt-5 block font-kufi text-[13px] leading-6 text-[#17354a]">{subject}</span>
                  <span className="mt-1 block text-[11px] font-medium text-[#77909a]">{sourcesBySubject[subject]?.length ?? 0} مصادر</span>
                  {meta && <span className="mt-3 block line-clamp-1 text-[11px] text-[#9aadaf]">{meta.description}</span>}
                </button>
              );
            })}
          </div>
          {subjects.length === 0 && <div className="mt-8 border border-dashed border-[#bdd0cc] bg-white p-8 text-center text-sm text-[#6a7e84]">لا توجد نتيجة مطابقة. جرّب اسم المادة أو اكتب «كتاب» أو «اختبار».</div>}
        </section>

        <section id="subject-route" className="route-section relative overflow-hidden bg-[#175A7A] px-4 py-14 text-white sm:px-6 lg:px-8">
          <img src={PATH_URL} alt="مسار تعلّم مبسط" className="absolute top-0 left-0 h-full w-[42%] object-cover opacity-[.16] mix-blend-screen" />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center bg-[#c8ede1] text-[#175A7A] shadow-lg"><SelectedIcon className="h-7 w-7" /></div>
                <div>
                  <p className="font-kufi text-xs text-[#c8ede1]">مسار {selectedSubject}</p>
                  <h2 className="mt-1 font-kufi text-2xl">كل ما تحتاجه للمراجعة هنا</h2>
                </div>
              </div>
              <button onClick={() => setOnlyOfficial((current) => !current)} className={`border px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-[.97] ${onlyOfficial ? "border-[#c8ede1] bg-[#c8ede1] text-[#175A7A]" : "border-white/40 bg-white/10 text-white"}`}>
                {onlyOfficial ? "عرض كل المصادر" : "المصادر الرسمية فقط"}
              </button>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {learningStations.map((station) => {
                const StationIcon = station.icon;
                return <div key={station.id} className={`route-station ${station.tone}`}><span className="route-number">{station.order}</span><StationIcon className="h-6 w-6" /><h3>{station.title}</h3><p>{station.description}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_290px]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-kufi text-xs text-[#d1774e]">المحطة الثانية</p>
                  <h2 className="mt-2 font-kufi text-2xl text-[#17354a]">مصادر {selectedSubject}</h2>
                  <p className="mt-2 text-sm text-[#667d86]">اختر مصدرًا واحدًا فقط الآن، ثم عد للمسار عند الحاجة.</p>
                </div>
                <span className="text-xs font-bold text-[#75909a]">آخر تحقق: 27 أغسطس 2026</span>
              </div>

              <div className="station-stack mt-8">
                {stationSources.map((station) => {
                  const StationIcon = station.icon;
                  return (
                    <section key={station.id} className={`notebook-section ${station.tone}`}>
                      <header className="notebook-heading">
                        <span className="notebook-tab">{station.order}</span>
                        <span className="flex h-10 w-10 items-center justify-center"><StationIcon className="h-5 w-5" /></span>
                        <div><h3>{station.title}</h3><p>{station.description}</p></div>
                      </header>
                      <div className="space-y-3 p-3 sm:p-5">
                        {station.sources.map((source, index) => {
                          const meta = resourceMeta[source.resourceType] ?? { label: "مصدر تعليمي", icon: ExternalLink };
                          const ResourceIcon = meta.icon;
                          return (
                            <article key={`${source.id}-${source.url}`} className="source-card relative pr-16">
                              <span className="source-node"><span>{index + 1}</span></span>
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2"><span className="source-stamp"><ResourceIcon className="h-3.5 w-3.5" />{meta.label}</span><span className={`trust-badge ${sourceTrustClass(source)}`}>{sourceTrustLabel(source)}</span></div>
                                  <h4 className="mt-3 font-kufi text-sm leading-7 text-[#17354a]">{source.title}</h4>
                                  <p className="mt-1 text-xs leading-6 text-[#70868e]">{source.unit} · {source.platform}{source.notes ? ` · ${source.notes}` : ""}</p>
                                </div>
                                <Button asChild className={`h-11 shrink-0 rounded-none px-4 text-xs font-bold shadow-none active:scale-[.97] ${station.id === "curriculum" ? "bg-[#175A7A] text-white hover:bg-[#104d69]" : station.id === "practice" ? "bg-[#c8ede1] text-[#175A7A] hover:bg-[#afdcca]" : "bg-[#eaf4ef] text-[#175A7A] hover:bg-[#dcefe8]"}`}><a href={source.url} target="_blank" rel="noreferrer"><span>{station.action}</span><ExternalLink className="mr-2 h-4 w-4" /></a></Button>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
                {selectedSources.length === 0 && <div className="border border-dashed border-[#c5ddd7] bg-[#f7fbf9] p-7 text-center text-sm text-[#6a7e84]">لا توجد مصادر رسمية مصنفة لهذه المادة حاليًا. ألغِ الفلتر لعرض المصادر المراجعة الأخرى.</div>}
              </div>
            </div>

            <aside className="sticky top-24 overflow-hidden border border-[#d8e7e3] bg-[#eff7f4] p-5">
              <img src={SUBJECTS_URL} alt="رموز مواد علمية" className="h-40 w-full object-cover" />
              <p className="mt-5 font-kufi text-sm text-[#17354a]">اختيارك اليوم</p>
              <p className="mt-2 text-sm leading-7 text-[#5d747c]">{selectedMeta?.description ?? "رتّب مصادر المادة ثم ابدأ بالكتاب الرسمي."}</p>
              <div className="mt-5 border-r-2 border-[#d1774e] pr-3 text-xs leading-6 text-[#617a80]">نصيحة: افتح المصدر، أضفه للمفضلة في متصفحك، ثم عُد هنا عندما تريد محطة أخرى.</div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dbe7e4] bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#657a82] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><img src={LOGO_URL} alt="" className="h-9 w-9" /><span>دليل مصادر طلاب الثالث الثانوي — القسم العلمي</span></div>
          <a href="#materials" className="inline-flex items-center gap-1 font-bold text-[#175A7A]">العودة للمادة <ChevronLeft className="h-4 w-4" /></a>
        </div>
      </footer>

      <nav aria-label="تنقل سريع" className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-center justify-between border border-[#d9e6e3] bg-white/95 px-5 py-3 shadow-[0_15px_45px_rgba(26,62,77,.18)] backdrop-blur md:hidden">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-center text-[11px] font-bold text-[#175A7A]"><span className="mx-auto mb-1 block h-1.5 w-6 bg-[#175A7A]" />البداية</button>
        <button onClick={() => document.querySelector("#materials")?.scrollIntoView({ behavior: "smooth" })} className="text-center text-[11px] font-bold text-[#6d838a]"><BookMarked className="mx-auto mb-1 h-4 w-4" />المواد</button>
        <button onClick={() => document.querySelector("#subject-route")?.scrollIntoView({ behavior: "smooth" })} className="text-center text-[11px] font-bold text-[#6d838a]"><ArrowLeft className="mx-auto mb-1 h-4 w-4" />المسار</button>
      </nav>
    </div>
  );
}
