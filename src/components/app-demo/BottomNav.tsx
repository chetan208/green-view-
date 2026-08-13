"use client";

import React from "react";
import { Home, GraduationCap, Calendar, CreditCard, Menu } from "lucide-react";
import { motion } from "framer-motion";

export type AppTab = "dashboard" | "academics" | "schedule" | "fees" | "more";

interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: "dashboard" as AppTab, icon: Home, label: "Home" },
    { id: "academics" as AppTab, icon: GraduationCap, label: "Academics" },
    { id: "schedule" as AppTab, icon: Calendar, label: "Schedule" },
    { id: "fees" as AppTab, icon: CreditCard, label: "Fees" },
    { id: "more" as AppTab, icon: Menu, label: "More" },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 pb-safe z-50 rounded-b-[2rem] sm:rounded-b-[2rem] overflow-hidden">
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center w-16 h-12"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavBubble"
                  className="absolute inset-0 bg-[#E6F4EA] rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className={`relative z-10 flex flex-col items-center gap-1 ${isActive ? "text-[#006a37]" : "text-slate-500"}`}>
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
