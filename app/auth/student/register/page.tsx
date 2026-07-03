"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Account Registered successfully! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/auth/student/login");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] flex flex-col justify-center items-center py-10 px-4 relative">
      
      {/* Screen Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-8 mt-12 md:mt-0 tracking-tight">
        Create your School account
      </h1>

      {/* Main card */}
      <div className="w-full max-w-[460px] bg-white border border-slate-100/80 rounded-3xl p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.015)] flex flex-col gap-6 relative">
        
        {/* School Crest Logo */}
        <div className="flex justify-center mb-2">
          <img 
            src="/images/logo.png" 
            alt="Green View Logo" 
            className="w-20 h-20 object-contain" 
          />
        </div>

        {/* Card Header Title */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="text-[#0fa958]">Sign Up as </span>
            <span className="text-[#0c3c86]">Student</span>
          </h2>
          <p className="text-slate-400 text-[11px] font-semibold mt-2.5 leading-relaxed max-w-[290px]">
            Please register your account with a valid school email.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2 text-[#0fa958] text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0fa958] mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="alex@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-2">
              Password
            </label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-2">
              Confirm Password
            </label>
            <input 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-semibold placeholder:text-slate-400 text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0fa958] hover:bg-[#147a42] text-white rounded-xl py-3.5 font-bold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? "Signing up..." : "Sign UP Now"}
          </button>
        </form>

        {/* Switch to Login link */}
        <div className="text-xs text-slate-500 font-medium text-center pt-4 border-t border-slate-50">
          Already have an account?{" "}
          <Link href="/auth/student/login" className="text-[#0c3c86] font-bold hover:underline">
            Sign in
          </Link>
        </div>

      </div>

    </div>
  );
}
