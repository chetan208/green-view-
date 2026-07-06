"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

export default function AdmissionCards({ onBack }: { onBack?: () => void }) {
  const cards = [
    {
      title: "Primary & High School",
      subtitle: "Nursery to Class X",
      description: "A strong foundation focusing on holistic growth and interactive learning aligned with the CBSE framework.",
      icon: BookOpen,
      href: "/admissions/primary-secondary",
      theme: "from-brand-green/10 to-brand-green/5",
      iconColor: "text-brand-green",
      btnColor: "bg-brand-green hover:bg-emerald-700 text-white",
      features: ["Activity-based Learning", "Smart Classrooms", "Extracurricular Focus", "Foundational Numeracy"]
    },
    {
      title: "Senior Secondary",
      subtitle: "Class XI to XII",
      description: "Specialized streams (Science, Commerce, Humanities) preparing students for board excellence and competitive exams.",
      icon: GraduationCap,
      href: "/admissions/senior-secondary",
      theme: "from-slate-900/10 to-slate-900/5",
      iconColor: "text-slate-900",
      btnColor: "bg-slate-900 hover:bg-slate-800 text-white",
      features: ["Advanced Science Labs", "Career Counseling", "Competitive Exam Prep", "Leadership Programs"]
    }
  ];

  return (
    <section className="w-full min-h-[80vh] md:min-h-screen py-10 md:py-16 px-4 md:px-8 bg-[#f9fafb] relative z-20 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto flex flex-col items-center relative w-full">
        
        {/* Back Button */}
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute left-0 top-0 flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-500 hover:text-brand-green transition-colors bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-1.5 px-3 md:p-0 rounded-full md:rounded-none shadow-sm md:shadow-none z-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        )}

        <div className="text-center mb-8 md:mb-12 mt-10 md:mt-0 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Select Your Pathway
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Choose the appropriate admission form based on your child's grade level. The application process is fully digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full max-w-4xl mx-auto">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="group relative bg-white border border-slate-200 rounded-[1.5rem] p-5 md:p-7 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Background subtle gradient */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${card.theme} rounded-bl-[4rem] -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500`} />
              
              <div className="flex items-start justify-between mb-4 md:mb-5">
                <div className="flex flex-col">
                  <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] ${card.iconColor} mb-1.5`}>
                    {card.subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-none">
                    {card.title}
                  </h3>
                </div>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center ${card.iconColor} shrink-0`}>
                  <card.icon className="w-5 h-5 md:w-5 md:h-5" />
                </div>
              </div>

              <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed mb-5 flex-1 pr-2">
                {card.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-2 mb-6">
                {card.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-center gap-2 text-[10px] md:text-[11px] font-semibold text-slate-700">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${card.iconColor} shrink-0`} />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={card.href}
                className={`mt-auto w-full py-3 md:py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-wide transition-all ${card.btnColor} shadow-md group-hover:gap-3`}
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
