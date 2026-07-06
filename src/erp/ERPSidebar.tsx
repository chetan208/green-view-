import React from "react";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import { ModuleType } from "./types";

interface ERPSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeModule: string | null;
  setActiveModule: (module: string | null) => void;
  modules: ModuleType[];
}

export default function ERPSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeModule,
  setActiveModule,
  modules,
}: ERPSidebarProps) {
  const user = { name: "Admin User", role: "Owner" };

  return (
    <aside className={`
      fixed top-14 bottom-0 left-0 z-30 w-60 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200
      lg:relative lg:top-0 lg:h-full lg:translate-x-0
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
      <div className="px-4 py-4 border-b border-slate-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Navigation</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        <button
          onClick={() => { setActiveModule(null); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer text-left ${
            activeModule === null
              ? "bg-brand-green text-white border-brand-green-dark shadow-sm"
              : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-brand-green-dark"
          }`}
        >
          <LayoutDashboard size={14} className="shrink-0" />
          <span className="flex-1 truncate">Overview</span>
          <ChevronRight size={11} className="opacity-40 shrink-0" />
        </button>

        {modules.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => { setActiveModule(mod.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer text-left ${
                isActive
                  ? "bg-brand-green text-white border-brand-green-dark shadow-sm"
                  : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-brand-green-dark"
              }`}
            >
              <Icon size={14} className="shrink-0" />
              <span className="flex-1 truncate">{mod.label}</span>
              <ChevronRight size={11} className="opacity-40 shrink-0" />
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Logged in as</p>
        <p className="text-xs font-semibold text-brand-green-dark mt-0.5 truncate">{user.name}</p>
        <p className="text-[10px] text-slate-400 font-medium">{user.role}</p>
      </div>
    </aside>
  );
}
