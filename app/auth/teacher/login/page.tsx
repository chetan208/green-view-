"use client";

import React, { useState } from "react";
import { User, Lock, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherLoginPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!employeeId.trim() || !password.trim()) {
      setError("Please enter your Employee ID and Password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmp = employeeId.trim().toUpperCase();
      if (
        (cleanEmp === "T-2026-084" && password === "teacher123") ||
        (cleanEmp === "DEMO" && password === "demo")
      ) {
        setSuccess("Login successful! Redirecting to faculty portal...");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        setError("Invalid Employee ID or Password. Use the Demo credentials below.");
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmployeeId("T-2026-084");
    setPassword("teacher123");
    setError("");
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] flex justify-center items-center py-6 px-4 md:px-8 relative overflow-hidden">
      
      {/* Soft Light Green Background Ornaments */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Main Card Container (Pure Light, High-End Card) */}
      <div className="w-full max-w-lg bg-white border border-slate-100/80 rounded-[2rem] p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col gap-5 relative z-10 transition-all duration-300">
        
        {/* Back Link & Branding row */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative shrink-0">
              <img src="/images/logo.png" alt="Green View Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Faculty Portal</span>
          </div>
        </div>

        {/* Header Block */}
        <div className="flex flex-col text-center mt-2">
          <h1 className="text-xl md:text-2xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-tight">
            Welcome Back, Educator!
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1.5 leading-relaxed">
            Please log in with your official school registration credentials.
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

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4.5">
          <div className="flex flex-col">
            <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
              Employee ID *
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g. T-2026-084" 
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
              Access Password *
            </label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-green to-brand-green-dark hover:from-brand-green-dark hover:to-brand-green-darker text-white rounded-xl py-3.5 font-semibold md:font-bold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? "Signing in..." : "Sign In to Portal"}
          </button>
        </form>

        {/* Demo Access Box (Light Theme) */}
        <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-4 flex flex-col items-center">
          <span className="text-[9px] font-bold text-brand-green uppercase tracking-widest mb-3">
            Quick Demo Login
          </span>
          <div className="flex flex-col gap-1.5 text-center text-xs text-slate-655 font-semibold mb-3">
            <div>Employee ID: <code className="bg-emerald-50 border border-emerald-100/30 px-1.5 py-0.5 rounded text-emerald-800 font-mono">T-2026-084</code></div>
            <div>Password: <code className="bg-emerald-50 border border-emerald-100/30 px-1.5 py-0.5 rounded text-emerald-800 font-mono">teacher123</code></div>
          </div>
          <button
            onClick={handleDemoLogin}
            className="text-brand-green hover:text-brand-green-dark text-xs font-bold underline cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Fill Demo Credentials
          </button>
        </div>

        {/* Alternative Link */}
        <div className="text-xs text-slate-500 text-center font-medium pt-4 border-t border-slate-50">
          First time on portal?{" "}
          <Link href="/auth/teacher/register" className="text-brand-green font-bold hover:underline">
            Register Teacher Account
          </Link>
        </div>

      </div>

    </div>
  );
}
