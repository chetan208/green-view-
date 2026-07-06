"use client";

import React, { useState } from "react";
import { Shield, Bell, Palette, LogOut, Sun, Moon, Power } from "lucide-react";

export default function SettingsTab() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("English (US)");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fadeIn pb-12 select-none">
      
      {/* Column 1: Account Security */}
      <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col gap-5">
        <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center text-[#006a37]">
            <Shield className="w-4.5 h-4.5" />
          </div>
          <span>Account Security</span>
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); alert("Password updated successfully!"); }} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              defaultValue="password123"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-[#006a37] focus:ring-1 focus:ring-[#006a37] transition text-slate-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              defaultValue="password123"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-[#006a37] focus:ring-1 focus:ring-[#006a37] transition text-slate-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              defaultValue="password123"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-[#006a37] focus:ring-1 focus:ring-[#006a37] transition text-slate-800"
            />
          </div>

          <button 
            type="submit"
            className="bg-[#006a37] text-white rounded-lg py-2.5 px-4 mt-2 text-sm font-bold shadow-sm transition hover:bg-[#005229] cursor-pointer text-center"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Column 2: Notification Preferences */}
      <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col gap-5">
        <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center text-[#006a37]">
            <Bell className="w-4.5 h-4.5" />
          </div>
          <span>Notification Preferences</span>
        </h3>

        <div className="flex flex-col gap-6.5 mt-2">
          {/* Email Notifications */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-800">Email Notifications</span>
              <span className="text-xs text-slate-455 leading-relaxed">
                Receive updates about course materials and announcements via email.
              </span>
            </div>
            <button 
              onClick={() => setEmailNotif(!emailNotif)}
              className={`w-11 h-6 rounded-full shrink-0 p-0.5 transition-colors cursor-pointer ${
                emailNotif ? "bg-[#006a37]" : "bg-slate-200"
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                emailNotif ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>

          {/* SMS Notifications */}
          <div className="flex justify-between items-start gap-4 border-t border-slate-100 pt-5">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-800">SMS Notifications</span>
              <span className="text-xs text-slate-455 leading-relaxed">
                Get urgent alerts and deadline reminders sent directly to your phone.
              </span>
            </div>
            <button 
              onClick={() => setSmsNotif(!smsNotif)}
              className={`w-11 h-6 rounded-full shrink-0 p-0.5 transition-colors cursor-pointer ${
                smsNotif ? "bg-[#006a37]" : "bg-slate-200"
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                smsNotif ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>

          {/* App Push Notifications */}
          <div className="flex justify-between items-start gap-4 border-t border-slate-100 pt-5">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-800">App Push Notifications</span>
              <span className="text-xs text-slate-455 leading-relaxed">
                Enable real-time push alerts within the student portal web app.
              </span>
            </div>
            <button 
              onClick={() => setPushNotif(!pushNotif)}
              className={`w-11 h-6 rounded-full shrink-0 p-0.5 transition-colors cursor-pointer ${
                pushNotif ? "bg-[#006a37]" : "bg-slate-200"
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                pushNotif ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Column 3: Display Settings & Logout */}
      <div className="flex flex-col gap-6">
        
        {/* Display Settings Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col gap-5">
          <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center text-[#006a37]">
              <Palette className="w-4.5 h-4.5" />
            </div>
            <span>Display Settings</span>
          </h3>

          <div className="flex flex-col gap-4.5 mt-1">
            {/* Language */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language</label>
              <div className="relative">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-[#006a37] focus:ring-1 focus:ring-[#006a37] text-slate-700 font-semibold appearance-none cursor-pointer"
                >
                  <option>English (US)</option>
                  <option>Hindi (IN)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Light / Dark Mode Toggle Buttons */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Light/Dark Mode</label>
              <div className="grid grid-cols-2 gap-2 bg-[#EEF4FF] p-1 rounded-lg border border-slate-250/20">
                {/* Light Button */}
                <button 
                  onClick={() => setThemeMode("light")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                    themeMode === "light" 
                      ? "bg-white text-[#006a37] shadow-xs" 
                      : "text-slate-550 hover:text-slate-800"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                {/* Dark Button */}
                <button 
                  onClick={() => setThemeMode("dark")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                    themeMode === "dark" 
                      ? "bg-white text-[#006a37] shadow-xs" 
                      : "text-slate-550 hover:text-slate-800"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Card */}
        <div className="bg-[#FCE8E6] border border-rose-200 rounded-xl p-6.5 shadow-xs flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-[#ba1a1a] flex items-center gap-2.5">
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout</span>
          </h3>
          <p className="text-xs text-[#ba1a1a] font-medium leading-relaxed">
            Safely terminate your current session and clear local cache.
          </p>
          <button 
            onClick={() => alert("Logging out Securely...")}
            className="bg-[#006a37] hover:bg-[#005229] text-white rounded-lg flex items-center justify-center gap-2 py-2.5 px-4 mt-2 w-full text-sm font-bold shadow-sm transition cursor-pointer"
          >
            <Power className="w-4 h-4 text-white" />
            <span>Logout Securely</span>
          </button>
        </div>

      </div>

    </div>
  );
}
