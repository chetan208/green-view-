'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, Mail, Calendar, Trophy, ExternalLink, School, FileText, BookOpen, Image, LayoutDashboard } from "lucide-react";

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { href: "/admin", label: "Dashboard Home", icon: <LayoutDashboard size={15} /> },
    { href: "/admin/contact", label: "Contact Inquiries", icon: <Mail size={15} /> },
    { href: "/admin/calendar", label: "Manage Calendar", icon: <Calendar size={15} /> },
    { href: "/admin/results", label: "Top Results", icon: <Trophy size={15} /> },
    { href: "/admin/notices", label: "Notices Archive", icon: <FileText size={15} /> },
    { href: "/admin/papers", label: "Study Materials", icon: <BookOpen size={15} /> },
    { href: "/admin/media", label: "Media Gallery", icon: <Image size={15} /> },
    { href: "/admin/admissions", label: "Admissions", icon: <GraduationCap size={15} /> },
  ];

  const checkIsActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin" || pathname === "/admin/";
    return pathname === href;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 flex flex-col lg:flex-row font-sans relative">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-brand-green text-white rounded-full shadow-lg border border-brand-green flex items-center justify-center hover:bg-brand-green-dark transition-all active:scale-95 cursor-pointer"
        aria-label="Toggle Navigation Menu"
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
          <h2 className="text-xl font-bold font-serif tracking-tight text-slate-800">Green View</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green mt-1">Control Panel</p>
        </div>

        <div className="p-5 lg:hidden border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin Menu</span>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)] custom-scrollbar">
          {menuItems.map((item) => {
            const isTabActive = checkIsActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-[13px] font-semibold transition-all border cursor-pointer ${
                  isTabActive 
                    ? "bg-brand-green border-brand-green text-white shadow-sm" 
                    : "text-slate-600 border-transparent bg-transparent hover:bg-brand-green/10 hover:text-brand-green-dark"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ERP Link */}
        <div className="px-4 pb-6 mt-2 absolute bottom-0 w-full bg-white border-t border-slate-100 pt-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 px-0.5 mb-2.5">System</p>
          <a
            href="/erp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-[13px] font-semibold transition-all border cursor-pointer bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white group"
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

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-transparent lg:ml-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20">
          {children}
        </div>
      </main>

    </div>
  );
}
