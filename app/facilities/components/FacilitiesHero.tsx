"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, ShieldCheck, Cpu, Trophy, Bus, BookOpen } from "lucide-react";
import Image from "next/image";

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
    <section className="relative w-full pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden bg-gradient-to-b from-[#0a1e14] via-[#0f2d1e] to-[#0a1e14] text-white">
      {/* Background Ambient Glow & Mesh Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0fa958]/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>World-Class School Infrastructure</span>
        </motion.div>

        {/* Main Title & Subtitle */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center text-white tracking-tight leading-[1.15] max-w-4xl mb-6 uppercase"
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
          From interactive smart classrooms and high-tech science labs to expansive athletic grounds and GPS-tracked transport, we provide a safe and inspiring environment for holistic development.
        </motion.p>

        {/* Floating Quick Feature Stats Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mb-10"
        >
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base sm:text-lg text-white leading-none">100%</span>
              <span className="text-[11px] text-slate-400 font-medium leading-tight mt-1">Smart Classrooms</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base sm:text-lg text-white leading-none">Multi-Sport</span>
              <span className="text-[11px] text-slate-400 font-medium leading-tight mt-1">Athletics Complex</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Bus className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base sm:text-lg text-white leading-none">GPS Tracked</span>
              <span className="text-[11px] text-slate-400 font-medium leading-tight mt-1">Transport Fleet</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base sm:text-lg text-white leading-none">24/7 CCTV</span>
              <span className="text-[11px] text-slate-400 font-medium leading-tight mt-1">Safe & Secure Campus</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Category Selector Pills */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-2xl sm:rounded-full bg-white/10 border border-white/15 backdrop-blur-xl mb-8 select-none"
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#0fa958] text-white border-emerald-400 shadow-md shadow-emerald-900/40"
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
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#0fa958] border border-white/20 text-white flex items-center justify-center shadow-lg transition-all group cursor-pointer"
          aria-label="Scroll to Facilities Grid"
        >
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.button>

      </div>
    </section>
  );
}
