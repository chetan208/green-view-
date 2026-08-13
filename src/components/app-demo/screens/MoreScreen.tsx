"use client";

import React from "react";
import { Bell, Palette, LogOut, ChevronRight, User } from "lucide-react";

export default function MoreScreen() {
  return (
    <div className="flex flex-col w-full h-full pb-20 animate-fadeIn">
      <div className="p-5 bg-white border-b border-slate-200">
        <h1 className="text-[20px] font-bold text-[#121c28]">Menu & Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        {/* Digital ID Card */}
        <div className="w-full bg-[#006a37] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10 scale-150 pointer-events-none">
             <User className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-md bg-white">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Rahul Sharma</h2>
              <p className="text-sm text-emerald-100 font-medium">Class 12th • Science</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10 flex justify-between">
            <div>
               <p className="text-[10px] text-emerald-100 uppercase tracking-wider font-bold mb-0.5">Roll No</p>
               <p className="font-mono font-bold text-sm">1123456</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-emerald-100 uppercase tracking-wider font-bold mb-0.5">DOB</p>
               <p className="font-bold text-sm">15 Apr 2007</p>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div>
          <h2 className="text-[15px] font-bold text-[#121c28] mb-3">Preferences</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 text-slate-700">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold">Push Notifications</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 text-slate-700">
                <Palette className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold">Theme (Light/Dark)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>

        <div>
          <button className="w-full flex items-center justify-center gap-2 bg-[#FCE8E6] text-rose-600 py-3.5 rounded-xl font-bold border border-rose-200 transition-colors">
            <LogOut className="w-4 h-4" /> Logout Securely
          </button>
        </div>
      </div>
    </div>
  );
}
