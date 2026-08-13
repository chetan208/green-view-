"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Phone, KeyRound, Edit2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/erpApi";

export default function StudentLoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"MOBILE" | "OTP">("MOBILE");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await authApi.sendOtp(cleanMobile, 'student');
      if (res.success) {
        setStep("OTP");
        setSuccess(res.message || `OTP sent to +91 ${cleanMobile}.`);
      } else {
        setError(res.message || "Failed to send OTP.");
      }
    } catch (err: any) {
      setError(err.message || "Unable to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim() || otp.trim().length < 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const cleanMobile = mobile.replace(/\D/g, "");
      const res = await authApi.verifyOtp(cleanMobile, otp.trim(), 'student');

      if (res.success && res.token && res.user) {
        setSuccess("Login successful! Redirecting to student hub...");
        localStorage.setItem('erp_token', res.token);
        localStorage.setItem('erp_user', JSON.stringify(res.user));
        
        setTimeout(() => {
          router.push("/student-portal");
        }, 800);
      } else {
        setError(res.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMobile = () => {
    setStep("MOBILE");
    setOtp("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] flex flex-col justify-center items-center py-10 px-4 relative">
      
      {/* Screen Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 text-center mb-8 mt-12 md:mt-0 tracking-tight">
        Welcome, Log into your account
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
            <span className="text-brand-green">Sign In as </span>
            <span className="text-brand-navy">Student</span>
          </h2>
          <p className="text-slate-400 text-[11px] font-medium mt-2.5 leading-relaxed max-w-[310px]">
            {step === "MOBILE" 
              ? "Enter your registered 10-digit mobile number to receive an OTP." 
              : `Enter the verification code sent to +91 ${mobile}.`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2 text-red-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2 text-brand-green text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-green mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* STEP 1: MOBILE NUMBER ENTRY */}
        {step === "MOBILE" ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
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
              disabled={isLoading || mobile.length !== 10}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white rounded-xl py-3.5 font-semibold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending OTP..." : "Get OTP to Login"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: OTP VERIFICATION */
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-slate-500">
                  Enter OTP
                </label>
                <button
                  type="button"
                  onClick={handleEditMobile}
                  className="text-[11px] font-semibold text-brand-navy hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" /> Change Number
                </button>
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <KeyRound className="w-4 h-4 text-brand-green" />
                </span>
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="Enter OTP code" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-semibold tracking-widest text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 4}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white rounded-xl py-3.5 font-semibold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying OTP..." : "Verify & Login"}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
