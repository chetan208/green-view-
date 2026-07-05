import React from "react";
import { Check, X, AlertTriangle, CalendarRange } from "lucide-react";

export default function CalendarView({
  selectedMonth,
  setSelectedMonth,
  days
}: {
  selectedMonth: string;
  setSelectedMonth: (val: string) => void;
  days: any[];
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-8">
      {/* Left: Interactive Calendar Grid */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="text-xs font-semibold md:font-extrabold text-slate-850 uppercase tracking-wider flex items-center gap-2">
            <CalendarRange className="w-4 h-4 text-brand-green" /> Attendance Log
          </h3>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-brand-green text-slate-650 bg-white"
          >
            <option>July 2026</option>
            <option>June 2026</option>
            <option>May 2026</option>
          </select>
        </div>

        {/* Calendar Day Header */}
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 select-none">
          <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>

        {/* Calendar Days grid */}
        <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center justify-items-center">
          {/* Pad offset for July 1, 2026 starting on Wednesday (index 2) */}
          <div className="w-9 h-9" />
          <div className="w-9 h-9" />
          
          {days.map((dayObj) => {
            let circleColor = "";
            if (dayObj.status === 1) circleColor = "bg-emerald-50 text-brand-green border border-emerald-100/50 hover:bg-brand-green hover:text-white";
            if (dayObj.status === 0) circleColor = "bg-red-50 text-red-650 border border-red-100/50 hover:bg-red-600 hover:text-white";
            if (dayObj.status === 2) circleColor = "bg-amber-50 text-amber-600 border border-amber-100/50 hover:bg-amber-650 hover:text-white";
            if (dayObj.status === 3) circleColor = "bg-slate-50 text-slate-400 border border-slate-100/10";

            return (
              <div
                key={dayObj.day}
                title={`July ${dayObj.day}: ${dayObj.status === 1 ? 'Present' : dayObj.status === 0 ? 'Absent' : dayObj.status === 2 ? 'Leave' : 'Weekend/Holiday'}`}
                className={`w-9 h-9 flex items-center justify-center text-[11px] font-bold rounded-xl transition-all duration-300 cursor-default select-none shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] ${circleColor}`}
              >
                {dayObj.day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Legends and Summary */}
      <div className="w-full md:w-60 bg-slate-50/50 rounded-2xl p-5 border border-slate-100/60 flex flex-col gap-5 justify-between shrink-0">
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest pb-2 border-b border-slate-100">
            Legends Status
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-650">
              <span className="w-5 h-5 rounded-lg bg-emerald-50 border border-emerald-100/50 text-brand-green flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span>Present Days</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-655">
              <span className="w-5 h-5 rounded-lg bg-red-50 border border-red-100/50 text-red-600 flex items-center justify-center shrink-0">
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span>Absent Days</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-650">
              <span className="w-5 h-5 rounded-lg bg-amber-50 border border-amber-100/50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </span>
              <span>On Approved Leave</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-650">
              <span className="w-5 h-5 rounded-lg bg-slate-100 border border-transparent text-slate-400 flex items-center justify-center shrink-0 text-[10px]">
                H
              </span>
              <span>Weekend / Holiday</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.01)] mt-4 md:mt-0">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Yearly Target Ratio</span>
          <span className="text-xl font-black text-brand-navy leading-none mt-1.5 block">94.2%</span>
          <span className="text-[8px] text-brand-green font-bold mt-1 block">✓ Satisfies CBSE Guidelines</span>
        </div>
      </div>
    </div>
  );
}
