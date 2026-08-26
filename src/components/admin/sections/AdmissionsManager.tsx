'use client';

import React, { useState, useEffect } from "react";
import { GraduationCap, CheckCircle2, Clock, XCircle, Search, Eye, X, Download, User, Loader2, AlertTriangle, Power, ShieldAlert, CheckCircle, Info } from "lucide-react";
import { admissionsApi, erpApi } from "@/services/erpApi";

// Utility to calculate current academic session based on date
type AppStatus = "PENDING" | "APPROVED" | "REJECTED";
const getCurrentAcademicSession = () => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 is January
  let startYear = now.getFullYear();
  if (currentMonth < 3) {
    startYear = startYear - 1;
  }
  const endYearStr = (startYear + 1).toString().slice(-2);
  return `${startYear}-${endYearStr}`;
};

export default function AdmissionsManager() {
  const dynamicSession = getCurrentAcademicSession();
  const [activeTab, setActiveTab] = useState<"primary" | "senior">("primary");
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeSessionYear, setActiveSessionYear] = useState<string>("");
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (searchQuery) filters.search = searchQuery;
      
      const [res, sessionRes] = await Promise.all([
        admissionsApi.list(filters),
        erpApi.sessions.list()
      ]);

      if (sessionRes.success && sessionRes.sessions) {
        const active = sessionRes.sessions.find((s: any) => s.isActive);
        if (active) {
          setActiveSessionId(active._id);
          setActiveSessionYear(active.year || "");
          setAdmissionsOpen(Boolean(active.admissionsOpen));
        }
      }

      if (res.success) {
        const mappedApps = res.applications.map((app: any) => ({
          ...app,
          student: {
            name: app.studentName,
            hindiName: app.studentNameHindi,
            dob: app.dateOfBirth,
            sex: app.sex,
            religion: app.religion,
            category: app.socialCategory,
            motherTongue: app.motherTongue,
            aadhaarNo: app.aadhaarNumber,
            panNo: app.panNumber,
            isBPL: app.bplStatus,
            photoUrl: app.photoUrl
          },
          course: {
            class: app.appliedClass,
            stream: app.stream,
            provisional: app.isProvisional,
            subjects: app.selectedSubjects
          },
          family: {
            father: app.fatherName,
            mother: app.motherName,
            fatherPhone: app.fatherMobile,
            motherPhone: app.motherMobile,
            occupation: app.fatherOccupation || app.guardianOccupation,
            fatherOccupation: app.fatherOccupation,
            annualIncome: app.annualIncome
          },
          contact: {
            phone: app.fatherMobile,
            address: app.address
          },
          academic: {
            prevSchool: app.prevSchoolName,
            medium: app.prevSchoolMedium,
            previousExams: app.previousExams
          },
          address: {
            village: app.village,
            postOffice: app.postOffice,
            tehsil: app.tehsil,
            district: app.district,
            state: app.state,
            pinCode: app.pinCode
          },
          bank: {
            accountNo: app.bankAccountNo,
            bankName: app.bankName,
            branchName: app.bankBranch,
            ifscCode: app.ifscCode
          }
        }));
        setAdmissions(mappedApps || []);
      } else {
        setError(res.message || "Failed to load admissions");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAdmissions();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const primaryApps = admissions.filter(a => a.applicationType === "primary");
  const seniorApps = admissions.filter(a => a.applicationType === "senior");

  const activeApps = activeTab === "primary" ? primaryApps : seniorApps;

  const handleToggleAdmissions = async () => {
    if (!activeSessionId) return;
    setToggleLoading(true);
    try {
      const newStatus = !admissionsOpen;
      const res = await erpApi.sessions.toggleAdmissionStatus(activeSessionId, newStatus);
      if (res.success) {
        setAdmissionsOpen(newStatus);
      } else {
        alert(res.message || "Failed to toggle admissions status");
      }
    } catch (err: any) {
      alert("Error toggling admissions status");
    } finally {
      setToggleLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await admissionsApi.approve(id, dynamicSession);
      if (res.success) {
        fetchAdmissions();
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp({ ...selectedApp, status: "APPROVED" });
        }
      } else {
        alert(res.message || "Failed to approve application");
      }
    } catch (err: any) {
      alert(err.message || "Failed to approve application");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason:");
    if (reason === null) return;
    
    setActionLoading(true);
    try {
      const res = await admissionsApi.reject(id, reason || "Not specified");
      if (res.success) {
        fetchAdmissions();
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp({ ...selectedApp, status: "REJECTED" });
        }
      } else {
        alert(res.message || "Failed to reject application");
      }
    } catch (err: any) {
      alert(err.message || "Failed to reject application");
    } finally {
      setActionLoading(false);
    }
  };

  const StatusBadge = ({ status }: { status: AppStatus }) => {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
        status === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
        status === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" :
        "bg-amber-50 text-amber-700 border-amber-200"
      }`}>
        {status === "APPROVED" && <CheckCircle2 size={12} />}
        {status === "PENDING" && <Clock size={12} />}
        {status === "REJECTED" && <XCircle size={12} />}
        {status}
      </span>
    );
  };

  const DetailSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-6">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-2">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
      <div className="text-[10px] font-semibold text-slate-400 uppercase">{label}</div>
      <div className="text-sm font-medium text-slate-800 mt-0.5">{value || "—"}</div>
    </div>
  );

  return (
    <div className="space-y-6 text-slate-800 relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-green" />
            Admissions Processing Center
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Manage online student admission applications &amp; control application portal status.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search applicant name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition w-64 shadow-xs" 
          />
        </div>
      </div>

      {/* Prominent High-Contrast Admission Control Banner */}
      {activeSessionId && (
        <div className={`p-6 rounded-3xl border transition-all shadow-sm ${
          admissionsOpen 
            ? "bg-gradient-to-r from-emerald-500/10 via-emerald-50/50 to-white border-emerald-200" 
            : "bg-gradient-to-r from-rose-500/10 via-rose-50/50 to-white border-rose-200"
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                admissionsOpen ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
              }`}>
                {admissionsOpen ? <CheckCircle size={24} /> : <ShieldAlert size={24} />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${admissionsOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                  <span className={`text-xs font-black uppercase tracking-wider ${admissionsOpen ? "text-emerald-700" : "text-rose-700"}`}>
                    STATUS: ONLINE ADMISSIONS ARE {admissionsOpen ? "OPEN & ACTIVE" : "CLOSED"} FOR SESSION {activeSessionYear || dynamicSession}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {admissionsOpen 
                    ? `Parents & students can fill out and submit online admission forms for session ${activeSessionYear || dynamicSession}.` 
                    : `Online application forms for session ${activeSessionYear || dynamicSession} are disabled. Applicants see a clear 'Admissions Closed' notice.`}
                </h3>
              </div>
            </div>

            <button
              onClick={handleToggleAdmissions}
              disabled={toggleLoading}
              className={`px-6 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md border-0 disabled:opacity-50 ${
                admissionsOpen 
                  ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
              }`}
            >
              {toggleLoading ? <Loader2 size={16} className="animate-spin" /> : <Power size={16} />}
              <span>{admissionsOpen ? `Close Admissions (${activeSessionYear || dynamicSession})` : `Open Admissions (${activeSessionYear || dynamicSession})`}</span>
            </button>

          </div>
        </div>
      )}

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("primary")}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition cursor-pointer bg-transparent ${activeTab === "primary" ? "border-brand-green text-brand-green" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Primary &amp; Secondary (Nursery - X) ({primaryApps.length})
        </button>
        <button 
          onClick={() => setActiveTab("senior")}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition cursor-pointer bg-transparent ${activeTab === "senior" ? "border-brand-green text-brand-green" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Senior Secondary (XI - XII) ({seniorApps.length})
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertTriangle size={15} />
          <span>{error}</span>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="animate-spin text-brand-green-dark" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Applications...</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">App ID &amp; Date</th>
                <th className="p-4">Student Info</th>
                {activeTab === "primary" ? (
                  <th className="p-4">Parent Details</th>
                ) : (
                  <th className="p-4">Stream &amp; Subjects</th>
                )}
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {activeApps.map((app: any) => (
                <tr key={app._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4">
                    <div className="font-semibold text-slate-700">{app.applicationId || app._id.substring(0, 8).toUpperCase()}</div>
                    <div className="text-xs font-medium text-slate-400 mt-0.5">{new Date(app.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{app.student?.name}</div>
                    <div className="text-xs font-medium text-brand-green mt-0.5">{app.course?.class}</div>
                  </td>
                  
                  {activeTab === "primary" ? (
                    <td className="p-4">
                      <div className="font-semibold text-slate-700">{app.family?.father}</div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5">{app.contact?.phone}</div>
                    </td>
                  ) : (
                    <td className="p-4">
                      <div className="font-semibold text-slate-700">{app.course?.stream}</div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5 truncate max-w-[200px]" title={app.course?.subjects?.join(", ")}>
                        {app.course?.subjects?.join(", ")}
                      </div>
                    </td>
                  )}

                  <td className="p-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedApp(app)} className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 bg-transparent cursor-pointer">
                        <Eye size={14} /> View
                      </button>
                      {app.status === "PENDING" && (
                        <button 
                          onClick={() => handleApprove(app._id)}
                          disabled={actionLoading}
                          className="text-xs font-semibold text-emerald-600 hover:text-white border border-emerald-200 hover:bg-emerald-500 transition px-2.5 py-1.5 rounded-lg bg-emerald-50 cursor-pointer disabled:opacity-50"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {activeApps.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-sm font-medium">
                    No applications found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 font-serif">Application: {selectedApp.applicationId || selectedApp._id.substring(0, 8).toUpperCase()}</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Submitted on {new Date(selectedApp.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={selectedApp.status} />
                <button onClick={() => setSelectedApp(null)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-full transition bg-transparent border-0 cursor-pointer">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-6 mb-2">
                <div className="flex-1 w-full">
                  <DetailSection title="Course Details">
                    <Field label="Applied Class" value={selectedApp.course?.class} />
                    <Field 
                      label="Admitting to Session" 
                      value={<span className="text-brand-green font-bold bg-brand-green/10 px-2 py-0.5 rounded text-xs">{dynamicSession}</span>} 
                    />
                    {activeTab === "senior" && (
                      <>
                        <Field label="Stream" value={selectedApp.course?.stream} />
                        <Field label="Provisional" value={selectedApp.course?.provisional ? "Yes" : "No"} />
                        <div className="col-span-2 sm:col-span-3">
                          <Field label="Selected Subjects" value={selectedApp.course?.subjects?.join(", ")} />
                        </div>
                      </>
                    )}
                  </DetailSection>
                </div>

                {/* Applicant Photo Box */}
                <div className="shrink-0 w-28 h-36 rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm flex flex-col items-center justify-center p-1">
                  <div className="w-full h-full rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                    {selectedApp.student?.photoUrl ? (
                      <img src={selectedApp.student.photoUrl} alt="Applicant" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mb-2">
                          <User size={20} className="text-slate-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider text-center px-1 leading-tight">Applicant<br/>Photo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <DetailSection title="Student Details">
                <Field label="Student Name" value={selectedApp.student?.name} />
                {activeTab === "senior" && <Field label="Hindi Name" value={selectedApp.student?.hindiName} />}
                <Field label="Gender" value={selectedApp.student?.sex || selectedApp.student?.gender} />
                <Field label="Date of Birth" value={selectedApp.student?.dob ? new Date(selectedApp.student.dob).toLocaleDateString() : ""} />
                <Field label="Social Category" value={selectedApp.student?.category} />
                {activeTab === "primary" ? (
                  <>
                    <Field label="Religion" value={selectedApp.student?.religion} />
                    <Field label="Mother Tongue" value={selectedApp.student?.motherTongue} />
                  </>
                ) : (
                  <>
                    <Field label="Aadhaar No." value={selectedApp.student?.aadhaarNo} />
                    <Field label="PAN No." value={selectedApp.student?.panNo} />
                    <Field label="BPL Status" value={selectedApp.student?.isBPL ? "Yes" : "No"} />
                  </>
                )}
              </DetailSection>

              <DetailSection title="Family Details">
                <Field label="Father's Name" value={selectedApp.family?.father} />
                {activeTab === "primary" ? (
                  <>
                    <Field label="Mother's Name" value={selectedApp.family?.mother} />
                    <Field label="Occupation" value={selectedApp.family?.occupation} />
                  </>
                ) : (
                  <>
                    <Field label="Father's Mobile" value={selectedApp.family?.fatherPhone} />
                    <Field label="Father's Occupation" value={selectedApp.family?.fatherOccupation} />
                    <Field label="Mother's Name" value={selectedApp.family?.mother} />
                    <Field label="Mother's Mobile" value={selectedApp.family?.motherPhone} />
                    <Field label="Annual Income" value={selectedApp.family?.annualIncome} />
                  </>
                )}
              </DetailSection>

              {activeTab === "primary" ? (
                <>
                  <DetailSection title="Academic Details">
                    <Field label="Previous School" value={selectedApp.academic?.prevSchool} />
                    <Field label="Medium of Instruction" value={selectedApp.academic?.medium} />
                  </DetailSection>
                  <DetailSection title="Contact Details">
                    <div className="col-span-2 sm:col-span-3"><Field label="Address" value={selectedApp.contact?.address} /></div>
                    <Field label="Phone" value={selectedApp.contact?.phone} />
                  </DetailSection>
                </>
              ) : (
                <>
                  <DetailSection title="Address Details">
                    <Field label="Village" value={selectedApp.address?.village} />
                    <Field label="Post Office" value={selectedApp.address?.postOffice} />
                    <Field label="Tehsil" value={selectedApp.address?.tehsil} />
                    <Field label="District" value={selectedApp.address?.district} />
                    <Field label="State" value={selectedApp.address?.state} />
                    <Field label="Pin Code" value={selectedApp.address?.pinCode} />
                  </DetailSection>
                  
                  <DetailSection title="Bank Details">
                    <Field label="Account Number" value={selectedApp.bank?.accountNo} />
                    <Field label="Bank Name" value={selectedApp.bank?.bankName} />
                    <Field label="Branch" value={selectedApp.bank?.branchName} />
                    <Field label="IFSC Code" value={selectedApp.bank?.ifscCode} />
                  </DetailSection>

                  {selectedApp.academic?.previousExams && selectedApp.academic.previousExams.length > 0 && (
                    <DetailSection title="Previous Exam Record">
                      {selectedApp.academic.previousExams.map((ex: any, i: number) => (
                        <div key={i} className="col-span-2 sm:col-span-3 bg-slate-50 border border-slate-100 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <Field label="Exam" value={ex.examName} />
                          <Field label="Year" value={ex.year} />
                          <Field label="Board" value={ex.board} />
                          <Field label="Roll No" value={ex.rollNo} />
                          <div className="col-span-2 sm:col-span-4 border-t border-slate-200/60 pt-3 mt-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <Field label="Marks" value={`${ex.marksObtained} / ${ex.maxMarks}`} />
                            <Field label="Percentage" value={ex.percentage + "%"} />
                            <Field label="School" value={ex.schoolName} />
                          </div>
                        </div>
                      ))}
                    </DetailSection>
                  )}
                </>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <a 
                href={`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.greenviewschool.in'}/api/admissions/${selectedApp._id}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-slate-600 hover:text-brand-green flex items-center gap-2 transition bg-transparent border-0 cursor-pointer no-underline"
              >
                <Download size={16} /> Download PDF
              </a>
              {selectedApp.status === "PENDING" && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleReject(selectedApp._id)}
                    disabled={actionLoading}
                    className="px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition border-0 cursor-pointer disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleApprove(selectedApp._id)}
                    disabled={actionLoading}
                    className="px-4 py-2 text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-dark rounded-lg transition border-0 cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    {actionLoading && <Loader2 size={14} className="animate-spin" />}
                    Approve Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
