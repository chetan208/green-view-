"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, ShieldCheck, Cpu, Trophy, Bus, BookOpen } from "lucide-react";

interface FacilitiesHeroProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function FacilitiesHero({ activeCategory = "All", onSelectCategory }: FacilitiesHeroProps) {
  const scrollToGrid = () => {
    const el = document.getElementById("facilities-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: 500, behavior: "smooth" });
    }
  };

  const categories = [
    { name: "All", label: "All Facilities", icon: Sparkles },
    { name: "Academic", label: "Academics & Labs", icon: Cpu },
    { name: "Sports", label: "Sports & Fitness", icon: Trophy },
    { name: "Safety", label: "Safety & Transport", icon: Bus },
    { name: "Arts", label: "Arts & Culture", icon: BookOpen },
  ];

  return (
    <section className="relative w-full pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-[#071911] text-white">
      {/* Background Ambient Glow & Mesh Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Main Title & Subtitle */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-center text-white tracking-tight leading-[1.15] max-w-4xl mb-6"
        >
          Empowering Education Through <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
            Modern Facilities
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base md:text-lg font-normal text-center max-w-2xl leading-relaxed mb-10"
        >
          From interactive smart classrooms and advanced science labs to expansive sports complexes and GPS-tracked transport, we provide a safe and inspiring environment for holistic student growth.
        </motion.p>


        {/* Interactive Category Selector Pills */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-xl mb-8 select-none"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.name);
                  scrollToGrid();
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                  isSelected
                    ? "bg-[#0fa958] text-white border-emerald-400 shadow-xs"
                    : "bg-transparent text-slate-300 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Scroll Down Button */}
        <motion.button 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={scrollToGrid}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0fa958] border border-white/15 text-white flex items-center justify-center shadow-xs transition-colors group cursor-pointer"
          aria-label="Scroll to Facilities Grid"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.button>

      </div>
    </section>
  );
}
