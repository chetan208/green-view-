"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function AdmissionFaqs() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) => 
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqs = [
    {
      question: "What is the admission process for new students?",
      answer: "The admission process is entirely online. First, submit the application form through this portal. Then, you will be invited to visit the school for physical document verification. Upon approval, you can complete the fee payment to secure the admission."
    },
    {
      question: "What curriculum does the school follow?",
      answer: "We follow the CBSE curriculum, focusing on a holistic and interactive learning approach that balances strong core academics with extracurricular activities."
    },
    {
      question: "What is the registration fee?",
      answer: "The registration fee is a nominal amount required to process your application and is non-refundable. Please refer to our detailed fee structure section for exact amounts for each class."
    },
    {
      question: "Does the school provide transportation?",
      answer: "Yes, we provide safe and secure school bus facilities covering all major routes across the city. The buses are equipped with essential safety measures for a secure commute."
    },
    {
      question: "What are the school timings?",
      answer: "The standard school timings are from 8:00 AM to 2:00 PM, Monday to Saturday. However, timings may vary slightly for pre-primary classes."
    },
    {
      question: "Can I visit the school before applying?",
      answer: "Absolutely! We encourage parents to visit the campus during working hours (9:00 AM - 4:00 PM) to take a campus tour and speak with our admission counselors."
    }
  ];

  return (
    <section className="w-full bg-[#f9fafb] py-20 px-4 md:px-8 border-t border-slate-200/50">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] md:text-xs font-semibold text-brand-green uppercase tracking-[0.2em] mb-2 block">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-800 tracking-tight">
            Frequently Asked <span className="text-brand-green">Questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="w-full flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                >
                  <span className="text-sm font-semibold text-slate-800 pr-8">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 md:px-6 pb-6 pt-2">
                        <div className="w-full h-px bg-slate-100 mb-4" />
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
