"use client";

import React from "react";
import { Clock, BookOpen, User, MapPin } from "lucide-react";

export default function PortalSchedule() {
  const timetable = [
    { time: "08:00 AM - 08:15 AM", subject: "Morning Assembly", teacher: "All Faculty", room: "Central Courtyard", type: "break", color: "border-slate-300" },
    { time: "08:15 AM - 09:00 AM", subject: "Mathematics", teacher: "Mrs. Anjali Sen", room: "Room 104-A", type: "class", color: "border-blue-500" },
    { time: "09:00 AM - 09:45 AM", subject: "Physics", teacher: "Mr. Vikram Rana", room: "Physics Lab", type: "class", color: "border-emerald-500" },
    { time: "09:45 AM - 10:30 AM", subject: "Chemistry", teacher: "Dr. Rajesh K.", room: "Chemistry Lab", type: "class", color: "border-teal-500" },
    { time: "10:30 AM - 10:55 AM", subject: "Recess Break", teacher: "Duty Staff", room: "School Canteen", type: "break", color: "border-slate-300" },
    { time: "10:55 AM - 11:40 AM", subject: "English Core", teacher: "Mrs. Shreya Sharma", room: "Room 104-A", type: "class", color: "border-purple-500" },
    { time: "11:40 AM - 12:25 PM", subject: "Computer Science", teacher: "Mr. Rakesh Dixit", room: "Computer Lab", type: "class", color: "border-cyan-500" },
    { time: "12:25 PM - 01:10 PM", subject: "Social Science", teacher: "Mr. Ajay Verma", room: "Room 104-A", type: "class", color: "border-amber-500" },
    { time: "01:10 PM - 01:55 PM", subject: "Games / Sports", teacher: "Mr. P.S. Negi (PTI)", room: "Playground", type: "class", color: "border-emerald-500" },
    { time: "01:55 PM - 02:15 PM", subject: "Dispersal Assembly", teacher: "Class Teachers", room: "Central Courtyard", type: "break", color: "border-slate-300" }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6 w-full animate-fadeIn">
      
      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
        <h3 className="text-xs font-semibold md:font-extrabold text-slate-850 uppercase tracking-wider flex items-center gap-2">
          Daily Class Schedule (Mon - Sat)
        </h3>
        <span className="text-[10px] bg-emerald-50 text-brand-green border border-emerald-100/50 font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
          Room 104-A (Section X-A)
        </span>
      </div>

      {/* Timetable timeline listing */}
      <div className="flex flex-col gap-4 relative pl-3 border-l border-slate-100/80 ml-2">
        {timetable.map((period, idx) => {
          const isBreak = period.type === "break";
          return (
            <div
              key={idx}
              className={`flex flex-col md:flex-row md:items-center justify-between p-4.5 rounded-2xl border-l-4 border bg-white border-slate-100/80 hover:shadow-[0_8px_25px_-10px_rgba(0,0,0,0.03)] hover:border-brand-green/20 transition-all duration-300 relative group ${period.color}`}
            >
              {/* Bullet timeline node */}
              <div className={`absolute -left-[19px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white ${
                isBreak ? "bg-slate-300" : "bg-brand-green"
              }`} />

              {/* Timing */}
              <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs md:text-sm md:w-56 shrink-0">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{period.time}</span>
              </div>

              {/* Subject */}
              <div className="flex-1 mt-3 md:mt-0 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isBreak ? "bg-slate-50 text-slate-500 border border-slate-100" : "bg-emerald-50 text-brand-green border border-emerald-100/30"
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${isBreak ? "text-slate-500" : "text-slate-800"}`}>
                    {period.subject}
                  </span>
                  {!isBreak && (
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <User className="w-3 h-3 text-slate-350" /> {period.teacher}
                    </span>
                  )}
                </div>
              </div>

              {/* Classroom location */}
              <div className="mt-3 md:mt-0 flex items-center gap-1.5 text-slate-400 font-semibold text-[10px] uppercase tracking-wider md:w-44 md:justify-end">
                <MapPin className="w-3.5 h-3.5 text-slate-350 shrink-0" />
                <span>{period.room}</span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
