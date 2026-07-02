import React from "react";
import AdmissionsHero from "./components/AdmissionsHero";
import AdmissionCards from "./components/AdmissionCards";
import AdmissionEnquiry from "./components/AdmissionEnquiry";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function AdmissionsPage() {
  return (
    <div className="w-full min-h-screen bg-white">
 
      
      <main className="flex flex-col items-center">
        <AdmissionsHero />
        <AdmissionCards />
        <AdmissionEnquiry />
      </main>


    </div>
  );
}
