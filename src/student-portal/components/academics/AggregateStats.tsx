import React from "react";
import { GraduationCap, Award, FileText } from "lucide-react";

export default function AggregateStats({ 
  totalObtained, 
  totalMax, 
  percentage,
  currentTerm 
}: { 
  totalObtained: number; 
  totalMax: number; 
  percentage: string;
  currentTerm: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 select-none">
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4.5 shadow-2xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#006a37]" />
        <div className="w-9 h-9 rounded-lg bg-[#E6F4EA] text-[#006a37] flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Aggregate Marks</span>
          <span className="text-lg font-bold text-slate-800 mt-0.5">{totalObtained} / {totalMax}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4.5 shadow-2xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#121c28]" />
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#121c28] flex items-center justify-center shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Percentage / Rank</span>
          <span className="text-lg font-bold text-slate-800 mt-0.5">{percentage}% (1st in Class)</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4.5 shadow-2xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Current Term</span>
          <span className="text-lg font-bold text-slate-800 mt-0.5">{currentTerm}</span>
        </div>
      </div>
    </div>
  );
}
