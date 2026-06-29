"use client";

import React from "react";
import { motion } from "framer-motion";

const teachers = [
  {
    name: "Mrs. Neha Sharma",
    role: "Primary Coordinator",
    experience: "8+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mrs. Anshika",
    role: "Primary Coordinator",
    experience: "8+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mrs. Priya",
    role: "Primary Coordinator",
    experience: "8+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mr. Anuj",
    role: "Primary Coordinator",
    experience: "8+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mrs. Kavita Rana",
    role: "Primary Coordinator",
    experience: "8+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mr. Chetan",
    role: "Primary Coordinator",
    experience: "8+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop"
  }
];

export default function PrimaryTeachers() {
  return (
    <section className="w-full py-10 md:py-16 max-w-7xl mx-auto px-4 md:px-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
      >
        Primary Teachers
      </motion.h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {teachers.map((teacher, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-2xl border border-slate-100 p-5 md:p-6 flex flex-col items-center text-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.06)] hover:shadow-[0_8px_25px_-4px_rgba(6,81,237,0.1)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-2xl border-[4px] border-slate-50 group-hover:border-emerald-50 transition-colors duration-300">
              <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">{teacher.name}</h3>
            <div className="flex flex-wrap justify-center items-center gap-1.5 mb-3">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">{teacher.role}</span>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">{teacher.experience}</span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Subjects: <span className="text-slate-700">{teacher.subjects}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
