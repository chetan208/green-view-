"use client";

import React from "react";
import { Check, FlaskConical, Binary, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const streams = [
  {
    title: "Science (Medical)",
    tagline: "For students aspiring for careers in Medicine, Biotechnology, and Life Sciences.",
    icon: FlaskConical,
    themeColor: "text-brand-green bg-emerald-50 border-emerald-100",
    glowColor: "hover:shadow-emerald-500/5 hover:border-brand-green/30",
    accentColor: "bg-brand-green",
    coreSubjects: ["Biology", "Chemistry", "Physics", "English Core"],
    electives: ["Mathematics", "Physical Education", "Information Practices"],
    highlights: ["Advanced Biology & Chemistry Labs", "NEET preparation support", "Medical sciences orientation"]
  },
  {
    title: "Science (Non-Medical)",
    tagline: "For students targeting Engineering, Technology, Architecture, and Pure Sciences.",
    icon: Binary,
    themeColor: "text-brand-navy bg-brand-navy/5 border-brand-navy/10",
    glowColor: "hover:shadow-blue-500/5 hover:border-brand-navy/30",
    accentColor: "bg-brand-navy",
    coreSubjects: ["Mathematics", "Physics", "Chemistry", "English Core"],
    electives: ["Computer Science", "Physical Education", "Economics"],
    highlights: ["Advanced Physics & Coding Labs", "JEE & entrance mentorship", "Focus on analytical problem solving"]
  },
  {
    title: "Commerce",
    tagline: "For students seeking careers in Finance, Business Administration, CA, and Economics.",
    icon: Landmark,
    themeColor: "text-brand-green bg-emerald-50 border-emerald-100",
    glowColor: "hover:shadow-emerald-500/5 hover:border-brand-green/30",
    accentColor: "bg-brand-green",
    coreSubjects: ["Accountancy", "Business Studies", "Economics", "English Core"],
    electives: ["Mathematics", "Physical Education", "Information Practices"],
    highlights: ["Business model workshops", "CA & foundation guidance", "Focus on finance & entrepreneurship"]
  }
];

export default function SeniorStreams() {
  return (
    <section className="w-full py-16 md:py-24 bg-slate-50 flex justify-center border-t border-b border-slate-100">
      <div className="max-w-7xl w-full px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-brand-green font-semibold md:font-bold text-xs uppercase tracking-[0.25em]">
            CHOOSE YOUR PATH
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl">
            Specialized Streams for Class XI & XII
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mt-1 leading-relaxed">
            Our senior secondary curriculum provides structured CBSE courses to lay a solid foundation for university entrance exams and career goals.
          </p>
        </div>

        {/* Streams Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {streams.map((stream, index) => {
            const Icon = stream.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-3xl border border-slate-100 p-6 md:p-8 flex flex-col justify-between shadow-[0_2px_10px_-3px_rgba(0,0,0,0.01)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${stream.glowColor}`}
              >
                <div className="flex flex-col gap-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${stream.themeColor}`}>
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold md:font-extrabold text-slate-800 tracking-tight">
                      {stream.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-xs md:text-sm font-normal md:font-semibold leading-relaxed">
                    {stream.tagline}
                  </p>

                  <hr className="border-slate-50" />

                  {/* Core Subjects */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-slate-800 font-semibold md:font-bold text-xs uppercase tracking-wide">
                      Core Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.coreSubjects.map((sub, sIdx) => (
                        <span key={sIdx} className="bg-slate-50 text-slate-600 text-[10px] md:text-xs font-semibold md:font-bold px-3 py-1 rounded-lg border border-slate-100/50">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Elective Options */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-slate-800 font-semibold md:font-bold text-xs uppercase tracking-wide">
                      Elective Options
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.electives.map((sub, sIdx) => (
                        <span key={sIdx} className="bg-slate-50/50 text-slate-500 text-[10px] md:text-xs font-normal md:font-semibold px-2.5 py-0.5 rounded-lg border border-dashed border-slate-200">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-50" />

                  {/* Highlights */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-slate-800 font-semibold md:font-bold text-xs uppercase tracking-wide">
                      Stream Highlights
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {stream.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-slate-600 text-xs font-medium leading-relaxed">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 ${stream.accentColor}`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
