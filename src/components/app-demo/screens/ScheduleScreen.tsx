"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";

export default function ScheduleScreen() {
  const [activeTab, setActiveTab] = useState<"timetable" | "attendance">("timetable");

  return (
    <div className="flex flex-col w-full h-full pb-20 animate-fadeIn">
      <div className="p-5 bg-white border-b border-slate-200">
        <h1 className="text-[20px] font-bold text-[#121c28]">Schedule</h1>
        
        {/* Segmented Control */}
        <div className="flex mt-4 bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("timetable")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${activeTab === "timetable" ? "bg-white text-[#006a37] shadow-sm" : "text-slate-500"}`}
          >
            Timetable
          </button>
          <button 
            onClick={() => setActiveTab("attendance")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${activeTab === "attendance" ? "bg-white text-[#006a37] shadow-sm" : "text-slate-500"}`}
          >
            Attendance
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
        {activeTab === "timetable" && (
          <div className="space-y-4 animate-fadeIn">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] scale-150 pointer-events-none text-[#006a37]">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.8L18.4 19H5.6L12 5.8z"/></svg>
                </div>
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-[#006a37]">08:00 AM - 08:45 AM</p>
                    <span className="flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                       <MapPin className="w-3 h-3" /> Room 302
                    </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Physics (Theory)</h3>
                <p className="text-sm text-slate-500 mt-1">Mr. R.K. Sharma</p>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] scale-150 pointer-events-none text-[#0c3c86]">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-slate-500">08:50 AM - 09:35 AM</p>
                    <span className="flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                       <MapPin className="w-3 h-3" /> Lab 2
                    </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Chemistry (Practical)</h3>
                <p className="text-sm text-slate-500 mt-1">Mrs. S. Gupta</p>
             </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="space-y-6 animate-fadeIn">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#E6F4EA] p-4 rounded-xl">
                  <p className="text-xs font-semibold text-[#006a37]">Present</p>
                  <h3 className="text-2xl font-bold text-[#006a37] mt-1">180</h3>
                </div>
                <div className="bg-[#FCE8E6] p-4 rounded-xl">
                  <p className="text-xs font-semibold text-rose-600">Absent</p>
                  <h3 className="text-2xl font-bold text-rose-600 mt-1">5</h3>
                </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                <h3 className="text-sm font-bold text-slate-900 mb-4 text-center">May 2024</h3>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="font-semibold text-slate-400 mb-2">{d}</div>
                  ))}
                  {Array.from({length: 31}).map((_, i) => {
                    const day = i + 1;
                    const isAbsent = day === 14;
                    const isSunday = (day + 2) % 7 === 0;
                    return (
                      <div key={i} className={`flex items-center justify-center h-8 rounded-full ${isAbsent ? 'bg-[#FCE8E6] text-rose-600 font-bold' : isSunday ? 'text-slate-300' : 'text-slate-700'}`}>
                        {day}
                        {!isAbsent && !isSunday && day < 20 && <div className="absolute w-1 h-1 bg-[#006a37] rounded-full translate-y-3"></div>}
                      </div>
                    )
                  })}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
