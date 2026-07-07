"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bell, ArrowRight, X, FileText, Download, Clock, ShieldAlert, ShieldCheck, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BoardNotices() {
  const [selectedNotice, setSelectedNotice] = useState<any>(null);

  const scrollingNotices = [
    "Admissions Open for Session 2026-27 — Register online today!",
    "Hiring started for academic session 2026 — Check careers section",
    "Notice: Mid-term examinations schedule has been uploaded on the portal",
  ];

  // Repeat scrolling notices for infinite seamless effect
  const repeatedScrollNotices = [...scrollingNotices, ...scrollingNotices, ...scrollingNotices];

  const mainNotices = [
    {
      id: 2,
      title: "hiring started for the 2026 session recruitment drive",
      date: "18 Jun 2026",
      category: "Urgent",
      desc: "Teacher recruitment drives are officially open for senior secondary English, Physics, and Chemistry positions for the 2026-27 term.",
      details: "Candidates are requested to submit their updated resumes at careers@greenview.edu.in. Shortlisted candidates will be notified for offline interviews within a week.",
      isNew: true,
      hasAttachment: true,
      isHighlight: true,
    },
    {
      id: 3,
      title: "Holiday: summer holidays calendar updates",
      date: "18 Jun 2026",
      category: "Academic",
      desc: "Summer vacations duration has been updated. The revised calendar has been approved by the school education board.",
      details: "The summer break will conclude on June 30, and regular classes will start from July 1, 2026. The principal's advisory on uniforms must be strictly adhered to.",
      isNew: true,
      hasAttachment: true,
      isHighlight: false,
    },
    {
      id: 4,
      title: "Exam: Mid sem exams schedules released for Classes V to XII",
      date: "18 Jun 2026",
      category: "Academic",
      desc: "Detailed schedules for Mid Semester Examinations have been finalized and are available for download.",
      details: "Students must maintain 75% attendance to qualify for the exams. Admit cards will be distributed from the administrative wing starting July 10.",
      isNew: true,
      hasAttachment: true,
      isHighlight: false,
    },
    {
      id: 5,
      title: "Admissions Open for Session 2026-27 - Limited Seats",
      date: "18 Jun 2026",
      category: "Academic",
      desc: "Registration portal is open for nursery to primary grade levels. Admissions are based on seat availability.",
      details: "Documents required: Birth certificate, Aadhaar card copy, past year report card (if applicable), and 4 passport-size photographs of the candidate.",
      isNew: true,
      hasAttachment: true,
      isHighlight: false,
    },
  ];

  const stats = [
    { value: "1", label: "URGENT", color: "text-red-500" },
    { value: "9", label: "ACADEMIC", color: "text-emerald-700" },
    { value: "0", label: "CAREERS", color: "text-slate-600" },
  ];

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "Academic":
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold md:font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-800/15 bg-slate-800/5 text-slate-800 select-none shrink-0">
            <ShieldCheck className="w-3 h-3 text-slate-800/70 stroke-[2.5]" /> Academic
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
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold md:font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-emerald-600/20 bg-emerald-600/5 text-emerald-600 select-none shrink-0">
            <Briefcase className="w-3 h-3 text-emerald-600/70 stroke-[2.5]" /> Careers
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

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -35 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 35 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <section className="w-full py-16 md:py-20 px-6 bg-slate-50/50 flex flex-col items-center font-sans overflow-hidden">
      
      {/* CSS Animation Keyframes for Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-infinite {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* 1. Top Horizontal Scrolling Live Notice Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl mb-12"
      >
        <div className="bg-white border border-slate-100 shadow-sm rounded-full p-2.5 px-6 flex items-center overflow-hidden gap-4">
          <div className="flex items-center gap-1.5 bg-brand-green text-white text-[9px] font-semibold md:font-black px-3.5 py-1.5 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span>LIVE</span>
          </div>
          <div className="w-full overflow-hidden relative flex">
            <div className="flex gap-16 whitespace-nowrap animate-marquee-infinite text-xs font-semibold md:font-bold text-slate-600">
              {repeatedScrollNotices.map((text, idx) => (
                <span key={idx} className="hover:text-emerald-600 cursor-pointer transition-colors">
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Main Notice Board Content */}
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16">
        
        {/* Left Column: Heading & Count Cards */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={leftColumnVariants}
          className="flex-1 flex flex-col justify-between items-center lg:items-start text-center lg:text-left py-2"
        >
          
          <div className="flex flex-col">
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-1.5 text-emerald-600 font-semibold md:font-extrabold text-[10px] md:text-xs tracking-wider uppercase mb-4 justify-center lg:justify-start"
            >
              <Bell className="w-4 h-4 text-emerald-500 fill-emerald-500/10 animate-bounce" />
              Desk Updates
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-semibold md:font-black font-serif tracking-wider leading-tight uppercase mb-8 text-slate-800"
            >
              Official <span className="text-brand-green">Board</span> Notices
            </motion.h2>
          </div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4 mt-4 lg:mt-0"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 w-24 flex flex-col items-center justify-center cursor-default select-none"
              >
                <span className={`text-2xl font-semibold md:font-black ${stat.color}`}>
                  {stat.value}
                </span>
                <span className="text-[8px] font-semibold md:font-black text-slate-400 tracking-wider uppercase mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Notice Lists & View Button */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={rightColumnVariants}
          className="flex-[1.5] flex flex-col items-center lg:items-start gap-6 w-full"
        >
          <div className="flex flex-col w-full gap-4">
            {mainNotices.map((notice, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.005 }}
                onClick={() => setSelectedNotice(notice)}
                className={`group flex items-center justify-between bg-white p-4 px-6 rounded-2xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
                  notice.isHighlight
                    ? "border-brand-green shadow-sm shadow-emerald-50"
                    : "border-slate-100 shadow-sm shadow-slate-100/40"
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="bg-red-500 text-white text-[8px] font-semibold md:font-bold px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse shrink-0">
                    NEW
                  </span>
                  <p className="text-slate-800 font-medium md:font-semibold text-xs md:text-sm group-hover:text-brand-green transition-colors truncate">
                    {notice.title}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 pl-4">
                  <span className="text-[10px] font-semibold md:font-bold text-slate-400">
                    {notice.date}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-brand-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/notices"
              className="mt-2 inline-flex items-center gap-2 bg-[#0B9E50] hover:bg-[#4fe29d] text-white py-3.5 px-8 rounded-full text-xs font-medium md:font-bold tracking-wide transition-all shadow-md shadow-emerald-900/10 w-full sm:w-auto justify-center"
            >
              View All Board Notices
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
              className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-xl w-full shadow-2xl relative z-[101] flex flex-col gap-5"
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
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer border-transparent shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Body */}
              <div className="flex flex-col gap-3.5">
                <h3 className="font-semibold md:font-bold text-slate-900 text-base md:text-lg leading-snug">
                  {selectedNotice.title}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm font-normal md:font-semibold leading-relaxed">
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
                    className="inline-flex items-center gap-1.5 bg-brand-green text-white hover:bg-emerald-700 px-4 py-2 rounded-xl text-xs font-semibold md:font-bold transition-all cursor-pointer shadow-sm shadow-emerald-500/10 border-transparent"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Circular
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
