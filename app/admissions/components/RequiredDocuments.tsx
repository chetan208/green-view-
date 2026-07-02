"use client";

import React from "react";
import { Baby, FileText, Camera, ArrowRightLeft, IdCard, Home } from "lucide-react";

export default function RequiredDocuments() {
  const documents = [
    {
      title: "Birth Certificate",
      description: "Original and photocopy of birth certificate issued by Municipal Corporation or Gram Panchayat.",
      icon: Baby,
    },
    {
      title: "Previous Report Card",
      description: "Photocopy of last class report card / mark sheet from the previous school attended.",
      icon: FileText,
    },
    {
      title: "Passport Size Photographs",
      description: "Recent colour passport-size photographs of the student (4 copies).",
      icon: Camera,
    },
    {
      title: "Transfer Certificate (TC)",
      description: "Required for Class II and above. Original TC from the previous school, countersigned if applicable.",
      icon: ArrowRightLeft,
    },
    {
      title: "Aadhaar Card",
      description: "Photocopy of student's Aadhaar card. Parent/Guardian Aadhaar may also be required.",
      icon: IdCard,
    },
    {
      title: "Address Proof",
      description: "Any government-issued address proof such as Aadhaar, voter ID, electricity bill, or ration card.",
      icon: Home,
    }
  ];

  return (
    <section className="w-full bg-[#f9fafb] py-16 px-4 md:px-8 border-t border-slate-200/50">
      <div className="max-w-6xl mx-auto flex flex-col items-start w-full">
        
        {/* Header */}
        <div className="text-left w-full mb-10 md:mb-12">
          <span className="text-[9px] md:text-xs font-bold text-brand-green uppercase tracking-[0.2em] mb-1.5 md:mb-2 block">
            BE PREPARED
          </span>
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-800 tracking-tight">
            Required <span className="text-brand-green">Documents</span>
          </h2>
          <p className="text-[11px] md:text-sm text-slate-500 font-medium mt-2 md:mt-4 max-w-2xl">
            Please note that these documents are <strong className="text-slate-700">not required to be uploaded online</strong>. 
            Once your online application is submitted, you must bring the original and photocopies of these documents for physical verification when visiting the school campus.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {documents.map((doc, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
            >
              {/* Icon Box */}
              <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <doc.icon className="w-6 h-6 text-brand-green" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{doc.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
