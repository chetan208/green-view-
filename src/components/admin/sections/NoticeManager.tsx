'use client';

import React, { useState } from "react";
import { Plus, Trash2, Edit2, FileText, Upload } from "lucide-react";

export default function NoticeManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "hiring started for the 2026 session recruitment drive",
      date: "18 Jun 2026",
      category: "Urgent",
      desc: "Teacher recruitment drives are officially open for senior secondary positions.",
    },
    {
      id: 2,
      title: "Holiday: summer holidays calendar updates",
      date: "18 Jun 2026",
      category: "Academic",
      desc: "Summer vacations duration has been updated. Check portal.",
    },
  ]);

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">Manage School Notices</h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add New Notice
          </button>
        )}
      </div>

      {showForm && (
        <form className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">{editingId ? "Edit Notice Details" : "Create New Notice"}</h3>
            <button type="button" onClick={resetForm} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Category</label>
              <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition cursor-pointer">
                <option value="urgent">Urgent</option>
                <option value="academic">Academic</option>
                <option value="careers">Careers</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Notice Title</label>
              <input type="text" placeholder="e.g., Exam Schedule Published" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Description</label>
            <textarea rows={3} placeholder="Brief summary of the notice..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition resize-none" />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Attach PDF Document (Optional)</label>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-all">
              <Upload size={20} className="text-slate-400 mb-1.5" />
              <p className="text-xs font-bold text-slate-600">Click to upload document</p>
            </label>
          </div>

          <button type="button" onClick={resetForm} className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer">
            Publish Notice
          </button>
        </form>
      )}

      <div className="space-y-3">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-brand-green/30 transition">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                  notice.category === "Urgent" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  {notice.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{notice.title}</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-2">{notice.desc}</p>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => { setEditingId(notice.id); setShowForm(true); }} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-lg transition border-0 cursor-pointer"><Edit2 size={16} /></button>
              <button onClick={() => setNotices(notices.filter(n => n.id !== notice.id))} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-lg transition border-0 cursor-pointer"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
