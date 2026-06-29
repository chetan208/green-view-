import React from "react";
import CalendarHero from "./components/CalendarHero";
import CalendarMonthView from "./components/CalendarMonthView";
import CalendarGrid from "./components/CalendarGrid";

export default function AcademicCalendarPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfcfc] overflow-hidden pb-20">
      <CalendarHero />
      <CalendarMonthView />
      <CalendarGrid />
    </div>
  );
}
