"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  { date: "01 April 2026", title: "New Academic Session Begins", category: "Term", time: "08:00 AM", desc: "Orientation day and beginning of classes for the new term." },
  { date: "15 May 2026", title: "First Periodic Assessments", category: "Exams", time: "08:30 AM", desc: "Periodic examinations for classes I to XII." },
  { date: "01 June 2026", title: "Summer Vacation Starts", category: "Holidays", time: "Full Day", desc: "School closes for summer break. Classes resume in mid-July." },
  { date: "15 August 2026", title: "Independence Day Celebration", category: "Events", time: "09:00 AM", desc: "Flag hoisting ceremony, patriotic speeches, and cultural performances." },
  { date: "05 September 2026", title: "Teachers' Day Event", category: "Events", time: "10:00 AM", desc: "Special assembly organized by senior students to honor teachers." },
  { date: "20 September 2026", title: "Half Yearly Examination", category: "Exams", time: "08:30 AM", desc: "Half-yearly examinations commence for all grade levels." },
  { date: "24 October 2026", title: "Diwali Festivities & Holidays", category: "Holidays", time: "Multi-Day", desc: "School closed for Diwali festival celebration." },
  { date: "14 November 2026", title: "Annual Sports Day Meet", category: "Events", time: "08:00 AM", desc: "Track and field events, inter-house sports competitions, and awards." },
];

export default function CalendarGrid() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "Term", "Exams", "Holidays", "Events"];

  const filteredEvents = activeTab === "All" 
    ? events 
    : events.filter(ev => ev.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col gap-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${
              activeTab === cat
                ? "bg-brand-green text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-4">
        {filteredEvents.map((ev, index) => {
          const dateParts = ev.date.split(" ");
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white rounded-2xl border border-slate-100 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Date Box */}
                <div className="w-24 bg-emerald-50 text-brand-green font-bold p-3 rounded-xl flex flex-col items-center justify-center text-center shrink-0 border border-emerald-100/50">
                  <span className="text-[9px] uppercase tracking-wider mb-0.5 leading-none">Date</span>
                  <span className="text-xs font-extrabold leading-normal whitespace-nowrap">{dateParts[0]} {dateParts[1]}</span>
                  <span className="text-[9px] text-emerald-600 font-extrabold mt-0.5 leading-none">{dateParts[2]}</span>
                </div>
                
                {/* Details */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      ev.category === "Exams" ? "bg-red-50 text-red-600 border border-red-100/50" :
                      ev.category === "Holidays" ? "bg-amber-50 text-amber-600 border border-amber-100/50" :
                      ev.category === "Events" ? "bg-blue-50 text-blue-600 border border-blue-100/50" :
                      "bg-emerald-50 text-emerald-600 border border-emerald-100/50"
                    }`}>
                      {ev.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Clock className="w-3 h-3" /> {ev.time}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-sm md:text-base group-hover:text-brand-green transition-colors leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm font-medium mt-1 leading-relaxed max-w-xl">
                    {ev.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
