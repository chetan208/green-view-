import HeroSection from "@/components/home/HeroSection";
import CategoryBar from "@/components/home/CategoryBar";
import StatsSection from "@/components/home/StatsSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import BoardNotices from "@/components/home/NoticeSection";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import AcademicCalendar from "@/components/home/AcademicCalendar";
import GallerySection from "@/components/home/GallerySection";

import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";


export default function Home() {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <HeroSection />
      <CategoryBar />
      <StatsSection />
      <WelcomeSection />
      <BoardNotices />
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
