"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Plus, Trash2, Edit2, X, Loader2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getCalendarEventsApi, 
  createCalendarEventApi, 
  updateCalendarEventApi, 
  deleteCalendarEventApi 
} from "@/lib/api";

interface CalendarEventItem {
  _id?: string;
  id?: number | string;
  title: string;
  description?: string;
  dateStr?: string;
  endDateStr?: string;
  date?: string | Date;
  endDate?: string | Date;
  days?: number[];
}

interface AcademicCalendarComponentProps {
  isAdmin?: boolean;
}

export default function AcademicCalendarComponent({ isAdmin = false }: AcademicCalendarComponentProps) {
  // Always initialize to current system date & current system month
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(() => new Date().getDate());
  const [direction, setDirection] = useState(0);
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Admin Form States
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEventItem | null>(null);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", dateStr: "", endDateStr: "" });

  // Custom Delete Modal State
  const [eventToDelete, setEventToDelete] = useState<CalendarEventItem | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Today's date check
  const today = new Date();
  const isTodayMonth = year === today.getFullYear() && month === today.getMonth();
  const todayDateNum = today.getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month];
  const monthString = String(month + 1).padStart(2, '0');
  const monthKey = `${year}-${monthString}`;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getCalendarEventsApi({ month: month + 1, year });
      if (res && res.events) {
        const mapped = res.events.map((e: any) => ({
          ...e,
          dateStr: e.date ? new Date(e.date).toISOString().split('T')[0] : '',
          endDateStr: e.endDate ? new Date(e.endDate).toISOString().split('T')[0] : ''
        }));
        setEvents(mapped);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Error fetching calendar events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [month, year]);

  const currentMonthEvents = useMemo(() => {
    return events.filter(e => {
      if (!e.dateStr) return false;
      const start = new Date(e.dateStr);
      const end = e.endDateStr ? new Date(e.endDateStr) : start;
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);
      return start <= monthEnd && end >= monthStart;
    }).map(e => {
      const start = new Date(e.dateStr!);
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

  const resetToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(new Date().getDate());
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

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.dateStr) return;
    
    if (newEvent.endDateStr && new Date(newEvent.endDateStr) < new Date(newEvent.dateStr)) {
      alert("End date cannot be before start date.");
      return;
    }
    
    setSubmitting(true);
    try {
      if (editingEvent && editingEvent._id) {
        await updateCalendarEventApi(editingEvent._id, {
          title: newEvent.title,
          description: newEvent.description,
          date: newEvent.dateStr,
          endDate: newEvent.endDateStr || undefined
        });
      } else {
        await createCalendarEventApi({
          title: newEvent.title,
          description: newEvent.description,
          date: newEvent.dateStr,
          endDate: newEvent.endDateStr || undefined
        });
      }

      await fetchEvents();
      setNewEvent({ title: "", description: "", dateStr: "", endDateStr: "" });
      setEditingEvent(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving event:", err);
      alert("Failed to save calendar event");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDeleteEvent = async () => {
    if (!eventToDelete || !eventToDelete._id) return;
    setSubmitting(true);
    try {
      await deleteCalendarEventApi(eventToDelete._id);
      await fetchEvents();
      setEventToDelete(null);
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (evt: CalendarEventItem) => {
    setEditingEvent(evt);
    setNewEvent({
      title: evt.title || "",
      description: evt.description || "",
      dateStr: evt.dateStr || "",
      endDateStr: evt.endDateStr || ""
    });
    setShowForm(true);
  };

  const formatDateDisplay = (dateString?: string, endDateString?: string) => {
    if (!dateString) return "";
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

  const selectedEvents = currentMonthEvents.filter(e => !selectedDay || e.days?.includes(selectedDay));

  return (
    <section className={`w-full ${isAdmin ? 'space-y-6' : 'py-12 md:py-16 px-4 md:px-6 flex flex-col items-center justify-center min-h-[90vh] overflow-hidden'}`}>
      
      {/* Title Header */}
      {isAdmin ? (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Academic Calendar Manager</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">Manage school events, exams, and holiday schedules.</p>
          </div>
          {!showForm && (
            <button 
              onClick={() => {
                const dStr = selectedDay ? String(selectedDay).padStart(2, '0') : '01';
                setEditingEvent(null);
                setNewEvent({ title: "", description: "", dateStr: `${monthKey}-${dStr}`, endDateStr: "" });
                setShowForm(true);
              }}
              className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer"
            >
              <Plus size={16} /> Add Event
            </button>
          )}
        </div>
      ) : (
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
      )}

      {/* Main Calendar Card */}
      <div className={`w-full max-w-6xl bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[480px]`}>
        
        {/* Left Column: Calendar Grid */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col relative z-10">
          
          {/* Navigation Month/Year */}
          <div className="flex items-center justify-between mb-6 select-none border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <button onClick={handlePrevMonth} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer border-0" aria-label="Previous Month">
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <span>{monthName}</span>
                <span className="text-brand-green">{year}</span>
              </h3>

              <button onClick={handleNextMonth} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer border-0" aria-label="Next Month">
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Quick Reset to Today Button */}
            <button
              onClick={resetToToday}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition cursor-pointer flex items-center gap-1 border ${
                isTodayMonth 
                  ? 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100' 
                  : 'text-brand-green bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Sparkles size={12} /> Today: {todayDateNum} {monthNames[today.getMonth()].slice(0, 3)}
            </button>
          </div>

          {/* Weekday Header - Sunday in RED */}
          <div className="grid grid-cols-7 gap-y-4 text-center text-xs md:text-sm font-black text-slate-400 mb-4 select-none uppercase tracking-wider">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span className="text-rose-600 font-extrabold">Sun</span>
          </div>

          {/* Days Grid */}
          <div className="relative overflow-hidden flex-1 min-h-[250px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={monthKey}
                custom={direction}
                variants={gridTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-7 gap-y-3.5 gap-x-2 text-center items-center justify-items-center w-full"
              >
                {daysGrid.map((dayNum, idx) => {
                  if (dayNum === null) return <div key={`empty-${idx}`} className="w-10 h-10 md:w-11 md:h-11" />;

                  const isSelected = selectedDay === dayNum;
                  const isToday = isTodayMonth && dayNum === todayDateNum;
                  
                  const dayOfWeek = new Date(year, month, dayNum).getDay();
                  const isSunday = dayOfWeek === 0;

                  const dayEvents = currentMonthEvents.filter(e => e.days?.includes(dayNum));
                  const hasHolidayEvent = dayEvents.some(e => 
                    (e.title && e.title.toLowerCase().includes('holiday')) || 
                    (e.description && e.description.toLowerCase().includes('holiday')) ||
                    (e.title && e.title.toLowerCase().includes('vacation')) ||
                    (e.title && e.title.toLowerCase().includes('off'))
                  );

                  const isHoliday = isSunday || hasHolidayEvent;
                  const hasEvent = dayEvents.length > 0;
                  const isScheduledEvent = hasEvent && !isHoliday;

                  return (
                    <motion.button
                      key={`day-${dayNum}`}
                      onClick={() => { setSelectedDay(dayNum); if (isAdmin) setShowForm(false); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative w-10 h-10 md:w-11 md:h-11 flex flex-col items-center justify-center font-extrabold text-xs md:text-sm rounded-2xl transition-all select-none cursor-pointer border-none ${
                        isSelected
                          ? "bg-brand-green text-white shadow-lg shadow-emerald-600/30 ring-2 ring-brand-green ring-offset-2"
                          : isToday
                          ? "bg-indigo-600 text-white ring-2 ring-indigo-500 ring-offset-2 shadow-md shadow-indigo-500/20"
                          : isHoliday
                          ? "bg-rose-100/90 text-rose-700 font-black border-2 border-rose-500/80 shadow-sm hover:bg-rose-200"
                          : isScheduledEvent
                          ? "bg-sky-100/90 text-sky-950 font-black border-2 border-sky-500/80 shadow-sm hover:bg-sky-200"
                          : "text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-100"
                      }`}
                    >
                      <span>{dayNum}</span>

                      {hasEvent && !isSelected && (
                        <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${
                          isToday ? 'bg-amber-300' : isHoliday ? 'bg-rose-600' : 'bg-sky-600'
                        }`} />
                      )}

                      {isToday && !isSelected && (
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Color Legend Bar */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold text-slate-500 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-rose-100 border-2 border-rose-500" />
              <span className="text-rose-700">Sunday / Holiday (Red)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-sky-100 border-2 border-sky-500" />
              <span className="text-sky-700">Scheduled Event (Blue)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-indigo-600 ring-2 ring-indigo-400 ring-offset-1" />
              <span>Today&apos;s Date</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-brand-green" />
              <span>Selected Day</span>
            </div>
          </div>
        </div>

        {/* Right Column: Events Panel / Admin Form */}
        <div className="w-full md:w-[380px] lg:w-[420px] bg-slate-50/80 p-6 md:p-8 lg:p-10 border-t md:border-t-0 md:border-l border-slate-200/80 shrink-0 flex flex-col relative justify-start">
          
          {isAdmin && showForm ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-slate-800 text-base md:text-lg tracking-tight">
                  {editingEvent ? "Edit Event" : "Add New Event"}
                </h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-1">
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleSaveEvent} className="flex flex-col gap-4 flex-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Event Title *</label>
                  <input type="text" required value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} placeholder="e.g., Annual Sports Day" className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Description (Optional)</label>
                  <textarea rows={2} value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} placeholder="Short details about the event..." className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition resize-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Start Date *</label>
                  <input type="date" required value={newEvent.dateStr} onChange={(e) => setNewEvent({...newEvent, dateStr: e.target.value})} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">End Date (Optional)</label>
                  <input type="date" value={newEvent.endDateStr} onChange={(e) => setNewEvent({...newEvent, endDateStr: e.target.value})} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                
                <div className="mt-auto pt-6">
                  <button type="submit" disabled={submitting} className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-xl text-sm font-semibold transition shadow-sm border-0 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50">
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : editingEvent ? "Update Event" : "Save Event"}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-800 text-base md:text-lg tracking-tight select-none">
                  {selectedDay ? `Events on ${monthName} ${selectedDay}` : `All Events in ${monthName}`}
                </h3>
                {selectedEvents.length > 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full border border-sky-200">
                    {selectedEvents.length} Event(s)
                  </span>
                )}
              </div>
              <div className="w-full h-[2px] bg-brand-green mt-3 mb-6 select-none" />

              <div className="relative overflow-hidden flex-1">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={monthKey + String(selectedDay)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3.5 overflow-y-auto max-h-[340px] pr-1.5 scrollbar-thin w-full"
                  >
                    {loading ? (
                      <div className="text-slate-400 text-xs text-center py-10 font-medium">
                        Loading academic calendar events...
                      </div>
                    ) : selectedEvents.length > 0 ? (
                      selectedEvents.map((event, idx) => {
                        const isEventSelected = selectedDay && event.days?.includes(selectedDay);
                        const isHolidayEvent = (event.title && event.title.toLowerCase().includes('holiday')) || 
                                               (event.description && event.description.toLowerCase().includes('holiday')) ||
                                               (event.title && event.title.toLowerCase().includes('vacation')) ||
                                               (event.title && event.title.toLowerCase().includes('off'));
                        return (
                          <motion.div
                            key={event.title + idx}
                            onClick={() => setSelectedDay(event.days ? event.days[0] : null)}
                            whileHover={{ x: 3 }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                              isEventSelected
                                ? "bg-white border-brand-green shadow-md shadow-emerald-500/5 ring-1 ring-brand-green/20"
                                : isHolidayEvent
                                ? "bg-white border-rose-200 hover:border-rose-400 shadow-sm"
                                : "bg-white border-sky-200 hover:border-sky-400 shadow-sm"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <span className={`text-xs md:text-sm font-bold tracking-tight transition-colors ${
                                isHolidayEvent ? "text-rose-700" : "text-slate-800"
                              }`}>
                                {event.title}
                              </span>
                              
                              <div className="flex items-center gap-1.5 shrink-0">
                                {isAdmin && (
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); handleEditClick(event); }} className="text-slate-400 hover:text-blue-600 bg-transparent border-0 cursor-pointer p-1"><Edit2 size={13} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); setEventToDelete(event); }} className="text-slate-400 hover:text-rose-600 bg-transparent border-0 cursor-pointer p-1"><Trash2 size={13} /></button>
                                  </div>
                                )}
                                <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-0.5 ${isHolidayEvent ? 'bg-rose-500' : 'bg-sky-500'}`} />
                              </div>
                            </div>
                            {event.description && (
                              <p className="text-slate-600 text-xs leading-relaxed mb-2 font-medium">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                              <CalendarIcon size={12} className={isHolidayEvent ? "text-rose-500" : "text-sky-500"} />
                              <span>{formatDateDisplay(event.dateStr, event.endDateStr)}</span>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                          <CalendarIcon size={20} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Coming Soon</h4>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-[220px]">
                          No events scheduled for {selectedDay ? `${monthName} ${selectedDay}` : `${monthName} ${year}`}.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>
          )}
        </div>

      </div>

      {/* ==================== CUSTOM MODAL: CALENDAR EVENT DELETE CONFIRMATION (ADMIN) ==================== */}
      <AnimatePresence>
        {isAdmin && eventToDelete && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEventToDelete(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 flex flex-col space-y-5"
            >
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-900 text-lg">Delete Calendar Event</h3>
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Confirm Action</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Are you sure you want to delete the calendar event <strong className="text-slate-900 font-bold">&quot;{eventToDelete.title}&quot;</strong>?
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEventToDelete(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={confirmDeleteEvent}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border-0 shadow-sm"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  {submitting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
