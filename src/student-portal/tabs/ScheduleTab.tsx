"use client";

import React from "react";
import { MapPin, Download, Printer } from "lucide-react";

export default function ScheduleTab() {
  
  // Today's schedule card list
  const todaySchedule = [
    {
      time: "8:00 AM - 9:00 AM",
      subject: "Physics",
      teacher: "Mrs. R. Gupta",
      room: "Room 101",
      watermark: (
        <svg className="absolute bottom-1 right-1 w-16 h-16 text-slate-100 opacity-25 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      )
    },
    {
      time: "9:00 AM - 10:00 AM",
      subject: "Chemistry",
      teacher: "Mr. S. Kumar",
      room: "Room 102",
      watermark: (
        <svg className="absolute bottom-1 right-1 w-16 h-16 text-slate-100 opacity-25 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244m0 0a3.75 3.75 0 0 0-2.008 3.24v3.01a6 6 0 0 1-1.2 3.6l-1.166 1.556A.75.75 0 0 0 6 18h12a.75.75 0 0 0 .58-.29l-1.167-1.557a6 6 0 0 1-1.2-3.6V7.588a3.75 3.75 0 0 0-2.008-3.24m-4.464 0h8.928M9.75 3.104h4.5m-4.5 0v1.244m4.5-1.244v1.244M9 21h6" />
        </svg>
      )
    },
    {
      time: "10:00 AM - 11:00 AM",
      subject: "Mathematics",
      teacher: "Mr. A. Verma",
      room: "Room 203",
      watermark: (
        <svg className="absolute bottom-1 right-1 w-16 h-16 text-slate-100 opacity-25 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
      )
    }
  ];

  // Weekly timetable grid
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const timetableRows = [
    {
      time: "8:00 AM",
      schedule: [
        { subject: "Physics", teacher: "Mrs. R. Gupta", room: "R-101" },
        { subject: "Physics", teacher: "Mrs. R. Gupta", room: "R-101" },
        { subject: "Physics", teacher: "Mrs. R. Gupta", room: "R-101" },
        { subject: "Physics", teacher: "Mrs. R. Gupta", room: "R-101" },
        { subject: "Physics", teacher: "Mrs. R. Gupta", room: "R-101" },
        null // Saturday
      ]
    },
    {
      time: "9:00 AM",
      schedule: [
        { subject: "Chemistry", teacher: "Mr. S. Kumar", room: "R-102" },
        { subject: "Chemistry", teacher: "Mr. S. Kumar", room: "R-102" },
        { subject: "Chemistry", teacher: "Mr. S. Kumar", room: "R-102" },
        { subject: "Chemistry", teacher: "Mr. S. Kumar", room: "R-102" },
        { subject: "Chemistry", teacher: "Mr. S. Kumar", room: "R-102" },
        { subject: "Chemistry", teacher: "Mr. S. Kumar", room: "R-102" } // Saturday
      ]
    },
    {
      time: "10:00 AM",
      schedule: [
        { subject: "Mathematics", teacher: "Mr. A. Verma", room: "R-203" },
        { subject: "Mathematics", teacher: "Mr. A. Verma", room: "R-203" },
        { subject: "Mathematics", teacher: "Mr. A. Verma", room: "R-203" },
        { subject: "Mathematics", teacher: "Mr. A. Verma", room: "R-203" },
        { subject: "Mathematics", teacher: "Mr. A. Verma", room: "R-203" },
        null // Saturday
      ]
    },
    {
      time: "11:00 AM",
      schedule: [
        { subject: "English", teacher: "Ms. P. Sharma", room: "R-305" },
        { subject: "English", teacher: "Ms. P. Sharma", room: "R-305" },
        { subject: "English", teacher: "Ms. P. Sharma", room: "R-305" },
        { subject: "English", teacher: "Ms. P. Sharma", room: "R-305" },
        { subject: "English", teacher: "Ms. P. Sharma", room: "R-305" },
        null // Saturday
      ]
    },
    {
      time: "12:00 PM",
      isLunchBreak: true
    },
    {
      time: "1:00 PM",
      schedule: [
        { subject: "Computer Science", teacher: "Mr. V. Singh", room: "Lab A" },
        { subject: "Computer Science", teacher: "Mr. V. Singh", room: "Lab A" },
        { subject: "Computer Science", teacher: "Mr. V. Singh", room: "Lab A" },
        { subject: "Computer Science", teacher: "Mr. V. Singh", room: "Lab A" },
        { subject: "Computer Science", teacher: "Mr. V. Singh", room: "Lab A" },
        null // Saturday
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn pb-12 select-none font-sans">
      
      {/* Today's Schedule Card Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[17px] font-medium text-slate-900 leading-none">
            Today's Schedule
          </h3>
          <span className="text-xs font-medium text-[#006a37]">
            Monday, Oct 14
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {todaySchedule.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white border font-semibold border-slate-200 rounded-xl p-5 flex flex-center flex-col justify-between shadow-2xs h-32 relative overflow-hidden"
            >
              {/* Watermark SVG */}
              {item.watermark}

              <div className="flex flex-col relative z-10">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.time}
                </span>
                <span className="text-[20px] font-bold text-[#121c28] tracking-tight mt-1.5 leading-none">
                  {item.subject}
                </span>
                <span className="text-xs text-slate-450 font-semibold mt-2">
                  {item.teacher}
                </span>
              </div>

              {/* Room Location badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] border border-slate-200/40 text-[10.5px] font-semibold text-slate-600 w-fit mt-3.5 relative z-10">
                <MapPin className="w-3 h-3 text-slate-455" />
                <span>{item.room}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Timetable Grid Section */}
      <div className="flex flex-col gap-4.5 mt-2">
        
        {/* Weekly Header & Action buttons */}
        <div className="flex justify-between items-center">
          <h3 className="text-[17px] font-semibold text-slate-900 leading-none">
            Weekly Timetable
          </h3>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition">
              <Download className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekly Timetable Table Grid */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#F8F9FF] border-b border-slate-200 select-none text-[11px] font-semibold text-slate-455 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold border-r border-slate-200 w-24">Time</th>
                  {days.map(d => (
                    <th key={d} className="py-3 px-2 font-semibold border-r border-slate-200 last:border-r-0">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timetableRows.map((row, i) => {
                  if (row.isLunchBreak) {
                    return (
                      <tr key={i} className="bg-[#FFF9F6] border-y border-slate-100">
                        <td className="py-5 font-bold text-[#121c28] text-xs font-sans border-r border-slate-200 w-24 uppercase">
                          {row.time}
                        </td>
                        <td colSpan={6} className="py-5 font-bold text-[#ba1a1a] text-[12.5px] uppercase tracking-[0.25em] text-center">
                          Lunch Break
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={i} className="hover:bg-slate-50/20 transition duration-150">
                      {/* Time Column Cell */}
                      <td className="py-6 font-bold text-[#121c28] text-[12.5px] border-r border-slate-200 w-24">
                        {row.time}
                      </td>
                      
                      {/* Day Cells */}
                      {row.schedule?.map((cell, idx) => (
                        <td 
                          key={idx} 
                          className="py-5 px-3 border-r border-slate-200 last:border-r-0 align-middle justify-center"
                        >
                          {cell ? (
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-[#006a37] font-semibold text-[13px] leading-tight">
                                {cell.subject}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium mt-1">
                                {cell.teacher}
                              </span>
                              <span className="text-[9px] text-slate-455 font-semibold font-mono mt-0.5">
                                {cell.room}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-350 font-semibold text-sm">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
