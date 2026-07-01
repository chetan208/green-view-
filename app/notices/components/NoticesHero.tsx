"use client";

import React from "react";
import Link from "next/link";

export default function NoticesHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-6 md:pb-8 flex flex-col gap-4">
      <div className="text-sm font-medium text-slate-500">
        <Link href="/" className="text-brand-green hover:underline">Home</Link> / <span>Notices</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold md:font-bold text-[#0c3c86] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
        Official Notices Archive
      </h1>
    </div>
  );
}
