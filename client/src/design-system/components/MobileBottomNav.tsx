import type { LucideIcon } from "lucide-react";
import { iconStroke } from "../icons/icon-system";

export type BottomNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type MobileBottomNavProps = {
  items: BottomNavItem[];
  activeId: string;
  onChange?: (id: string) => void;
};

export function MobileBottomNav({ items, activeId, onChange }: MobileBottomNavProps) {
  return (
    <nav className="v3-mobile-bottom-nav" aria-label="التنقل الرئيسي">
      {items.map((item) => {
        const active = item.id === activeId;
        const Icon = item.icon;
        return (
          <button
            aria-current={active ? "page" : undefined}
            className={active ? "is-active" : undefined}
            key={item.id}
            onClick={() => onChange?.(item.id)}
            type="button"
          >
            <Icon
              aria-hidden="true"
              height={20}
              strokeWidth={active ? iconStroke.active : iconStroke.default}
              width={20}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
