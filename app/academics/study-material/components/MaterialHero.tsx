"use client";

import React from "react";
import Link from "next/link";

export default function MaterialHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-6 md:pb-8 flex flex-col gap-4">
      <div className="text-sm font-medium text-slate-500">
        <Link href="/" className="text-[#0fa958] hover:underline">Home</Link> / <span className="text-slate-400">Academics</span> / <span>Study Material</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
        Study <span className="text-[#147a42]">Material</span>
      </h1>
      <p className="text-slate-500 font-medium text-xs md:text-sm max-w-2xl leading-relaxed">
        Access CBSE syllabus guidelines, reference notes, and downloadable educational resources for all grade levels.
      </p>
    </div>
  );
}
