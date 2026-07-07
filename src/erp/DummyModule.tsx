import React from "react";
import { ChevronRight, LayoutDashboard, Search } from "lucide-react";

export default function DummyModule({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-green-dark tracking-tight">{title}</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage and configure {title.toLowerCase()} settings.</p>
        </div>
        <div className="hidden sm:flex relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-green" 
          />
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
        </div>
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">ID</th>
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Name</th>
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="hover:bg-slate-50/50 transition">
                <td className="py-3 px-4 text-xs font-semibold text-slate-600">#{item}001</td>
                <td className="py-3 px-4 text-xs font-semibold text-brand-green-dark">Sample Record {item}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[9px] font-bold uppercase tracking-widest">Active</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-xs font-semibold text-brand-green hover:text-brand-green-dark transition bg-transparent border-0 cursor-pointer">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
