"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, ClipboardList, CheckCircle2 } from "lucide-react";

export default function AdmissionCards() {
  const cards = [
    {
      title: "Nursery to Class 10",
      subtitle: "Primary & High School Application",
      icon: BookOpen,
      desc: "Apply for foundational and core curriculum classes. Admissions are based on seat availability and interaction.",
      href: "/admissions/nursery-to-10",
      color: "from-[#0fa958] to-[#147a42]",
      bgLight: "bg-[#e8fbf0]",
      iconColor: "text-[#0fa958]",
      features: ["Age criteria applies for Nursery", "Previous school records needed", "Interactive session required"]
    },
    {
      title: "Class 11 & 12",
      subtitle: "Senior Secondary Application",
      icon: GraduationCap,
      desc: "Apply for Medical, Non-Medical, Commerce or Humanities streams. Admissions based on Class 10 board results.",
      href: "/admissions/senior-secondary",
      color: "from-[#0c3c86] to-[#082a5e]",
      bgLight: "bg-blue-50",
      iconColor: "text-[#0c3c86]",
      features: ["Stream selection required", "Class 10 mark sheet mandatory", "Subject counseling available"]
    }
  ];

  return (
    <section className="w-full pt-32 pb-24 px-6 md:px-12 flex justify-center bg-[#fcfcfc] relative z-20">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-8 md:p-10 flex flex-col h-full">
                {/* Header Area */}
                <div className="flex items-center gap-5 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${card.bgLight} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-8 h-8 ${card.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.title}</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1">{card.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  {card.desc}
                </p>

                {/* Features List */}
                <ul className="flex flex-col gap-3 mb-10 mt-auto">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                      <CheckCircle2 className={`w-5 h-5 ${card.iconColor} shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={card.href}
                  className={`group w-full py-4 rounded-2xl bg-gradient-to-r ${card.color} text-white font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-xl transition-all shadow-md`}
                >
                  <ClipboardList className="w-5 h-5" />
                  Proceed to Application
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
