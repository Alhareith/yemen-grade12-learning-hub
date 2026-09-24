/**
 * Product shell — prompts, curriculum navigation, skill practice and simulations are loaded on demand.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import AppHeader, { type PrimaryNavigationTarget } from "@/app/AppHeader";
import AppShell from "@/app/AppShell";
import ErrorBoundary from "@/app/ErrorBoundary";
import {
  appRouteHash,
  parseAppHash,
  readPracticeSkillIdFromHash,
  type AppRoute,
} from "@/app/routing";
import Home from "@/features/home/Home";
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

function RouteLoading() {
  return (
    <div dir="rtl" className="flex min-h-[45vh] items-center justify-center px-4 text-center">
      <div>
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-violet-700" />
        <p className="mt-3 text-xs font-bold text-slate-500">جاري فتح المسار…</p>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseAppHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseAppHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goHome = () => {
    window.location.hash = appRouteHash.home;
    setRoute("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goCurriculum = () => {
    window.location.hash = appRouteHash.curriculum;
    setRoute("curriculum");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigatePrimary = (target: PrimaryNavigationTarget) => {
    if (target === "home") {
      goHome();
      return;
    }

    if (target === "practice" && route === "practice") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    goCurriculum();
  };

  return (
    <ErrorBoundary>
      {route === "design-system-primitives" ? (
        <Suspense fallback={<RouteLoading />}>
          <PrimitivesPreview />
        </Suspense>
      ) : route === "design-system-preview" ? (
        <Suspense fallback={<RouteLoading />}>
          <CompositePreview />
        </Suspense>
      ) : route === "exam-pilot" ? (
        <Suspense fallback={<RouteLoading />}>
          <div data-arabic-exam dir="rtl" lang="ar">
            <ArabicExamTypography />
            <ExamPilot onBack={goHome} />
          </div>
        </Suspense>
      ) : (
        <AppShell header={<AppHeader route={route} onNavigate={navigatePrimary} />}>
          {route === "practice" ? (
            <Suspense fallback={<RouteLoading />}>
              <SkillPractice
                skillId={readPracticeSkillIdFromHash(window.location.hash)}
                onBack={goCurriculum}
              />
            </Suspense>
          ) : route === "curriculum" ? (
            <Suspense fallback={<RouteLoading />}>
              <CurriculumExplorer onBack={goHome} />
            </Suspense>
          ) : (
            <>
              <Home showGlobalHeader={false} />
              <a
                href={appRouteHash.curriculum}
                className="fixed bottom-[148px] left-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-2xl bg-violet-700 px-4 text-xs font-black text-white shadow-[0_14px_35px_rgba(109,40,217,.28)] md:bottom-5 md:left-5"
              >
                تصفح المنهج
              </a>
            </>
          )}
        </AppShell>
      )}
    </ErrorBoundary>
  );
}
