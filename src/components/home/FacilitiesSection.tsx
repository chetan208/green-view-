"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FacilitiesSection() {
  // Facilities cards directly integrated from Academics sections
  const cards = [
    {
      title: "Science Laboratories",
      image: "/images/science_lab.png",
    },
    {
      title: "Computer Center",
      image: "/images/computer_lab.png",
    },
    {
      title: "Sports Complex",
      image: "https://images.unsplash.com/photo-1576624302685-618a38525b68?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Digital Library",
      image: "/images/library.png",
    },
  ];

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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section id="facilities" className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#ebfbf1] flex justify-center overflow-hidden">
      <div className="max-w-[1200px] w-full flex flex-col">
        
        {/* Subtitle */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] md:text-xs font-semibold md:font-bold text-slate-800 uppercase tracking-[0.15em] text-center mb-2 select-none"
        >
          Choose Green View?
        </motion.span>

        {/* Title and See All row */}
        <div className="flex items-center justify-between mb-8 relative select-none">
          {/* Empty spacer on the left to help centering on desktop */}
          <div className="hidden md:block w-20" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-[40px] font-bold md:font-extrabold text-[#0B1A28] tracking-tight text-center flex-1 uppercase"
          >
            FACILITIES
          </motion.h2>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/facilities"
              className="flex items-center gap-1 font-semibold md:font-bold text-slate-900 hover:text-emerald-700 text-sm md:text-base transition-colors"
            >
              See All
              <span className="text-xs">▸</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col bg-white border border-slate-100/50 rounded-[20px] overflow-hidden hover:shadow-lg transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Container */}
              <div className="py-4 md:py-5 px-4 text-center select-none flex items-center justify-center bg-white min-h-[60px] md:min-h-[70px]">
                <span className="text-[#0B1A28] font-bold text-sm md:text-[15px] tracking-tight group-hover:text-[#0B9E50] transition-colors">
                  {card.title}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
