import React from "react";

export default function OverviewCards({ stats }: { stats: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
          <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${stat.color}`}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
