"use client";

import React from "react";
import Link from "next/link";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  const stats = [
    { value: "27+", label: "Years in education" },
    { value: "68", label: "Qualified teachers" },
    { value: "1:25", label: "Average class ratio" },
  ];

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -40 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  } as const;

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 40 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      } 
    }
  } as const;

  const rightItemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as const;

  return (
    <section id="about" className="w-full py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-white flex justify-center items-center min-h-[90vh] overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* Left Side Column: Image, Established Badge & View More */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={leftColumnVariants}
          className="flex-1 w-full flex flex-col items-center relative"
        >
          
          {/* Established Floating Badge */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
            whileHover={{ y: -2 }}
            className="absolute top-4 left-4 md:-left-4 z-20 bg-white/95 backdrop-blur-sm p-3 px-4 rounded-2xl shadow-md border border-slate-100/80 flex flex-col cursor-pointer select-none"
          >
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              Established
            </span>
            <span className="text-sm font-black text-slate-800 mt-1 leading-none">
              1998 <span className="text-[#0fa958]">•</span> <span className="text-[#0fa958]">Kangra</span>
            </span>
          </motion.div>

          {/* Classroom Image Container */}
          <div className="w-full max-w-lg aspect-[4/3.2] rounded-[1.25rem] md:rounded-[2.2rem] overflow-hidden border border-slate-100 shadow-xl bg-slate-50 relative group mb-6">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
              alt="Green View Classroom Lecture"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* View More pill button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#0fa958] text-white hover:bg-emerald-700 px-6 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all shadow-md"
          >
            View More
          </motion.button>
        </motion.div>

        {/* Right Side Column: Story Content */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={rightColumnVariants}
          className="flex-[1.2] flex flex-col items-start text-left w-full"
        >
          
          {/* Subtitle */}
          <motion.span variants={rightItemVariants} className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
            Our Story
          </motion.span>

          {/* Main Heading */}
          <motion.h2 variants={rightItemVariants} className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Welcome to <span className="text-[#0fa958]">Green View</span> <br />
            Sr. Sec. School
          </motion.h2>

          {/* Description */}
          <motion.p variants={rightItemVariants} className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed mb-6">
            Green View Senior Secondary School was established in ___ by ______ with a vision to provide quality education in a nurturing environment. Affiliated with HPBOSE, the school has grown into a trusted institution for students from Nursery to XII. With experienced faculty, well-equipped labs, sports facilities, and a strong focus on academics and values, Green View has been shaping confident and responsible learners for over 27 years.
          </motion.p>

          {/* Testimonial Quote Box */}
          <motion.div 
            variants={rightItemVariants}
            className="w-full bg-[#f8fafc] border border-slate-100 p-5 rounded-3xl mb-6 relative hover:shadow-sm transition-shadow duration-300"
          >
            <Quote className="w-8 h-8 text-emerald-500/10 absolute top-4 left-4" />
            <div className="pl-6">
              <p className="text-slate-600 font-semibold italic text-xs md:text-sm leading-relaxed mb-3">
                &quot;Green view didn&apos;t just teach you how to study — it taught you how to think, how to lead, and how to stay grounded.&quot;
              </p>
              <span className="block font-black text-slate-700 text-[10px] md:text-xs">
                Chetan kumar - <span className="text-slate-400 font-semibold">Head Boy, 2025-26</span>
              </span>
            </div>
          </motion.div>

          {/* Stats Bar Container */}
          <motion.div 
            variants={rightItemVariants}
            className="w-full grid grid-cols-3 gap-4 border border-slate-100 rounded-3xl p-4 bg-slate-50/50 mb-6 text-center"
          >
            {stats.map((s, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center cursor-default"
              >
                <span className="text-lg md:text-xl font-black text-slate-800 leading-none mb-1">
                  {s.value}
                </span>
                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={rightItemVariants} className="flex items-center gap-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#admission"
                className="bg-[#0fa958] text-white hover:bg-emerald-700 px-6 py-3 rounded-full font-bold text-xs tracking-wide transition-all shadow-md block"
              >
                Talk to Admissions
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#academics"
                className="bg-white border border-slate-200 text-slate-600 hover:border-emerald-600 hover:text-emerald-600 px-6 py-3 rounded-full font-bold text-xs tracking-wide transition-all block"
              >
                See Academics
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
