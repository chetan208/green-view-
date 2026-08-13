"use client";

import React, { useState, useEffect } from "react";
import { Bell, User, Clock, FileText, CheckCircle2, ChevronRight, AlertCircle, Info } from "lucide-react";
import { format } from "date-fns";

const fallbackNotices = [
  {
    _id: "1",
    title: "Summer Vacation Announcement",
    description: "The school will remain closed for summer vacation from June 1st to July 10th. Holiday homework has been assigned.",
    category: "Holiday",
    priority: "High",
    date: new Date().toISOString()
  },
  {
    _id: "2",
    title: "PTM Scheduled for Class 10",
    description: "Parent Teacher Meeting for Class 10 will be held on Saturday between 9:00 AM and 1:00 PM.",
    category: "Event",
    priority: "Normal",
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: "3",
    title: "Fee Payment Reminder",
    description: "Please pay the 2nd installment of the school fees before the 15th of this month to avoid late fines.",
    category: "Alert",
    priority: "High",
    date: new Date(Date.now() - 172800000).toISOString()
  }
];

export default function DashboardScreen() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/notices`);
        const data = await res.json();
        if (data.success && data.notices.length > 0) {
          setNotices(data.notices.slice(0, 3));
        } else {
          setNotices(fallbackNotices);
        }
      } catch (err) {
        console.error("Failed to fetch notices:", err);
        setNotices(fallbackNotices);
      } finally {
        setLoadingNotices(false);
      }
    };
    fetchNotices();
  }, []);
  return (
    <div className="flex flex-col w-full h-full pb-20 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E6F4EA]">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm text-slate-500 font-medium leading-tight">Good morning,</h2>
            <h1 className="text-base font-bold text-[#121c28] leading-tight">Rahul Sharma</h1>
          </div>
        </div>
        <button className="relative p-2 rounded-full hover:bg-slate-50 transition">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        {/* Recent Notices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-[#121c28]">Latest Updates & Notices</h2>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {loadingNotices ? (
              <div className="p-6 text-center text-xs text-slate-500 flex flex-col items-center">
                <div className="w-5 h-5 border-2 border-brand-green border-t-transparent rounded-full animate-spin mb-2"></div>
                Loading updates...
              </div>
            ) : notices.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {notices.map((notice) => (
                  <div key={notice._id} className="p-4 flex gap-3 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-brand-green-dark" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          notice.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {notice.category || 'Update'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {format(new Date(notice.date), "dd MMM")}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1 truncate">{notice.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{notice.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 flex flex-col items-center">
                <Info className="w-6 h-6 text-slate-300 mb-2" />
                No recent notices available.
              </div>
            )}
          </div>
        </div>

        {/* Today's Schedule */}
        <div>
          <h2 className="text-[15px] font-bold text-[#121c28] mb-3">Today's Classes</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#006a37] mb-1 z-10" />
                <div className="w-0.5 h-full bg-slate-100" />
              </div>
              <div className="flex-1 pb-4">
                <p className="text-xs font-semibold text-[#006a37]">08:00 AM - 08:45 AM</p>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">Physics (Theory)</h4>
                <p className="text-xs text-slate-500 mt-1">Mr. R.K. Sharma • Room 302</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mb-1 z-10" />
                <div className="w-0.5 h-full bg-slate-100 hidden" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-500">08:50 AM - 09:35 AM</p>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">Chemistry (Practical)</h4>
                <p className="text-xs text-slate-500 mt-1">Mrs. S. Gupta • Lab 2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Homework/Alerts */}
        <div>
          <h2 className="text-[15px] font-bold text-[#121c28] mb-3">Pending Homework</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold rounded-md mb-2">DUE TOMORROW</span>
                <h4 className="text-sm font-bold text-slate-900">Mathematics</h4>
                <p className="text-xs text-slate-500 mt-1">Complete exercises 5.1 and 5.2 from NCERT book.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
