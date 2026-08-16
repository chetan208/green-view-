'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  X,
  CheckCircle2,
  UserCog,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ERPHeader() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user: authUser, logout } = useAuth();
  
  const user = {
    name: authUser?.name || "Admin User",
    role: authUser?.teacherProfile?.accessRole || authUser?.role || "Staff",
    photoUrl: authUser?.photoUrl
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => router.push("/admin")}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer border-0 text-slate-600"
          >
            <ArrowLeft size={15} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center shrink-0 overflow-hidden">
              <img src="/-logo.png" alt=" Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className="text-slate-900 font-bold text-[13px] leading-none tracking-tight">
                Green View ERP
              </p>
              <p className="text-slate-500 text-[9px] font-medium uppercase tracking-widest mt-0.5">
                School Management System
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          <span className="text-emerald-700 text-[10px] font-semibold uppercase tracking-widest">System Online</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer border-0 text-slate-600"
            >
              <Bell size={14} />
            </button>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-25 text-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-brand-green-dark">Notifications</span>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer">
                      <X size={12} />
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs font-medium text-emerald-800 space-y-1.5 flex gap-2.5 items-start">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-emerald-700">System Active</p>
                        <p className="text-[10px] text-emerald-600/80 leading-normal mt-0.5 font-medium">Everything is running smoothly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer border border-slate-200 text-slate-700"
            >
              <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-[10px] overflow-hidden shrink-0">
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <span className="hidden sm:block text-[11px] font-semibold max-w-[80px] truncate">
                {user.name}
              </span>
              <ChevronDown size={11} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20">
                  <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50">
                    <p className="text-xs font-bold text-brand-green-dark truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{user.role}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        router.push("/erp?module=profile");
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition cursor-pointer border-0 bg-transparent hover:text-brand-green"
                    >
                      <UserCog size={13} /> My Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition cursor-pointer border-0 bg-transparent"
                    >
                      <LogOut size={13} /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
