"use client";

import React, { useState } from "react";
import { User, GraduationCap, Calendar, FileText, CreditCard, Search, Bell, ChevronDown } from "lucide-react";
import AcademicsTab from "./tabs/AcademicsTab";
import AttendanceTab from "./tabs/AttendanceTab";
import FeesTab from "./tabs/FeesTab";
import ScheduleTab from "./tabs/ScheduleTab";
import Sidebar, { TabType } from "./components/Sidebar";

import QuickCards from "./components/overview/QuickCards";
import ProfileDetails from "./components/overview/ProfileDetails";
import DetailColumns from "./components/overview/DetailColumns";

// Static dummy student data
const DUMMY_STUDENT = {
  name: "Rahul Sharma",
  hindiName: "राहुल शर्मा",
  avatar: "https://i.pravatar.cc/150?u=Rahul",
  classSection: "Class 12",
  stream: "Science",
  board: "HPBOSE",
  rollNo: "1123456",
  dob: "15 Apr 2007",
  gender: "Male",
  category: "General",
  aadhaar: "XXXX-XXXX-1234",
  attendance: "94.2%",
  gpa: "92.00%",
  documents: "3/4",
  feeStatus: "Cleared"
};

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const student = DUMMY_STUDENT;

  // Title config per tab
  const getTabHeader = () => {
    switch(activeTab) {
      case "overview": return { title: "Overview", icon: User, sub: "Your complete student profile and quick stats" };
      case "academics": return { title: "Academics", icon: GraduationCap, sub: "Grades and academic records" };
      case "attendance": return { title: "Attendance", icon: Calendar, sub: "Attendance tracking and records" };
      case "schedule": return { title: "Timetable", icon: FileText, sub: "Daily class schedule and periods" };
      case "fees": return { title: "Fees", icon: CreditCard, sub: "Fee status and past receipts" };
    }
  };
  const headerData = getTabHeader();
  const HeaderIcon = headerData.icon;

  return (
    <div className="w-full min-h-screen bg-[#f1f5f9] flex flex-col">
      
      {/* Global Portal Top Header */}
      <header className="fixed top-0 left-0 w-full h-16 z-50 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
          </div>
          <span className="font-black text-lg text-brand-navy tracking-tight">Student Portal</span>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex items-center flex-1 justify-center px-10">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search portal..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold outline-none focus:border-[#4ade80]/50 focus:ring-2 focus:ring-[#4ade80]/10 transition-all w-full" />
          </div>
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <button className="relative p-2 text-slate-400 hover:text-[#4ade80] transition-colors rounded-full hover:bg-slate-50 border border-transparent">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 border-l border-slate-200 pl-5 cursor-pointer group">
            <img src={student.avatar} alt="User" className="w-8 h-8 rounded-full border-2 border-slate-100 shadow-sm group-hover:border-[#4ade80] transition-colors object-cover bg-brand-navy" />
            <div className="hidden md:flex flex-col">
              <span className="text-[11px] font-bold text-slate-700 leading-none group-hover:text-[#4ade80] transition-colors uppercase tracking-wider">{student.name}</span>
              <span className="text-[10px] text-slate-400 font-semibold mt-1">{student.classSection}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4ade80] transition-colors ml-1 hidden md:block" />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex w-full pt-16 min-h-screen">
        
        <Sidebar student={student} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 ml-64 w-full flex flex-col">
          {/* Scrollable Content */}
          <div className="p-8 md:p-12 flex flex-col gap-8 w-full">
            
            {/* Main Content Header */}
            <div className="flex flex-col mb-2">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <span className="text-[#4ade80]">
              {activeTab === 'overview' ? <LayoutGridIcon className="w-6 h-6" /> : <HeaderIcon className="w-6 h-6" />}
            </span>
            {headerData.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">{headerData.sub}</p>
        </div>

        {/* Tab Views */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6 w-full animate-fadeIn">
            <ProfileDetails student={student} />
            <QuickCards student={student} />
            <DetailColumns student={student} />
          </div>
        )}

        {activeTab === "academics" && <AcademicsTab />}
        {activeTab === "attendance" && <AttendanceTab />}
        {activeTab === "schedule" && <ScheduleTab />}
        {activeTab === "fees" && <FeesTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Grid Icon to match the top left of "Overview"
function LayoutGridIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
