"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, ShieldCheck, Video, HeartPulse, Droplets } from "lucide-react";
import { facilitiesData } from "@/data/facilitiesData";

interface FacilitiesGridProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function FacilitiesGrid({ activeCategory = "All", onSelectCategory }: FacilitiesGridProps) {
  const filteredFacilities = activeCategory === "All"
    ? facilitiesData
    : facilitiesData.filter(fac => fac.category === activeCategory);

  const filterTabs = [
    { key: "All", label: "All Facilities" },
    { key: "Academic", label: "Academics & Labs" },
    { key: "Sports", label: "Sports & Fitness" },
    { key: "Safety", label: "Safety & Transport" },
    { key: "Arts", label: "Arts & Culture" },
  ];

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-slate-50/70 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title & Category Filter Bar */}
        <div className="flex flex-col items-center text-center mb-12 select-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-[#006a37] font-bold text-xs uppercase tracking-widest border border-emerald-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Campus Tour & Facilities
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">
            Campus <span className="text-[#0B9E50]">Infrastructure</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            Explore our state-of-the-art facilities equipped with modern technology, safety protocols, and comprehensive resources.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onSelectCategory && onSelectCategory(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === tab.key
                    ? "bg-[#0fa958] text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredFacilities.map((fac) => (
              <motion.div 
                key={fac.id}
                id={fac.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col scroll-mt-28"
              >
                {/* Image Header with Badge */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={fac.image} 
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                  
                  {fac.badge && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#006a37] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/50 shadow-md">
                      {fac.badge}
                    </span>
                  )}

                  <h3 className="absolute bottom-4 left-6 right-6 text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                    {fac.title}
                  </h3>
                </div>

                {/* Detailed Content Body */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-white">
                  <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed mb-6">
                    {fac.fullDesc}
                  </p>

                  {/* Key Highlights Chips */}
                  {fac.highlights && fac.highlights.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                      {fac.highlights.map((highlight, hIdx) => (
                        <span 
                          key={hIdx} 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50/80 text-[#006a37] text-xs font-semibold border border-emerald-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B9E50]" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Safety & Campus Security Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0a1e14] to-[#133825] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col text-center md:text-left">
              <span className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2">
                <ShieldCheck className="w-4 h-4" /> Safety First Policy
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                Student Safety & Campus Security
              </h3>
              <p className="text-slate-300 text-sm md:text-base max-w-xl font-normal leading-relaxed">
                Our entire campus is protected by 24/7 CCTV surveillance, trained security personnel, medical infirmary, and strict visitor control protocols.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15">
                <Video className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">24/7 CCTV</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">Medical Care</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">Safe Entry</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15">
                <Droplets className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">RO Water</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
