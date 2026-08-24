import React from "react";
import fs from "fs";
import path from "path";
import SeniorHero from "./components/SeniorHero";
import SeniorStreams from "./components/SeniorStreams";
import SeniorTeachers from "./components/SeniorTeachers";
import SeniorFacilities from "./components/SeniorFacilities";
import GallerySection from "@/components/home/GallerySection";
import SeniorCta from "./components/SeniorCta";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function SeniorPage() {
  let seniorImages: string[] = [];
  try {
    const seniorDir = path.join(process.cwd(), "public", "images", "academic", "senior");
    if (fs.existsSync(seniorDir)) {
      const files = fs.readdirSync(seniorDir);
      seniorImages = files
        .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
        .map((file) => `/images/academic/senior/${file}`);
    }
  } catch (error) {
    console.error("Failed to read senior images:", error);
  }

  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <SeniorHero images={seniorImages.length > 0 ? seniorImages : undefined} />
      <SeniorStreams />
      <SeniorTeachers />
      <SeniorFacilities />
      <GallerySection />
      <SeniorCta />
      <TestimonialsSection />
    </div>
  );
}
