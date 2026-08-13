'use client';

import React, { useState, useEffect } from "react";
import { Plus, Search, Loader2, CheckCircle2, AlertTriangle, X, Users, UserPlus, Calendar, CreditCard, Bus, User, ArrowLeft, ChevronRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { erpApi } from "@/services/erpApi";
import { useAuth } from "@/hooks/useAuth";

interface StudentType {
  _id: string;
  name: string;
  studentClass: string;
  section?: string;
  fatherName: string;
  motherName: string;
  dateOfAdmission: string;
  dob?: string;
  cardNo: string;
  contactNo: string;
  station?: string | null;
  sex?: string;
  religion?: string;
  socialCategory?: string;
  motherTongue?: string;
  address?: string;
  prevSchool?: string;
  studentclass?: {
    className: string;
    _id?: string;
  };
  session?: {
    year: string;
    _id?: string;
  };
}

interface StudentManagerProps {
  onManageFees?: (student: any) => void;
  selectedSession?: string;
}

const CLASSES_LIST = [
  "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12"
];

const inputCls = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green transition-all";

export default function StudentManager({ onManageFees, selectedSession = "2026-27" }: StudentManagerProps) {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);
  const [stationsList, setStationsList] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<StudentType | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [promoteLoading, setPromoteLoading] = useState(false);
  const [promoteStudentData, setPromoteStudentData] = useState<StudentType | null>(null);

  const { user } = useAuth();

  const loadData = async () => {
    setLoading(true);
    try {
      const classesRes = await erpApi.classes.list();
      if (classesRes.success) setClassesList(classesRes.classes);

      const stationsRes = await erpApi.transport.stations.list();
      if (stationsRes.success) setStationsList(stationsRes.stations);

      await fetchStudents();
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const filters: any = { session: selectedSession, limit: 0 };
      if (searchQuery) filters.search = searchQuery;
      if (selectedClass !== "All") filters.classId = classesList.find(c => c.className === selectedClass)?._id || selectedClass;

      const res = await erpApi.students.list(filters);
      if (res.success) {
        setStudents(res.students);
      } else {
        setError(res.message || "Failed to fetch students");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedSession]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedClass]);

  const getNextClass = (currentClass: string) => {
    const CLASS_PROGRESSION: Record<string, string> = {
      "Nursery": "LKG", "LKG": "UKG", "UKG": "Class 1",
      "Class 1": "Class 2", "Class 2": "Class 3", "Class 3": "Class 4",
      "Class 4": "Class 5", "Class 5": "Class 6", "Class 6": "Class 7",
      "Class 7": "Class 8", "Class 8": "Class 9", "Class 9": "Class 10",
      "Class 10": "Class 11", "Class 11": "Class 12"
    };
    return CLASS_PROGRESSION[currentClass] || null;
  };

  const getNextSession = (currentSession: string) => {
    const parts = currentSession.split("-");
    if (parts.length === 2) {
      const startYear = parseInt(parts[0]);
      const nextStartYear = startYear + 1;
      return `${nextStartYear}-${String(parseInt(parts[1]) + 1).padStart(2, '0').slice(-2)}`;
    }
    return currentSession;
  };

  const [formData, setFormData] = useState({
    name: "",
    studentClass: "",
    section: "",
    fatherName: "",
    motherName: "",
    dateOfAdmission: "",
    dob: "",
    cardNo: "",
    contactNo: "",
    station: "",
    sex: "",
    religion: "",
    socialCategory: "",
    motherTongue: "",
    address: "",
    prevSchool: "",
    initialAmountPaid: "",
    paymentMode: "CASH"
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    studentClass: "",
    section: "",
    fatherName: "",
    motherName: "",
    dateOfAdmission: "",
    dob: "",
    cardNo: "",
    contactNo: "",
    station: "",
    sex: "",
    religion: "",
    socialCategory: "",
    motherTongue: "",
    address: "",
    prevSchool: ""
  });

  const resetForm = () => {
    setFormData({
      name: "", studentClass: "", section: "", fatherName: "", motherName: "",
      dateOfAdmission: "", dob: "", cardNo: "", contactNo: "",
      station: "", sex: "", religion: "", socialCategory: "",
      motherTongue: "", address: "", prevSchool: "",
      initialAmountPaid: "", paymentMode: "CASH"
    });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    const submitData = new FormData();
    submitData.append("name", formData.name);
    
    const classObj = classesList.find(c => c.className === formData.studentClass);
    if (classObj) submitData.append("classId", classObj._id);
    else submitData.append("classId", formData.studentClass);
    
    if (formData.section) submitData.append("section", formData.section);

    submitData.append("fatherName", formData.fatherName);
    submitData.append("motherName", formData.motherName);
    submitData.append("dateOfAdmission", formData.dateOfAdmission);
    if (formData.dob) submitData.append("dob", formData.dob);
    submitData.append("cardNo", formData.cardNo);
    submitData.append("contactNo", formData.contactNo);
    
    if (formData.station) {
      const stationObj = stationsList.find(s => s.stationName === formData.station);
      if (stationObj) submitData.append("transportStationId", stationObj._id);
    }
    
    if (formData.sex) submitData.append("sex", formData.sex);
    if (formData.religion) submitData.append("religion", formData.religion);
    if (formData.socialCategory) submitData.append("socialCategory", formData.socialCategory);
    if (formData.motherTongue) submitData.append("motherTongue", formData.motherTongue);
    if (formData.address) submitData.append("address", formData.address);
    if (formData.prevSchool) submitData.append("prevSchool", formData.prevSchool);
    submitData.append("session", selectedSession);

    try {
      const res = await erpApi.students.create(submitData);
      if (res.success) {
        setSuccess(`${formData.name} registered successfully!`);
        resetForm();
        setShowForm(false);
        fetchStudents();
      } else {
        setError(res.message || "Failed to add student");
      }
    } catch (err: any) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleOpenEdit = (student: StudentType) => {
    const formatDateForInput = (dateStr?: string | null) => {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().split("T")[0];
    };

    setEditFormData({
      name: student.name || "",
      studentClass: student.studentclass?.className || student.studentClass || "",
      section: student.section || "",
      fatherName: student.fatherName || "",
      motherName: student.motherName || "",
      dateOfAdmission: formatDateForInput(student.dateOfAdmission),
      dob: formatDateForInput(student.dob),
      cardNo: student.cardNo || "",
      contactNo: student.contactNo || "",
      station: student.station || "",
      sex: student.sex || "",
      religion: student.religion || "",
      socialCategory: student.socialCategory || "",
      motherTongue: student.motherTongue || "",
      address: student.address || "",
      prevSchool: student.prevSchool || ""
    });
    setError(null);
    setSuccess(null);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForDetail) return;
    setSubmitLoading(true);

    const updateData: any = { ...editFormData };
    const classObj = classesList.find(c => c.className === editFormData.studentClass);
    if (classObj) updateData.classId = classObj._id;
    if (editFormData.section) updateData.section = editFormData.section;
    
    if (editFormData.station) {
      const stationObj = stationsList.find(s => s.stationName === editFormData.station);
      if (stationObj) updateData.transportStationId = stationObj._id;
    } else {
      updateData.transportStationId = null;
    }

    try {
      const res = await erpApi.students.update(selectedStudentForDetail._id, updateData);
      if (res.success) {
        setSuccess("Student information updated successfully!");
        setShowEditModal(false);
        fetchStudents();
        setSelectedStudentForDetail({ ...selectedStudentForDetail, ...editFormData });
      } else {
        setError(res.message || "Failed to update student");
      }
    } catch (err: any) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudentForDetail) return;
    setSubmitLoading(true);
    try {
      const res = await erpApi.students.delete(selectedStudentForDetail._id);
      if (res.success) {
        setSuccess("Student deleted successfully!");
        setShowDeleteConfirm(false);
        setSelectedStudentForDetail(null);
        fetchStudents();
      } else {
        setError(res.message || "Failed to delete student");
      }
    } catch (err: any) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleOpenPromote = (student: StudentType) => {
    setPromoteStudentData(student);
    setShowPromoteModal(true);
    setError(null);
    setSuccess(null);
  };

  const handlePromote = async () => {
    if (!promoteStudentData) return;
    setPromoteLoading(true);
    
    const currentClass = promoteStudentData.studentclass?.className || promoteStudentData.studentClass || "";
    const nextClassStr = getNextClass(currentClass);
    
    if (!nextClassStr) {
      setError("Highest class reached.");
      setPromoteLoading(false);
      return;
    }
    
    const nextClassObj = classesList.find(c => c.className === nextClassStr);
    
    try {
      const res = await erpApi.students.promote(promoteStudentData._id, {
        nextClassId: nextClassObj?._id || nextClassStr
      });
      
      if (res.success) {
        setSuccess(`Student promoted successfully to ${nextClassStr}.`);
        setShowPromoteModal(false);
        setSelectedStudentForDetail(null);
        fetchStudents();
      } else {
        setError(res.message || "Failed to promote student");
      }
    } catch (err: any) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setPromoteLoading(false);
    }
  };

  const handleClassChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const className = e.target.value;
    setFormData({ ...formData, studentClass: className });
    
    const classObj = classesList.find(c => c.className === className);
    if (classObj && selectedSession) {
      try {
        const res = await erpApi.students.getNextRollNo(classObj._id, selectedSession);
        if (res.success && res.rollNo) {
          setFormData(prev => ({ ...prev, cardNo: res.rollNo }));
        }
      } catch (err) {
        console.error("Could not fetch next roll number", err);
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {selectedStudentForDetail ? (
        <div className="w-full space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-green-darker border-b border-slate-100 pb-3">
            <button
              onClick={() => setSelectedStudentForDetail(null)}
              className="text-slate-400 hover:text-brand-green-darker transition cursor-pointer border-0 bg-transparent p-0 flex items-center gap-1"
            >
              <ArrowLeft size={13} /> Student Database
            </button>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-black">{selectedStudentForDetail.name}</span>
          </div>

          {/* Detailed Profile View */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200/60 shadow-md overflow-hidden"
          >
            {/* Top banner */}
            <div className="bg-brand-green-darker text-white p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
              <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -ml-16 -mb-16" />

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-bold uppercase text-white shadow-inner relative z-10 shrink-0">
                {selectedStudentForDetail.name?.charAt(0)}
              </div>

              <div className="text-center sm:text-left relative z-10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Student Profile</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-none">
                  {selectedStudentForDetail.name}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-white/80 mt-1 font-medium">
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
                    Class: {selectedStudentForDetail.studentclass?.className || selectedStudentForDetail.studentClass}
                  </span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
                    Card No: {selectedStudentForDetail.cardNo}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-brand-green-dark uppercase tracking-widest border-b border-slate-100 pb-2">
                  Academic & Enrollment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Class Name</p>
                    <p className="font-semibold text-brand-green-dark mt-1">
                      {selectedStudentForDetail.studentclass?.className || selectedStudentForDetail.studentClass}
                      {selectedStudentForDetail.section ? ` - Sec ${selectedStudentForDetail.section}` : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Admission / Card Number</p>
                    <p className="font-mono font-semibold text-brand-green-dark mt-1">{selectedStudentForDetail.cardNo}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date of Admission</p>
                    <p className="font-semibold text-brand-green-dark mt-1 flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400" />
                      {new Date(selectedStudentForDetail.dateOfAdmission).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Transport Route / Bus Station</p>
                    <p className="font-semibold text-brand-green-dark mt-1 flex items-center gap-1.5">
                      <Bus size={13} className="text-slate-400" />
                      {selectedStudentForDetail.station || "Day Scholar / None"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-xs font-bold text-brand-green-dark uppercase tracking-widest border-b border-slate-100 pb-2">
                  Personal & Family Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date of Birth</p>
                    <p className="font-semibold text-brand-green-dark mt-1 flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400" />
                      {selectedStudentForDetail.dob ? new Date(selectedStudentForDetail.dob).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not Specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Contact Number</p>
                    <p className="font-semibold text-brand-green-dark mt-1">{selectedStudentForDetail.contactNo}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Father&apos;s Name</p>
                    <p className="font-semibold text-brand-green-dark mt-1">Mr. {selectedStudentForDetail.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mother&apos;s Name</p>
                    <p className="font-semibold text-brand-green-dark mt-1">Mrs. {selectedStudentForDetail.motherName}</p>
                  </div>
                  {selectedStudentForDetail.sex && (
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Gender</p>
                      <p className="font-semibold text-brand-green-dark mt-1">{selectedStudentForDetail.sex}</p>
                    </div>
                  )}
                  {selectedStudentForDetail.religion && (
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Religion</p>
                      <p className="font-semibold text-brand-green-dark mt-1">{selectedStudentForDetail.religion}</p>
                    </div>
                  )}
                  {selectedStudentForDetail.address && (
                    <div className="sm:col-span-2">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
                      <p className="font-semibold text-brand-green-dark mt-1">{selectedStudentForDetail.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-start">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForDetail(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition duration-200 cursor-pointer border-0 active:scale-95"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(selectedStudentForDetail)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-green-darker/10 hover:bg-brand-green-darker/20 text-brand-green-darker border border-brand-green-darker/25 rounded-xl text-xs font-semibold transition duration-200 cursor-pointer active:scale-95"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenPromote(selectedStudentForDetail)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green-dark border border-brand-green/25 rounded-xl text-xs font-semibold transition duration-200 cursor-pointer active:scale-95"
                >
                  Promote Student
                </button>
                {user?.teacherProfile?.accessRole === 'Owner' && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-semibold transition duration-200 cursor-pointer active:scale-95"
                  >
                    Delete Student
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => onManageFees?.({ ...selectedStudentForDetail, id: selectedStudentForDetail._id })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-green-darker hover:bg-brand-green-darker/90 text-white rounded-xl text-xs font-semibold transition duration-200 cursor-pointer border-0 shadow-md shadow-brand-green-darker/10 active:scale-95"
              >
                <CreditCard size={14} />
                Go to Fee Management
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-black">Student Database</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Manage and register students enrolled at Green View Public School.</p>
            </div>
            <button
              onClick={() => { setShowForm(!showForm); resetForm(); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green-darker hover:bg-brand-green-darker/90 text-white rounded-xl text-xs font-semibold transition duration-200 cursor-pointer border-0 shadow-md shadow-brand-green-darker/10"
            >
              {showForm ? <X size={14} /> : <UserPlus size={14} />}
              {showForm ? "Cancel Registration" : "Register New Student"}
            </button>
          </div>

          {/* Expandable Registration Form */}
          {showForm && (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-sm font-bold text-brand-green-dark mb-4 flex items-center gap-2">
                <UserPlus size={16} className="text-brand-green" />
                Student Admission Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
                    <input type="text" required placeholder="E.g., Aarav Sharma" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Student Class *</label>
                    <select required value={formData.studentClass}
                      onChange={handleClassChange} className={inputCls}>
                      <option value="" disabled>Select Class</option>
                      {classesList.map(c => (<option key={c._id} value={c.className}>{c.className}</option>))}
                      {classesList.length === 0 && CLASSES_LIST.map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Section</label>
                    <select value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })} className={inputCls}>
                      <option value="">No Section</option>
                      {formData.studentClass && classesList.find(c => c.className === formData.studentClass)?.sections?.map((s: string) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Gender *</label>
                    <select required value={formData.sex}
                      onChange={(e) => setFormData({ ...formData, sex: e.target.value })} className={inputCls}>
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Father&apos;s Name *</label>
                    <input type="text" required placeholder="E.g., Mr. Rajesh Sharma" value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mother&apos;s Name *</label>
                    <input type="text" required placeholder="E.g., Mrs. Sunita Sharma" value={formData.motherName}
                      onChange={(e) => setFormData({ ...formData, motherName: e.target.value })} className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Date of Birth *</label>
                    <input type="date" required value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Admission Date *</label>
                    <input type="date" required value={formData.dateOfAdmission}
                      onChange={(e) => setFormData({ ...formData, dateOfAdmission: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Admission / Card No *</label>
                    <input type="text" required placeholder="E.g., GV-2026-001" value={formData.cardNo}
                      onChange={(e) => setFormData({ ...formData, cardNo: e.target.value })} className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mother Tongue</label>
                    <input type="text" placeholder="E.g., Hindi" value={formData.motherTongue}
                      onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Religion</label>
                    <input type="text" placeholder="E.g., Hindu" value={formData.religion}
                      onChange={(e) => setFormData({ ...formData, religion: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Social Category</label>
                    <select value={formData.socialCategory}
                      onChange={(e) => setFormData({ ...formData, socialCategory: e.target.value })} className={inputCls}>
                      <option value="">Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Contact Number *</label>
                    <input type="tel" required placeholder="E.g., 9876543210" value={formData.contactNo}
                      onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Bus Station (Optional)</label>
                    <select value={formData.station}
                      onChange={(e) => setFormData({ ...formData, station: e.target.value })} className={inputCls}>
                      <option value="">None / Day Scholar</option>
                      {stationsList.map(s => (<option key={s._id} value={s.stationName}>{s.stationName}</option>))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Address</label>
                    <input type="text" placeholder="Full Address" value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Previous School</label>
                    <input type="text" placeholder="Previous School Name" value={formData.prevSchool}
                      onChange={(e) => setFormData({ ...formData, prevSchool: e.target.value })} className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Initial Amount Collected</label>
                    <input type="number" placeholder="e.g. 5000 (0 if none)" value={formData.initialAmountPaid}
                      onChange={(e) => setFormData(prev => ({ ...prev, initialAmountPaid: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Payment Mode</label>
                    <select value={formData.paymentMode}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMode: e.target.value }))} className={inputCls}>
                      <option value="CASH">CASH</option>
                      <option value="UPI">UPI</option>
                      <option value="BANK_TRANSFER">BANK TRANSFER</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                    <AlertTriangle size={15} />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={submitLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green-darker hover:bg-brand-green-darker/90 text-white rounded-xl text-xs font-semibold transition duration-200 cursor-pointer border-0 shadow-md shadow-brand-green-darker/10">
                  {submitLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  {submitLoading ? "Registering..." : "Add Student"}
                </button>
              </form>
            </div>
          )}

          {/* Success Notification */}
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

          {/* Student List View */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 items-stretch sm:items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search by name, card, or phone..."
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green transition-all font-medium" />
                </div>
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl w-full sm:w-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green-dark">Filter Class:</span>
                  <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                    className="bg-transparent border-0 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer">
                    <option value="All">All Classes</option>
                    {classesList.map(c => (<option key={c._id} value={c.className}>{c.className}</option>))}
                    {classesList.length === 0 && CLASSES_LIST.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                <Users size={13} />
                <span className="font-semibold">{students.length}</span> students found
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="animate-spin text-brand-green-dark" size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Student Records...</span>
                </div>
              ) : students.length > 0 ? (
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400">
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[10px]">Student Details</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[10px]">Card Number</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[10px]">Family Details</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[10px]">Admission Date</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[10px]">Contact</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[10px] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {students.map((student) => (
                      <tr key={student._id} className="hover:bg-slate-50/50 transition duration-150">
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => setSelectedStudentForDetail(student)}
                            className="font-bold text-black hover:text-brand-green transition cursor-pointer border-0 bg-transparent p-0 text-left"
                          >
                            {student.name}
                          </button>
                          <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">
                            {student.studentclass?.className || student.studentClass}
                            {student.section ? ` - ${student.section}` : ''}
                          </p>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-[11px] font-medium text-slate-500">
                          {student.cardNo}
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-slate-500 font-medium">F: {student.fatherName}</p>
                          <p className="text-slate-400 text-[11px]">M: {student.motherName}</p>
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {student.dateOfAdmission ? new Date(student.dateOfAdmission).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-"}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-slate-600">
                          {student.contactNo}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedStudentForDetail(student)}
                              title="View Details"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-brand-green hover:bg-brand-green text-white rounded-xl text-[10px] font-semibold transition duration-200 cursor-pointer border-0 shadow-sm"
                            >
                              <User size={12} />
                              View Profile
                            </button>
                            <button
                              onClick={() => onManageFees?.({ ...student, id: student._id })}
                              title="Manage Fees"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-brand-green-darker hover:bg-brand-green-darker/90 text-white rounded-xl text-[10px] font-semibold transition duration-200 cursor-pointer border-0 shadow-sm"
                            >
                              <CreditCard size={12} />
                              Manage Fees
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-16 text-center text-slate-400 italic">
                  No students found matching your search.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl relative my-8 animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowEditModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="text-sm font-bold text-brand-green-dark mb-4 flex items-center gap-2">
              Edit Student Details
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                  <input type="text" required value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Student Class</label>
                  <select required value={editFormData.studentClass}
                    onChange={(e) => setEditFormData({ ...editFormData, studentClass: e.target.value })} className={inputCls}>
                    <option value="" disabled>Select Class</option>
                    {classesList.map(c => (<option key={c._id} value={c.className}>{c.className}</option>))}
                    {classesList.length === 0 && CLASSES_LIST.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Section</label>
                  <select value={editFormData.section}
                    onChange={(e) => setEditFormData({ ...editFormData, section: e.target.value })} className={inputCls}>
                    <option value="">No Section</option>
                    {editFormData.studentClass && classesList.find(c => c.className === editFormData.studentClass)?.sections?.map((s: string) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Father&apos;s Name</label>
                  <input type="text" required value={editFormData.fatherName}
                    onChange={(e) => setEditFormData({ ...editFormData, fatherName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mother&apos;s Name</label>
                  <input type="text" required value={editFormData.motherName}
                    onChange={(e) => setEditFormData({ ...editFormData, motherName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Admission Date</label>
                  <input type="date" required value={editFormData.dateOfAdmission}
                    onChange={(e) => setEditFormData({ ...editFormData, dateOfAdmission: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Date of Birth</label>
                  <input type="date" required value={editFormData.dob}
                    onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Card No (Unique)</label>
                  <input type="text" required value={editFormData.cardNo}
                    onChange={(e) => setEditFormData({ ...editFormData, cardNo: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Contact Number</label>
                  <input type="tel" required value={editFormData.contactNo}
                    onChange={(e) => setEditFormData({ ...editFormData, contactNo: e.target.value })} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Bus Station (Optional)</label>
                  <select value={editFormData.station}
                    onChange={(e) => setEditFormData({ ...editFormData, station: e.target.value })} className={inputCls}>
                    <option value="">None / Day Scholar</option>
                    {stationsList.map(s => (<option key={s._id} value={s.stationName}>{s.stationName}</option>))}
                  </select>
                </div>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                  <AlertTriangle size={15} /><span>{error}</span>
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer border-0">Cancel</button>
                <button type="submit" disabled={submitLoading}
                  className="px-5 py-2 bg-brand-green hover:bg-brand-green text-white rounded-xl text-xs font-semibold transition disabled:bg-slate-300 cursor-pointer border-0 flex items-center gap-1.5">
                  {submitLoading ? <Loader2 size={13} className="animate-spin" /> : null}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-rose-600 mb-3 flex items-center gap-2">
              <AlertTriangle size={20} />
              Confirm Student Deletion
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Are you sure you want to permanently delete <strong className="text-slate-800">{selectedStudentForDetail?.name}</strong>?
            </p>
            <p className="text-xs text-slate-500 leading-relaxed mt-2 bg-rose-50 border border-rose-100 p-3 rounded-xl font-semibold">
              This action will permanently delete all associated fee structures, monthly demands, payment history, and logs. This cannot be undone.
            </p>
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                <AlertTriangle size={15} /><span>{error}</span>
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => { setShowDeleteConfirm(false); setError(null); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer border-0">Cancel</button>
              <button type="button" onClick={handleDeleteStudent} disabled={submitLoading}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition disabled:bg-slate-300 cursor-pointer border-0 flex items-center gap-1.5">
                {submitLoading ? <Loader2 size={13} className="animate-spin" /> : null}
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promote Student Modal */}
      {showPromoteModal && promoteStudentData && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200/60 max-w-md w-full p-6 shadow-2xl relative my-8 animate-in zoom-in-95 duration-200 text-slate-800 space-y-4">
            <button onClick={() => { setShowPromoteModal(false); setError(null); setSuccess(null); }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 border-0 bg-transparent cursor-pointer p-1">
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 bg-brand-green/10 border border-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-green-dark">Promote Student</h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Move Student to Next Academic Session</p>
              </div>
            </div>
            <div className="space-y-3 leading-relaxed text-xs">
              <p className="font-medium text-slate-600">
                You are promoting <strong className="text-brand-green-dark font-bold">{promoteStudentData.name}</strong> to the next academic session.
              </p>
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Current State</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    Class: {promoteStudentData.studentclass?.className || promoteStudentData.studentClass}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5">
                    Session: {promoteStudentData.session?.year || selectedSession}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">
                    Roll No: {promoteStudentData.cardNo}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-brand-green">Target State</p>
                  {getNextClass(promoteStudentData.studentclass?.className || promoteStudentData.studentClass || "") ? (
                    <>
                      <p className="text-xs font-bold text-brand-green-dark mt-1">
                        Class: {getNextClass(promoteStudentData.studentclass?.className || promoteStudentData.studentClass || "")}
                      </p>
                      <p className="text-[10px] font-medium text-brand-green mt-0.5">
                        Session: {getNextSession(promoteStudentData.session?.year || selectedSession || "")}
                      </p>
                      <p className="text-[10px] font-medium text-brand-green/80 italic mt-0.5">
                        Roll No: Auto-generated
                      </p>
                    </>
                  ) : (
                    <p className="text-xs font-bold text-rose-600 mt-1">
                      Highest class (12th) reached.
                    </p>
                  )}
                </div>
              </div>
              {getNextClass(promoteStudentData.studentclass?.className || promoteStudentData.studentClass || "") ? (
                <div className="bg-brand-green/5 border border-brand-green/10 text-brand-green-dark p-3.5 rounded-2xl text-[10px] font-medium leading-normal">
                  <strong>Note:</strong> Promoting this student will automatically assign them to the next session in the promoted class with auto-generated roll numbers and fee structures.
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-2xl text-[10px] font-medium leading-normal">
                  <strong>Warning:</strong> Student is currently in the highest class (12th). They cannot be promoted further.
                </div>
              )}
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                <AlertTriangle size={15} /><span>{error}</span>
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setShowPromoteModal(false); setError(null); setSuccess(null); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer border-0">Cancel</button>
              <button type="button" onClick={handlePromote}
                disabled={promoteLoading || !getNextClass(promoteStudentData.studentclass?.className || promoteStudentData.studentClass || "")}
                className="px-5 py-2 bg-brand-green hover:bg-brand-green text-white rounded-xl text-xs font-semibold transition disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer border-0 flex items-center gap-1.5 shadow-md shadow-brand-green/10">
                {promoteLoading ? <Loader2 size={13} className="animate-spin" /> : null}
                Confirm Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
