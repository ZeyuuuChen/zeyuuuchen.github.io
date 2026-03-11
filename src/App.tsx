import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { FloatingControls } from "./components/FloatingControls";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home } from "./pages/Home";
import { Research } from "./pages/Research";
import { Portfolio } from "./pages/Portfolio";
import { Education } from "./pages/Education";
import { Games } from "./pages/Games";
import { Stats } from "./pages/Stats";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/research" element={<Research />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/admin-stats" element={<Stats />} />
        {/* <Route path="/games" element={<Games />} /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="h-screen w-screen bg-[var(--color-bg)] text-[var(--color-ink)] overflow-hidden flex flex-col md:flex-row font-body selection:bg-[var(--color-ink)] selection:text-[var(--color-bg)] transition-colors duration-500">
            {/* Left Navigation (Desktop) / Top Navigation (Mobile) */}
            <div className="w-full md:w-48 lg:w-64 flex-shrink-0 h-auto md:h-full z-50">
              <Navigation />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 h-full relative overflow-hidden">
              <AnimatedRoutes />
            </main>
            
            <FloatingControls />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
