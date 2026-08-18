"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, PhoneCall, Mail, Loader2, ArrowLeft } from "lucide-react";
import AdmissionsHero from "./components/AdmissionsHero";
import AdmissionCards from "./components/AdmissionCards";
import AdmissionEnquiry from "./components/AdmissionEnquiry";
import RequiredDocuments from "./components/RequiredDocuments";
import EligibilityCriteria from "./components/EligibilityCriteria";
import AdmissionFaqs from "./components/AdmissionFaqs";
import { erpApi } from "@/services/erpApi";
import { getCurrentAcademicSession } from "@/lib/sessionUtils";

export default function AdmissionsPage() {
  const [showForms, setShowForms] = useState(false);
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState<boolean | null>(null);
  const [showClosedModal, setShowClosedModal] = useState(false);

  const dynamicSession = getCurrentAcademicSession();

  useEffect(() => {
    erpApi.sessions.getAdmissionStatus()
      .then(res => setIsAdmissionsOpen(res.success ? res.open : false))
      .catch(() => setIsAdmissionsOpen(false));
  }, []);

  const handleStartApplication = () => {
    if (isAdmissionsOpen === false) {
      setShowClosedModal(true);
    } else {
      setShowForms(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      <main className="flex flex-col items-center">
        {!showForms ? (
          <>
            <AdmissionsHero 
              onStartApplication={handleStartApplication} 
              isAdmissionsClosed={isAdmissionsOpen === false}
            />
            <RequiredDocuments />
            <EligibilityCriteria />
            <AdmissionEnquiry />
            <AdmissionFaqs />
          </>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pt-28">
            <AdmissionCards 
              onBack={() => {
                setShowForms(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </main>

      {/* Closed Modal / Notice Card */}
      {showClosedModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 max-w-lg w-full shadow-2xl relative z-10 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
              <AlertCircle size={40} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                Notice: Applications Closed
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Online Admissions Closed</h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md pt-1">
                Online admission applications for session <strong className="text-slate-800">{dynamicSession}</strong> are currently closed by the administration. You can still reach out to the school office for offline inquiries or upcoming session updates.
              </p>
            </div>

            <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-around gap-4 text-xs font-semibold text-slate-700">
              <a href="tel:+919414343160" className="flex items-center gap-2 hover:text-brand-green no-underline">
                <PhoneCall size={16} className="text-brand-green" />
                <span>+91 94143 43160</span>
              </a>
              <a href="mailto:info@greenviewschool.in" className="flex items-center gap-2 hover:text-brand-green no-underline">
                <Mail size={16} className="text-brand-green" />
                <span>info@greenviewschool.in</span>
              </a>
            </div>

            <button
              onClick={() => setShowClosedModal(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer border-0 shadow-md"
            >
              Close Notice &amp; Browse Info
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
