"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const faqs = [
    {
      q: "What is the admission process for new students?",
      a: "Admission begins with filling out the online inquiry form or visiting the campus. Following registration, an interactive assessment is scheduled, followed by verification of required documents (birth certificate, previous reports, etc.) and fee payment to secure the seat.",
    },
    {
      q: "What curriculum does the school follow?",
      a: "Green View Sr. Sec. School is affiliated with CBSE (Central Board of Secondary Education), providing a rigorous yet balanced curriculum with modern learning tools.",
    },
    {
      q: "Does the school provide transportation?",
      a: "Yes, the school maintains a fleet of modern, GPS-enabled buses covering major residential routes. Each bus has a trained driver, a lady attendant, and first-aid kits to ensure complete security.",
    },
    {
      q: "What extracurricular activities are offered?",
      a: "We offer a wide range of extracurricular activities including sports (football, basketball, athletics), performing arts (music, dance, theater), creative writing, and STEM/robotics workshops to foster holistic student development.",
    },
    {
      q: "What are the school timings?",
      a: "For Nursery to Kindergarten, the timing is 8:30 AM to 12:30 PM. For Grade I to Grade XII, the school operates from 8:00 AM to 2:15 PM, Monday through Saturday. The second Saturday of each month is a holiday.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <section className="w-full py-12 md:py-16 px-6 md:px-12  flex justify-center overflow-hidden">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-xs font-semibold md:font-bold text-[#0fa958] uppercase tracking-[0.25em] mb-2.5"
          >
            Have Questions?
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-800 tracking-tight leading-tight"
          >
            Frequently Asked <span className="text-[#0fa958]">Questions</span>
          </motion.h2>
        </div>

        {/* Accordions List */}
        <motion.div 
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col gap-3"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden hover:border-slate-200 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold md:font-bold text-slate-800 hover:text-[#0fa958] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-sm md:text-base leading-snug pr-4 font-semibold md:font-bold">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 bg-slate-50 border border-slate-100 p-1.5 rounded-lg flex items-center justify-center"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </motion.div>
                </button>
                
                {/* Framer Motion expand height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden bg-slate-50/50"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-slate-50">
                        <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

