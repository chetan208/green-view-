"use client";

import React from "react";
import CalendarHero from "./components/CalendarHero";
import AcademicCalendarComponent from "@/components/calendar/AcademicCalendarComponent";

export default function AcademicCalendarPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9fafb] overflow-hidden pb-20">
      <CalendarHero />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <AcademicCalendarComponent isAdmin={false} />
      </div>
    </div>
  );
}
