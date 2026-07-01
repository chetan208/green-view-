"use client";

import React from "react";
import { GraduationCap, Camera, Check } from "lucide-react";
import { useAdmissionContext } from "../context/AdmissionContext";

export default function Step1StreamSelection() {
  const { data, updateData } = useAdmissionContext();
  const { selectedClass, selectedStream, isProvisional, photoPreview, selectedSubjects, showErrors } = data;
  
  const hasPhotoError = showErrors && !photoPreview;
  const hasSubjectError = showErrors && selectedSubjects.length !== 5;

  type Subject = { name: string; compulsory: boolean };

  const streamSubjects: Record<string, Subject[]> = {
    "Science": [
      { name: "English (Core)", compulsory: true },
      { name: "Physics", compulsory: true },
      { name: "Chemistry", compulsory: true },
      { name: "Mathematics", compulsory: false },
      { name: "Biology", compulsory: false },
      { name: "Computer Science", compulsory: false },
      { name: "Physical Education", compulsory: false }
    ],
    "Commerce": [
      { name: "English (Core)", compulsory: true },
      { name: "Accountancy", compulsory: true },
      { name: "Business Studies", compulsory: true },
      { name: "Economics", compulsory: false },
      { name: "Mathematics", compulsory: false },
      { name: "Informatics Practices", compulsory: false },
      { name: "Physical Education", compulsory: false }
    ],
    "Arts": [
      { name: "English (Core)", compulsory: true },
      { name: "History", compulsory: true },
      { name: "Political Science", compulsory: true },
      { name: "Geography", compulsory: false },
      { name: "Economics", compulsory: false },
      { name: "Sociology", compulsory: false },
      { name: "Physical Education", compulsory: false }
    ]
  };
  
  const handleStreamChange = (stream: string) => {
    const defaultSubjects = streamSubjects[stream].filter(s => s.compulsory).map(s => s.name);
    updateData({ selectedStream: stream, selectedSubjects: defaultSubjects });
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

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      updateData({ selectedSubjects: selectedSubjects.filter(s => s !== subject) });
    } else {
      if (selectedSubjects.length < 5) {
        updateData({ selectedSubjects: [...selectedSubjects, subject] });
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <GraduationCap className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold md:font-black text-slate-800 tracking-tight">
            Student & Stream Selection
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Select your desired class, stream and core elective subjects for admission.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        
        {/* Left Column: Photo Upload */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start">
          <label className="text-sm font-semibold md:font-bold text-slate-800 mb-3 block">
            Student Photograph *
          </label>
          <label className={`w-40 h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden ${hasPhotoError ? 'border-red-400 bg-red-50 hover:bg-red-100' : 'border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50'}`}>
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              className="hidden" 
              onChange={handlePhotoUpload}
            />
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="Student" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Camera className={`w-5 h-5 ${hasPhotoError ? 'text-red-500' : 'text-[#0fa958]'}`} />
                </div>
                <span className={`text-sm font-semibold md:font-bold ${hasPhotoError ? 'text-red-500' : 'text-[#0fa958]'}`}>Upload Photo</span>
                <span className="text-[10px] font-medium text-slate-400 mt-1">JPG, PNG up to 2MB</span>
              </>
            )}
          </label>
          {hasPhotoError && <span className="text-[10px] font-semibold md:font-bold text-red-500 mt-2">Photo is mandatory</span>}
          <p className="text-[11px] text-slate-400 font-medium text-center md:text-left mt-3 leading-relaxed max-w-[160px]">
            Please upload a recent formal passport-sized photograph.
          </p>
        </div>

        {/* Right Column: Form Fields */}
        <div className="md:col-span-9 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Apply for Class */}
            <div>
              <label className="text-sm font-semibold md:font-bold text-slate-800 mb-3 block">
                Apply for Class *
              </label>
              <div className="flex gap-4">
                {["Class 11", "Class 12"].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => updateData({ selectedClass: cls })}
                    className={`flex-1 flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedClass === cls 
                        ? "border-blue-500 bg-blue-50/30" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedClass === cls ? "border-blue-500" : "border-slate-300"
                    }`}>
                      {selectedClass === cls && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className={`text-sm font-semibold md:font-bold ${selectedClass === cls ? "text-slate-900" : "text-slate-600"}`}>
                      {cls}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Stream */}
            <div>
              <label className="text-sm font-semibold md:font-bold text-slate-800 mb-3 block">
                Select Stream *
              </label>
              <div className="flex gap-3">
                {Object.keys(streamSubjects).map((stream) => (
                  <button
                    key={stream}
                    onClick={() => handleStreamChange(stream)}
                    className={`flex-1 flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all ${
                      selectedStream === stream 
                        ? "border-blue-500 bg-blue-50/30" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedStream === stream ? "border-blue-500" : "border-slate-300"
                    }`}>
                      {selectedStream === stream && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className={`text-xs font-semibold md:font-bold ${selectedStream === stream ? "text-slate-900" : "text-slate-600"}`}>
                      {stream}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Combinations Card */}
          <div className={`w-full border rounded-2xl p-5 md:p-6 transition-colors ${hasSubjectError ? 'bg-red-50/30 border-red-200' : 'bg-[#f6fcf8] border-emerald-100'}`}>
            <div className="flex justify-between items-center mb-5">
              <h3 className={`text-sm font-semibold md:font-black ${hasSubjectError ? 'text-red-700' : 'text-emerald-800'}`}>Subject Combinations</h3>
              {hasSubjectError && <span className="text-[10px] font-semibold md:font-bold text-red-500">Please select 4 electives</span>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
              
              {/* Selected Subjects Column */}
              <div className="flex flex-col gap-6">
                {/* Selected Subjects List */}
                {selectedSubjects.length > 0 && (
                  <div>
                    <label className="text-[10px] font-semibold md:font-black text-slate-400 uppercase tracking-wider mb-2 block">
                      YOUR SELECTED SUBJECTS
                    </label>
                    <div className="flex flex-col gap-2">
                      {selectedSubjects.map((sub, i) => (
                        <div key={i} className="w-full bg-white border border-blue-100 rounded-xl p-3.5 flex items-center gap-3 shadow-sm transition-all">
                          <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          <span className="text-sm font-semibold md:font-bold text-slate-700 leading-tight">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Remaining Counter */}
                {selectedSubjects.length < 5 && (
                  <div className="w-full bg-orange-50/50 border border-orange-200 border-dashed rounded-xl p-3.5 flex items-center justify-center mt-auto">
                    <span className="text-[11px] font-semibold md:font-bold text-orange-600">
                      Please select {5 - selectedSubjects.length} more subject{5 - selectedSubjects.length > 1 ? 's' : ''} from the list ➔
                    </span>
                  </div>
                )}
              </div>

              {/* Select Electives */}
              <div>
                <label className="text-[10px] font-semibold md:font-black text-slate-400 uppercase tracking-wider mb-2 block">
                  AVAILABLE SUBJECTS (PICK 5 TOTAL) *
                </label>
                <div className="flex flex-col gap-2">
                  {streamSubjects[selectedStream].map((subject) => {
                    const isSelected = selectedSubjects.includes(subject.name);
                    return (
                      <div 
                        key={subject.name}
                        onClick={() => !subject.compulsory && toggleSubject(subject.name)}
                        className={`w-full bg-white border ${isSelected ? "border-blue-200" : "border-slate-100"} rounded-xl p-3 flex items-center justify-between transition-colors ${!subject.compulsory ? 'cursor-pointer hover:border-slate-300' : 'opacity-90'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                          </div>
                          <span className={`text-sm font-normal md:font-semibold ${isSelected ? "text-slate-800" : "text-slate-600"}`}>
                            {subject.name}
                          </span>
                        </div>
                        {subject.compulsory && (
                          <span className="text-[9px] font-semibold md:font-bold text-slate-400 uppercase tracking-widest">
                            COMPULSORY
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
