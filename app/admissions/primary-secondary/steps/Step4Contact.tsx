"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { usePrimaryAdmissionContext } from "../context/PrimaryAdmissionContext";

export default function Step4Contact() {
  const { data, updateData } = usePrimaryAdmissionContext();
  const [sameAsPresent, setSameAsPresent] = useState(false);

  const getErrorClass = (fieldValue: string) => {
    return data.showErrors && !fieldValue 
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50" 
      : "border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20";
  };

  const handleSameAsPresentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsPresent(checked);
    if (checked) {
      updateData({ permanentAddress: data.presentAddress });
    } else {
      updateData({ permanentAddress: "" });
    }
  };

  const handlePresentAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    updateData({ presentAddress: val });
    if (sameAsPresent) {
      updateData({ permanentAddress: val });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 md:mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-normal md:font-semibold text-slate-800 tracking-tight">
            Contact Details
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Provide communication and residential address details.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        
        {/* Present Address */}
        <div className="flex flex-col">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Present Address with PIN Code *</label>
          <textarea 
            placeholder="Enter full present residential address including PIN code" 
            value={data.presentAddress}
            onChange={handlePresentAddressChange}
            rows={3}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 resize-none ${getErrorClass(data.presentAddress)}`}
          />
          {data.showErrors && !data.presentAddress && <span className="text-[10px] font-normal md:font-semibold text-red-500 mt-1.5">Required field.</span>}
        </div>

        {/* Permanent Address */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-normal md:font-semibold text-slate-800 uppercase tracking-wider">Permanent Address *</label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${sameAsPresent ? "bg-[#0fa958] border-[#0fa958]" : "border-slate-300 group-hover:border-[#0fa958]"}`}>
                {sameAsPresent && <div className="w-2 h-2 bg-white rounded-[1px]" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={sameAsPresent}
                onChange={handleSameAsPresentChange}
              />
              <span className="text-[10px] font-normal md:font-semibold text-slate-500 group-hover:text-slate-800 transition-colors uppercase">Same as Present</span>
            </label>
          </div>
          <textarea 
            placeholder="Enter full permanent residential address" 
            value={data.permanentAddress}
            onChange={(e) => {
              if (!sameAsPresent) updateData({ permanentAddress: e.target.value });
            }}
            readOnly={sameAsPresent}
            rows={3}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 resize-none ${
              sameAsPresent ? "bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200" : getErrorClass(data.permanentAddress)
            }`}
          />
          {data.showErrors && !data.permanentAddress && !sameAsPresent && <span className="text-[10px] font-normal md:font-semibold text-red-500 mt-1.5">Required field.</span>}
        </div>

        <div className="w-full h-px bg-slate-200 my-2" />

        {/* Telephone */}
        <div className="flex flex-col md:w-1/2">
          <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Telephone No. (if any)</label>
          <input 
            type="text" 
            placeholder="e.g., +91 9876543210" 
            value={data.telephoneNo}
            onChange={(e) => updateData({ telephoneNo: e.target.value })}
            className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
          />
        </div>

      </div>
    </div>
  );
}
