"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, TestTube, Library, Activity, Bus, Palette, HeartPulse, Trophy } from "lucide-react";

export default function FacilitiesGrid() {
  const facilities = [
    {
      title: "Smart Classrooms",
      desc: "Interactive digital boards, ergonomic seating, and climate-controlled environments for focused learning.",
      icon: Monitor,
      image: "/images/smart_classroom.png",
    },
    {
      title: "Advanced Science Labs",
      desc: "State-of-the-art Physics, Chemistry, and Biology labs equipped with comprehensive instruments and safety gear.",
      icon: TestTube,
      image: "/images/science_lab.png",
    },
    {
      title: "Computer & IT Lab",
      desc: "Modern computer lab with individual workstations, programming software, and high-speed internet access.",
      icon: Monitor,
      image: "/images/computer_lab.png",
    },
    {
      title: "Knowledge Center",
      desc: "A massive library with an extensive collection of academic books, journals, fiction, and digital resources.",
      icon: Library,
      image: "/images/library.png",
    },
    {
      title: "Sports Complex",
      desc: "World-class indoor and outdoor sports facilities including Basketball, Athletics, and a multi-purpose ground.",
      icon: Trophy,
      image: "https://images.unsplash.com/photo-1505322747495-6afdd3b70760?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Transport Fleet",
      desc: "A fleet of GPS-enabled, safe school buses covering all major routes with trained staff.",
      icon: Bus,
      image: "/images/school_bus.png",
    },
    {
      title: "Art & Creative Studio",
      desc: "Dedicated creative spaces to nurture talents in fine arts, classical music, and contemporary dance.",
      icon: Palette,
      image: "/images/art.png",
    },
    {
      title: "Medical Infirmary",
      desc: "On-campus healthcare facility with a qualified nurse, emergency supplies, and regular health checkups.",
      icon: HeartPulse,
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600",
    }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    },
  };

  return (
    <section className="w-full py-20 px-6 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Explore Our Campus
          </h2>
          <p className="text-slate-500 font-normal max-w-2xl mx-auto">
            Discover the facilities that make Green View a leader in holistic education. We invest heavily in our infrastructure so our students have every resource they need to succeed.
          </p>
        </div>

        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {facilities.map((fac, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-48 w-full bg-slate-100">
                <img 
                  src={fac.image} 
                  alt={fac.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{fac.title}</h3>
                <p className="text-sm text-slate-500 font-normal leading-relaxed flex-1">
                  {fac.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
