"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdmissionCards() {
  const cards = [
    {
      title: "Primary & High School",
      subtitle: "Nursery to Class X",
      description: "A strong foundation focusing on holistic growth, interactive learning, and core academics aligned with the CBSE framework.",
      icon: BookOpen,
      href: "/admissions/primary-secondary",
      theme: "from-[#0fa958]/10 to-[#0fa958]/5",
      iconColor: "text-[#0fa958]",
      btnColor: "bg-[#0fa958] hover:bg-emerald-700 text-white",
      features: ["Activity-based Learning", "Smart Classrooms", "Extracurricular Focus", "Foundational Numeracy & Literacy"]
    },
    {
      title: "Senior Secondary",
      subtitle: "Class XI to XII",
      description: "Specialized streams (Science, Commerce, Humanities) preparing students for board excellence and competitive examinations.",
      icon: GraduationCap,
      href: "/admissions/senior-secondary",
      theme: "from-slate-900/10 to-slate-900/5",
      iconColor: "text-slate-900",
      btnColor: "bg-slate-900 hover:bg-slate-800 text-white",
      features: ["Advanced Science Labs", "Career Counseling", "Competitive Exam Prep", "Leadership Programs"]
    }
  ];

  return (
    <section className="w-full py-20 px-6 bg-white relative z-20 -mt-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Select Your Pathway
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Choose the appropriate admission form based on your child's grade level. The application process is fully digital and seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Background subtle gradient */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${card.theme} rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500`} />
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${card.iconColor} mb-2`}>
                    {card.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center ${card.iconColor} shrink-0`}>
                  <card.icon className="w-6 h-6" />
                </div>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                {card.description}
              </p>

              <div className="flex flex-col gap-3 mb-10">
                {card.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className={`w-4 h-4 ${card.iconColor}`} />
                    {feat}
                  </div>
                ))}
              </div>

              <Link 
                href={card.href}
                className={`mt-auto w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-all ${card.btnColor} shadow-md group-hover:gap-4`}
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
