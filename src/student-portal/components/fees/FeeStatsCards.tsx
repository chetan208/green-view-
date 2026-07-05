import React from "react";
import { CreditCard, CheckCircle2, FileText } from "lucide-react";

export default function FeeStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-green" />
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
          <CreditCard className="w-5.5 h-5.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Quarter 2 Tuition Due</span>
          <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">₹0 (Paid)</span>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-navy" />
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5.5 h-5.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Upcoming Due Date</span>
          <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">Oct 05, 2026</span>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <FileText className="w-5.5 h-5.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Session Cycle</span>
          <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">FY 2026-27</span>
        </div>
      </div>
    </div>
  );
}
