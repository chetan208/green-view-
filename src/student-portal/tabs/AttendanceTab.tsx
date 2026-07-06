"use client";

import React, { useState } from "react";
import OverviewCards, { AttendanceStat } from "../components/attendance/OverviewCards";
import CalendarView from "../components/attendance/CalendarView";

export default function AttendanceTab() {
  const [selectedMonth, setSelectedMonth] = useState("June 2026");

  // Four stats cards data matching the screenshot layout
  const attendanceStats: AttendanceStat[] = [
    { 
      label: "Overall YTD", 
      value: "94.2%", 
      subtext: "Year to date", 
      badgeBg: "bg-emerald-50/60", 
      badgeText: "text-emerald-700" 
    },
    { 
      label: "Classes Attended", 
      value: "210", 
      subtext: "of 225 classes", 
      badgeBg: "bg-blue-50/60", 
      badgeText: "text-blue-700" 
    },
    { 
      label: "Days Absent", 
      value: "4", 
      subtext: "This session", 
      badgeBg: "bg-rose-50/60", 
      badgeText: "text-rose-700" 
    },
    { 
      label: "Monthly (Jul)", 
      value: "100%", 
      subtext: "4 of 4 days", 
      badgeBg: "bg-emerald-50/60", 
      badgeText: "text-emerald-700" 
    },
  ];

  // June 2026 Calendar Days
  const juneDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    // Sundays: 7, 14, 21, 28
    if ([7, 14, 21, 28].includes(day)) return { day, status: 3 };
    // June 9 is holiday
    if (day === 9) return { day, status: 2 };
    // June 10 is absent
    if (day === 10) return { day, status: 0 };
    return { day, status: 1 };
  });

  // July 2026 Calendar Days
  const julyDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    // Sundays: 5, 12, 19, 26
    if ([5, 12, 19, 26].includes(day)) return { day, status: 3 };
    // July 9 is holiday
    if (day === 9) return { day, status: 2 };
    // July 16 is absent
    if (day === 16) return { day, status: 0 };
    return { day, status: 1 };
  });

  // May 2026 Calendar Days
  const mayDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    // Sundays: 3, 10, 17, 24, 31
    if ([3, 10, 17, 24, 31].includes(day)) return { day, status: 3 };
    // May 14 is absent
    if (day === 14) return { day, status: 0 };
    // May 20 is holiday
    if (day === 20) return { day, status: 2 };
    return { day, status: 1 };
  });

  const getDaysForMonth = () => {
    if (selectedMonth.startsWith("June")) return juneDays;
    if (selectedMonth.startsWith("July")) return julyDays;
    return mayDays;
  };

  // Monthly summary table data
  const monthlySummary = [
    { month: "April 2026", working: 22, present: 20, absent: 2, percent: "90.9%" },
    { month: "May 2026", working: 18, present: 18, absent: 0, percent: "100.0%" },
    { month: "June 2026", working: 25, present: 24, absent: 1, percent: "96.0%" },
    { month: "July 2026", working: 4, present: 4, absent: 0, percent: "100.0%" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn pb-12">
      {/* Top 4 Stats Cards */}
      <OverviewCards stats={attendanceStats} />

      {/* Centered Heading */}
      <div className="text-center my-2 select-none">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Academic <span className="text-brand-green">Calendar</span>
        </h2>
      </div>

      {/* Calendar Grid Section */}
      <CalendarView 
        selectedMonth={selectedMonth} 
        setSelectedMonth={setSelectedMonth} 
        days={getDaysForMonth()} 
      />

      {/* Bottom Section: Summary & Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-1">
        {/* Left: Monthly Summary Table */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-150 mb-3.5 select-none">
            Monthly Summary
          </h3>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 select-none">
                  <th className="pb-2.5 font-medium">Month</th>
                  <th className="pb-2.5 text-center font-medium">Working Days</th>
                  <th className="pb-2.5 text-center font-medium">Present</th>
                  <th className="pb-2.5 text-center font-medium">Absent</th>
                  <th className="pb-2.5 text-right font-medium">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthlySummary.map((row, i) => (
                  <tr key={i} className="text-slate-700 font-semibold hover:bg-slate-55/50 transition">
                    <td className="py-3">{row.month}</td>
                    <td className="py-3 text-center text-slate-500 font-mono">{row.working}</td>
                    <td className="py-3 text-center text-emerald-600 font-mono">{row.present}</td>
                    <td className="py-3 text-center text-rose-500 font-mono">{row.absent}</td>
                    <td className="py-3 text-right">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100/50 font-mono text-[10px] font-bold">
                        {row.percent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Policy Guidelines & CBSE Benchmark */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-150 mb-3.5 select-none">
              Attendance Rules & CBSE Guidelines
            </h3>
            <div className="flex flex-col gap-3 text-xs text-slate-500 font-medium leading-relaxed">
              <p>
                <strong className="text-slate-750 font-semibold">1. CBSE Mandate:</strong> A minimum of <strong className="text-brand-green font-semibold">75% attendance</strong> is compulsory in each academic session for a student to be eligible to sit for the CBSE Board Examinations.
              </p>
              <p>
                <strong className="text-slate-755 font-semibold">2. Medical Leaves:</strong> In case of prolonged illness, parents must submit a formal medical certificate and leave application addressed to the Principal within 3 days of absence.
              </p>
              <p>
                <strong className="text-slate-755 font-semibold">3. School Benchmark:</strong> Green View Senior Secondary School sets a target benchmark of <strong className="text-brand-navy font-semibold">90% attendance</strong> for consistent academic engagement.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50/20 border border-blue-100/30 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-navy flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="flex flex-col select-none">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">CBSE Safe Status</span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">Your attendance is within the safe range (94.2% YTD). Keep it up!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
