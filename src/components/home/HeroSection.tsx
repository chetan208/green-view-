"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, Laptop, FileText, Pencil } from "lucide-react";

export default function HeroSection() {
  const images = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1525921429624-479b6c294591?auto=format&fit=crop&q=80&w=800"
  ];

  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-8 md:pt-12 pb-20 px-6 md:px-12 lg:px-24 bg-white flex justify-center relative overflow-hidden">
      
      {/* Faint Circular Background Blobs matching mockup */}
      <div className="absolute bottom-[-80px] left-[5%] w-[280px] h-[280px] bg-slate-50/80 rounded-full -z-10" />
      <div className="absolute top-[35%] right-[-80px] w-[320px] h-[320px] bg-slate-50/80 rounded-full -z-10" />

      {/* Floating Decorative Green Pencil Icon in Bottom Middle */}
      <div className="absolute bottom-10 left-[45%] -translate-x-1/2 rotate-[15deg] opacity-40 hidden md:block">
        <Pencil className="w-5 h-5 text-emerald-300" />
      </div>

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">
        
        {/* Left Content Column */}
        <div className="flex flex-col flex-1 text-left items-start relative">
          
          {/* Subtitle Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Inspiring Excellence Since 1986
            </span>
          </div>

          {/* Book Icon Above Title */}
          <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl mb-4 relative">
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
            <span className="text-[#0fa958]">Green view</span> <br />
            Sr. Sec. School
          </h1>

          <p className="text-slate-500 text-sm md:text-base max-w-md mb-8 leading-relaxed font-semibold">
            A trusted private senior secondary school focused on academic excellence, discipline, values and modern parent communication.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <Link
              href="#admission"
              className="inline-flex items-center gap-2 bg-[#0fa958] text-white hover:bg-emerald-700 px-6 md:px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-md shadow-emerald-600/10"
            >
              Admission Enquiry
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#about"
              className="bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-600 px-6 md:px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 text-center"
            >
              About Us
            </Link>
          </div>

          {/* Ratings & Families Proof Row */}
          <div className="flex items-center gap-4 flex-wrap relative">
            {/* Laptop Icon Floating above the avatars */}
            <div className="absolute -top-6 -left-6 bg-slate-50/50 p-2 rounded-xl border border-emerald-100/50 opacity-40">
              <Laptop className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Avatars */}
            <div className="flex -space-x-2.5">
              {[
                { name: "A", bg: "bg-orange-500" },
                { name: "R", bg: "bg-blue-600" },
                { name: "P", bg: "bg-emerald-500" },
                { name: "N", bg: "bg-purple-600" },
                { name: "+5k", bg: "bg-emerald-800" },
              ].map((av, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white ${av.bg}`}
                >
                  {av.name}
                </div>
              ))}
            </div>

            {/* Stars & Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                ))}
                <span className="text-xs font-black text-slate-800 ml-1">4.9</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                Trusted by <span className="text-slate-800 font-extrabold">5,000+ families</span> across HP since 1986
              </span>
            </div>
          </div>

        </div>

        {/* Right Slideshow Column */}
        <div className="flex-1 w-full flex justify-center relative select-none">
          
          {/* Main Rounded Image Container */}
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2.5rem] overflow-hidden border-[12px] border-white shadow-xl bg-slate-50">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Green View School Campus"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  idx === currentImageIdx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>

          {/* Overlapping Badge: Admissions Open (Bottom-Left) */}
          <div className="absolute bottom-6 left-2 md:-left-6 z-20 bg-[#0fa958] text-white w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-[6px] border-white select-none">
            <span className="text-xs md:text-sm font-black tracking-tight leading-none">
              2026-27
            </span>
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-wider mt-1 leading-none text-emerald-100">
              Admissions
            </span>
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-wider leading-none text-emerald-100">
              Open Now
            </span>
          </div>

          {/* Offset Badge: Board Results (Bottom-Right) */}
          <div className="absolute -bottom-8 right-2 md:-right-6 z-20 bg-white p-4 rounded-3xl shadow-lg border border-slate-100/70 flex flex-col max-w-[170px] select-none">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Board Results 2024-25
            </span>
            <span className="text-lg font-black text-emerald-700 mt-1 leading-none">
              94.2% avg
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">
              Class X & XII
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
