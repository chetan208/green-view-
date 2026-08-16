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
import { ArrowLeft, CheckCircle2, Download, Loader2, AlertCircle, X } from "lucide-react";
import { AdmissionProvider, useAdmissionContext } from "./context/AdmissionContext";
import PrintableForm from "./components/PrintableForm";

import { submitAdmissionApplicationApi } from "@/lib/api";

function SeniorSecondaryAdmissionContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const totalSteps = 6;

  const { data, updateData } = useAdmissionContext();

  const handleNext = async () => {
    let isValid = true;

    if (currentStep === 1) {
      if (!data.studentDetails.photoFile || data.courseDetails.selectedSubjects.length !== 5) isValid = false;
    } else if (currentStep === 2) {
      if (!data.studentDetails.studentNameEnglish || !data.studentDetails.dateOfBirth || !data.familyDetails.fatherName || !data.familyDetails.fatherMobile || !data.familyDetails.motherName || !data.familyDetails.motherMobile || !data.studentDetails.aadhaarNumber || !data.familyDetails.fatherOccupation || !data.familyDetails.annualIncome) isValid = false;
    } else if (currentStep === 3) {
      if (!data.addressDetails.village || !data.addressDetails.postOffice || !data.addressDetails.tehsil || !data.addressDetails.district || !data.addressDetails.stateName || !data.addressDetails.pinCode) isValid = false;
      if (data.transportDetails?.requiresTransport && !data.transportDetails?.selectedStation) isValid = false;
    } else if (currentStep === 4) {
      const recordsToValidate = data.courseDetails.selectedClass === "Class 11" ? [data.academicRecords[0]] : data.academicRecords;
      for (const record of recordsToValidate) {
        if (!record.passingYear || !record.boardName || !record.school || !record.rollNumber) {
          isValid = false; break;
        }
        if (record.result !== "Awaited" && (!record.maxMarks || !record.marksObtained || !record.percentage)) {
          isValid = false; break;
        }
      }
    } else if (currentStep === 5) {
      if (!data.additionalDetails.acceptedTerms) isValid = false;
    }

    if (!isValid) {
      updateData({ meta: { ...data.meta, showErrors: true } });
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
        
        formData.append('appliedClass', data.courseDetails.selectedClass);
        formData.append('stream', data.courseDetails.selectedStream);
        formData.append('selectedSubjects', JSON.stringify(data.courseDetails.selectedSubjects));

        const sd = data.studentDetails as any;
        const fd = data.familyDetails as any;
        const ad = data.addressDetails as any;
        const bd = data.bankDetails as any;

        formData.append('studentName', sd.studentNameEnglish);
        if (sd.studentNameHindi) formData.append('studentNameHindi', sd.studentNameHindi);
        if (sd.dateOfBirth) formData.append('dateOfBirth', sd.dateOfBirth);
        if (sd.sex || sd.gender) formData.append('sex', sd.sex || sd.gender);
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

        if (ad.village) formData.append('village', ad.village);
        if (ad.postOffice) formData.append('postOffice', ad.postOffice);
        if (ad.tehsil) formData.append('tehsil', ad.tehsil);
        if (ad.district) formData.append('district', ad.district);
        if (ad.stateName) formData.append('state', ad.stateName);
        if (ad.pinCode) formData.append('pinCode', ad.pinCode);

        if (bd.bankAccountNo) formData.append('bankAccountNo', bd.bankAccountNo);
        if (bd.bankName) formData.append('bankName', bd.bankName);
        if (bd.bankBranch || bd.bankBranchName) formData.append('bankBranch', bd.bankBranch || bd.bankBranchName);
        if (bd.ifscCode) formData.append('ifscCode', bd.ifscCode);

        if (data.transportDetails?.requiresTransport) {
          formData.append('requiresTransport', 'true');
          if (data.transportDetails.selectedStation) {
            formData.append('station', data.transportDetails.selectedStation);
          }
        }

        const validExams = data.courseDetails.selectedClass === "Class 11" 
          ? [data.academicRecords[0]] 
          : data.academicRecords.filter(r => r.passingYear);
        formData.append('previousExams', JSON.stringify(validExams));

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
          
          {/* Back to Admissions Button */}
          <div className="w-full mb-6 print:hidden">
            {currentStep === 1 ? (
              <Link 
                href="/admissions" 
                className="inline-flex items-center gap-2 text-sm font-medium md:font-semibold text-slate-500 hover:text-brand-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admissions
              </Link>
            ) : (
              <button 
                onClick={handlePrev}
                className="inline-flex items-center gap-2 text-sm font-medium md:font-semibold text-slate-500 hover:text-brand-green transition-colors"
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
              <h2 className="text-2xl md:text-3xl font-medium md:font-bold text-slate-800 tracking-tight mb-3">
                Application Submitted Successfully!
              </h2>
              <p className="text-slate-500 font-medium max-w-md mb-8">
                Your admission details have been recorded. Please download a copy of the application form for your records and future reference.
              </p>
              
            {submittedAppId ? (
              <a 
                href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admissions/${submittedAppId}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-sm font-medium md:font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 no-underline"
              >
                <Download className="w-5 h-5 animate-bounce" /> 
                <span>VIEW APPLICATION PDF</span>
              </a>
            ) : (
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-sm font-medium md:font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 print:hidden"
              >
                <Download className="w-5 h-5 animate-bounce" /> 
                <span>DOWNLOAD APPLICATION</span>
              </button>
            )}
              
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
