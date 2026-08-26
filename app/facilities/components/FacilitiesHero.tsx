"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Cpu, Trophy, Bus, BookOpen, Layers } from "lucide-react";
import { facilitiesData } from "@/data/facilitiesData";

interface FacilitiesHeroProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function FacilitiesHero({ activeCategory = "All", onSelectCategory }: FacilitiesHeroProps) {
  const scrollToGrid = () => {
    const el = document.getElementById("facilities-grid");
    const targetY = el ? el.getBoundingClientRect().top + window.scrollY : window.scrollY + 700;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200; // 1.2 seconds for a very smooth slow scroll
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startY + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  const categories = [
    { name: "All", label: "All Facilities", icon: Layers },
    { name: "Academic", label: "Academics & Labs", icon: Cpu },
    { name: "Sports", label: "Sports & Fitness", icon: Trophy },
    { name: "Safety", label: "Safety & Transport", icon: Bus },
    { name: "Arts", label: "Arts & Culture", icon: BookOpen },
  ];

  // Pick top 3 images for the collage
  const collageImages = facilitiesData.slice(0, 3).map(f => f.image);

  return (
    <section className="relative w-full pt-12 sm:pt-16 md:pt-24 pb-0 overflow-hidden bg-white">
      {/* Soft Background Accents */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-bl from-emerald-50 via-teal-50/30 to-transparent rounded-bl-full" />
        <div className="absolute -left-20 top-40 w-72 h-72 bg-emerald-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left w-full">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-4 sm:mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Infrastructure</span>
            </motion.div>

            {/* Main Title & Subtitle */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4 sm:mb-6"
            >
              Empowering Education Through <br className="hidden sm:inline" />
              <span className="text-[#0B9E50]">Modern Facilities</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-base md:text-lg font-normal leading-relaxed mb-10 max-w-lg"
            >
              From interactive smart classrooms and advanced science labs to expansive sports complexes and secure transport, we provide a safe and inspiring environment for holistic student growth.
            </motion.p>

            {/* Category Pills Removed as requested */}
          </div>

          {/* Right Column: Beautiful Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] h-full">
              {/* Image 1: Large Main (Left) */}
              <motion.div 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-3/5 h-[70%] sm:h-[80%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 bg-slate-100"
              >
                {collageImages[0] && (
                  <img src={collageImages[0]} alt="Facility 1" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              
              {/* Image 2: Top Right */}
              <motion.div 
                className="absolute right-0 top-[5%] sm:top-[10%] w-1/2 h-[40%] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-10 bg-slate-100"
              >
                {collageImages[1] && (
                  <img src={collageImages[1]} alt="Facility 2" className="w-full h-full object-cover" />
                )}
              </motion.div>

              {/* Image 3: Bottom Right */}
              <motion.div 
                className="absolute right-[5%] bottom-[5%] sm:bottom-[10%] w-[45%] h-[40%] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-30 bg-slate-100"
              >
                {collageImages[2] && (
                  <img src={collageImages[2]} alt="Facility 3" className="w-full h-full object-cover" />
                )}
              </motion.div>
              
              {/* Decorative Circle */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#0B9E50] rounded-full opacity-10 blur-xl z-0" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Global Scroll Indicator (Centered at absolute bottom) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center"
      >
        <button 
          onClick={scrollToGrid}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0B9E50] hover:border-[#0B9E50] hover:shadow-md transition-all cursor-pointer group"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
