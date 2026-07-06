"use client";

import React from "react";
import Link from "next/link";
import { Laptop, UserCircle, ListChecks, CheckCircle2, ArrowRight } from "lucide-react";

export default function AdmissionsHero({ onStartApplication }: { onStartApplication?: () => void }) {
  const steps = [
    {
      id: 1,
      title: "Class Selection",
      description: "Choose your admission pathway (Primary or Senior Secondary) and select the desired class/stream.",
      icon: Laptop,
    },
    {
      id: 2,
      title: "Personal Details",
      description: "Provide accurate student information, family details, and residential address.",
      icon: UserCircle,
    },
    {
      id: 3,
      title: "Academic Checklist",
      description: "Enter previous school records and verify the checklist of physical documents required.",
      icon: ListChecks,
    },
    {
      id: 4,
      title: "Review & Submit",
      description: "Verify all entered information, accept the school's declaration terms, and submit online.",
      icon: CheckCircle2,
    }
  ];

  const handleStart = () => {
    if (onStartApplication) {
      onStartApplication();
    } else {
      window.scrollBy({ top: 600, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#f9fafb] pt-24 pb-12 px-4 md:px-8 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Top Breadcrumb & Heading */}
        <div className="flex flex-col mb-8 md:mb-12">
          <div className="text-xs font-medium mb-3">
            <Link href="/" className="text-emerald-700 hover:underline">Home</Link>
            <span className="text-slate-400 mx-2">/</span>
            <span className="text-slate-600">Admission</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-slate-800 mb-2">
            Admission <span className="text-brand-green">Process</span>
          </h1>
          <p className="text-slate-500 font-medium text-xs md:text-sm">
            We'd love to hear from you. Reach out to us for any queries.
          </p>
        </div>

        {/* Center Process Section */}
        <div className="flex flex-col items-center w-full">
          <span className="text-[9px] md:text-[10px] font-semibold text-brand-green uppercase tracking-[0.2em] mb-2">
            STEP-BY-STEP GUIDE
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-slate-800 mb-10 text-center">
            Admission <span className="text-brand-green">Process</span>
          </h2>

          {/* Stepper Grid */}
          <div className="relative w-full max-w-5xl">
            {/* Connecting Line (hidden on mobile, visible on md+) */}
            <div className="hidden md:block absolute top-[35px] left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex flex-col items-center text-center relative z-10">
                  
                  {/* Icon Circle */}
                  <div className="relative mb-4 group cursor-default">
                    <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgb(0,0,0,0.05)] border border-slate-100 transition-transform duration-300 group-hover:scale-105">
                      <step.icon className="w-7 h-7 text-brand-green" />
                    </div>
                    {/* Number Badge */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-brand-green rounded-full flex items-center justify-center text-white text-[10px] font-semibold shadow-md shadow-emerald-500/30 border-2 border-white">
                      {step.id}
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed px-2 md:px-0">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Button */}
          <button 
            onClick={handleStart}
            className="mt-12 bg-brand-green hover:bg-[#0d924c] text-white px-6 py-2.5 rounded-full font-semibold text-xs md:text-sm flex items-center gap-2 transition-colors shadow-lg shadow-brand-green/20"
          >
            Start Application <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
