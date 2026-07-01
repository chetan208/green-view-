"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HighSchoolFacilities() {
  const cards = [
    {
      title: "Science Laboratories",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Computer Center",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Sports Complex",
      image: "https://images.unsplash.com/photo-1576624302685-618a38525b68?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Digital Library",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=500",
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
    <section className="w-full py-10 px-6 md:px-12 lg:px-24 bg-[#e8fbf0] flex justify-center overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col">
        
        {/* Subtitle */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] md:text-xs font-semibold md:font-black text-slate-800 uppercase tracking-[0.25em] text-center mb-3 select-none"
        >
          CHOOSE GREEN VIEW?
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
            className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-900 tracking-tight text-center flex-1"
          >
            FACILITIES
          </motion.h2>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="#facilities"
              className="flex items-center gap-1 font-semibold md:font-bold text-slate-900 hover:text-emerald-700 text-sm md:text-xl transition-colors"
            >
              See All
              <span className="text-sm">▸</span>
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
              transition={{ duration: 0.3 }}
              className="group flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Container */}
              <div className="py-5 px-4 text-center select-none bg-white">
                <span className="text-slate-900 font-semibold md:font-extrabold text-sm md:text-base tracking-wide block">
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
