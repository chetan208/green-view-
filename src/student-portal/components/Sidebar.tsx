import React from "react";
import { LayoutGrid, GraduationCap, Calendar, Clock, CreditCard, Bell, Settings, LogOut } from "lucide-react";

export type TabType = "overview" | "academics" | "attendance" | "timetable" | "fees" | "notices" | "settings";

interface SidebarProps {
  student: {
    name: string;
    avatar: string;
    classSection: string;
  };
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isCollapsed: boolean;
}

export default function Sidebar({ student, activeTab, setActiveTab, isCollapsed }: SidebarProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "academics", label: "Academics", icon: GraduationCap },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "timetable", label: "Timetable", icon: Clock },
    { id: "fees", label: "Fees", icon: CreditCard },
    { id: "notices", label: "Notices", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className={`bg-white h-[calc(100vh-4rem)] fixed left-0 top-16 flex flex-col justify-between border-r border-slate-200 z-40 py-6 select-none transition-all duration-300 ${
      isCollapsed ? "w-[72px]" : "w-[240px]"
    }`}>
      <nav className={`flex flex-col gap-1 ${isCollapsed ? "px-2" : "px-4"}`}>
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              title={isCollapsed ? tab.label : undefined}
              className={`flex items-center rounded-lg text-sm transition-all cursor-pointer text-left ${
                isCollapsed ? "p-3.5 justify-center" : "px-4 py-3 justify-start gap-3.5"
              } ${
                isActive
                  ? "bg-[#006a37] text-white font-bold shadow-sm shadow-[#006a37]/10"
                  : "text-slate-650 hover:bg-slate-55/60 hover:text-slate-900 font-normal"
              }`}
            >
              <TabIcon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-white" : "text-slate-450"}`} />
              {!isCollapsed && <span>{tab.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Sign Out Button at Bottom */}
      <div className={isCollapsed ? "px-2" : "px-4"}>
        <button
          onClick={() => alert("Signing out...")}
          title={isCollapsed ? "Sign Out" : undefined}
          className={`w-full flex items-center rounded-lg text-sm text-slate-650 hover:bg-slate-55/60 hover:text-slate-900 border border-slate-200/80 transition-all cursor-pointer text-left ${
            isCollapsed ? "p-3.5 justify-center" : "px-4 py-3 justify-start gap-3.5"
          }`}
        >
          <LogOut className="w-4 h-4 text-slate-450 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
