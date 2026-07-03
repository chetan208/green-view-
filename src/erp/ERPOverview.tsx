import React, { useState, useEffect } from "react";
import { ModuleType } from "./types";
import { LucideIcon, RefreshCw } from "lucide-react";

interface ERPOverviewProps {
  modules: ModuleType[];
  summaryStats: {
    label: string;
    value: string;
    color: string;
    icon: LucideIcon;
  }[];
  setActiveModule: (id: string) => void;
  selectedSession: string;
  setSelectedSession: (session: string) => void;
  sessions: any[];
}

export default function ERPOverview({
  modules,
  summaryStats: initialStats,
  setActiveModule,
  selectedSession,
  setSelectedSession,
  sessions,
}: ERPOverviewProps) {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  
  const user = { name: "Admin User", role: "Owner" };

  const fetchDashboardStats = () => {
    setLoading(true);
    setTimeout(() => {
      setStats([
        { label: "Total Students", value: "1,245", color: "#166534", icon: initialStats[0].icon },
        { label: "Teaching Staff", value: "84", color: "#166534", icon: initialStats[1].icon },
        { label: "Pending Fees (Students)", value: "112", color: "#166534", icon: initialStats[2].icon }
      ]);
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [selectedSession]);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-sm relative overflow-hidden">
        
        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Dashboard Overview</span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
            Welcome, {user.name.split(" ")[0]}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Green View School Management System
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 relative z-10 self-start sm:self-center">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-2xl">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Active Session:</span>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="bg-transparent text-xs font-black text-slate-800 focus:outline-none cursor-pointer border-0"
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.year} className="text-slate-800 bg-white font-bold">{s.year}</option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchDashboardStats}
            disabled={loading}
            className="w-9 h-9 rounded-2xl bg-slate-50 hover:bg-slate-100 active:scale-95 border border-slate-200/60 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map(({ label, value, color, icon: Icon }, idx) => (
          <div
            key={label}
            className="bg-white rounded-3xl border border-slate-200/50 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition duration-200"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${color}12` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                {loading ? (
                  <span className="inline-block w-8 h-6 bg-slate-100 animate-pulse rounded-md" />
                ) : (
                  value
                )}
              </p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Modules</p>
          <span className="text-[10px] font-bold text-slate-400">Select any module to open</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className="group text-left bg-white border-slate-200/50 hover:border-brand-green/30 hover:shadow-md cursor-pointer active:scale-[0.99] border rounded-3xl p-6 shadow-sm transition-all duration-200 flex flex-col justify-between h-44"
              >
                <div className="flex items-start justify-between w-full">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                    style={{ background: mod.bg }}
                  >
                    <Icon size={22} style={{ color: mod.color }} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/40">
                    Active
                  </span>
                </div>
                
                <div className="space-y-1 mt-4">
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-green transition-colors leading-tight">
                    {mod.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {mod.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
