"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CoursesSection() {
  const courses = [
    {
      tag: "FOUNDATIONAL",
      title: "Nursery – Class V",
      description: "Play-based learning, phonics, number sense, motor skills, Hindi & English readiness.",
      href: "/academics/primary",
      features: [
        "Activity corners & circle time",
        "Early reading programme",
        "Art, music & PE"
      ]
    },
    {
      tag: "HIGH SCHOOL",
      title: "Class VI – X",
      description: "Strong core in English, Hindi, Maths, EVS, with value education and computers.",
      href: "/academics/high-school",
      features: [
        "Olympiad practice",
        "Reading & handwriting focus",
        "Project-based learning"
      ]
    },
    {
      tag: "SENIOR SECONDARY",
      title: "Class XI – XII",
      description: "CBSE curriculum with Science, Commerce, Humanities streams in XI-XII.",
      href: "/academics/senior",
      features: [
        "Physics / Chem / Bio / CS labs",
        "Board exam mentoring",
        "Career counselling"
      ]
    }
  ];

  return (
    <section className="w-full bg-transparent py-10 md:py-16 px-4 md:px-8 lg:px-12 flex justify-center border-t border-slate-200/50">
      <div className="max-w-6xl w-full flex flex-col gap-8 md:gap-10">
        
        {/* Centered Top Title */}
        <div className="w-full flex justify-center">
           <h2 className="text-2xl md:text-3xl font-medium md:font-bold tracking-[0.15em] uppercase">
             <span className="text-slate-900">OUR</span> <span className="text-brand-green">COURSES</span>
           </h2>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <span className="text-brand-green font-medium md:font-semibold text-[10px] md:text-xs uppercase tracking-[0.2em]">
            ACADEMICS • HPBOSE
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-[44px] font-medium md:font-bold text-slate-900 tracking-tight leading-[1.2] max-w-2xl">
            A structured CBSE path from Nursery to Class XII
          </h3>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {courses.map((course, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[1.5rem] p-5 md:p-6 lg:p-8 flex flex-col shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-brand-green font-medium md:font-semibold text-[10px] uppercase tracking-widest mb-4 block">
                {course.tag}
              </span>
              <h4 className="text-2xl font-medium md:font-semibold text-slate-800 mb-4 tracking-tight">
                {course.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium h-auto md:min-h-[4rem]">
                {course.description}
              </p>
              
              <ul className="flex flex-col gap-3.5 mb-10 flex-grow">
                {course.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-slate-600 text-xs md:text-sm font-medium">
                    <span className="text-slate-400 font-medium md:font-semibold mt-[1px]">•</span> 
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                href={course.href}
                className="bg-brand-green hover:bg-[#0e964d] text-white rounded-xl py-3 px-6 font-medium text-xs md:text-sm tracking-wide transition-colors flex items-center justify-center gap-2 mt-auto w-max shadow-sm shadow-brand-green/20 cursor-pointer"
              >
                Explore Program <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="w-full bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center text-xs md:text-sm text-slate-600 font-medium">
           <p>
             <span className="font-medium md:font-semibold text-slate-800">Streams in XI-XII:</span> Science (PCM / PCB), Commerce, Humanities. NCERT textbooks.
           </p>
        </div>

      </div>
    </section>
  );
}
