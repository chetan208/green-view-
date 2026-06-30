"use client";

import React, { useState } from "react";
import { GraduationCap, Camera, Check } from "lucide-react";

export default function Step1StreamSelection() {
  const [selectedClass, setSelectedClass] = useState<string>("Class 11");
  const [selectedStream, setSelectedStream] = useState<string>("Science");
  const [isProvisional, setIsProvisional] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  type Subject = { name: string; compulsory: boolean };

  const streamSubjects: Record<string, Subject[]> = {
    "Science": [
      { name: "Physics", compulsory: true },
      { name: "Chemistry", compulsory: true },
      { name: "Mathematics", compulsory: false },
      { name: "Biology", compulsory: false },
      { name: "Computer Science", compulsory: false },
      { name: "Physical Education", compulsory: false }
    ],
    "Commerce": [
      { name: "Accountancy", compulsory: true },
      { name: "Business Studies", compulsory: true },
      { name: "Economics", compulsory: false },
      { name: "Mathematics", compulsory: false },
      { name: "Informatics Practices", compulsory: false },
      { name: "Physical Education", compulsory: false }
    ],
    "Arts": [
      { name: "History", compulsory: true },
      { name: "Political Science", compulsory: true },
      { name: "Geography", compulsory: false },
      { name: "Economics", compulsory: false },
      { name: "Sociology", compulsory: false },
      { name: "Physical Education", compulsory: false }
    ]
  };
  
  // Initialize with Science compulsory subjects
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    streamSubjects["Science"].filter(s => s.compulsory).map(s => s.name)
  );

  const handleStreamChange = (stream: string) => {
    setSelectedStream(stream);
    // Reset subjects to compulsory ones for the new stream
    const defaultSubjects = streamSubjects[stream].filter(s => s.compulsory).map(s => s.name);
    setSelectedSubjects(defaultSubjects);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      if (selectedSubjects.length < 4) {
        setSelectedSubjects([...selectedSubjects, subject]);
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
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
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
          <label className="text-sm font-bold text-slate-800 mb-3 block">
            Student Photograph *
          </label>
          <label className="w-40 h-48 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/30 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition-colors group relative overflow-hidden">
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
                  <Camera className="w-5 h-5 text-[#0fa958]" />
                </div>
                <span className="text-sm font-bold text-[#0fa958]">Upload Photo</span>
                <span className="text-[10px] font-medium text-slate-400 mt-1">JPG, PNG up to 2MB</span>
              </>
            )}
          </label>
          <p className="text-[11px] text-slate-400 font-medium text-center md:text-left mt-3 leading-relaxed max-w-[160px]">
            Please upload a recent formal passport-sized photograph.
          </p>
        </div>

        {/* Right Column: Form Fields */}
        <div className="md:col-span-9 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Apply for Class */}
            <div>
              <label className="text-sm font-bold text-slate-800 mb-3 block">
                Apply for Class *
              </label>
              <div className="flex gap-4">
                {["Class 11", "Class 12"].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
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
                    <span className={`text-sm font-bold ${selectedClass === cls ? "text-slate-900" : "text-slate-600"}`}>
                      {cls}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Stream */}
            <div>
              <label className="text-sm font-bold text-slate-800 mb-3 block">
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
                    <span className={`text-xs font-bold ${selectedStream === stream ? "text-slate-900" : "text-slate-600"}`}>
                      {stream}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Combinations Card */}
          <div className="w-full bg-[#f6fcf8] border border-emerald-100 rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-black text-emerald-800 mb-5">Subject Combinations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
              
              {/* Compulsory Language */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                  COMPULSORY LANGUAGE
                </label>
                <div className="w-full bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">English (Core)</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">
                    Mandatory
                  </span>
                </div>
              </div>

              {/* Select Electives */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                  SELECT ELECTIVES (PICK 4) *
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
                          <span className={`text-sm font-semibold ${isSelected ? "text-slate-800" : "text-slate-600"}`}>
                            {subject.name}
                          </span>
                        </div>
                        {subject.compulsory && (
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
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

      {/* Provisional Admission Toggle */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Provisional Admission Status</h4>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Enable this if your previous board class results have not yet been declared.
          </p>
        </div>
        
        <button 
          onClick={() => setIsProvisional(!isProvisional)}
          className="flex items-center gap-3 self-start sm:self-auto"
        >
          <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isProvisional ? "bg-[#0fa958]" : "bg-slate-200"}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${isProvisional ? "translate-x-6" : "translate-x-0"}`} />
          </div>
          <span className={`text-sm font-bold ${isProvisional ? "text-[#0fa958]" : "text-slate-600"}`}>
            {isProvisional ? "Provisional" : "Regular"}
          </span>
        </button>
      </div>

    </div>
  );
}
