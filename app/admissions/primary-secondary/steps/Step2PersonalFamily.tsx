"use client";

import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { usePrimaryAdmissionContext } from "../context/PrimaryAdmissionContext";

const numberToWords = (num: number): string => {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  
  if (num === 0) return "Zero";
  
  const convert = (n: number): string => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convert(n % 100) : "");
    if (n < 1000000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convert(n % 1000) : "");
    return n.toString();
  };
  
  return convert(num);
};

const dateToWords = (dateString: string): string => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return "";
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  return `${numberToWords(day)} ${months[month - 1]} ${numberToWords(year)}`;
};

export default function Step2PersonalFamily() {
  const { data, updateData } = usePrimaryAdmissionContext();

  const getErrorClass = (fieldValue: string) => {
    return data.showErrors && !fieldValue 
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50" 
      : "border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20";
  };

  useEffect(() => {
    if (data.dateOfBirthFigures) {
      updateData({ dateOfBirthWords: dateToWords(data.dateOfBirthFigures) });
    }
  }, [data.dateOfBirthFigures]);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 md:mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-normal md:font-semibold text-slate-800 tracking-tight">
            Personal & Family Details
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Student's demographic information and parents/guardian details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        
        {/* Date of Birth */}
        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Date of Birth (in figures) *</label>
          <input 
            type="date" 
            value={data.dateOfBirthFigures}
            onChange={(e) => updateData({ dateOfBirthFigures: e.target.value })}
            className={`w-full bg-white px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(data.dateOfBirthFigures)}`}
          />
          {data.showErrors && !data.dateOfBirthFigures && <span className="text-[10px] font-normal md:font-semibold text-red-500 mt-1.5">Required field.</span>}
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Date of Birth (in words)</label>
          <input 
            type="text" 
            value={data.dateOfBirthWords}
            readOnly
            className="w-full bg-slate-50 px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm font-medium text-slate-500 outline-none border border-slate-200 rounded-xl cursor-not-allowed"
          />
        </div>

        {/* Demographics */}
        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Mother Tongue *</label>
          <input 
            type="text" 
            placeholder="e.g., Hindi, English" 
            value={data.motherTongue}
            onChange={(e) => updateData({ motherTongue: e.target.value })}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.motherTongue)}`}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Religion *</label>
          <input 
            type="text" 
            placeholder="e.g., Hindu, Sikh, Muslim" 
            value={data.religion}
            onChange={(e) => updateData({ religion: e.target.value })}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.religion)}`}
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Category *</label>
          <div className="flex flex-wrap gap-4">
            {["Gen", "OBC", "SC", "ST"].map((cat) => (
              <label key={cat} className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${data.socialCategory === cat ? "border-[#0fa958] bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                <input 
                  type="radio" 
                  name="socialCategory" 
                  value={cat} 
                  checked={data.socialCategory === cat}
                  onChange={(e) => updateData({ socialCategory: e.target.value })}
                  className="hidden" 
                />
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${data.socialCategory === cat ? "border-[#0fa958]" : "border-slate-300"}`}>
                  {data.socialCategory === cat && <div className="w-2 h-2 rounded-full bg-[#0fa958]" />}
                </div>
                <span className="text-sm font-normal md:font-semibold">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-slate-200 col-span-1 md:col-span-2 my-2" />

        {/* Parents/Guardian */}
        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Father's Name *</label>
          <input 
            type="text" 
            placeholder="Father's full name" 
            value={data.fatherName}
            onChange={(e) => updateData({ fatherName: e.target.value })}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.fatherName)}`}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Mother's Name *</label>
          <input 
            type="text" 
            placeholder="Mother's full name" 
            value={data.motherName}
            onChange={(e) => updateData({ motherName: e.target.value })}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.motherName)}`}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Name of Guardian (if applicable)</label>
          <input 
            type="text" 
            placeholder="Guardian's name" 
            value={data.guardianName}
            onChange={(e) => updateData({ guardianName: e.target.value })}
            className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Guardian's Occupation</label>
          <input 
            type="text" 
            placeholder="Occupation" 
            value={data.guardianOccupation}
            onChange={(e) => updateData({ guardianOccupation: e.target.value })}
            className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
          />
        </div>

      </div>
    </div>
  );
}
