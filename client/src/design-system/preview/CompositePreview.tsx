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
    <div data-v3-ui className="v3-composite-preview" dir="rtl">
      <main className="v3-composite-preview__content">
        <header>
          <span className="v3-type-meta">Stage 3I · isolated reference preview</span>
          <h1 className="v3-type-h1">الهوية البصرية المركبة</h1>
        </header>

        <SimulationBanner
          description="اختبر نفسك في تجربة مستقلة ثم ارجع للتحليل والتدريب."
          illustrationSrc={v3AssetPaths.simulation}
          title="محاكاة الاختبار النهائي"
        />

        <section className="v3-composite-preview__quick-grid">
          <QuickActionCard illustrationSrc={v3AssetPaths.actions.prompts} title="مولد الأوامر" tone="prompts" />
          <QuickActionCard illustrationSrc={v3AssetPaths.actions.practice} title="ابدأ التدريب" tone="practice" />
          <QuickActionCard illustrationSrc={v3AssetPaths.actions.curriculum} title="تصفح المنهج" tone="curriculum" />
        </section>

        <section>
          <h2 className="v3-type-h2">مواد دراسية — Compact</h2>
          <div className="v3-composite-preview__subject-grid">
            <SubjectCard illustrationSrc={v3AssetPaths.subjects.math} meta="٣ وحدات · ١٠ دروس" title="الرياضيات" tone="math" />
            <SubjectCard illustrationSrc={v3AssetPaths.subjects.physics} meta="قريبًا" title="الفيزياء" tone="physics" />
          </div>
        </section>

        <section>
          <h2 className="v3-type-h2">Curriculum Actionable</h2>
          <div className="v3-composite-preview__subject-grid">
            <SubjectCard illustrationSrc={v3AssetPaths.subjects.chemistry} meta="الوحدات والدروس والاختبارات" title="الكيمياء" tone="chemistry" variant="actionable" />
            <SubjectCard illustrationSrc={v3AssetPaths.subjects.biology} meta="الوحدات والدروس والاختبارات" title="الأحياء" tone="biology" variant="actionable" />
          </div>
        </section>
      </main>

      <MobileBottomNav activeId={active} items={navItems} onChange={setActive} />
    </div>
  );
}
