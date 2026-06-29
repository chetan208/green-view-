"use client";

import React from "react";
import Link from "next/link";

export default function TransportHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-6 md:pb-8 flex flex-col gap-4">
      <div className="text-sm font-medium text-slate-500">
        <Link href="/" className="text-brand-green hover:underline">Home</Link> / <span>Transport</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
        School <span className="text-brand-green-dark">Transport</span>
      </h1>
      <p className="text-slate-500 font-medium text-xs md:text-sm max-w-2xl leading-relaxed">
        Providing safe, reliable, and convenient GPS-enabled school bus services across all major routes.
      </p>
    </div>
  );
}
