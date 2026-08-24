"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Plus, Trash2, Edit2, X, Loader2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
  hideSeeAllLink?: boolean;
  showDetailedEventsList?: boolean;
}

export default function AcademicCalendarComponent({ 
  isAdmin = false,
  hideSeeAllLink = false,
  showDetailedEventsList = false
}: AcademicCalendarComponentProps) {
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
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[month];
  const monthString = String(month + 1).padStart(2, '0');
  const monthKey = `${year}-${monthString}`;

  // Derived selected date & day name for the Green Panel
  const activeDayNum = selectedDay || (isTodayMonth ? todayDateNum : 1);
  const selectedDateObj = new Date(year, month, activeDayNum);
  const selectedDayName = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' });

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
    const dayOfFirst = new Date(y, m, 1).getDay(); // Sunday = 0, Mon = 1, etc.
    const totalDays = new Date(y, m + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < dayOfFirst; i++) days.push(null);
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
    <section className={`w-full ${isAdmin ? 'space-y-6' : 'py-8 md:py-12 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden'}`}>
      
      {/* Title Header */}
      {isAdmin ? (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-normal font-serif text-slate-900">Academic Calendar Manager</h2>
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
              className="bg-[#0fa958] hover:bg-[#147a42] text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-normal flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer"
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
          className="text-center mb-6 md:mb-8 select-none"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal md:font-bold text-slate-800 tracking-tight leading-tight">
            Academic <span className="text-[#0fa958]">Calendar</span>
          </h2>
        </motion.div>
      )}

      {/* Main Redesigned Calendar Card - Reduced Size by 10% */}
      <div className="w-full max-w-4xl bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[420px]">
        
        {/* Left Column: Clean White Calendar Grid */}
        <div className="flex-1 p-4 sm:p-6 md:p-7 flex flex-col justify-between relative z-10 bg-white">
          
          <div>
            {/* Top Row: Year Switcher & Reset Today */}
            <div className="flex items-center justify-between select-none pb-2">
              <div className="flex items-center gap-2">
                <button onClick={handlePrevMonth} className="p-1 text-slate-400 hover:text-slate-700 bg-transparent border-0 cursor-pointer" aria-label="Previous Month">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-slate-400 tracking-widest">{year}</span>
                <button onClick={handleNextMonth} className="p-1 text-slate-400 hover:text-slate-700 bg-transparent border-0 cursor-pointer" aria-label="Next Month">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={resetToToday}
                className="text-[11px] font-normal text-slate-500 hover:text-[#0fa958] transition cursor-pointer flex items-center gap-1 border-0 bg-transparent"
              >
                <Sparkles size={12} className="text-[#0fa958]" /> Today: {todayDateNum} {monthNames[today.getMonth()].slice(0, 3)}
              </button>
            </div>

            {/* Month Selector Horizontal Pills (Jan..Dec) */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1.5 my-1.5 border-b border-slate-100 select-none">
              {shortMonths.map((mName, idx) => (
                <button
                  key={mName}
                  onClick={() => {
                    setDirection(idx > month ? 1 : -1);
                    setCurrentDate(new Date(year, idx, 1));
                    setSelectedDay(null);
                  }}
                  className={`px-2.5 py-0.5 text-[11px] font-normal rounded-full transition-all cursor-pointer border-0 shrink-0 ${
                    idx === month
                      ? "bg-[#0fa958] text-white shadow-xs font-bold"
                      : "text-slate-400 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {mName}
                </button>
              ))}
            </div>

            {/* Weekday Header */}
            <div className="grid grid-cols-7 gap-y-1.5 text-center text-[11px] font-bold text-slate-400 my-1.5 select-none uppercase tracking-wider">
              <span>SUN</span>
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
            </div>

            {/* Days Grid */}
            <div className="relative overflow-hidden flex-1 min-h-[200px] my-1">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={monthKey}
                  custom={direction}
                  variants={gridTransitionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-7 gap-y-2.5 gap-x-1 text-center items-center justify-items-center w-full"
                >
                  {daysGrid.map((dayNum, idx) => {
                    if (dayNum === null) return <div key={`empty-${idx}`} className="w-7 h-7 sm:w-8 sm:h-8" />;

                    const isSelected = selectedDay === dayNum;
                    const isToday = isTodayMonth && dayNum === todayDateNum;
                    
                    const dayOfWeek = new Date(year, month, dayNum).getDay();
                    const isSunday = dayOfWeek === 0;

                    const dayEvents = currentMonthEvents.filter(e => e.days?.includes(dayNum));
                    const hasHolidayEvent = dayEvents.some(e => 
                      (e.title && (e.title.toLowerCase().includes('holiday') || e.title.toLowerCase().includes('vacation') || e.title.toLowerCase().includes('off') || e.title.toLowerCase().includes('diwali') || e.title.toLowerCase().includes('holi'))) ||
                      (e.description && (e.description.toLowerCase().includes('holiday') || e.description.toLowerCase().includes('vacation') || e.description.toLowerCase().includes('off')))
                    );

                    const isHoliday = isSunday || hasHolidayEvent;
                    const hasEvent = dayEvents.length > 0;
                    const isScheduledEvent = hasEvent && !hasHolidayEvent;

                    return (
                      <motion.button
                        key={`day-${dayNum}`}
                        onClick={() => { setSelectedDay(dayNum); if (isAdmin) setShowForm(false); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center font-bold text-xs rounded-full transition-all select-none cursor-pointer ${
                          isSelected
                            ? "bg-[#0fa958] text-white shadow-md shadow-emerald-600/30 ring-2 ring-[#0fa958] ring-offset-2 border-0"
                            : isToday
                            ? "bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500 font-black border-0"
                            : isHoliday
                            ? "bg-rose-50 text-rose-600 border border-rose-200 font-bold hover:bg-rose-100"
                            : isScheduledEvent
                            ? "bg-sky-50 text-sky-700 border border-sky-200 font-bold hover:bg-sky-100"
                            : "text-slate-700 bg-transparent hover:bg-slate-100 border-0"
                        }`}
                      >
                        <span>{String(dayNum).padStart(2, '0')}</span>

                        {/* Indicator Dot (Only for actual events/holidays) */}
                        {isSelected ? (
                          hasEvent ? <span className="w-1.5 h-1.5 rounded-full absolute -top-0.5 right-1 bg-white" /> : null
                        ) : hasHolidayEvent ? (
                          <span className="w-1.5 h-1.5 rounded-full absolute -top-0.5 right-1 bg-rose-500" />
                        ) : null}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Color Legend Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 text-[11px] font-normal text-slate-600 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-rose-500 bg-rose-50 shrink-0" />
              <span className="text-rose-700 font-normal text-[10.5px]">Sunday / Holiday (Red)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-sky-500 bg-sky-50 shrink-0" />
              <span className="text-sky-700 font-normal text-[10.5px]">Scheduled Event (Blue)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-indigo-500 bg-indigo-50 shrink-0" />
              <span className="text-indigo-700 font-normal text-[10.5px]">Today&apos;s Date</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#0fa958] shrink-0" />
              <span className="text-[#0fa958] font-normal text-[10.5px]">Selected Day</span>
            </div>
          </div>

        </div>

        {/* Right Column: Vibrant Emerald Sidebar */}
        <div className="w-full md:w-[280px] lg:w-[320px] bg-gradient-to-br from-[#0fa958] via-[#10a856] to-[#0c8243] text-white p-5 sm:p-6 lg:p-7 shrink-0 flex flex-col justify-between relative select-none">
          
          {isAdmin && showForm ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col text-slate-800 bg-white p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-normal text-slate-800 text-sm md:text-base tracking-tight">
                  {editingEvent ? "Edit Event" : "Add New Event"}
                </h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-1">
                  <X size={16} />
                </button>
              </div>
              
              <form onSubmit={handleSaveEvent} className="flex flex-col gap-3 flex-1 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Event Title *</label>
                  <input type="text" required value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} placeholder="e.g., Annual Sports Day" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Description</label>
                  <textarea rows={2} value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} placeholder="Short details..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Start Date *</label>
                  <input type="date" required value={newEvent.dateStr} onChange={(e) => setNewEvent({...newEvent, dateStr: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">End Date</label>
                  <input type="date" value={newEvent.endDateStr} onChange={(e) => setNewEvent({...newEvent, endDateStr: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium" />
                </div>
                
                <div className="mt-auto pt-4">
                  <button type="submit" disabled={submitting} className="w-full bg-[#0fa958] hover:bg-[#147a42] text-white py-2.5 rounded-lg text-xs font-normal transition shadow-sm border-0 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50">
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : editingEvent ? "Update Event" : "Save Event"}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <>
              {/* Top: Large Prominent Date & Short Month Name */}
              <div className="flex flex-col mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight">
                    {String(activeDayNum).padStart(2, '0')}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold uppercase opacity-90 tracking-wider">
                    {shortMonths[month]}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mt-1.5 opacity-95">
                  {selectedDayName}
                </span>
              </div>

              {/* Middle: Current Events Section */}
              <div className="flex-1 flex flex-col my-3">
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-90">
                    Current Events
                  </span>
                  {selectedEvents.length > 0 && (
                    <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-bold">
                      {selectedEvents.length}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[190px] pr-1 no-scrollbar">
                  {loading ? (
                    <p className="text-xs opacity-80 py-3">Loading calendar events...</p>
                  ) : selectedEvents.length > 0 ? (
                    selectedEvents.map((evt, idx) => {
                      const isHolidayEvt = (evt.title && (evt.title.toLowerCase().includes('holiday') || evt.title.toLowerCase().includes('vacation') || evt.title.toLowerCase().includes('off'))) ||
                                           (evt.description && (evt.description.toLowerCase().includes('holiday') || evt.description.toLowerCase().includes('vacation') || evt.description.toLowerCase().includes('off')));
                      return (
                        <div key={idx} className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${isHolidayEvt ? 'bg-rose-400' : 'bg-sky-300'}`} />
                              <span className="text-xs font-bold text-white tracking-tight">{evt.title}</span>
                            </div>
                            {isAdmin && (
                              <div className="flex gap-1">
                                <button onClick={() => handleEditClick(evt)} className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer p-0.5"><Edit2 size={12} /></button>
                                <button onClick={() => setEventToDelete(evt)} className="text-white/80 hover:text-rose-200 bg-transparent border-0 cursor-pointer p-0.5"><Trash2 size={12} /></button>
                              </div>
                            )}
                          </div>
                          {evt.description && (
                            <p className="text-[11px] text-emerald-100 opacity-90 pl-3.5 leading-snug">{evt.description}</p>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs opacity-80 py-3 font-medium italic">
                      No events for {selectedDay ? `${monthName} ${selectedDay}` : monthName}.
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom: Action Link (Hidden when hideSeeAllLink is true) */}
              {(!hideSeeAllLink || isAdmin) && (
                <div className="pt-3 border-t border-white/20 flex justify-between items-center text-xs font-normal">
                  {!hideSeeAllLink && (
                    <Link href="/academics/calendar" className="text-white hover:underline flex items-center gap-1">
                      See all events →
                    </Link>
                  )}
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        const dStr = selectedDay ? String(selectedDay).padStart(2, '0') : '01';
                        setEditingEvent(null);
                        setNewEvent({ title: "", description: "", dateStr: `${monthKey}-${dStr}`, endDateStr: "" });
                        setShowForm(true);
                      }}
                      className="bg-white text-emerald-900 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-50 transition cursor-pointer border-0 ml-auto"
                    >
                      + Add Event
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* Detailed Events List Below Calendar (for Academic Calendar Page) */}
      {showDetailedEventsList && (
        <div className="w-full max-w-4xl mt-10 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 pb-4 gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                All Events for {monthName} {year}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                Detailed schedule of holidays, celebrations, exams, and activities from the backend database.
              </p>
            </div>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full border border-emerald-200/80 w-max shrink-0">
              {currentMonthEvents.length} Event(s)
            </span>
          </div>

          {loading ? (
            <div className="w-full py-12 flex items-center justify-center text-slate-400 text-sm font-medium">
              <Loader2 className="w-5 h-5 animate-spin text-[#0fa958] mr-2" /> Loading calendar events...
            </div>
          ) : currentMonthEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {currentMonthEvents.map((evt, idx) => {
                const isHolidayEvt = (evt.title && (evt.title.toLowerCase().includes('holiday') || evt.title.toLowerCase().includes('vacation') || evt.title.toLowerCase().includes('off'))) ||
                                     (evt.description && (evt.description.toLowerCase().includes('holiday') || evt.description.toLowerCase().includes('vacation') || evt.description.toLowerCase().includes('off')));
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isHolidayEvt 
                            ? "bg-rose-50 text-rose-700 border border-rose-200" 
                            : "bg-sky-50 text-sky-700 border border-sky-200"
                        }`}>
                          {isHolidayEvt ? "Holiday" : "Scheduled Event"}
                        </span>
                        
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                          <CalendarIcon size={13} className={isHolidayEvt ? "text-rose-500" : "text-sky-500"} />
                          {formatDateDisplay(evt.dateStr, evt.endDateStr)}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {evt.title}
                      </h4>

                      {evt.description ? (
                        <p className="text-xs text-slate-600 font-normal leading-relaxed">
                          {evt.description}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic font-normal">
                          No additional details provided.
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <CalendarIcon className="w-10 h-10 text-slate-300 mb-2" />
              <h4 className="text-sm font-bold text-slate-700">No Events Scheduled</h4>
              <p className="text-xs text-slate-400 mt-1 font-normal">There are no events listed for {monthName} {year} in the database.</p>
            </div>
          )}
        </div>
      )}

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
                  <span className="text-xs font-normal text-rose-600 uppercase tracking-wider">Confirm Action</span>
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
