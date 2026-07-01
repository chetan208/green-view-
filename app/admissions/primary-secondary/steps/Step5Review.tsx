"use client";

import React from "react";
import { ClipboardList, Edit, User, Download, FileText } from "lucide-react";
import PrimaryPrintableForm from "../components/PrimaryPrintableForm";
import { usePrimaryAdmissionContext } from "../context/PrimaryAdmissionContext";

interface Step5ReviewProps {
  onEdit: (step: number) => void;
}

export default function Step5Review({ onEdit }: Step5ReviewProps) {
  const { data, updateData } = usePrimaryAdmissionContext();
  const parentName = data.fatherName || data.motherName || data.guardianName;

  const getErrorClass = () => {
    return data.showErrors && !data.acceptedDeclaration 
      ? "border-red-400 bg-red-50 text-red-700" 
      : "border-[#0fa958] bg-emerald-50 text-emerald-900";
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 md:mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <ClipboardList className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-normal md:font-semibold text-slate-800 tracking-tight flex items-center justify-between">
            <span>Review & Declaration</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Carefully verify your entries and accept the declaration to submit the form.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 print:hidden">
        
        {/* Left Column: Profile Card */}
        <div className="md:col-span-4 flex flex-col h-full">
          <div className="w-full bg-[#fcfcfc] border border-slate-100 rounded-2xl p-6 flex flex-col items-center shadow-sm">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 overflow-hidden flex items-center justify-center shadow-md border-2 border-white">
              {data.photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.photoPreview} alt="Student Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-white/50" />
              )}
            </div>
            <h3 className="text-lg font-normal md:font-semibold text-slate-800 tracking-wider uppercase text-center">{data.studentName || "ANONYMOUS USER"}</h3>
            
            <div className="mt-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-normal md:font-semibold tracking-wide">
              {data.selectedClass || "Class Not Selected"}
            </div>

            <div className="w-full h-[1px] bg-slate-200 my-6 border-dashed" />

            <div className="w-full flex flex-col gap-4 text-xs md:text-sm font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Date of Birth:</span>
                <span className="text-slate-800 font-normal md:font-semibold">{data.dateOfBirthFigures || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Gender:</span>
                <span className="text-slate-800 font-normal md:font-semibold">{data.sex || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Category:</span>
                <span className="text-slate-800 font-normal md:font-semibold">{data.socialCategory}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Summary Cards */}
        <div className="md:col-span-8 flex flex-col gap-4 md:gap-6">
          
          {/* Card 1: Personal & Family */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-normal md:font-semibold text-slate-400 tracking-widest uppercase">PERSONAL & FAMILY</h4>
              <button onClick={() => onEdit(2)} className="flex items-center gap-1.5 text-xs font-normal md:font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Father's Name:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800">{data.fatherName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Mother's Name:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800">{data.motherName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Guardian Name:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800">{data.guardianName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Guardian Occupation:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800">{data.guardianOccupation || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Religion:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800">{data.religion || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Mother Tongue:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800">{data.motherTongue || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Contact Details */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-normal md:font-semibold text-slate-400 tracking-widest uppercase">CONTACT DETAILS</h4>
              <button onClick={() => onEdit(4)} className="flex items-center gap-1.5 text-xs font-normal md:font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] text-slate-400 mb-0.5">Present Address:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800 leading-tight">
                  {data.presentAddress || "N/A"}
                </span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] text-slate-400 mb-0.5">Permanent Address:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800 leading-tight">
                  {data.permanentAddress || "N/A"}
                </span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] text-slate-400 mb-0.5">Telephone No:</span>
                <span className="text-xs font-normal md:font-semibold text-slate-800">{data.telephoneNo || "N/A"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Declaration Section */}
      <div className="w-full mt-8 p-6 rounded-2xl border border-slate-200 bg-slate-50 print:hidden">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-slate-500" />
          <h3 className="text-sm font-normal md:font-semibold text-slate-800 uppercase tracking-widest">Declaration</h3>
        </div>
        <p className="text-sm font-medium text-slate-600 leading-relaxed italic mb-6">
          "I <span className="font-normal md:font-semibold underline decoration-slate-300 underline-offset-4 mx-1">{parentName || "[Parent/Guardian Name]"}</span> Father/Mother/Guardian of <span className="font-normal md:font-semibold underline decoration-slate-300 underline-offset-4 mx-1">{data.studentName || "[Student Name]"}</span> Solemnly declare that the above information regarding my son/daughter/ward are true to the best of my knowledge."
        </p>

        <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${data.acceptedDeclaration ? "border-[#0fa958] bg-emerald-50" : "border-slate-300 bg-white hover:border-[#0fa958]"} ${data.showErrors && !data.acceptedDeclaration ? "border-red-400 bg-red-50" : ""}`}>
          <div className="pt-1">
            <input 
              type="checkbox" 
              checked={data.acceptedDeclaration}
              onChange={(e) => updateData({ acceptedDeclaration: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-[#0fa958] focus:ring-[#0fa958] cursor-pointer"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-normal md:font-semibold ${data.acceptedDeclaration ? "text-emerald-900" : "text-slate-700"} ${data.showErrors && !data.acceptedDeclaration ? "text-red-700" : ""}`}>
              I accept the declaration terms *
            </span>
            <span className={`text-[11px] font-medium mt-1 ${data.acceptedDeclaration ? "text-emerald-700" : "text-slate-500"} ${data.showErrors && !data.acceptedDeclaration ? "text-red-600" : ""}`}>
              By checking this box, you confirm that all details provided are accurate and authorize the school to process this admission application.
            </span>
          </div>
        </label>
      </div>

    </div>
  );
}
