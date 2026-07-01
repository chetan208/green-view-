"use client";

import React, { useState } from "react";
import { Search, Clock, ShieldAlert, ShieldCheck, Briefcase, X, FileText, Download, ArrowUpRight, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notice {
  id: number;
  date: string;
  category: "Academic" | "Urgent" | "Careers" | "General";
  title: string;
  desc: string;
  details: string;
  isNew: boolean;
  hasAttachment?: boolean;
}

const dummyNotices: Notice[] = [
  {
    id: 1,
    date: "25 Jun 2026",
    category: "Academic",
    title: "Holiday: The school will remain closed on 29th June",
    desc: "The school will remain closed on Monday, 29th June on account of the state gazetted holiday. Normal classes will resume on Tuesday.",
    details: "All scheduled examinations, online classes, and parent-teacher interactive meets stand postponed to July 2nd. School transport services will not operate on this day.",
    isNew: true,
    hasAttachment: true
  },
  {
    id: 2,
    date: "18 Jun 2026",
    category: "Urgent",
    title: "hiring started for the 2026 session recruitment drive",
    desc: "Teacher recruitment drives are officially open for senior secondary English, Physics, and Chemistry positions for the 2026-27 term.",
    details: "Candidates are requested to submit their updated resumes at careers@greenview.edu.in. Shortlisted candidates will be notified for offline interviews within a week.",
    isNew: true,
    hasAttachment: false
  },
  {
    id: 3,
    date: "18 Jun 2026",
    category: "Academic",
    title: "Holiday: summer holidays calendar updates",
    desc: "Summer vacations duration has been updated. The revised calendar has been approved by the school education board.",
    details: "The summer break will conclude on June 30, and regular classes will start from July 1, 2026. The principal's advisory on uniforms must be strictly adhered to.",
    isNew: true,
    hasAttachment: true
  },
  {
    id: 4,
    date: "18 Jun 2026",
    category: "Academic",
    title: "Exam: Mid sem exams schedules released for Classes V to XII",
    desc: "Detailed schedules for Mid Semester Examinations have been finalized and are available for download.",
    details: "Students must maintain 75% attendance to qualify for the exams. Admit cards will be distributed from the administrative wing starting July 10.",
    isNew: true,
    hasAttachment: false
  },
  {
    id: 5,
    date: "18 Jun 2026",
    category: "Academic",
    title: "Admissions Open for Session 2026-27 - Limited Seats",
    desc: "Registration portal is open for nursery to primary grade levels. Admissions are based on seat availability.",
    details: "Documents required: Birth certificate, Aadhaar card copy, past year report card (if applicable), and 4 passport-size photographs of the candidate.",
    isNew: true,
    hasAttachment: true
  },
  {
    id: 6,
    date: "18 Jun 2026",
    category: "Academic",
    title: "Holiday: sadflka local festival circular",
    desc: "Notice regarding regional holidays scheduled in late June for cultural celebrations.",
    details: "The administration has announced a local holiday. The non-teaching departments will function during shortened office timings (09:00 AM to 01:00 PM).",
    isNew: false,
    hasAttachment: false
  },
  {
    id: 7,
    date: "17 Jun 2026",
    category: "Academic",
    title: "Admissions Closed for Session 2026-27 High School Streams",
    desc: "Admission admissions for classes IX and X have officially concluded for the active academic cycle.",
    details: "No further applications or requests for direct transfer will be processed for middle school levels. Admission to higher grades remains open.",
    isNew: false,
    hasAttachment: false
  },
  {
    id: 8,
    date: "17 Jun 2026",
    category: "Academic",
    title: "Holiday: Mahavir Jayanti gazetted circular",
    desc: "School will observe holiday on Mahavir Jayanti as per the standard HPBOSE notification logs.",
    details: "All classes, laboratories, and physical education clubs will remain non-operational. Bus drivers have been notified to cease routing.",
    isNew: false,
    hasAttachment: false
  },
  {
    id: 9,
    date: "17 Jun 2026",
    category: "Academic",
    title: "Admissions Open for Session 2026-27 Senior Secondary Streams",
    desc: "Registration remains open for Medical, Non-Medical, and Commerce streams in Class XI.",
    details: "Eligible candidates must produce board marks sheets and school leaving certificates during the counseling session at school desk.",
    isNew: false,
    hasAttachment: true
  }
];

export default function NoticesList() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const categories = ["All", "Urgent", "Academic", "Careers"];

  const filteredNotices = dummyNotices.filter(notice => {
    const matchesCategory = activeTab === "All" || notice.category === activeTab;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat: Notice["category"]) => {
    switch (cat) {
      case "Academic":
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold md:font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-brand-navy/15 bg-brand-navy/5 text-brand-navy select-none shrink-0">
            <ShieldCheck className="w-3 h-3 text-brand-navy/70 stroke-[2.5]" /> Academic
          </span>
        );
      case "Urgent":
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold md:font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-rose-200 bg-rose-50 text-rose-600 select-none shrink-0">
            <ShieldAlert className="w-3 h-3 text-rose-500/70 stroke-[2.5]" /> Urgent
          </span>
        );
      case "Careers":
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold md:font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-brand-green/20 bg-brand-green/5 text-brand-green select-none shrink-0">
            <Briefcase className="w-3 h-3 text-brand-green/70 stroke-[2.5]" /> Careers
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold md:font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-600 select-none shrink-0">
            General
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col gap-6">
      
      {/* Search & Tabs Controls - Inline Single Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        {/* Category Tabs */}
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full font-semibold md:font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeTab === cat
                  ? "bg-brand-green text-white shadow-md shadow-emerald-500/10"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs md:text-sm font-normal md:font-semibold focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Notices Strip List */}
      <div className="flex flex-col gap-3">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="group bg-white border border-slate-100 rounded-xl p-3 md:p-4 flex flex-row items-center justify-between gap-4 hover:border-brand-green/30 hover:shadow-[0_4px_15px_-5px_rgba(0,0,0,0.02)] transition-all duration-200 cursor-pointer min-w-0 w-full"
            >
              {/* Left Column: Badge, Title & New Tag */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {getCategoryBadge(notice.category)}
                
                <h3 className="font-semibold md:font-bold text-slate-850 text-xs md:text-sm truncate group-hover:text-brand-green transition-colors">
                  {notice.title}
                </h3>

                {notice.isNew && (
                  <span className="text-[8px] font-semibold md:font-bold text-brand-green bg-brand-green/5 border border-brand-green/10 px-1.5 py-0.5 rounded select-none shrink-0">
                    • NEW
                  </span>
                )}
              </div>

              {/* Right Column: Date & View Action */}
              <div className="flex items-center gap-4 md:gap-5 shrink-0 justify-end text-[10px] md:text-xs">
                <span className="flex items-center gap-1.5 font-semibold md:font-bold text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-300 stroke-[2]" />
                  {notice.date}
                </span>

                <span className="text-brand-green font-semibold md:font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-3">
            <Bell className="w-10 h-10 text-slate-300" />
            <span className="text-slate-400 text-sm font-normal md:font-semibold">No notices match your search criteria.</span>
          </div>
        )}
      </div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
              className="fixed inset-0 bg-slate-900 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-xl w-full shadow-2xl relative z-10 flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  {getCategoryBadge(selectedNotice.category)}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-400 font-semibold md:font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-300" /> Circular Date: {selectedNotice.date}
                    </span>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="w-8 h-8 rounded-full bg-slate-150 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer border-transparent shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Body */}
              <div className="flex flex-col gap-3.5">
                <h3 className="font-semibold md:font-bold text-slate-900 text-base md:text-lg leading-snug">
                  {selectedNotice.title}
                </h3>
                <p className="text-slate-650 text-xs md:text-sm font-normal md:font-semibold leading-relaxed">
                  {selectedNotice.desc}
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-800 text-xs md:text-sm font-semibold md:font-bold leading-relaxed">
                  {selectedNotice.details}
                </div>
              </div>

              {/* Footer / Attachments */}
              {selectedNotice.hasAttachment && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50/30 border border-emerald-100/30 rounded-2xl p-4 mt-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-green" />
                    <span className="text-xs font-semibold md:font-bold text-slate-700">Official_Circular_{selectedNotice.id}.pdf</span>
                  </div>
                  <button
                    onClick={() => alert(`Downloading Circular PDF for Notice ID: ${selectedNotice.id}`)}
                    className="inline-flex items-center gap-1.5 bg-brand-green text-white hover:bg-brand-green-dark px-4 py-2 rounded-xl text-xs font-semibold md:font-bold transition-all cursor-pointer shadow-sm shadow-emerald-500/10 border-transparent"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Circular
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
