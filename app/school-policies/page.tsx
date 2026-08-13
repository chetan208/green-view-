"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function SchoolPoliciesPage() {
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
            <BookOpen className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest block">Administration</span>
            <h1 className="text-2xl md:text-3xl font-medium md:font-bold text-brand-navy tracking-tight leading-none mt-1">
              School Policies
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed flex flex-col gap-6">
          <p>
            Green View Senior Secondary School aims to provide a safe, respectful, and productive educational environment. Our policies are designed to maintain high standards of academic discipline and character.
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium md:font-bold text-slate-800 uppercase tracking-wider">
              1. Minimum Attendance Requirement
            </h2>
            <p>
              According to CBSE regulations, students must maintain a minimum of <span className="text-brand-green font-semibold">75% attendance</span> in each academic session to be eligible to sit for final term and board examinations. Absences due to medical reasons must be accompanied by an official doctor&apos;s certificate.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium md:font-bold text-slate-800 uppercase tracking-wider">
              2. Code of Conduct & Bullying Policy
            </h2>
            <p>
              We maintain a zero-tolerance policy towards any form of bullying, ragging, verbal abuse, or physical misbehavior. Students are expected to show utmost respect to teachers, school workers, and fellow batchmates. Violations will result in disciplinary committee reviews.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium md:font-bold text-slate-800 uppercase tracking-wider">
              3. Uniform Code
            </h2>
            <p>
              Students must attend school in proper uniform:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
              <li><strong>Monday, Tuesday, Thursday, Friday:</strong> Cream color shirt (Boys and Girls), Self check Gray Pant (Boys) and trousers/skirt (Girls).</li>
              <li><strong>Wednesday and Saturday (Summer):</strong> House T-shirt with blue pajama/lower.</li>
              <li><strong>Wednesday and Saturday (Winter):</strong> Track suit.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium md:font-bold text-slate-800 uppercase tracking-wider">
              4. School Timings & Meetings
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
              <li><strong>School Timings:</strong> 9:00 a.m. to 3:00 p.m. (Summer and Winter)</li>
              <li><strong>Meeting with Principal:</strong> Parents can meet the principal on Monday and Thursday from 9:30 a.m. to 10:00 a.m.</li>
              <li>Parents can visit the school on Wednesday and Saturday during school timings.</li>
              <li><strong>PTA/SMC:</strong> P.T.A. is an integral part of school activities. Meetings take place every month.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium md:font-bold text-slate-800 uppercase tracking-wider">
              5. General Guidelines
            </h2>
            <p>
              Punctuality will be insisted upon in all dealing with the school. Unauthorised reading material is not permitted with in the premises of the school.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
              <li>Students should be always in proper dress.</li>
              <li>Parents/guardian should take care to fill in the correct date of birth of the child.</li>
              <li>Any damage to school property, caused by negligence on the part of any student is likely to be recovered from the student.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            Last Updated: July 2026
          </div>
        </div>

      </motion.div>
    </div>
  );
}
