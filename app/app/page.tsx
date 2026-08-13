"use client";

import React, { useState } from "react";
import BottomNav, { AppTab } from "@/components/app-demo/BottomNav";
import DashboardScreen from "@/components/app-demo/screens/DashboardScreen";
import AcademicsScreen from "@/components/app-demo/screens/AcademicsScreen";
import ScheduleScreen from "@/components/app-demo/screens/ScheduleScreen";
import FeesScreen from "@/components/app-demo/screens/FeesScreen";
import MoreScreen from "@/components/app-demo/screens/MoreScreen";

export default function MobileAppDemo() {
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FF] w-full font-sans">
      <div className="w-full h-[100dvh] bg-[#F8F9FF] relative overflow-hidden flex flex-col">
        
        <div className="flex-1 overflow-hidden relative">
          {activeTab === "dashboard" && <DashboardScreen />}
          {activeTab === "academics" && <AcademicsScreen />}
          {activeTab === "schedule" && <ScheduleScreen />}
          {activeTab === "fees" && <FeesScreen />}
          {activeTab === "more" && <MoreScreen />}
        </div>
        
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
