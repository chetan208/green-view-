"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { PrimaryAdmissionProvider, usePrimaryAdmissionContext } from "./context/PrimaryAdmissionContext";
import PrimaryStepper from "./components/PrimaryStepper";
import PrimaryFormNavigation from "./components/PrimaryFormNavigation";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2PersonalFamily from "./steps/Step2PersonalFamily";
import Step3AcademicActivities from "./steps/Step3AcademicActivities";
import Step4Contact from "./steps/Step4Contact";
import Step5Review from "./steps/Step5Review";
import PrimaryPrintableForm from "./components/PrimaryPrintableForm";

function PrimarySecondaryAdmissionContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 5;

  const { data, updateData } = usePrimaryAdmissionContext();

  const handleNext = () => {
    let isValid = true;

    if (currentStep === 1) {
      if (!data.photoPreview || !data.selectedClass || !data.studentName || !data.sex) isValid = false;
    } else if (currentStep === 2) {
      if (!data.dateOfBirthFigures || !data.motherTongue || !data.religion || !data.fatherName || !data.motherName) isValid = false;
    } else if (currentStep === 3) {
      // Academic / activities fields are optional as nursery students might not have previous schools
    } else if (currentStep === 4) {
      if (!data.presentAddress || !data.permanentAddress) isValid = false;
    } else if (currentStep === 5) {
      if (!data.acceptedDeclaration) isValid = false;
    }

    if (!isValid) {
      updateData({ showErrors: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    updateData({ showErrors: false });

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === totalSteps) {
      console.log("=== PRIMARY/SECONDARY ADMISSION FORM SUBMITTED ===");
      console.log(JSON.parse(JSON.stringify(data)));
      setIsSubmitted(true);
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
    <div className="w-full min-h-screen bg-[#f9fafb] pt-8 md:pt-12 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Back Button */}
        <div className="w-full mb-6 print:hidden">
          {currentStep === 1 ? (
            <Link 
              href="/admissions" 
              className="inline-flex items-center gap-2 text-sm font-normal md:font-semibold text-slate-500 hover:text-[#0fa958] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admissions
            </Link>
          ) : (
            <button 
              onClick={handlePrev}
              className="inline-flex items-center gap-2 text-sm font-normal md:font-semibold text-slate-500 hover:text-[#0fa958] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Previous Step
            </button>
          )}
        </div>

        {/* Form Container */}
        {!isSubmitted ? (
          <div className="w-full flex flex-col">
            <div className="print:hidden">
              <PrimaryStepper currentStep={currentStep} />
            </div>
            
            <div className="w-full min-h-[400px]">
              {currentStep === 1 && <Step1BasicInfo />}
              {currentStep === 2 && <Step2PersonalFamily />}
              {currentStep === 3 && <Step3AcademicActivities />}
              {currentStep === 4 && <Step4Contact />}
              {currentStep === 5 && <Step5Review onEdit={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />}
            </div>

            <div className="print:hidden">
              <PrimaryFormNavigation 
                currentStep={currentStep} 
                totalSteps={totalSteps} 
                onNext={handleNext} 
                onPrev={handlePrev} 
              />
            </div>
          </div>
        ) : (
          <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 flex flex-col items-center justify-center text-center mt-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-normal md:font-semibold text-slate-800 tracking-tight mb-3">
              Application Submitted Successfully!
            </h2>
            <p className="text-slate-500 font-medium max-w-md mb-8">
              Your admission details for {data.selectedClass} have been recorded. Please download a copy of the application form for your records and future reference.
            </p>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-sm font-normal md:font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 print:hidden"
            >
              <Download className="w-5 h-5 animate-bounce" /> 
              <span>DOWNLOAD APPLICATION</span>
            </button>
            
            <div className="hidden print:block w-full">
              <PrimaryPrintableForm />
            </div>
          </div>
        )}
        
        {/* Footer Text */}
        <p className="text-[10px] text-slate-400 font-medium text-center mt-12 max-w-lg print:hidden">
          © {new Date().getFullYear()} Green View Public School Admission Committee. All rights reserved. <br/>
          This form adheres strictly to regional compliance criteria for primary and secondary education systems.
        </p>

      </div>
    </div>
  );
}

export default function PrimarySecondaryAdmissionPage() {
  return (
    <PrimaryAdmissionProvider>
      <PrimarySecondaryAdmissionContent />
    </PrimaryAdmissionProvider>
  );
}
