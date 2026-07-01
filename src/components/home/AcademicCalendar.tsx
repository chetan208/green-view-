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

export default function AcademicCalendar() {
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
    <section className="w-full py-12 md:py-16 px-4 md:px-6  flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8 md:mb-10 select-none"
      >
        <h2 className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-800 tracking-tight leading-tight">
          Academic <span className="text-[#0fa958]">Calendar</span>
        </h2>
      </motion.div>
 
      {/* Main Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl bg-white border border-[#3b82f6]/25 rounded-[28px] overflow-hidden shadow-sm flex flex-col md:flex-row"
      >
        
        {/* Left Column: Calendar Panel */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col">
          
          {/* Navigation Month/Year */}
          <div className="flex items-center gap-3 mb-6 select-none">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevMonth} 
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
            <h3 className="text-base md:text-lg font-semibold md:font-extrabold text-slate-700 tracking-tight flex items-center gap-1.5 w-32">
              <span className="font-normal md:font-semibold text-slate-800">{monthName}</span>
              <span className="text-[#0fa958]">{year}</span>
            </h3>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth} 
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-y-4 text-center text-xs md:text-sm font-semibold md:font-bold text-slate-400 mb-4 select-none">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>

          {/* Days Grid with Slide Transition */}
          <div className="relative overflow-hidden min-h-[220px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={monthKey}
                custom={direction}
                variants={gridTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-7 gap-y-3 gap-x-1.5 text-center items-center justify-items-center w-full"
              >
                {days.map((dayNum, idx) => {
                  if (dayNum === null) {
                    return <div key={`empty-${idx}`} className="w-9 h-9 md:w-10 md:h-10" />;
                  }

                  const isSelected = selectedDay === dayNum;
                  const hasEvent = currentEvents.some(e => e.day === dayNum);

                  return (
                    <motion.button
                      key={`day-${dayNum}`}
                      onClick={() => setSelectedDay(dayNum)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-semibold md:font-bold text-xs md:text-sm rounded-full transition-colors select-none ${
                        isSelected
                          ? "bg-[#0fa958] text-white shadow-sm"
                          : hasEvent
                          ? "text-[#0fa958] hover:bg-[#0fa958]/10"
                          : "text-slate-700 hover:bg-slate-100"
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

        {/* Right Column: Events Panel */}
        <div className="w-full md:w-[360px] lg:w-[400px] bg-slate-50/50 p-6 md:p-8 lg:p-10 border-t md:border-t-0 md:border-l border-slate-200/80 shrink-0 flex flex-col justify-start">
          
          <h3 className="font-semibold md:font-bold text-slate-800 text-base md:text-lg tracking-tight select-none">
            Events
          </h3>
          <div className="w-full h-[2px] bg-[#0fa958] mt-3 mb-6 select-none" />

          {/* Events Scrollable Container with Animating List */}
          <div className="relative overflow-hidden flex-1">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={monthKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-1.5 scrollbar-thin w-full"
              >
                {currentEvents.length > 0 ? (
                  currentEvents.map((event, idx) => {
                    const isEventSelected = selectedDay === event.day;
                    return (
                      <motion.div
                        key={event.title}
                        onClick={() => setSelectedDay(event.day)}
                        whileHover={{ x: 2 }}
                        className="flex items-start gap-3 cursor-pointer group transition-all pb-3.5 border-b border-slate-100 last:border-b-0 last:pb-0"
                      >
                        {/* Green Dot bullet */}
                        <motion.span 
                          animate={isEventSelected ? { scale: [1, 1.25, 1] } : {}}
                          transition={{ repeat: isEventSelected ? Infinity : 0, duration: 1.5 }}
                          className="w-2 h-2 bg-[#0fa958] rounded-full mt-1.5 shrink-0" 
                        />
                        <div className="flex flex-col">
                          <span className={`text-slate-700 text-xs md:text-sm font-semibold md:font-bold tracking-tight transition-colors ${
                            isEventSelected ? "text-[#0fa958]" : "group-hover:text-[#0fa958]"
                          }`}>
                            {event.title}
                          </span>
                          <span className="text-slate-400 text-[10px] md:text-[11px] font-medium mt-0.5">
                            {event.dateStr}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-slate-400 text-xs font-normal md:font-semibold text-center py-8 select-none">
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

