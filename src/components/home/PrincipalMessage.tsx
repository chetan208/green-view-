"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LeadershipMessages() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  } as const;

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col gap-24 md:gap-32">
        
        {/* 1. MD's Message Block */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full flex flex-col items-start"
        >
          {/* Header Area (Above Image and Quotes) */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8 select-none">
            <span className="text-[9px] md:text-[10px] font-semibold md:font-black text-brand-green uppercase tracking-[0.2em] block mb-2">
              FROM THE DESK OF DIRECTOR
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-900 tracking-tight leading-none">
              Director&apos;s <span className="text-brand-green">Message</span>
            </h2>
          </motion.div>

          {/* Two Column Layout (Image & Quotes) */}
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 lg:gap-16">
            {/* Left Side: Photo Frame - ENHANCED SIZE */}
            <motion.div variants={itemVariants} className="w-72 h-[350px] sm:w-80 sm:h-[400px] md:w-80 md:h-[420px] lg:w-88 lg:h-[440px] relative shrink-0">
              {/* Bottom-left offset green curved decorative border line */}
              <div className="absolute border-l-2 border-b-2 border-brand-green rounded-bl-[20px] md:rounded-bl-[32px] -left-4 -bottom-4 w-full h-full -z-10" />
              
              {/* Main Image */}
              <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
                <img
                  src="/images/director.png"
                  alt="Director Portrait"
                  className="w-full h-full object-cover object-[35%_top] hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'; }}
                />
              </div>
            </motion.div>

            {/* Right Side: Text & Signature */}
            <div className="flex-grow flex flex-col justify-start text-left pt-2">
              {/* Paragraphs with left green border */}
              <motion.div variants={itemVariants} className="flex flex-col gap-5 mb-8">
                <div className="border-l-2 border-brand-green pl-5 md:pl-6">
                  <p className="text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed">
                    Our School is committed to provide proper environment of education to promote intellectual, Social & Cultural Vivacity among its learners. We, here in Green View Senior Secondary School are committed to provide a stress free learning environment that will develop competency, confidence & enterprising among citizens who will promote harmony and peace in the society. Our earnest endeavor is to encourage the maximum number of students to come out with their thought & creative talents.
                  </p>
                </div>
                <div className="border-l-2 border-brand-green pl-5 md:pl-6">
                  <p className="text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed">
                    Green View Senior Secondary School was established in 2001. The school is situated near Chamunda Temple on D/sala, Malan Road, behind Govt. Sen. Sec. School Dadh, in the foot hills of majestic Dhauladhar ranges. The School has its new beautiful building with this the school student strength is likely to increase from its present strength.
                  </p>
                </div>
              </motion.div>

              {/* Signature Name & Role */}
              <motion.div variants={itemVariants} className="pl-6 select-none border-l-2 border-transparent">
                <span className="block font-semibold md:font-black text-slate-800 text-sm md:text-base">
                  Harbans Lal Koundal
                </span>
                <span className="block text-xs font-normal md:font-semibold text-brand-green mt-1">
                  Director
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 2. Principal's Message Block */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full flex flex-col items-start"
        >
          {/* Header Area (Above Image and Quotes) */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8 select-none">
            <span className="text-[9px] md:text-[10px] font-semibold md:font-black text-brand-green uppercase tracking-[0.2em] block mb-2">
              FROM THE DESK OF PRINCIPAL
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold md:font-extrabold text-slate-900 tracking-tight leading-none">
              Principal&apos;s <span className="text-brand-green">Message</span>
            </h2>
          </motion.div>

          {/* Two Column Layout (Image & Quotes) */}
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 lg:gap-16">
            {/* Left Side: Photo Frame - ENHANCED SIZE */}
            <motion.div variants={itemVariants} className="w-72 h-[350px] sm:w-80 sm:h-[400px] md:w-80 md:h-[420px] lg:w-88 lg:h-[440px] relative shrink-0">
              {/* Bottom-left offset green curved decorative border line */}
              <div className="absolute border-l-2 border-b-2 border-brand-green rounded-bl-[20px] md:rounded-bl-[32px] -left-4 -bottom-4 w-full h-full -z-10" />
              
              {/* Main Image */}
              <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
                <img
                  src="/images/principal.png"
                  alt="Principal Portrait"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'; }}
                />
              </div>
            </motion.div>

            {/* Right Side: Text & Signature */}
            <div className="flex-grow flex flex-col justify-start text-left pt-2">
              {/* Paragraphs with left green border */}
              <motion.div variants={itemVariants} className="flex flex-col gap-5 mb-8">
                <div className="border-l-2 border-brand-green pl-5 md:pl-6">
                  <p className="text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed">
                    Dear Parents and Prospective Students,
                  </p>
                  <p className="text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed mt-2">
                    Welcome to our school! We are dedicated to fostering academic excellence, character development, and holistic growth in a nurturing environment.
                  </p>
                  <p className="text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed mt-2">
                    Our institution strives to create confident, compassionate leaders equipped for future challenges through innovative teaching and a supportive community. The curriculum blends rigorous academics with extra curriculars to nurture creativity and discipline.
                  </p>
                  <p className="text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed mt-2">
                    Experienced faculty and modern facilities ensure every student realizes their potential. We emphasize values like integrity and perseverance, preparing students for global success.
                  </p>
                  <p className="text-slate-600 font-medium text-xs md:text-[13.5px] leading-relaxed mt-2">
                    We invite you to explore our prospectus and visit our campus. Together, let's build a bright future for your child.
                  </p>
                </div>
              </motion.div>

              {/* Signature Name & Role */}
              <motion.div variants={itemVariants} className="pl-6 select-none border-l-2 border-transparent mt-auto">
                <span className="block font-semibold md:font-black text-slate-800 text-sm md:text-base">
                  Chandresh Kumari
                </span>
                <span className="block text-xs font-normal md:font-semibold text-brand-green mt-1">
                  Principal
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
