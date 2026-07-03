'use client';

import React, { useState, useMemo } from "react";
import { Plus, Trash2, Calendar, Edit2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarManager() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 13)); // Default to June 2026 for demo
  const [selectedDay, setSelectedDay] = useState<number | null>(13);
  const [direction, setDirection] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Use YYYY-MM-DD for easier parsing and matching
  const [events, setEvents] = useState([
    { id: 1, title: "World Environment Day", description: "Special assembly to celebrate our planet.", dateStr: "2026-06-05" },
    { id: 2, title: "Summer Vacation", description: "School remains closed for summer holidays.", dateStr: "2026-06-08", endDateStr: "2026-06-13" },
    { id: 3, title: "School Re-opens", description: "Regular classes resume.", dateStr: "2026-06-15" },
  ]);

  const [newEvent, setNewEvent] = useState({ title: "", description: "", dateStr: "", endDateStr: "" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month];
  
  const monthString = String(month + 1).padStart(2, '0');
  const monthKey = `${year}-${monthString}`;

  // Filter events for current month and compute active days
  const currentMonthEvents = useMemo(() => {
    return events.filter(e => {
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
  }, [events, year, month]);

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
    const dayOfFirst = new Date(y, m, 1).getDay();
    const firstDay = dayOfFirst === 0 ? 6 : dayOfFirst - 1;
    const totalDays = new Date(y, m + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);
    
    return days;
  };

  const daysGrid = getDaysInMonth(year, month);

  const gridTransitionVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } })
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.dateStr) return;
    
    // Validate dates
    if (newEvent.endDateStr && new Date(newEvent.endDateStr) < new Date(newEvent.dateStr)) {
      alert("End date cannot be before start date.");
      return;
    }
    
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    setNewEvent({ title: "", description: "", dateStr: "", endDateStr: "" });
    setShowForm(false);
    
    const [y, m, d] = newEvent.dateStr.split('-');
    setCurrentDate(new Date(parseInt(y), parseInt(m) - 1, parseInt(d)));
    setSelectedDay(parseInt(d));
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const formatDateDisplay = (dateString: string, endDateString?: string) => {
    const start = new Date(dateString);
    if (isNaN(start.getTime())) return dateString;
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (endDateString) {
      const end = new Date(endDateString);
      if (!isNaN(end.getTime())) {
        if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
          return `${startStr}, ${start.getFullYear()}`;
        }
        const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${startStr} - ${endStr}, ${end.getFullYear()}`;
      }
    }
    return `${startStr}, ${start.getFullYear()}`;
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">Academic Calendar</h2>
        {!showForm && (
          <button 
            onClick={() => {
              const dStr = selectedDay ? String(selectedDay).padStart(2, '0') : '01';
              setNewEvent({ title: "", description: "", dateStr: `${monthKey}-${dStr}`, endDateStr: "" });
              setShowForm(true);
            }}
            className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add Event
          </button>
        )}
      </div>

      <div className="w-full bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[480px]">
        
        {/* Left Column: Calendar Grid */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col relative z-10">
          <div className="flex items-center gap-3 mb-6 select-none">
            <button onClick={handlePrevMonth} className="text-slate-400 hover:text-slate-600 transition-colors p-1 bg-transparent border-none cursor-pointer">
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <h3 className="text-base md:text-lg font-semibold md:font-extrabold text-slate-700 tracking-tight flex items-center gap-1.5 w-32 justify-center">
              <span className="font-normal md:font-semibold text-slate-800">{monthName}</span>
              <span className="text-brand-green">{year}</span>
            </h3>
            <button onClick={handleNextMonth} className="text-slate-400 hover:text-slate-600 transition-colors p-1 bg-transparent border-none cursor-pointer">
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 text-center text-xs md:text-sm font-semibold md:font-bold text-slate-400 mb-4 select-none">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>

          <div className="relative overflow-hidden flex-1 min-h-[260px]">
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
                  if (dayNum === null) return <div key={`empty-${idx}`} className="w-9 h-9 md:w-10 md:h-10" />;

                  const isSelected = selectedDay === dayNum;
                  const hasEvent = currentMonthEvents.some(e => e.days.includes(dayNum));

                  return (
                    <motion.button
                      key={`day-${dayNum}`}
                      onClick={() => { setSelectedDay(dayNum); setShowForm(false); }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-semibold md:font-bold text-xs md:text-sm rounded-full transition-colors select-none cursor-pointer border-none ${
                        isSelected
                          ? "bg-brand-green text-white shadow-sm"
                          : hasEvent
                          ? "bg-emerald-50 text-brand-green border border-emerald-100"
                          : "text-slate-700 hover:bg-slate-100 bg-transparent"
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

        {/* Right Column: Events / Form Panel */}
        <div className="w-full md:w-[360px] lg:w-[400px] bg-slate-50 p-6 md:p-8 lg:p-10 border-t md:border-t-0 md:border-l border-slate-200 shrink-0 flex flex-col relative">
          
          {showForm ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold md:font-bold text-slate-800 text-base md:text-lg tracking-tight">Add New Event</h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-1">
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleSaveEvent} className="flex flex-col gap-4 flex-1">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Event Title *</label>
                  <input type="text" required value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} placeholder="e.g., Annual Sports Day" className="w-full px-3 py-2 bg-white border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Description (Optional)</label>
                  <textarea rows={2} value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} placeholder="Short details about the event..." className="w-full px-3 py-2 bg-white border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition resize-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Start Date *</label>
                  <input type="date" required value={newEvent.dateStr} onChange={(e) => setNewEvent({...newEvent, dateStr: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">End Date (Optional)</label>
                  <input type="date" value={newEvent.endDateStr} onChange={(e) => setNewEvent({...newEvent, endDateStr: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                
                <div className="mt-auto pt-6">
                  <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-2.5 rounded-lg text-sm font-bold transition shadow-sm border-0 cursor-pointer">
                    Save Event
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
              <h3 className="font-semibold md:font-bold text-slate-800 text-base md:text-lg tracking-tight select-none">
                {selectedDay ? `Events on ${monthName} ${selectedDay}` : `All Events in ${monthName}`}
              </h3>
              <div className="w-full h-[2px] bg-brand-green/20 mt-3 mb-5 select-none" />

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                {currentMonthEvents.filter(e => !selectedDay || e.days.includes(selectedDay)).length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {currentMonthEvents
                      .filter(e => !selectedDay || e.days.includes(selectedDay))
                      .map((evt) => (
                      <div key={evt.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm group">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-slate-800 leading-tight pr-4">{evt.title}</h4>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button className="text-slate-400 hover:text-blue-600 bg-transparent border-0 cursor-pointer p-1"><Edit2 size={13} /></button>
                            <button onClick={() => handleDelete(evt.id)} className="text-slate-400 hover:text-rose-600 bg-transparent border-0 cursor-pointer p-1"><Trash2 size={13} /></button>
                          </div>
                        </div>
                        {evt.description && (
                          <p className="text-xs text-slate-500 mb-2 mt-1 leading-relaxed">{evt.description}</p>
                        )}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-2">
                          <Calendar size={12} className="text-emerald-500 shrink-0" />
                          <span className="leading-tight">{formatDateDisplay(evt.dateStr, evt.endDateStr)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <Calendar size={32} className="text-slate-200 mb-3" />
                    <p className="text-sm font-medium text-slate-400">No events found for this selection.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
