'use client';

import React, { useState, useMemo } from "react";
import { Search, Plus, Mail, Phone, MoreVertical, UserCircle, Briefcase, Trash2, Filter, Upload, Users, GraduationCap, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Staff = {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  photo?: string;
  joinDate?: string;
};

export default function StaffManager() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const [staffList, setStaffList] = useState<Staff[]>([
    { id: "EMP-101", name: "Rahul Verma", role: "Principal", department: "Administration", phone: "+91 9876543210", email: "rahul.v@greenview.edu", photo: "/images/hero-students.png", joinDate: "2015-04-01" },
    { id: "EMP-102", name: "Anjali Sharma", role: "Senior Teacher", department: "Science Faculty", phone: "+91 9988776655", email: "anjali.s@greenview.edu", photo: "/images/study.png", joinDate: "2018-07-15" },
    { id: "EMP-103", name: "Vikash Singh", role: "Transport Head", department: "Transport", phone: "+91 9123456789", email: "vikash.t@greenview.edu", joinDate: "2020-01-10" },
    { id: "EMP-104", name: "Pooja Gupta", role: "Teacher", department: "Primary Faculty", phone: "+91 9112233445", email: "pooja.g@greenview.edu", photo: "/images/hero.png", joinDate: "2021-05-20" },
    { id: "EMP-105", name: "Suresh Kumar", role: "Librarian", department: "Support Staff", phone: "+91 9900887766", email: "suresh.k@greenview.edu", joinDate: "2019-11-05" },
  ]);

  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: "", role: "", department: "Science Faculty", phone: "", email: "", joinDate: new Date().toISOString().split('T')[0]
  });

  const updateRole = (id: string, newRole: string) => {
    setStaffList(staffList.map(s => s.id === id ? { ...s, role: newRole } : s));
  };

  const departments = ["All", "Administration", "Science Faculty", "Primary Faculty", "Transport", "Support Staff"];

  const filteredStaff = useMemo(() => {
    return staffList.filter(staff => {
      const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            staff.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = filterDept === "All" || staff.department === filterDept;
      return matchesSearch && matchesDept;
    });
  }, [staffList, searchQuery, filterDept]);

  // Derived Stats
  const totalStaff = staffList.length;
  const teachingStaff = staffList.filter(s => s.department.includes("Faculty")).length;
  const adminStaff = staffList.filter(s => s.department === "Administration").length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.role) return;

    const staffId = `EMP-${100 + staffList.length + 1}`;
    
    setStaffList([{
      id: staffId,
      name: newStaff.name,
      role: newStaff.role,
      department: newStaff.department || "Administration",
      phone: newStaff.phone || "",
      email: newStaff.email || "",
      joinDate: newStaff.joinDate || "",
      photo: "/images/hero-students.png" // default mock photo
    } as Staff, ...staffList]);
    
    setNewStaff({ name: "", role: "", department: "Science Faculty", phone: "", email: "", joinDate: new Date().toISOString().split('T')[0] });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Human Resources</h2>
        <p className="text-xs font-medium text-slate-500 mt-1">Manage employee records, roles, and contact information.</p>
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
              placeholder="Search employee..." 
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
        
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add Employee
          </button>
        )}
      </div>

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
                Employee Onboarding
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
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Role / Designation *</label>
                  <input type="text" required value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} placeholder="e.g., Senior Mathematics Teacher" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Department *</label>
                  <select value={newStaff.department} onChange={e => setNewStaff({...newStaff, department: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition cursor-pointer">
                    {departments.filter(d => d !== "All").map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Date of Joining</label>
                  <input type="date" value={newStaff.joinDate} onChange={e => setNewStaff({...newStaff, joinDate: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition text-slate-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                  <input type="email" value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} placeholder="arvind@greenview.edu" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
                  <input type="tel" value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} placeholder="+91 9876543210" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green focus:bg-white font-medium transition" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center shadow-md border-0 cursor-pointer">
                Save Employee Record
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Employee</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Role & Dept</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Contact</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {filteredStaff.map((staff) => (
                  <motion.tr 
                    key={staff.id}
                    layout
                    initial={{ opacity: 0, backgroundColor: "#f8fafc" }}
                    animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                    exit={{ opacity: 0, backgroundColor: "#fef2f2" }}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
                          {staff.photo ? (
                            <Image src={staff.photo} alt={staff.name} width={40} height={40} className="object-cover w-full h-full" />
                          ) : (
                            <UserCircle size={24} className="text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 leading-none mb-1">{staff.name}</p>
                          <p className="text-[10px] font-bold text-brand-green uppercase tracking-wider">{staff.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={staff.role}
                        onChange={(e) => updateRole(staff.id, e.target.value)}
                        className="text-sm font-semibold text-slate-700 bg-transparent border-b border-dashed border-slate-300 hover:border-brand-green focus:border-brand-green focus:outline-none cursor-pointer pb-0.5 mb-1 block w-fit"
                      >
                        <option value="Principal">Principal</option>
                        <option value="Senior Teacher">Senior Teacher</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Transport Head">Transport Head</option>
                        <option value="Driver">Driver</option>
                        <option value="Librarian">Librarian</option>
                        <option value="Admin Staff">Admin Staff</option>
                      </select>
                      <p className="text-xs font-medium text-slate-400">{staff.department}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-1">
                        <Mail size={12} className="text-slate-400" /> {staff.email || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Phone size={12} className="text-slate-400" /> {staff.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                          <MoreVertical size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(staff.id)}
                          className="w-8 h-8 rounded bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredStaff.length === 0 && (
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
