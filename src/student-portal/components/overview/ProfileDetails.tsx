import React from "react";

export default function ProfileDetails({ student }: { student: any }) {
  return (
    <div className="w-full bg-white rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col border border-slate-100">
      
      {/* Top Banner (Gray) */}
      <div className="h-32 bg-[#d1d5db] w-full relative">
        {/* We can place the avatar here absolute */}
      </div>

      {/* Content Area */}
      <div className="pt-2 pb-6 px-8 flex flex-col relative bg-white">
        
        {/* Avatar & Name Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-8 relative z-10">
          
          <div className="flex items-end gap-6">
            {/* Avatar */}
            <div className="w-36 h-36 rounded-full border-[6px] border-white bg-red-400 shrink-0 shadow-sm overflow-hidden flex items-center justify-center">
              {/* No image in screenshot, just red circle, but we can put avatar if it exists */}
              {student.avatar && !student.avatar.includes("pravatar") ? (
                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
              ) : null}
            </div>

            {/* Name */}
            <div className="flex flex-col mb-2">
              <h2 className="text-4xl font-bold text-[#0f172a] tracking-tight">{student.name}</h2>
              <span className="text-sm font-semibold text-slate-500 mt-1">{student.hindiName}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 mb-2 mt-4 md:mt-0">
            <span className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
              {student.classSection}
            </span>
            <span className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
              {student.stream}
            </span>
            <span className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
              Roll: {student.rollNo}
            </span>
          </div>

        </div>

        {/* Quick Info Row */}
        <div className="w-full bg-[#f8fafc] rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Date of Birth</span>
            <span className="text-sm font-semibold text-slate-700">{student.dob}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Gender</span>
            <span className="text-sm font-semibold text-slate-700">{student.gender}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category</span>
            <span className="text-sm font-semibold text-slate-700">{student.category}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Aadhaar</span>
            <span className="text-sm font-semibold text-slate-700">{student.aadhaar}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
