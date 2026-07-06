import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarView({
  selectedMonth,
  setSelectedMonth,
  days
}: {
  selectedMonth: string;
  setSelectedMonth: (val: string) => void;
  days: any[];
}) {
  // Dynamic offset calculation based on month starting day
  const getOffset = () => {
    if (selectedMonth.startsWith("June")) return 1; // June 1, 2026 is Monday
    if (selectedMonth.startsWith("July")) return 3; // July 1, 2026 is Wednesday
    if (selectedMonth.startsWith("May")) return 5;  // May 1, 2026 is Friday
    return 0;
  };

  const offset = getOffset();

  const subjectAttendance = [
    { name: "English (Core)", ratio: "42/45", percent: 93, color: "bg-emerald-500" },
    { name: "Physics", ratio: "41/45", percent: 91, color: "bg-emerald-500" },
    { name: "Chemistry", ratio: "43/45", percent: 96, color: "bg-emerald-500" },
    { name: "Mathematics", ratio: "44/45", percent: 98, color: "bg-emerald-500" },
    { name: "Computer Science", ratio: "40/45", percent: 89, color: "bg-amber-500" }
  ];

  const handlePrevMonth = () => {
    if (selectedMonth === "July 2026") setSelectedMonth("June 2026");
    else if (selectedMonth === "June 2026") setSelectedMonth("May 2026");
  };

  const handleNextMonth = () => {
    if (selectedMonth === "May 2026") setSelectedMonth("June 2026");
    else if (selectedMonth === "June 2026") setSelectedMonth("July 2026");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-6">
      {/* Left: Interactive Calendar Grid */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Calendar Nav Header */}
        <div className="flex items-center justify-start gap-3 pb-1 select-none">
          <button 
            onClick={handlePrevMonth}
            disabled={selectedMonth === "May 2026"}
            className="w-6.5 h-6.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={13} />
          </button>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {selectedMonth.split(" ")[0]} <span className="text-brand-green">{selectedMonth.split(" ")[1]}</span>
          </span>
          <button 
            onClick={handleNextMonth}
            disabled={selectedMonth === "July 2026"}
            className="w-6.5 h-6.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Calendar Day Header */}
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 select-none pb-2 border-b border-slate-100">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        {/* Calendar Days grid */}
        <div className="grid grid-cols-7 gap-y-2.5 gap-x-2 text-center justify-items-center">
          {/* Pad offset */}
          {Array.from({ length: offset }).map((_, idx) => (
            <div key={`offset-${idx}`} className="w-8 h-8" />
          ))}

          {days.map((dayObj) => {
            let circleColor = "text-slate-750 hover:bg-slate-50/80 border border-transparent";
            if (dayObj.status === 1) circleColor = "bg-emerald-50 text-emerald-700 border border-emerald-100/50 hover:bg-emerald-100/60";
            if (dayObj.status === 0) circleColor = "bg-rose-50 text-rose-700 border border-rose-100/50 hover:bg-rose-100/60";
            if (dayObj.status === 2) circleColor = "bg-sky-50 text-sky-700 border border-sky-100/50 hover:bg-sky-100/60";
            if (dayObj.status === 3) circleColor = "text-slate-450 bg-slate-50/60 border border-slate-100 hover:bg-slate-100/50";

            return (
              <div
                key={dayObj.day}
                title={`${selectedMonth.split(" ")[0]} ${dayObj.day}: ${dayObj.status === 1 ? 'Present' : dayObj.status === 0 ? 'Absent' : dayObj.status === 2 ? 'Holiday' : 'Sunday'}`}
                className={`w-8.5 h-8.5 flex items-center justify-center text-[11px] font-bold rounded-lg transition-all duration-200 cursor-default select-none ${circleColor}`}
              >
                {dayObj.day}
              </div>
            );
          })}
        </div>

        {/* Legend row */}
        <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-1.5 mt-2.5 pt-3 border-t border-slate-100 text-[10px] font-bold text-slate-400 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-50 border border-emerald-100/50 text-emerald-700 flex items-center justify-center text-[8px] font-bold">P</span>
            <span>Present</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-rose-50 border border-rose-100/50 text-rose-700 flex items-center justify-center text-[8px] font-bold">A</span>
            <span>Absent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-sky-50 border border-sky-100/50 text-sky-700 flex items-center justify-center text-[8px] font-bold">H</span>
            <span>Holiday</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-slate-50 text-slate-400 border border-slate-100 flex items-center justify-center text-[8px] font-bold">S</span>
            <span>Sunday</span>
          </div>
        </div>
      </div>

      {/* Right Column: Subject-wise Attendance */}
      <div className="w-full md:w-60 bg-slate-50/30 rounded-xl p-4.5 border border-slate-200/80 flex flex-col gap-4.5 shrink-0 justify-between">
        <div className="flex flex-col gap-3.5">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-150 select-none">
            Subject Attendance
          </h4>
          
          <div className="flex flex-col gap-3">
            {subjectAttendance.map((sub, i) => (
              <div key={i} className="flex flex-col gap-1 select-none">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate max-w-[130px]">{sub.name}</span>
                  <span className="text-slate-400 text-[10px] font-mono">{sub.ratio}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${sub.color} rounded-full`} style={{ width: `${sub.percent}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold w-8 text-right font-mono ${sub.percent >= 90 ? "text-emerald-600" : "text-amber-600"}`}>
                    {sub.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-lg p-3 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] select-none">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">YTD Ratio</span>
          <span className="text-lg font-bold text-brand-navy leading-none mt-1 block">94.2%</span>
          <span className="text-[8px] text-brand-green font-bold mt-1 block">✓ Complies CBSE Guidelines</span>
        </div>
      </div>
    </div>
  );
}
