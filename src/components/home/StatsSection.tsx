"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: "30+", label: "Years of Trust" },
    { value: "5,000+", label: "Students Alumni" },
    { value: "120+", label: "Expert Teachers" },
    { value: "96%", label: "Passing Rate" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="w-full bg-[#10b981] py-5 px-6 flex justify-center border-y border-emerald-400/20 shadow-inner overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center justify-center py-3 px-4 border-white/20 md:border-r last:border-r-0 max-md:border-b max-md:[&:nth-child(even)]:border-r-0 max-md:[&:nth-child(odd)]:border-r max-md:[&:nth-child(3)]:border-b-0 max-md:[&:nth-child(4)]:border-b-0"
          >
            <span className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight mb-1">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs font-bold text-emerald-50 uppercase tracking-widest">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
