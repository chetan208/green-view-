"use client";

import React from "react";
import { CreditCard, FileText, Download, CheckCircle2, QrCode } from "lucide-react";

export default function PortalFees() {
  const receipts = [
    { id: "INV-2026-0954", period: "Quarter 1 (Apr - Jun)", amount: "₹14,200", date: "08 April 2026", status: "Paid", method: "UPI / Net Banking" },
    { id: "INV-2026-1439", period: "Quarter 2 (Jul - Sep)", amount: "₹14,200", date: "02 July 2026", status: "Paid", method: "Credit Card" },
    { id: "INV-2026-2094", period: "Quarter 3 (Oct - Dec)", amount: "₹14,200", date: "Pending", status: "Upcoming", method: "--" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      
      {/* Cards stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-green" />
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
            <CreditCard className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Quarter 2 Tuition Due</span>
            <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">₹0 (Paid)</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-navy" />
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Upcoming Due Date</span>
            <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">Oct 05, 2026</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Session Cycle</span>
            <span className="text-lg font-semibold md:font-extrabold text-slate-800 mt-0.5">FY 2026-27</span>
          </div>
        </div>

      </div>

      {/* Modern Digital Receipt Slips layout */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
        <h3 className="text-xs font-semibold md:font-extrabold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
          Fee Receipts Ledger
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {receipts.map((rec) => {
            const isPaid = rec.status === "Paid";
            return (
              <div 
                key={rec.id} 
                className="bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-[0_2px_10px_-5px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300"
              >
                {/* Top header status bar */}
                <div className={`py-2 px-4 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider ${
                  isPaid ? "bg-emerald-50 text-brand-green border-b border-emerald-100/30" : "bg-slate-150/50 text-slate-500 border-b border-slate-200/30"
                }`}>
                  <span>{rec.id}</span>
                  <span>{rec.status}</span>
                </div>

                {/* Amount details */}
                <div className="p-4 flex flex-col items-center text-center gap-2.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{rec.period}</span>
                  <span className="text-2xl font-black text-slate-800">{rec.amount}</span>
                  
                  {/* Decorative dashed divider line */}
                  <div className="w-full border-t border-dashed border-slate-200/80 my-1" />

                  {/* Transaction metadata */}
                  <div className="w-full flex flex-col gap-1.5 text-[10px] font-semibold text-slate-500 text-left">
                    <div className="flex justify-between">
                      <span>Payment Date:</span>
                      <span className="text-slate-700">{rec.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gateway Mode:</span>
                      <span className="text-slate-700">{rec.method}</span>
                    </div>
                  </div>
                </div>

                {/* Slip bottom action bar */}
                <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                  <QrCode className="w-5 h-5 text-slate-350" />
                  {isPaid ? (
                    <button
                      onClick={() => alert(`Downloading Receipt PDF: ${rec.id}`)}
                      className="inline-flex items-center gap-1 text-[10px] text-brand-green hover:text-brand-green-dark bg-emerald-50 border border-emerald-100/40 rounded-lg px-3 py-1.5 font-bold cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Receipt
                    </button>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 cursor-not-allowed">
                      Pending Release
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
