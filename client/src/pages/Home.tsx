/**
 * Design note — دفتر الوصول: science and language subjects are rich, grouped catalogs; Islamic subjects intentionally preserve one official-book action.
 */
import { useMemo, useState } from "react";
import {
  Atom,
  BookOpen,
  BookMarked,
  BookOpenCheck,
  BookOpenText,
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
  HeartHandshake,
  Languages,
  Linkedin,
  Mail,
  MessageCircle,
  PlayCircle,
  Quote,
  Scale,
  ScrollText,
  SearchCheck,
  Send,
  Sigma,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react";
import { examChannels, materials, resourceCategories, type MaterialCatalog, type ResourceCard } from "@/data/richCatalog";
import { unitExpansions, type UnitLink } from "@/data/unitExpansions";

const PROFILE_IMAGE_URL = "https://alharethprofilo.netlify.app/assets/alhareth-profile.webp";
const DEVELOPER_NAME = "الحارث الداهية";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Alhareith", icon: Github, tone: "social-github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB-%D8%A7%D9%84%D8%AF%D8%A7%D9%87%D9%8A%D8%A9-95b4a831a", icon: Linkedin, tone: "social-linkedin" },
  { label: "Hugging Face", href: "https://huggingface.co/Alhareth7790", icon: Sparkles, tone: "social-huggingface" },
  { label: "Telegram", href: "https://t.me/devhareth", icon: Send, tone: "social-telegram" },
  { label: "Facebook", href: "https://www.facebook.com/alharth.aldahyt/", icon: Facebook, tone: "social-facebook" },
  { label: "البريد الإلكتروني", href: "mailto:alhareithaldahia@gmail.com", icon: Mail, tone: "social-email" },
  { label: "الملف الشخصي", href: "https://alharethprofilo.netlify.app/", icon: Globe2, tone: "social-portfolio" },
];

const icons: Record<string, LucideIcon> = {
  رياضيات: Sigma, فيزياء: Atom, كيمياء: FlaskConical, أحياء: Dna, "لغة إنجليزية": Languages,
  "نحو وصرف": Type, "أدب ونصوص وبلاغة": BookOpenText, قراءة: BookMarked, "قرآن كريم": ScrollText,
  "حديث وتهذيب": Quote, إيمان: HeartHandshake, فقه: Scale, "سيرة نبوية": Compass,
};

const categoryIcons: Record<string, LucideIcon> = {
  books: BookOpenCheck, youtube: PlayCircle, telegram: Send, tests: FileQuestion, reviews: FileText,
};

function sourceButtonText(source: ResourceCard) {
  if (source.category === "telegram") return `Telegram · ${source.handle ?? source.title}`;
  if (source.category === "youtube") return "افتح الشرح على YouTube";
  if (source.category === "tests") return "افتح النماذج والاختبارات";
  if (source.category === "books") return "افتح الكتاب الرسمي";
  return "افتح المصدر";
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("رياضيات");
  const [filter, setFilter] = useState("books");
  const selected = materials.find((material) => material.id === selectedId) ?? materials[0];
  const SubjectIcon = icons[selected.icon] ?? BookOpenText;
  const visibleSources = useMemo(() => selected.bookOnly || filter === "all" ? selected.sources : selected.sources.filter((source) => source.category === filter), [filter, selected]);
  const groupedSources = useMemo(() => resourceCategories.slice(1).map((category) => ({ ...category, sources: visibleSources.filter((source) => source.category === category.id) })).filter((group) => group.sources.length > 0), [visibleSources]);
  const selectedUnits = useMemo(() => unitExpansions.filter((unit) => unit.subjectId === selected.id), [selected.id]);
  const routeStage = filter === "books" ? "books" : filter === "youtube" ? "explain" : "practice";

  const chooseMaterial = (material: MaterialCatalog) => {
    setSelectedId(material.id);
    setFilter("books");
    requestAnimationFrame(() => document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div dir="rtl" className="app-screen min-h-screen overflow-x-hidden text-[#17354a]">
      <header className="app-header sticky top-0 z-50">
        <div className="app-header-inner mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-right" aria-label="العودة إلى بداية الدليل"><BrandMark /><span><strong className="block font-kufi text-[15px] text-[#175A7A]">دليل الثالث</strong><span className="mt-0.5 block text-[12px] font-bold text-[#71868f]">علمي · اليمن</span></span></button>
          <div className="hidden items-center gap-5 text-sm font-bold text-[#617982] md:flex"><a href="#materials">المواد</a><a href="#exams">الاختبارات</a><a href="#about">من نحن</a></div>
          <a href="#materials" className="header-action">اختر مادة</a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 sm:pt-9 lg:px-8">
          <div className="hero-paper app-hero relative overflow-hidden"><HeroScene />
            <div className="relative z-10 max-w-2xl px-5 py-10 sm:px-10 sm:py-16"><span className="eyebrow"><Sparkles className="h-4 w-4" />مرجع مصادر الثالث الثانوي العلمي</span><h1 className="hero-title mt-5">ابدأ بالمادة.<span> ثم افتح ما تحتاجه.</span></h1><p className="mt-5 max-w-xl text-[16px] font-medium leading-8 text-[#5c747d] sm:text-lg">كتاب المنهج أولًا، ثم الشرح، ثم التدريب والاختبارات. تجد كل محطة في مكانها، دون قائمة طويلة أو بحث مشتت.</p><div className="hero-steps mt-7"><span><b>١</b>المنهج</span><i /><span><b>٢</b>الشرح</span><i /><span><b>٣</b>التدريب</span></div><a href="#materials" className="hero-cta mt-8">اختر مادة الآن <ChevronLeft className="h-5 w-5" /></a></div>
          </div>
        </section>

        <section id="materials" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="section-intro"><span className="section-kicker">اختر المادة</span><div><h2>اختر المادة، ثم امشِ في المسار.</h2><p>المواد العلمية والإنجليزية تحتوي كل المصادر. المواد الإسلامية والقرآن تعرض الكتاب الرسمي فقط.</p></div></div>
          <div className="route-strip mt-6" aria-label="مسار التعلم"><span className="route-node route-node-current"><b>١</b>المنهج</span><i /><span className="route-node"><b>٢</b>الشرح</span><i /><span className="route-node"><b>٣</b>التدريب والاختبارات</span></div>
          <div className="materials-grid mt-7">{materials.map((material, index) => { const Icon = icons[material.icon] ?? BookOpenText; const isActive = selected.id === material.id; return <button key={material.id} onClick={() => chooseMaterial(material)} className={`material-card ${index === 0 ? "material-featured" : ""} ${isActive ? "material-active" : ""}`}><span className="material-icon"><Icon className="h-6 w-6" strokeWidth={1.8} /></span><span className="material-name">{material.title}</span><span className="material-prompt">{material.bookOnly ? "الكتاب الرسمي فقط" : `${material.sources.length} مصادر منظمة`} <ChevronLeft className="h-4 w-4" /></span></button>; })}</div>
        </section>

        <section id="catalog" className="catalog-band px-4 py-14 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
          <div className="catalog-heading"><span className="active-subject-icon"><SubjectIcon className="h-8 w-8" /></span><div><span className="section-kicker text-[#bde9dc]">مصادر المادة</span><h2>{selected.title}</h2><p>{selected.bookOnly ? "ابدأ بكتاب المنهج الرسمي لهذه المادة." : "ابدأ بالمنهج، ثم انتقل للشرح أو التدريب. اسم قناة Telegram ظاهر داخل كل زر."}</p></div></div>
          {!selected.bookOnly && <div className="catalog-route mt-7" aria-label="مسار مصادر المادة"><span className={routeStage === "books" ? "route-active" : ""}><b>١</b>المنهج</span><i /><span className={routeStage === "explain" ? "route-active" : ""}><b>٢</b>الشرح</span><i /><span className={routeStage === "practice" ? "route-active" : ""}><b>٣</b>التدريب</span></div>}
          {!selected.bookOnly && <div className="filter-row mt-8" role="tablist" aria-label="تصنيف مصادر المادة">{resourceCategories.map((category) => { const count = category.id === "all" ? selected.sources.length : selected.sources.filter((source) => source.category === category.id).length; if (category.id !== "all" && count === 0) return null; return <button key={category.id} onClick={() => setFilter(category.id)} className={`filter-chip ${filter === category.id ? "filter-active" : ""}`} role="tab" aria-selected={filter === category.id}>{category.label}<span>{count}</span></button>; })}</div>}
          <div className={`catalog-groups mt-8 ${selected.bookOnly ? "book-only-layout" : ""}`}>{groupedSources.map((group) => { const GroupIcon = categoryIcons[group.id] ?? FileText; return <section key={group.id} className="catalog-group"><div className="group-heading"><span><GroupIcon className="h-5 w-5" /></span><h3>{group.label}</h3><small>{group.sources.length} مصدر</small></div><div className="source-grid">{group.sources.map((source) => <ResourceTile key={source.id} source={source} />)}</div></section>; })}</div>
        </div></section>

        {selectedUnits.length > 0 && <section id="units" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="section-intro"><span className="section-kicker">توسع حسب الوحدة</span><div><h2>اختر الوحدة التي تريد تقويتها</h2><p>مصادر قصيرة منتقاة للمحطات الأكثر أهمية في {selected.title}. افتح الوحدة ثم اختر المصدر المناسب.</p></div></div><div className="units-list mt-7">{selectedUnits.map((unit, index) => <details key={unit.title} className="unit-disclosure" open={index === 0}><summary><span className="unit-index">{index + 1}</span><span><b>{unit.label}</b><strong>{unit.title}</strong><small>{unit.note}</small></span><ChevronLeft className="unit-chevron h-5 w-5" /></summary><div className="unit-links">{unit.links.map((link) => <UnitLinkCard key={`${unit.title}-${link.title}`} link={link} />)}</div></details>)}</div></section>}

        <section id="exams" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="exam-intro"><div><span className="section-kicker">قسم عام</span><h2>النماذج والاختبارات للثالث الثانوي</h2><p>قنوات مختارة تساعدك في النماذج الوزارية والمراجعة والاختبارات.</p></div><FileQuestion className="hidden h-16 w-16 text-[#d1774e] sm:block" /></div><div className="exam-grid mt-7">{examChannels.map((channel) => <article key={channel.url} className="exam-card"><span className="exam-badge">{channel.badge}</span><h3>{channel.title}</h3><p><strong>{channel.handle}</strong> · {channel.detail}</p><a href={channel.url} target="_blank" rel="noreferrer" className="exam-button">Telegram · {channel.handle}<ExternalLink className="h-4 w-4" /></a></article>)}</div></section>

        <section className="mx-auto grid max-w-7xl gap-7 px-4 pb-14 sm:px-6 md:grid-cols-[1fr_330px] md:items-center lg:px-8"><div><span className="section-kicker">كيف تستخدم الدليل؟</span><h2 className="how-title mt-3">لا تحتاج إلى حفظ أسماء القنوات؛ اختر المادة ونوع المصدر فقط.</h2><div className="how-list mt-7"><p><b>الكتب:</b> مرجعك الأول ومن البوابة الرسمية.</p><p><b>الشرح وYouTube:</b> افتحه عندما تحتاج تبسيط درس أو متابعة قائمة كاملة.</p><p><b>Telegram والاختبارات:</b> الاسم والمعرّف ظاهران أمامك لتعرف بالضبط إلى أين ستنتقل.</p></div></div><StudyIllustration /></section>
      </main>

      <footer id="about" className="about-footer px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="about-grid">
            <section className="about-copy">
              <div className="footer-brandline"><BrandMark /><span><strong>دليل الثالث الثانوي اليمني</strong><small>مصادر منظمة للثالث الثانوي العلمي</small></span></div>
              <span className="about-kicker">من نحن</span>
              <h2>دليل بسيط، لطريق دراسي أوضح.</h2>
              <p>هذا الموقع يجمع مصادر التعلم الأساسية للثالث الثانوي العلمي في اليمن في واجهة مرتبة تساعد الطالب على الوصول إلى الكتاب، الشرح، الاختبارات، وقنوات Telegram دون البحث في قوائم مشتتة.</p>
              <p className="developer-line">تصميم وتطوير <strong>{DEVELOPER_NAME}</strong><span>طالب تقنية معلومات · هندسة البرمجيات والذكاء الاصطناعي</span></p>
              <a href="https://alharethprofilo.netlify.app/" target="_blank" rel="noreferrer" className="profile-card" aria-label="زيارة بروفايل الحارث الداهية">
                <img src={PROFILE_IMAGE_URL} alt="الحارث الداهية، مطور الموقع" loading="lazy" decoding="async" />
                <span><small>بروفايل المطوّر</small><strong>الحارث الداهية</strong><em>زيارة الموقع الشخصي <ExternalLink className="h-3.5 w-3.5" /></em></span>
              </a>
              <a href="#materials" className="about-quick-link">استعرض المواد التعليمية <ChevronLeft className="h-4 w-4" /></a>
            </section>
            <section className="connect-panel" aria-label="روابط التواصل">
              <div className="connect-title"><MessageCircle className="h-5 w-5" /><div><span>تواصل مع المطوّر</span><p>روابط الحسابات الرسمية</p></div></div>
              <div className="social-list">{socialLinks.map((social) => { const Icon = social.icon; const isEmail = social.href.startsWith("mailto:"); return <a key={social.label} href={social.href} target={isEmail ? undefined : "_blank"} rel={isEmail ? undefined : "noreferrer"} className={`social-card ${social.tone}`}><Icon className="h-4 w-4" /><span>{social.label}</span><ExternalLink className="mr-auto h-3.5 w-3.5 opacity-60" /></a>; })}</div>
            </section>
          </div>
          <div className="footer-bottomline"><span>الكتب والمصادر الخارجية تفتح في منصاتها الأصلية.</span><span>دليل الثالث الثانوي اليمني · القسم العلمي</span></div>
        </div>
      </footer>
      <nav className="mobile-nav md:hidden" aria-label="تنقل سريع"><a href="#materials">المواد</a><a href="#catalog">المصادر</a><a href="#exams">الاختبارات</a><a href="#about">من نحن</a></nav>
    </div>
  );
}

function ResourceTile({ source }: { source: ResourceCard }) {
  const Icon = categoryIcons[source.category] ?? FileText;
  const buttonText = sourceButtonText(source);
  return <article className={`resource-tile resource-${source.category}`}><div className="resource-top"><span className="resource-badge"><Icon className="h-3.5 w-3.5" />{source.badge}</span>{source.handle && <span className="telegram-handle">{source.handle}</span>}</div><h4>{source.title}</h4><p>{source.detail || source.platform}</p><a href={source.url} target="_blank" rel="noreferrer" className="resource-button">{buttonText}<ExternalLink className="h-4 w-4" /></a></article>;
}

function UnitLinkCard({ link }: { link: UnitLink }) {
  const Icon = link.kind === "قناة Telegram" ? Send : link.kind === "اختبارات" ? FileQuestion : link.kind === "إثرائي بالعربية" ? BookOpen : PlayCircle;
  return <a href={link.url} target="_blank" rel="noreferrer" className={`unit-link-card ${link.kind === "قناة Telegram" ? "unit-telegram" : ""}`}><span className="unit-link-icon"><Icon className="h-5 w-5" /></span><span className="unit-link-copy"><small>{link.kind}</small><strong>{link.title}</strong><em>{link.handle ? `${link.handle} · ` : ""}{link.description}</em></span><ExternalLink className="h-4 w-4 shrink-0 text-[#6d8790]" /></a>;
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><BookOpen className="h-6 w-6" strokeWidth={2.2} /><i /></span>;
}

function HeroScene() {
  return <div className="hero-scene" aria-hidden="true"><span className="scene-orbit orbit-one" /><span className="scene-orbit orbit-two" /><span className="scene-sheet sheet-one" /><span className="scene-sheet sheet-two" /><span className="scene-book"><BookOpen className="h-12 w-12" /><b>٣</b></span><span className="scene-chip chip-one">كتاب</span><span className="scene-chip chip-two">شرح</span><span className="scene-chip chip-three">تدريب</span></div>;
}

function StudyIllustration() {
  return <div className="how-illustration" aria-hidden="true"><span className="illustration-label">مسار المراجعة</span><div className="illustration-route"><i><BookOpenCheck className="h-6 w-6" /></i><b /><i><PlayCircle className="h-6 w-6" /></i><b /><i><FileQuestion className="h-6 w-6" /></i></div><div className="illustration-subjects"><Atom /><FlaskConical /><Dna /></div></div>;
}
