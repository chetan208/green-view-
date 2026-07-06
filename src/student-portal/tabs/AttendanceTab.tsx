"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle2, XCircle, LogOut } from "lucide-react";

export default function AttendanceTab() {
  const [currentMonth, setCurrentMonth] = useState("May 2024");

  // Four top stats cards
  const stats = [
    {
      title: "ATTENDANCE YTD",
      value: "94.2%",
      subtext: "Excellent standing",
      icon: Calendar,
      iconColor: "text-slate-500",
      bgColor: "bg-white",
    },
    {
      title: "PRESENT",
      value: "180 days",
      subtext: "",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      bgColor: "bg-white",
    },
    {
      title: "ABSENT",
      value: "5 days",
      subtext: "",
      icon: XCircle,
      iconColor: "text-rose-500",
      bgColor: "bg-white",
    },
    {
      title: "LEAVE",
      value: "2 days",
      subtext: "",
      icon: LogOut,
      iconColor: "text-blue-500",
      bgColor: "bg-white",
    },
  ];

  // Subject-wise Attendance Table Data
  const subjects = [
    { name: "English (Core)", total: 45, attended: 43, percentage: "95.56%" },
    { name: "Physics", total: 45, attended: 41, percentage: "91.11%" },
    { name: "Chemistry", total: 45, attended: 40, percentage: "88.89%" },
    { name: "Mathematics", total: 45, attended: 42, percentage: "93.33%" },
    { name: "Computer Science", total: 30, attended: 29, percentage: "96.67%" },
  ];

  // Calendar configuration for May 2024
  // 1: Present (green dot), 0: Absent (red dot, no box), -1: Absent with light-red box (red dot + red bg box), 3: Sunday (muted gray text, no dot), 4: Muted/inactive days of surrounding months
  const calendarDays = [
    // Row 1
    { day: 28, status: 4 },
    { day: 29, status: 4 },
    { day: 30, status: 4 },
    { day: 1, status: 1 },
    { day: 2, status: 1 },
    { day: 3, status: 1 },
    { day: 4, status: 1 },
    // Row 2
    { day: 5, status: 1 },
    { day: 6, status: -1 }, // Absent with box
    { day: 7, status: 1 },
    { day: 8, status: 1 },
    { day: 9, status: 1 },
    { day: 10, status: 1 },
    { day: 11, status: 1 },
    // Row 3
    { day: 12, status: 1 },
    { day: 13, status: 1 },
    { day: 14, status: 0 }, // Absent without box
    { day: 15, status: 1 },
    { day: 16, status: 1 },
    { day: 17, status: 1 },
    { day: 18, status: 1 },
    // Row 4
    { day: 19, status: 1 },
    { day: 20, status: -1 }, // Absent with box
    { day: 21, status: 1 },
    { day: 22, status: -1 }, // Absent with box
    { day: 23, status: 0 }, // Absent without box
    { day: 24, status: 0 }, // Absent without box
    { day: 25, status: 1 },
    // Row 5
    { day: 26, status: 1 },
    { day: 27, status: 1 },
    { day: 28, status: 0 }, // Absent without box
    { day: 29, status: 1 },
    { day: 30, status: 1 },
    { day: 31, status: 1 },
    { day: 1, status: 4 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn pb-12 select-none">
      
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-2xs h-28 relative"
            >
              {/* Top Row: Label & Icon */}
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <Icon className={`w-4.5 h-4.5 ${stat.iconColor}`} />
              </div>
              {/* Bottom Row: Value & Subtext */}
              <div className="flex flex-col mt-2">
                <span className="text-2xl font-bold text-slate-900 leading-none">
                  {stat.value}
                </span>
                {stat.subtext ? (
                  <span className="text-[10px] text-[#006a37] font-semibold mt-1.5">
                    {stat.subtext}
                  </span>
                ) : (
                  <span className="h-3 mt-1.5"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Attendance Calendar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col gap-5">
        
        {/* Calendar Card Header */}
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-[16px] font-bold text-slate-900">
            Monthly Attendance
          </h3>
          <div className="flex items-center gap-4 text-slate-650 font-bold">
            <button className="p-1 hover:text-slate-900 transition cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold tracking-wide">{currentMonth}</span>
            <button className="p-1 hover:text-slate-900 transition cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-100">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center items-center justify-items-center">
          {calendarDays.map((cell, i) => {
            const isInactive = cell.status === 4;
            const isAbsentBox = cell.status === -1;
            const isAbsentDot = cell.status === 0;
            const isPresent = cell.status === 1;

            return (
              <div 
                key={i}
                className={`w-full flex items-center justify-center py-2.5 rounded-lg relative ${
                  isAbsentBox ? "bg-[#fce8e6] text-[#ba1a1a]" : "text-slate-800"
                }`}
              >
                <div className="flex items-center gap-1.5 justify-center">
                  <span className={`text-[13px] font-semibold ${
                    isInactive ? "text-slate-350" : isAbsentBox || isAbsentDot ? "text-[#ba1a1a] font-bold" : "text-slate-800"
                  }`}>
                    {cell.day}
                  </span>
                  
                  {/* Attendance Status Dot */}
                  {!isInactive && (
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isPresent ? "bg-[#006a37]" : "bg-[#ba1a1a]"
                    }`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject-wise Attendance Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs">
        <h3 className="text-[16px] font-bold text-slate-900 mb-5">
          Subject-wise Attendance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100 select-none text-[11px] uppercase tracking-wider">
                <th className="pb-3 pl-4 font-semibold">Subject</th>
                <th className="pb-3 text-center font-semibold">Total Classes</th>
                <th className="pb-3 text-center font-semibold">Attended</th>
                <th className="pb-3 text-center font-semibold">Percentage</th>
                <th className="pb-3 pr-4 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((row, i) => (
                <tr key={i} className="text-slate-850 font-semibold hover:bg-slate-50/50 transition">
                  <td className="py-4 pl-4 font-bold text-slate-900">{row.name}</td>
                  <td className="py-4 text-center text-slate-500 font-mono font-bold">{row.total}</td>
                  <td className="py-4 text-center text-slate-500 font-mono font-bold">{row.attended}</td>
                  <td className="py-4 text-center text-slate-950 font-mono font-bold">{row.percentage}</td>
                  <td className="py-4 text-center pr-4">
                    <span className="bg-[#E6F4EA] text-[#006a37] text-[11px] font-bold px-3 py-1 rounded-full">
                      Excellent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
