import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SubjectCards({ subjects }: { subjects: any[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-5">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-150 flex items-center gap-2 select-none">
        <CheckCircle2 className="w-4 h-4 text-[#006a37]" /> Term Academic Record
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((sub, idx) => {
          const SubjectIcon = sub.icon;
          const barPercent = `${sub.marks}%`;
          return (
            <div 
              key={idx} 
              className="bg-slate-50/20 border border-slate-200 rounded-xl p-4 flex flex-col justify-between gap-4 hover:border-slate-350 hover:bg-slate-50/50 transition-all duration-150 group cursor-default"
            >
              {/* Header info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${sub.color}`}>
                    <SubjectIcon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div className="flex flex-col select-none">
                    <span className="text-xs font-bold text-slate-800 tracking-tight">{sub.name}</span>
                    <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{sub.remarks}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end select-none">
                  <span className="text-xs font-extrabold text-slate-800 font-mono">{sub.marks} / {sub.maxMarks}</span>
                  <span className="text-[8px] font-bold text-[#006a37] mt-1 bg-[#E6F4EA] border border-[#a3e2b6]/20 px-1.5 py-0.5 rounded-md uppercase tracking-wider">{sub.grade}</span>
                </div>
              </div>

              {/* Progress Tracker bar */}
              <div className="flex flex-col gap-1">
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: barPercent }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                    className="h-full bg-[#006a37] rounded-full"
                  />
                </div>
                {sub.classAvg && (
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mt-1 select-none">
                    <span>Class Avg: {sub.classAvg}%</span>
                    <span>Diff: <span className="text-[#006a37]">+{sub.marks - sub.classAvg}%</span></span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
