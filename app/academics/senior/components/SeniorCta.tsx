import React from "react";
import Link from "next/link";

export default function SeniorCta() {
  return (
    <section className="w-full bg-gradient-to-r from-[#111827] via-[#093522] to-[#105630] py-20 px-6 md:px-12 flex justify-center text-center relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -bottom-48 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-48 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl w-full flex flex-col items-center relative z-10">
        <span className="text-[10px] md:text-xs font-semibold md:font-bold text-[#34d399] uppercase tracking-[0.3em] mb-4">
          2025 - 26 Session
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold md:font-extrabold text-white tracking-tight leading-tight mb-5">
          Admissions Now <span className="text-[#34d399]">Open</span>
        </h2>
        <p className="text-slate-300 md:text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
          Classes open from Nursery to Class XII. Limited seats available — apply early to secure your child&apos;s place at Green View.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#admission"
            className="bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3.5 rounded-full font-semibold md:font-bold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-emerald-900/20 flex items-center gap-2 group"
          >
            Apply for Admission
            <svg 
              className="w-4 h-4 text-emerald-600 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-3.5 rounded-full font-semibold md:font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  );
}
