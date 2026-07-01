"use client";

import React, { useState } from "react";
import { MapPin, Building2, HelpCircle, AlertCircle } from "lucide-react";
import { useAdmissionContext } from "../context/AdmissionContext";
import BankSelect from "../components/BankSelect";

export default function Step3AddressBank() {
  const { data, updateData } = useAdmissionContext();
  const [confirmBankAcc, setConfirmBankAcc] = useState("");
  
  const { showErrors } = data;
  const isBankAccMismatch = confirmBankAcc.length > 0 && confirmBankAcc !== data.bankAccountNo;

  const getErrorClass = (fieldValue: string) => {
    return showErrors && !fieldValue ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20";
  };
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
            Address & Banking Details
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Specify permanent address for postal communications & institutional banking records.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Left Column: Permanent Residential Address */}
        <div className="flex flex-col gap-6">
          <h3 className="text-sm font-black text-emerald-900 tracking-tight mb-2">Permanent Residential Address</h3>
          
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Village / House No. / Street *</label>
            <input 
              type="text" 
              placeholder="Village or Local Area Name" 
              value={data.village}
              onChange={(e) => updateData({ village: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.village)}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Post Office *</label>
              <input 
                type="text" 
                placeholder="P.O. Name" 
                value={data.postOffice}
                onChange={(e) => updateData({ postOffice: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.postOffice)}`}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Tehsil *</label>
              <input 
                type="text" 
                placeholder="Tehsil / Sub-district" 
                value={data.tehsil}
                onChange={(e) => updateData({ tehsil: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.tehsil)}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">District *</label>
              <input 
                type="text" 
                placeholder="District Name" 
                value={data.district}
                onChange={(e) => updateData({ district: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.district)}`}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">State *</label>
              <input 
                type="text" 
                placeholder="Himachal Pradesh" 
                value={data.stateName}
                onChange={(e) => updateData({ stateName: e.target.value })}
                className={`w-full bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(data.stateName)}`}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Postal PIN Code *</label>
            <input 
              type="text" 
              placeholder="6-digit ZIP code" 
              value={data.pinCode}
              onChange={(e) => updateData({ pinCode: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 tracking-widest ${getErrorClass(data.pinCode)}`}
            />
            {data.showErrors && !data.pinCode && <span className="text-[10px] font-bold text-red-500 mt-1.5">Pin Code is mandatory.</span>}
          </div>
        </div>

        {/* Right Column: Bank Details */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-[#0fa958]" />
            <h3 className="text-sm font-black text-emerald-900 tracking-tight">Student/Parent Bank Details (For Scholarships)</h3>
          </div>
          
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Bank Account Number *</label>
            <input 
              type="text" 
              placeholder="Ex: 34182901923" 
              value={data.bankAccountNo}
              onChange={(e) => updateData({ bankAccountNo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 tracking-widest font-mono"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Confirm Bank Account Number *</label>
            <input 
              type="password" 
              placeholder="Retype Account Number" 
              value={confirmBankAcc}
              onChange={(e) => setConfirmBankAcc(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium tracking-widest font-mono ${isBankAccMismatch ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-600" : "border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 placeholder:text-slate-400"}`}
            />
            {isBankAccMismatch && (
              <div className="flex items-center gap-1.5 mt-2 text-red-500 text-[10px] font-bold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Account numbers do not match!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Bank Name *</label>
              <BankSelect 
                value={data.bankName}
                onChange={(val) => updateData({ bankName: val })}
                errorClass={getErrorClass(data.bankName).includes("border-red-400") ? "border-red-400 bg-red-50" : ""}
              />
              {data.showErrors && !data.bankName && <span className="text-[10px] font-bold text-red-500 mt-1.5">Required</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Branch Name *</label>
              <input 
                type="text" 
                placeholder="Branch Name" 
                value={data.bankBranchName}
                onChange={(e) => updateData({ bankBranchName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">IFSC Code *</label>
            </div>
            <input 
              type="text" 
              placeholder="SBIN0001234" 
              value={data.ifscCode}
              onChange={(e) => updateData({ ifscCode: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 uppercase"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
