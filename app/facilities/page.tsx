import React from "react";
import FacilitiesHero from "./components/FacilitiesHero";
import FacilitiesGrid from "./components/FacilitiesGrid";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="flex flex-col items-center">
        <FacilitiesHero />
        
        {/* Negative margin to pull grid slightly over the hero section if desired, but we'll use normal flow here */}
        <div className="w-full relative z-20">
          <FacilitiesGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
