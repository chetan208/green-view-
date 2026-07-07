import React from "react";
import { Download, QrCode } from "lucide-react";

export default function FeeReceiptsLedger({ receipts }: { receipts: any[] }) {
  return (
    <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col gap-5">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-150 select-none">
        Fee Receipts Ledger
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {receipts.map((rec) => {
          const isPaid = rec.status === "Paid";
          return (
            <div 
              key={rec.id} 
              className="bg-slate-55/40 border border-slate-200 rounded-xl flex flex-col justify-between overflow-hidden relative shadow-xs hover:border-slate-300 transition-all duration-150"
            >
              <div className={`py-2 px-3 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider select-none ${
                isPaid ? "bg-emerald-50 text-emerald-700 border-b border-emerald-100/30" : "bg-slate-100 text-slate-500 border-b border-slate-200/30"
              }`}>
                <span>{rec.id}</span>
                <span>{rec.status}</span>
              </div>

              <div className="p-4 flex flex-col items-center text-center gap-2">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider select-none">{rec.period}</span>
                <span className="text-xl font-bold text-slate-750 font-mono">{rec.amount}</span>
                
                <div className="w-full border-t border-dashed border-slate-200 my-1" />

                <div className="w-full flex flex-col gap-1.5 text-[10px] font-semibold text-slate-500 text-left select-none">
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

              <div className="p-3 bg-white border-t border-slate-150 flex items-center justify-between">
                <QrCode className="w-4.5 h-4.5 text-slate-350" />
                {isPaid ? (
                  <button
                    onClick={() => alert(`Downloading Receipt PDF: ${rec.id}`)}
                    className="inline-flex items-center gap-1.5 text-[10px] text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-100/50 rounded-lg px-2.5 py-1.5 font-bold cursor-pointer transition-colors font-sans"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Receipt
                  </button>
                ) : (
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-not-allowed select-none">
                    Pending Release
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
