/**
 * V3 app shell — separated mobile-first sections.
 */
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ExamPilot from "./pages/ExamPilot";
import HomeV3 from "./pages/HomeV3";
import "./v2.css";
import "./polish.css";

type AppRoute = "home" | "exam-pilot";

function readRoute(): AppRoute {
  return window.location.hash === "#exam-pilot" ? "exam-pilot" : "home";
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
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {route === "exam-pilot" ? <ExamPilot onBack={goHome} /> : <HomeV3 />}
          <Toaster position="top-center" richColors />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
