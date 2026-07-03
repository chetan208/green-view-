"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_EVENTS = [
  { id: 1, title: "Labour Day (Holiday)", dateStr: "2026-05-01" },
  { id: 2, title: "Investiture Ceremony", description: "Ceremony to hand over responsibilities to the newly elected student council.", dateStr: "2026-05-12" },
  { id: 3, title: "Summer Vacation Starts", dateStr: "2026-05-25" },
  { id: 4, title: "World Environment Day", description: "Tree plantation drive in the school campus.", dateStr: "2026-06-05" },
  { id: 5, title: "Summer Vacation", description: "School remains closed for summer holidays.", dateStr: "2026-06-08", endDateStr: "2026-06-13" },
  { id: 6, title: "School Re-opens", dateStr: "2026-06-15" },
  { id: 7, title: "International Yoga Day", dateStr: "2026-06-21" },
  { id: 8, title: "Muharram (Holiday)", dateStr: "2026-06-26" },
  { id: 9, title: "Inter House English Debate", dateStr: "2026-06-27" },
  { id: 10, title: "Van Mahotsav Celebration", dateStr: "2026-07-07" },
  { id: 11, title: "Unit Test-II Begins", dateStr: "2026-07-20" },
  { id: 12, title: "Kargil Vijay Diwas Assembly", dateStr: "2026-07-26" },
];

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

  const currentMonthEvents = useMemo(() => {
    return ALL_EVENTS.filter(e => {
      const start = new Date(e.dateStr);
      const end = e.endDateStr ? new Date(e.endDateStr) : start;
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);
      return start <= monthEnd && end >= monthStart;
    }).map(e => {
      const start = new Date(e.dateStr);
      const end = e.endDateStr ? new Date(e.endDateStr) : start;
      const days = [];
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);
      
      const effectiveStart = start < monthStart ? monthStart : start;
      const effectiveEnd = end > monthEnd ? monthEnd : end;
      
      for (let d = effectiveStart.getDate(); d <= effectiveEnd.getDate(); d++) {
        days.push(d);
      }
      return { ...e, days };
    });
  }, [year, month]);

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

  const getDaysInMonth = (y: number, m: number) => {
    const dayOfFirst = new Date(y, m, 1).getDay(); // 0 = Sun, 1 = Mon...
    const firstDay = dayOfFirst === 0 ? 6 : dayOfFirst - 1; // Start week on Monday!
    const totalDays = new Date(y, m + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  };

  const daysGrid = getDaysInMonth(year, month);

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

  const formatDateDisplay = (dateString: string, endDateString?: string) => {
    const start = new Date(dateString);
    if (isNaN(start.getTime())) return dateString;
    const startStr = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    if (endDateString) {
      const end = new Date(endDateString);
      if (!isNaN(end.getTime())) {
        if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
          return startStr;
        }
        const endStr = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return `${startStr} - ${endStr}`;
      }
    }
    return startStr;
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
          Academic <span className="text-brand-green">Calendar</span>
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
              <span className="text-brand-green">{year}</span>
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
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
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
                {daysGrid.map((dayNum, idx) => {
                  if (dayNum === null) {
                    return <div key={`empty-${idx}`} className="w-9 h-9 md:w-10 md:h-10" />;
                  }

                  const isSelected = selectedDay === dayNum;
                  const hasEvent = currentMonthEvents.some(e => e.days.includes(dayNum));

                  return (
                    <motion.button
                      key={`day-${dayNum}`}
                      onClick={() => setSelectedDay(dayNum)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-semibold md:font-bold text-xs md:text-sm rounded-full transition-colors select-none cursor-pointer border-none ${
                        isSelected
                          ? "bg-brand-green text-white shadow-sm"
                          : hasEvent
                          ? "text-brand-green hover:bg-brand-green/10"
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
            {selectedDay ? `Events on ${monthName} ${selectedDay}` : `All Events in ${monthName}`}
          </h3>
          <div className="w-full h-[2px] bg-brand-green mt-3 mb-6 select-none" />

          {/* Events Scrollable Container with Animating List */}
          <div className="relative overflow-hidden flex-1">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={monthKey + String(selectedDay)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-1.5 scrollbar-thin w-full"
              >
                {currentMonthEvents.filter(e => !selectedDay || e.days.includes(selectedDay)).length > 0 ? (
                  currentMonthEvents
                    .filter(e => !selectedDay || e.days.includes(selectedDay))
                    .map((event, idx) => {
                    const isEventSelected = selectedDay && event.days.includes(selectedDay);
                    return (
                      <motion.div
                        key={event.title + idx}
                        onClick={() => setSelectedDay(event.days[0])}
                        whileHover={{ x: 2 }}
                        className="flex items-start gap-3 transition-all pb-3.5 border-b border-slate-100 last:border-b-0 last:pb-0 cursor-pointer"
                      >
                        <motion.span 
                          animate={isEventSelected ? { scale: [1, 1.25, 1] } : {}}
                          transition={{ repeat: isEventSelected ? Infinity : 0, duration: 1.5 }}
                          className="w-2 h-2 bg-brand-green rounded-full mt-1.5 shrink-0" 
                        />
                        <div className="flex flex-col">
                          <span className={`text-slate-700 text-xs md:text-sm font-semibold md:font-bold tracking-tight transition-colors ${
                            isEventSelected ? "text-brand-green" : "group-hover:text-brand-green"
                          }`}>
                            {event.title}
                          </span>
                          {(event as any).description && (
                            <span className="text-slate-500 text-[10px] md:text-[11px] leading-snug mt-0.5">
                              {(event as any).description}
                            </span>
                          )}
                          <span className="text-slate-400 text-[10px] md:text-[11px] font-medium mt-0.5">
                            {formatDateDisplay(event.dateStr, (event as any).endDateStr)}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-slate-400 text-xs font-normal md:font-semibold text-center py-8 select-none">
                    No events scheduled for this selection.
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
