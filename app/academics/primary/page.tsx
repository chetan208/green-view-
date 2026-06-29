import React from "react";
import PrimaryHero from "./components/PrimaryHero";
import PrimaryTeachers from "./components/PrimaryTeachers";
import PrimaryFacilities from "./components/PrimaryFacilities";
import GallerySection from "@/components/home/GallerySection";
import PrimaryCta from "./components/PrimaryCta";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function PrimaryPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <PrimaryHero />
      <PrimaryTeachers />
      <PrimaryFacilities />
      <GallerySection />
      <PrimaryCta />
      <TestimonialsSection />
    </div>
  );
}
