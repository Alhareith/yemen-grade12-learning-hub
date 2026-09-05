/**
 * Product shell — prompts, curriculum navigation and simulation are the primary student paths.
 * Keep the first paint deliberately small; heavy routes load only on demand.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import "./v2.css";
import "./polish.css";

const ExamPilot = lazy(() => import("./pages/ExamPilot"));
const CurriculumExplorer = lazy(() => import("./pages/CurriculumExplorer"));
const ArabicExamTypography = lazy(() => import("@/components/ArabicExamTypography"));

type AppRoute = "home" | "curriculum" | "exam-pilot";

function readRoute(): AppRoute {
  if (window.location.hash === "#exam-pilot") return "exam-pilot";
  if (window.location.hash === "#curriculum") return "curriculum";
  return "home";
}

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
  const [route, setRoute] = useState<AppRoute>(() => readRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goHome = () => {
    window.location.hash = "";
    setRoute("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ErrorBoundary>
      {route === "exam-pilot" ? (
        <Suspense fallback={<RouteLoading />}>
          <div data-arabic-exam dir="rtl" lang="ar">
            <ArabicExamTypography />
            <ExamPilot onBack={goHome} />
          </div>
        </Suspense>
      ) : route === "curriculum" ? (
        <Suspense fallback={<RouteLoading />}>
          <CurriculumExplorer onBack={goHome} />
        </Suspense>
      ) : (
        <>
          <Home />
          <a
            href="#curriculum"
            className="fixed bottom-[148px] left-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-2xl bg-violet-700 px-4 text-xs font-black text-white shadow-[0_14px_35px_rgba(109,40,217,.28)] md:bottom-5 md:left-5"
          >
            تصفح المنهج
          </a>
        </>
      )}
    </ErrorBoundary>
  );
}
