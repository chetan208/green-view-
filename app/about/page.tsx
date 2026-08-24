import React from "react";
import TimelineSection from "@/components/about/TimelineSection";
import CoursesSection from "@/components/about/CoursesSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FaqSection from "@/components/home/FaqSection";

import fs from "fs";
import path from "path";

export default function AboutPage() {
  let aboutImages: string[] = [];
  try {
    const aboutDir = path.join(process.cwd(), "public", "images", "about");
    if (fs.existsSync(aboutDir)) {
      const files = fs.readdirSync(aboutDir);
      aboutImages = files
        .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
        .map((file) => `/images/about/${file}`);
    }
  } catch (error) {
    console.error("Failed to read about images:", error);
  }

  return (
    <div className="w-full min-h-screen overflow-hidden pb-20 bg-[#f8f9fa]">
      {/* Hero / Welcome Section */}
      <WelcomeSection images={aboutImages.length > 0 ? aboutImages : undefined} />
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Courses Section */}
      <CoursesSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
