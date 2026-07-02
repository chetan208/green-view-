"use client";

import React from "react";
import { GraduationCap, Award, FileText, CheckCircle2, FlaskConical, Binary, BookOpen, PenTool, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function PortalAcademics() {
  const subjects = [
    { name: "Mathematics", marks: 95, maxMarks: 100, grade: "A1", remarks: "Excellent logical skills", icon: Binary, color: "text-blue-600 bg-blue-50 border-blue-100/50" },
    { name: "Science (Physics/Chem)", marks: 92, maxMarks: 100, grade: "A1", remarks: "Great conceptual clarity", icon: FlaskConical, color: "text-emerald-600 bg-emerald-50 border-emerald-100/50" },
    { name: "English Core", marks: 94, maxMarks: 100, grade: "A1", remarks: "Superb vocabulary", icon: PenTool, color: "text-purple-600 bg-purple-50 border-purple-100/50" },
    { name: "Social Science", marks: 88, maxMarks: 100, grade: "A2", remarks: "Good analytical answers", icon: BookOpen, color: "text-amber-600 bg-amber-50 border-amber-100/50" },
    { name: "Computer Science", marks: 98, maxMarks: 100, grade: "A1", remarks: "Outstanding coding", icon: Database, color: "text-cyan-600 bg-cyan-50 border-cyan-100/50" }
  ];

  const totalObtained = subjects.reduce((sum, sub) => sum + sub.marks, 0);
  const totalMax = subjects.reduce((sum, sub) => sum + sub.maxMarks, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      
      {/* Top Banner stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-green" />
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
            <GraduationCap className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Aggregate Marks</span>
            <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">{totalObtained} / {totalMax}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-navy" />
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center shrink-0">
            <Award className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Percentage / Rank</span>
            <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">{percentage}% (1st in Class)</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Current Term</span>
            <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">Unit Test-II (July 2026)</span>
          </div>
        </div>

      </div>

      {/* Modern Subject Cards Grid */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
        <h3 className="text-xs font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-green" /> Term Academic Record
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((sub, idx) => {
            const SubjectIcon = sub.icon;
            const barPercent = `${sub.marks}%`;
            return (
              <div 
                key={idx} 
                className="bg-slate-50/40 border border-slate-100 rounded-2xl p-4.5 flex flex-col justify-between gap-4.5 hover:border-brand-green/25 hover:bg-white hover:shadow-[0_8px_25px_-10px_rgba(0,0,0,0.03)] transition-all duration-300 group cursor-default"
              >
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${sub.color}`}>
                      <SubjectIcon className="w-4.5 h-4.5 stroke-[1.8]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-850">{sub.name}</span>
                      <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{sub.remarks}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-800">{sub.marks} / {sub.maxMarks}</span>
                    <span className="text-[9px] font-bold text-brand-green mt-0.5 bg-emerald-50 border border-emerald-100/30 px-1.5 py-0.5 rounded">{sub.grade}</span>
                  </div>
                </div>

                {/* Progress Tracker bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="w-full h-1.5 bg-slate-150 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: barPercent }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.08 }}
                      className="h-full bg-gradient-to-r from-brand-green to-brand-green-dark rounded-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
