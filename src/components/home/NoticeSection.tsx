"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Bell, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BoardNotices() {
  const scrollingNotices = [
    "Admissions Open for Session 2026-27 — Register online today!",
    "Hiring started for academic session 2026 — Check careers section",
    "Notice: Mid-term examinations schedule has been uploaded on the portal",
  ];

  // Repeat scrolling notices for infinite seamless effect
  const repeatedScrollNotices = [...scrollingNotices, ...scrollingNotices, ...scrollingNotices];

  const mainNotices = [
    {
      title: "hiring started for the 2026",
      date: "18 Jun 2026",
      isHighlight: true,
    },
    {
      title: "Holiday: holidays",
      date: "18 Jun 2026",
      isHighlight: false,
    },
    {
      title: "Exam: Mid sem exams",
      date: "18 Jun 2026",
      isHighlight: false,
    },
    {
      title: "Admissions Open for Session 2026-27",
      date: "18 Jun 2026",
      isHighlight: false,
    },
  ];

  const stats = [
    { value: "1", label: "URGENT", color: "text-red-500" },
    { value: "9", label: "ACADEMIC", color: "text-emerald-700" },
    { value: "0", label: "CAREERS", color: "text-slate-600" },
  ];

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
          {/* Live indicator badge */}
          <div className="flex items-center gap-1.5 bg-[#0fa958] text-white text-[9px] font-black px-3.5 py-1.5 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span>LIVE</span>
          </div>
          {/* Scrolling Container */}
          <div className="w-full overflow-hidden relative flex">
            <div className="flex gap-16 whitespace-nowrap animate-marquee-infinite text-xs font-bold text-slate-600">
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
            {/* Small Title with Bell icon */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-[10px] md:text-xs tracking-wider uppercase mb-4 justify-center lg:justify-start"
            >
              <Bell className="w-4 h-4 text-emerald-500 fill-emerald-500/10 animate-bounce" />
              Desk Updates
            </motion.div>
            
            {/* Uppercase Serif Heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-black font-serif tracking-wider leading-tight uppercase mb-8 text-slate-800"
            >
              Official <span className="text-[#0fa958]">Board</span> Notices
            </motion.h2>
          </div>

          {/* Counts Cards Grid */}
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
                <span className={`text-2xl font-black ${stat.color}`}>
                  {stat.value}
                </span>
                <span className="text-[8px] font-black text-slate-400 tracking-wider uppercase mt-2">
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
                className={`group flex items-center justify-between bg-white p-4 px-6 rounded-2xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
                  notice.isHighlight
                    ? "border-[#0fa958] shadow-sm shadow-emerald-50"
                    : "border-slate-100 shadow-sm shadow-slate-100/40"
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Flashing tag */}
                  <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse shrink-0">
                    NEW
                  </span>
                  {/* Notice Title */}
                  <p className="text-slate-800 font-bold text-xs md:text-sm group-hover:text-[#0fa958] transition-colors truncate">
                    {notice.title}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 pl-4">
                  {/* Date */}
                  <span className="text-[10px] font-bold text-slate-400">
                    {notice.date}
                  </span>
                  {/* Arrow Indicator */}
                  <ArrowUpRight className="w-4 h-4 text-[#0fa958] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="#all-notices"
              className="mt-2 inline-flex items-center gap-2 bg-[#0a4d2e] hover:bg-emerald-950 text-white py-3.5 px-8 rounded-full text-xs font-black tracking-wide transition-all shadow-md shadow-emerald-900/10 w-full sm:w-auto justify-center"
            >
              View All Board Notices
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
}