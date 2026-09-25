import { functionalIcons } from "@/design-system/icons/icon-system";
import { v3AssetPaths } from "@/design-system/assets/asset-paths";
import "./home-experience.css";

const curriculumHash = "#curriculum";
const promptsHash = "#prompts";
const resourcesHash = "#resources";
const simulationHash = "#exam-pilot";

const quickActions = [
  {
    id: "curriculum",
    title: "المنهج",
    description: "تصفح المواد والوحدات والدروس المعتمدة.",
    href: curriculumHash,
    tone: "curriculum",
    image: v3AssetPaths.actions.curriculum,
    icon: functionalIcons.content.curriculum.icon,
  },
  {
    id: "practice",
    title: "التدريب",
    description: "ابدأ من المنهج للوصول إلى التدريب المتاح.",
    href: curriculumHash,
    tone: "practice",
    image: v3AssetPaths.actions.practice,
    icon: functionalIcons.content.practice.icon,
  },
  {
    id: "prompts",
    title: "مولد الأوامر",
    description: "احصل على أوامر جاهزة تساعدك في الفهم والمذاكرة.",
    href: promptsHash,
    tone: "prompts",
    image: v3AssetPaths.actions.prompts,
    icon: functionalIcons.content.prompts.icon,
  },
  {
    id: "resources",
    title: "المصادر",
    description: "كتب وفيديوهات وروابط مفيدة مرتبة للطالب.",
    href: resourcesHash,
    tone: "resources",
    image: null,
    icon: functionalIcons.content.resources.icon,
  },
] as const;

const resourceGuides = [
  {
    title: "ملخصات ومراجعات",
    detail: "مواد مرتبة للمراجعة.",
    icon: functionalIcons.content.curriculum.icon,
  },
  {
    title: "شروحات وفيديو",
    detail: "محتوى مرئي مفيد.",
    icon: functionalIcons.content.video.icon,
  },
  {
    title: "نماذج اختبارات",
    detail: "مراجعة إضافية عند الحاجة.",
    icon: functionalIcons.content.questions.icon,
  },
  {
    title: "نصائح للمذاكرة",
    detail: "إرشاد مختصر وواضح.",
    icon: functionalIcons.content.resources.icon,
  },
] as const;

function BookStack({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "v3-home-book-stack is-compact" : "v3-home-book-stack"} aria-hidden="true">
      <span className="is-math">الرياضيات</span>
      <span className="is-physics">الفيزياء</span>
      <span className="is-chemistry">الكيمياء</span>
      <span className="is-biology">الأحياء</span>
      <span className="is-arabic">اللغة العربية</span>
      <span className="is-english">اللغة الإنجليزية</span>
    </div>
  );
}

export default function HomeExperience() {
  const CurriculumIcon = functionalIcons.content.curriculum.icon;
  const PracticeIcon = functionalIcons.content.practice.icon;
  const SimulationIcon = functionalIcons.content.simulation.icon;
  const ForwardIcon = functionalIcons.navigation.forward.icon;
  const SuccessIcon = functionalIcons.status.success.icon;
  const ResourcesIcon = functionalIcons.content.resources.icon;

  return (
    <div className="v3-home" data-v3-ui="" dir="rtl" lang="ar">
      <div className="v3-home__container">
        <section className="v3-home-hero" aria-labelledby="v3-home-title">
          <div className="v3-home-hero__visual" aria-hidden="true">
            <div className="v3-home-hero__glow" />
            <BookStack />
            <div className="v3-home-hero__study-card">
              <img src={v3AssetPaths.actions.curriculum} alt="" width="112" height="112" decoding="async" />
            </div>
            <div className="v3-home-hero__line-art" />
          </div>

          <div className="v3-home-hero__copy" dir="rtl">
            <span className="v3-home-hero__eyebrow">دليل الثالث الثانوي اليمني</span>
            <h1 id="v3-home-title">ابدأ من حيث تحتاج</h1>
            <p>تابع المنهج خطوة بخطوة، افهم الموضوعات الصعبة، تدرّب على المتاح، وقِس تقدمك بثقة.</p>
          </div>

          <div className="v3-home-hero__actions" dir="rtl">
            <a className="v3-home-button v3-home-button--primary" href={curriculumHash}>
              <CurriculumIcon aria-hidden="true" />
              <span>ابدأ بالمنهج</span>
            </a>
            <a className="v3-home-button v3-home-button--secondary" href={curriculumHash}>
              <PracticeIcon aria-hidden="true" />
              <span>تدرّب الآن</span>
            </a>
          </div>

          <div className="v3-home-hero__benefits" dir="rtl" aria-label="مزايا البداية">
            <span><ResourcesIcon aria-hidden="true" />شرح ومسار واضح</span>
            <span><SimulationIcon aria-hidden="true" />تدريب واستعداد للاختبارات</span>
            <span><PracticeIcon aria-hidden="true" />متابعة التقدم</span>
          </div>
        </section>

        <div className="v3-home-middle">
          <section className="v3-home-curriculum" aria-labelledby="v3-home-curriculum-title">
            <div className="v3-home-curriculum__art" aria-hidden="true">
              <BookStack compact />
              <img src={v3AssetPaths.actions.curriculum} alt="" width="112" height="112" decoding="async" loading="lazy" />
            </div>
            <div className="v3-home-curriculum__copy">
              <h2 id="v3-home-curriculum-title">المنهج الدراسي</h2>
              <p>مواد الصف الثالث الثانوي في مسار واضح ومنظم.</p>
              <a className="v3-home-button v3-home-button--primary v3-home-curriculum__cta" href={curriculumHash}>
                <span>ادخل إلى المنهج</span>
                <ForwardIcon aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="v3-home-quick-section" aria-labelledby="v3-home-quick-title">
            <header className="v3-home-section-heading">
              <div>
                <h2 id="v3-home-quick-title">ابدأ بسرعة</h2>
                <p>اختر ما تريد وانتقل مباشرة إلى الأدوات الأكثر استخدامًا.</p>
              </div>
            </header>

            <div className="v3-home-quick-grid">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.id}
                    className={`v3-home-quick-card v3-home-quick-card--${action.tone}`}
                    href={action.href}
                  >
                    <span className="v3-home-quick-card__visual" aria-hidden="true">
                      {action.image ? (
                        <img src={action.image} alt="" width="64" height="64" decoding="async" loading="lazy" />
                      ) : (
                        <Icon />
                      )}
                    </span>
                    <span className="v3-home-quick-card__copy">
                      <strong>{action.title}</strong>
                      <small>{action.description}</small>
                    </span>
                    <span className="v3-home-quick-card__arrow" aria-hidden="true">
                      <ForwardIcon />
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <section className="v3-home-simulation" aria-labelledby="v3-home-simulation-title">
          <div className="v3-home-simulation__art">
            <img
              src={v3AssetPaths.simulation}
              alt=""
              width="320"
              height="180"
              decoding="async"
              loading="lazy"
            />
          </div>

          <div className="v3-home-simulation__copy">
            <span className="v3-home-simulation__title-line">
              <SimulationIcon aria-hidden="true" />
              <h2 id="v3-home-simulation-title">محاكاة الرياضيات</h2>
            </span>
            <p>اختبر مستواك في محاكاة كاملة مع حفظ واستكمال ونتيجة بعد التسليم.</p>
            <a className="v3-home-simulation__cta" href={simulationHash}>
              <span>ابدأ المحاكاة</span>
              <ForwardIcon aria-hidden="true" />
            </a>
          </div>

          <div className="v3-home-simulation__checks" aria-label="خصائص المحاكاة">
            <span><SuccessIcon aria-hidden="true" />حفظ واستكمال</span>
            <span><SuccessIcon aria-hidden="true" />نتيجة بعد التسليم</span>
            <span><SuccessIcon aria-hidden="true" />مراجعة أخطائك</span>
          </div>
        </section>

        <section className="v3-home-resources" aria-labelledby="v3-home-resources-title">
          <div className="v3-home-resources__lead">
            <span className="v3-home-resources__icon" aria-hidden="true"><ResourcesIcon /></span>
            <span>
              <h2 id="v3-home-resources-title">مصادر وإرشادات مهمة</h2>
              <p>وصول سريع إلى الموارد التي تحتاجها أثناء رحلتك الدراسية.</p>
            </span>
          </div>

          <div className="v3-home-resources__tiles" aria-hidden="true">
            {resourceGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <span className="v3-home-resource-tile" key={guide.title}>
                  <Icon />
                  <span><strong>{guide.title}</strong><small>{guide.detail}</small></span>
                </span>
              );
            })}
          </div>

          <a className="v3-home-resources__cta" href={resourcesHash}>
            <span>عرض جميع المصادر</span>
            <ForwardIcon aria-hidden="true" />
          </a>
        </section>
      </div>
    </div>
  );
}
