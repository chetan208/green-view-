import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SubjectCards({ subjects }: { subjects: any[] }) {
  return (
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
  );
}
