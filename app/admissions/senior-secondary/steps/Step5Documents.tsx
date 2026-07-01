"use client";

import React from "react";
import { ListChecks, CheckCircle2, Check } from "lucide-react";
import { useAdmissionContext } from "../context/AdmissionContext";

export default function Step5Documents() {
  const { data, updateData } = useAdmissionContext();
  const { documents, acceptedTerms, showErrors } = data;

  const toggleDocument = (field: keyof typeof documents) => {
    updateData({ documents: { ...documents, [field]: !documents[field] } });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <ListChecks className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
            Documents & Declaration
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Upload verified academic records and self-verify the mandatory legal admission conditions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Left Column: Documents & Extra */}
        <div className="flex flex-col gap-6">
          <h3 className="text-sm font-black text-emerald-900 tracking-tight mb-2">Supported Document Checklist</h3>
          
          <div className="flex flex-col gap-3 bg-[#fcfcfc] border border-emerald-100 rounded-2xl p-4">
            
            {/* SLC */}
            <div 
              onClick={() => toggleDocument("slc")}
              className={`w-full bg-white border ${documents.slc ? "border-blue-200 shadow-sm" : "border-slate-100"} rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-colors hover:border-slate-300`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                documents.slc ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white"
              }`}>
                {documents.slc && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${documents.slc ? "text-slate-900" : "text-slate-700"}`}>
                  Original School Leaving Certificate (SLC)
                </span>
                <span className="text-[10px] font-medium text-slate-500 mt-0.5">Must be verified and signed by the previous Principal/Headmaster.</span>
              </div>
            </div>

            {/* Marksheet */}
            <div 
              onClick={() => toggleDocument("marksheet")}
              className={`w-full bg-white border ${documents.marksheet ? "border-blue-200 shadow-sm" : "border-slate-100"} rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-colors hover:border-slate-300`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                documents.marksheet ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white"
              }`}>
                {documents.marksheet && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${documents.marksheet ? "text-slate-900" : "text-slate-700"}`}>
                  Previous Class Marksheet / Report Card
                </span>
                <span className="text-[10px] font-medium text-slate-500 mt-0.5">Photocopy attested or original download from board database.</span>
              </div>
            </div>

            {/* Character */}
            <div 
              onClick={() => toggleDocument("character")}
              className={`w-full bg-white border ${documents.character ? "border-blue-200 shadow-sm" : "border-slate-100"} rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-colors hover:border-slate-300`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                documents.character ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white"
              }`}>
                {documents.character && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${documents.character ? "text-slate-900" : "text-slate-700"}`}>
                  Character Certificate
                </span>
                <span className="text-[10px] font-medium text-slate-500 mt-0.5">Issued by previous institution within past 6 months.</span>
              </div>
            </div>

            {/* Category */}
            <div 
              onClick={() => toggleDocument("category")}
              className={`w-full bg-white border ${documents.category ? "border-blue-200 shadow-sm" : "border-slate-100"} rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-colors hover:border-slate-300`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                documents.category ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white"
              }`}>
                {documents.category && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${documents.category ? "text-slate-900" : "text-slate-700"}`}>
                  Category Certificate (SC/ST/OBC/IRDP)
                </span>
                <span className="text-[10px] font-medium text-slate-500 mt-0.5">If applying under reserved seats or scholarship assistance.</span>
              </div>
            </div>
            
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-wider">Extracurricular Achievements & Sports Level</label>
            <textarea 
              placeholder="Mention activities, achievements, or certification level (District, State, National level)"
              value={data.extracurricular}
              onChange={(e) => updateData({ extracurricular: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>

        {/* Right Column: Declaration */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-[#0fa958]" />
            <h3 className="text-sm font-black text-emerald-900 tracking-tight">Rules, Regulations & Declaration</h3>
          </div>
          
          <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h4 className="text-xs font-bold text-slate-800 mb-3">Declaration Terms & Conditions:</h4>
            <ul className="flex flex-col gap-3 text-[11px] text-slate-600 font-medium leading-relaxed">
              <li>1. I hereby declare that all entries in this online application form are correct to the best of my knowledge and belief.</li>
              <li>2. I solemnly pledge to strictly abide by the rules, code of conduct, and directives of the School Board.</li>
              <li>3. I maintain that I shall not engage in any activity that promotes intoxication, substance abuse, ragging, or anti-social behaviour inside or outside school.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                acceptedTerms ? "bg-[#0fa958] border-[#0fa958]" : showErrors && !acceptedTerms ? "border-red-400 bg-red-50" : "border-slate-300 bg-white group-hover:border-[#0fa958]"
              }`}>
                {acceptedTerms && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className={`text-[11px] font-bold leading-tight ${showErrors && !acceptedTerms ? "text-red-500" : "text-slate-700"}`}>
                I have read, understood, and accept all the terms, school conditions, rules & regulations listed above. *
              </span>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={acceptedTerms}
                onChange={() => updateData({ acceptedTerms: !acceptedTerms })}
              />
            </label>
            {showErrors && !acceptedTerms && <span className="text-[10px] font-bold text-red-500 pl-7">You must accept the terms to proceed.</span>}
          </div>



        </div>

      </div>
    </div>
  );
}
