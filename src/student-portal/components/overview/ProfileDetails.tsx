import React from "react";

export default function ProfileDetails({ student }: { student: any }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-xs overflow-hidden flex flex-col border border-slate-200/80">
      
      {/* Top Banner (Clean Slate Blue Gradient matching image) */}
      <div className="h-32 bg-[#dce6f7] w-full relative"></div>

      {/* Content Area */}
      <div className="pt-2 pb-6 px-8 flex flex-col relative bg-white">
        
        {/* Avatar & Name Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-6 relative z-10">
          
          <div className="flex items-end gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full border-4 border-white bg-slate-200 shrink-0 shadow-md overflow-hidden">
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
            </div>

            {/* Name */}
            <div className="flex flex-col mb-1.5 select-none">
              <h2 className="text-[25px] font-bold text-[#121c28] tracking-tight leading-none">
                {student.name}
              </h2>
              <span className="text-[12px] font-semibold text-slate-400 mt-2.5 leading-none">
                {student.hindiName}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-1.5 mt-4 md:mt-0 select-none">
            <span className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semisemibold px-4 py-1.5 rounded-lg shadow-2xs">
              Class 12
            </span>
            <span className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semisemibold px-4 py-1.5 rounded-lg shadow-2xs">
              {student.stream}
            </span>
            <span className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semisemibold px-4 py-1.5 rounded-lg shadow-2xs">
              Roll: {student.rollNo}
            </span>
          </div>

        </div>

        {/* Quick Info Grid (4 columns) */}
        <div className="w-full bg-white border border-slate-200/80 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-6 p-5 select-none">
          <div className="flex flex-col items-center justify-center text-center py-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Date of Birth</span>
            <span className="text-sm font-semibold text-[#121c28]">{student.dob}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center py-1 border-l border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Gender</span>
            <span className="text-sm font-semibold text-[#121c28]">{student.gender}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center py-1 border-l border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Category</span>
            <span className="text-sm font-semibold text-[#121c28]">{student.category}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center py-1 border-l border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Aadhaar</span>
            <span className="text-sm font-semibold text-[#121c28]">{student.aadhaar}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
