"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Download, Loader2, AlertCircle, X } from "lucide-react";
import { PrimaryAdmissionProvider, usePrimaryAdmissionContext } from "./context/PrimaryAdmissionContext";
import PrimaryStepper from "./components/PrimaryStepper";
import PrimaryFormNavigation from "./components/PrimaryFormNavigation";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2PersonalFamily from "./steps/Step2PersonalFamily";
import Step3AcademicActivities from "./steps/Step3AcademicActivities";
import Step4Contact from "./steps/Step4Contact";
import Step5Review from "./steps/Step5Review";
import PrimaryPrintableForm from "./components/PrimaryPrintableForm";
import { submitAdmissionApplicationApi } from "@/lib/api";
import { erpApi } from "@/services/erpApi";

function PrimarySecondaryAdmissionContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState<boolean | null>(null);
  const totalSteps = 5;

  const { data, updateData } = usePrimaryAdmissionContext();

  React.useEffect(() => {
    erpApi.sessions.getAdmissionStatus()
      .then(res => setIsAdmissionsOpen(res.success ? res.open : false))
      .catch(() => setIsAdmissionsOpen(false));
  }, []);

  const handleNext = async () => {
    let isValid = true;

    if (currentStep === 1) {
      if (!data.studentDetails.photoFile || !data.courseDetails.selectedClass || !data.studentDetails.studentName || !data.studentDetails.sex) isValid = false;
    } else if (currentStep === 2) {
      if (!data.studentDetails.dateOfBirthFigures || !data.studentDetails.motherTongue || !data.studentDetails.religion || !data.familyDetails.fatherName || !data.familyDetails.motherName || !data.familyDetails.fatherMobile) isValid = false;
    } else if (currentStep === 3) {
      // Academic / activities fields are optional as nursery students might not have previous schools
    } else if (currentStep === 4) {
      if (!data.contactDetails.presentAddress || !data.contactDetails.permanentAddress) isValid = false;
      if (data.transportDetails?.requiresTransport && !data.transportDetails?.selectedStation) isValid = false;
    } else if (currentStep === 5) {
      if (!data.additionalDetails.acceptedDeclaration) isValid = false;
    }

    if (!isValid) {
      updateData({ meta: { ...data.meta, showErrors: true } });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    updateData({ meta: { ...data.meta, showErrors: false } });

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === totalSteps) {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        
        const sd = data.studentDetails as any;
        const fd = data.familyDetails as any;
        const cd = data.contactDetails as any;
        const ar = (data as any).academicRecords || {};

        formData.append('appliedClass', data.courseDetails.selectedClass);
        formData.append('studentName', sd.studentName);
        if (sd.dateOfBirthFigures) formData.append('dateOfBirth', sd.dateOfBirthFigures);
        if (sd.sex) formData.append('sex', sd.sex);
        if (sd.religion) formData.append('religion', sd.religion);
        if (sd.socialCategory) formData.append('socialCategory', sd.socialCategory);
        if (sd.motherTongue) formData.append('motherTongue', sd.motherTongue);
        if (sd.aadhaarNumber) formData.append('aadhaarNumber', sd.aadhaarNumber);

        if (fd.fatherName) formData.append('fatherName', fd.fatherName);
        if (fd.fatherMobile) formData.append('fatherMobile', fd.fatherMobile);
        if (fd.fatherOccupation) formData.append('fatherOccupation', fd.fatherOccupation);
        if (fd.motherName) formData.append('motherName', fd.motherName);
        if (fd.motherMobile) formData.append('motherMobile', fd.motherMobile);
        if (fd.guardianName) formData.append('guardianName', fd.guardianName);
        if (fd.guardianMobile) formData.append('guardianMobile', fd.guardianMobile);
        if (fd.annualIncome) formData.append('annualIncome', fd.annualIncome);

        if (cd.presentAddress) formData.append('address', cd.presentAddress);
        if (cd.pinCode) formData.append('pinCode', cd.pinCode);

        if (ar.prevSchoolName) formData.append('prevSchoolName', ar.prevSchoolName);
        if (ar.prevSchoolMedium) formData.append('prevSchoolMedium', ar.prevSchoolMedium);

        if (data.transportDetails?.requiresTransport) {
          formData.append('requiresTransport', 'true');
          if (data.transportDetails.selectedStation) {
            formData.append('station', data.transportDetails.selectedStation);
          }
        }

        if (sd.photoFile) {
          formData.append('photoFile', sd.photoFile);
        }

        const res = await submitAdmissionApplicationApi(formData);
        
        setIsSubmitted(true);
        if (res._id) {
          setSubmittedAppId(res._id);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Failed to submit form:", error);
        setSubmitError("Failed to submit admission application. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isAdmissionsOpen === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-brand-green animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Checking admission status...</p>
      </div>
    );
  }

  if (isAdmissionsOpen === false) {
    return (
      <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-12 text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 font-serif">Admissions Closed</h2>
        <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Admissions for the current academic session are currently closed. Please check back later or contact the administration office for more details.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-xl transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] relative">
      {/* Submitting Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-brand-green animate-spin mb-4" />
          <h3 className="text-lg font-medium text-slate-800">Submitting Application...</h3>
          <p className="text-sm text-slate-500 mt-2">Please do not close or refresh this page.</p>
        </div>
      )}

      {/* Custom Error Popup */}
      {submitError && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-red-50 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Submission Failed</h3>
              <p className="text-sm text-slate-600">{submitError}</p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSubmitError(null)}
                className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Back Button */}
        <div className="w-full mb-6 print:hidden">
          {currentStep === 1 ? (
            <Link 
              href="/admissions" 
              className="inline-flex items-center gap-2 text-sm font-normal md:font-medium text-slate-500 hover:text-brand-green transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admissions
            </Link>
          ) : (
            <button 
              onClick={handlePrev}
              className="inline-flex items-center gap-2 text-sm font-normal md:font-medium text-slate-500 hover:text-brand-green transition-colors"
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
            <h2 className="text-2xl md:text-3xl font-normal md:font-medium text-slate-800 tracking-tight mb-3">
              Application Submitted Successfully!
            </h2>
            <p className="text-slate-500 font-medium max-w-md mb-8">
              Your admission details for {data.courseDetails.selectedClass} have been recorded. Please download a copy of the application form for your records and future reference.
            </p>
            
            {submittedAppId ? (
              <a 
                href={`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.greenviewschool.in'}/api/admissions/${submittedAppId}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-sm font-normal md:font-medium shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 no-underline"
              >
                <Download className="w-5 h-5 animate-bounce" /> 
                <span>VIEW APPLICATION PDF</span>
              </a>
            ) : (
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-sm font-normal md:font-medium shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 print:hidden"
              >
                <Download className="w-5 h-5 animate-bounce" /> 
                <span>DOWNLOAD APPLICATION</span>
              </button>
            )}
          </div>
        )}
        
        {/* Footer Text */}
        <p className="text-[10px] text-slate-400 font-medium text-center mt-12 max-w-lg print:hidden">
          © {new Date().getFullYear()} Green View Public School Admission Committee. All rights reserved. <br/>
          This form adheres strictly to regional compliance criteria for primary and secondary education systems.
        </p>

      </div>
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
