"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Phone, KeyRound, Edit2, ArrowRight, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentRegisterPage() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"DETAILS" | "OTP">("DETAILS");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep("OTP");
      setSuccess(`Verification OTP sent to +91 ${cleanMobile}. (Demo OTP: 1234)`);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim() || otp.trim().length < 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Student Account registered successfully! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/auth/student/login");
      }, 1500);
    }, 1000);
  };

  const handleEditDetails = () => {
    setStep("DETAILS");
    setOtp("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] flex flex-col justify-center items-center py-10 px-4 relative">
      
      {/* Screen Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 text-center mb-8 mt-12 md:mt-0 tracking-tight">
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
          <h2 className="text-2xl font-semibold tracking-tight">
            <span className="text-[#0fa958]">Sign Up as </span>
            <span className="text-[#0c3c86]">Student</span>
          </h2>
          <p className="text-slate-400 text-[11px] font-medium mt-2.5 leading-relaxed max-w-[310px]">
            {step === "DETAILS" 
              ? "Register your account using your full name and 10-digit mobile number." 
              : `Enter the 4-digit verification code sent to +91 ${mobile}.`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2 text-red-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2 text-[#0fa958] text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0fa958] mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* STEP 1: NAME & MOBILE ENTRY */}
        {step === "DETAILS" ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-500 mb-2">
                Full Name
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <User className="w-4 h-4 text-brand-green" />
                </span>
                <input 
                  type="text" 
                  placeholder="e.g. Anuj Keshri" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-medium placeholder:text-slate-400 text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-500 mb-2">
                Mobile Number
              </label>
              <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-white focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green/20 transition-all">
                <span className="px-3.5 py-3 text-xs md:text-sm font-semibold text-slate-500 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 shrink-0">
                  <Phone className="w-3.5 h-3.5 text-brand-green" /> +91
                </span>
                <input 
                  type="tel" 
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 outline-none text-xs md:text-sm font-medium placeholder:text-slate-400 text-slate-800 bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0fa958] hover:bg-[#147a42] text-white rounded-xl py-3.5 font-semibold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? "Sending OTP..." : "Get Verification OTP"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: OTP VERIFICATION */
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-slate-500">
                  Enter 4-Digit OTP
                </label>
                <button
                  type="button"
                  onClick={handleEditDetails}
                  className="text-[11px] font-semibold text-[#0c3c86] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" /> Change Details
                </button>
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <KeyRound className="w-4 h-4 text-brand-green" />
                </span>
                <input 
                  type="text" 
                  maxLength={4}
                  placeholder="Enter 4-digit OTP (e.g. 1234)" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-semibold tracking-widest text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0fa958] hover:bg-[#147a42] text-white rounded-xl py-3.5 font-semibold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? "Verifying..." : "Verify & Complete Sign Up"}
            </button>
          </form>
        )}

        {/* Switch to Login link */}
        <div className="text-xs text-slate-500 font-medium text-center pt-4 border-t border-slate-50">
          Already have an account?{" "}
          <Link href="/auth/student/login" className="text-[#0c3c86] font-semibold hover:underline">
            Sign in
          </Link>
        </div>

      </div>

    </div>
  );
}
