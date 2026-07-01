"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
  {
    year: "1986",
    title: "FOUNDATION",
    description: "School was established with a vision to provide quality education in a nurturing environment.",
  },
  {
    year: "1995",
    title: "GROWTH",
    description: "Expanded our campus and introduced new academic programs to support holistic student development.",
  },
  {
    year: "2005",
    title: "EVOLUTION",
    description: "Upgraded to Senior Secondary level, adding science and commerce streams to our curriculum.",
  },
  {
    year: "2015",
    title: "MODERNIZATION",
    description: "Integrated smart classrooms and modern technology to enhance the teaching and learning experience.",
  },
  {
    year: "2026",
    title: "JOIN US TODAY",
    description: "With a strong focus on structured governance and transparency, we continue to welcome applications from students of all backgrounds. Admissions are now open.",
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress (0 to 1) to height (0% to 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full py-10 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-[#10a856] font-semibold md:font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-4"
          >
            OUR JOURNEY
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-900 tracking-tight"
          >
            MILESTONES IN OUR <span className="text-[#10a856]">HISTORY</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-4">
          {/* Central Line Background (Light) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] bg-slate-200 -translate-x-1/2 rounded-full"></div>
          
          {/* Central Line Active Progress (Dark Green) */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-[4px] bg-[#10a856] -translate-x-1/2 rounded-full origin-top z-0"
            style={{ height: lineHeight }}
          ></motion.div>

          <div className="flex flex-col relative z-10">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between py-4 md:py-3 group">
                  
                  {/* Center Dot Active State controlled by whileInView */}
                  <motion.div 
                    initial={{ backgroundColor: "#e2e8f0", borderColor: "#fcfcfc", scale: 0.8 }}
                    whileInView={{ backgroundColor: "#10a856", borderColor: "#dcfce7", scale: 1.2 }}
                    viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-6 md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full border-[3px] shadow-sm -translate-x-1/2 md:-translate-y-1/2 z-10"
                  ></motion.div>

                  {/* Desktop Layout - Left Side */}
                  <div className={`hidden md:flex w-1/2 px-6 lg:px-10 ${isEven ? "justify-end text-right" : "justify-start text-left"}`}>
                    {isEven ? (
                      <motion.div 
                        initial={{ opacity: 0.2, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-end h-full"
                      >
                        <h3 className="text-xl lg:text-2xl font-semibold md:font-bold text-[#10a856] uppercase tracking-wider">{item.title}</h3>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0.3, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-5 lg:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-lg"
                      >
                        <div className="font-semibold md:font-extrabold text-2xl text-slate-900 mb-2">{item.year}</div>
                        <p className="text-slate-600 font-medium text-sm lg:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Desktop Layout - Right Side */}
                  <div className={`hidden md:flex w-1/2 px-6 lg:px-10 ${isEven ? "justify-start text-left" : "justify-end text-right"}`}>
                    {isEven ? (
                      <motion.div 
                        initial={{ opacity: 0.3, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-5 lg:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-lg"
                      >
                        <div className="font-semibold md:font-extrabold text-2xl text-slate-900 mb-2">{item.year}</div>
                        <p className="text-slate-600 font-medium text-sm lg:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0.2, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-start h-full"
                      >
                        <h3 className="text-xl lg:text-2xl font-semibold md:font-bold text-[#10a856] uppercase tracking-wider">{item.title}</h3>
                      </motion.div>
                    )}
                  </div>


                  {/* Mobile Layout */}
                  <div className="md:hidden flex flex-col pl-16 pr-4 w-full relative">
                    <motion.div 
                      initial={{ opacity: 0.2, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                      transition={{ duration: 0.4 }}
                      className="mb-2 mt-4"
                    >
                      <h3 className="text-lg font-semibold md:font-bold text-[#10a856] uppercase tracking-wider">{item.title}</h3>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0.3, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                      transition={{ duration: 0.4 }}
                      className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 w-full"
                    >
                      <div className="font-semibold md:font-extrabold text-xl text-slate-900 mb-2">{item.year}</div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
