"use client";

import React, { useState } from "react";
import OverviewCards from "../components/attendance/OverviewCards";
import CalendarView from "../components/attendance/CalendarView";

export default function AttendanceTab() {
  const [selectedMonth, setSelectedMonth] = useState("July 2026");

  const monthlyAttendance = [
    { label: "Present Days", value: "21", color: "bg-emerald-50 text-brand-green border border-emerald-100/50" },
    { label: "Absent Days", value: "1", color: "bg-red-50 text-red-650 border border-red-100/50" },
    { label: "On Approved Leave", value: "1", color: "bg-amber-50 text-amber-600 border border-amber-100/50" },
  ];

  const julyDays = [
    { day: 1, status: 1 }, { day: 2, status: 1 }, { day: 3, status: 1 }, { day: 4, status: 3 }, { day: 5, status: 3 },
    { day: 6, status: 1 }, { day: 7, status: 1 }, { day: 8, status: 1 }, { day: 9, status: 2 }, { day: 10, status: 1 },
    { day: 11, status: 3 }, { day: 12, status: 3 }, { day: 13, status: 1 }, { day: 14, status: 1 }, { day: 15, status: 1 },
    { day: 16, status: 0 }, { day: 17, status: 1 }, { day: 18, status: 3 }, { day: 19, status: 3 }, { day: 20, status: 1 },
    { day: 21, status: 1 }, { day: 22, status: 1 }, { day: 23, status: 1 }, { day: 24, status: 1 }, { day: 25, status: 3 },
    { day: 26, status: 3 }, { day: 27, status: 1 }, { day: 28, status: 1 }, { day: 29, status: 1 }, { day: 30, status: 1 },
    { day: 31, status: 1 }
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      <OverviewCards stats={monthlyAttendance} />
      <CalendarView selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} days={julyDays} />
    </div>
  );
}
