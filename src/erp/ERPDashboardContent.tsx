import React, { useState, useEffect } from "react";
import ERPSidebar from "./ERPSidebar";
import ERPOverview from "./ERPOverview";
import ERPModuleWrapper from "./ERPModuleWrapper";
import { modules, summaryStats } from "./types";
import { Menu, X } from "lucide-react";

export default function ERPDashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModuleState] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mod = params.get("module");
    if (mod) setActiveModuleState(mod);
    
    // Handle back button navigation
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      setActiveModuleState(currentParams.get("module"));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setActiveModule = (id: string | null) => {
    setActiveModuleState(id);
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("module", id);
    } else {
      url.searchParams.delete("module");
    }
    window.history.pushState({}, "", url.toString());
  };
  
  const [sessions] = useState([
    { id: "1", year: "2026-2027" },
    { id: "2", year: "2025-2026" }
  ]);
  const [selectedSession, setSelectedSession] = useState("2026-2027");

  const currentModule = modules.find(m => m.id === activeModule);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-[#F8FAFC]">
      <ERPSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        modules={modules}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 lg:hidden transition-all duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        <div className="lg:hidden sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-200/50 hover:bg-slate-100 transition active:scale-[0.95] cursor-pointer"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Green View School</span>
            <span className="text-xs font-bold text-brand-green-dark mt-0.5">Control Center</span>
          </div>
        </div>

        <div className="flex-1">
          {activeModule === null ? (
            <ERPOverview
              modules={modules}
              summaryStats={summaryStats}
              setActiveModule={setActiveModule}
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              sessions={sessions}
            />
          ) : (
            <ERPModuleWrapper
              activeModule={activeModule}
              currentModule={currentModule}
              setActiveModule={setActiveModule}
              selectedSession={selectedSession}
            />
          )}
        </div>
      </main>
    </div>
  );
}
