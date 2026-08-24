'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, Mail, Phone, MoreVertical, UserCircle, Briefcase, Trash2, Filter, Upload, Users, GraduationCap, Building2, Loader2, CheckCircle2, AlertTriangle, X, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { erpApi } from "@/services/erpApi";
import { useAuth } from "@/hooks/useAuth";

type Staff = {
  _id: string;
  name: string;
  phone: string;
  role: 'user';
  accessLevel?: string;
  photoUrl?: string;
  staffProfile?: {
    isTeacher?: boolean;
    post?: string;
    designation: string;
    department: string;
    dateOfJoining?: string;
    qualification?: string;
    bio?: string;
    teacherCategory?: string[];
    subject?: string;
    experience?: string;
  };
  email?: string;
  avatar?: string;
};

export default function StaffManager() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const existingPosts = useMemo(() => {
    const restricted = ['admin', 'superadmin', 'developer', 'super admin'];
    const posts = staffList
      .map(s => s.staffProfile?.post)
      .filter(Boolean)
      .filter(post => {
        const p = (post as string).toLowerCase();
        return !restricted.some(r => p.includes(r));
      });
    return Array.from(new Set(posts));
  }, [staffList]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { user } = useAuth();

  const [newStaff, setNewStaff] = useState<{
    name: string; accessLevel: string; post: string; qualification: string; bio: string; phone: string; email: string; isTeacher: boolean; photo: File | null; existingPhotoUrl?: string; teacherCategory: string[]; subject: string; experience: string;
  }>({
    name: "", accessLevel: "staff", post: "", qualification: "", bio: "", phone: "", email: "", isTeacher: true, photo: null, existingPhotoUrl: "", teacherCategory: [], subject: "", experience: ""
  });

  const departments = ["All", "Administration", "Science Faculty", "Primary Faculty", "Transport", "Support Staff"];

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (searchQuery) filters.search = searchQuery;
      if (filterDept !== "All") filters.department = filterDept;

      const res = await erpApi.teachers.list(filters);
      if (res.success) {
        setStaffList(res.teachers);
      } else {
        setError(res.message || "Failed to load staff");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStaff();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, filterDept]);


  const handleEdit = (staff: Staff) => {
    setEditingId(staff._id);
    setNewStaff({
      name: staff.name || "",
      accessLevel: staff.accessLevel || "staff",
      post: staff.staffProfile?.post || "",
      qualification: staff.staffProfile?.qualification || "",
      bio: staff.staffProfile?.bio || "",
      phone: staff.phone || "",
      email: staff.email || "",
      isTeacher: staff.staffProfile?.isTeacher ?? true,
      photo: null,
      existingPhotoUrl: staff.photoUrl || staff.avatar || "",
      teacherCategory: staff.staffProfile?.teacherCategory || [],
      subject: staff.staffProfile?.subject || "",
      experience: staff.staffProfile?.experience || ""
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    if (!newStaff.name || !newStaff.phone || !newStaff.accessLevel) {
      setError("Please fill all required fields");
      setSubmitLoading(false);
      return;
    }

    try {
      let res;
      const formData = new FormData();
      formData.append("name", newStaff.name);
      formData.append("phone", newStaff.phone);
      formData.append("accessLevel", newStaff.accessLevel);
      formData.append("isTeacher", newStaff.isTeacher.toString());
      if (newStaff.post) formData.append("post", newStaff.post);
      if (newStaff.qualification) formData.append("qualification", newStaff.qualification);
      if (newStaff.bio) formData.append("bio", newStaff.bio);
      if (newStaff.email) formData.append("email", newStaff.email);
      if (newStaff.photo) formData.append("photo", newStaff.photo);
      formData.append("teacherCategory", JSON.stringify(newStaff.teacherCategory));
      if (newStaff.isTeacher && newStaff.subject) {
        formData.append("subject", newStaff.subject);
      }
      if (newStaff.experience) {
        formData.append("experience", newStaff.experience);
      }

      if (editingId) {
        res = await erpApi.teachers.update(editingId, formData);
      } else {
        res = await erpApi.teachers.create(formData);
      }
      
      if (res.success) {
        setSuccess(editingId ? "Staff updated successfully!" : "Staff added successfully!");
        setNewStaff({ name: "", accessLevel: "staff", post: "", qualification: "", bio: "", phone: "", email: "", isTeacher: true, photo: null, existingPhotoUrl: "", teacherCategory: [], subject: "", experience: "" });
        setEditingId(null);
        setShowForm(false);
        fetchStaff();
      } else {
        setError(res.message || (editingId ? "Failed to update staff" : "Failed to add staff"));
      }
    } catch (err: any) {
      setError(err.message || (editingId ? "Failed to update staff" : "Failed to add staff"));
    } finally {
      setSubmitLoading(false);
    }
  };

  const updateRole = async (id: string, newAccessLevel: string) => {
    try {
      const res = await erpApi.teachers.update(id, { accessLevel: newAccessLevel });
      if (res.success) {
        setStaffList(staffList.map(s => s._id === id ? { ...s, accessLevel: newAccessLevel } as any : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const executeDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      const res = await erpApi.teachers.delete(deletingId);
      if (res.success) {
        setSuccess("Staff removed");
        setDeletingId(null);
        fetchStaff();
      } else {
        setError(res.message || "Failed to remove staff");
        setDeletingId(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to remove staff");
      setDeletingId(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Human Resources</h2>
        <p className="text-xs font-medium text-slate-500 mt-1">Manage staff records, roles, and contact information.</p>
      </div>


      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search teacher..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white transition placeholder:text-slate-400 font-medium text-slate-700" 
            />
          </div>
          
        </div>
        
        {!showForm && user?.accessLevel === 'superadmin' && (
          <button 
            onClick={() => { setEditingId(null); setNewStaff({ name: "", accessLevel: "staff", post: "", qualification: "", bio: "", phone: "", email: "", isTeacher: true, photo: null, existingPhotoUrl: "", teacherCategory: [], subject: "", experience: "" }); setShowForm(true); }}
            className="w-full md:w-auto bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add Staff
          </button>
        )}
      </div>

      {/* Messages */}
      {success && (
        <div className="bg-brand-green/10 border border-brand-green/20 text-brand-green-dark text-xs px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess(null)} className="text-brand-green hover:text-brand-green-dark border-0 bg-transparent cursor-pointer">
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
                <Briefcase className="w-5 h-5 text-brand-green" />
                Staff Onboarding
              </h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border-0 cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Photo Upload Area */}
                <div className="md:col-span-3 flex flex-col gap-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile Photo</label>
                  <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-brand-green/5 hover:border-brand-green/30 transition-all group overflow-hidden relative">
                    {newStaff.photo ? (
                      <img src={URL.createObjectURL(newStaff.photo)} alt="Preview" className="w-full h-full object-cover" />
                    ) : newStaff.existingPhotoUrl ? (
                      <img src={newStaff.existingPhotoUrl} alt="Existing Photo" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload size={24} className="text-slate-300 group-hover:text-brand-green mb-2 transition-colors" />
                        <p className="text-[10px] font-semibold text-slate-500 text-center px-4">Upload Photo</p>
                      </>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      if (e.target.files?.[0]) setNewStaff({...newStaff, photo: e.target.files[0]});
                    }} />
                  </label>
                  <label className="flex items-center gap-2 mt-4 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input type="checkbox" checked={newStaff.isTeacher} onChange={(e) => setNewStaff({...newStaff, isTeacher: e.target.checked})} className="w-4 h-4 text-brand-green rounded border-slate-300 focus:ring-brand-green" />
                    <span className="text-sm font-semibold text-slate-700">Is Teacher?</span>
                  </label>
                </div>

              {/* Form Fields */}
              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
                  <input type="text" required value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} placeholder="e.g., Arvind Patel" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Access Level *</label>
                  <select required value={newStaff.accessLevel} onChange={e => setNewStaff({...newStaff, accessLevel: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition cursor-pointer">
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Post / Job Title</label>
                  <input type="text" value={newStaff.post} onChange={e => setNewStaff({...newStaff, post: e.target.value})} placeholder="e.g., Principal, MD, PGT Math" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Qualification</label>
                  <input type="text" value={newStaff.qualification} onChange={e => setNewStaff({...newStaff, qualification: e.target.value})} placeholder="e.g., M.Sc. Mathematics, B.Ed." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Experience (Optional)</label>
                  <input type="text" value={newStaff.experience} onChange={e => setNewStaff({...newStaff, experience: e.target.value})} placeholder="e.g., 8+ years experience, 5 years" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Short Bio</label>
                  <input type="text" value={newStaff.bio} onChange={e => setNewStaff({...newStaff, bio: e.target.value})} placeholder="e.g., 5 years of teaching experience..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Phone Number *</label>
                  <input type="tel" required value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} placeholder="9876543210" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                  <input type="email" value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} placeholder="teacher@example.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                {newStaff.isTeacher && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Subject Taught</label>
                    <input type="text" value={newStaff.subject} onChange={e => setNewStaff({...newStaff, subject: e.target.value})} placeholder="e.g., Mathematics, Physics" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                  </div>
                )}
                {newStaff.isTeacher && (
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Teacher Categories</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={newStaff.teacherCategory.includes('primary')}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...newStaff.teacherCategory, 'primary']
                              : newStaff.teacherCategory.filter(c => c !== 'primary');
                            setNewStaff({ ...newStaff, teacherCategory: updated });
                          }}
                          className="w-4 h-4 text-brand-green rounded border-slate-300 focus:ring-brand-green"
                        />
                        <span className="text-sm font-semibold text-slate-700">Primary Teacher</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={newStaff.teacherCategory.includes('high')}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...newStaff.teacherCategory, 'high']
                              : newStaff.teacherCategory.filter(c => c !== 'high');
                            setNewStaff({ ...newStaff, teacherCategory: updated });
                          }}
                          className="w-4 h-4 text-brand-green rounded border-slate-300 focus:ring-brand-green"
                        />
                        <span className="text-sm font-semibold text-slate-700">High School Teacher</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={newStaff.teacherCategory.includes('senior')}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...newStaff.teacherCategory, 'senior']
                              : newStaff.teacherCategory.filter(c => c !== 'senior');
                            setNewStaff({ ...newStaff, teacherCategory: updated });
                          }}
                          className="w-4 h-4 text-brand-green rounded border-slate-300 focus:ring-brand-green"
                        />
                        <span className="text-sm font-semibold text-slate-700">Senior Teacher</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" disabled={submitLoading} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md border-0 cursor-pointer disabled:bg-slate-400">
                {submitLoading && <Loader2 size={16} className="animate-spin" />}
                {editingId ? "Update Staff Record" : "Save Staff Record"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-16 gap-3">
               <Loader2 className="animate-spin text-brand-green-dark" size={24} />
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Staff Records...</span>
             </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Staff Details</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Designation</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Subject</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Qualification</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Access</th>
                  {user?.accessLevel === 'superadmin' && (
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {staffList.map((staff) => (
                    <motion.tr 
                      key={staff._id}
                      layout
                      initial={{ opacity: 0, backgroundColor: "#f8fafc" }}
                      animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                      exit={{ opacity: 0, backgroundColor: "#fef2f2" }}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
                            {staff.photoUrl || staff.avatar ? (
                              <img src={staff.photoUrl || staff.avatar} alt={staff.name} className="object-cover w-full h-full" />
                            ) : (
                              <UserCircle size={24} className="text-slate-300" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 leading-tight">{staff.name}</p>
                            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-slate-500">
                              <Phone size={10} /> {staff.phone || "N/A"}
                            </div>
                            {staff.email && (
                              <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-500">
                                <Mail size={10} /> {staff.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top pt-4">
                        <p className="text-[11px] font-bold text-brand-green uppercase tracking-wider mb-0.5">
                          {staff.staffProfile?.post || 'Staff'}
                        </p>
                        {staff.staffProfile?.teacherCategory && staff.staffProfile.teacherCategory.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {staff.staffProfile.teacherCategory.map((cat) => (
                              <span key={cat} className="text-[9px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                {cat === 'primary' ? 'Primary' : cat === 'high' ? 'High' : 'Senior'}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top pt-4">
                        <p className="text-xs font-semibold text-slate-700">
                          {staff.staffProfile?.subject || "-"}
                        </p>
                      </td>
                      <td className="px-4 py-3 align-top pt-4">
                        <p className="text-xs font-medium text-slate-700 max-w-[150px] truncate" title={staff.staffProfile?.qualification || ""}>
                          {staff.staffProfile?.qualification || "-"}
                        </p>
                      </td>
                      <td className="px-4 py-3 align-top pt-4">
                        <select 
                          value={staff.accessLevel || "staff"}
                          onChange={(e) => updateRole(staff._id, e.target.value)}
                          className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-transparent border-b border-dashed border-slate-300 hover:border-brand-green focus:border-brand-green focus:outline-none cursor-pointer pb-0.5 block w-fit"
                        >
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      </td>
                      {user?.accessLevel === 'superadmin' && (
                        <td className="px-4 py-3 text-right align-middle">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(staff)}
                              className="w-8 h-8 rounded bg-white border border-slate-200 text-slate-400 hover:text-brand-green hover:border-emerald-200 hover:bg-emerald-50 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                            >
                              <Edit2 size={14} />
                            </button>
                            {staff.accessLevel !== 'superadmin' && (
                              <button 
                                onClick={() => setDeletingId(staff._id)}
                                className="w-8 h-8 rounded bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
          
          {!loading && staffList.length === 0 && (
            <div className="w-full bg-white p-12 flex flex-col items-center justify-center text-center border-t border-slate-100">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">No Records Found</h3>
              <p className="text-xs font-medium text-slate-500">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
      

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 text-center mb-2">Remove Staff?</h3>
              <p className="text-sm text-slate-500 text-center mb-6">This action cannot be undone. Are you sure you want to permanently remove this staff member?</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  disabled={deleteLoading}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition border-0 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  disabled={deleteLoading}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 border-0 cursor-pointer shadow-sm shadow-rose-500/20 disabled:opacity-50"
                >
                  {deleteLoading ? <Loader2 size={16} className="animate-spin" /> : "Remove"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
