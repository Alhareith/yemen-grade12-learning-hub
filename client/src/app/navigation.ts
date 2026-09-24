import type { AppRoute } from "@/app/routing";
import { functionalIcons } from "@/design-system/icons/icon-system";

export type PrimaryNavigationTarget =
  | "home"
  | "curriculum"
  | "practice"
  | "prompts"
  | "resources";

export const primaryNavigationItems = [
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

export function getPrimaryNavigationActiveId(
  route: AppRoute,
): PrimaryNavigationTarget {
  if (
    route === "home" ||
    route === "curriculum" ||
    route === "practice" ||
    route === "prompts" ||
    route === "resources"
  ) {
    return route;
  }

  return "home";
}
