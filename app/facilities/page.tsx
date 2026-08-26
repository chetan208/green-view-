"use client";

import React, { useState } from "react";
import FacilitiesHero from "./components/FacilitiesHero";
import FacilitiesGrid from "./components/FacilitiesGrid";

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col items-center">
        <FacilitiesHero />
        
        <div id="facilities-grid" className="w-full relative z-20">
          <FacilitiesGrid />
        </div>
      </main>
    </div>
  );
}
