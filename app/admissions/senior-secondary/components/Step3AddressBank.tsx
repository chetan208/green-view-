"use client";

import React from "react";
import { MapPin, Building2, HelpCircle } from "lucide-react";

export default function Step3AddressBank() {
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Post Office *</label>
              <input 
                type="text" 
                placeholder="P.O. Name" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Tehsil *</label>
              <input 
                type="text" 
                placeholder="Tehsil / Sub-district" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">District *</label>
              <input 
                type="text" 
                placeholder="District Name" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">State *</label>
              <input 
                type="text" 
                placeholder="Himachal Pradesh" 
                defaultValue="Himachal Pradesh"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 bg-slate-50"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Postal PIN Code *</label>
            <input 
              type="text" 
              placeholder="6-digit ZIP code" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
            />
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 tracking-widest font-mono"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Confirm Bank Account Number *</label>
            <input 
              type="password" 
              placeholder="Retype Account Number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 tracking-widest font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Bank Name *</label>
              <input 
                type="text" 
                placeholder="Bank Name" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Branch Name *</label>
              <input 
                type="text" 
                placeholder="Branch Name" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">IFSC Code *</label>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <HelpCircle className="w-3 h-3" /> Tooltip
              </span>
            </div>
            <input 
              type="text" 
              placeholder="SBIN0001234" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium placeholder:text-slate-400 uppercase"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
