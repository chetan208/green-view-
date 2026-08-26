import React from "react";
import fs from "fs";
import path from "path";
import HighSchoolHero from "./components/HighSchoolHero";
import HighSchoolTeachers from "./components/HighSchoolTeachers";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import GallerySection from "@/components/home/GallerySection";
import HighSchoolCta from "./components/HighSchoolCta";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HighSchoolPage() {
  let highImages: string[] = [];
  try {
    const highDir = path.join(process.cwd(), "public", "images", "academic", "high");
    if (fs.existsSync(highDir)) {
      const files = fs.readdirSync(highDir);
      highImages = files
        .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
        .map((file) => `/images/academic/high/${file}`);
    }
  } catch (error) {
    console.error("Failed to read high school images:", error);
  }

  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <HighSchoolHero images={highImages.length > 0 ? highImages : undefined} />
      <HighSchoolTeachers />
      <FacilitiesSection />
      <GallerySection />
      <HighSchoolCta />
      <TestimonialsSection />
    </div>
  );
}
