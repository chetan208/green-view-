"use client";

import React, { useState } from "react";
import Stepper from "./components/Stepper";
import Step1StreamSelection from "./components/Step1StreamSelection";
import Step2PersonalDetails from "./components/Step2PersonalDetails";
import Step3AddressBank from "./components/Step3AddressBank";
import Step4AcademicHistory from "./components/Step4AcademicHistory";
import Step5Documents from "./components/Step5Documents";
import Step6Review from "./components/Step6Review";
import FormNavigation from "./components/FormNavigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SeniorSecondaryAdmissionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Back to Admissions Button */}
        <div className="w-full mb-6 print:hidden">
          <Link 
            href="/admissions" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0fa958] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admissions
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full flex flex-col">
          <div className="print:hidden">
            <Stepper currentStep={currentStep} />
          </div>
          
          <div className="w-full min-h-[400px]">
            {currentStep === 1 && <Step1StreamSelection />}
            {currentStep === 2 && <Step2PersonalDetails />}
            {currentStep === 3 && <Step3AddressBank />}
            {currentStep === 4 && <Step4AcademicHistory />}
            {currentStep === 5 && <Step5Documents />}
            {currentStep === 6 && <Step6Review onEdit={(step) => {
              setCurrentStep(step);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />}
          </div>

          <div className="print:hidden">
            <FormNavigation 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
              onNext={handleNext} 
              onPrev={handlePrev} 
            />
          </div>
        </div>
        
        {/* Footer Text */}
        <p className="text-[10px] text-slate-400 font-medium text-center mt-12 max-w-lg">
          © 2026 Green View Senior Secondary School Admission Committee. All rights reserved. <br/>
          This form adheres strictly to state regulations and regional compliance criteria for intermediate education portal systems.
        </p>

      </div>
    </div>
  );
}
