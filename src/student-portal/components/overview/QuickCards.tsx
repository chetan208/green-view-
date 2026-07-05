import React from "react";

export default function QuickCards({ student }: { student: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Attendance YTD</span>
        <span className="text-2xl font-semibold text-slate-800">{student.attendance}</span>
        <span className="text-[10px] text-slate-500 mt-1">Excellent standing</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Last Result</span>
        <span className="text-2xl font-semibold text-slate-800">{student.gpa}</span>
        <span className="text-[10px] text-slate-500 mt-1">11th Class Final</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Documents</span>
        <span className="text-2xl font-semibold text-slate-800">{student.documents}</span>
        <span className="text-[10px] text-slate-500 mt-1">1 pending</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fee Status</span>
        <span className="text-2xl font-semibold text-slate-800">{student.feeStatus}</span>
        <span className="text-[10px] text-slate-500 mt-1">No dues</span>
      </div>

    </div>
  );
}
