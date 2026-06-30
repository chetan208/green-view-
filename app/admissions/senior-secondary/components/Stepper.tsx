"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: "Stream & Class" },
  { id: 2, title: "Personal Details" },
  { id: 3, title: "Address & Bank" },
  { id: 4, title: "Academic History" },
  { id: 5, title: "Documents & Extra" },
  { id: 6, title: "Review & Submit" },
];

export default function Stepper({ currentStep }: StepperProps) {
  const progressPercentage = Math.round((currentStep / steps.length) * 100);

  return (
    <>
      {/* Desktop Stepper */}
      <div className="hidden md:block w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line Background */}
          <div className="absolute top-5 left-[5%] right-[5%] h-[2px] bg-slate-100 -z-10" />
          
          {/* Connecting Line Active */}
          <div 
            className="absolute top-5 left-[5%] h-[2px] bg-[#0fa958] -z-10 transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 90}%` }}
          />

          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex flex-col items-center gap-3 relative z-10 w-24">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                    isActive 
                      ? "bg-[#0fa958] text-white shadow-md shadow-emerald-500/20" 
                      : isCompleted 
                        ? "bg-[#0fa958] text-white" 
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className={`text-xs font-semibold text-center leading-tight ${
                  isActive ? "text-[#0fa958]" : isCompleted ? "text-slate-700" : "text-slate-400"
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden w-full bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[#0fa958] tracking-wider uppercase mb-1">
              Step {currentStep} of {steps.length}
            </span>
            <h2 className="text-lg font-black text-slate-800">
              {steps[currentStep - 1].title}
            </h2>
          </div>
          <div className="bg-emerald-50 text-[#0fa958] px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            {progressPercentage}%
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0fa958] rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </>
  );
}
