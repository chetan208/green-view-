"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { facilitiesData } from "@/data/facilitiesData";

export default function FacilitiesSection() {
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section id="facilities" className="w-full py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f4fbf6] via-[#ebfbf1] to-[#f4fbf6] flex justify-center overflow-hidden">
      <div className="max-w-[1240px] w-full flex flex-col">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-10 select-none"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-[#006a37] font-bold text-xs uppercase tracking-widest border border-emerald-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Campus Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            World-Class <span className="text-[#0B9E50]">Facilities</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mt-3 font-normal">
            Equipping our students with state-of-the-art resources, modern laboratories, and vibrant spaces for holistic growth.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {facilitiesData.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col bg-white border border-slate-200/70 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* Image Header with Badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                
                {item.badge && (
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#006a37] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/40 shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Content Body */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="font-poppins font-bold text-base md:text-lg text-slate-900 group-hover:text-[#0B9E50] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Read More Redirect Link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/facilities#${item.id}`}
                    className="inline-flex items-center gap-1.5 font-bold text-xs text-[#0B9E50] group-hover:text-[#098744] transition-colors"
                  >
                    <span>Explore Facility</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Facilities CTA Button */}
        <div className="mt-12 text-center select-none">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 bg-[#0B9E50] hover:bg-[#098744] text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-full shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>View All Facilities in Detail</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
