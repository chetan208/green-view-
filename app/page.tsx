import HeroSection from "@/components/home/HeroSection";
import CategoryBar from "@/components/home/CategoryBar";
import StatsSection from "@/components/home/StatsSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import BoardNotices from "@/components/home/NoticeSection";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import ToppersSection from "@/components/home/ToppersSection";
import AcademicCalendar from "@/components/home/AcademicCalendar";
import GallerySection from "@/components/home/GallerySection";

import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";


import fs from "fs";
import path from "path";

export default function Home() {
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
    <div className="w-full flex flex-col overflow-x-hidden">
      <HeroSection />
      <CategoryBar />
      <StatsSection />
      <BoardNotices />
      <WelcomeSection images={aboutImages.length > 0 ? aboutImages : undefined} />
      <ToppersSection />
      
      <PrincipalMessage />
      <FacilitiesSection />
      <AcademicCalendar />
      <GallerySection />

      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
  
    </div>
  );
}
