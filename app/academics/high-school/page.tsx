import React from "react";
import HighSchoolHero from "./components/HighSchoolHero";
import HighSchoolTeachers from "./components/HighSchoolTeachers";
import HighSchoolFacilities from "./components/HighSchoolFacilities";
import GallerySection from "@/components/home/GallerySection";
import HighSchoolCta from "./components/HighSchoolCta";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HighSchoolPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <HighSchoolHero />
      <HighSchoolTeachers />
      <HighSchoolFacilities />
      <GallerySection />
      <HighSchoolCta />
      <TestimonialsSection />
    </div>
  );
}
