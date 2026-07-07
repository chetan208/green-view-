"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your Email Address and Password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === "teacher@email.com" && password === "teacher123") ||
        (cleanEmail === "demo" && password === "demo")
      ) {
        setSuccess("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/admin");
        }, 1200);
      } else {
        setError("Invalid credentials. Try using the Quick Demo auto-fill option below.");
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail("teacher@email.com");
    setPassword("teacher123");
    setError("");
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
            <span className="text-[#0fa958]">Sign In as </span>
            <span className="text-[#0c3c86]">Teacher</span>
          </h2>
          <p className="text-slate-400 text-[11px] font-medium mt-2.5 leading-relaxed max-w-[290px]">
            Please log in with your official school registration credentials.
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

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-medium text-slate-500 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="teacher@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-medium placeholder:text-slate-400 text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-xs font-medium text-slate-500 mb-2">
              Password
            </label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-xs md:text-sm font-medium placeholder:text-slate-400 text-slate-800 bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
            />
            <Link href="#" className="text-[11px] font-semibold text-[#0c3c86] hover:underline block text-right mt-1.5 self-end">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0fa958] hover:bg-[#147a42] text-white rounded-xl py-3.5 font-semibold text-xs md:text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? "Logging in..." : "Login Now"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="w-full flex items-center justify-center gap-3 my-1">
          <span className="h-[1px] bg-slate-100 flex-grow" />
          <span className="text-[10px] font-semibold text-slate-400 tracking-wider">OR</span>
          <span className="h-[1px] bg-slate-100 flex-grow" />
        </div>

        {/* Demo Helper Box */}
        <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-4 flex flex-col items-center">
          <span className="text-[9px] font-semibold text-emerald-700 uppercase tracking-widest mb-2.5">
            Quick Demo Login
          </span>
          <div className="flex flex-col gap-1 text-center text-xs text-slate-600 font-medium mb-2.5">
            <div>Email: <code className="bg-emerald-50 border border-emerald-100/30 px-1.5 py-0.5 rounded text-emerald-800 font-mono">teacher@email.com</code></div>
            <div>Password: <code className="bg-emerald-50 border border-emerald-100/30 px-1.5 py-0.5 rounded text-emerald-800 font-mono">teacher123</code></div>
          </div>
          <button
            onClick={handleDemoLogin}
            className="text-[#0fa958] hover:text-[#147a42] text-xs font-semibold underline cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Fill Demo Credentials
          </button>
        </div>

        {/* Switch to Register link */}
        <div className="text-xs text-slate-500 font-medium text-center pt-2 border-t border-slate-50">
          Don&apos;t have an account?{" "}
          <Link href="/auth/teacher/register" className="text-[#0c3c86] font-semibold hover:underline">
            Sign up
          </Link>
        </div>

      </div>

    </div>
  );
}
