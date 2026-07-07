import React from "react";

export interface AttendanceStat {
  label: string;
  value: string;
  subtext: string;
  badgeBg: string;
  badgeText: string;
}

export default function OverviewCards({ stats }: { stats: AttendanceStat[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
        >
          {/* Badge */}
          <div className="flex">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide ${stat.badgeBg} ${stat.badgeText}`}>
              {stat.label}
            </span>
          </div>

          {/* Value */}
          <div className="text-3xl font-black text-slate-800 leading-none">
            {stat.value}
          </div>

          {/* Subtext */}
          <div className="text-[11px] font-bold text-slate-400 tracking-wide mt-0.5">
            {stat.subtext}
          </div>
        </div>
      ))}
    </div>
  );
}
