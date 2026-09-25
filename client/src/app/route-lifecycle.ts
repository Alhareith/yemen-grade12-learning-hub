import { useEffect, useRef } from "react";
import type { AppRoute } from "@/app/routing";

const productShellRoutes = new Set<AppRoute>([
  "home",
  "curriculum",
  "practice",
  "prompts",
  "resources",
]);

export function isProductShellRoute(route: AppRoute) {
  return productShellRoutes.has(route);
}

export function getRouteScrollBehavior(): ScrollBehavior {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function focusAppContent() {
  const content = document.getElementById("app-content");
  if (!content) return false;

  content.focus({ preventScroll: true });
  return document.activeElement === content;
}

export function revealAppContent() {
  const content = document.getElementById("app-content");
  if (!content) return false;

  content.focus({ preventScroll: true });
  content.scrollIntoView({ block: "start", behavior: "auto" });
  return true;
}

export function resetProductRouteView() {
  focusAppContent();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: getRouteScrollBehavior(),
  });
}

export function useRouteLifecycle(route: AppRoute) {
  const previousRoute = useRef<AppRoute | null>(null);

  useEffect(() => {
    const previous = previousRoute.current;
    previousRoute.current = route;

    if (
      previous === null ||
      previous === route ||
      !isProductShellRoute(route)
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      resetProductRouteView();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [route]);

  return { resetCurrentRouteView: resetProductRouteView };
}
