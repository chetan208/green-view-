"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import { motion } from "framer-motion";

interface AuthCardProps {
  title: string;
  subtitle: string;
  userType: "student" | "teacher";
  children: React.ReactNode;
  alternativeLink: {
    label: string;
    text: string;
    href: string;
  };
}

export default function AuthCard({ title, subtitle, userType, children, alternativeLink }: AuthCardProps) {
  return (
    <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex overflow-hidden min-h-[580px] relative z-10 transition-all duration-300">
      
      {/* Top Brand Color Border Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-green to-brand-navy" />

      {/* Left Column: Visual School Highlights */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Glowing blur effects inside sidebar */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-green/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-[85px] pointer-events-none" />

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors group z-10">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Homepage
        </Link>

        {/* Branding & Highlights */}
        <div className="flex flex-col gap-8 my-auto max-w-sm z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 relative shrink-0 p-1.5 bg-white/5 rounded-xl border border-white/10">
              <img src="/images/logo.png" alt="Green View Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-white text-xl leading-none tracking-tight">Green View</span>
              <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase mt-1 leading-none">Sr. Sec. School</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold md:font-extrabold tracking-tight leading-snug">
            {userType === "student" ? "Your Academic Journey Starts Here" : "Empowering Minds, Shaping Futures"}
          </h2>
          
          <p className="text-slate-400 text-xs font-medium leading-relaxed">
            {userType === "student" 
              ? "Access study worksheets, track monthly attendance ratios, view class schedules, and manage receipt ledgers instantly from your personal dashboard." 
              : "Manage student marks, record attendance logs, post announcements, and coordinate parent communication logs efficiently."}
          </p>

          <div className="flex flex-col gap-4 mt-2 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-3.5 group/item">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-green group-hover/item:bg-brand-green/20 transition-all duration-300">
                <ShieldCheck className="w-4 h-4 shrink-0" />
              </div>
              <span>Secure CBSE database synchronization</span>
            </div>
            <div className="flex items-center gap-3.5 group/item">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-green group-hover/item:bg-brand-green/20 transition-all duration-300">
                <HeartHandshake className="w-4 h-4 shrink-0" />
              </div>
              <span>Nurturing community support system</span>
            </div>
            <div className="flex items-center gap-3.5 group/item">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-green group-hover/item:bg-brand-green/20 transition-all duration-300">
                <Award className="w-4 h-4 shrink-0" />
              </div>
              <span>ISO 9001 certified school parameters</span>
            </div>
          </div>
        </div>

        {/* Legal link footer */}
        <div className="text-[10px] text-slate-500 font-medium z-10">
          © 2026 Green View School. All rights reserved.
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center gap-8 relative">
        
        {/* Mobile Header Link */}
        <div className="flex justify-between items-center lg:hidden">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-150 px-2 py-0.5 rounded">
            {userType === "student" ? "Student Hub" : "Teacher Hub"}
          </span>
        </div>

        {/* Header Block */}
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-brand-green uppercase tracking-[0.25em] mb-1.5">
            {userType === "student" ? "Student Portal" : "Faculty Portal"}
          </span>
          <h1 className="text-2xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Children Form content */}
        <div className="w-full">
          {children}
        </div>

        {/* Bottom Alternative Link */}
        <div className="text-xs text-slate-500 text-center font-medium pt-4 border-t border-slate-100/60">
          {alternativeLink.label}{" "}
          <Link href={alternativeLink.href} className="text-brand-green font-bold hover:underline">
            {alternativeLink.text}
          </Link>
        </div>

      </div>

    </div>
  );
}
