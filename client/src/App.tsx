/**
 * Product shell — prompts and simulation are the primary student paths.
 * Keep the first paint deliberately small; heavy exam code loads only on demand.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import "./v2.css";
import "./polish.css";

const ExamPilot = lazy(() => import("./pages/ExamPilot"));
const ArabicExamTypography = lazy(() => import("@/components/ArabicExamTypography"));

type AppRoute = "home" | "exam-pilot";

function readRoute(): AppRoute {
  return window.location.hash === "#exam-pilot" ? "exam-pilot" : "home";
}

function RouteLoading() {
  return (
    <div dir="rtl" className="flex min-h-[45vh] items-center justify-center px-4 text-center">
      <div>
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-violet-700" />
        <p className="mt-3 text-xs font-bold text-slate-500">جاري فتح المحاكاة…</p>
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
      ) : (
        <Home />
      )}
    </ErrorBoundary>
  );
}
