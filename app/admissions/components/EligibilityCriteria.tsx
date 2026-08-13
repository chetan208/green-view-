"use client";

import React from "react";
import { Sprout, BookOpen, GraduationCap, Calendar, Info } from "lucide-react";

export default function EligibilityCriteria() {
  const criteria = [
    {
      title: "Nursery (NUR)",
      age: "3+ years as on 31st March 2026",
      details: "Entry level — no prior schooling required",
      icon: Sprout,
    },
    {
      title: "LKG",
      age: "4+ years as on 31st March 2026",
      details: "Completion of Nursery or equivalent preferred",
      icon: Sprout,
    },
    {
      title: "UKG",
      age: "5+ years as on 31st March 2026",
      details: "Completion of LKG or equivalent required",
      icon: Sprout,
    },
    {
      title: "Class I",
      age: "6+ years as on 31st March 2026",
      details: "Completion of UKG/KG from a recognized school",
      icon: BookOpen,
    },
    {
      title: "Class II – V",
      age: "As per class norms (7–10 years)",
      details: "Previous class report card and Transfer Certificate required",
      icon: BookOpen,
    },
    {
      title: "Class VI – VIII",
      age: "As per class norms (11–13 years)",
      details: "Assessment test mandatory. TC and report card from previous school required",
      icon: BookOpen,
    },
    {
      title: "Class IX – X",
      age: "As per class norms (14–15 years)",
      details: "Assessment test mandatory. Must have passed previous class from a recognized board.",
      icon: GraduationCap,
    },
    {
      title: "Class XI – XII",
      age: "As per board norms (16+ years)",
      details: "Admission based on Class X board results and stream availability.",
      icon: GraduationCap,
    }
  ];

  return (
    <section className="w-full bg-[#f9fafb] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] md:text-xs font-semibold text-brand-green uppercase tracking-[0.2em] mb-2 block">
            WHO CAN APPLY
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-800 tracking-tight">
            Eligibility <span className="text-brand-green">Criteria</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {criteria.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col overflow-hidden relative"
            >
              {/* Top Green Border */}
              <div className="w-full h-1 bg-brand-green" />

              <div className="p-6 flex flex-col h-full">
                {/* Title */}
                <div className="flex items-center gap-2 mb-4">
                  <item.icon className="w-5 h-5 text-slate-800" />
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                </div>

                {/* Info List */}
                <div className="flex flex-col gap-3 flex-grow">
                  <div className="flex items-start gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-xs font-medium leading-relaxed">
                      <strong>Age:</strong> {item.age}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-slate-500">
                    <Info className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-xs font-medium leading-relaxed">
                      {item.details}
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Admission Procedure */}
        <div className="mt-16 w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4">
            Admission Procedure & Registration
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            For play way and Nursery classes students are admitted on the basis first-come, first served for the number of seats available.
          </p>
          <p className="text-sm text-slate-600 mb-4">
            After confirmation of admission parents are required to deposit admission fee within two days otherwise seat allotted will be cancelled. Registration form is enclosed with this prospectus. 
          </p>
          <p className="text-sm text-slate-600">
            The form should be accompanied by the passport size photograph of the student, a photo copy of DOB Certificate and school leaving certificate (if applicable) and DD/Cheque/cash on account of admission fee. This amount is not refundable.
          </p>
        </div>

      </div>
    </section>
  );
}
