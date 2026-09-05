'use client';

import React, { useState, useEffect, useRef } from "react";
import { User, Save, Loader2, Briefcase, BookOpen, AlertCircle, Phone, CheckCircle2, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authApi } from "@/services/erpApi";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    department: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        subject: user.staffProfile?.subject || "",
        department: user.staffProfile?.department || "",
      });
    }
  }, [user]);

  // Keep phone separately as read-only
  const phone = user?.phone || "";
  const role = user?.accessLevel || user?.role || "Staff";
  const employeeId = user?.staffProfile?.employeeId || "N/A";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append('photo', file);

    try {
      const res = await authApi.updateProfilePhoto(data);
      if (res.success) {
        setSuccess("Profile photo updated successfully!");
        window.location.reload();
      } else {
        setError(res.message || "Failed to update profile photo.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while uploading.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        name: formData.name,
        staffProfile: {
          subject: formData.subject,
          department: formData.department
        }
      };

      const res = await authApi.updateMe(payload);
      if (res.success) {
        setSuccess("Profile updated successfully!");
        window.location.reload();
      } else {
        setError(res.message || "Failed to update profile.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
      return (
          <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 bg-white p-4 md:p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0">
            <User size={24} />
            </div>
            <div>
            <h2 className="text-lg font-bold text-slate-800">My Profile Settings</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your personal information and preferences.</p>
            </div>
        </div>

        <AnimatePresence>
            {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3 text-xs font-semibold">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
            </motion.div>
            )}
            {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-xs font-semibold">
                <CheckCircle2 size={15} className="shrink-0" />
                <span>{success}</span>
            </motion.div>
            )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Avatar & Read-only Info */}
            <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 flex flex-col items-center text-center">
                <div 
                  className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden mb-4 relative group cursor-pointer"
                  onClick={() => !uploadingPhoto && fileInputRef.current?.click()}
                >
                  {user?.photoUrl ? (
                      <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                      <User size={40} className="text-slate-300" />
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploadingPhoto ? <Loader2 className="animate-spin text-white w-6 h-6" /> : <Camera className="text-white w-6 h-6" />}
                  </div>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handlePhotoUpload} 
                  />
                </div>
                <h3 className="text-base font-bold text-slate-800">{user?.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg mt-2">
                {role}
                </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Account Security</h4>
                
                <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Phone size={14} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registered Phone</p>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{phone}</p>
                    <p className="text-[9px] text-slate-400 mt-1">Phone number is used for OTP login and cannot be changed here.</p>
                </div>
                </div>

                <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Briefcase size={14} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Employee ID / Reg No</p>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{employeeId}</p>
                </div>
                </div>
            </div>
            </div>

            {/* Right Column: Edit Form */}
            <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800">Edit Profile Information</h3>
                </div>
                
                <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name *</label>
                    <div className="relative">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                        placeholder="Enter your full name"
                        required
                    />
                    <User className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Department</label>
                    <div className="relative">
                        <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                        placeholder="e.g. Science, Languages"
                        />
                        <Briefcase className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    </div>
                    </div>

                    <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Primary Subject</label>
                    <div className="relative">
                        <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                        placeholder="e.g. Mathematics, English"
                        />
                        <BookOpen className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    </div>
                    </div>
                </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-green hover:bg-brand-green-dark text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {loading ? "Saving..." : "Save Changes"}
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  );
}
