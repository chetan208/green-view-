"use client";

import React from "react";
import Link from "next/link";
import { Award, Database, Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  const stats = [
    { value: "27+", label: "Years in education" },
    { value: "68", label: "Qualified teachers" },
    { value: "1:25", label: "Average class ratio" },
  ];

  const credentials = [
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      title: "HPBOSE Affiliation",
      value: "Aff. No. 14382",
      description: "Recognized Senior Secondary School (Nursery to Class XII)",
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-600" />,
      title: "UDISE Registry",
      value: "Code: 02010403506",
      description: "Registered with Department of School Education, India",
    },
    {
      icon: <Scale className="w-5 h-5 text-emerald-600" />,
      title: "Legal Status",
      value: "Regd. Society 258/01",
      description: "Managed by Green View Educational Trust & Society",
    },
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
    <section id="about" className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 flex justify-center items-center overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side Column: Image, Established Badge & View More */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={leftColumnVariants}
          className="flex-1 w-full flex flex-col items-center relative lg:sticky lg:top-24"
        >
          
          {/* Established Floating Badge */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            className="absolute top-4 left-4 md:-left-4 z-20 bg-white/95 backdrop-blur-sm p-3 px-4 rounded-2xl shadow-md border border-slate-100/80 flex flex-col select-none"
          >
            <span className="text-[8px] font-semibold md:font-bold text-slate-400 uppercase tracking-widest leading-none">
              Established
            </span>
            <span className="text-sm font-semibold md:font-black text-slate-800 mt-1 leading-none">
              1998 <span className="text-brand-green">•</span> <span className="text-brand-green">Kangra</span>
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

        </motion.div>

        {/* Right Side Column: Story & Official Credentials */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={rightColumnVariants}
          className="flex-[1.2] flex flex-col items-start text-left w-full"
        >
          
          {/* Subtitle */}
          <motion.span variants={rightItemVariants} className="text-[10px] md:text-xs font-semibold md:font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
            Our Story & Trust
          </motion.span>

          {/* Main Heading */}
          <motion.h2 variants={rightItemVariants} className="text-3xl md:text-4xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Welcome to <span className="text-brand-green">Green View</span> <br />
            Sr. Sec. School
          </motion.h2>

          {/* Description */}
          <motion.p variants={rightItemVariants} className="text-slate-500 text-xs md:text-sm font-normal md:font-semibold leading-relaxed mb-6">
            Green View Senior Secondary School was established in 1998 with a vision to provide quality education in a nurturing environment. Affiliated with HPBOSE, the school has grown into a trusted institution for students from Nursery to XII. With experienced faculty, well-equipped labs, sports facilities, and a strong focus on academics and values, Green View has been shaping confident and responsible learners for over 27 years.
          </motion.p>

          {/* Official Registrations Section */}
          <motion.div variants={rightItemVariants} className="w-full mt-4 lg:mt-6">
            <h3 className="text-[10px] md:text-xs font-semibold md:font-bold text-slate-700 uppercase tracking-widest mb-4">
              Official Registrations & Legal Credentials
            </h3>
            
            {/* Credentials Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {credentials.map((cred, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, borderColor: "#a7f3d0" }}
                  className="bg-slate-50/70 border border-slate-100 hover:border-emerald-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-md cursor-default flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      {cred.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-semibold md:font-black text-slate-400 uppercase tracking-wider leading-none">
                        {cred.title}
                      </h4>
                      <p className="text-xs font-semibold md:font-extrabold text-brand-navy leading-tight mt-1.5">
                        {cred.value}
                      </p>
                      <p className="text-[9.5px] text-slate-500 font-normal md:font-semibold leading-normal mt-2">
                        {cred.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          
        </motion.div>

      </div>
    </section>
  );
}

