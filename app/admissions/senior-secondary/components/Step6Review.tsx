"use client";

import React from "react";
import { ClipboardList, Edit, User, Download } from "lucide-react";
import Image from "next/image";
import PrintableForm from "./PrintableForm";

interface Step6ReviewProps {
  onEdit: (step: number) => void;
}

export default function Step6Review({ onEdit }: Step6ReviewProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 mb-6">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <ClipboardList className="w-6 h-6 text-[#0fa958]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center justify-between">
            <span>Application Registration Summary</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Carefully read over your entries. Incorrect records may delay admissions verification.
          </p>
          <button 
            onClick={() => window.print()}
            className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all print:hidden"
          >
            <Download className="w-4 h-4" /> Download Admission Form
          </button>
        </div>
      </div>

      <PrintableForm />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 print:hidden">
        
        {/* Left Column: Profile Card */}
        <div className="md:col-span-4 flex flex-col h-full">
          <div className="w-full bg-[#fcfcfc] border border-slate-100 rounded-2xl p-6 flex flex-col items-center shadow-sm">
            
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 overflow-hidden flex items-center justify-center shadow-md">
              <User className="w-10 h-10 text-white/50" />
            </div>
            
            <h3 className="text-lg font-black text-slate-800 tracking-wider uppercase">ANONYMOUS USER</h3>
            
            <div className="mt-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              Class 11 - Science
            </div>

            <div className="w-full h-[1px] bg-slate-200 my-6 border-dashed" />

            <div className="w-full flex flex-col gap-4 text-sm font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Date of Birth:</span>
                <span className="text-slate-800 font-bold">2006-05-11</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Social Category:</span>
                <span className="text-slate-800 font-bold">OBC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Aadhaar UID:</span>
                <span className="text-slate-800 font-bold">123456789123</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Provisional Status:</span>
                <span className="text-slate-800 font-bold">Regular</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Summary Cards */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          {/* Card 1: Stream & Personal Family */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-black text-slate-400 tracking-widest uppercase">STREAM & PERSONAL FAMILY</h4>
              <button onClick={() => onEdit(2)} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">PAN Number:</span>
                <span className="text-xs font-bold text-slate-800">ABCDE1234F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Father's Name:</span>
                <span className="text-xs font-bold text-slate-800">Father Name</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Mother's Name:</span>
                <span className="text-xs font-bold text-slate-800">Mother Name</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Annual Income:</span>
                <span className="text-xs font-bold text-slate-800">₹1200000</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] text-slate-400 mb-0.5">Elective Subjects:</span>
                <span className="text-xs font-bold text-emerald-700">Physics, Chemistry</span>
              </div>
            </div>
          </div>

          {/* Card 2: Address & Banking */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-black text-slate-400 tracking-widest uppercase">ADDRESS & BANKING</h4>
              <button onClick={() => onEdit(3)} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] text-slate-400 mb-0.5">Village/Street:</span>
                <span className="text-xs font-bold text-slate-800 leading-tight">123 Street Name, Near Landmark, Dist: Solan, Himachal Pradesh - PIN: 173205</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Bank Acc:</span>
                <span className="text-xs font-bold text-slate-800">51561561</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-0.5">Bank IFSC:</span>
                <span className="text-xs font-bold text-slate-800 uppercase">SBIN0001234</span>
              </div>
            </div>
          </div>

          {/* Card 3: Academic Merit */}
          <div className="w-full border border-slate-100 rounded-2xl p-6 relative group hover:border-emerald-100 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xs font-black text-slate-400 tracking-widest uppercase">ACADEMIC MERIT</h4>
              <button onClick={() => onEdit(4)} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border border-emerald-100 rounded-xl p-3 bg-emerald-50/30">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Matriculation/10th (2022)</span>
                  <span className="text-[10px] text-slate-400">CBSE</span>
                </div>
                <div className="bg-white border border-emerald-200 text-emerald-700 font-bold text-[11px] px-3 py-1 rounded-full">
                  100.00%
                </div>
              </div>
              
              <div className="flex items-center justify-between border border-emerald-100 rounded-xl p-3 bg-emerald-50/30">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">11th Class (2026)</span>
                  <span className="text-[10px] text-slate-400">CBSE</span>
                </div>
                <div className="bg-white border border-emerald-200 text-emerald-700 font-bold text-[11px] px-3 py-1 rounded-full">
                  100.00%
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
