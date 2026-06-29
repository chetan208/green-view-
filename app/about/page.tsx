"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TimelineSection from "@/components/about/TimelineSection";
import CoursesSection from "@/components/about/CoursesSection";
import AwardsSection from "@/components/about/AwardsSection";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 flex flex-col gap-8">
        
        {/* Top Header Section */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-slate-500">
            <Link href="/" className="text-[#0fa958] hover:underline">Home</Link> / <span>About</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            About <span className="text-[#147a42]">Us</span>
          </h1>
          <p className="text-slate-600 font-medium text-sm md:text-base">
            We&apos;d love to hear from you. Reach out to us for any queries.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start mt-2">
          
          {/* Left Column (Image & UDISE) */}
          <div className="flex flex-col gap-6">
            {/* Image Container with White Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-3 md:p-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-50"
            >
              <div className="relative w-full aspect-[4/3] rounded-[1.25rem] overflow-hidden bg-slate-100">
                <img 
                  src="https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="School Campus"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
            
            {/* UDISE Code Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full bg-[#10a856] text-white py-3 md:py-4 rounded-2xl text-center shadow-lg shadow-emerald-600/20 hover:bg-[#0e964d] transition-colors"
            >
              <span className="font-bold tracking-wide text-sm md:text-base lg:text-lg">
                UDISE CODE - 02021601708
              </span>
            </motion.div>
          </div>

          {/* Right Column (Text Content) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 pt-2 lg:pt-8"
          >
            <span className="text-[#10a856] font-bold text-xs md:text-sm uppercase tracking-[0.2em]">
              INSPIRING EXCELLENCE SINCE 1986
            </span>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-[1.3] tracking-tight">
              A school committed to academic excellence, discipline, values, and overall student development.
            </h2>
            
            <div className="flex flex-col gap-4 text-slate-600 text-sm md:text-base leading-relaxed font-medium mt-1">
              <p>
                Green View Senior Secondary School, Kangra, was established with a vision to provide quality education in a nurturing environment. The school focuses on strong academics, moral values, discipline, communication, and overall development of students.
              </p>
              <p>
                Our goal is to help every child become confident, responsible, respectful, and ready for future challenges. A trusted private senior secondary school focused on academic excellence, discipline, values and modern parent communication.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Courses Section */}
      <CoursesSection />

      {/* Awards & Achievements Section */}
      <AwardsSection />
    </div>
  );
}
