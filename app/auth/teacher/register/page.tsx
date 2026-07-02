"use client";

import React, { useState } from "react";
import { User, Lock, Phone, Key, AlertCircle, CheckCircle2, ChevronDown, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherRegisterPage() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Mathematics");
  const [accessCode, setAccessCode] = useState("");
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

    if (!name.trim() || !accessCode || !mobile || !password) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    if (mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (accessCode.trim().toUpperCase() !== "GV-TEACH-2026") {
      setError("Invalid Faculty Access Code. Use: GV-TEACH-2026 for testing.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Account Registered successfully! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/auth/teacher/login");
      }, 1800);
    }, 1200);
  };

  const departments = ["Mathematics", "Science & Lab Research", "Social Science & Humanities", "English Core & Languages", "Information Technology & Computer Science", "Physical Education (PTI)"];

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] flex justify-center items-center py-6 px-4 md:px-8 relative overflow-hidden">
      
      {/* Soft Light Green Background Ornaments */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Main Card Container (Pure Light, High-End Card) */}
      <div className="w-full max-w-lg bg-white border border-slate-100/80 rounded-[2rem] p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col gap-5 relative z-10 transition-all duration-300">
        
        {/* Back Link & Branding row */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
          <Link href="/auth/teacher/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> Login
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative shrink-0">
              <img src="/images/logo.png" alt="Green View Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Faculty Portal</span>
          </div>
        </div>

        {/* Header Block */}
        <div className="flex flex-col text-center mt-1">
          <h1 className="text-xl md:text-2xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-tight">
            Faculty Registration
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1.5 leading-relaxed">
            Create an official educator profile to access the portal tools.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-3.5 flex items-start gap-2.5 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-2.5 text-brand-green text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-green mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Teacher Name */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Full Name *
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Dr. Rajesh Kumar" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Department */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Department *
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold text-slate-800 bg-white appearance-none"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Access Code */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Faculty Access Code *
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. GV-TEACH-2026" 
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
                />
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
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
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-green to-brand-green-dark hover:from-brand-green-dark hover:to-brand-green-darker text-white rounded-xl py-3.5 font-semibold md:font-bold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? "Submitting Registration..." : "Complete Account Registration"}
          </button>
        </form>

        {/* Access Code Helper (Light Theme) */}
        <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Faculty Access Code: <code className="bg-emerald-50 border border-emerald-100/30 px-1.5 py-0.5 rounded text-emerald-800 font-mono">GV-TEACH-2026</code>
        </div>

        {/* Alternative Link */}
        <div className="text-xs text-slate-500 text-center font-medium pt-4 border-t border-slate-50">
          Already registered?{" "}
          <Link href="/auth/teacher/login" className="text-brand-green font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>

    </div>
  );
}
