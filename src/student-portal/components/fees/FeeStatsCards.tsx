import React from "react";
import { CreditCard, CheckCircle2, FileText } from "lucide-react";

export default function FeeStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 select-none">
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-green" />
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
          <CreditCard className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Quarter 2 Tuition Due</span>
          <span className="text-lg font-bold text-slate-750 mt-0.5">₹0 (Paid)</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-navy" />
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-navy flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Upcoming Due Date</span>
          <span className="text-lg font-bold text-slate-755 mt-0.5">Oct 05, 2026</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Session Cycle</span>
          <span className="text-lg font-bold text-slate-755 mt-0.5">FY 2026-27</span>
        </div>
      </div>
    </div>
  );
}
