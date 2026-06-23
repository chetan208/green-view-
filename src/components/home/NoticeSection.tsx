"use client";

import React from "react";
import Link from "next/link";

export default function BoardNotices() {
  const scrollingNotices = [
    { day: "22", month: "JUN", text: "Admissions Open for Session 2026-27" },
    { day: "22", month: "JUL", text: "Early Bird Registrations End" },
    { day: "22", month: "AUG", text: "Final Application Deadline" },
  ];

  const mainNotices = [
    { id: 1, day: "22", month: "JUN", text: "Admissions Open for Session 2026-27" },
    { id: 2, day: "22", month: "JUN", text: "Admissions Open for Session 2026-27" },
    { id: 3, day: "22", month: "JUN", text: "Admissions Open for Session 2026-27" },
    { id: 4, day: "22", month: "JUN", text: "Admissions Open for Session 2026-27" },
  ];

  // Duplicate scrolling list to ensure a seamless infinite loop
  const doubleScrollingNotices = [...scrollingNotices, ...scrollingNotices, ...scrollingNotices, ...scrollingNotices];

  return (
    <section className="w-full bg-white flex flex-col items-center font-sans">
      
      {/* 1. Top Horizontal Scrolling Marquee Bar */}
      <div className="w-full bg-[#c6eed9] py-3.5 overflow-hidden flex relative border-b border-emerald-100 shadow-sm">
        {/* CSS Keyframe Animation Style */}
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
        
        {/* Scrolling Inner Container */}
        <div className="flex gap-8 whitespace-nowrap animate-marquee-infinite pl-4">
          {doubleScrollingNotices.map((notice, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 bg-white py-1.5 px-4 rounded-xl shadow-sm border border-emerald-50 cursor-pointer hover:border-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-emerald-700">{notice.day}</span>
                <span className="text-[10px] font-black text-emerald-700 uppercase">{notice.month}</span>
              </div>
              <span className="h-3 w-px bg-slate-200" />
              <span className="text-xs font-bold text-slate-700">{notice.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Notice Board Content */}
      <div className="max-w-6xl w-full py-20 px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Headline: Elegant Serif Font matching Mockup */}
        <div className="flex flex-col text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight leading-[1.1] text-center lg:text-left">
          <span className="text-slate-900">OFFICIAL</span>
          <span className="text-[#0fa958] my-1">
            BOARD
          </span>
          <span className="text-slate-900">NOTICES</span>
        </div>

        {/* Right List: Pill-shaped cards */}
        <div className="flex flex-col w-full lg:w-[620px] gap-5 items-center lg:items-start">
          <div className="flex flex-col w-full gap-4">
            {mainNotices.map((notice) => (
              <div
                key={notice.id}
                className="group flex items-center bg-white p-3 px-6 rounded-full border border-slate-100 shadow-md shadow-slate-100/40 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full"
              >
                {/* Date indicator */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-sm font-black text-emerald-700">{notice.day}</span>
                  <span className="text-[10px] font-black text-emerald-700 uppercase">{notice.month}</span>
                </div>
                
                <span className="h-4 w-px bg-slate-200 mx-4 shrink-0" />

                {/* Blinking/Flashing NEW tag + Title */}
                <div className="flex items-center gap-2 overflow-hidden w-full">
                  <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse shrink-0">
                    NEW
                  </span>
                  <p className="text-slate-700 font-bold text-xs md:text-sm group-hover:text-[#0fa958] transition-colors truncate">
                    {notice.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <button className="mt-4 bg-[#0fa958] text-white hover:bg-emerald-700 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30">
            View All Notices
          </button>
        </div>

      </div>

    </section>
  );
}