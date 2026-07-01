"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function FormNavigation({ currentStep, totalSteps, onNext, onPrev }: FormNavigationProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 flex items-center justify-between">
      <button 
        onClick={onPrev}
        disabled={currentStep === 1}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold md:font-bold text-sm transition-colors ${
          currentStep === 1 
            ? "text-slate-300 bg-slate-50 cursor-not-allowed" 
            : "text-slate-600 bg-slate-100 hover:bg-slate-200"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <button 
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold md:font-bold text-sm bg-[#0fa958] text-white hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
      >
        {currentStep === totalSteps ? "Complete Submission" : "Next Step"}
        {currentStep !== totalSteps && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
