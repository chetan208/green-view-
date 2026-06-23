"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const images = [
    "/images/hero.png",
    "/images/classroom.png",
    "/images/robotics.png",
    "/images/library.png",
    "/images/study.png",
    "/images/art.png",
  ];

  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section className="w-full pt-20 md:pt-28 pb-16 px-6 md:px-12 lg:px-24 bg-white flex justify-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Information Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-0 pb-4 lg:py-4"
        >
          
          {/* Badge: Inspiring Excellence Since 1986 */}
          <motion.div 
            variants={itemVariants}
            className="text-[10px] md:text-xs font-bold text-[#0fa958] uppercase tracking-[0.2em] mb-4.5 select-none"
          >
            Inspiring Excellence Since 1986
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-[#0fa958]">Green view</span> <br />
            Sr. Sec. School
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-slate-500 text-sm md:text-base max-w-md mb-8 leading-relaxed font-semibold"
          >
            A trusted private senior secondary school focused on academic excellence, discipline, values and modern parent communication.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="#admission"
                className="inline-flex items-center justify-center gap-2 bg-[#0fa958] text-white hover:bg-emerald-700 px-6 md:px-8 py-3.5 rounded-full font-bold text-xs md:text-sm tracking-wide transition-all duration-300 shadow-md shadow-emerald-600/10 w-full sm:w-auto"
              >
                Admission Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="#about"
                className="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 px-6 md:px-8 py-3.5 rounded-full font-bold text-xs md:text-sm tracking-wide transition-all duration-300 text-center w-full sm:w-auto"
              >
                About Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Ratings & Families Proof Row */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4 flex-wrap relative"
          >
            {/* Laptop Icon Floating above the avatars */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-slate-50/50 p-2 rounded-xl border border-emerald-100/50 opacity-40"
            >
              <Laptop className="w-4 h-4 text-emerald-500" />
            </motion.div>

            {/* Avatars */}
            <div className="flex -space-x-2.5">
              {[
                { name: "A", bg: "bg-orange-500" },
                { name: "R", bg: "bg-blue-600" },
                { name: "P", bg: "bg-emerald-500" },
                { name: "N", bg: "bg-purple-600" },
                { name: "+5k", bg: "bg-emerald-800" },
              ].map((av, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, zIndex: 10 }}
                  className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white cursor-default select-none ${av.bg}`}
                >
                  {av.name}
                </motion.div>
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
          </motion.div>

        </motion.div>

        {/* Right Slideshow Column */}
        <div className="flex-1 w-full flex justify-center relative select-none">
          
          {/* Main Rounded Image Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-8 md:border-[12px] border-white shadow-xl bg-slate-50"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIdx}
                src={images[currentImageIdx]}
                alt="Green View School Campus"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          {/* Overlapping Badge: Admissions Open (Bottom-Left) */}
          <motion.div 
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-6 left-2 md:-left-6 z-20 bg-[#0fa958] text-white w-20 h-20 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-4 md:border-[6px] border-white select-none cursor-pointer"
          >
            <span className="text-[10px] md:text-sm font-black tracking-tight leading-none">
              2026-27
            </span>
            <span className="text-[6px] md:text-[8px] font-black uppercase tracking-wider mt-1 leading-none text-emerald-100">
              Admissions
            </span>
            <span className="text-[6px] md:text-[8px] font-black uppercase tracking-wider leading-none text-emerald-100">
              Open Now
            </span>
          </motion.div>

          {/* Offset Badge: Board Results (Bottom-Right) */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            whileHover={{ y: -3 }}
            className="absolute -bottom-4 md:-bottom-8 right-2 md:-right-6 z-20 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-lg border border-slate-100/70 flex flex-col max-w-[130px] md:max-w-[170px] select-none cursor-pointer"
          >
            <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Board Results 2024-25
            </span>
            <span className="text-sm md:text-lg font-black text-emerald-700 mt-1 leading-none">
              94.2% avg
            </span>
            <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase mt-1">
              Class X & XII
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
