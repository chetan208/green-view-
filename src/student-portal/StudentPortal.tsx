"use client";

import React, { useState } from "react";
import { LayoutGrid, GraduationCap, Calendar, Clock, CreditCard, Bell, Settings, Search, ChevronDown } from "lucide-react";
import AcademicsTab from "./tabs/AcademicsTab";
import AttendanceTab from "./tabs/AttendanceTab";
import FeesTab from "./tabs/FeesTab";
import ScheduleTab from "./tabs/ScheduleTab";
import NoticesTab from "./tabs/NoticesTab";
import SettingsTab from "./tabs/SettingsTab";
import Sidebar, { TabType } from "./components/Sidebar";

import QuickCards from "./components/overview/QuickCards";
import ProfileDetails from "./components/overview/ProfileDetails";
import DetailColumns from "./components/overview/DetailColumns";

// Static dummy student data matching Rahul Sharma
const DUMMY_STUDENT = {
  name: "Rahul Sharma",
  hindiName: "राहुल शर्मा",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120", // high-quality headshot
  classSection: "Class 12th",
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const student = DUMMY_STUDENT;

  // Header configuration for each tab
  const getTabHeader = () => {
    switch(activeTab) {
      case "overview": 
        return { 
          title: "Overview", 
          icon: LayoutGrid, 
          sub: "Your complete student profile and quick stats",
          breadcrumb: "Overview"
        };
      case "academics": 
        return { 
          title: "Academics",  
          icon: GraduationCap, 
          sub: "",
          breadcrumb: "Academics"
        };
      case "attendance": 
        return { 
          title: "Attendance", 
          icon: Calendar, 
          sub: "", // empty in screenshot
          breadcrumb: "Fees" // Wait, in screenshot breadcrumb says "Fees" on Attendance tab! We can keep it or correct it. Let's show "Fees" as in image or "Attendance". Let's show "Fees" to match image exactly! Actually, the image says "Student Portal > Fees" in the breadcrumbs of both Attendance and Fees. We can just use "Fees" to match the images exactly! Or wait, let's use the tab name, but let's make it look authentic. Let's make it dynamic but match the image exactly! In Image 1, Selected Tab = Attendance, Title = Attendance, Breadcrumb = Student Portal > Fees. In Image 3, Selected Tab = Fees, Title = Fees, Breadcrumb = Student Portal > Fees. In Image 4, Selected Tab = Settings, Title = Portal Settings, Breadcrumb = Student Portal > Settings. In Image 5, Selected Tab = Overview, Title = Overview, Breadcrumb = Student Portal > Fees (wait, yes! It says Fees in overview too!). That's an interesting quirk of the Figma design. Let's make it dynamic to be clean, or use "Fees" if it's Attendance/Fees/Overview, but dynamic is better engineering. Let's match the screenshot's text!
        };
      case "timetable": 
        return { 
          title: "Timetable", 
          icon: Clock, 
          sub: "Daily class schedule and periods",
          breadcrumb: "Timetable"
        };
      case "fees": 
        return { 
          title: "Fees", 
          icon: CreditCard, 
          sub: "", // empty in screenshot
          breadcrumb: "Fees"
        };
      case "notices": 
        return { 
          title: "Notices & Announcements", 
          icon: Bell, 
          sub: "Stay updated with school events, exams, and circulars",
          breadcrumb: "Notices"
        };
      case "settings": 
        return { 
          title: "Portal Settings", 
          icon: Settings, 
          sub: "Manage your account preferences and portal configuration.",
          breadcrumb: "Settings"
        };
    }
  };

  const headerData = getTabHeader();
  const HeaderIcon = headerData.icon;

  // Dynamic Breadcrumb resolver
  const getBreadcrumbName = () => {
    switch (activeTab) {
      case "overview": return "Overview";
      case "academics": return "Academics";
      case "attendance": return "Attendance";
      case "timetable": return "Timetable";
      case "fees": return "Fees";
      case "notices": return "Notices";
      case "settings": return "Settings";
      default: return "";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FF] flex flex-col font-sans">
      
      {/* Global Portal Top Header */}
      <header className="fixed top-0 left-0 w-full h-16 z-50 bg-white border-b border-slate-200 px-6 flex items-center justify-between select-none">
        
        {/* Left: Branding & Breadcrumbs */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-[19px] text-[#121c28] tracking-tight">Student Portal</span>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-550 hover:text-slate-900 transition ml-1 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <span className="text-slate-400">Student Portal</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="text-[#006a37] font-bold">{getBreadcrumbName()}</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex items-center flex-1 justify-center px-10">
          <div className="relative w-full max-w-lg select-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Portal" 
              className="w-full pl-11 pr-5 py-2.5 bg-white border border-slate-200 rounded-full text-[13px] font-medium outline-none focus:border-[#006a37] focus:ring-1 focus:ring-[#006a37] transition-all text-slate-800 placeholder-slate-400" 
            />
          </div>
        </div>
        
        {/* Right Icons & Profile */}
        <div className="flex items-center gap-6">
          {/* Notification Bell */}
          <button className="relative p-2 text-slate-650 hover:text-[#006a37] transition rounded-full hover:bg-slate-50 border border-transparent cursor-pointer">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group select-none">
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-slate-800 leading-none group-hover:text-[#006a37] transition-colors">{student.name}</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1">{student.classSection}</span>
            </div>
            <img 
              src={student.avatar} 
              alt="User Profile" 
              className="w-9 h-9 rounded-full border border-slate-200 shadow-sm object-cover" 
            />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex w-full pt-16 min-h-screen">
        
        <Sidebar student={student} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

        <div className={`flex-1 w-full flex flex-col bg-[#F8F9FF] transition-all duration-300 ${
          isCollapsed ? "ml-[72px]" : "ml-[240px]"
        }`}>
          {/* Scrollable Content */}
          <div className="p-8 flex flex-col gap-6 w-full max-w-[1240px] mx-auto">
            
            {/* Main Content Header */}
            <div className="flex items-center gap-4 mb-2 select-none">
              {/* Green Icon Box (Only if not settings tab) */}
              {activeTab !== "settings" ? (
                <div className="w-10 h-10 rounded-lg bg-[#E6F4EA] flex items-center justify-center text-[#006a37]">
                  <HeaderIcon className="w-5.5 h-5.5 stroke-[2.2]" />
                </div>
              ) : null}

              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-slate-900 leading-none">
                  {headerData.title}
                </h1>
                {headerData.sub && (
                  <p className="text-sm text-slate-500 mt-1.5 font-medium">{headerData.sub}</p>
                )}
              </div>
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
            {activeTab === "timetable" && <ScheduleTab />}
            {activeTab === "fees" && <FeesTab />}
            {activeTab === "notices" && <NoticesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
