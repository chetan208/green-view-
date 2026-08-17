"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { erpApi } from "@/services/erpApi";

export default function HeroSection() {
  const images = [
    "/images/hero/hero1.png",
    "/images/hero/hero2.png",
    "/images/hero/hero3.png",
    "/images/hero/hero4.png",
    "/images/hero/hero5.png",
    "/images/hero/hero6.png",
  ];

  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    erpApi.sessions.getAdmissionStatus()
      .then(res => setIsAdmissionsOpen(res.success ? res.open : false))
      .catch(() => setIsAdmissionsOpen(false));
  }, []);

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
    <section className="w-full pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        
        {/* Left Information Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full"
        >
          
          {/* Badge: Inspiring Excellence Since 1986 */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold md:font-bold text-brand-green uppercase tracking-[0.2em] mb-3 sm:mb-4.5 select-none bg-emerald-50/80 px-3.5 py-1.5 rounded-full border border-emerald-100/60"
          >
            <Sparkles className="w-3 h-3 text-brand-green" />
            Inspiring Excellence Since 1986
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold md:font-black text-slate-900 tracking-tight leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6"
          >
            <span className="text-brand-green">Green view</span> <br />
            Sr. Sec. School
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal md:font-medium text-center lg:text-left"
          >
            We believe in nurturing intelligence, knowledge, and humility while inspiring every student to strive for excellence through honest effort, strong values, and faith in God.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6 w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white hover:bg-emerald-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold md:font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md shadow-emerald-600/10 w-full sm:w-auto cursor-pointer"
              >
                Admission Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold md:font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 text-center w-full sm:w-auto cursor-pointer"
              >
                About Us
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Right Slideshow Column - ENHANCED IMAGE CONTAINER SIZING */}
        <div className="flex-1 w-full flex justify-center relative select-none mt-2 lg:mt-0">
          
          {/* Main Rounded Image Container: Increased size from max-w-md to max-w-lg/max-w-xl/max-w-2xl */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl aspect-[4/3] sm:aspect-[14/10] md:aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.75rem] overflow-hidden border-4 sm:border-8 md:border-[12px] border-white shadow-xl sm:shadow-2xl bg-slate-50"
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
          {isAdmissionsOpen && (
            <Link href="/admissions" className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 z-20">
              <motion.div 
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-brand-green text-white w-20 h-20 sm:w-26 sm:h-26 md:w-30 md:h-30 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-4 md:border-[6px] border-white select-none cursor-pointer"
              >
                <span className="text-[11px] sm:text-xs md:text-sm font-semibold md:font-black tracking-tight leading-none">
                  2026-27
                </span>
                <span className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold md:font-black uppercase tracking-wider mt-0.5 sm:mt-1 leading-none text-emerald-100">
                  Admissions
                </span>
                <span className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold md:font-black uppercase tracking-wider leading-none text-emerald-100">
                  Open Now
                </span>
              </motion.div>
            </Link>
          )}

          {/* Offset Badge: Board Results (Bottom-Right) */}
          {/* <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            whileHover={{ y: -3 }}
            className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 md:-bottom-8 md:-right-6 z-20 bg-white p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 flex flex-col max-w-[120px] sm:max-w-[140px] md:max-w-[170px] select-none"
          >
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold md:font-bold text-slate-400 uppercase tracking-wider truncate">
                Board Results
              </span>
            </div>
            <span className="text-xs sm:text-sm md:text-lg font-semibold md:font-black text-emerald-700 mt-0.5 sm:mt-1 leading-none">
              94.2% avg
            </span>
            <span className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold md:font-bold text-slate-400 uppercase mt-0.5 sm:mt-1">
              Class X & XII
            </span>
          </motion.div> */}

        </div>

      </div>
    </section>
  );
}
