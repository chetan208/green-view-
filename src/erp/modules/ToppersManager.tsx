'use client';

import React, { useState, useEffect } from "react";
import { Plus, Upload, Loader2, CheckCircle2, AlertTriangle, X, Image as ImageIcon, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { erpApi } from "@/services/erpApi";
import TopperCard, { Topper as TopResult } from "@/components/ui/TopperCard";

export default function ToppersManager({ selectedSession }: { selectedSession: string }) {
  const [showForm, setShowForm] = useState(false);
  const [toppers, setToppers] = useState<TopResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [newTopper, setNewTopper] = useState({
    name: "",
    className: "",
    percentage: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchToppers = async () => {
    setLoading(true);
    try {
      const res = await erpApi.topResults.list(selectedSession);
      if (res.success) {
        setToppers(res.results);
      } else {
        setError(res.message || "Failed to load toppers");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load toppers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToppers();
  }, [selectedSession]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopper.name || !newTopper.className || !newTopper.percentage) {
      setError("Please fill all required fields");
      return;
    }
    if (!selectedFile) {
      setError("Please upload a photo");
      return;
    }

    setSubmitLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("name", newTopper.name);
    formData.append("className", newTopper.className);
    formData.append("percentage", newTopper.percentage);
    formData.append("session", selectedSession);
    formData.append("image", selectedFile);

    try {
      const res = await erpApi.topResults.create(formData);
      if (res.success) {
        setSuccess("Topper added successfully!");
        setNewTopper({ name: "", className: "", percentage: "" });
        setSelectedFile(null);
        setPreviewUrl(null);
        setShowForm(false);
        fetchToppers();
      } else {
        setError(res.message || "Failed to add topper");
      }
    } catch (err: any) {
      setError(err.message || "Failed to add topper");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this topper?")) {
      try {
        const res = await erpApi.topResults.delete(id);
        if (res.success) {
          setSuccess("Topper removed successfully");
          fetchToppers();
        } else {
          setError(res.message || "Failed to remove topper");
        }
      } catch (err: any) {
        setError(err.message || "Failed to remove topper");
      }
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Academic Toppers</h2>
        <p className="text-xs font-medium text-slate-500 mt-1">Manage and showcase the top performing students for {selectedSession}.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Award size={18} className="text-[#0fa958]" />
          <span>Total Toppers: <strong className="text-slate-900">{toppers.length}</strong></span>
        </div>
        
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto bg-[#0fa958] hover:bg-[#006a37] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add Topper
          </button>
        )}
      </div>

      {/* Messages */}
      {success && (
        <div className="bg-[#0fa958]/10 border border-[#0fa958]/20 text-[#006a37] text-xs px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess(null)} className="text-[#0fa958] hover:text-[#006a37] border-0 bg-transparent cursor-pointer">
            <X size={15} />
          </button>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900 border-0 bg-transparent cursor-pointer">
            <X size={15} />
          </button>
        </div>
      )}

      {/* Form (Sliding down) */}
      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            onSubmit={handleSave} 
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 relative"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0fa958]" />
                Add New Topper
              </h3>
              <button type="button" onClick={() => { setShowForm(false); setSelectedFile(null); setPreviewUrl(null); }} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border-0 cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Photo Upload Area */}
              <div className="md:col-span-4 flex flex-col gap-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Student Photo *</label>
                <div className="relative w-full aspect-[4/5] border-2 border-slate-200 border-dashed rounded-xl overflow-hidden bg-slate-50 hover:bg-[#0fa958]/5 hover:border-[#0fa958]/30 transition-all group">
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {previewUrl ? (
                    <Image src={previewUrl} alt="Preview" fill className="object-cover object-top" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <ImageIcon size={32} className="text-slate-300 group-hover:text-[#0fa958] mb-2 transition-colors" />
                      <p className="text-xs font-semibold text-slate-500">Upload Photo</p>
                      <p className="text-[10px] text-slate-400 mt-1">4:5 ratio</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Student Name *</label>
                  <input type="text" placeholder="e.g. Aryan Sharma" required value={newTopper.name} onChange={e => setNewTopper({...newTopper, name: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Class *</label>
                  <input type="text" placeholder="e.g. 12th Science" required value={newTopper.className} onChange={e => setNewTopper({...newTopper, className: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Percentage *</label>
                  <input type="number" step="0.01" placeholder="e.g. 98.6" required value={newTopper.percentage} onChange={e => setNewTopper({...newTopper, percentage: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 focus:bg-white font-medium transition" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" disabled={submitLoading || !selectedFile} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md border-0 cursor-pointer disabled:bg-slate-400">
                {submitLoading && <Loader2 size={16} className="animate-spin" />}
                Save Topper
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Grid of Toppers */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="animate-spin text-[#0fa958]" size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Toppers...</span>
        </div>
      ) : toppers.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
          <Award size={48} className="mx-auto text-slate-200 mb-3" />
          <p className="text-sm font-semibold text-slate-600">No toppers added for {selectedSession} yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click the "Add Topper" button above to showcase your best students.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toppers.map((topper, index) => (
            <TopperCard key={topper._id} topper={topper} index={index} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
