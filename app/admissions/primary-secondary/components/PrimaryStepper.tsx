"use client";

import React from "react";
import { Check } from "lucide-react";

interface PrimaryStepperProps {
  currentStep: number;
}

export default function PrimaryStepper({ currentStep }: PrimaryStepperProps) {
  const steps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Family" },
    { num: 3, label: "Academic" },
    { num: 4, label: "Contact" },
    { num: 5, label: "Review" }
  ];

  return (
    <div className="w-full mb-5 md:mb-8 overflow-x-auto pb-4 hide-scrollbar">
      <div className="min-w-[600px] flex items-center justify-between relative px-2">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full" />
        
        <div 
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-[#0fa958] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 48px)` }}
        />

        {steps.map((step, index) => {
          const isCompleted = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <div key={step.num} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-normal md:font-semibold transition-all duration-300 shadow-sm ${
                  isCompleted ? "bg-[#0fa958] text-white ring-4 ring-emerald-50" :
                  isCurrent ? "bg-[#0fa958] text-white ring-4 ring-emerald-100 scale-110 shadow-emerald-500/30" :
                  "bg-white text-slate-400 border-2 border-slate-200"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.num}
              </div>
              <span className={`text-xs font-normal md:font-semibold whitespace-nowrap transition-colors duration-300 ${
                isCurrent ? "text-emerald-700" :
                isCompleted ? "text-slate-700" :
                "text-slate-400"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
