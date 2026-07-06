import React from "react";
import { User, GraduationCap, Calendar, FileText, CreditCard, Bell } from "lucide-react";

export type TabType = "overview" | "academics" | "attendance" | "schedule" | "fees" | "notices";

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
    { id: "notices", label: "Notices", icon: Bell },
  ] as const;

  return (
    <div className="w-64 bg-white h-[calc(100vh-4rem)] fixed left-0 top-16 flex flex-col border-r border-slate-200/80 z-40 py-4 select-none">
      <nav className="flex flex-col gap-0.5">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-3 px-4 py-2.5 mx-3 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer text-left ${
                isActive
                  ? "bg-emerald-50/80 text-emerald-750 font-bold"
                  : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"
              }`}
            >
              <TabIcon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
