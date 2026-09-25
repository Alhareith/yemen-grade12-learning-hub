/**
 * Product shell — prompts, curriculum navigation, skill practice and simulations are loaded on demand.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import AppHeader from "@/app/AppHeader";
import AppMobileNavigation from "@/app/AppMobileNavigation";
import { type PrimaryNavigationTarget } from "@/app/navigation";
import AppShell from "@/app/AppShell";
import { AppErrorState, AppRouteLoading } from "@/app/AppRouteState";
import ErrorBoundary from "@/app/ErrorBoundary";
import { useRouteLifecycle } from "@/app/route-lifecycle";
import {
  appRouteHash,
  parseAppHash,
  readPracticeSkillIdFromHash,
  type AppRoute,
} from "@/app/routing";
import {
  cancelCurriculumReturnAfterPractice,
} from "@/features/curriculum/curriculum-return-state";
import Home, { type HomeRouteView } from "@/features/home/Home";
import "./v2.css";
import "./polish.css";

const ExamPilot = lazy(() => import("./pages/ExamPilot"));
const CurriculumExplorer = lazy(() => import("@/features/curriculum/CurriculumExplorer"));
const SkillPractice = lazy(() => import("@/features/practice/SkillPractice"));
const ArabicExamTypography = lazy(() => import("@/components/ArabicExamTypography"));
const CompositePreview = lazy(() =>
  import("@/design-system/preview/CompositePreview").then((module) => ({
    default: module.CompositePreview,
  })),
);
const PrimitivesPreview = lazy(() =>
  import("@/design-system/preview/PrimitivesPreview").then((module) => ({
    default: module.PrimitivesPreview,
  })),
);

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseAppHash(window.location.hash));
  const [homeResetSignal, setHomeResetSignal] = useState(0);
  const { resetCurrentRouteView } = useRouteLifecycle(route);

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = parseAppHash(window.location.hash);
      setRoute((currentRoute) => {
        if (
          currentRoute === "practice" &&
          nextRoute !== "practice" &&
          nextRoute !== "curriculum"
        ) {
          cancelCurriculumReturnAfterPractice();
        }
        return nextRoute;
      });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigatePrimary = (target: PrimaryNavigationTarget) => {
    const resolvedTarget =
      target === "practice" && route !== "practice"
        ? "curriculum"
        : target;

    if (
      route === "practice" &&
      resolvedTarget !== "practice" &&
      resolvedTarget !== "curriculum"
    ) {
      cancelCurriculumReturnAfterPractice();
    }

    if (resolvedTarget === route || resolvedTarget === "practice") {
      if (resolvedTarget === "home") {
        setHomeResetSignal((value) => value + 1);
      }
      resetCurrentRouteView();
      return;
    }

    window.location.hash = appRouteHash[resolvedTarget];
    setRoute(resolvedTarget);
  };

  const goHome = () => navigatePrimary("home");
  const goCurriculum = () => navigatePrimary("curriculum");
  const navigateHomeFeature = (target: HomeRouteView) => navigatePrimary(target);

  return (
    <ErrorBoundary>
      {route === "design-system-primitives" ? (
        <Suspense fallback={<AppRouteLoading standalone />}>
          <PrimitivesPreview />
        </Suspense>
      ) : route === "design-system-preview" ? (
        <Suspense fallback={<AppRouteLoading standalone />}>
          <CompositePreview />
        </Suspense>
      ) : route === "exam-pilot" ? (
        <Suspense fallback={<AppRouteLoading standalone />}>
          <div data-arabic-exam dir="rtl" lang="ar">
            <ArabicExamTypography />
            <ExamPilot onBack={goHome} />
          </div>
        </Suspense>
      ) : (
        <AppShell
          header={<AppHeader route={route} onNavigate={navigatePrimary} />}
          mobileNavigation={
            <AppMobileNavigation route={route} onNavigate={navigatePrimary} />
          }
        >
          <ErrorBoundary
            resetKey={route}
            fallback={({ reset }) => (
              <AppErrorState
                onHome={() => {
                  reset();
                  goHome();
                }}
                onRetry={() => window.location.reload()}
              />
            )}
          >
          {route === "practice" ? (
            <Suspense fallback={<AppRouteLoading />}>
              <SkillPractice
                skillId={readPracticeSkillIdFromHash(window.location.hash)}
                onBack={goCurriculum}
              />
            </Suspense>
          ) : route === "curriculum" ? (
            <Suspense fallback={<AppRouteLoading />}>
              <CurriculumExplorer onBack={goHome} />
            </Suspense>
          ) : (
            <>
              <Home
                routeView={route === "prompts" || route === "resources" ? route : "home"}
                resetSignal={homeResetSignal}
                onRouteNavigate={navigateHomeFeature}
              />
            </>
          )}
          </ErrorBoundary>
        </AppShell>
      )}
    </ErrorBoundary>
  );
}
