'use client';

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, FileText, Upload, Loader2, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getNoticesApi, createNoticeApi, updateNoticeApi, deleteNoticeApi } from "@/lib/api";

interface NoticeItem {
  _id?: string;
  id?: number | string;
  title: string;
  description: string;
  category?: string;
  documentUrl?: string;
  createdAt?: string;
  date?: string;
}

export default function NoticeManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Academic");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [notices, setNotices] = useState<NoticeItem[]>([]);

  // Custom Delete Modal State
  const [noticeToDelete, setNoticeToDelete] = useState<NoticeItem | null>(null);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await getNoticesApi();
      if (res && res.notices) {
        setNotices(res.notices);
      }
    } catch (err) {
      console.error("Error fetching notices from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const triggerSuccessAlert = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingNotice(null);
    setTitle("");
    setCategory("Academic");
    setDescription("");
    setFile(null);
  };

  const handleEditClick = (notice: NoticeItem) => {
    setEditingNotice(notice);
    setTitle(notice.title || "");
    setDescription(notice.description || "");
    setCategory(notice.category || "Academic");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (file) {
        formData.append("document", file);
      }

      if (editingNotice && editingNotice._id) {
        await updateNoticeApi(editingNotice._id, formData);
        triggerSuccessAlert("Notice updated successfully!");
      } else {
        await createNoticeApi(formData);
        triggerSuccessAlert("Notice published successfully!");
      }

      await fetchNotices();
      resetForm();
    } catch (err) {
      console.error("Error saving notice:", err);
      alert("Failed to save notice. Please check backend connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDeleteNotice = async () => {
    if (!noticeToDelete || !noticeToDelete._id) return;
    setSubmitting(true);
    try {
      await deleteNoticeApi(noticeToDelete._id);
      await fetchNotices();
      triggerSuccessAlert("Notice deleted successfully.");
      setNoticeToDelete(null);
    } catch (err) {
      console.error("Error deleting notice:", err);
      alert("Failed to delete notice");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6 text-slate-800 relative">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Manage School Notices</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Add, update, or remove official notice board announcements and circulars.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => { resetForm(); setShowForm(true); }}
            className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer shrink-0"
          >
            <Plus size={16} /> Add New Notice
          </button>
        )}
      </div>

      {/* Success Notification Alert */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 px-4 flex items-center gap-3 text-emerald-800 text-xs font-semibold shadow-sm"
          >
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Drawer / Box */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-semibold text-slate-900">{editingNotice ? "Edit Notice Details" : "Create New Notice Announcement"}</h3>
            <button type="button" onClick={resetForm} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Category *</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition cursor-pointer"
              >
                <option value="Academic">Academic</option>
                <option value="Urgent">Urgent</option>
                <option value="Careers">Careers</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Notice Title *</label>
              <input 
                type="text" 
                required 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Annual Exam Timetable & Guidelines Published" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Description / Summary</label>
            <textarea 
              rows={3} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the notice announcement..." 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition resize-none" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Attach Official PDF Document (Optional)</label>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-all">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden" 
              />
              <Upload size={20} className="text-slate-400 mb-1.5" />
              <p className="text-xs font-semibold text-slate-600">
                {file ? file.name : "Click to upload document (.pdf)"}
              </p>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm border-0 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>{editingNotice ? "Updating Notice..." : "Publishing Notice..."}</span>
              </>
            ) : (
              editingNotice ? "Update Notice Announcement" : "Publish Notice Announcement"
            )}
          </button>
        </form>
      )}

      {/* Notices List & Loading Skeleton */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm animate-pulse flex justify-between items-center">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-100 rounded w-1/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
              <div className="w-16 h-8 bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      ) : notices.length > 0 ? (
        <div className="space-y-3">
          {notices.map((notice) => (
            <div key={notice._id || notice.id} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-brand-green/30 transition">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                    notice.category === "Urgent" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}>
                    {notice.category || "Notice"}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{notice.title}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">({formatDate(notice.createdAt || notice.date)})</span>
                </div>
                {notice.description && (
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">{notice.description}</p>
                )}
                {notice.documentUrl && (
                  <a href={notice.documentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-brand-green hover:underline font-semibold mt-1">
                    <FileText size={12} /> View Circular Document
                  </a>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => handleEditClick(notice)} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-lg transition border-0 cursor-pointer" title="Edit Notice"><Edit2 size={16} /></button>
                <button onClick={() => setNoticeToDelete(notice)} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-lg transition border-0 cursor-pointer" title="Delete Notice"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
          <p className="text-sm font-medium">No official notices published yet. Click &quot;Add New Notice&quot; to publish one.</p>
        </div>
      )}

      {/* ==================== CUSTOM MODAL: NOTICE DELETE CONFIRMATION ==================== */}
      <AnimatePresence>
        {noticeToDelete && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNoticeToDelete(null)}
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
                  <h3 className="font-bold text-slate-900 text-lg">Delete Notice</h3>
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Confirm Action</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Are you sure you want to delete the notice announcement <strong className="text-slate-900 font-bold">&quot;{noticeToDelete.title}&quot;</strong>? This will remove it permanently from the notice board.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNoticeToDelete(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={confirmDeleteNotice}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border-0 shadow-sm"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  {submitting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
