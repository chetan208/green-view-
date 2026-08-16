'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, Mail, Phone, MoreVertical, UserCircle, Briefcase, Trash2, Filter, Upload, Users, GraduationCap, Building2, Loader2, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { erpApi } from "@/services/erpApi";
import { useAuth } from "@/hooks/useAuth";

type Staff = {
  _id: string;
  name: string;
  phone: string;
  role: 'teacher' | 'admin';
  teacherProfile?: {
    accessRole: string;
    designation: string;
    department: string;
    dateOfJoining?: string;
    qualification?: string;
    bio?: string;
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { user } = useAuth();

  const [newStaff, setNewStaff] = useState({
    name: "",
    accessRole: "Teacher",
    qualification: "",
    bio: "",
    phone: "",
    email: ""
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

  // Derived Stats
  const totalStaff = staffList.length;
  const teachingStaff = staffList.filter(s => s.teacherProfile?.department?.includes("Faculty") || s.teacherProfile?.designation?.toLowerCase().includes("teacher")).length;
  const adminStaff = staffList.filter(s => s.teacherProfile?.department === "Administration").length;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.phone || !newStaff.accessRole) {
      setError("Please fill all required fields");
      return;
    }

    setSubmitLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("name", newStaff.name);
    formData.append("phone", newStaff.phone);
    formData.append("accessRole", newStaff.accessRole);
    if (newStaff.qualification) formData.append("qualification", newStaff.qualification);
    if (newStaff.bio) formData.append("bio", newStaff.bio);
    if (newStaff.email) formData.append("email", newStaff.email);

    try {
      const res = await erpApi.teachers.create(formData);
      if (res.success) {
        setSuccess("Teacher added successfully!");
        setNewStaff({ name: "", accessRole: "Teacher", qualification: "", bio: "", phone: "", email: "" });
        setShowForm(false);
        fetchStaff();
      } else {
        setError(res.message || "Failed to add teacher");
      }
    } catch (err: any) {
      setError(err.message || "Failed to add teacher");
    } finally {
      setSubmitLoading(false);
    }
  };

  const updateRole = async (id: string, newAccessRole: string) => {
    try {
      const res = await erpApi.teachers.update(id, { accessRole: newAccessRole });
      if (res.success) {
        setStaffList(staffList.map(s => s._id === id ? { ...s, teacherProfile: { ...s.teacherProfile, accessRole: newAccessRole } as any } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this teacher?")) {
      try {
        const res = await erpApi.teachers.delete(id);
        if (res.success) {
          setSuccess("Teacher removed");
          fetchStaff();
        } else {
          setError(res.message || "Failed to remove teacher");
        }
      } catch (err: any) {
        setError(err.message || "Failed to remove teacher");
      }
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Human Resources</h2>
        <p className="text-xs font-medium text-slate-500 mt-1">Manage teacher records, roles, and contact information.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Staff</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalStaff}</h3>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Teaching Faculty</p>
            <h3 className="text-2xl font-bold text-slate-900">{teachingStaff}</h3>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Administration</p>
            <h3 className="text-2xl font-bold text-slate-900">{adminStaff}</h3>
          </div>
        </div>
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
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={filterDept} 
              onChange={e => setFilterDept(e.target.value)}
              className="bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
        </div>
        
        {!showForm && user?.teacherProfile?.accessRole === 'Owner' && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add Teacher
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
                Teacher Onboarding
              </h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border-0 cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Photo Upload Area */}
              <div className="md:col-span-3 flex flex-col gap-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile Photo</label>
                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-brand-green/5 hover:border-brand-green/30 transition-all group">
                  <Upload size={24} className="text-slate-300 group-hover:text-brand-green mb-2 transition-colors" />
                  <p className="text-[10px] font-semibold text-slate-500 text-center px-4">Upload Headshot</p>
                </label>
              </div>

              {/* Form Fields */}
              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
                  <input type="text" required value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} placeholder="e.g., Arvind Patel" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Role *</label>
                  <select required value={newStaff.accessRole} onChange={e => setNewStaff({...newStaff, accessRole: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition cursor-pointer">
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                    <option value="Owner">Owner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Qualification</label>
                  <input type="text" value={newStaff.qualification} onChange={e => setNewStaff({...newStaff, qualification: e.target.value})} placeholder="e.g., M.Sc. Mathematics, B.Ed." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
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
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" disabled={submitLoading} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md border-0 cursor-pointer disabled:bg-slate-400">
                {submitLoading && <Loader2 size={16} className="animate-spin" />}
                Save Teacher Record
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
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Teacher</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Role & Qual</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Contact</th>
                  {user?.teacherProfile?.accessRole === 'Owner' && (
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap text-right">Actions</th>
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
                            {staff.avatar ? (
                              <Image src={staff.avatar} alt={staff.name} width={40} height={40} className="object-cover w-full h-full" />
                            ) : (
                              <UserCircle size={24} className="text-slate-300" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 leading-none mb-1">{staff.name}</p>
                            <p className="text-[10px] font-bold text-brand-green uppercase tracking-wider">{staff.teacherProfile?.accessRole || 'Staff'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={staff.teacherProfile?.accessRole || "Teacher"}
                          onChange={(e) => updateRole(staff._id, e.target.value)}
                          className="text-sm font-semibold text-slate-700 bg-transparent border-b border-dashed border-slate-300 hover:border-brand-green focus:border-brand-green focus:outline-none cursor-pointer pb-0.5 mb-1 block w-fit"
                        >
                          <option value="Teacher">Teacher</option>
                          <option value="Admin">Admin</option>
                          <option value="Owner">Owner</option>
                        </select>
                        <p className="text-xs font-medium text-slate-400 max-w-[150px] truncate" title={staff.teacherProfile?.qualification || ""}>{staff.teacherProfile?.qualification || "Not Specified"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-1">
                          <Mail size={12} className="text-slate-400" /> {staff.email || "N/A"}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <Phone size={12} className="text-slate-400" /> {staff.phone || "N/A"}
                        </div>
                      </td>
                      {user?.teacherProfile?.accessRole === 'Owner' && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-8 h-8 rounded bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                              <MoreVertical size={14} />
                            </button>
                            <button 
                              onClick={() => handleDelete(staff._id)}
                              className="w-8 h-8 rounded bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                            >
                              <Trash2 size={14} />
                            </button>
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
      
    </div>
  );
}
