"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EventItem {
  day: number;
  title: string;
  dateStr: string;
}

const EVENTS_DATABASE: Record<string, EventItem[]> = {
  "2026-05": [
    { day: 1, title: "Labour Day (Holiday)", dateStr: "May 1, 2026" },
    { day: 12, title: "Investiture Ceremony", dateStr: "May 12, 2026" },
    { day: 25, title: "Summer Vacation Starts", dateStr: "May 25, 2026" },
  ],
  "2026-06": [
    { day: 5, title: "World Environment Day", dateStr: "June 5, 2026" },
    { day: 13, title: "Summer Vacation Ends", dateStr: "June 13, 2026" },
    { day: 15, title: "School Re-opens", dateStr: "June 15, 2026" },
    { day: 21, title: "International Yoga Day", dateStr: "June 21, 2026" },
    { day: 26, title: "Muharram (Holiday)", dateStr: "June 26, 2026" },
    { day: 27, title: "Inter House English Debate", dateStr: "June 27, 2026" },
  ],
  "2026-07": [
    { day: 7, title: "Van Mahotsav Celebration", dateStr: "July 7, 2026" },
    { day: 20, title: "Unit Test-II Begins", dateStr: "July 20, 2026" },
    { day: 26, title: "Kargil Vijay Diwas Assembly", dateStr: "July 26, 2026" },
  ],
};

export default function CalendarMonthView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 13)); // Default to June 13, 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(13); // Default June 13 selected
  const [direction, setDirection] = useState(0); // Navigation direction indicator

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month];
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const currentEvents = EVENTS_DATABASE[monthKey] || [];

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(prev => {
      const d = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      setSelectedDay(null);
      return d;
    });
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(prev => {
      const d = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      setSelectedDay(null);
      return d;
    });
  };

  // Helper to generate calendar days for the current month
  const getDaysInMonth = (y: number, m: number) => {
    const dayOfFirst = new Date(y, m, 1).getDay(); // 0 = Sun, 1 = Mon...
    const firstDay = dayOfFirst === 0 ? 6 : dayOfFirst - 1; // Start week on Monday!
    const totalDays = new Date(y, m + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    
    // Add empty slots for days of previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add actual days of the current month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = getDaysInMonth(year, month);

  const gridTransitionVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as const }
    })
  };

  return (
    <section className="w-full pt-6 pb-12 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Main Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl bg-white border border-[#3b82f6]/20 rounded-3xl overflow-hidden shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] flex flex-col md:flex-row"
      >
        
        {/* Left Column: Calendar Panel */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col">
          
          {/* Navigation Month/Year */}
          <div className="flex items-center gap-3 mb-8 select-none">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevMonth} 
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors p-2"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex-1 text-center flex items-center justify-center gap-2">
              <span>{monthName}</span>
              <span className="text-brand-green">{year}</span>
            </h2>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth} 
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors p-2"
              aria-label="Next Month"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 text-center text-xs md:text-sm font-bold text-slate-400 mb-6 select-none">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>

          <div className="relative overflow-hidden min-h-[260px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={monthKey}
                custom={direction}
                variants={gridTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-7 gap-y-4 gap-x-2 text-center items-center justify-items-center w-full"
              >
                {days.map((dayNum, idx) => {
                  if (dayNum === null) return <div key={`empty-${idx}`} className="w-10 h-10 md:w-12 md:h-12" />;

                  const isSelected = selectedDay === dayNum;
                  const hasEvent = currentEvents.some(e => e.day === dayNum);

                  return (
                    <motion.button
                      key={`day-${dayNum}`}
                      onClick={() => setSelectedDay(dayNum)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center font-bold text-sm rounded-full transition-colors select-none ${
                        isSelected
                          ? "bg-brand-green text-white shadow-md shadow-emerald-500/20"
                          : hasEvent
                          ? "text-brand-green hover:bg-brand-green/10 bg-emerald-50/50"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {dayNum}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full md:w-[380px] lg:w-[420px] bg-slate-50/80 p-6 md:p-8 border-t md:border-t-0 md:border-l border-slate-100 shrink-0 flex flex-col justify-start">
          
          <div className="flex items-center gap-2 mt-4 md:mt-6 border-b border-slate-100 pb-3">
            <span className="w-2 h-6 bg-brand-green rounded-full inline-block"></span>
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base tracking-tight uppercase">Monthly Events</h3>
          </div>

          <div className="relative overflow-hidden flex-1 mt-6">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={monthKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2 scrollbar-thin w-full"
              >
                {currentEvents.length > 0 ? (
                  currentEvents.map((event) => {
                    const isEventSelected = selectedDay === event.day;
                    return (
                      <motion.div
                        key={event.title}
                        onClick={() => setSelectedDay(event.day)}
                        whileHover={{ x: 3 }}
                        className={`flex items-start gap-4 cursor-pointer group transition-all p-4 rounded-2xl border ${
                          isEventSelected ? "bg-white border-emerald-100 shadow-sm" : "bg-transparent border-transparent hover:bg-white hover:border-slate-100"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors font-bold text-sm ${
                          isEventSelected ? "bg-brand-green text-white" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-brand-green"
                        }`}>
                          {event.day}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className={`text-xs md:text-sm font-extrabold transition-colors leading-snug ${
                            isEventSelected ? "text-slate-900" : "text-slate-700 group-hover:text-brand-green"
                          }`}>
                            {event.title}
                          </h4>
                          <span className="text-slate-500 text-xs font-medium mt-1">
                            {event.dateStr}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-slate-400 text-sm font-medium text-center py-12 select-none flex flex-col items-center justify-center gap-3">
                    <span className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                    No events scheduled for this month.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </motion.div>

    </section>
  );
}
