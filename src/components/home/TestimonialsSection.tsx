"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Green view shaped my future. The values and education I received here are priceless. Now pursuing my PhD at IIT Delhi.",
      name: "Rahul Mehta",
      role: "Alumni, Batch 2018",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      quote: "The best decision we made was enrolling our children here. The teachers genuinely care about each student's growth.",
      name: "Mrs. Kavita Joshi",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      quote: "The holistic development approach here is exceptional. I gained confidence, skills, and lifelong friendships.",
      name: "Priya Verma",
      role: "Alumni, Batch 2020",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120",
    },
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-12 /50 flex justify-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 select-none">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-xs font-semibold md:font-bold text-[#0fa958] uppercase tracking-[0.25em] mb-2.5"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-800 tracking-tight leading-tight"
          >
            What Parents <span className="text-[#0fa958]">Say About Us</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid with Staggered Slide In */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white p-7 md:p-8 rounded-[20px] shadow-sm border border-slate-100/50 flex flex-col justify-between relative group hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              {/* Soft coral quote icon watermark */}
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="absolute top-4 right-6 text-red-500 text-7xl font-serif leading-none select-none"
              >
                &ldquo;
              </motion.span>

              {/* Quote Text */}
              <div className="relative z-10 pr-4 mb-6">
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  {t.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-slate-100 bg-slate-100 shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold md:font-extrabold text-slate-800 text-sm md:text-base leading-none">
                    {t.name}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold md:font-bold text-slate-400 mt-1.5 leading-none">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

