'use client';

import React, { useState, useEffect } from "react";
import { Plus, Trophy, Upload, Star, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { erpApi } from "@/services/erpApi";
import TopperCard, { Topper } from "@/components/ui/TopperCard";

export default function ResultsManager() {
  const [showForm, setShowForm] = useState(false);
  const [results, setResults] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [newResult, setNewResult] = useState({
    studentName: "", grade: "", percentage: "", year: new Date().getFullYear().toString()
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await erpApi.topResults.list();
      if (res.success) {
        setResults(res.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResult.studentName || !newResult.percentage || !selectedFile) {
      alert("Please fill all required fields including photo");
      return;
    }
    
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("name", newResult.studentName);
    formData.append("className", newResult.grade);
    formData.append("percentage", newResult.percentage);
    formData.append("session", newResult.year);
    formData.append("image", selectedFile);

    try {
      const res = await erpApi.topResults.create(formData);
      if (res.success) {
        setNewResult({ studentName: "", grade: "", percentage: "", year: new Date().getFullYear().toString() });
        setSelectedFile(null);
        setShowForm(false);
        fetchResults();
      } else {
        alert(res.message || "Failed to add topper");
      }
    } catch (err) {
      alert("Failed to add topper");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this topper?")) {
      try {
        const res = await erpApi.topResults.delete(id);
        if (res.success) {
          fetchResults();
        } else {
          alert(res.message || "Failed to remove topper");
        }
      } catch (err) {
        alert("Failed to remove topper");
      }
    }
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
            className="bg-[#0fa958] hover:bg-[#006a37] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-[0_4px_15px_-3px_rgba(15,169,88,0.3)] border-0 cursor-pointer"
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
                <label className="flex flex-col items-center justify-center w-full aspect-[4/5] border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-[#0fa958]/5 hover:border-[#0fa958]/30 transition-all group overflow-hidden relative">
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {selectedFile ? (
                    <img src={URL.createObjectURL(selectedFile)} alt="preview" className="w-full h-full object-cover object-top" />
                  ) : (
                    <>
                      <Upload size={24} className="text-slate-300 group-hover:text-[#0fa958] mb-2 transition-colors" />
                      <p className="text-[10px] font-semibold text-slate-500 text-center px-4">Upload Portrait<br/>(4:5 Ratio)</p>
                    </>
                  )}
                </label>
              </div>

              {/* Form Fields */}
              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Student Name *</label>
                  <input type="text" placeholder="e.g. Aryan Sharma" required value={newResult.studentName} onChange={e => setNewResult({...newResult, studentName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Class / Stream *</label>
                  <input type="text" placeholder="e.g. 12th Science" required value={newResult.grade} onChange={e => setNewResult({...newResult, grade: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Percentage *</label>
                  <input type="number" step="0.01" placeholder="e.g. 98.6" required value={newResult.percentage} onChange={e => setNewResult({...newResult, percentage: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Academic Year / Session *</label>
                  <input type="text" placeholder="e.g. 2024-25" required value={newResult.year} onChange={e => setNewResult({...newResult, year: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-50">
              <button type="submit" disabled={submitLoading} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md border-0 cursor-pointer disabled:bg-slate-400">
                {submitLoading ? <Loader2 size={16} className="animate-spin" /> : <Trophy size={16} className="text-amber-400" />} 
                {submitLoading ? "Adding..." : "Confirm & Add Topper"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-[#0fa958]" size={32} />
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
          <Trophy size={48} className="mx-auto text-slate-200 mb-3" />
          <p className="text-sm font-semibold text-slate-600">No top results added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-2">
          {results.map((res, index) => (
            <TopperCard key={res._id} topper={res} index={index} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
