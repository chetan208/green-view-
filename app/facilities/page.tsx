"use client";

import React, { useState } from "react";
import FacilitiesHero from "./components/FacilitiesHero";
import FacilitiesGrid from "./components/FacilitiesGrid";

export default function FacilitiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col items-center">
        <FacilitiesHero 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        
        <div id="facilities-grid" className="w-full relative z-20">
          <FacilitiesGrid 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
        </div>
      </main>
    </div>
  );
}
