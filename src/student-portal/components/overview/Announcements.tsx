import React from "react";

export default function Announcements({ announcements }: { announcements: any[] }) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
      <h3 className="text-xs font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
        <span className="w-1.5 h-4 bg-brand-navy rounded-full"></span> Announcements
      </h3>
      <div className="flex flex-col gap-4 max-h-[250px] overflow-y-auto pr-1">
        {announcements.map((ann, idx) => (
          <div key={idx} className="flex flex-col gap-1 text-[11px] border-l-2 border-brand-green/30 pl-3 py-0.5">
            <span className="text-slate-400 font-bold">{ann.date}</span>
            <p className="text-slate-655 font-medium leading-relaxed mt-0.5">{ann.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
