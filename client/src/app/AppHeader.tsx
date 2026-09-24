import { functionalIcons, iconSize, iconStroke } from "@/design-system/icons/icon-system";
import { v3AssetPaths } from "@/design-system/assets/asset-paths";
import type { AppRoute } from "@/app/routing";
import "./app-header.css";

export type PrimaryNavigationTarget = "home" | "curriculum" | "practice" | "prompts" | "resources";

interface AppHeaderProps {
  route: AppRoute;
  onNavigate: (target: PrimaryNavigationTarget) => void;
}

const navigationItems = [
  {
    id: "home",
    label: "الرئيسية",
    icon: functionalIcons.navigation.home.icon,
  },
  {
    id: "curriculum",
    label: "المنهج",
    icon: functionalIcons.content.curriculum.icon,
  },
  {
    id: "practice",
    label: "التدريب",
    icon: functionalIcons.content.practice.icon,
  },
  {
    id: "prompts",
    label: "مولد الأوامر",
    icon: functionalIcons.content.prompts.icon,
  },
  {
    id: "resources",
    label: "المزيد",
    icon: functionalIcons.content.resources.icon,
  },
] as const;

export default function AppHeader({ route, onNavigate }: AppHeaderProps) {
  const HomeIcon = functionalIcons.navigation.home.icon;

  return (
    <header className="v3-app-header" data-app-header="">
      <button
        className="v3-app-header__brand"
        type="button"
        onClick={() => onNavigate("home")}
        aria-label="الانتقال إلى الرئيسية"
      >
        <img
          alt=""
          aria-hidden="true"
          className="v3-app-header__brand-symbol"
          data-v3-brand=""
          src={v3AssetPaths.brand}
        />
        <span className="v3-app-header__brand-copy">
          <strong>دليل الثالث</strong>
          <span>الثالث الثانوي</span>
        </span>
      </button>

      <nav className="v3-app-header__desktop-nav" aria-label="التنقل الرئيسي">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = route === item.id;

          return (
            <button
              key={item.id}
              className={active ? "v3-app-header__nav-item is-active" : "v3-app-header__nav-item"}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                aria-hidden="true"
                size={iconSize.md}
                strokeWidth={active ? iconStroke.active : iconStroke.default}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <span className="v3-app-header__mobile-mark" aria-hidden="true">
        <HomeIcon size={iconSize.sm} strokeWidth={iconStroke.default} />
      </span>
    </header>
  );
}
