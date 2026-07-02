import React from "react";
import NoticesHero from "./components/NoticesHero";
import NoticesList from "./components/NoticesList";

export default function NoticesPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9fafb] overflow-hidden pb-20">
      <NoticesHero />
      <NoticesList />
    </div>
  );
}

