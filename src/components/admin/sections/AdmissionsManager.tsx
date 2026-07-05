'use client';

import React, { useState } from "react";
import { GraduationCap, CheckCircle2, Clock, XCircle, Search, Eye, X, Download, User } from "lucide-react";

type AppStatus = "Pending" | "Approved" | "Rejected";

export default function AdmissionsManager() {
  const [activeTab, setActiveTab] = useState<"primary" | "senior">("primary");
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const primaryApps = [
    {
      id: "PR-2026-001",
      studentName: "Aarav Patel",
      grade: "Class I",
      parentName: "Vikram Patel",
      phone: "9876543210",
      status: "Pending" as AppStatus,
      date: "Jun 18, 2026",
      fullData: {
        course: { class: "Class I" },
        student: { name: "Aarav Patel", sex: "Male", dob: "14/05/2019", religion: "Hindu", category: "General", tongue: "Hindi" },
        family: { father: "Vikram Patel", mother: "Sneha Patel", occupation: "Business" },
        academic: { prevSchool: "Sunshine Kindergarten", medium: "English" },
        contact: { address: "123 Green Avenue, Palampur", phone: "9876543210" }
      }
    },
    {
      id: "PR-2026-002",
      studentName: "Saanvi Singh",
      grade: "Nursery",
      parentName: "Rajeev Singh",
      phone: "9988776655",
      status: "Approved" as AppStatus,
      date: "Jun 17, 2026",
      fullData: {
        course: { class: "Nursery" },
        student: { name: "Saanvi Singh", sex: "Female", dob: "02/11/2021", religion: "Hindu", category: "General", tongue: "English" },
        family: { father: "Rajeev Singh", mother: "Priya Singh", occupation: "Engineer" },
        academic: { prevSchool: "None", medium: "N/A" },
        contact: { address: "45 Hill View, Dharamshala", phone: "9988776655" }
      }
    }
  ];

  const seniorApps = [
    {
      id: "SR-2026-001",
      studentName: "Rohan Gupta",
      stream: "Science",
      subjects: "Physics, Chemistry, Maths, English, Computer Science",
      fatherMobile: "9123456789",
      status: "Pending" as AppStatus,
      date: "Jun 18, 2026",
      fullData: {
        course: { class: "Class XI", stream: "Science", subjects: "Physics, Chemistry, Maths, English, Computer Science", provisional: true },
        student: { name: "Rohan Gupta", hindiName: "रोहन गुप्ता", dob: "10/08/2009", gender: "Male", aadhaar: "1234-5678-9012", pan: "ABCDE1234F", category: "General", bpl: "No" },
        family: { father: "Amit Gupta", fPhone: "9123456789", fOcc: "Doctor", mother: "Kavita Gupta", mPhone: "9123456788", income: "8,00,000+" },
        address: { village: "Palampur", post: "Palampur", tehsil: "Palampur", district: "Kangra", state: "HP", pin: "176061" },
        bank: { account: "987654321098", name: "State Bank of India", branch: "Palampur", ifsc: "SBIN0001234" },
        exam: [{ name: "Class X Board", year: "2026", school: "DAV", board: "CBSE", roll: "556677", marks: "480", max: "500", percent: "96%" }]
      }
    }
  ];

  const activeApps = activeTab === "primary" ? primaryApps : seniorApps;

  const StatusBadge = ({ status }: { status: AppStatus }) => {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
        status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
        status === "Rejected" ? "bg-rose-50 text-rose-700 border-rose-200" :
        "bg-amber-50 text-amber-700 border-amber-200"
      }`}>
        {status === "Approved" && <CheckCircle2 size={12} />}
        {status === "Pending" && <Clock size={12} />}
        {status === "Rejected" && <XCircle size={12} />}
        {status}
      </span>
    );
  };

  const DetailSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-6">
      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-2">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase">{label}</div>
      <div className="text-sm font-semibold text-slate-800 mt-0.5">{value || "—"}</div>
    </div>
  );

  return (
    <div className="space-y-6 text-slate-800 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">Admissions Processing</h2>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search applicant name..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-brand-green font-medium transition w-64" />
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("primary")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition ${activeTab === "primary" ? "border-brand-green text-brand-green" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Primary & Secondary (Nursery - X)
        </button>
        <button 
          onClick={() => setActiveTab("senior")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition ${activeTab === "senior" ? "border-brand-green text-brand-green" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Senior Secondary (XI - XII)
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
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
              <tr key={app.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-700">{app.id}</div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">{app.date}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-slate-800">{app.studentName}</div>
                  <div className="text-xs font-semibold text-brand-green mt-0.5">{activeTab === "primary" ? app.grade : app.fullData.course.class}</div>
                </td>
                
                {activeTab === "primary" ? (
                  <td className="p-4">
                    <div className="font-bold text-slate-700">{app.parentName}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{app.phone}</div>
                  </td>
                ) : (
                  <td className="p-4">
                    <div className="font-bold text-slate-700">{app.stream}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5 truncate max-w-[200px]" title={app.subjects}>{app.subjects}</div>
                  </td>
                )}

                <td className="p-4">
                  <StatusBadge status={app.status} />
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelectedApp(app)} className="text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition px-2.5 py-1.5 rounded flex items-center gap-1.5 bg-transparent cursor-pointer">
                      <Eye size={14} /> View
                    </button>
                    <button className="text-xs font-bold text-emerald-600 hover:text-white border border-emerald-200 hover:bg-emerald-500 transition px-2.5 py-1.5 rounded bg-emerald-50 cursor-pointer">
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-serif">Application: {selectedApp.id}</h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Submitted on {selectedApp.date}</p>
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
                    <Field label="Applied Class" value={selectedApp.fullData.course.class} />
                    {activeTab === "senior" && (
                      <>
                        <Field label="Stream" value={selectedApp.fullData.course.stream} />
                        <Field label="Provisional" value={selectedApp.fullData.course.provisional ? "Yes" : "No"} />
                        <div className="col-span-2 sm:col-span-3">
                          <Field label="Selected Subjects" value={selectedApp.fullData.course.subjects} />
                        </div>
                      </>
                    )}
                  </DetailSection>
                </div>

                {/* Applicant Photo Box */}
                <div className="shrink-0 w-28 h-36 rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm flex flex-col items-center justify-center p-1">
                  <div className="w-full h-full rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                    {selectedApp.fullData.student.photo ? (
                      <img src={selectedApp.fullData.student.photo} alt="Applicant" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mb-2">
                          <User size={20} className="text-slate-400" />
                        </div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider text-center px-1 leading-tight">Applicant<br/>Photo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <DetailSection title="Student Details">
                <Field label="Student Name" value={selectedApp.fullData.student.name} />
                {activeTab === "senior" && <Field label="Hindi Name" value={selectedApp.fullData.student.hindiName} />}
                <Field label="Gender" value={selectedApp.fullData.student.sex || selectedApp.fullData.student.gender} />
                <Field label="Date of Birth" value={selectedApp.fullData.student.dob} />
                <Field label="Social Category" value={selectedApp.fullData.student.category} />
                {activeTab === "primary" ? (
                  <>
                    <Field label="Religion" value={selectedApp.fullData.student.religion} />
                    <Field label="Mother Tongue" value={selectedApp.fullData.student.tongue} />
                  </>
                ) : (
                  <>
                    <Field label="Aadhaar No." value={selectedApp.fullData.student.aadhaar} />
                    <Field label="PAN No." value={selectedApp.fullData.student.pan} />
                    <Field label="BPL Status" value={selectedApp.fullData.student.bpl} />
                  </>
                )}
              </DetailSection>

              <DetailSection title="Family Details">
                <Field label="Father's Name" value={selectedApp.fullData.family.father} />
                {activeTab === "primary" ? (
                  <>
                    <Field label="Mother's Name" value={selectedApp.fullData.family.mother} />
                    <Field label="Occupation" value={selectedApp.fullData.family.occupation} />
                  </>
                ) : (
                  <>
                    <Field label="Father's Mobile" value={selectedApp.fullData.family.fPhone} />
                    <Field label="Father's Occupation" value={selectedApp.fullData.family.fOcc} />
                    <Field label="Mother's Name" value={selectedApp.fullData.family.mother} />
                    <Field label="Mother's Mobile" value={selectedApp.fullData.family.mPhone} />
                    <Field label="Annual Income" value={selectedApp.fullData.family.income} />
                  </>
                )}
              </DetailSection>

              {activeTab === "primary" ? (
                <>
                  <DetailSection title="Academic Details">
                    <Field label="Previous School" value={selectedApp.fullData.academic.prevSchool} />
                    <Field label="Medium of Instruction" value={selectedApp.fullData.academic.medium} />
                  </DetailSection>
                  <DetailSection title="Contact Details">
                    <div className="col-span-2 sm:col-span-3"><Field label="Address" value={selectedApp.fullData.contact.address} /></div>
                    <Field label="Phone" value={selectedApp.fullData.contact.phone} />
                  </DetailSection>
                </>
              ) : (
                <>
                  <DetailSection title="Address Details">
                    <Field label="Village" value={selectedApp.fullData.address.village} />
                    <Field label="Post Office" value={selectedApp.fullData.address.post} />
                    <Field label="Tehsil" value={selectedApp.fullData.address.tehsil} />
                    <Field label="District" value={selectedApp.fullData.address.district} />
                    <Field label="State" value={selectedApp.fullData.address.state} />
                    <Field label="Pin Code" value={selectedApp.fullData.address.pin} />
                  </DetailSection>
                  
                  <DetailSection title="Bank Details">
                    <Field label="Account Number" value={selectedApp.fullData.bank.account} />
                    <Field label="Bank Name" value={selectedApp.fullData.bank.name} />
                    <Field label="Branch" value={selectedApp.fullData.bank.branch} />
                    <Field label="IFSC Code" value={selectedApp.fullData.bank.ifsc} />
                  </DetailSection>

                  <DetailSection title="Previous Exam Record">
                    {selectedApp.fullData.exam.map((ex: any, i: number) => (
                      <div key={i} className="col-span-2 sm:col-span-3 bg-slate-50 border border-slate-100 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Field label="Exam" value={ex.name} />
                        <Field label="Year" value={ex.year} />
                        <Field label="Board" value={ex.board} />
                        <Field label="Roll No" value={ex.roll} />
                        <div className="col-span-2 sm:col-span-4 border-t border-slate-200/60 pt-3 mt-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <Field label="Marks" value={`${ex.marks} / ${ex.max}`} />
                          <Field label="Percentage" value={ex.percent} />
                          <Field label="School" value={ex.school} />
                        </div>
                      </div>
                    ))}
                  </DetailSection>
                </>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <button className="text-sm font-bold text-slate-600 hover:text-brand-green flex items-center gap-2 transition bg-transparent border-0 cursor-pointer">
                <Download size={16} /> Download PDF
              </button>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition border-0 cursor-pointer">Reject</button>
                <button className="px-4 py-2 text-sm font-bold text-white bg-brand-green hover:bg-brand-green-dark rounded-lg transition border-0 cursor-pointer shadow-sm">Approve Application</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
