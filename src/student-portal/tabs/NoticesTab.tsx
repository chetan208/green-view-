"use client";

import React, { useState } from "react";
import { Search, Calendar, Tag, FileText, ArrowRight, X, Info, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notice {
  id: string;
  title: string;
  category: "Exam" | "Fees" | "Event" | "Academic";
  date: string;
  description: string;
  detail: string;
  important: boolean;
  postedBy: string;
}

const DUMMY_NOTICES: Notice[] = [
  {
    id: "1",
    title: "Half-Yearly Examination Schedule",
    category: "Exam",
    date: "01 Jul 2026",
    description: "Half-yearly examinations will commence from August 10, 2026. Admit cards will be issued from August 1.",
    detail: "Dear Students and Parents, the Half-Yearly Examinations for classes VI to XII are scheduled from August 10, 2026 to August 24, 2026. The detailed date sheet has been uploaded to the Academics section. Admit cards will be distributed by class teachers starting August 1, 2026, subject to the clearance of outstanding fees. For any queries, contact the examination controller.",
    important: true,
    postedBy: "Dr. Rajesh K. (Exam Controller)"
  },
  {
    id: "2",
    title: "Fee Payment Reminder",
    category: "Fees",
    date: "28 Jun 2026",
    description: "Quarterly fee payment is due by July 31, 2026. Late payment will incur a fine of ₹50 per day.",
    detail: "Dear Parents, this is a friendly reminder that school fees for Quarter 2 (July - September 2026) are due by July 31, 2026. Payments can be made online via the Student Portal Fee Tab or by cash/cheque at the school bank counter. A late fee of ₹50 per day will be applicable for payments received after the due date. Thank you for your cooperation.",
    important: true,
    postedBy: "Administration Desk"
  },
  {
    id: "3",
    title: "Annual Sports Day",
    category: "Event",
    date: "20 Jun 2026",
    description: "Annual Sports Day will be celebrated on August 15, 2026. Students interested in participating should register with the PTI.",
    detail: "Green View School is celebrating its 40th Annual Sports Day on Independence Day, August 15, 2026. Various track and field events, inter-house matches, and march-past drills will be organized. Students wishing to participate must submit their names to Mr. P.S. Negi (PTI) by July 15, 2026. Parents are cordially invited to attend and cheer for the houses.",
    important: false,
    postedBy: "Mr. P.S. Negi (PTI)"
  },
  {
    id: "4",
    title: "Inter-School Science Exhibition",
    category: "Event",
    date: "15 Jun 2026",
    description: "Our school will host the District Science Exhibition on July 25. Selected models will represent our school.",
    detail: "We are proud to host the District-level Science and Robotics Exhibition on July 25, 2026. More than 20 schools are expected to participate. Students of classes IX-XII can submit their project synopses to their respective science teachers by July 10. Selected projects will be funded by the school for final model development.",
    important: false,
    postedBy: "Science Department"
  },
  {
    id: "5",
    title: "Summer Vacation Circular",
    category: "Academic",
    date: "01 Jun 2026",
    description: "School will remain closed for summer vacation from June 8 to July 5. School reopens on July 6.",
    detail: "This is to inform all parents and students that the school will close for summer holidays from Monday, June 8, 2026, and reopen on Monday, July 6, 2026. Holiday homework and project guidelines have been distributed by the class teachers. We wish all students a happy and productive summer break. Keep reading and practicing!",
    important: false,
    postedBy: "Office of the Principal"
  }
];

export default function NoticesTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const categories = ["All", "Exam", "Fees", "Event", "Academic"];

  const filteredNotices = DUMMY_NOTICES.filter((notice) => {
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Exam":
        return "bg-indigo-50/60 text-indigo-700 border-indigo-100/50";
      case "Fees":
        return "bg-rose-50/60 text-rose-700 border-rose-100/50";
      case "Event":
        return "bg-emerald-50/60 text-emerald-700 border-emerald-100/50";
      case "Academic":
        return "bg-amber-50/60 text-amber-700 border-amber-100/50";
      default:
        return "bg-slate-50 text-slate-655 border-slate-100/50";
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-fadeIn pb-10 select-none">
      
      {/* Top filter area */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] shrink-0">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs font-semibold bg-slate-50/50 border border-slate-200 rounded-lg outline-none focus:border-brand-green/40 focus:ring-1 focus:ring-brand-green/5 transition-all text-slate-750"
          />
        </div>

        {/* Categories Tab selector */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 data-[active=true]:bg-slate-850 data-[active=true]:text-white data-[active=true]:shadow-xs"
              data-active={selectedCategory === cat}
            >
              {cat === "All" ? "All Notices" : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Grid */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
          <Megaphone className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-xs font-semibold">No notices found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:border-slate-300 hover:bg-slate-50/10 transition-all duration-200 relative group"
            >
              {notice.important && (
                <div className="absolute top-0 right-4 -translate-y-1/2 bg-rose-500 text-white text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Important
                </div>
              )}
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-md border ${getCategoryStyles(notice.category)}`}>
                    {notice.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-405" /> {notice.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-snug group-hover:text-brand-green transition-colors">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <button
                onClick={() => setActiveNotice(notice)}
                className="mt-4 w-full py-2 rounded-lg border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-600 text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer font-sans"
              >
                <span>Read Full Announcement</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {activeNotice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveNotice(null)}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs"
            />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-5 flex flex-col gap-5 relative z-10 overflow-hidden"
            >
              {/* Header category and close */}
              <div className="flex justify-between items-center">
                <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase rounded-md border ${getCategoryStyles(activeNotice.category)}`}>
                  {activeNotice.category} Announcement
                </span>
                <button
                  onClick={() => setActiveNotice(null)}
                  className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold text-slate-800 tracking-tight leading-snug">
                  {activeNotice.title}
                </h2>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold border-b border-slate-100 pb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Posted: {activeNotice.date}</span>
                  <span>•</span>
                  <span>By: {activeNotice.postedBy}</span>
                </div>
              </div>

              {/* Detail Content */}
              <div className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/50 border border-slate-150 rounded-lg p-4">
                {activeNotice.detail}
              </div>

              {/* Note / Signoff */}
              <div className="flex items-start gap-2 text-[10px] text-slate-400 font-semibold bg-emerald-50/10 border border-emerald-100/10 rounded-lg p-3">
                <Info className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                <p className="leading-normal">This is an official administrative notice. For further details, please reach out to the {activeNotice.postedBy}.</p>
              </div>

              {/* Action */}
              <button
                onClick={() => setActiveNotice(null)}
                className="w-full py-2.5 bg-brand-green hover:bg-emerald-700 text-white rounded-lg text-xs font-bold tracking-wide transition shadow-xs cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
