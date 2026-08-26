/**
 * Design note — دفتر الوصول: every material exposes only two large, named choices: the official book and one reviewed Telegram channel.
 */
import { useState } from "react";
import {
  Atom,
  BookOpenCheck,
  BookOpenText,
  ChevronLeft,
  Compass,
  Dna,
  ExternalLink,
  FlaskConical,
  Languages,
  MessageCircle,
  ScrollText,
  SearchCheck,
  Send,
  Sigma,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react";
import { simpleMaterials, type SimpleMaterial } from "@/data/simpleCatalog";

const LOGO_URL = "/manus-storage/yemen_learning_logo_d4c14700.png";
const HERO_URL = "/manus-storage/yemen_learning_hero_2c99a99c.jpg";
const SUBJECTS_URL = "/manus-storage/yemen_learning_subjects_2e6313c9.jpg";
const DEVELOPER_NAME = "الحارث الداهية";

const icons: Record<string, LucideIcon> = {
  رياضيات: Sigma,
  فيزياء: Atom,
  كيمياء: FlaskConical,
  أحياء: Dna,
  "لغة إنجليزية": Languages,
  "نحو وصرف": Type,
  "أدب ونصوص وبلاغة": BookOpenText,
  قراءة: SearchCheck,
  "قرآن كريم": ScrollText,
  "سيرة نبوية": Compass,
};

export default function Home() {
  const [selected, setSelected] = useState<SimpleMaterial>(simpleMaterials[0]);
  const ActiveIcon = icons[selected.id] ?? BookOpenText;

  const chooseMaterial = (material: SimpleMaterial) => {
    setSelected(material);
    requestAnimationFrame(() => document.querySelector("#material-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#fbf8f0] text-[#17354a]">
      <header className="sticky top-0 z-50 border-b border-[#d9e7e3] bg-[#fbf8f0]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-right" aria-label="العودة إلى بداية الدليل">
            <img src={LOGO_URL} alt="رمز دليل الثالث الثانوي" className="h-12 w-12 object-contain" />
            <span><strong className="block font-kufi text-[15px] text-[#175A7A]">دليل الثالث</strong><span className="mt-0.5 block text-[12px] font-bold text-[#71868f]">علمي · اليمن</span></span>
          </button>
          <a href="#materials" className="header-action">المواد</a>
        </div>
      </header>

      <main>
        <section className="hero-shell mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
          <div className="hero-paper relative overflow-hidden">
            <img src={HERO_URL} alt="دفتر ومصادر تعليمية" className="hero-image" />
            <div className="hero-shade" />
            <div className="relative z-10 max-w-2xl px-5 py-10 sm:px-10 sm:py-16">
              <span className="eyebrow"><Sparkles className="h-4 w-4" />دليل مصادر منظّم للثالث الثانوي</span>
              <h1 className="hero-title mt-5">افتح <span>الكتاب الرسمي</span><br />وادخل قناة المادة مباشرة.</h1>
              <p className="mt-5 max-w-xl text-[16px] font-medium leading-8 text-[#5c747d] sm:text-lg">لكل مادة خياران واضحان فقط: كتاب المنهج من البوابة الرسمية، وقناة Telegram تم التحقق من تخصصها.</p>
              <div className="hero-steps mt-7" aria-label="مسار الاستخدام">
                <span><b>١</b>اختر المادة</span><i /> <span><b>٢</b>افتح الكتاب</span><i /> <span><b>٣</b>ادخل القناة</span>
              </div>
              <a href="#materials" className="hero-cta mt-8">ابدأ باختيار المادة <ChevronLeft className="h-5 w-5" /></a>
            </div>
          </div>
        </section>

        <section id="materials" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="section-intro">
            <span className="section-kicker">خطوة ١</span>
            <div><h2>اختر المادة التي تريد مراجعتها</h2><p>اضغط على بطاقة المادة، ثم ستظهر لك خياراتها في قسم واحد واضح أسفلها.</p></div>
          </div>
          <div className="materials-grid mt-7">
            {simpleMaterials.map((material, index) => {
              const Icon = icons[material.id] ?? BookOpenText;
              const isActive = selected.id === material.id;
              return (
                <button key={material.id} onClick={() => chooseMaterial(material)} className={`material-card ${index === 0 ? "material-featured" : ""} ${isActive ? "material-active" : ""}`}>
                  <span className="material-icon"><Icon className="h-6 w-6" strokeWidth={1.8} /></span>
                  <span className="material-name">{material.title}</span>
                  <span className="material-prompt">افتح خيارات المادة <ChevronLeft className="h-4 w-4" /></span>
                </button>
              );
            })}
          </div>
        </section>

        <section id="material-detail" className="detail-band px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="detail-heading">
              <span className="active-subject-icon"><ActiveIcon className="h-8 w-8" /></span>
              <div><span className="section-kicker text-[#bde9dc]">خطوة ٢</span><h2>مصادر {selected.title}</h2><p>اختر الخيار الذي تحتاجه الآن. لا يوجد ما يشتتك هنا.</p></div>
            </div>
            <div className="source-choice-grid mt-8">
              <article className="source-choice book-choice">
                <div className="choice-top"><span className="choice-index">١</span><span className="choice-label"><BookOpenCheck className="h-5 w-5" />الكتاب الرسمي</span></div>
                <h3>{selected.book.title}</h3>
                <p>المصدر: {selected.book.platform === "PDF" ? "بوابة التعليم الإلكتروني اليمنية" : selected.book.platform}</p>
                <a href={selected.book.url} target="_blank" rel="noreferrer" className="choice-button book-button">افتح الكتاب الرسمي <ExternalLink className="h-5 w-5" /></a>
              </article>

              <article className="source-choice telegram-choice">
                <div className="choice-top"><span className="choice-index">٢</span><span className="choice-label"><Send className="h-5 w-5" />قناة Telegram</span></div>
                <h3>{selected.telegram.name}</h3>
                <p><strong>{selected.telegram.handle}</strong> · {selected.telegram.kind}</p>
                <div className="telegram-note"><MessageCircle className="h-4 w-4" />{selected.telegram.detail}</div>
                <a href={selected.telegram.url} target="_blank" rel="noreferrer" className="choice-button telegram-button">ادخل قناة Telegram <ExternalLink className="h-5 w-5" /></a>
              </article>
            </div>
            <div className="review-note mt-5"><SearchCheck className="h-5 w-5" /><span>تم اختيار القناة بعد فحص الاسم والوصف وتخصص المحتوى. تظهر القنوات العامة الرسمية بوسم واضح.</span></div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-7 px-4 py-14 sm:px-6 md:grid-cols-[1fr_330px] md:items-center">
          <div><span className="section-kicker">كيف تستخدم الدليل؟</span><h2 className="how-title mt-3">كل مادة في مكانها، وكل قرار واضح أمامك.</h2><div className="how-list mt-7"><p><b>أولًا:</b> ابدأ بالكتاب الرسمي؛ فهو مرجعك الأساسي للمقرر.</p><p><b>ثانيًا:</b> ادخل القناة الظاهرة بالاسم عندما تحتاج شرحًا أو مراجعة أو نماذج.</p><p><b>ثالثًا:</b> عُد إلى الدليل وانتقل لمادة أخرى دون البحث في قنوات مشتتة.</p></div></div>
          <img src={SUBJECTS_URL} alt="رموز مواد علمية" className="how-image" />
        </section>
      </main>

      <footer className="footer-shell px-4 py-9 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-right">
          <div className="flex items-center justify-center gap-3 sm:justify-start"><img src={LOGO_URL} alt="" className="h-11 w-11" /><span><strong className="block font-kufi text-sm text-[#175A7A]">دليل الثالث الثانوي اليمني</strong><span className="block pt-1 text-xs font-medium text-[#6d838b]">المصادر الخارجية ملك لأصحابها وتفتح في منصة المصدر.</span></span></div>
          <p className="developer-credit">تصميم وتطوير <strong>{DEVELOPER_NAME}</strong></p>
        </div>
      </footer>

      <nav className="mobile-nav md:hidden" aria-label="تنقل سريع"><a href="#materials">المواد</a><a href="#material-detail">مصادر {selected.title}</a></nav>
    </div>
  );
}
