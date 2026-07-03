'use client';

import React, { useState } from "react";
import { BarChart3, FileText, BookOpen, Image, Menu, X, GraduationCap, Users, Mail, Calendar, Trophy, ExternalLink, School } from "lucide-react";
import NoticeManager from "./sections/NoticeManager";
import PaperManager from "./sections/PaperManager";
import MediaManager from "./sections/MediaManager";
import AdmissionsManager from "./sections/AdmissionsManager";
import ContactManager from "./sections/ContactManager";
import CalendarManager from "./sections/CalendarManager";
import ResultsManager from "./sections/ResultsManager";

type TabIdType = "notices" | "papers" | "media" | "admissions" | "contact" | "calendar" | "results";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabIdType>("notices");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const TabComponents: Record<TabIdType, React.ReactNode> = {
    notices: <NoticeManager />,
    papers: <PaperManager />,
    media: <MediaManager />,
    admissions: <AdmissionsManager />,
    contact: <ContactManager />,
    calendar: <CalendarManager />,
    results: <ResultsManager />
  };

  const menuItems = [
    { id: "contact", label: "Contact Inquiries", icon: <Mail size={15} /> },
    { id: "calendar", label: "Manage Calendar", icon: <Calendar size={15} /> },
    { id: "results", label: "Top Results", icon: <Trophy size={15} /> },
    { id: "notices", label: "Notices Archive", icon: <FileText size={15} /> },
    { id: "papers", label: "Study Materials", icon: <BookOpen size={15} /> },
    { id: "media", label: "Media Gallery", icon: <Image size={15} /> },
    { id: "admissions", label: "Admissions", icon: <GraduationCap size={15} /> },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 flex flex-col lg:flex-row font-sans relative">
      
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-brand-green text-white rounded-full shadow-lg border border-brand-green flex items-center justify-center hover:bg-brand-green-dark transition-all active:scale-95 cursor-pointer"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Fixed Left Navigation Sidebar Container */}
      <aside className={`
        bg-white border-r border-slate-200 transition-all duration-200 z-40
        fixed inset-y-0 left-0 lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-64 lg:block lg:transform-none lg:opacity-100
        w-64
        ${isSidebarOpen ? "translate-x-0 opacity-100 shadow-xl" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 hidden lg:block border-b border-slate-100">
          <h2 className="text-xl font-black font-serif tracking-tight text-slate-800">Green View</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-green mt-1">Control Panel</p>
        </div>

        <div className="p-5 lg:hidden border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <span className="text-xs font-black uppercase tracking-widest text-slate-500">Admin Menu</span>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)] custom-scrollbar">
          {menuItems.map((item) => {
            const isTabActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as TabIdType); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-[13px] font-bold transition-all border cursor-pointer ${
                  isTabActive 
                    ? "bg-brand-green border-brand-green text-white shadow-sm" 
                    : "text-slate-600 border-transparent bg-transparent hover:bg-brand-green/10 hover:text-brand-green-dark"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ERP Button */}
        <div className="px-4 pb-6 mt-2 absolute bottom-0 w-full bg-white border-t border-slate-100 pt-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-0.5 mb-2.5">System</p>
          <a
            href="/erp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-[13px] font-bold transition-all border cursor-pointer bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white group"
          >
            <School size={16} className="shrink-0" />
            <span className="flex-1">School ERP</span>
            <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
          </a>
        </div>
      </aside>

      {/* Mobile background responsive drawer shade overlay */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden" />
      )}

      {/* Operational Active Target Form Viewport Grid */}
      <main className="flex-1 min-w-0 bg-transparent lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20">
          {TabComponents[activeTab]}
        </div>
      </main>

    </div>
  );
}
