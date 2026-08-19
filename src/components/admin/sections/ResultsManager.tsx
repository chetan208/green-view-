'use client';

import React, { useState, useEffect } from "react";
import { Plus, Trophy, Upload, Star, Loader2, Award, CheckCircle2, AlertTriangle, X, ShieldAlert, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { erpApi } from "@/services/erpApi";
import TopperCard, { Topper } from "@/components/ui/TopperCard";

interface ResultsManagerProps {
  selectedSession?: string;
}

export default function ResultsManager({ selectedSession }: ResultsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [results, setResults] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [sessionFilter, setSessionFilter] = useState<string>('all');

  const [newResult, setNewResult] = useState({
    studentName: "", grade: "", percentage: "", year: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Custom Delete Modal State
  const [topperToDelete, setTopperToDelete] = useState<Topper | null>(null);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySession = sessionFilter === 'all' ? undefined : sessionFilter;
      const res = await erpApi.topResults.list(querySession);
      if (res.success) {
        setResults(res.results);
      } else {
        setError(res.message || "Failed to load top results");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load top results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [sessionFilter]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResult.studentName || !newResult.grade || !newResult.percentage || !selectedFile) {
      setError("Please fill all required fields including photo");
      return;
    }
    
    setSubmitLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", newResult.studentName);
    formData.append("className", newResult.grade);
    formData.append("percentage", newResult.percentage);
    formData.append("session", newResult.year);
    formData.append("image", selectedFile);

    try {
      const res = await erpApi.topResults.create(formData);
      if (res.success) {
        setSuccess("Topper added successfully!");
        setNewResult({ studentName: "", grade: "", percentage: "", year: "" });
        setSelectedFile(null);
        setPreviewUrl(null);
        setShowForm(false);
        fetchResults();
      } else {
        setError(res.message || "Failed to add topper");
      }
    } catch (err: any) {
      setError(err.message || "Failed to add topper");
    } finally {
      setSubmitLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!topperToDelete) return;
    setSubmitLoading(true);
    setError(null);
    try {
      const res = await erpApi.topResults.delete(topperToDelete._id);
      if (res.success) {
        setSuccess("Topper removed successfully!");
        fetchResults();
        setTopperToDelete(null);
      } else {
        setError(res.message || "Failed to remove topper");
      }
    } catch (err: any) {
      setError(err.message || "Failed to remove topper");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-800 relative">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Top Results & Achievers
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Celebrate and showcase our highest performing students.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Session Filter */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <Filter size={14} className="text-slate-400" />
            <select
              value={sessionFilter}
              onChange={(e) => setSessionFilter(e.target.value)}
              aria-label="Filter toppers by academic session"
              className="bg-transparent text-slate-700 text-xs font-bold border-none focus:outline-none cursor-pointer"
            >
              <option value="all">All Sessions</option>
              {selectedSession && <option value={selectedSession}>Current: {selectedSession}</option>}
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
            <Award size={16} className="text-[#0fa958]" />
            <span>Total Toppers: <strong className="text-slate-900 font-extrabold">{results.length}</strong></span>
          </div>
          
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="bg-[#0fa958] hover:bg-[#006a37] text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-[0_4px_15px_-3px_rgba(15,169,88,0.3)] border-0 cursor-pointer shrink-0"
            >
              <Plus size={16} /> Add Topper
            </button>
          )}
        </div>
      </div>

      {/* Success / Error Alerts */}
      {success && (
        <div className="bg-[#0fa958]/10 border border-[#0fa958]/20 text-[#006a37] text-xs px-4 py-3 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess(null)} className="text-[#0fa958] hover:text-[#006a37] border-0 bg-transparent cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}
      
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-3 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-700 hover:text-rose-900 border-0 bg-transparent cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Add Topper Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSave} 
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/40 space-y-5"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Register New Achiever
              </h3>
              <button 
                type="button" 
                onClick={() => { setShowForm(false); setSelectedFile(null); setPreviewUrl(null); }} 
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Photo Upload Area */}
              <div className="md:col-span-3 flex flex-col gap-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Student Photo *</label>
                <label className="flex flex-col items-center justify-center w-full aspect-[4/5] border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-[#0fa958]/5 hover:border-[#0fa958]/30 transition-all group overflow-hidden relative">
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {previewUrl ? (
                    <img src={previewUrl} alt="preview" className="w-full h-full object-cover object-top" />
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
                  <input type="text" placeholder="e.g. 2024-2025" required value={newResult.year} onChange={e => setNewResult({...newResult, year: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-50">
              <button type="submit" disabled={submitLoading || !selectedFile} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md border-0 cursor-pointer disabled:bg-slate-400">
                {submitLoading ? <Loader2 size={16} className="animate-spin" /> : <Trophy size={16} className="text-amber-400" />} 
                {submitLoading ? "Adding..." : "Confirm & Add Topper"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Grid of Toppers */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 gap-2">
          <Loader2 className="animate-spin text-[#0fa958]" size={32} />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Loading Toppers...</span>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
            <Trophy size={32} />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">No Top Results Added Yet</h3>
          <p className="text-xs font-medium text-slate-400 max-w-sm">
            Click the &quot;Add Topper&quot; button above to register student achievements.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-2">
          {results.map((res, index) => (
            <TopperCard key={res._id} topper={res} index={index} onDelete={() => setTopperToDelete(res)} />
          ))}
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      <AnimatePresence>
        {topperToDelete && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTopperToDelete(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 flex flex-col space-y-5"
            >
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-900 text-lg">Remove Topper</h3>
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Confirm Action</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Are you sure you want to remove <strong className="text-slate-900 font-bold">&quot;{topperToDelete.name}&quot;</strong> ({topperToDelete.percentage}%, {topperToDelete.class}) from top results?
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTopperToDelete(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitLoading}
                  onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border-0 shadow-sm"
                >
                  {submitLoading ? <Loader2 size={14} className="animate-spin" /> : "Remove Topper"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
