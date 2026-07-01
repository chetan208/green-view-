"use client";

import React from "react";
import { ClipboardList, Edit, User, Download } from "lucide-react";
import Image from "next/image";
import PrintableForm from "../components/PrintableForm";
import { useAdmissionContext } from "../context/AdmissionContext";

interface Step6ReviewProps {
  onEdit: (step: number) => void;
}

export default function Step6Review({ onEdit }: Step6ReviewProps) {
  const { data } = useAdmissionContext();

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 md:mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <ClipboardList className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-slate-800 tracking-tight flex items-center justify-between">
            <span>Application Registration Summary</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Carefully read over your entries. Incorrect records may delay admissions verification.
          </p>
        </div>
      </div>

      <PrintableForm />

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
            <h3 className="text-lg font-semibold md:font-bold text-slate-800 tracking-wider uppercase">{data.studentNameEnglish || "ANONYMOUS USER"}</h3>
            
            <div className="mt-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold md:font-bold tracking-wide">
              {data.selectedClass} - {data.selectedStream}
            </div>

            <div className="w-full h-[1px] bg-slate-200 my-6 border-dashed" />

            <div className="w-full flex flex-col gap-4 text-xs md:text-sm font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Date of Birth:</span>
                <span className="text-slate-800 font-semibold md:font-bold">{data.dateOfBirth || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Social Category:</span>
                <span className="text-slate-800 font-semibold md:font-bold">{data.socialCategory}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Aadhaar UID:</span>
                <span className="text-slate-800 font-semibold md:font-bold">{data.aadhaarNumber || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Provisional Status:</span>
                <span className="text-slate-800 font-semibold md:font-bold">{data.isProvisional ? "Provisional" : "Regular"}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Summary Cards */}
        <div className="md:col-span-8 flex flex-col gap-4 md:gap-6">
          
          {/* Card 1: Stream & Personal Family */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-semibold md:font-bold text-slate-400 tracking-widest uppercase">STREAM & PERSONAL FAMILY</h4>
              <button onClick={() => onEdit(2)} className="flex items-center gap-1.5 text-xs font-semibold md:font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">PAN Number:</span>
                <span className="text-xs font-semibold md:font-bold text-slate-800">{data.panNumber || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Father's Name:</span>
                <span className="text-xs font-semibold md:font-bold text-slate-800">{data.fatherName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Mother's Name:</span>
                <span className="text-xs font-semibold md:font-bold text-slate-800">{data.motherName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Annual Income:</span>
                <span className="text-xs font-semibold md:font-bold text-slate-800">{data.annualIncome ? `₹${data.annualIncome}` : "N/A"}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] text-slate-400 mb-0.5">Elective Subjects:</span>
                <span className="text-xs font-semibold md:font-bold text-emerald-700">{data.selectedSubjects.join(", ") || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Address & Banking */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-semibold md:font-bold text-slate-400 tracking-widest uppercase">ADDRESS & BANKING</h4>
              <button onClick={() => onEdit(3)} className="flex items-center gap-1.5 text-xs font-semibold md:font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] text-slate-400 mb-0.5">Address:</span>
                <span className="text-xs font-semibold md:font-bold text-slate-800 leading-tight">
                  {data.village}, PO: {data.postOffice}, Teh: {data.tehsil}, Dist: {data.district}, {data.stateName} - {data.pinCode}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Bank Acc:</span>
                <span className="text-xs font-semibold md:font-bold text-slate-800">{data.bankAccountNo || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Bank IFSC:</span>
                <span className="text-xs font-semibold md:font-bold text-slate-800 uppercase">{data.ifscCode || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Academic Merit */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-semibold md:font-bold text-slate-400 tracking-widest uppercase">ACADEMIC MERIT</h4>
              <button onClick={() => onEdit(4)} className="flex items-center gap-1.5 text-xs font-semibold md:font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {(data.selectedClass === "Class 11" ? data.academicRecords.slice(0, 1) : data.academicRecords).map((record, idx) => (
                <div key={idx} className="flex items-center justify-between border border-emerald-100 rounded-xl p-3 bg-emerald-50/30">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold md:font-bold text-slate-800">{record.examName} {record.passingYear ? `(${record.passingYear})` : ""}</span>
                    <span className="text-[10px] text-slate-400">{record.boardName || "N/A"}</span>
                  </div>
                  <div className="bg-white border border-emerald-200 text-emerald-700 font-semibold md:font-bold text-[11px] px-3 py-1 rounded-full">
                    {record.percentage || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
