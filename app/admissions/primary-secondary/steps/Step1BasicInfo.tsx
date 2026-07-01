"use client";

import React, { useRef } from "react";
import { User, Camera, UploadCloud } from "lucide-react";
import { usePrimaryAdmissionContext } from "../context/PrimaryAdmissionContext";

export default function Step1BasicInfo() {
  const { data, updateData } = usePrimaryAdmissionContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getErrorClass = (fieldValue: string) => {
    return data.showErrors && !fieldValue 
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" 
      : "border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20";
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ photoPreview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const classes = ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 md:mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <User className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-normal md:font-semibold text-slate-800 tracking-tight">
            Basic Information
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Provide the primary details of the student applying for admission.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Photo Upload */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-full max-w-[200px] aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-300 overflow-hidden relative group bg-slate-50 transition-all hover:bg-slate-100 flex flex-col items-center justify-center">
            {data.photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.photoPreview} alt="Student" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5 text-slate-500" />
                </div>
                <span className="text-xs font-normal md:font-semibold text-slate-600 mb-1">Passport Photo</span>
                <span className="text-[10px] text-slate-400">Max size 2MB (JPG/PNG)</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="w-8 h-8 text-white mb-2" />
              <span className="text-xs font-normal md:font-semibold text-white">Upload New</span>
            </div>
            <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
          </div>
          {data.showErrors && !data.photoPreview && (
            <span className="text-xs font-normal md:font-semibold text-red-500 mt-2 text-center">Photograph is mandatory</span>
          )}
        </div>

        {/* Right Side: Form Fields */}
        <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-5">
          
          <div className="flex flex-col">
            <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Class to which admission is sought *</label>
            <select
              value={data.selectedClass}
              onChange={(e) => updateData({ selectedClass: e.target.value })}
              className={`w-full bg-white px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(data.selectedClass)}`}
            >
              <option value="">Select Class</option>
              {classes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {data.showErrors && !data.selectedClass && <span className="text-[10px] font-normal md:font-semibold text-red-500 mt-1.5">Required field.</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Name of the student (Block Letters) *</label>
            <input 
              type="text" 
              placeholder="e.g., ROHAN SHARMA" 
              value={data.studentName}
              onChange={(e) => updateData({ studentName: e.target.value.toUpperCase() })}
              className={`w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl border outline-none transition-all text-xs md:text-sm font-medium placeholder:text-slate-400 uppercase ${getErrorClass(data.studentName)}`}
            />
            {data.showErrors && !data.studentName && <span className="text-[10px] font-normal md:font-semibold text-red-500 mt-1.5">Required field.</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-normal md:font-semibold text-slate-800 mb-2 uppercase tracking-wider">Sex *</label>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${data.sex === gender ? "border-[#0fa958] bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"} ${data.showErrors && !data.sex ? "border-red-400" : ""}`}>
                  <input 
                    type="radio" 
                    name="sex" 
                    value={gender} 
                    checked={data.sex === gender}
                    onChange={(e) => updateData({ sex: e.target.value })}
                    className="hidden" 
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${data.sex === gender ? "border-[#0fa958]" : "border-slate-300"}`}>
                    {data.sex === gender && <div className="w-2 h-2 rounded-full bg-[#0fa958]" />}
                  </div>
                  <span className="text-sm font-normal md:font-semibold">{gender}</span>
                </label>
              ))}
            </div>
            {data.showErrors && !data.sex && <span className="text-[10px] font-normal md:font-semibold text-red-500 mt-1.5">Please select gender.</span>}
          </div>

        </div>
      </div>
    </div>
  );
}
