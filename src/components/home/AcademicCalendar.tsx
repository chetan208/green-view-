"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Bell } from "lucide-react";

export default function AcademicCalendar() {
  const [currentMonth, setCurrentMonth] = useState("June 2026");

  const events = [
    { date: "June 01", title: "Summer Vacation Starts", type: "holiday" },
    { date: "June 21", title: "International Yoga Day Celebration", type: "event" },
    { date: "June 23", title: "Periodic Test-1 Begins (Grades I-XII)", type: "academic" },
    { date: "June 30", title: "Parent-Teacher Meeting (PTM)", type: "meeting" },
  ];

  const calendarDays = [
    { day: "25", isCurrentMonth: false },
    { day: "26", isCurrentMonth: false },
    { day: "27", isCurrentMonth: false },
    { day: "28", isCurrentMonth: false },
    { day: "29", isCurrentMonth: false },
    { day: "30", isCurrentMonth: false },
    { day: "31", isCurrentMonth: false },
    { day: "1", isCurrentMonth: true },
    { day: "2", isCurrentMonth: true },
    { day: "3", isCurrentMonth: true },
    { day: "4", isCurrentMonth: true },
    { day: "5", isCurrentMonth: true },
    { day: "6", isCurrentMonth: true },
    { day: "7", isCurrentMonth: true },
    { day: "8", isCurrentMonth: true },
    { day: "9", isCurrentMonth: true },
    { day: "10", isCurrentMonth: true },
    { day: "11", isCurrentMonth: true },
    { day: "12", isCurrentMonth: true },
    { day: "13", isCurrentMonth: true },
    { day: "14", isCurrentMonth: true },
    { day: "15", isCurrentMonth: true },
    { day: "16", isCurrentMonth: true },
    { day: "17", isCurrentMonth: true },
    { day: "18", isCurrentMonth: true },
    { day: "19", isCurrentMonth: true },
    { day: "20", isCurrentMonth: true },
    { day: "21", isCurrentMonth: true, isSpecial: true },
    { day: "22", isCurrentMonth: true },
    { day: "23", isCurrentMonth: true, isActive: true },
    { day: "24", isCurrentMonth: true },
    { day: "25", isCurrentMonth: true },
    { day: "26", isCurrentMonth: true },
    { day: "27", isCurrentMonth: true },
    { day: "28", isCurrentMonth: true },
    { day: "29", isCurrentMonth: true },
    { day: "30", isCurrentMonth: true },
    { day: "1", isCurrentMonth: false },
    { day: "2", isCurrentMonth: false },
    { day: "3", isCurrentMonth: false },
    { day: "4", isCurrentMonth: false },
    { day: "5", isCurrentMonth: false },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white flex justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-600" />
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Schedules
            </span>
            <span className="h-px w-8 bg-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Academic <span className="text-emerald-600">Calendar</span>
          </h2>
          <p className="text-slate-500 font-medium mt-4 max-w-lg">
            Stay updated with school events, activities, exams and public holidays.
          </p>
        </div>

        {/* Calendar & Events Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-12 items-stretch justify-center max-w-5xl">
          
          {/* Left: Monthly Calendar Widget */}
          <div className="flex-1 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col shadow-sm">
            
            {/* Header controls */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-600" />
                {currentMonth}
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-white rounded-xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors shadow-sm">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white rounded-xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors shadow-sm">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-xs font-bold text-slate-400 uppercase mb-4">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
            
            <div className="grid grid-cols-7 gap-y-2 gap-x-2 text-center">
              {calendarDays.map((day, idx) => (
                <button
                  key={idx}
                  className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                    day.isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-110"
                      : day.isSpecial
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : day.isCurrentMonth
                      ? "text-slate-800 hover:bg-slate-200/50"
                      : "text-slate-300"
                  }`}
                >
                  {day.day}
                </button>
              ))}
            </div>

          </div>

          {/* Right: Upcoming Events List */}
          <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-emerald-600" />
                Upcoming in {currentMonth.split(" ")[0]}
              </h3>

              <div className="flex flex-col gap-4">
                {events.map((ev, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-3 rounded-2xl bg-slate-50 border border-slate-100/50 hover:border-emerald-100 hover:bg-emerald-50/20 transition-all duration-300 group"
                  >
                    {/* Date Tag */}
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl flex flex-col items-center justify-center font-black min-w-[70px]">
                      <span className="text-base leading-none">{ev.date.split(" ")[1]}</span>
                      <span className="text-[9px] uppercase tracking-wider mt-1">{ev.date.split(" ")[0]}</span>
                    </div>
                    {/* Event Details */}
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                        {ev.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                        {ev.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white hover:bg-emerald-600 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 mt-6 shadow-md hover:shadow-emerald-600/10">
              Download Academic Calendar
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
