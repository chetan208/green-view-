"use client";

import React, { useState } from "react";
import AuthCard from "../../../../src/components/auth/AuthCard";
import { User, Lock, Calendar, Phone, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentRegisterPage() {
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [dob, setDob] = useState("");
  const [targetClass, setTargetClass] = useState("Class XI");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !parentName.trim() || !dob || !mobile || !password) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    const hasHindi = /[\u0900-\u097F]/.test(name);
    if (hasHindi) {
      setError("Student name cannot contain Hindi/Devanagari characters. Please write in English.");
      return;
    }

    if (mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Pre-Registration Completed! Temporary ID: GV-REG-2026-8742 generated. Redirecting to login...");
      
      setTimeout(() => {
        router.push("/auth/student/login");
      }, 2000);
    }, 1200);
  };

  const classes = ["Nursery", "KG", "Class I", "Class V", "Class IX", "Class X", "Class XI", "Class XII"];

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] pt-20 md:pt-28 pb-20 px-4 md:px-8 flex justify-center items-center relative overflow-hidden">
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <AuthCard
        title="Student Pre-Admission Portal"
        subtitle="Complete this form to create a candidate registration file."
        userType="student"
        alternativeLink={{
          label: "Already registered a student?",
          text: "Login to Portal",
          href: "/auth/student/login"
        }}
      >
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-3 flex items-start gap-2.5 mb-5 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex items-start gap-2.5 mb-5 text-brand-green text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-green mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Student Name */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                Student Name (English) *
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Student's Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Parent Name */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                Father/Guardian Name *
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Father's Full Name" 
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* DOB */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                Date of Birth *
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold text-slate-800 bg-white"
                />
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Target Class dropdown */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                Class for Admission *
              </label>
              <div className="relative">
                <select
                  value={targetClass}
                  onChange={(e) => setTargetClass(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold text-slate-800 bg-white appearance-none"
                >
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Mobile */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                Mobile Number *
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="10-digit number" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
                />
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                Create Password *
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Minimum 6 characters" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-green to-brand-green-dark hover:from-brand-green-dark hover:to-brand-green-darker text-white rounded-xl py-3.5 font-semibold md:font-bold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? "Submitting Registration..." : "Complete Pre-Registration"}
          </button>
        </form>
      </AuthCard>

    </div>
  );
}
