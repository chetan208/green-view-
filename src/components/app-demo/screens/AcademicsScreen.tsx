"use client";

import React, { useState } from "react";
import { BookOpen, Download } from "lucide-react";

export default function AcademicsScreen() {
  const [activeTab, setActiveTab] = useState<"performance" | "homework" | "study">("performance");

  return (
    <div className="flex flex-col w-full h-full pb-20 animate-fadeIn">
      <div className="p-5 bg-white border-b border-slate-200">
        <h1 className="text-[20px] font-bold text-[#121c28]">Academics</h1>
        
        {/* Segmented Control */}
        <div className="flex mt-4 bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("performance")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${activeTab === "performance" ? "bg-white text-[#006a37] shadow-sm" : "text-slate-500"}`}
          >
            Performance
          </button>
          <button 
            onClick={() => setActiveTab("homework")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${activeTab === "homework" ? "bg-white text-[#006a37] shadow-sm" : "text-slate-500"}`}
          >
            Homework
          </button>
          <button 
            onClick={() => setActiveTab("study")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${activeTab === "study" ? "bg-white text-[#006a37] shadow-sm" : "text-slate-500"}`}
          >
            Study Material
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
        {activeTab === "performance" && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-[15px] font-bold text-[#121c28] mb-1">Subject Progress</h2>
            
            {/* Subject Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Physics</h3>
                  <p className="text-xs text-slate-500">Mr. R.K. Sharma</p>
                </div>
                <span className="text-sm font-bold text-[#006a37]">88%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-[#006a37] h-1.5 rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Chemistry</h3>
                  <p className="text-xs text-slate-500">Mrs. S. Gupta</p>
                </div>
                <span className="text-sm font-bold text-[#0fa958]">75%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-[#0fa958] h-1.5 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            
            <div className="bg-[#F8F9FF] border border-[#dce6f7] rounded-xl p-6 mt-4 flex items-center justify-center h-40">
               <p className="text-xs text-slate-400 font-medium">[Chart Placeholder]</p>
            </div>
          </div>
        )}

        {activeTab === "homework" && (
          <div className="space-y-4 animate-fadeIn">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
               <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold rounded-md mb-2">PENDING • DUE TOMORROW</span>
               <h4 className="text-sm font-bold text-slate-900">Mathematics - Chapter 5</h4>
               <p className="text-xs text-slate-500 mt-1">Complete exercises 5.1 and 5.2 from NCERT book.</p>
             </div>
             
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 opacity-70">
               <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold rounded-md mb-2">SUBMITTED</span>
               <h4 className="text-sm font-bold text-slate-900">English - Essay</h4>
               <p className="text-xs text-slate-500 mt-1">Write an essay on global warming.</p>
             </div>
          </div>
        )}

        {activeTab === "study" && (
          <div className="space-y-4 animate-fadeIn">
             <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">Physics Revision Notes (Ch 1-3)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">2.4 MB • PDF</p>
                </div>
                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500">
                  <Download className="w-4 h-4" />
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
