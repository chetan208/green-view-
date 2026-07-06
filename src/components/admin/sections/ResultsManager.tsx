'use client';

import React, { useState } from "react";
import { Plus, Trash2, Trophy, Edit2, Medal, Upload, Star, Award } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Topper = {
  id: number;
  studentName: string;
  grade: string;
  percentage: string;
  rank: string;
  year: string;
  photo: string;
};

export default function ResultsManager() {
  const [showForm, setShowForm] = useState(false);
  const [results, setResults] = useState<Topper[]>([
    { id: 1, studentName: "Riya Sharma", grade: "Class XII (Science)", percentage: "98.4%", rank: "1st", year: "2025", photo: "/images/hero-students.png" },
    { id: 2, studentName: "Aryan Khan", grade: "Class X", percentage: "97.8%", rank: "2nd", year: "2025", photo: "/images/hero.png" },
    { id: 3, studentName: "Pooja Verma", grade: "Class XII (Commerce)", percentage: "96.5%", rank: "3rd", year: "2025", photo: "/images/study.png" },
  ]);

  const [newResult, setNewResult] = useState({
    studentName: "", grade: "", percentage: "", rank: "1st", year: new Date().getFullYear().toString()
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResult.studentName || !newResult.percentage) return;
    
    setResults([{
      id: Date.now(),
      ...newResult,
      photo: "/images/hero.png" // default placeholder
    }, ...results]);
    
    setNewResult({ studentName: "", grade: "", percentage: "", rank: "1st", year: new Date().getFullYear().toString() });
    setShowForm(false);
  };

  const getRankColor = (rank: string) => {
    if (rank === '1st') return 'from-amber-200 to-amber-500 text-amber-700 border-amber-200';
    if (rank === '2nd') return 'from-slate-200 to-slate-400 text-slate-700 border-slate-300';
    if (rank === '3rd') return 'from-orange-200 to-orange-400 text-orange-800 border-orange-200';
    return 'from-emerald-100 to-emerald-300 text-emerald-700 border-emerald-200';
  };

  const getRankBadgeColor = (rank: string) => {
    if (rank === '1st') return 'bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-amber-500/30';
    if (rank === '2nd') return 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-slate-500/30';
    if (rank === '3rd') return 'bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-orange-500/30';
    return 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-500/30';
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Top Results & Achievers
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Celebrate and showcase our highest performing students.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-[0_4px_15px_-3px_rgba(16,185,129,0.3)] border-0 cursor-pointer"
          >
            <Plus size={16} /> Add Topper
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSave} 
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xl shadow-slate-200/40 space-y-5"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Register New Achiever
              </h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Photo Upload Area */}
              <div className="md:col-span-3 flex flex-col gap-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Student Photo *</label>
                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                  <Upload size={24} className="text-slate-300 group-hover:text-emerald-500 mb-2 transition-colors" />
                  <p className="text-[10px] font-semibold text-slate-500 text-center px-4">Upload Headshot<br/>(1:1 Square)</p>
                </label>
              </div>

              {/* Form Fields */}
              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Student Name *</label>
                  <input type="text" required value={newResult.studentName} onChange={e => setNewResult({...newResult, studentName: e.target.value})} placeholder="e.g., Anjali Gupta" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Class / Stream *</label>
                  <input type="text" required value={newResult.grade} onChange={e => setNewResult({...newResult, grade: e.target.value})} placeholder="e.g., Class XII (Science)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Score / Percentage *</label>
                  <input type="text" required value={newResult.percentage} onChange={e => setNewResult({...newResult, percentage: e.target.value})} placeholder="e.g., 99.2%" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Rank *</label>
                    <select value={newResult.rank} onChange={e => setNewResult({...newResult, rank: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition cursor-pointer">
                      <option value="1st">1st Rank</option>
                      <option value="2nd">2nd Rank</option>
                      <option value="3rd">3rd Rank</option>
                      <option value="Topper">Subject Topper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Academic Year *</label>
                    <input type="text" required value={newResult.year} onChange={e => setNewResult({...newResult, year: e.target.value})} placeholder="2026" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-50">
              <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md border-0 cursor-pointer">
                <Trophy size={16} className="text-amber-400" /> Confirm & Add Topper
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {results.map((res) => (
          <motion.div 
            key={res.id} 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-1 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100 relative group hover:shadow-xl transition-all duration-300"
          >
            {/* Delete button (hover) */}
            <button 
              onClick={() => setResults(results.filter(r => r.id !== res.id))} 
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-slate-400 hover:text-white hover:bg-rose-500 shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 border-0 cursor-pointer"
            >
              <Trash2 size={13} />
            </button>

            <div className="p-5 flex flex-col items-center relative z-10 text-center">
              
              {/* Photo & Rank Badge */}
              <div className="relative mb-4">
                <div className={`w-28 h-28 rounded-full p-1 bg-gradient-to-br ${getRankColor(res.rank)} shadow-md`}>
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative bg-slate-100">
                    <Image src={res.photo} alt={res.studentName} fill className="object-cover" />
                  </div>
                </div>
                <div className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg ${getRankBadgeColor(res.rank)} border-2 border-white whitespace-nowrap`}>
                  {res.rank}
                </div>
              </div>

              {/* Student Details */}
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-0.5">{res.studentName}</h3>
              <p className="text-[11px] font-semibold text-slate-500 mb-3">{res.grade} • Batch {res.year}</p>
              
              {/* Score Display */}
              <div className="w-full py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Final Score</p>
                <p className="text-2xl font-bold text-brand-green">{res.percentage}</p>
              </div>
              
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
