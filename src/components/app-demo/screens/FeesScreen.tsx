"use client";

import React from "react";
import { AlertTriangle, ArrowRight, Download } from "lucide-react";

export default function FeesScreen() {
  return (
    <div className="flex flex-col w-full h-full pb-20 animate-fadeIn">
      <div className="p-5 bg-white border-b border-slate-200">
        <h1 className="text-[20px] font-bold text-[#121c28]">Fees & Dues</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        {/* Status Banner */}
        <div className="bg-[#FCE8E6] border border-rose-200 rounded-xl p-5 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
          <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2 opacity-80" />
          <p className="text-sm font-semibold text-rose-600 mb-1">Attention Required</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">₹40,000</h2>
          <p className="text-xs text-slate-500 mt-1">Pending Amount • Due by 15 Oct 2024</p>
        </div>

        {/* Detailed Breakdown */}
        <div>
          <h2 className="text-[15px] font-bold text-[#121c28] mb-3">Current Due Breakdown</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">Tuition Fee</span>
              <span className="text-sm font-bold text-slate-900">₹30,000</span>
            </div>
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">Transport Fee</span>
              <span className="text-sm font-bold text-slate-900">₹8,000</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="text-sm font-medium text-slate-600">Computer Fee</span>
              <span className="text-sm font-bold text-slate-900">₹2,000</span>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h2 className="text-[15px] font-bold text-[#121c28] mb-3">Recent Transactions</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-[#006a37] mb-0.5">Paid via UPI</p>
                <h4 className="text-sm font-bold text-slate-900">₹20,000</h4>
                <p className="text-[10px] text-slate-500 mt-1">TXN-987654321 • 01 Apr 2024</p>
              </div>
              <button className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-[#006a37]">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-20 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-slate-200">
        <button className="w-full flex items-center justify-center gap-2 bg-[#006a37] hover:bg-[#005229] text-white py-3.5 rounded-xl font-bold shadow-md transition-colors">
          Pay ₹40,000 Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
