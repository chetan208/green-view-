"use client";

import React from "react";
import { Award, Database, Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  const credentials = [
    {
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
      title: "HPBOSE Affiliation",
      value: "Aff. No. 16175",
      description: "Recognized Senior Secondary School (Nursery to Class XII)",
    },
    {
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
      title: "UDISE Registry",
      value: "Code: 02010403506",
      description: "Registered with Department of School Education, India",
    },
    {
      icon: <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
      title: "Legal Status",
      value: "Regd. Society 258/01",
      description: "Managed by Green View Educational Trust & Society",
    },
  ];

  return (
    <section id="about" className="w-full py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center overflow-hidden bg-white">
      <div className="max-w-7xl w-full flex flex-col items-center gap-8 sm:gap-10 md:gap-14">
        
        {/* Top Centered Section Header: 1 single line on Desktop (lg+), natural wrap on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center w-full max-w-none"
        >
          <span className="text-[10px] md:text-xs font-semibold md:font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
            Our Story & Trust
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[42px] lg:whitespace-nowrap font-semibold md:font-extrabold text-brand-navy tracking-tight leading-tight">
            Welcome to <span className="text-brand-green">Green View</span> Sr. Sec. School
          </h2>
        </motion.div>

        {/* Content Row: Image (Left) + Director Story (Right) */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Side Column: Classroom Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full flex flex-col items-center"
          >
            <div className="w-full max-w-xl lg:max-w-2xl aspect-[4/3] sm:aspect-[14/10] md:aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 border-white shadow-xl bg-slate-50 relative group">
              <img
                src="/images/hero/hero2.png"
                alt="Green View School Campus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Side Column: Director's Desk Story */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-[1.2] flex flex-col items-start text-left w-full"
          >
            <div className="text-slate-600 text-xs md:text-sm font-normal md:font-medium leading-relaxed flex flex-col gap-4">
              <p>
                <strong className="text-brand-green text-base block mb-1">From the Desk of Director</strong>
                Our School is committed to provide proper environment of education to promote intellectual, Social & Cultural Vivacity among its learners. We, here in Green View Senior Secondary School are committed to provide a stress free learning environment that will develop competency, confidence & enterprising among citizens who will promote harmony and peace in the society. Our earnest endeavor is to encourage the maximum number of students to come out with their thought & creative talents.
              </p>
              <p>
                Green View Senior Secondary School was established in 2001. The school is situated near Chamunda Temple on D/sala, Malan Road, behind Govt. Sen. Sec. School Dadh, in the foot hills of majestic Dhauladhar ranges. The School has its new beautiful building with this the school student strength is likely to increase from its present strength.
              </p>
              <p className="mt-2 font-bold text-slate-800 italic">
                Harbans Lal Koundal<br />
                <span className="text-brand-green font-semibold text-xs not-italic">Director</span>
              </p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Centered Official Credentials / Stats Bar: Compact horizontal scroll on mobile, full grid on desktop */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex flex-col items-center mt-2 sm:mt-4 pt-6 sm:pt-8 border-t border-slate-100"
        >
          <h3 className="text-[10px] md:text-xs font-semibold md:font-bold text-slate-700 uppercase tracking-widest mb-4 sm:mb-6 text-center">
            Official Registrations & Legal Credentials
          </h3>
          
          {/* Mobile: Compact Horizontal Scroll | Desktop: Full Centered Grid */}
          <div className="w-full flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-3 sm:gap-4 md:gap-6 no-scrollbar pb-2 sm:pb-0 max-w-5xl justify-start sm:justify-center">
            {credentials.map((cred, idx) => (
              <motion.div
                key={cred.title || idx}
                className="bg-slate-50/80 border border-slate-100/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all duration-300 flex flex-col justify-between shrink-0 w-[240px] sm:w-auto"
              >
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-100/60 flex items-center justify-center shrink-0">
                    {cred.icon}
                  </div>
                  <div>
                    <h4 className="text-[9px] sm:text-[10px] font-semibold md:font-black text-slate-400 uppercase tracking-wider leading-none">
                      {cred.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold md:font-extrabold text-brand-navy leading-tight mt-1">
                      {cred.value}
                    </p>
                    <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-normal md:font-semibold leading-normal sm:leading-relaxed mt-1.5">
                      {cred.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
