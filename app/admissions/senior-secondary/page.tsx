"use client";

import React, { useState } from "react";
import Stepper from "./steps/Stepper";
import Step1StreamSelection from "./steps/Step1StreamSelection";
import Step2PersonalDetails from "./steps/Step2PersonalDetails";
import Step3AddressBank from "./steps/Step3AddressBank";
import Step4AcademicHistory from "./steps/Step4AcademicHistory";
import Step5Documents from "./steps/Step5Documents";
import Step6Review from "./steps/Step6Review";
import FormNavigation from "./components/FormNavigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { AdmissionProvider, useAdmissionContext } from "./context/AdmissionContext";
import PrintableForm from "./components/PrintableForm";

function SeniorSecondaryAdmissionContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 6;

  const { data, updateData } = useAdmissionContext();

  const handleNext = () => {
    let isValid = true;

    if (currentStep === 1) {
      if (!data.photoPreview || data.selectedSubjects.length !== 5) isValid = false;
    } else if (currentStep === 2) {
      if (!data.studentNameEnglish || !data.dateOfBirth || !data.fatherName || !data.fatherMobile || !data.motherName || !data.motherMobile || !data.aadhaarNumber || !data.fatherOccupation || !data.annualIncome) isValid = false;
    } else if (currentStep === 3) {
      if (!data.village || !data.postOffice || !data.tehsil || !data.district || !data.stateName || !data.pinCode) isValid = false;
    } else if (currentStep === 4) {
      const recordsToValidate = data.selectedClass === "Class 11" ? [data.academicRecords[0]] : data.academicRecords;
      for (const record of recordsToValidate) {
        if (!record.passingYear || !record.boardName || !record.school || !record.rollNumber) {
          isValid = false; break;
        }
        if (record.result !== "Awaited" && (!record.maxMarks || !record.marksObtained || !record.percentage)) {
          isValid = false; break;
        }
      }
    } else if (currentStep === 5) {
      if (!data.acceptedTerms) isValid = false;
    }

    if (!isValid) {
      updateData({ showErrors: true });
      return;
    }

    updateData({ showErrors: false });

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === totalSteps) {
      console.log("=== ADMISSION FORM SUBMITTED ===");
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
      <div className="w-full min-h-screen bg-[#f9fafb] pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Back to Admissions Button */}
          <div className="w-full mb-6 print:hidden">
            {currentStep === 1 ? (
              <Link 
                href="/admissions" 
                className="inline-flex items-center gap-2 text-sm font-semibold md:font-bold text-slate-500 hover:text-[#0fa958] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admissions
              </Link>
            ) : (
              <button 
                onClick={handlePrev}
                className="inline-flex items-center gap-2 text-sm font-semibold md:font-bold text-slate-500 hover:text-[#0fa958] transition-colors"
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
          ) : (
            <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 flex flex-col items-center justify-center text-center mt-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold md:font-black text-slate-800 tracking-tight mb-3">
                Application Submitted Successfully!
              </h2>
              <p className="text-slate-500 font-medium max-w-md mb-8">
                Your admission details have been recorded. Please download a copy of the application form for your records and future reference.
              </p>
              
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-sm font-semibold md:font-black shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 print:hidden"
              >
                <Download className="w-5 h-5 animate-bounce" /> 
                <span>DOWNLOAD APPLICATION</span>
              </button>
              
              <div className="hidden print:block w-full">
                <PrintableForm />
              </div>
            </div>
          )}
          
          {/* Footer Text */}
          <p className="text-[10px] text-slate-400 font-medium text-center mt-12 max-w-lg">
            © {new Date().getFullYear()} Green View Senior Secondary School Admission Committee. All rights reserved. <br/>
            This form adheres strictly to state regulations and regional compliance criteria for intermediate education portal systems.
          </p>

        </div>
      </div>
  );
}

export default function SeniorSecondaryAdmissionPage() {
  return (
    <AdmissionProvider>
      <SeniorSecondaryAdmissionContent />
    </AdmissionProvider>
  );
}
