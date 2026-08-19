"use client";

import React from "react";
import { motion } from "framer-motion";
import TeacherCard from "@/components/common/TeacherCard";

import { allTeachers } from "@/data/teachers";

const teachers = allTeachers.filter(t => t.designation === "Senior Secondary Teacher");

export default function SeniorTeachers() {
  return (
    <section className="w-full py-10 md:py-16 max-w-7xl mx-auto px-4 md:px-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-medium md:font-semibold text-center text-slate-900 mb-12"
      >
        Senior Secondary Teachers
      </motion.h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {teachers.map((teacher, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
    </section>
  );
}
