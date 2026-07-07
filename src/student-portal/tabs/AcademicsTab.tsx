"use client";

import React from "react";
import { User, BookOpen } from "lucide-react";

export default function AcademicsTab() {
  
  // Subject list with teacher and progress
  const subjects = [
    { name: "English (Core)", teacher: "Mr. A. Kumar", progress: 75 },
    { name: "Physics", teacher: "Mrs. S. Gupta", progress: 82 },
    { name: "Chemistry", teacher: "Dr. R. Singh", progress: 68 },
    { name: "Mathematics", teacher: "Mr. V. Sharma", progress: 90 },
    { name: "Computer Science", teacher: "Ms. P. Mehta", progress: 55 },
  ];

  // Notes list
  const notes = [
    "Physics: Chapter 5 Notes uploaded",
    "Math: Assignment 3 Due next week",
    "English: Poem summary available"
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full animate-fadeIn pb-12 select-none">
      
      {/* Left Column: Class Details & Subject Progress List */}
      <div className="flex-1 flex flex-col gap-6 w-full">
        
        {/* Class Details Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <h3 className="text-[17px] font-bold text-slate-900 leading-none">
              Class Details
            </h3>
            <div className="flex flex-wrap gap-2.5 mt-1">
              <span className="bg-white border border-slate-200 text-slate-650 text-xs font-semibold px-4 py-1.5 rounded-lg">
                Class 12
              </span>
              <span className="bg-white border border-slate-200 text-slate-650 text-xs font-semibold px-4 py-1.5 rounded-lg">
                Science
              </span>
              <span className="bg-white border border-slate-200 text-slate-650 text-xs font-semibold px-4 py-1.5 rounded-lg">
                HPBOSE
              </span>
            </div>
          </div>

          {/* Right Side Avatar Circular Icon */}
          <div className="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center shrink-0">
            <User className="w-5.5 h-5.5 text-slate-500" />
          </div>
        </div>

        {/* Subjects 2-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {subjects.map((sub, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col gap-4"
            >
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-slate-900 leading-none">
                  {sub.name}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold mt-2.5">
                  Teacher: {sub.teacher}
                </span>
              </div>

              {/* Progress text row */}
              <div className="flex justify-between items-end mt-1 text-[10px] font-normal text-slate-450 uppercase tracking-wider">
                <span>Progress</span>
                <span className="text-xs font-bold text-slate-900 font-mono tracking-normal normal-case">
                  {sub.progress}%
                </span>
              </div>

              {/* Progress bar slider */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#006a37] rounded-full" 
                  style={{ width: `${sub.progress}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Academic Summary Chart & Recent Notes */}
      <div className="w-full lg:w-[360px] flex flex-col gap-6 shrink-0">
        
        {/* Academic Performance Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-5">
          <h3 className="text-[16px] font-bold text-slate-900 leading-none">
            Academic Performance Summary
          </h3>

          {/* SVG Line Chart */}
          <div className="w-full relative mt-2">
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              {/* Horizontal Grid Lines */}
              <line x1="35" y1="20" x2="280" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="35" y1="50" x2="280" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="35" y1="80" x2="280" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="35" y1="110" x2="280" y2="110" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="35" y1="140" x2="280" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="35" y1="170" x2="280" y2="170" stroke="#e2e8f0" strokeWidth="1" />

              {/* Vertical Axes/Ticks */}
              <line x1="35" y1="20" x2="35" y2="170" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y-Axis Labels */}
              <text x="25" y="24" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">100</text>
              <text x="25" y="54" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">80</text>
              <text x="25" y="84" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">60</text>
              <text x="25" y="114" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">40</text>
              <text x="25" y="144" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">20</text>
              <text x="25" y="174" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">0</text>

              {/* Path 1: Math (green, 48 -> 80 -> 88) */}
              <path 
                d="M 60 98 L 160 50 L 260 38" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Path 2: English (green, 45 -> 78 -> 85) */}
              <path 
                d="M 60 102.5 L 160 53 L 260 42.5" 
                fill="none" 
                stroke="#006a37" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Path 3: Chemistry (red, 60 -> 45 -> 55) */}
              <path 
                d="M 60 80 L 160 102.5 L 260 87.5" 
                fill="none" 
                stroke="#ba1a1a" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Path 4: Physics (green, 32 -> 65 -> 75) */}
              <path 
                d="M 60 122 L 160 72.5 L 260 57.5" 
                fill="none" 
                stroke="#0b9e50" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* X-Axis Labels */}
              <text x="60" y="192" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Term 1</text>
              <text x="160" y="192" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Term 2</text>
              <text x="260" y="192" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Mid-term</text>
            </svg>
          </div>

          {/* Legend Grid Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] font-semibold text-slate-550 border-t border-slate-100 pt-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a37]" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0b9e50]" />
              <span>Physics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
              <span>Chemistry</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <span>Math</span>
            </div>
          </div>
        </div>

        {/* Recent Academic Notes */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-slate-900 leading-none mb-1">
            Recent Academic Notes
          </h3>

          <div className="flex flex-col gap-3">
            {notes.map((note, i) => (
              <div 
                key={i} 
                className="bg-[#F8F9FF] border border-slate-200/60 rounded-xl p-4.5 text-xs text-slate-800 font-semibold leading-normal"
              >
                {note}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
