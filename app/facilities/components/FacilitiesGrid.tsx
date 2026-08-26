"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { facilitiesData } from "@/data/facilitiesData";

export default function FacilitiesGrid() {
  return (
    <section id="facilities-grid" className="w-full py-10 md:py-16 px-6 sm:px-8 lg:px-12 bg-white relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-20">
        {facilitiesData.map((fac, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div 
              key={fac.id}
              id={fac.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-10 items-center group scroll-mt-28 md:scroll-mt-32`}
            >
              
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-100 transition-shadow duration-500">
                  <div className="aspect-[16/10] w-full relative">
                    <Image 
                      src={fac.image} 
                      alt={fac.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#0B9E50] text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                    {fac.category}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-[#0B9E50] transition-colors">
                  {fac.title}
                </h2>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-5">
                  {fac.fullDesc}
                </p>

                {fac.highlights && fac.highlights.length > 0 && (
                  <div className="w-full">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                      {fac.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0B9E50] shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-slate-700 leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
