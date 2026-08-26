import React from "react";
import fs from "fs";
import path from "path";
import PrimaryHero from "./components/PrimaryHero";
import PrimaryTeachers from "./components/PrimaryTeachers";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import GallerySection from "@/components/home/GallerySection";
import PrimaryCta from "./components/PrimaryCta";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function PrimaryPage() {
  let primaryImages: string[] = [];
  try {
    const primaryDir = path.join(process.cwd(), "public", "images", "academic", "primary");
    if (fs.existsSync(primaryDir)) {
      const files = fs.readdirSync(primaryDir);
      primaryImages = files
        .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
        .map((file) => `/images/academic/primary/${file}`);
    }
  } catch (error) {
    console.error("Failed to read primary images:", error);
  }

  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <PrimaryHero images={primaryImages.length > 0 ? primaryImages : undefined} />
      <PrimaryTeachers />
      <FacilitiesSection />
      <GallerySection />
      <PrimaryCta />
      <TestimonialsSection />
    </div>
  );
}
