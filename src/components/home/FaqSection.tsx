"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the admission procedure for the session 2026-27?",
      a: "Admission begins with filling out the online inquiry form or visiting the campus. Following registration, an interactive assessment is scheduled, followed by verification of required documents (birth certificate, previous reports, etc.) and fee payment to secure the seat.",
    },
    {
      q: "What are the school operating timings?",
      a: "For Nursery to Kindergarten, the timing is 8:30 AM to 12:30 PM. For Grade I to Grade XII, the school operates from 8:00 AM to 2:15 PM, Monday through Saturday. The second Saturday of each month is a holiday.",
    },
    {
      q: "Does the school provide safe transport facilities?",
      a: "Yes, the school maintains a fleet of modern, GPS-enabled buses covering major residential routes. Each bus has a trained driver, a lady attendant, and first-aid kits to ensure complete security.",
    },
    {
      q: "What is the teacher-to-student ratio at Green View?",
      a: "To ensure personalized attention, we maintain an average classroom ratio of 1:25. This enables our faculty to focus on the individual strengths and areas of growth for each child.",
    },
    {
      q: "What board curriculum does the school follow?",
      a: "Green View Sr. Sec. School is affiliated with CBSE (Central Board of Secondary Education), providing a rigorous yet balanced curriculum with modern learning tools.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-white flex justify-center overflow-hidden">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-emerald-600" />
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Have Questions?
            </span>
            <span className="h-px w-8 bg-emerald-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-slate-500 font-medium mt-4 max-w-lg text-xs md:text-sm"
          >
            Quickly find answers to common queries regarding admissions, schedules, fees, and campus guidelines.
          </motion.p>
        </div>

        {/* Accordions List with Staggered Scroll Reveal */}
        <motion.div 
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col gap-4"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`border rounded-3xl overflow-hidden transition-colors duration-300 ${
                  isOpen
                    ? "bg-emerald-50/30 border-emerald-200 shadow-sm"
                    : "bg-white border-slate-100 shadow-sm hover:border-slate-200"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left font-bold text-slate-800 hover:text-emerald-700 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-sm md:text-base leading-snug flex items-center gap-3 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-emerald-600" : "text-slate-400"}`} />
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? "text-emerald-600" : "text-slate-400"}`} />
                  </motion.div>
                </button>
                
                {/* Framer Motion Height collapse/expand animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 border-t border-emerald-100/50 bg-white/40">
                        <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed pl-8">
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
