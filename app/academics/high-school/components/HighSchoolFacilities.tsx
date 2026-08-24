"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HighSchoolFacilities() {
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
      image: "https://images.unsplash.com/photo-1505322747495-6afdd3b70760?auto=format&fit=crop&q=80&w=500",
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
        staggerChildren: 0.06,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#e8fbf0] flex justify-center overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col">
        
        {/* Subtitle */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] md:text-xs font-semibold md:font-bold text-slate-800 uppercase tracking-[0.25em] text-center mb-3 select-none"
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
            className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight text-center flex-1 uppercase"
          >
            FACILITIES
          </motion.h2>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/facilities"
              className="flex items-center gap-1 font-semibold text-slate-900 hover:text-emerald-700 text-sm md:text-base transition-colors"
            >
              See All
              <span className="text-xs">▸</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards Grid - Capsule Pill Style */}
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
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group flex-none w-full h-[63px] bg-[#F9FAFB] border border-zinc-200 rounded-[30px] p-[5px] pr-4 flex items-center gap-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:border-[#0B9E50] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden border border-white shrink-0 shadow-xs">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Feature Title */}
              <span className="font-poppins font-semibold md:font-bold text-[12px] md:text-[13px] text-zinc-800 leading-tight group-hover:text-[#0B9E50] transition-colors">
                {card.title}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
