import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import { useState } from "react";
import { functionalIcons } from "../icons/icon-system";
import { v3AssetPaths } from "../assets/asset-paths";
import {
  MobileBottomNav,
  QuickActionCard,
  SimulationBanner,
  SubjectCard,
} from "../components";
import "../tokens/tokens.css";
import "../typography/typography.css";
import "../components/components.css";
import "./composite-preview.css";

export function CompositePreview() {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "الرئيسية", icon: functionalIcons.navigation.home.icon },
    { id: "curriculum", label: "المنهج", icon: functionalIcons.content.curriculum.icon },
    { id: "practice", label: "التدريب", icon: functionalIcons.content.practice.icon },
    { id: "prompts", label: "مولد الأوامر", icon: functionalIcons.content.prompts.icon },
    { id: "resources", label: "المزيد", icon: functionalIcons.content.resources.icon },
  ];

  return (
    <div data-v3-ui data-v3-validation className="v3-composite-preview" dir="rtl">
      <main className="v3-composite-preview__content">
        <header>
          <span className="v3-type-meta">Stage 3J · visual validation harness</span>
          <h1 className="v3-type-h1">الهوية البصرية المركبة</h1>
          <p className="v3-type-body">
            صفحة تحقق معزولة لقياس الاستجابة والاتجاه والتكوين قبل نقل التصميم إلى الشاشات الفعلية.
          </p>
        </header>

        <SimulationBanner
          description="اختبر نفسك في تجربة مستقلة ثم ارجع للتحليل والتدريب."
          illustrationSrc={v3AssetPaths.simulation}
          title="محاكاة الاختبار النهائي"
        />

        <section className="v3-composite-preview__quick-grid" data-v3-quick-grid>
          <QuickActionCard illustrationSrc={v3AssetPaths.actions.prompts} title="مولد الأوامر" tone="prompts" />
          <QuickActionCard illustrationSrc={v3AssetPaths.actions.practice} title="ابدأ التدريب" tone="practice" />
          <QuickActionCard illustrationSrc={v3AssetPaths.actions.curriculum} title="تصفح المنهج" tone="curriculum" />
        </section>

        <section>
          <h2 className="v3-type-h2">بطاقات Home المختصرة</h2>
          <div className="v3-composite-preview__subject-grid" data-v3-subject-grid="compact">
            <SubjectCard meta="٣ وحدات · ١٠ دروس" title="الرياضيات" tone="math" />
            <SubjectCard meta="قريبًا" title="الفيزياء" tone="physics" />
            <SubjectCard meta="قريبًا" title="الكيمياء" tone="chemistry" />
            <SubjectCard meta="قريبًا" title="الأحياء" tone="biology" />
          </div>
        </section>

        <section>
          <h2 className="v3-type-h2">بطاقات Curriculum الإجرائية</h2>
          <div className="v3-composite-preview__subject-grid" data-v3-subject-grid="actionable">
            <SubjectCard meta="الوحدات والدروس والاختبارات" title="اللغة العربية" tone="arabic" variant="actionable" />
            <SubjectCard meta="الوحدات والدروس والاختبارات" title="اللغة الإنجليزية" tone="english" variant="actionable" />
            <SubjectCard meta="الوحدات والدروس والاختبارات" title="التربية الإسلامية" tone="islamic" variant="actionable" />
            <SubjectCard meta="الوحدات والدروس والاختبارات" title="الاجتماعيات" tone="social" variant="actionable" />
          </div>
        </section>
      </main>

      <MobileBottomNav activeId={active} items={navItems} onChange={setActive} />
    </div>
  );
}
