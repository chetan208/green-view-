"use client";

import React, { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmissionContext } from "../context/AdmissionContext";
import BoardSelect from "../components/BoardSelect";

export default function Step4AcademicHistory() {
  const { data, updateData } = useAdmissionContext();
  const [openSection, setOpenSection] = useState<"10th" | "11th" | null>("10th");
  const { showErrors } = data;

  const getErrorClass = (fieldValue: string) => {
    return showErrors && !fieldValue ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-[#0fa958] focus:ring-emerald-500/20";
  };

  const toggleSection = (section: "10th" | "11th") => {
    setOpenSection(openSection === section ? null : section);
  };

  const updateRecord = (index: number, field: string, value: string) => {
    const newRecords = [...data.academicRecords];
    let finalValue = value;

    if (field === "marksObtained") {
      const max = parseFloat(newRecords[index].maxMarks) || 0;
      const obtained = parseFloat(value) || 0;
      if (max > 0 && obtained > max) {
        finalValue = newRecords[index].maxMarks;
      }
    }

    const record = { ...newRecords[index], [field]: finalValue };
    
    // Auto calculate percentage
    if (field === "maxMarks" || field === "marksObtained") {
      const max = parseFloat(record.maxMarks) || 0;
      const obtained = parseFloat(record.marksObtained) || 0;
      if (max > 0 && obtained >= 0 && obtained <= max) {
        record.percentage = ((obtained / max) * 100).toFixed(2) + "%";
      } else {
        record.percentage = "";
      }
    }
    
    newRecords[index] = record;
    updateData({ academicRecords: newRecords });
  };

  const renderFormFields = (title: string, index: number) => {
    const record = data.academicRecords[index];
    return (
    <div className="p-5 md:p-6 bg-[#fcfcfc] border-t border-slate-100 flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Passing Year *</label>
          <input 
            placeholder="YYYY"
            maxLength={4}
            value={record.passingYear}
            onChange={(e) => updateRecord(index, "passingYear", e.target.value)}
            className={`w-full bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(record.passingYear)}`} 
          />
          {showErrors && !record.passingYear && <span className="text-[10px] font-bold text-red-500 mt-1.5">Required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Board Name *</label>
          <BoardSelect 
            value={record.boardName}
            onChange={(val) => updateRecord(index, "boardName", val)}
            errorClass={getErrorClass(record.boardName).includes("border-red-400") ? "border-red-400 bg-red-50" : ""}
          />
          {showErrors && !record.boardName && <span className="text-[10px] font-bold text-red-500 mt-1.5">Required</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">School / Institution Name *</label>
        <input 
          placeholder="Full name of the previous school"
          value={record.school}
          onChange={(e) => updateRecord(index, "school", e.target.value)}
          className={`w-full bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(record.school)}`} 
        />
        {showErrors && !record.school && <span className="text-[10px] font-bold text-red-500 mt-1.5">School Name is required.</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Roll Number *</label>
          <input 
            placeholder="Board Roll No."
            value={record.rollNumber}
            onChange={(e) => updateRecord(index, "rollNumber", e.target.value)}
            className={`w-full bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(record.rollNumber)}`} 
          />
          {showErrors && !record.rollNumber && <span className="text-[10px] font-bold text-red-500 mt-1.5">Required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Result Status *</label>
          <div className="relative">
            <select 
              value={record.result}
              onChange={(e) => updateRecord(index, "result", e.target.value)}
              className="w-full bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none border border-slate-200 rounded-xl focus:border-[#0fa958] focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="Pass">Passed</option>
              <option value="Fail">Failed</option>
              <option value="Awaited">Result Awaited</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {record.result !== "Awaited" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Max Marks</label>
            <input 
              placeholder="e.g. 500"
              value={record.maxMarks}
              onChange={(e) => updateRecord(index, "maxMarks", e.target.value)}
              className={`w-full bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(record.maxMarks)}`} 
            />
            {showErrors && !record.maxMarks && <span className="text-[10px] font-bold text-red-500 mt-1.5">Required</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Marks Obtained</label>
            <input 
              placeholder="e.g. 450"
              value={record.marksObtained}
              onChange={(e) => updateRecord(index, "marksObtained", e.target.value)}
              className={`w-full bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none border rounded-xl transition-all ${getErrorClass(record.marksObtained)}`} 
            />
            {showErrors && !record.marksObtained && <span className="text-[10px] font-bold text-red-500 mt-1.5">Required</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wider">Percentage (%)</label>
            <input 
              placeholder="90%"
              value={record.percentage}
              readOnly
              className={`w-full bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none border rounded-xl transition-all ${getErrorClass(record.percentage)}`} 
            />
            {showErrors && !record.percentage && <span className="text-[10px] font-bold text-red-500 mt-1.5">Required</span>}
          </div>
        </div>
      )}
    </div>
  );
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 mb-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <GraduationCap className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
            Academic History Record
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Provide details of your previous academic qualifications.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* 10th Record Collapsible */}
        <div className={`w-full border rounded-2xl overflow-hidden transition-colors ${openSection === "10th" ? "border-emerald-200 shadow-sm" : "border-slate-200 hover:border-slate-300"}`}>
          <button 
            onClick={() => toggleSection("10th")}
            className={`w-full flex items-center justify-between p-5 md:p-6 transition-colors ${openSection === "10th" ? "bg-emerald-50/50" : "bg-white"}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${openSection === "10th" ? "bg-[#0fa958] text-white" : "bg-slate-100 text-slate-500"}`}>
                1
              </div>
              <h3 className={`font-bold ${openSection === "10th" ? "text-emerald-900" : "text-slate-700"}`}>
                10th / Matriculation Record *
              </h3>
            </div>
            {openSection === "10th" ? (
              <ChevronUp className="w-5 h-5 text-emerald-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>
          
          <AnimatePresence>
            {openSection === "10th" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderFormFields("10th Record", 0)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 11th Record Collapsible - Only show if Class 12 */}
        {data.selectedClass === "Class 12" && (
          <div className={`w-full border rounded-2xl overflow-hidden transition-colors ${openSection === "11th" ? "border-emerald-200 shadow-sm" : "border-slate-200 hover:border-slate-300"}`}>
          <button 
            onClick={() => toggleSection("11th")}
            className={`w-full flex items-center justify-between p-5 md:p-6 transition-colors ${openSection === "11th" ? "bg-emerald-50/50" : "bg-white"}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${openSection === "11th" ? "bg-[#0fa958] text-white" : "bg-slate-100 text-slate-500"}`}>
                2
              </div>
              <h3 className={`font-bold ${openSection === "11th" ? "text-emerald-900" : "text-slate-700"}`}>
                11th Class Record
              </h3>
            </div>
            {openSection === "11th" ? (
              <ChevronUp className="w-5 h-5 text-emerald-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>
          
          <AnimatePresence>
            {openSection === "11th" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderFormFields("11th Record", 1)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        )}

      </div>
    </div>
  );
}
