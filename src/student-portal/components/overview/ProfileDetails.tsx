import React from "react";

export default function ProfileDetails({ student }: { student: any }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] overflow-hidden flex flex-col border border-slate-200/80">
      
      {/* Top Banner (Clean Gradient) */}
      <div className="h-28 bg-gradient-to-r from-slate-100 to-zinc-200 w-full relative">
        {/* We can place the avatar here absolute */}
      </div>

      {/* Content Area */}
      <div className="pt-2 pb-5 px-6 flex flex-col relative bg-white">
        
        {/* Avatar & Name Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between -mt-14 mb-6 relative z-10">
          
          <div className="flex items-end gap-4.5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full border-4 border-white bg-slate-200 shrink-0 shadow-sm overflow-hidden flex items-center justify-center">
              {student.avatar && !student.avatar.includes("pravatar") ? (
                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
              ) : null}
            </div>

            {/* Name */}
            <div className="flex flex-col mb-1 select-none">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-none">{student.name}</h2>
              <span className="text-xs font-semibold text-slate-400 mt-1.5 leading-none">{student.hindiName}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-1 mt-4 md:mt-0 select-none">
            <span className="bg-slate-50 border border-slate-200/80 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg">
              {student.classSection}
            </span>
            <span className="bg-slate-50 border border-slate-200/80 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg">
              {student.stream}
            </span>
            <span className="bg-slate-50 border border-slate-200/80 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg">
              Roll: {student.rollNo}
            </span>
          </div>

        </div>

        {/* Quick Info Row */}
        <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4.5 select-none">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Birth</span>
            <span className="text-xs font-bold text-slate-650">{student.dob}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gender</span>
            <span className="text-xs font-bold text-slate-650">{student.gender}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Category</span>
            <span className="text-xs font-bold text-slate-650">{student.category}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Aadhaar</span>
            <span className="text-xs font-bold text-slate-650">{student.aadhaar}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
