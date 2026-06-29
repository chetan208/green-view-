import React from "react";
import MaterialHero from "./components/MaterialHero";
import MaterialGrid from "./components/MaterialGrid";

export default function StudyMaterialPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfcfc] overflow-hidden pb-20">
      <MaterialHero />
      <MaterialGrid />
    </div>
  );
}
