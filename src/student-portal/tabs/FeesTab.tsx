"use client";

import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

export default function FeesTab() {
  
  // Breakdown Table Data
  const breakdown = [
    { component: "Tuition Fee", amount: "₹ 1,20,000", status: "Paid" },
    { component: "Transport Fee", amount: "₹ 80,000", status: "Paid" },
    { component: "Library Fee", amount: "₹ 40,000", status: "Pending" },
    { component: "Activity Fee", amount: "₹ 40,000", status: "Pending" },
  ];

  // Payment History Data
  const history = [
    { date: "15 Oct 2024", amount: "₹ 1,20,000", txId: "XXXXXXXXXIXXXX9012" },
    { date: "15 Oct 2024", amount: "₹ 80,000", txId: "XXXXXXXXXIXXXXI1234" },
    { date: "15 Oct 2024", amount: "₹ 40,000", txId: "XXXXXXXXXIXXXX0238" },
    { date: "15 Oct 2024", amount: "₹ 40,000", txId: "XXXXXXXXXIXXXX0353" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn pb-12 select-none">
      
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Fee */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-2xs h-28">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Fee
          </span>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">
              ₹ 1,20,000
            </span>
            <span className="h-3 mt-1.5"></span>
          </div>
        </div>

        {/* Paid */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-2xs h-28">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Paid
            </span>
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-[11px] pb-0.5">
              ₹
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">
              ₹ 80,000
            </span>
            <span className="h-3 mt-1.5"></span>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-2xs h-28">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Pending
            </span>
            <AlertTriangle className="w-4.5 h-4.5 text-rose-500" />
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">
              ₹ 40,000
            </span>
            <div className="flex items-center gap-1 mt-1.5 text-rose-600 font-semibold text-[10px] uppercase tracking-wide">
              <span className="text-xs leading-none">⚠️</span> Attention Required
            </div>
          </div>
        </div>

        {/* Next Due Date */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-2xs h-28">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Next Due Date
          </span>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">
              15 Oct 2024
            </span>
            <span className="h-3 mt-1.5"></span>
          </div>
        </div>

      </div>

      {/* 2-Column Fee Breakdown & Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Fee Breakdown Table (spans 2 cols) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs lg:col-span-2">
          <h3 className="text-[16px] font-semibold text-slate-900 mb-5">
            Fee Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 select-none text-[11px] uppercase tracking-wider">
                  <th className="pb-3 pl-4 font-semibold">Component</th>
                  <th className="pb-3 text-center font-semibold">Amount</th>
                  <th className="pb-3 pr-4 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {breakdown.map((row, i) => {
                  const isPaid = row.status === "Paid";
                  return (
                    <tr key={i} className="text-slate-800 font-semibold hover:bg-slate-50/50 transition">
                      <td className="py-4.5 pl-4 font-semibold text-slate-950">{row.component}</td>
                      <td className="py-4.5 text-center text-slate-500 font-mono font-semibold">{row.amount}</td>
                      <td className="py-4.5 text-center pr-4">
                        <span className={`text-[11px] font-semibold ${
                          isPaid ? "text-emerald-600" : "text-[#ba1a1a]"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Payment History Card (spans 1 col) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6.5 shadow-xs flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-[16px] font-semibold text-slate-900 mb-5">
              Payment History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 select-none text-[10px] uppercase tracking-wider">
                    <th className="pb-2.5 font-semibold">Date</th>
                    <th className="pb-2.5 text-center font-semibold">Amount</th>
                    <th className="pb-2.5 text-right font-semibold">Transaction ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((row, i) => (
                    <tr key={i} className="text-slate-700 font-semibold hover:bg-slate-50/50 transition">
                      <td className="py-3.5 font-medium">{row.date}</td>
                      <td className="py-3.5 text-center text-slate-900 font-semibold font-mono">{row.amount}</td>
                      <td className="py-3.5 text-right text-slate-400 font-mono text-[10px]">{row.txId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pay Now Button */}
          <button 
            onClick={() => alert("Redirecting to secure payment gateway...")}
            className="bg-[#006a37] text-white rounded-lg flex items-center justify-center gap-2 py-3 px-4 w-full text-sm font-semibold shadow-sm transition hover:bg-[#005229] cursor-pointer"
          >
            <span>Pay Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
