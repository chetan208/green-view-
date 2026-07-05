import React from "react";
import { BookOpen, Users, Building2, CheckCircle2 } from "lucide-react";

export default function DetailColumns({ student }: { student: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Course Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-slate-400" /> Course Details
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Class</span>
            <span className="text-slate-800 font-medium">Class 12</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Stream</span>
            <span className="text-slate-800 font-medium">Science</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Board</span>
            <span className="text-slate-800 font-medium">HPBOSE</span>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subjects</span>
          <div className="flex flex-wrap gap-2">
            {["English (Core)", "Physics", "Chemistry", "Mathematics", "Computer Science"].map(sub => (
              <span key={sub} className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Family Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-slate-400" /> Family Details
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Father's Name</span>
            <span className="text-slate-800 font-medium">Suresh Sharma</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Father's Contact</span>
            <span className="text-slate-800 font-medium">9876543210</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Occupation</span>
            <span className="text-slate-800 font-medium">Farmer</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Mother's Name</span>
            <span className="text-slate-800 font-medium">Sunita Sharma</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Mother's Contact</span>
            <span className="text-slate-800 font-medium">9876501234</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Annual Income</span>
            <span className="text-slate-800 font-medium">₹ 2,50,000</span>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
          <Building2 className="w-4 h-4 text-slate-400" /> Bank Details
        </h3>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Bank Name</span>
            <span className="text-slate-800 font-medium">State Bank of India</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Account No.</span>
            <span className="text-slate-800 font-medium">XXXXXX9012</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Branch</span>
            <span className="text-slate-800 font-medium">Dharamshala Branch</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">IFSC Code</span>
            <span className="text-slate-800 font-medium">SBIN0001234</span>
          </div>
        </div>

        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 flex gap-3 items-start mt-auto">
          <CheckCircle2 className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
          <p className="text-[11px] text-[#16a34a] font-medium leading-relaxed">
            Account verified and linked<br />for scholarships
          </p>
        </div>
      </div>

    </div>
  );
}
