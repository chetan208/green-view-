"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Bus, Loader2 } from "lucide-react";
import { getPublicStationsApi } from "@/lib/api";
import { usePrimaryAdmissionContext } from "../context/PrimaryAdmissionContext";

export default function Step4Contact() {
  const { data, updateData } = usePrimaryAdmissionContext();
  const [sameAsPresent, setSameAsPresent] = useState(false);
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

  const getErrorClass = (fieldValue: string) => {
    return data.meta.showErrors && !fieldValue 
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50" 
      : "border-slate-200 focus:border-brand-green focus:ring-brand-green/20";
  };

  const handleSameAsPresentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsPresent(checked);
    if (checked) {
      updateData({ contactDetails: { ...data.contactDetails, permanentAddress: data.contactDetails.presentAddress } });
    } else {
      updateData({ contactDetails: { ...data.contactDetails, permanentAddress: "" } });
    }
  };

  const handlePresentAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    updateData({ contactDetails: { ...data.contactDetails, presentAddress: val } });
    if (sameAsPresent) {
      updateData({ contactDetails: { ...data.contactDetails, permanentAddress: val } });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 md:mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-brand-green" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-normal md:font-medium text-slate-800 tracking-tight">
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
          <label className="text-[11px] font-normal md:font-medium text-slate-800 mb-2 uppercase tracking-wider">Present Address with PIN Code *</label>
          <textarea 
            placeholder="Enter full present residential address including PIN code" 
            value={data.contactDetails.presentAddress}
            onChange={handlePresentAddressChange}
            rows={3}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 resize-none ${getErrorClass(data.contactDetails.presentAddress)}`}
          />
          {data.meta.showErrors && !data.contactDetails.presentAddress && <span className="text-[10px] font-normal md:font-medium text-red-500 mt-1.5">Required field.</span>}
        </div>

        {/* Permanent Address */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-normal md:font-medium text-slate-800 uppercase tracking-wider">Permanent Address *</label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${sameAsPresent ? "bg-brand-green border-brand-green" : "border-slate-300 group-hover:border-brand-green"}`}>
                {sameAsPresent && <div className="w-2 h-2 bg-white rounded-[1px]" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={sameAsPresent}
                onChange={handleSameAsPresentChange}
              />
              <span className="text-[10px] font-normal md:font-medium text-slate-500 group-hover:text-slate-800 transition-colors uppercase">Same as Present</span>
            </label>
          </div>
          <textarea 
            placeholder="Enter full permanent residential address" 
            value={data.contactDetails.permanentAddress}
            onChange={(e) => {
              if (!sameAsPresent) updateData({ contactDetails: { ...data.contactDetails, permanentAddress: e.target.value } });
            }}
            readOnly={sameAsPresent}
            rows={3}
            className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 resize-none ${
              sameAsPresent ? "bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200" : getErrorClass(data.contactDetails.permanentAddress)
            }`}
          />
          {data.meta.showErrors && !data.contactDetails.permanentAddress && !sameAsPresent && <span className="text-[10px] font-normal md:font-medium text-red-500 mt-1.5">Required field.</span>}
        </div>

        <div className="w-full h-px bg-slate-200 my-2" />

        {/* Telephone */}
        <div className="flex flex-col md:w-1/2">
          <label className="text-[11px] font-normal md:font-medium text-slate-800 mb-2 uppercase tracking-wider">Telephone No. (if any)</label>
          <input 
            type="text" 
            placeholder="e.g., +91 9876543210" 
            value={data.contactDetails.telephoneNo}
            onChange={(e) => updateData({ contactDetails: { ...data.contactDetails, telephoneNo: e.target.value } })}
            className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="w-full h-px bg-slate-200 my-2" />

        {/* Transport Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <Bus className="w-4 h-4 text-brand-green" />
            </div>
            <h3 className="text-sm font-medium md:font-bold text-emerald-900 tracking-tight">Transport Facility</h3>
          </div>
          
          <div className="flex flex-col mb-4">
            <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Does the student require school bus transport? *</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="requiresTransport" 
                  checked={data.transportDetails?.requiresTransport === true} 
                  onChange={() => updateData({ transportDetails: { ...data.transportDetails, requiresTransport: true } })} 
                  className="w-4 h-4 text-brand-green border-slate-300 focus:ring-brand-green" 
                />
                <span className="text-sm font-medium text-slate-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="requiresTransport" 
                  checked={data.transportDetails?.requiresTransport === false} 
                  onChange={() => updateData({ transportDetails: { ...data.transportDetails, requiresTransport: false, selectedStation: "" } })} 
                  className="w-4 h-4 text-brand-green border-slate-300 focus:ring-brand-green" 
                />
                <span className="text-sm font-medium text-slate-700">No</span>
              </label>
            </div>
          </div>

          {data.transportDetails?.requiresTransport && (
            <div className="flex flex-col md:w-1/2">
              <label className="text-[11px] font-medium md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Select Boarding Station *</label>
              <div className="relative">
                <select
                  value={data.transportDetails.selectedStation}
                  onChange={(e) => updateData({ transportDetails: { ...data.transportDetails, selectedStation: e.target.value } })}
                  className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium appearance-none bg-white ${getErrorClass(data.transportDetails.selectedStation)}`}
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
              {data.meta.showErrors && !data.transportDetails.selectedStation && <span className="text-[10px] font-medium md:font-semibold text-red-500 mt-1.5">Please select a station.</span>}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
