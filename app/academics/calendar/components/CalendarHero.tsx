"use client";

import React from "react";
import Link from "next/link";

export default function CalendarHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-6 md:pb-8 flex flex-col gap-4">
      <div className="text-sm font-medium text-slate-500">
        <Link href="/" className="text-brand-green hover:underline">Home</Link> / <span className="text-slate-400">Academics</span> / <span>Academic Calendar</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
        Academic <span className="text-brand-green-dark">Calendar</span>
      </h1>
      <p className="text-slate-500 font-medium text-xs md:text-sm max-w-2xl leading-relaxed">
        Plan ahead with our term schedule, exam dates, vacation periods, and school events for the academic year 2026-27.
      </p>
    </div>
  );
}
