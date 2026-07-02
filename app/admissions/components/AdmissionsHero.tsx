"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";
import Image from "next/image";

export default function AdmissionsHero() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToCards = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };

  return (
    <section className="relative w-full pt-24 pb-16 md:pt-28 overflow-hidden bg-white">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0fa958]/5 blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content Area */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#0fa958]" />
            <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">Admissions Now Open 2026-27</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Begin Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0fa958] to-slate-900">Journey</span> With Us
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-slate-500 font-medium max-w-xl leading-relaxed mb-10"
          >
            We are looking for curious minds and passionate learners. Join Green View to unlock a world-class educational experience that builds character, excellence, and a global perspective.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={scrollToCards}
            className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0fa958] hover:border-[#0fa958] hover:shadow-md transition-all group cursor-pointer"
          >
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* Right Image Composition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex relative w-full h-[500px] justify-center items-center"
        >
          {/* Main Image Container */}
          <div className="relative w-full max-w-[600px] h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-8 border-white/50 z-10 bg-slate-100">
            <Image 
              src="/images/hero-students.png" 
              alt="Green View Students"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Decorative shapes behind image */}
          <div className="absolute top-10 right-10 w-full max-w-[400px] aspect-square rounded-full bg-[#0fa958]/10 -z-10 blur-2xl" />
          <div className="absolute bottom-10 left-10 w-full max-w-[300px] aspect-square rounded-full bg-slate-900/10 -z-10 blur-2xl" />
          
        </motion.div>
        
      </div>
    </section>
  );
}
