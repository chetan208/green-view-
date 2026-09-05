import React, { useState, useEffect } from "react";
import { ModuleType } from "./types";
import { LucideIcon, RefreshCw, GraduationCap, Users, CreditCard, Banknote, ClipboardList, Calendar } from "lucide-react";
import { erpApi, admissionsApi } from "@/services/erpApi";
import { useAuth } from "@/hooks/useAuth";

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
  const [stats, setStats] = useState<{label: string, value: string, color: string, icon: LucideIcon}[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const fetchDashboardStats = async () => {
    if (!selectedSession) return;
    
    setLoading(true);
    try {
      // 1. Fetch Students count
      const studentsRes = await erpApi.students.list({ limit: 0, session: selectedSession });
      const studentsCount = studentsRes.pagination?.total || 0;
      
      // 2. Fetch Teachers count
      const teachersRes = await erpApi.teachers.list({ limit: 0 });
      const teachersCount = teachersRes.pagination?.total || 0;
      
      // 3. Fetch Fees stats
      const feesRes = await erpApi.fees.stats(selectedSession);
      const pendingFees = feesRes.pendingCount || 0;
      const totalCollection = feesRes.totalCollected || 0;
      
      // 4. Fetch Admissions stats
      const admissionsRes = await admissionsApi.stats();
      const pendingAdmissions = admissionsRes.pendingCount || 0;
      
      setStats([
        { label: "Total Students", value: studentsCount.toLocaleString(), color: "#166534", icon: GraduationCap },
        { label: "Teaching Staff", value: teachersCount.toLocaleString(), color: "#166534", icon: Users },
        { label: "Pending Fees (Students)", value: pendingFees.toLocaleString(), color: "#166534", icon: CreditCard },
        { label: "Total Collection", value: `₹${totalCollection.toLocaleString()}`, color: "#166534", icon: Banknote },
        { label: "Pending Admissions", value: pendingAdmissions.toLocaleString(), color: "#166534", icon: ClipboardList },
        { label: "Active Session", value: selectedSession, color: "#166534", icon: Calendar },
      ]);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [selectedSession]);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-sm relative overflow-hidden">
        
        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Dashboard Overview</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-none">
            Welcome, {user ? user.name.split(" ")[0] : "Admin"}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Green View School Management System
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 relative z-10 self-start sm:self-center">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-2xl">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Active Session:</span>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer border-0"
            >
              {sessions.map((s) => (
                <option key={s.id || s.year} value={s.year} className="text-slate-800 bg-white font-semibold">{s.year}</option>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
              <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none truncate">
                {loading ? (
                  <span className="inline-block w-8 h-6 bg-slate-100 animate-pulse rounded-md" />
                ) : (
                  value
                )}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Available Modules</p>
          <span className="text-[10px] font-semibold text-slate-400">Select any module to open</span>
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
                  <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/40">
                    Active
                  </span>
                </div>
                
                <div className="space-y-1 mt-4">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors leading-tight">
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
