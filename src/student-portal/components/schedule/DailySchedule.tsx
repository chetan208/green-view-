import React from "react";
import { Clock, BookOpen, User, MapPin, Coffee, ChevronRight, CheckCircle2 } from "lucide-react";

export default function DailySchedule({ timetable }: { timetable: any[] }) {
  
  const getColorStyles = (colorClass: string, isBreak: boolean) => {
    if (isBreak) return "bg-[#f8fafc] border-slate-200 text-slate-500 border-dashed";
    if (colorClass.includes("blue")) return "bg-blue-50/30 border-blue-100 hover:border-blue-300 hover:shadow-blue-500/5";
    if (colorClass.includes("emerald")) return "bg-emerald-50/30 border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-500/5";
    if (colorClass.includes("teal")) return "bg-teal-50/30 border-teal-100 hover:border-teal-300 hover:shadow-teal-500/5";
    if (colorClass.includes("purple")) return "bg-purple-50/30 border-purple-100 hover:border-purple-300 hover:shadow-purple-500/5";
    if (colorClass.includes("cyan")) return "bg-cyan-50/30 border-cyan-100 hover:border-cyan-300 hover:shadow-cyan-500/5";
    if (colorClass.includes("amber")) return "bg-amber-50/30 border-amber-100 hover:border-amber-300 hover:shadow-amber-500/5";
    return "bg-white border-slate-200 hover:border-slate-300";
  };

  const getAccentColor = (colorClass: string, isBreak: boolean) => {
    if (isBreak) return "text-slate-400 bg-slate-100/50";
    if (colorClass.includes("blue")) return "text-blue-600 bg-blue-100/50 border border-blue-200/50";
    if (colorClass.includes("emerald")) return "text-emerald-600 bg-emerald-100/50 border border-emerald-200/50";
    if (colorClass.includes("teal")) return "text-teal-600 bg-teal-100/50 border border-teal-200/50";
    if (colorClass.includes("purple")) return "text-purple-600 bg-purple-100/50 border border-purple-200/50";
    if (colorClass.includes("cyan")) return "text-cyan-600 bg-cyan-100/50 border border-cyan-200/50";
    if (colorClass.includes("amber")) return "text-amber-600 bg-amber-100/50 border border-amber-200/50";
    return "text-slate-600 bg-slate-100 border border-slate-200";
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col gap-8 w-full animate-fadeIn">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Today's Classes 
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
              <CheckCircle2 className="w-3 h-3" /> Live
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">Monday, 05 July 2026</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-1.5 rounded-xl">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1">Room</span>
          <span className="text-[11px] font-black text-brand-navy bg-white shadow-sm px-3 py-1 rounded-lg">104-A (Section X-A)</span>
        </div>
      </div>

      {/* Modern Grid Layout Timetable */}
      <div className="flex flex-col gap-4">
        {timetable.map((period, idx) => {
          const isBreak = period.type === "break";
          const cardStyle = getColorStyles(period.color, isBreak);
          const accentStyle = getAccentColor(period.color, isBreak);
          
          return (
            <div
              key={idx}
              className={`w-full rounded-2xl border transition-all duration-300 p-4 md:p-5 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center shadow-sm group ${cardStyle}`}
            >
              
              {/* Time Block */}
              <div className="flex items-center gap-3 md:w-48 shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentStyle}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isBreak ? 'text-slate-400' : 'text-slate-400'}`}>Period {idx + 1}</span>
                  <span className={`text-sm font-bold ${isBreak ? 'text-slate-500' : 'text-slate-700'}`}>{period.time}</span>
                </div>
              </div>

              {/* Separator icon for Desktop */}
              <div className="hidden md:flex text-slate-300 group-hover:text-slate-400 transition-colors">
                <ChevronRight className="w-5 h-5 stroke-1" />
              </div>

              {/* Subject Details */}
              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                
                {/* Subject Name & Type */}
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isBreak ? "bg-white text-slate-400 border border-slate-200" : "bg-white text-brand-green border border-slate-100 group-hover:scale-110 transition-transform duration-300"
                  }`}>
                    {isBreak ? <Coffee className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-lg font-black tracking-tight ${isBreak ? "text-slate-500" : "text-slate-800"}`}>
                      {period.subject}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                      {isBreak ? "Rest & Refresh" : "Core Curriculum"}
                    </span>
                  </div>
                </div>

                {/* Teacher & Location Meta */}
                <div className={`flex flex-row md:flex-col gap-4 md:gap-1.5 w-full md:w-auto items-center md:items-end p-3 md:p-0 rounded-xl md:rounded-none md:bg-transparent border md:border-transparent ${isBreak ? 'bg-white/50 border-slate-200/50' : 'bg-white/60 border-white/50'}`}>
                  
                  {!isBreak && (
                    <div className="flex items-center gap-2 text-slate-600 font-semibold text-xs">
                      <User className="w-3.5 h-3.5 text-slate-400" /> 
                      {period.teacher}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs ml-auto md:ml-0">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> 
                    {period.room}
                  </div>

                </div>

              </div>
              
            </div>
          );
        })}
      </div>

    </div>
  );
}
