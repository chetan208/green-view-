"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { erpApi } from "@/services/erpApi";

export default function HighSchoolHero({ images: propImages }: { images?: string[] }) {
  const [images, setImages] = useState<string[]>(propImages || []);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    erpApi.heroImages.list()
      .then((res) => {
        if (res.success && res.images && res.images.length > 0) {
          setImages(res.images.map((img: any) => img.imageUrl));
        }
      })
      .catch((err) => {
        console.error("Failed to load hero images for high school hero", err);
      });
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-6 md:pb-8 flex flex-col">
      
      {/* Hero Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
        
        {/* Left Content Column */}
        <div className="flex flex-col items-start text-left">
          
          {/* Top Breadcrumb & Tiny Header */}
          <div className="flex flex-col gap-1.5 mb-8">
            <div className="text-sm font-medium text-slate-500">
              <Link href="/" className="text-brand-green hover:underline">Home</Link> / <span>High School</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium md:font-bold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              Class VI - <span className="text-brand-green-dark">X</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs md:text-sm">
              Building a strong foundation for future success.
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium md:font-bold text-slate-900 tracking-tight leading-[1.1] mb-4">
            Empowering <br />
            the leaders of <br />
            <span className="text-brand-green relative inline-block pb-2">
              tomorrow.
              <svg className="absolute left-0 bottom-0 w-full h-[12px] text-brand-green" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 C30,10 70,0 100,5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="text-slate-500 text-xs md:text-sm font-normal md:font-medium max-w-lg mb-6 leading-relaxed">
            Empowering students in classes VI to X with an advanced curriculum, critical thinking, and holistic development to prepare them for the challenges of tomorrow. Limited seats available for Session 2026–27.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/admissions/primary-secondary"
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white hover:bg-emerald-700 px-6 md:px-7 py-3 rounded-full font-medium md:font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 shadow-md shadow-emerald-500/10 w-full sm:w-auto"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/academics/study-material"
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 px-6 md:px-7 py-3 rounded-full font-medium md:font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 w-full sm:w-auto shadow-sm"
              >
                View Study Material
                <Download className="w-4 h-4 text-slate-500" />
              </Link>
            </motion.div>
          </div>

        </div>

        {/* Right Layout with Image Slideshow */}
        <div className="relative w-full flex justify-center lg:justify-end select-none mt-6 lg:mt-0 lg:-mt-6">
          {/* Soft Green background decoration shape */}
          <div className="absolute bottom-[-8px] right-[-8px] w-[80%] h-[90%] bg-[#bbf7d0]/40 rounded-[3rem] -z-10 pointer-events-none" />
          
          {/* Framed Image Container */}
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2rem] overflow-hidden border-[10px] border-white shadow-xl bg-slate-50 z-10 lg:-translate-y-6 flex items-center justify-center">
            {images.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIdx}
                  src={images[currentImageIdx]} 
                  alt="Green View School High School"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            ) : (
              <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-xs font-medium">
                Loading...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
