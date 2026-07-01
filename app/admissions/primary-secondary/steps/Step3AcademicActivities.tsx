"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { usePrimaryAdmissionContext } from "../context/PrimaryAdmissionContext";

export default function Step3AcademicActivities() {
  const { data, updateData } = usePrimaryAdmissionContext();

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 md:mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <GraduationCap className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-normal md:font-semibold text-slate-800 tracking-tight">
            Academic & Activities
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Details of the previous school attended and extracurricular interests.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Previous School */}
        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-xs md:text-sm font-normal md:font-semibold text-emerald-900 tracking-tight mb-2 border-b border-slate-100 pb-2">Previous School Attended</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col">
              <label className="text-[10px] md:text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Name of the School</label>
              <input 
                type="text" 
                placeholder="e.g., DAV Public School" 
                value={data.prevSchoolName}
                onChange={(e) => updateData({ prevSchoolName: e.target.value })}
                className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] md:text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Medium of Instruction</label>
              <input 
                type="text" 
                placeholder="e.g., English, Hindi" 
                value={data.prevSchoolMedium}
                onChange={(e) => updateData({ prevSchoolMedium: e.target.value })}
                className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-sm font-normal md:font-semibold text-emerald-900 tracking-tight mb-2 border-b border-slate-100 pb-2">Interests & Hobbies</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col">
              <label className="text-[10px] md:text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Hobbies</label>
              <input 
                type="text" 
                placeholder="e.g., Reading, Painting" 
                value={data.hobbies}
                onChange={(e) => updateData({ hobbies: e.target.value })}
                className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] md:text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Interest in games</label>
              <input 
                type="text" 
                placeholder="e.g., Cricket, Chess" 
                value={data.interestInGames}
                onChange={(e) => updateData({ interestInGames: e.target.value })}
                className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
