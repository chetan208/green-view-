'use client';

import React, { useState, useEffect } from "react";
import { GraduationCap, CheckCircle2, Clock, XCircle, Search, Eye, X, Download, User, Loader2, AlertTriangle } from "lucide-react";
import { admissionsApi } from "@/services/erpApi";

type AppStatus = "PENDING" | "APPROVED" | "REJECTED";

export default function AdmissionsManager() {
  const [activeTab, setActiveTab] = useState<"primary" | "senior">("primary");
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (searchQuery) filters.search = searchQuery;
      // You could also add filters for formType=PRIMARY or SENIOR here if needed, 
      // but for now we fetch all and filter client-side, or you can implement backend filtering
      
      const res = await admissionsApi.list(filters);
      if (res.success) {
        setAdmissions(res.applications || []);
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
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const primaryApps = admissions.filter(a => a.formType === "PRIMARY");
  const seniorApps = admissions.filter(a => a.formType === "SENIOR");

  const activeApps = activeTab === "primary" ? primaryApps : seniorApps;

  const handleApprove = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await admissionsApi.approve(id);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Admissions Processing</h2>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search applicant name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition w-64" 
          />
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("primary")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${activeTab === "primary" ? "border-brand-green text-brand-green" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Primary & Secondary (Nursery - X)
        </button>
        <button 
          onClick={() => setActiveTab("senior")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${activeTab === "senior" ? "border-brand-green text-brand-green" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Senior Secondary (XI - XII)
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertTriangle size={15} />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="animate-spin text-brand-green-dark" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Applications...</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">App ID & Date</th>
                <th className="p-4">Student Info</th>
                {activeTab === "primary" ? (
                  <th className="p-4">Parent Details</th>
                ) : (
                  <th className="p-4">Stream & Subjects</th>
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
                      <button onClick={() => setSelectedApp(app)} className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition px-2.5 py-1.5 rounded flex items-center gap-1.5 bg-transparent cursor-pointer">
                        <Eye size={14} /> View
                      </button>
                      {app.status === "PENDING" && (
                        <button 
                          onClick={() => handleApprove(app._id)}
                          disabled={actionLoading}
                          className="text-xs font-semibold text-emerald-600 hover:text-white border border-emerald-200 hover:bg-emerald-500 transition px-2.5 py-1.5 rounded bg-emerald-50 cursor-pointer disabled:opacity-50"
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
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
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
              <button className="text-sm font-semibold text-slate-600 hover:text-brand-green flex items-center gap-2 transition bg-transparent border-0 cursor-pointer">
                {/* <Download size={16} /> Download PDF */}
              </button>
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
