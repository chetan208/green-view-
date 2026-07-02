"use client";

import React, { useState } from "react";
import AuthCard from "../../../../src/components/auth/AuthCard";
import { User, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentLoginPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!rollNumber.trim() || !password.trim()) {
      setError("Please enter your Roll Number and Password.");
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
        setSuccess("Login successful! Redirecting to student hub...");
        
        // Save to localStorage for student portal
        localStorage.setItem(
          "gv_student",
          JSON.stringify({
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
          })
        );

        setTimeout(() => {
          router.push("/student-portal");
        }, 1200);
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
    <div className="w-full min-h-screen bg-[#f9fafb] pt-20 md:pt-28 pb-20 px-4 md:px-8 flex justify-center items-center relative overflow-hidden">
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <AuthCard
        title="Welcome Back, Scholar!"
        subtitle="Sign in with your official school registration credentials."
        userType="student"
        alternativeLink={{
          label: "New student registration?",
          text: "Pre-Register Here",
          href: "/auth/student/register"
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

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
              Roll Number *
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g. GV-2026-1045" 
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-semibold md:font-bold text-slate-500 mb-2 uppercase tracking-wider">
              Password *
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
            className="w-full bg-brand-green hover:bg-brand-green-dark text-white rounded-xl py-3.5 font-semibold md:font-bold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? "Signing in..." : "Sign In to Portal"}
          </button>
        </form>

        {/* Demo Access Trigger */}
        <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center">
          <div className="flex flex-col gap-0.5 text-center text-xs text-slate-650 font-semibold mb-2.5">
            <div>Roll Number: <code className="bg-slate-200/50 px-1 py-0.5 rounded text-emerald-700">GV-2026-1045</code></div>
            <div>Password: <code className="bg-slate-200/50 px-1 py-0.5 rounded text-emerald-700">demo123</code></div>
          </div>
          <button
            onClick={handleDemoLogin}
            className="text-brand-green hover:text-brand-green-dark text-xs font-bold underline cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Fill Demo Credentials
          </button>
        </div>
      </AuthCard>

    </div>
  );
}
