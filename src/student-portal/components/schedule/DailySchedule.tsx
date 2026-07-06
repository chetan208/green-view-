import React from "react";
import { Clock, BookOpen, User, MapPin, Coffee, ChevronRight, CheckCircle2 } from "lucide-react";

export default function DailySchedule({ timetable }: { timetable: any[] }) {
  
  const getColorStyles = (colorClass: string, isBreak: boolean) => {
    if (isBreak) return "bg-slate-50/50 border-slate-200 text-slate-500 border-dashed";
    if (colorClass.includes("blue")) return "bg-blue-50/30 border-blue-100 hover:border-blue-300";
    if (colorClass.includes("emerald")) return "bg-emerald-50/30 border-emerald-100 hover:border-emerald-300";
    if (colorClass.includes("teal")) return "bg-teal-50/30 border-teal-100 hover:border-teal-300";
    if (colorClass.includes("purple")) return "bg-purple-50/30 border-purple-100 hover:border-purple-300";
    if (colorClass.includes("cyan")) return "bg-cyan-50/30 border-cyan-100 hover:border-cyan-300";
    if (colorClass.includes("amber")) return "bg-amber-50/30 border-amber-100 hover:border-amber-300";
    return "bg-white border-slate-200 hover:border-slate-350";
  };

  const getAccentColor = (colorClass: string, isBreak: boolean) => {
    if (isBreak) return "text-slate-400 bg-slate-100/50";
    if (colorClass.includes("blue")) return "text-blue-600 bg-blue-100/40 border border-blue-200/40";
    if (colorClass.includes("emerald")) return "text-emerald-600 bg-emerald-100/40 border border-emerald-200/40";
    if (colorClass.includes("teal")) return "text-teal-600 bg-teal-100/40 border border-teal-200/40";
    if (colorClass.includes("purple")) return "text-purple-600 bg-purple-100/40 border border-purple-200/40";
    if (colorClass.includes("cyan")) return "text-cyan-600 bg-cyan-100/40 border border-cyan-200/40";
    if (colorClass.includes("amber")) return "text-amber-600 bg-amber-100/40 border border-amber-200/40";
    return "text-slate-650 bg-slate-100 border border-slate-200";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs flex flex-col gap-6 w-full animate-fadeIn select-none">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-3 border-b border-slate-150">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            Today's Classes 
            <span className="bg-[#E6F4EA] text-[#006a37] text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-[#a3e2b6]/25">
              <CheckCircle2 className="w-3 h-3" /> Live
            </span>
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Monday, 05 July 2026</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 p-1 rounded-lg">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2.5 py-1">Room</span>
          <span className="text-[10px] font-bold text-[#121c28] bg-white shadow-xs px-2.5 py-1 rounded-md border border-slate-100">104-A (Section X-A)</span>
        </div>
      </div>

      {/* Modern Grid Layout Timetable */}
      <div className="flex flex-col gap-3">
        {timetable.map((period, idx) => {
          const isBreak = period.type === "break";
          const cardStyle = getColorStyles(period.color, isBreak);
          const accentStyle = getAccentColor(period.color, isBreak);
          
          return (
            <div
              key={idx}
              className={`w-full rounded-xl border transition-all duration-200 p-4 flex flex-col md:flex-row gap-4 md:gap-5 items-start md:items-center shadow-xs group ${cardStyle}`}
            >
              
              {/* Time Block */}
              <div className="flex items-center gap-3 md:w-44 shrink-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${accentStyle}`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Period {idx + 1}</span>
                  <span className={`text-xs font-bold ${isBreak ? 'text-slate-500' : 'text-slate-750'}`}>{period.time}</span>
                </div>
              </div>

              {/* Separator icon for Desktop */}
              <div className="hidden md:flex text-slate-300">
                <ChevronRight className="w-4 h-4 stroke-2" />
              </div>

              {/* Subject Details */}
              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3">
                
                {/* Subject Name & Type */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                    isBreak ? "bg-white text-slate-400 border-slate-200" : "bg-white text-[#006a37] border-slate-100"
                  }`}>
                    {isBreak ? <Coffee className="w-4.5 h-4.5" /> : <BookOpen className="w-4.5 h-4.5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold tracking-tight ${isBreak ? "text-slate-500" : "text-slate-800"}`}>
                      {period.subject}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {isBreak ? "Rest & Refresh" : "Core Curriculum"}
                    </span>
                  </div>
                </div>

                {/* Teacher & Location Meta */}
                <div className={`flex flex-row md:flex-col gap-3 md:gap-1.5 w-full md:w-auto items-center md:items-end p-2.5 md:p-0 rounded-lg md:rounded-none md:bg-transparent border md:border-transparent ${isBreak ? 'bg-white/50 border-slate-200/50' : 'bg-white/60 border-white/50'}`}>
                  
                  {!isBreak && (
                    <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-xs">
                      <User className="w-3 h-3 text-slate-400" /> 
                      {period.teacher}
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-slate-550 font-semibold text-xs ml-auto md:ml-0">
                    <MapPin className="w-3 h-3 text-slate-400" /> 
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
