"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LeadershipMessages() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  } as const;

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24  flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col gap-24 md:gap-32">
        
        {/* 1. MD's Message Block */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full flex flex-col items-start"
        >
          {/* Header Area (Above Image and Quotes) */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8 select-none">
            <span className="text-[9px] md:text-[10px] font-semibold md:font-black text-[#0fa958] uppercase tracking-[0.2em] block mb-2">
              FROM THE DESK
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-900 tracking-tight leading-none">
              MD&apos;s <span className="text-[#0fa958]">Message</span>
            </h2>
          </motion.div>

          {/* Two Column Layout (Image & Quotes) */}
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-16">
            {/* Left Side: Photo Frame */}
            <motion.div variants={itemVariants} className="w-64 h-80 md:w-72 md:h-[360px] relative shrink-0">
              {/* Bottom-left offset green curved decorative border line */}
              <div className="absolute border-l-2 border-b-2 border-[#0fa958] rounded-bl-[20px] md:rounded-bl-[32px] -left-4 -bottom-4 w-full h-full -z-10" />
              
              {/* Main Image */}
              <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
                <img
                  src="/images/principal.png"
                  alt="MD Portrait"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right Side: Text & Signature */}
            <div className="flex-grow flex flex-col justify-start text-left pt-2">
              {/* Paragraphs with left green border */}
              <motion.div variants={itemVariants} className="flex flex-col gap-5 mb-8">
                <div className="border-l-2 border-[#0fa958] pl-5 md:pl-6">
                  <p className="italic text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed">
                    &quot;Education is not just about acquiring knowledge; it&apos;s about transforming lives and building character. At Green view, we believe in nurturing not just academic excellence, but also moral values, leadership qualities, and social responsibility.&quot;
                  </p>
                </div>
                <div className="border-l-2 border-[#0fa958] pl-5 md:pl-6">
                  <p className="italic text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed">
                    &quot;When I founded Green view in 1986, my vision was simple yet profoundâ€”to create an institution that would not only impart quality education but also shape responsible citizens who contribute positively to society. Today, as I look back at our journey, I am proud to see how this vision has become a reality. Our students have excelled academically and grown into compassionate leaders, innovative thinkers, and responsible global citizens.&quot;
                  </p>
                </div>
              </motion.div>

              {/* Signature Name & Role */}
              <motion.div variants={itemVariants} className="pl-6 select-none border-l-2 border-transparent">
                <span className="block font-semibold md:font-black text-slate-800 text-sm md:text-base">
                  Sh. Devraj Sharma
                </span>
                <span className="block text-xs font-normal md:font-semibold text-[#0fa958] mt-1">
                  Managing Director, Green view SR. SEC. School, Kangra
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 2. Principal's Message Block */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full flex flex-col items-start"
        >
          {/* Header Area (Above Image and Quotes) */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8 select-none">
            <span className="text-[9px] md:text-[10px] font-semibold md:font-black text-[#0fa958] uppercase tracking-[0.2em] block mb-2">
              FROM THE DESK
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-900 tracking-tight leading-none">
              Principals <span className="text-[#0fa958]">Message</span>
            </h2>
          </motion.div>

          {/* Two Column Layout (Image & Quotes) */}
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-16">
            {/* Left Side: Photo Frame */}
            <motion.div variants={itemVariants} className="w-64 h-80 md:w-72 md:h-[360px] relative shrink-0">
              {/* Bottom-left offset green curved decorative border line */}
              <div className="absolute border-l-2 border-b-2 border-[#0fa958] rounded-bl-[20px] md:rounded-bl-[32px] -left-4 -bottom-4 w-full h-full -z-10" />
              
              {/* Main Image */}
              <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
                <img
                  src="/images/principal.png"
                  alt="Principal Portrait"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right Side: Text & Signature */}
            <div className="flex-grow flex flex-col justify-start text-left pt-2">
              {/* Paragraphs with left green border */}
              <motion.div variants={itemVariants} className="flex flex-col gap-5 mb-8">
                <div className="border-l-2 border-[#0fa958] pl-5 md:pl-6">
                  <p className="italic text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed">
                    &quot;Education is not just about acquiring knowledge; it&apos;s about transforming lives and building character. At Green view, we believe in nurturing not just academic excellence, but also moral values, leadership qualities, and social responsibility.&quot;
                  </p>
                </div>
                <div className="border-l-2 border-[#0fa958] pl-5 md:pl-6">
                  <p className="italic text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed">
                    &quot;When I founded Green view in 1986, my vision was simple yet profoundâ€”to create an institution that would not only impart quality education but also shape responsible citizens who contribute positively to society. Today, as I look back at our journey, I am proud to see how this vision has become a reality. Our students have excelled academically and grown into compassionate leaders, innovative thinkers, and responsible global citizens.&quot;
                  </p>
                </div>
              </motion.div>

              {/* Signature Name & Role */}
              <motion.div variants={itemVariants} className="pl-6 select-none border-l-2 border-transparent">
                <span className="block font-semibold md:font-black text-slate-800 text-sm md:text-base">
                  Mr. Sandeep Sharma
                </span>
                <span className="block text-xs font-normal md:font-semibold text-[#0fa958] mt-1">
                  Principal, Green view SR. SEC. School, Kangra
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

