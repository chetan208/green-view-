"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Building2, HelpCircle, AlertCircle, Bus, Loader2 } from "lucide-react";
import { getPublicStationsApi } from "@/lib/api";
import { useAdmissionContext } from "../context/AdmissionContext";
import BankSelect from "../components/BankSelect";

export default function Step3AddressBank() {
  const { data, updateData } = useAdmissionContext();
  const [confirmBankAcc, setConfirmBankAcc] = useState("");
  const [stations, setStations] = useState<any[]>([]);
  const [isLoadingStations, setIsLoadingStations] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      if (!data.transportDetails?.requiresTransport) return;
      setIsLoadingStations(true);
      try {
        const res = await getPublicStationsApi();
        setStations(res.stations || res.data || res || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingStations(false);
      }
    };
    fetchStations();
  }, [data.transportDetails?.requiresTransport]);
  
  const showErrors = data.meta.showErrors;
  const isBankAccMismatch = confirmBankAcc.length > 0 && confirmBankAcc !== data.bankDetails.bankAccountNo;

  const getErrorClass = (fieldValue: string) => {
    return showErrors && !fieldValue ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-green focus:ring-brand-green/20";
  };
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-brand-green" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-medium md:font-bold text-slate-800 tracking-tight">
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
          <h3 className="text-sm font-medium md:font-bold text-emerald-900 tracking-tight mb-2">Permanent Residential Address</h3>
          
          <div className="flex flex-col">
            <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Village / House No. / Street *</label>
            <input 
              type="text" 
              placeholder="Village or Local Area Name" 
              value={data.addressDetails.village}
              onChange={(e) => updateData({ addressDetails: { ...data.addressDetails, village: e.target.value } })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.addressDetails.village)}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Post Office *</label>
              <input 
                type="text" 
                placeholder="P.O. Name" 
                value={data.addressDetails.postOffice}
                onChange={(e) => updateData({ addressDetails: { ...data.addressDetails, postOffice: e.target.value } })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.addressDetails.postOffice)}`}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Tehsil *</label>
              <input 
                type="text" 
                placeholder="Tehsil / Sub-district" 
                value={data.addressDetails.tehsil}
                onChange={(e) => updateData({ addressDetails: { ...data.addressDetails, tehsil: e.target.value } })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.addressDetails.tehsil)}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">District *</label>
              <input 
                type="text" 
                placeholder="District Name" 
                value={data.addressDetails.district}
                onChange={(e) => updateData({ addressDetails: { ...data.addressDetails, district: e.target.value } })}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${getErrorClass(data.addressDetails.district)}`}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">State *</label>
              <input 
                type="text" 
                placeholder="Himachal Pradesh" 
                value={data.addressDetails.stateName}
                onChange={(e) => updateData({ addressDetails: { ...data.addressDetails, stateName: e.target.value } })}
                className={`w-full bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(data.addressDetails.stateName)}`}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Postal PIN Code *</label>
            <input 
              type="text" 
              placeholder="6-digit ZIP code" 
              value={data.addressDetails.pinCode}
              onChange={(e) => updateData({ addressDetails: { ...data.addressDetails, pinCode: e.target.value } })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium placeholder:text-slate-400 tracking-widest ${getErrorClass(data.addressDetails.pinCode)}`}
            />
            {showErrors && !data.addressDetails.pinCode && <span className="text-[10px] font-medium md:font-semibold text-red-500 mt-1.5">Pin Code is mandatory.</span>}
          </div>
        </div>

        {/* Right Column: Bank Details */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-brand-green" />
            <h3 className="text-sm font-medium md:font-bold text-emerald-900 tracking-tight">Student/Parent Bank Details (For Scholarships)</h3>
          </div>
          
          <div className="flex flex-col">
            <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Bank Account Number *</label>
            <input 
              type="text" 
              placeholder="Ex: 34182901923" 
              value={data.bankDetails.bankAccountNo}
              onChange={(e) => updateData({ bankDetails: { ...data.bankDetails, bankAccountNo: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 tracking-widest font-mono"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Confirm Bank Account Number *</label>
            <input 
              type="password" 
              placeholder="Retype Account Number" 
              value={confirmBankAcc}
              onChange={(e) => setConfirmBankAcc(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium tracking-widest font-mono ${isBankAccMismatch ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-600" : "border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400"}`}
            />
            {isBankAccMismatch && (
              <div className="flex items-center gap-1.5 mt-2 text-red-500 text-[10px] font-medium md:font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Account numbers do not match!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Bank Name *</label>
              <BankSelect 
                value={data.bankDetails.bankName}
                onChange={(val) => updateData({ bankDetails: { ...data.bankDetails, bankName: val } })}
                errorClass={getErrorClass(data.bankDetails.bankName).includes("border-red-400") ? "border-red-400 bg-red-50" : ""}
              />
              {showErrors && !data.bankDetails.bankName && <span className="text-[10px] font-medium md:font-semibold text-red-500 mt-1.5">Required</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Branch Name *</label>
              <input 
                type="text" 
                placeholder="Branch Name" 
                value={data.bankDetails.bankBranchName}
                onChange={(e) => updateData({ bankDetails: { ...data.bankDetails, bankBranchName: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 uppercase tracking-wider">IFSC Code *</label>
            </div>
            <input 
              type="text" 
              placeholder="SBIN0001234" 
              value={data.bankDetails.ifscCode}
              onChange={(e) => updateData({ bankDetails: { ...data.bankDetails, ifscCode: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 uppercase"
            />
          </div>
        </div>

      </div>

      <div className="w-full h-px bg-slate-200 my-8" />

      {/* Transport Details */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Bus className="w-4 h-4 text-brand-green" />
          </div>
          <h3 className="text-sm font-medium md:font-bold text-emerald-900 tracking-tight">Transport Facility</h3>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex flex-col shrink-0">
            <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Does the student require school bus transport? *</label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="seniorRequiresTransport" 
                  checked={data.transportDetails?.requiresTransport === true} 
                  onChange={() => updateData({ transportDetails: { ...data.transportDetails, requiresTransport: true } })} 
                  className="w-4 h-4 text-brand-green border-slate-300 focus:ring-brand-green" 
                />
                <span className="text-sm font-medium text-slate-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="seniorRequiresTransport" 
                  checked={data.transportDetails?.requiresTransport === false} 
                  onChange={() => updateData({ transportDetails: { ...data.transportDetails, requiresTransport: false, selectedStation: "" } })} 
                  className="w-4 h-4 text-brand-green border-slate-300 focus:ring-brand-green" 
                />
                <span className="text-sm font-medium text-slate-700">No</span>
              </label>
            </div>
          </div>

          {data.transportDetails?.requiresTransport && (
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Select Boarding Station *</label>
              <div className="relative">
                <select
                  value={data.transportDetails.selectedStation}
                  onChange={(e) => updateData({ transportDetails: { ...data.transportDetails, selectedStation: e.target.value } })}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium appearance-none bg-white ${getErrorClass(data.transportDetails.selectedStation)}`}
                  disabled={isLoadingStations}
                >
                  <option value="" disabled>Select a station</option>
                  {stations.map((st: any, idx: number) => (
                    <option key={idx} value={st.station || st.name || st._id}>{st.station || st.name || "Unnamed Station"}</option>
                  ))}
                </select>
                {isLoadingStations && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  </div>
                )}
              </div>
              {showErrors && !data.transportDetails.selectedStation && <span className="text-[10px] font-medium md:font-semibold text-red-500 mt-1.5">Please select a station.</span>}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
