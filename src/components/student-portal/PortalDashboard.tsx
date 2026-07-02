"use client";

import React, { useState } from "react";
import { User, GraduationCap, Calendar, CreditCard, LogOut, Bell, FileText } from "lucide-react";
import PortalAcademics from "./PortalAcademics";
import PortalAttendance from "./PortalAttendance";
import PortalFees from "./PortalFees";
import PortalSchedule from "./PortalSchedule";

interface PortalDashboardProps {
  student: any;
  onLogout: () => void;
}

type TabType = "overview" | "academics" | "attendance" | "schedule" | "fees";

export default function PortalDashboard({ student, onLogout }: PortalDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "academics", label: "Academics", icon: GraduationCap },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "schedule", label: "Timetable", icon: FileText },
    { id: "fees", label: "Fees", icon: CreditCard },
  ] as const;

  const announcements = [
    { date: "02 July 2026", text: "Unit Test-II date sheet has been published. Exams begin July 20, 2026." },
    { date: "28 June 2026", text: "Inter-House Debate registration deadline extended till July 5." },
    { date: "15 June 2026", text: "School re-opens today. Welcome back after the summer vacation!" }
  ];

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
      
      {/* Left Column: Sidebar / Profile Navigation */}
      <div className="w-full md:w-64 bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-8 shrink-0 md:sticky md:top-28">
        <div className="flex flex-col gap-6">
          
          {/* Avatar and Profile Quick details */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100/60">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-2xl object-cover border border-emerald-500/20 shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 leading-snug truncate max-w-[130px]">{student.name}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{student.classSection}</span>
            </div>
          </div>

          {/* Navigation Sidebar Tabs */}
          <nav className="flex flex-row md:flex-col overflow-x-auto no-scrollbar max-w-full gap-1 p-1 bg-slate-50 md:bg-transparent rounded-2xl md:rounded-none flex-nowrap">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-semibold md:font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-brand-green to-brand-green-dark text-white shadow-md shadow-emerald-500/10"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-100/40"
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-650 py-2.5 rounded-xl text-xs font-semibold md:font-bold transition-colors cursor-pointer w-full"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>

      </div>

      {/* Right Column: Tab View Content */}
      <div className="flex-1 w-full min-h-[500px]">
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6 w-full animate-fadeIn">
            
            {/* Quick Cards Stats ( Frosted Neon cards with left vertical bar) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Attendance Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-green" />
                <div className="flex flex-col pl-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Attendance (Term)</span>
                  <span className="text-2xl font-semibold md:font-black text-slate-800 mt-1">{student.attendance}</span>
                </div>
                <span className="text-[10px] text-brand-green font-bold bg-emerald-50 border border-emerald-100/30 px-2.5 py-1 rounded-lg">Excellent</span>
              </div>

              {/* GPA Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-navy" />
                <div className="flex flex-col pl-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Grade Average</span>
                  <span className="text-2xl font-semibold md:font-black text-slate-800 mt-1">{student.gpa}</span>
                </div>
                <span className="text-[10px] text-brand-navy font-bold bg-blue-50 border border-blue-100/30 px-2.5 py-1 rounded-lg">Rank 1</span>
              </div>

              {/* Fee Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                <div className="flex flex-col pl-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Due Fees Invoice</span>
                  <span className="text-2xl font-semibold md:font-black text-slate-800 mt-1">{student.dueFees}</span>
                </div>
                <span className="text-[10px] text-amber-600 font-bold bg-amber-50 border border-amber-100/30 px-2.5 py-1 rounded-lg">Cleared</span>
              </div>

            </div>

            {/* Profile Detail Cards & Announcements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Profile Details Card */}
              <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                <h3 className="text-xs font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-brand-green rounded-full"></span> Student Registration Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
                  <div className="bg-slate-50/50 border border-slate-100/40 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">Roll Number</span>
                    <span className="text-slate-850 font-bold">{student.rollNo}</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100/40 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">Admission No</span>
                    <span className="text-slate-850 font-bold">{student.admissionNo}</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100/40 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">Class / Section</span>
                    <span className="text-slate-850 font-bold">{student.classSection}</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100/40 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">House Category</span>
                    <span className="text-brand-green font-bold">{student.house}</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100/40 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">Father&apos;s Name</span>
                    <span className="text-slate-850 font-bold">{student.fatherName}</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100/40 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">Contact Registry</span>
                    <span className="text-slate-850 font-bold">{student.contactMobile}</span>
                  </div>
                </div>
              </div>

              {/* Announcements Card */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                <h3 className="text-xs font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-brand-navy rounded-full"></span> Announcements
                </h3>
                <div className="flex flex-col gap-4 max-h-[250px] overflow-y-auto pr-1">
                  {announcements.map((ann, idx) => (
                    <div key={idx} className="flex flex-col gap-1 text-[11px] border-l-2 border-brand-green/30 pl-3 py-0.5">
                      <span className="text-slate-400 font-bold">{ann.date}</span>
                      <p className="text-slate-655 font-medium leading-relaxed mt-0.5">{ann.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {activeTab === "academics" && <PortalAcademics />}
        {activeTab === "attendance" && <PortalAttendance />}
        {activeTab === "schedule" && <PortalSchedule />}
        {activeTab === "fees" && <PortalFees />}
      </div>

    </div>
  );
}
