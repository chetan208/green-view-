"use client";

import React, { useState, useEffect } from "react";
import { Search, Clock, ShieldAlert, ShieldCheck, Briefcase, X, FileText, Download, ArrowUpRight, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getNoticesApi } from "@/lib/api";

interface Notice {
  id: string | number;
  date: string;
  category: "Academic" | "Urgent" | "Careers" | "General";
  title: string;
  desc: string;
  details?: string;
  isNew: boolean;
  hasAttachment?: boolean;
  documentUrl?: string;
}

export default function NoticesList() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Urgent", "Academic", "Careers"];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getNoticesApi()
      .then(res => {
        if (isMounted && res && res.notices) {
          const mapped: Notice[] = res.notices.map((n: any) => ({
            id: n._id,
            title: n.title,
            desc: n.description || "",
            details: n.description || "",
            date: n.createdAt ? new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
            category: (n.category as any) || 'Academic',
            isNew: true,
            hasAttachment: !!n.documentUrl,
            documentUrl: n.documentUrl
          }));
          setNotices(mapped);
        }
      })
      .catch((err) => {
        console.error("Error fetching notices:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = activeTab === "All" || notice.category === activeTab;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat: Notice["category"]) => {
    switch (cat) {
      case "Academic":
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-medium md:font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-brand-navy/15 bg-brand-navy/5 text-brand-navy select-none shrink-0">
            <ShieldCheck className="w-3 h-3 text-brand-navy/70 stroke-[2.5]" /> Academic
          </span>
        );
      case "Urgent":
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-medium md:font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-rose-200 bg-rose-50 text-rose-600 select-none shrink-0">
            <ShieldAlert className="w-3 h-3 text-rose-500/70 stroke-[2.5]" /> Urgent
          </span>
        );
      case "Careers":
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-medium md:font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-brand-green/20 bg-brand-green/5 text-brand-green select-none shrink-0">
            <Briefcase className="w-3 h-3 text-brand-green/70 stroke-[2.5]" /> Careers
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-medium md:font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-600 select-none shrink-0">
            General
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col gap-6">
      
      {/* Search & Tabs Controls - Inline Single Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        {/* Category Tabs */}
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full font-medium md:font-semibold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeTab === cat
                  ? "bg-brand-green text-white shadow-md shadow-emerald-500/10"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs md:text-sm font-normal md:font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Notices Strip List */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl text-slate-400 text-xs font-medium">
            Loading official notices...
          </div>
        ) : filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="group bg-white border border-slate-100 rounded-xl p-3 md:p-4 flex flex-row items-center justify-between gap-4 hover:border-brand-green/30 hover:shadow-[0_4px_15px_-5px_rgba(0,0,0,0.02)] transition-all duration-200 cursor-pointer min-w-0 w-full"
            >
              {/* Left Column: Badge, Title & New Tag */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {getCategoryBadge(notice.category)}
                
                <h3 className="font-medium md:font-semibold text-slate-850 text-xs md:text-sm truncate group-hover:text-brand-green transition-colors">
                  {notice.title}
                </h3>

                {notice.isNew && (
                  <span className="text-[8px] font-medium md:font-semibold text-brand-green bg-brand-green/5 border border-brand-green/10 px-1.5 py-0.5 rounded select-none shrink-0">
                    • NEW
                  </span>
                )}
              </div>

              {/* Right Column: Date & View Action */}
              <div className="flex items-center gap-4 md:gap-5 shrink-0 justify-end text-[10px] md:text-xs">
                <span className="flex items-center gap-1.5 font-medium md:font-semibold text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-300 stroke-[2]" />
                  {notice.date}
                </span>

                <span className="text-brand-green font-medium md:font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mb-1">
              <Bell className="w-6 h-6 text-slate-300" />
            </div>
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">No Official Notices</h4>
            <span className="text-slate-400 text-xs font-normal md:font-medium">
              There are no notices published matching your selection right now.
            </span>
          </div>
        )}
      </div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
              className="fixed inset-0 bg-slate-900 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-xl w-full shadow-2xl relative z-10 flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  {getCategoryBadge(selectedNotice.category)}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-400 font-medium md:font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-300" /> Circular Date: {selectedNotice.date}
                    </span>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="w-8 h-8 rounded-full bg-slate-150 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer border-transparent shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Body */}
              <div className="flex flex-col gap-3.5">
                <h3 className="font-medium md:font-semibold text-slate-900 text-base md:text-lg leading-snug">
                  {selectedNotice.title}
                </h3>
                {selectedNotice.desc && (
                  <p className="text-slate-650 text-xs md:text-sm font-normal md:font-medium leading-relaxed">
                    {selectedNotice.desc}
                  </p>
                )}
              </div>

              {/* Footer / Attachments */}
              {selectedNotice.hasAttachment && selectedNotice.documentUrl && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50/30 border border-emerald-100/30 rounded-2xl p-4 mt-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-green" />
                    <span className="text-xs font-medium md:font-semibold text-slate-700">Official Document</span>
                  </div>
                  <a
                    href={selectedNotice.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand-green text-white hover:bg-brand-green-dark px-4 py-2 rounded-xl text-xs font-medium md:font-semibold transition-all cursor-pointer shadow-sm shadow-emerald-500/10 border-transparent"
                  >
                    <Download className="w-3.5 h-3.5" /> View / Download Document
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
