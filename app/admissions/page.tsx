"use client";

import React, { useState } from "react";
import AdmissionsHero from "./components/AdmissionsHero";
import AdmissionCards from "./components/AdmissionCards";
import AdmissionEnquiry from "./components/AdmissionEnquiry";
import RequiredDocuments from "./components/RequiredDocuments";
import EligibilityCriteria from "./components/EligibilityCriteria";
import AdmissionFaqs from "./components/AdmissionFaqs";

export default function AdmissionsPage() {
  const [showForms, setShowForms] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white">
      <main className="flex flex-col items-center">
        {!showForms ? (
          <>
            <AdmissionsHero 
              onStartApplication={() => {
                setShowForms(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }} 
            />
            <RequiredDocuments />
            <EligibilityCriteria />
            <AdmissionEnquiry />
            <AdmissionFaqs />
          </>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdmissionCards 
              onBack={() => {
                setShowForms(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
