"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FacilitiesSection() {
  const cards = [
    {
      title: "Holistic Education",
      image: "https://images.unsplash.com/photo-1577896851231-70ee18881754?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Smart Classrooms",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Global Curriculum",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Future Ready Skills",
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=500",
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
    <section id="facilities" className="w-full py-10 px-6 md:px-12 lg:px-24 bg-[#d5f0e3] flex justify-center overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col">
        
        {/* Subtitle */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-[0.25em] text-center mb-3 select-none"
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
            className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center flex-1"
          >
            Why Learn With Us?
          </motion.h2>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="#events"
              className="flex items-center gap-1 font-bold text-slate-900 hover:text-emerald-700 text-sm md:text-base transition-colors"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col bg-[#1e293b] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-emerald-800/10 hover:shadow-xl cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-800">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Container */}
              <div className="py-4 px-4 text-center select-none">
                <span className="text-white font-extrabold text-sm md:text-base tracking-tight block">
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
