"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TeacherCard from "@/components/common/TeacherCard";

import { allTeachers } from "@/data/teachers";

export default function TeachersPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 flex flex-col gap-12">
        
        {/* Top Header Section */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-slate-500">
            <Link href="/" className="text-brand-green hover:underline">Home</Link> / <span>Our Teachers</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-medium md:font-bold text-slate-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
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
            >
              <TeacherCard
                name={teacher.name}
                role={teacher.role}
                designation={teacher.designation}
                quote={teacher.quote}
                qualification={teacher.qualification}
                experience={teacher.experience}
                subjects={teacher.subjects}
                image={teacher.image}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
