import React from "react";
import SeniorHero from "./components/SeniorHero";
import SeniorStreams from "./components/SeniorStreams";
import SeniorTeachers from "./components/SeniorTeachers";
import SeniorFacilities from "./components/SeniorFacilities";
import GallerySection from "@/components/home/GallerySection";
import SeniorCta from "./components/SeniorCta";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function SeniorPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <SeniorHero />
      <SeniorStreams />
      <SeniorTeachers />
      <SeniorFacilities />
      <GallerySection />
      <SeniorCta />
      <TestimonialsSection />
    </div>
  );
}
