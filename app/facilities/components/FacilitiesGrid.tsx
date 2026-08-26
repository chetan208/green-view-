"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Video, HeartPulse, Droplets, Search, ArrowRight, X, Info } from "lucide-react";
import { facilitiesData, FacilityItem } from "@/data/facilitiesData";

interface FacilitiesGridProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function FacilitiesGrid({ activeCategory = "All", onSelectCategory }: FacilitiesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  const filterTabs = [
    { key: "All", label: "All Facilities" },
    { key: "Academic", label: "Academics & Labs" },
    { key: "Sports", label: "Sports & Fitness" },
    { key: "Safety", label: "Safety & Transport" },
    { key: "Arts", label: "Arts & Culture" },
  ];

  // Pure filtering logic preserving original facilitiesData
  const filteredFacilities = facilitiesData.filter(fac => {
    const matchesCategory = activeCategory === "All" || fac.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      fac.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.fullDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (fac.highlights && fac.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-slate-50/60 relative border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title & Category Filter Bar */}
        <div className="flex flex-col items-center text-center mb-12 select-none">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Campus <span className="text-[#0fa958]">Infrastructure</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            Explore our state-of-the-art facilities equipped with modern technology, safety protocols, and comprehensive resources for student excellence.
          </p>

          {/* Interactive Filter Pills & Search Bar */}
          <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onSelectCategory && onSelectCategory(tab.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeCategory === tab.key
                      ? "bg-[#0fa958] text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search facility..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-colors text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Facility Counter Label */}
          <div className="mt-3 text-[11px] font-semibold text-slate-400 tracking-wide">
            Showing {filteredFacilities.length} of {facilitiesData.length} facilities
          </div>
        </div>

        {/* Empty Search Fallback */}
        {filteredFacilities.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-xs">
            <Info className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 mb-1">No matching facilities found</h3>
            <p className="text-xs text-slate-500 mb-4">Try adjusting your search keyword or selected category tab.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                if (onSelectCategory) onSelectCategory("All");
              }}
              className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detailed Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFacilities.map((fac) => (
              <motion.div 
                key={fac.id}
                id={fac.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-slate-300 transition-colors duration-150 flex flex-col scroll-mt-28 shadow-xs"
              >
                {/* Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={fac.image} 
                    alt={fac.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Facility Title */}
                  <h3 className="absolute bottom-3 left-4 right-4 text-xl font-bold text-white leading-snug drop-shadow-md">
                    {fac.title}
                  </h3>
                </div>

                {/* Detailed Content Body */}
                <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4 line-clamp-3">
                    {fac.shortDesc || fac.fullDesc}
                  </p>

                  {/* Key Highlights Chips */}
                  {fac.highlights && fac.highlights.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 mb-4">
                      {fac.highlights.map((highlight, hIdx) => (
                        <span 
                          key={hIdx} 
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50/70 text-emerald-800 text-[11px] font-semibold border border-emerald-100/60"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Button: Opens Details Modal */}
                  <button
                    onClick={() => setSelectedFacility(fac)}
                    className="w-full mt-auto py-2 px-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Facility Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Facility Detail Modal */}
        <AnimatePresence>
          {selectedFacility && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFacility(null)}
                className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 flex flex-col"
              >
                {/* Modal Header Image */}
                <div className="relative h-64 w-full bg-slate-100 shrink-0">
                  <img
                    src={selectedFacility.image}
                    alt={selectedFacility.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/60 text-white flex items-center justify-center hover:bg-slate-950 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-5 right-5 flex flex-col">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedFacility.title}
                    </h2>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description & Facilities Overview</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {selectedFacility.fullDesc}
                    </p>
                  </div>

                  {selectedFacility.highlights && selectedFacility.highlights.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Infrastructure Highlights</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedFacility.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100/60 text-emerald-800 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-2">
                    <span className="text-xs text-slate-400 font-medium">Green View School • Campus Facility</span>
                    <button
                      onClick={() => setSelectedFacility(null)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Safety & Campus Security Banner */}
        <div className="mt-16 bg-[#071911] rounded-2xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl border border-emerald-900/40">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col text-center md:text-left">
              <h3 className="text-xl md:text-3xl font-bold tracking-tight mb-2">
                Student Safety & Campus Security
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                Our entire campus is protected by 24/7 CCTV surveillance, trained security personnel, medical infirmary, and strict visitor control protocols.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 select-none">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] border border-white/10">
                <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-white">24/7 CCTV</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] border border-white/10">
                <HeartPulse className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-white">Medical Care</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-white">Safe Entry</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] border border-white/10">
                <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-white">RO Water</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
