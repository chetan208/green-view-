"use client";

import React, { useState } from "react";
import { Send, FileText, CheckCircle2, ShieldAlert } from "lucide-react";

export default function AdmissionSection() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    grade: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        grade: "",
        message: "",
      });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="admission" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white flex justify-center">
      <div className="max-w-6xl w-full bg-emerald-800 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch">
        
        {/* Left Side: Information Card */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Background circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-700/40 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-600/30 rounded-full blur-2xl -z-10" />

          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-700/50 border border-emerald-600 px-4 py-1.5 rounded-full mb-6">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-100">
                Enroll Your Child
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
              Admissions Open <br />
              <span className="text-emerald-300">For Session 2026-27</span>
            </h2>

            <p className="text-emerald-100 font-medium text-sm md:text-base mb-8 max-w-sm leading-relaxed">
              Secure your child&apos;s educational future today. Applications are reviewed on a rolling basis, so early registration is advised.
            </p>

            <ul className="flex flex-col gap-4 mb-8">
              {[
                "Highly experienced and verified teaching faculty",
                "Advanced computer labs & sports facilities",
                "Comprehensive school transport safety routes",
                "Affordable fee structure with scholarship plans",
              ].map((p, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-emerald-50 leading-relaxed">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-emerald-700/50 pt-6">
            <button className="flex items-center justify-center gap-2 bg-emerald-700 text-white hover:bg-emerald-600 px-6 py-3 rounded-2xl font-bold text-xs tracking-wide transition-all shadow-md">
              <FileText className="w-4 h-4" />
              Download Prospectus
            </button>
            <button className="flex items-center justify-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3 rounded-2xl font-bold text-xs tracking-wide transition-all shadow-md">
              View Fee Structure
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Registration Form */}
        <div className="flex-1 bg-slate-50 p-8 md:p-12 lg:p-16 border-l border-emerald-900/10">
          <div className="flex flex-col mb-8">
            <h3 className="font-extrabold text-slate-800 text-xl tracking-tight">
              Registration Form
            </h3>
            <span className="text-xs font-semibold text-slate-500 uppercase mt-1 tracking-wider">
              Fill all fields to request a call back
            </span>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center flex flex-col items-center justify-center h-full min-h-[300px]">
              <div className="bg-emerald-100 p-4 rounded-full text-emerald-600 mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-extrabold text-emerald-800 text-lg mb-2">
                Application Received!
              </h4>
              <p className="text-emerald-600 text-xs font-semibold max-w-xs leading-relaxed">
                Thank you for choosing Green View. Our admissions counselor will contact you at your provided phone number shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 px-4 py-3 rounded-2xl text-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 px-4 py-3 rounded-2xl text-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Enter parent name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 px-4 py-3 rounded-2xl text-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                    Select Grade *
                  </label>
                  <select
                    name="grade"
                    required
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 px-4 py-3 rounded-2xl text-slate-600 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select class...</option>
                    <option value="Nursery">Nursery / L.KG / U.KG</option>
                    <option value="Primary">Grades I - V</option>
                    <option value="Middle">Grades VI - VIII</option>
                    <option value="Secondary">Grades IX - X</option>
                    <option value="SrSecondary">Grades XI - XII</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 px-4 py-3 rounded-2xl text-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="parent@example.com"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                  Message / Queries (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 px-4 py-3 rounded-2xl text-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Any specific questions you have..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Application Inquiry
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
