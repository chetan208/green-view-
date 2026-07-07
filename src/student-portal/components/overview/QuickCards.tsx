import React from "react";

export default function QuickCards({ student }: { student: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* Attendance YTD */}
      <div className="bg-white border border-slate-200  rounded-xl p-5 flex flex-col justify-center shadow-xs select-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Attendance YTD</span>
        <span className="text-2xl font-bold text-slate-900 leading-none">{student.attendance}</span>
        <span className="text-[11px] text-[#006a37] font-semibold mt-2.5">Excellent standing</span>
      </div>

      {/* Last Result */}
      <div className="bg-white border border-slate-200  rounded-xl p-5 flex flex-col justify-center shadow-xs select-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Last Result</span>
        <span className="text-2xl font-bold text-slate-900 leading-none">{student.gpa}</span>
        <span className="text-[11px] text-slate-400 font-semibold mt-2.5">11th Class Final</span>
      </div>

      {/* Documents */}
      <div className="bg-white border border-slate-200  rounded-xl p-5 flex flex-col justify-center shadow-xs select-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Documents</span>
        <span className="text-2xl font-bold text-slate-900 leading-none">{student.documents}</span>
        <span className="text-[11px] text-[#ba1a1a] font-semibold mt-2.5">1 pending</span>
      </div>

      {/* Fee Status */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center shadow-xs select-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fee Status</span>
        <span className="text-2xl font-bold text-slate-900 leading-none uppercase">{student.feeStatus}</span>
        <span className="text-[11px] text-slate-400 font-semibold mt-2.5">No dues</span>
      </div>

    </div>
  );
}
