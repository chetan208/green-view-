"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const allTeachers = [
  {
    name: "Mrs. Neha Sharma",
    role: "Primary Coordinator",
    experience: "8+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mrs. Anshika",
    role: "Primary Teacher",
    experience: "6+ years experience",
    subjects: "English, EVS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mrs. Priya",
    role: "Middle School",
    experience: "8+ years experience",
    subjects: "Mathematics, Science",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mr. Anuj",
    role: "High School Coordinator",
    experience: "10+ years experience",
    subjects: "Physics, Mathematics",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mrs. Kavita Rana",
    role: "Senior Secondary",
    experience: "12+ years experience",
    subjects: "Chemistry, Biology",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mr. Chetan",
    role: "Sports & PE",
    experience: "6+ years experience",
    subjects: "Physical Education",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mrs. Sunita Verma",
    role: "Middle School",
    experience: "15+ years experience",
    subjects: "Hindi, Sanskrit",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Senior Secondary",
    experience: "9+ years experience",
    subjects: "Accountancy, Business",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
  }
];

export default function TeachersPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 flex flex-col gap-12">
        
        {/* Top Header Section */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-slate-500">
            <Link href="/" className="text-brand-green hover:underline">Home</Link> / <span>Our Teachers</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Our <span className="text-brand-green-dark">Teachers</span>
          </h1>
          <p className="text-slate-600 font-medium text-sm md:text-base max-w-2xl">
            Meet our dedicated and experienced faculty members who are committed to nurturing and guiding our students towards excellence.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {allTeachers.map((teacher, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-white rounded-2xl border border-slate-100 p-5 md:p-6 flex flex-col items-center text-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.06)] hover:shadow-[0_8px_25px_-4px_rgba(6,81,237,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-2xl border-[4px] border-slate-50 group-hover:border-emerald-50 transition-colors duration-300">
                <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-semibold md:font-extrabold text-slate-900 mb-2">{teacher.name}</h3>
              <div className="flex flex-wrap justify-center items-center gap-1.5 mb-3">
                <span className="text-[10px] font-semibold md:font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">{teacher.role}</span>
                <span className="text-[10px] font-semibold md:font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">{teacher.experience}</span>
              </div>
              <p className="text-xs font-normal md:font-semibold text-slate-500">
                Subjects: <span className="text-slate-700">{teacher.subjects}</span>
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
