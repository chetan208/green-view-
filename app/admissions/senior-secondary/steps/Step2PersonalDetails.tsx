"use client";

import React from "react";
import { Users, Calendar, HelpCircle } from "lucide-react";
import { useAdmissionContext } from "../context/AdmissionContext";

export default function Step2PersonalDetails() {
  const { data, updateData } = useAdmissionContext();
  const { showErrors } = data;

  const getErrorClass = (fieldValue: string) => {
    return showErrors && !fieldValue ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20";
  };
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-[#0fa958]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 011.847 1.236l2.003 4.809M14 10h6a2 2 0 012 2v7a2 2 0 01-2 2h-7a2 2 0 01-2-2v-4" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
            Personal Information
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Ensure student identity matches national registration documents.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Row 1: Student Name & DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">Student Name (English) *</label>
            <input 
              type="text" 
              placeholder="ENTER IN BLOCK LETTERS" 
              value={data.studentNameEnglish}
              onChange={(e) => updateData({ studentNameEnglish: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.studentNameEnglish)}`}
            />
            {showErrors && !data.studentNameEnglish && <span className="text-[10px] font-bold text-red-500 mt-1.5">This field is mandatory.</span>}
            <span className="text-[10px] text-slate-400 mt-1.5 font-medium">Must strictly match Matriculation Certificate.</span>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">Date of Birth *</label>
            <div className="relative">
              <input 
                type="date" 
                value={data.dateOfBirth}
                onChange={(e) => updateData({ dateOfBirth: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium text-slate-700 appearance-none bg-transparent ${getErrorClass(data.dateOfBirth)}`}
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {showErrors && !data.dateOfBirth && <span className="text-[10px] font-bold text-red-500 mt-1.5">Date of Birth is mandatory.</span>}
          </div>
        </div>

        {/* Row 2: Aadhaar & PAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">Aadhaar Number *</label>
            <input 
              type="text" 
              placeholder="12-digit UID Number" 
              value={data.aadhaarNumber}
              onChange={(e) => updateData({ aadhaarNumber: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.aadhaarNumber)}`}
            />
            {showErrors && !data.aadhaarNumber && <span className="text-[10px] font-bold text-red-500 mt-1.5">Aadhaar number is mandatory.</span>}
            <span className="text-[10px] text-slate-400 mt-1.5 font-medium">12-digit alphanumeric card registration identification.</span>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">PAN Number (If Applicable)</label>
            <input 
              type="text" 
              placeholder="10-character Permanent Account Number" 
              value={data.panNumber}
              onChange={(e) => updateData({ panNumber: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-100 my-2" />

        {/* Family & Parent Details Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-[#0fa958]" />
            <h3 className="text-sm font-black text-emerald-900 tracking-tight">Family & Parent Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Father */}
            <div className="bg-[#fcfcfc] border border-emerald-100 rounded-2xl p-5">
              <label className="text-[11px] font-black text-slate-600 mb-4 uppercase tracking-wider block">Father's Information *</label>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Father's Full Name" 
                  value={data.fatherName}
                  onChange={(e) => updateData({ fatherName: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.fatherName)}`}
                />
                <input 
                  type="text" 
                  placeholder="Mobile Number" 
                  value={data.fatherMobile}
                  onChange={(e) => updateData({ fatherMobile: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.fatherMobile)}`}
                />
              </div>
            </div>

            {/* Mother */}
            <div className="bg-[#fcfcfc] border border-emerald-100 rounded-2xl p-5">
              <label className="text-[11px] font-black text-slate-600 mb-4 uppercase tracking-wider block">Mother's Information *</label>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Mother's Full Name" 
                  value={data.motherName}
                  onChange={(e) => updateData({ motherName: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.motherName)}`}
                />
                <input 
                  type="text" 
                  placeholder="Mobile Number" 
                  value={data.motherMobile}
                  onChange={(e) => updateData({ motherMobile: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.motherMobile)}`}
                />
              </div>
            </div>

            {/* Guardian */}
            <div className="bg-[#fcfcfc] border border-slate-100 rounded-2xl p-5">
              <label className="text-[11px] font-black text-slate-500 mb-4 uppercase tracking-wider block">Guardian's Information (Optional)</label>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Guardian's Full Name" 
                  value={data.guardianName}
                  onChange={(e) => updateData({ guardianName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0fa958] outline-none transition-all text-sm font-medium placeholder:text-slate-400 bg-white"
                />
                <input 
                  type="text" 
                  placeholder="Mobile Number" 
                  value={data.guardianMobile}
                  onChange={(e) => updateData({ guardianMobile: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0fa958] outline-none transition-all text-sm font-medium placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Social Category *</label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 items-center h-full">
                {["General", "SC", "ST", "OBC"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${data.socialCategory === cat ? 'border-[#0fa958]' : 'border-slate-300 group-hover:border-[#0fa958]'}`}>
                      {data.socialCategory === cat && <div className="w-2 h-2 bg-[#0fa958] rounded-full" />}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{cat}</span>
                    <input 
                      type="radio" 
                      name="category" 
                      className="hidden" 
                      checked={data.socialCategory === cat}
                      onChange={() => updateData({ socialCategory: cat })}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-800 mb-2 uppercase tracking-wider">IRDP / BPL Status *</label>
              <div className="flex gap-3 h-[46px]">
                <label className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300">
                  <input type="radio" name="bpl" checked={data.bplStatus === "Yes"} onChange={() => updateData({ bplStatus: "Yes" })} className="w-3.5 h-3.5 accent-blue-500" />
                  <span className="text-sm font-semibold text-slate-700">Yes</span>
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 border border-blue-500 bg-blue-50/20 rounded-xl cursor-pointer">
                  <input type="radio" name="bpl" checked={data.bplStatus === "No"} onChange={() => updateData({ bplStatus: "No" })} className="w-3.5 h-3.5 accent-blue-500" />
                  <span className="text-sm font-semibold text-slate-900">No</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-800 mb-2 uppercase tracking-wider truncate" title="Parent/Guardian Occupation *">Parent/Guardian Occupation *</label>
              <input 
                type="text" 
                placeholder="e.g., Agriculture, Business" 
                value={data.fatherOccupation}
                onChange={(e) => updateData({ fatherOccupation: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.fatherOccupation)}`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-800 mb-2 uppercase tracking-wider truncate" title="Annual Household Income *">Annual Household Income *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                <input 
                  type="text" 
                  placeholder="Total annual earnings" 
                  value={data.annualIncome}
                  onChange={(e) => updateData({ annualIncome: e.target.value })}
                  className={`w-full pl-8 pr-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.annualIncome)}`}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
