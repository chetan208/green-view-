"use client";

import React from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            <Shield className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Legal Disclosures</span>
            <h1 className="text-2xl md:text-3xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-none mt-1">
              Privacy Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed flex flex-col gap-6">
          <p>
            Welcome to the Privacy Policy page of Green View Senior Secondary School. We are committed to protecting the privacy of our students, parents, alumni, and website visitors. This document explains how we collect, use, and safeguard personal information.
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              We collect personal data to process school admissions, maintain student portal access, and share academic announcements. This includes:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
              <li>Student Profile: Full name, Date of birth, Aadhaar/PAN number, academic logs, and registration history.</li>
              <li>Parent/Guardian Details: Full names, mobile numbers, occupational status, email addresses, and billing records.</li>
              <li>Portal Usage: Roll numbers, login hashes, cookies, and local session details stored to handle active sign-in status.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              2. How We Use Your Data
            </h2>
            <p>
              Your personal information is processed strictly for education management:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
              <li>To evaluate and process senior secondary admission forms.</li>
              <li>To provide daily class timetable schedules, monthly attendance data, and quarterly fee logs on the Student Portal.</li>
              <li>To contact parents regarding urgent notices, events, bus timings, or weather holiday alerts.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              3. Data Security & Storage
            </h2>
            <p>
              We prioritize data safety. Student records and portal database records are stored in encrypted cloud environments complying with state education guidelines and standard security practices. No student details are shared with external marketing agencies.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider">
              4. Contact Us
            </h2>
            <p>
              If you have any questions or require modifications to your registered details, please email us at <span className="text-brand-green font-semibold">info@greenviewschool.edu.in</span> or visit the school registration desk.
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
