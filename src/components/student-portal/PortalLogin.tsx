"use client";

import React, { useState } from "react";
import { Lock, User, CheckCircle2, AlertCircle } from "lucide-react";

interface PortalLoginProps {
  onLoginSuccess: (studentData: any) => void;
}

export default function PortalLogin({ onLoginSuccess }: PortalLoginProps) {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!rollNumber.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanRoll = rollNumber.trim().toUpperCase();
      
      if (
        (cleanRoll === "GV-2026-1045" && password === "demo123") ||
        (cleanRoll === "DEMO" && password === "demo")
      ) {
        onLoginSuccess({
          name: "Aarav Sharma",
          rollNo: "GV-2026-1045",
          admissionNo: "ADM-9843-K",
          classSection: "Class X-A",
          house: "Tagore House (Green)",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120",
          attendance: "94.2%",
          gpa: "A+ (92.5%)",
          dueFees: "₹0",
          fatherName: "Mr. Ramesh Sharma",
          contactMobile: "+91 98453-29432"
        });
      } else {
        setError("Invalid Roll Number or Password. Use the Demo credentials below.");
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setRollNumber("GV-2026-1045");
    setPassword("demo123");
    setError("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md border border-slate-100/80 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-center relative z-10">
      
      {/* Top indicator glowing bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-brand-green to-brand-navy rounded-b-full" />

      {/* Portal Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-12 h-12 bg-emerald-50 text-brand-green border border-emerald-100/50 rounded-2xl flex items-center justify-center mb-4 shadow-sm shadow-emerald-500/5">
          <Lock className="w-5.5 h-5.5 stroke-[1.5]" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-tight">
          Student Portal
        </h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">
          Green View School Gateway
        </p>
      </div>

      {error && (
        <div className="bg-red-50/80 border border-red-100/60 rounded-2xl p-3.5 flex items-start gap-2.5 mb-5 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4.5">
        <div className="flex flex-col">
          <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
            Roll Number / Registration ID *
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="e.g. GV-2026-1045" 
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-450 text-slate-800 bg-white"
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
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-455 text-slate-800 bg-white"
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

      {/* Demo Credentials Helper Box */}
      <div className="mt-8 bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Quick Demo Login
        </span>
        <div className="flex flex-col gap-1.5 text-center text-xs text-slate-650 font-semibold mb-3">
          <div>Roll Number: <code className="bg-slate-200/50 px-1.5 py-0.5 rounded text-emerald-700 font-mono">GV-2026-1045</code></div>
          <div>Password: <code className="bg-slate-200/50 px-1.5 py-0.5 rounded text-emerald-700 font-mono">demo123</code></div>
        </div>
        <button
          onClick={handleDemoLogin}
          className="text-brand-green hover:text-brand-green-dark text-xs font-bold underline cursor-pointer flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Fill Demo Credentials
        </button>
      </div>

    </div>
  );
}
