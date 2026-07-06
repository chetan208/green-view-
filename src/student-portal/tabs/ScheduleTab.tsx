"use client";

import React, { useState } from "react";
import DailySchedule from "../components/schedule/DailySchedule";
import CalendarMonthView from "../../../app/academics/calendar/components/CalendarMonthView";
import CalendarGrid from "../../../app/academics/calendar/components/CalendarGrid";

export default function ScheduleTab() {
  const [view, setView] = useState<"daily" | "yearly">("daily");

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
    <div className="w-full flex flex-col gap-5 animate-fadeIn select-none">
      
      {/* Toggle Switch (Pill Segmented Control) */}
      <div className="bg-slate-100/85 p-0.5 rounded-lg border border-slate-200/30 flex items-center w-full max-w-[320px] mx-auto md:mx-0 shrink-0">
        <button
          onClick={() => setView("daily")}
          className="flex-1 text-[10px] font-bold py-1.5 px-3 rounded-md transition-all duration-200 text-center cursor-pointer bg-transparent text-slate-500 hover:text-slate-800 data-[active=true]:bg-white data-[active=true]:text-slate-800 data-[active=true]:shadow-xs"
          data-active={view === "daily"}
        >
          Daily Timetable
        </button>
        <button
          onClick={() => setView("yearly")}
          className="flex-1 text-[10px] font-bold py-1.5 px-3 rounded-md transition-all duration-200 text-center cursor-pointer bg-transparent text-slate-500 hover:text-slate-800 data-[active=true]:bg-white data-[active=true]:text-slate-800 data-[active=true]:shadow-xs"
          data-active={view === "yearly"}
        >
          Academic Calendar
        </button>
      </div>

      {/* Content View */}
      <div className="w-full flex-1">
        {view === "daily" ? (
          <DailySchedule timetable={timetable} />
        ) : (
          <div className="flex flex-col gap-6 bg-white border border-slate-200 rounded-xl p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] overflow-hidden pb-10">
            {/* Embedded Calendar from main website */}
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-150">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Full Academic Calendar
              </h3>
            </div>
            <CalendarMonthView />
            <CalendarGrid />
          </div>
        )}
      </div>

    </div>
  );
}
