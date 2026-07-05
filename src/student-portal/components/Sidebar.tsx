import React from "react";
import { User, GraduationCap, Calendar, FileText, CreditCard } from "lucide-react";

export type TabType = "overview" | "academics" | "attendance" | "schedule" | "fees";

interface SidebarProps {
  student: {
    name: string;
    avatar: string;
    classSection: string;
  };
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Sidebar({ student, activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "academics", label: "Academics", icon: GraduationCap },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "schedule", label: "Timetable", icon: FileText },
    { id: "fees", label: "Fees", icon: CreditCard },
  ] as const;

  return (
    <div className="w-64 bg-white h-[calc(100vh-4rem)] fixed left-0 top-16 flex flex-col border-r border-slate-200 z-40">
      
      {/* Navigation Links */}

      {/* Navigation Links */}
      <nav className="flex flex-col mt-4">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-3.5 px-6 py-3.5 font-semibold text-sm transition-all cursor-pointer w-full text-left ${
                isActive
                  ? "bg-[#4ade80] text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <TabIcon className="w-4.5 h-4.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
      
    </div>
  );
}
