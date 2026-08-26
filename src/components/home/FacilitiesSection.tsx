"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
              transition={{ duration: 0.3 }}
              className="flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors duration-150 cursor-pointer"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              </div>

              {/* Content Body */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="font-poppins font-bold text-base md:text-lg text-slate-900 leading-snug mb-2">
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
                    className="inline-flex items-center gap-1.5 font-bold text-xs text-[#0B9E50] hover:text-[#098744] transition-colors"
                  >
                    <span>Explore Facility</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
            className="inline-flex items-center gap-2 bg-[#0B9E50] hover:bg-[#098744] text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-full shadow-md transition-colors"
          >
            <span>View All Facilities in Detail</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
