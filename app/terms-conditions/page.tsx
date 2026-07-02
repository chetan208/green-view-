"use client";

import React from "react";
import { Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsConditionsPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9fafb] pt-28 md:pt-36 pb-20 px-4 md:px-8 flex justify-center relative overflow-hidden">
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl w-full bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm relative z-10 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
          <div className="w-12 h-12 bg-emerald-50 text-brand-green border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Legal Disclosures</span>
            <h1 className="text-2xl md:text-3xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-none mt-1">
              Terms & Conditions
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed flex flex-col gap-6">
          <p>
            Please read these Terms and Conditions carefully. By registering a student or using the Student Portal at Green View Senior Secondary School, you agree to comply with the rules outlined below.
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              1. Accuracy of Admission Details
            </h2>
            <p>
              Parents and guardians must ensure that all details provided in the admission forms (e.g., student name, DOB, Aadhaar/PAN details, previous academic reports) are accurate. Providing false or incorrect records can lead to immediate cancellation of admission under CBSE rules.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              2. Student Portal Usage & Security
            </h2>
            <p>
              The Student Portal is designed for enrolled students and parents to view attendance logs, daily schedules, grades, and receipt records:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
              <li>Each student must maintain the confidentiality of their Roll Number and login credentials.</li>
              <li>Unauthorized access or trying to modify portal scripts/data is strictly prohibited.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              3. Fee Cycle & Late Penalties
            </h2>
            <p>
              Tuition and transport fees must be settled quarterly by the specified due date (e.g. 5th of April, July, October, and January). Late payments will attract penalties under school trust regulations.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              4. Disclaimer of Liability
            </h2>
            <p>
              While we strive to keep all timetable timings, marks, and attendance data updated on the online portal, the manual logs at the school office remain the final official records.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Last Updated: July 2026
          </div>
        </div>

      </motion.div>
    </div>
  );
}
