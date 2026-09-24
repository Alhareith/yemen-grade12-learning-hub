import type { AppRoute } from "@/app/routing";
import {
  getPrimaryNavigationActiveId,
  primaryNavigationItems,
  type PrimaryNavigationTarget,
} from "@/app/navigation";
import { MobileBottomNav } from "@/design-system/components";

interface AppMobileNavigationProps {
  route: AppRoute;
  onNavigate: (target: PrimaryNavigationTarget) => void;
}

export default function AppMobileNavigation({
  route,
  onNavigate,
}: AppMobileNavigationProps) {
  return (
    <MobileBottomNav
      activeId={getPrimaryNavigationActiveId(route)}
      items={[...primaryNavigationItems]}
      onChange={(id) => onNavigate(id as PrimaryNavigationTarget)}
    />
  );
}
