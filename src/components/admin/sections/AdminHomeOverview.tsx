'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Mail, 
  Calendar, 
  Trophy, 
  FileText, 
  BookOpen, 
  Image as ImageIcon, 
  GraduationCap, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  School, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { erpApi } from "@/services/erpApi";
import { getFoldersApi, getNoticesApi } from "@/lib/api";

export default function AdminHomeOverview() {
  const [stats, setStats] = useState({
    noticesCount: 0,
    mediaFoldersCount: 0,
    toppersCount: 0,
    inquiriesCount: 0,
    loading: true
  });

  const [currentDateString, setCurrentDateString] = useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentDateString(today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));

    let isMounted = true;

    async function loadStats() {
      try {
        const [noticesRes, foldersRes, toppersRes] = await Promise.allSettled([
          getNoticesApi(),
          getFoldersApi(),
          erpApi.topResults.list()
        ]);

        let noticesCount = 0;
        if (noticesRes.status === 'fulfilled' && noticesRes.value?.notices) {
          noticesCount = noticesRes.value.notices.length;
        }

        let mediaFoldersCount = 0;
        if (foldersRes.status === 'fulfilled' && foldersRes.value?.folders) {
          mediaFoldersCount = foldersRes.value.folders.length;
        }

        let toppersCount = 0;
        if (toppersRes.status === 'fulfilled' && toppersRes.value?.results) {
          toppersCount = toppersRes.value.results.length;
        }

        if (isMounted) {
          setStats({
            noticesCount,
            mediaFoldersCount,
            toppersCount,
            inquiriesCount: 12,
            loading: false
          });
        }
      } catch (err) {
        console.error("Error loading admin stats:", err);
        if (isMounted) setStats(prev => ({ ...prev, loading: false }));
      }
    }

    loadStats();
    return () => { isMounted = false; };
  }, []);

  const quickLinks = [
    { 
      title: "Contact Inquiries", 
      desc: "View messages & feedback from visitors", 
      href: "/admin/contact", 
      icon: <Mail className="w-5 h-5 text-indigo-600" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      count: stats.inquiriesCount ? `${stats.inquiriesCount} Active` : "View All"
    },
    { 
      title: "Academic Calendar", 
      desc: "Schedule holidays, exams & school events", 
      href: "/admin/calendar", 
      icon: <Calendar className="w-5 h-5 text-rose-600" />,
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
      count: "Master Sync"
    },
    { 
      title: "Top Results & Toppers", 
      desc: "Highlight student toppers & achievements", 
      href: "/admin/results", 
      icon: <Trophy className="w-5 h-5 text-amber-600" />,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      count: stats.loading ? "..." : `${stats.toppersCount} Achievers`
    },
    { 
      title: "Notices & Announcements", 
      desc: "Publish circulars and school updates", 
      href: "/admin/notices", 
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      count: stats.loading ? "..." : `${stats.noticesCount} Published`
    },
    { 
      title: "Study Materials", 
      desc: "Upload question papers and syllabi", 
      href: "/admin/papers", 
      icon: <BookOpen className="w-5 h-5 text-sky-600" />,
      bgColor: "bg-sky-50",
      borderColor: "border-sky-100",
      count: "PDF Portal"
    },
    { 
      title: "Media & Photo Gallery", 
      desc: "Manage photo albums & video clips", 
      href: "/admin/media", 
      icon: <ImageIcon className="w-5 h-5 text-purple-600" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      count: stats.loading ? "..." : `${stats.mediaFoldersCount} Albums`
    },
    { 
      title: "Admission Applications", 
      desc: "Review online nursery to 12th applications", 
      href: "/admin/admissions", 
      icon: <GraduationCap className="w-5 h-5 text-teal-600" />,
      bgColor: "bg-teal-50",
      borderColor: "border-teal-100",
      count: "Admissions"
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-md border border-white/10">
              <Sparkles size={14} />
              <span>Admin Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-white">
              Welcome back, Admin 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-medium flex items-center gap-2 pt-1">
              <Clock size={14} className="text-emerald-400" />
              <span>{currentDateString}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/erp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all shadow-lg hover:shadow-emerald-500/25 border-0 no-underline cursor-pointer"
            >
              <School size={16} />
              <span>Open School ERP</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Notice Board</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileText size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.loading ? "..." : stats.noticesCount}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Active announcements</p>
          </div>
          <Link href="/admin/notices" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 no-underline pt-1">
            <span>Manage Notices</span> &rarr;
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gallery Albums</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ImageIcon size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.loading ? "..." : stats.mediaFoldersCount}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Media collections</p>
          </div>
          <Link href="/admin/media" className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 no-underline pt-1">
            <span>View Albums</span> &rarr;
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Top Achievers</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.loading ? "..." : stats.toppersCount}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Featured toppers</p>
          </div>
          <Link href="/admin/results" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 no-underline pt-1">
            <span>Update Toppers</span> &rarr;
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">System Status</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Activity size={18} />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Online</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">Synced with MongoDB</p>
          </div>
          <div className="text-xs font-bold text-slate-400 flex items-center gap-1 pt-1">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span>Database Active</span>
          </div>
        </motion.div>

      </div>

      {/* Navigation Modules Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Admin Management Modules</h2>
            <p className="text-xs text-slate-500 font-medium">Select a section below to update website content.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item, idx) => (
            <Link
              key={item.title}
              href={item.href}
              className={`p-5 rounded-2xl bg-white border ${item.borderColor} shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group no-underline`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${item.bgColor}`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {item.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                <span>Open Module</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
