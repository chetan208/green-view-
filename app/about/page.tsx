"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TimelineSection from "@/components/about/TimelineSection";
import CoursesSection from "@/components/about/CoursesSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FaqSection from "@/components/home/FaqSection";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20 bg-[#f8f9fa]">
      {/* Hero / Welcome Section */}
      <WelcomeSection />
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Courses Section */}
      <CoursesSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
