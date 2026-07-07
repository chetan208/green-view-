import React from "react";
import { BookOpen, Users, Building, CheckCircle2 } from "lucide-react";

export default function DetailColumns({ student }: { student: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Course Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col gap-5 select-none">
        <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center text-[#006a37]">
            <BookOpen className="w-4 h-4" />
          </div>
          <span>Course Details</span>
        </h3>
        
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-550 font-normal">Class</span>
            <span className="text-slate-900 font-semibold">Class 12</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-550 font-normal">Stream</span>
            <span className="text-slate-900 font-semibold">Science</span>
          </div>
          <div className="flex justify-between items-center text-sm pb-1">
            <span className="text-slate-550 font-normal">Board</span>
            <span className="text-slate-900 font-semibold">HPBOSE</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subjects</span>
          <div className="flex flex-wrap gap-2">
            {["English (Core)", "Physics", "Chemistry", "Mathematics", "Computer Science"].map(sub => (
              <span key={sub} className="bg-slate-50 border border-slate-200 text-slate-650 text-[11px] font-semibold px-2.5 py-1 rounded">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Family Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col gap-5 select-none">
        <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center text-[#006a37]">
            <Users className="w-4 h-4" />
          </div>
          <span>Family Details</span>
        </h3>

        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-550 font-normal">Father's Name</span>
            <span className="text-slate-900 font-semibold">Suresh Sharma</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-550 font-normal">Father's Contact</span>
            <span className="text-slate-900 font-semibold">9876543210</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-550 font-normal">Occupation</span>
            <span className="text-slate-900 font-semibold">Farmer</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-550 font-normal">Mother's Name</span>
            <span className="text-slate-900 font-semibold">Sunita Sharma</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-550 font-normal">Mother's Contact</span>
            <span className="text-slate-900 font-semibold">9876501234</span>
          </div>
          <div className="flex justify-between items-center text-sm pb-1">
            <span className="text-slate-550 font-normal">Annual Income</span>
            <span className="text-[#121c28] font-semibold">₹ 2,50,000</span>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col justify-between gap-5 select-none">
        <div>
          <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center text-[#006a37]">
              <Building className="w-4 h-4" />
            </div>
            <span>Bank Details</span>
          </h3>

          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
              <span className="text-slate-550 font-normal">Bank Name</span>
              <span className="text-slate-900 font-semibold">State Bank of India</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
              <span className="text-slate-550 font-normal">Account No.</span>
              <span className="text-slate-900 font-semibold">XXXXXX9012</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
              <span className="text-slate-550 font-normal">Branch</span>
              <span className="text-slate-900 font-semibold">Dharamshala Branch</span>
            </div>
            <div className="flex justify-between items-center text-sm pb-1">
              <span className="text-slate-550 font-normal">IFSC Code</span>
              <span className="text-slate-900 font-semibold">SBIN0001234</span>
            </div>
          </div>
        </div>

        {/* Bank Account Verified Banner */}
        <div className="bg-[#E6F4EA] border border-[#a3e2b6]/30 rounded-lg p-3.5 flex items-center gap-2.5 text-[#006a37] mt-3">
          <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-[#006a37]" />
          <span className="text-xs font-bold leading-none">Account verified</span>
        </div>
      </div>

    </div>
  );
}
