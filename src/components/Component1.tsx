"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  Bell 
} from "lucide-react";

// Inline SVG Icons to avoid lucide version discrepancies
const FacebookIcon = () => (
  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 text-white fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-[36px] h-[36px] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const PenToolIcon = () => (
  <svg className="w-[28px] h-[28px] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    <path d="m15 9-6 6" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg className="w-[48px] h-[48px] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const AwardIcon = () => (
  <svg className="w-[30px] h-[30px] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);


/* ==========================================================================
   1. NAVBAR COMPONENT
   ========================================================================== */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setShowNotifications(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <header className="w-full flex justify-center px-4 pt-6 md:pt-8 sticky top-0 z-50">
      {/* Navbar Container */}
      <nav className="w-full max-w-[1100px] h-[68px] bg-white/90 backdrop-blur-md border border-zinc-150 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.15)] rounded-full px-6 flex items-center justify-between transition-all duration-300">
        
        {/* Left: Logo & Title */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-[44px] h-[44px] relative rounded-full overflow-hidden border border-zinc-100 bg-white">
            <Image
              src="/images/logo.png"
              alt="Green View Logo"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-lg md:text-xl text-zinc-900 leading-tight">
              Green view
            </span>
            <span className="font-sans font-bold text-[9.6px] text-[#0B9E50] tracking-[0.1em] uppercase leading-none">
              A Senior Secondary School
            </span>
          </div>
        </a>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 font-sans font-bold text-[11.5px] text-[#374151] tracking-[0.1em] uppercase">
          <a href="#" className="text-[#0B9E50] transition-colors">Home</a>
          
          <div className="relative group cursor-pointer py-2">
            <span className="flex items-center gap-1 hover:text-[#0B9E50] transition-colors">
              About <ChevronDown className="w-3 h-3" />
            </span>
          </div>
          
          <a href="#" className="hover:text-[#0B9E50] transition-colors">Academics</a>
          <a href="#" className="hover:text-[#0B9E50] transition-colors">Admissions</a>
          <a href="#" className="hover:text-[#0B9E50] transition-colors">Facilities</a>
          <a href="#" className="hover:text-[#0B9E50] transition-colors">Contact</a>
          
          <div className="relative group cursor-pointer py-2">
            <span className="flex items-center gap-1 hover:text-[#0B9E50] transition-colors">
              More <ChevronDown className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-[38px] h-[38px] bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition-colors relative"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#0B9E50] border-2 border-white rounded-full flex items-center justify-center text-[9.6px] font-poppins font-extrabold text-white">
                1
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-[307px] bg-white/95 backdrop-blur-md shadow-[0px_20px_60px_-8px_rgba(0,0,0,0.18),0px_0px_0px_1px_rgba(0,0,0,0.06)] rounded-[18px] py-4 border border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center px-4 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-1.5 font-poppins font-bold text-[13px] text-zinc-950">
                    <Bell className="w-4 h-4 text-[#0B9E50]" />
                    <span>Notifications</span>
                  </div>
                  <button className="text-[10.5px] font-sans font-semibold text-[#0B9E50] hover:underline">
                    Mark all read
                  </button>
                </div>
                <div className="px-3 py-4 bg-gradient-to-r from-red-50/50 via-orange-50/50 to-red-50/50 border-l-[3px] border-[#0B9E50] flex gap-3 my-2">
                  <div className="w-[34px] h-[34px] bg-red-100 rounded-[10px] flex items-center justify-center shrink-0">
                    <span className="text-[#0B9E50] font-sans font-bold text-lg">📢</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-poppins font-bold text-[12.3px] text-zinc-900 leading-tight">
                      Admissions Open 2026-27!
                    </span>
                    <span className="font-sans font-normal text-xs text-zinc-600 leading-normal">
                      Admissions open for LKG to Class 9 and Class 11 in Kangra.
                    </span>
                    <a href="#" className="w-fit bg-red-150 px-2.5 py-1 rounded-full font-sans font-bold text-[11px] text-[#0B9E50] hover:bg-red-200 transition-colors mt-1">
                      Apply Now
                    </a>
                  </div>
                </div>
                <div className="px-4 pt-2 border-t border-zinc-100 text-center">
                  <a href="#" className="font-sans font-semibold text-[11.5px] text-[#0B9E50] hover:underline block">
                    View all announcements →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Login Button */}
          <a 
            href="#" 
            className="hidden sm:inline-flex h-[38px] px-6 items-center justify-center bg-gradient-to-r from-[#0B9E50] to-[#36A57E] hover:from-[#098744] hover:to-[#2e936e] text-white font-poppins font-bold text-[12px] tracking-[0.04em] uppercase rounded-full shadow-[0px_8px_20px_0px_rgba(11,158,80,0.25)] transition-all duration-300"
          >
            Login
          </a>

          {/* Mobile Hamburg Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-[38px] h-[38px] bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded-full flex items-center justify-center border border-zinc-150 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-md border border-zinc-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 font-sans font-bold text-[13px] text-zinc-800 uppercase tracking-wider animate-in fade-in slide-in-from-top-5 duration-200 lg:hidden">
          <a href="#" onClick={() => setIsOpen(false)} className="text-[#0B9E50] pb-2 border-b border-zinc-50">Home</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#0B9E50] pb-2 border-b border-zinc-50">About Us</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#0B9E50] pb-2 border-b border-zinc-50">Academics</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#0B9E50] pb-2 border-b border-zinc-50">Admissions</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#0B9E50] pb-2 border-b border-zinc-50">Facilities</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#0B9E50] pb-2 border-b border-zinc-50">Contact</a>
          <a 
            href="#" 
            onClick={() => setIsOpen(false)} 
            className="mt-2 w-full h-11 bg-gradient-to-r from-[#0B9E50] to-[#36A57E] hover:from-[#098744] hover:to-[#2e936e] text-white font-poppins font-bold text-[12px] tracking-[0.04em] uppercase rounded-full flex items-center justify-center shadow-lg shadow-[#0B9E50]/20"
          >
            Login
          </a>
        </div>
      )}
    </header>
  );
}

/* ==========================================================================
   2. HERO COMPONENT
   ========================================================================== */
export function Hero() {
  return (
    <section className="w-full relative px-4 py-12 md:py-20 lg:py-24 max-w-[1240px] mx-auto overflow-visible">
      {/* Background Floating Icons & Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        {/* Large decorative circles */}
        <div className="absolute top-10 right-[-100px] w-[300px] h-[300px] bg-zinc-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[-80px] w-[180px] h-[180px] bg-zinc-200/20 rounded-full blur-2xl"></div>
        
        {/* Floating Figma Icon Badges (low opacity) */}
        <div className="absolute top-24 left-[10%] opacity-[0.12] text-[#0B9E50] animate-bounce duration-1000">
          <BookOpenIcon />
        </div>
        <div className="absolute bottom-[20%] right-[45%] opacity-[0.12] text-[#0B9E50]">
          <PenToolIcon />
        </div>
        <div className="absolute top-[40%] right-[5%] opacity-[0.12] text-[#0B9E50]">
          <GraduationCapIcon />
        </div>
        <div className="absolute bottom-[5%] left-[5%] opacity-[0.12] text-[#0B9E50]">
          <AwardIcon />
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          
          {/* Tagline */}
          <div>
            <span className="font-sans font-bold text-[10px] md:text-xs text-[#0B9E50] tracking-[0.4em] uppercase">
              Inspiring Excellence Since 2001
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-poppins font-extrabold text-[44px] md:text-5xl lg:text-[72px] text-zinc-900 leading-[1.1] tracking-tight">
            <span className="text-[#0B9E50]">Green view</span> <br className="hidden sm:inline" />
            Sr. Sec. School
          </h1>

          {/* Subtitle */}
          <p className="font-sans font-normal text-sm md:text-base text-[#4B5563] max-w-xl leading-relaxed md:leading-[1.8]">
            A trusted private senior secondary school focused on academic excellence, discipline, values and modern parent communication. Located in the serene region of Kangra, HP.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a 
              href="#" 
              className="inline-flex h-[52px] px-8 items-center justify-center gap-2 bg-[#0B9E50] hover:bg-[#098744] text-white font-sans font-semibold text-[14px] rounded-full shadow-[0px_8px_20px_0px_rgba(11,158,80,0.25)] transition-all duration-300 group"
            >
              Admission Enquiry
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#" 
              className="inline-flex h-[52px] px-8 items-center justify-center bg-white hover:bg-zinc-50 text-[#111827] font-sans font-semibold text-[14px] border border-zinc-200 rounded-full shadow-sm transition-colors"
            >
              About Us
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 mt-4 flex-wrap sm:flex-nowrap">
            {/* Avatars */}
            <div className="flex items-center -space-x-2.5">
              <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-amber-500 to-red-500 border-2 border-white flex items-center justify-center text-[11.2px] font-poppins font-bold text-white shadow-md">
                A
              </div>
              <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 border-2 border-white flex items-center justify-center text-[11.2px] font-poppins font-bold text-white shadow-md">
                R
              </div>
              <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 border-2 border-white flex items-center justify-center text-[11.2px] font-poppins font-bold text-white shadow-md">
                P
              </div>
              <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-violet-500 to-purple-700 border-2 border-white flex items-center justify-center text-[11.2px] font-poppins font-bold text-white shadow-md">
                N
              </div>
              <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-emerald-600 to-[#026135] border-2 border-white flex items-center justify-center text-[10px] font-poppins font-bold text-white shadow-md">
                +5k
              </div>
            </div>

            {/* Rating Stars & Details */}
            <div className="flex flex-col gap-0.5 justify-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
                <span className="font-poppins font-bold text-[13px] text-zinc-900 ml-1.5">
                  4.9
                </span>
              </div>
              <span className="font-sans font-normal text-[11px] md:text-[12px] text-[#4B5563]">
                Trusted by <strong className="font-bold text-zinc-900">5,000+ families</strong> across HP since 2001
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual School Image with Overlay Badges */}
        <div className="lg:col-span-6 flex justify-center relative overflow-visible mt-6 lg:mt-0">
          <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-[29px] md:rounded-[55px] border-[5px] md:border-[9px] border-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
            <Image
              src="/images/hero.png"
              alt="Green View School Building"
              fill
              className="object-cover hover:scale-102 transition-transform duration-700 ease-out"
              priority
            />
          </div>

          {/* Overlay Badge 1: Admissions Open Now */}
          <div className="absolute bottom-[-20px] left-[-10px] md:bottom-[-24px] md:left-[-20px] z-20 w-[95px] h-[95px] md:w-[120px] md:h-[120px] bg-[#0B9E50] rounded-full border-4 border-white flex flex-col justify-center items-center text-center text-white shadow-[0px_12px_32px_0px_rgba(11,158,80,0.25)] scale-90 sm:scale-100 animate-pulse duration-[3000ms]">
            <span className="font-poppins font-bold text-[11px] md:text-[13px] tracking-wide uppercase leading-tight">
              2026-27
            </span>
            <span className="font-poppins font-bold text-[8px] md:text-[10px] tracking-wider uppercase leading-snug mt-1">
              Admissions<br />Open Now
            </span>
          </div>

          {/* Overlay Card 2: Board Results */}
          <div className="absolute bottom-[20px] right-[-10px] md:bottom-[40px] md:right-[-20px] z-20 bg-white shadow-[0px_24px_56px_-20px_rgba(67,104,80,0.6)] rounded-[18px] p-3.5 md:p-5 flex flex-col gap-1 w-[150px] md:w-[207px] scale-90 sm:scale-100 hover:-translate-y-1 transition-transform duration-300">
            <span className="font-sans font-medium text-[9px] md:text-[11px] text-[#64748B] leading-none">
              Board Results 2024-25
            </span>
            <span className="font-poppins font-extrabold text-lg md:text-[22px] text-[#026135] leading-none mt-1">
              94.2% avg
            </span>
            <span className="font-sans font-normal text-[9px] md:text-[11px] text-[#64748B] leading-none">
              Class X & XII
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ==========================================================================
   3. FEATURE SCROLL COMPONENT
   ========================================================================== */
export function FeatureScroll() {
  const features = [
    {
      name: "Smart Classrooms",
      image: "/images/classroom.png",
    },
    {
      name: "Holistic Education",
      image: "/images/about.png",
    },
    {
      name: "STEM & Robotics",
      image: "/images/robotics.png",
    },
    {
      name: "World-Class Library",
      image: "/images/library.png",
    },
    {
      name: "Collaborative Spaces",
      image: "/images/study.png",
    },
  ];

  return (
    <section className="w-full bg-white py-8 overflow-hidden">
      {/* Horizontal marquee container with scroll support on mobile */}
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex-none snap-start w-[210px] h-[63px] bg-[#F9FAFB] border border-zinc-200 rounded-[30px] p-[5px] pr-4 flex items-center gap-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:border-[#0B9E50] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden border border-white shrink-0">
                <Image
                  src={feature.image}
                  alt={feature.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Feature Title */}
              <span className="font-poppins font-bold text-[12px] md:text-[13px] text-zinc-800 leading-tight">
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   4. CTA SECTION COMPONENT
   ========================================================================== */
export function CTA() {
  return (
    <section className="w-full relative py-16 md:py-24 bg-gradient-to-br from-[#111827] to-[#14231E] overflow-hidden text-center flex flex-col items-center justify-center px-4">
      {/* Low-opacity Background School Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 select-none pointer-events-none">
        <Image
          src="/images/classroom.png"
          alt="Classroom background overlay"
          fill
          className="object-cover filter grayscale"
        />
        {/* Dark overlay grid */}
        <div className="absolute inset-0 bg-[#111827]/85"></div>
      </div>

      {/* Content Area */}
      <div className="max-w-[650px] mx-auto relative z-10 flex flex-col items-center gap-5">
        {/* Tagline */}
        <span className="font-sans font-semibold text-xs md:text-[13.6px] text-white/60 tracking-[0.25em] uppercase">
          Work Together
        </span>
        
        {/* Title */}
        <h2 className="font-poppins font-semibold text-4xl md:text-5xl lg:text-[48px] text-white leading-[1.1] tracking-tight">
          Let&apos;s Secure Your <br className="sm:hidden" />
          <span className="text-[#50F49D]">Child&apos;s Future</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans font-normal text-sm md:text-[16px] text-white/70 leading-relaxed md:leading-[1.7] max-w-xl">
          Join the Green view family and give your child the gift of world-class education with values that last a lifetime.
        </p>

        {/* Action Button */}
        <a 
          href="#" 
          className="inline-flex h-[50.8px] px-9 items-center justify-center gap-2 bg-[#0B9E50] hover:bg-[#098744] text-white font-sans font-semibold text-[14px] rounded-full shadow-[0px_8px_20px_0px_rgba(11,158,80,0.3)] transition-all duration-300 group mt-3"
        >
          Apply Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. FOOTER COMPONENT
   ========================================================================== */
export function Footer() {
  return (
    <footer className="w-full bg-[#10251A] text-white pt-16 pb-8 px-4 md:px-8 border-t border-emerald-950">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Logo & Brief */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-[48px] h-[48px] relative rounded-full overflow-hidden bg-white border-2 border-white">
                <Image
                  src="/images/logo.png"
                  alt="Green View Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-extrabold text-[16px] text-white leading-tight uppercase tracking-wider">
                  Green View
                </span>
                <span className="font-sans font-bold text-[11px] text-emerald-300 tracking-[0.14em] uppercase leading-none">
                  Sr. Sec. School
                </span>
              </div>
            </a>
            <p className="font-sans font-normal text-xs md:text-sm text-zinc-300/80 leading-relaxed max-w-sm">
              Quality education, discipline and values for every student. Located near the helipad in Dadh, HP.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="font-sans font-extrabold text-[13px] md:text-sm uppercase tracking-wider text-emerald-300">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 font-sans font-normal text-xs md:text-sm text-zinc-300 hover:text-white">
              <a href="#" className="hover:text-emerald-400 transition-colors">About Us</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Facilities</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Admissions</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Gallery</a>
            </div>
          </div>

          {/* Col 3: Important info */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="font-sans font-extrabold text-[13px] md:text-sm uppercase tracking-wider text-emerald-300">
              Important
            </h4>
            <div className="flex flex-col gap-2 font-sans font-normal text-xs md:text-sm text-zinc-300 hover:text-white">
              <a href="#" className="hover:text-emerald-400 transition-colors">Official Notices</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Academic Calendar</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Student Login</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Contact Office</a>
            </div>
          </div>

          {/* Col 4: Contact details */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-sans font-extrabold text-[13px] md:text-sm uppercase tracking-wider text-emerald-300">
              Contact
            </h4>
            <div className="flex flex-col gap-2 font-sans font-normal text-xs md:text-sm text-zinc-300">
              <p className="font-semibold text-white">Green View Sr. Sec. School</p>
              <p>Plot 18, near Helipad, Dadh, Tambar,</p>
              <p>Kangra, HP - 176052</p>
              <p className="mt-1 text-emerald-400">+91 99XXXXXX80</p>
            </div>
          </div>

        </div>

        {/* Footer Bottom area */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-emerald-950/60">
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              aria-label="YouTube"
            >
              <YoutubeIcon />
            </a>
          </div>

          {/* Copyright Line */}
          <span className="font-sans font-normal text-[11px] md:text-xs text-zinc-400 text-center md:text-right">
            © 2026 Green View Senior Secondary School. All rights reserved.
          </span>

        </div>

      </div>
    </footer>
  );
}


/* ==========================================================================
   6. ABOUT US COMPONENT
   ========================================================================== */
export function AboutUs() {
  return (
    <section className="w-full bg-[#fcfcfc] py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content (Image & Badge) */}
        <div className="relative w-full max-w-[555px] mx-auto lg:mx-0">
          <div className="relative aspect-[4/3.8] rounded-[26px] overflow-hidden shadow-sm">
            <Image
              src="/images/study.png"
              alt="Students in classroom"
              fill
              className="object-cover"
            />
            {/* View More Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-lg font-sans font-semibold text-sm cursor-pointer hover:bg-white/30 transition-colors border border-white/30 whitespace-nowrap">
              View More
            </div>
          </div>
          {/* Floating Card */}
          <div className="absolute -bottom-8 -left-4 md:-left-8 bg-white/95 backdrop-blur shadow-lg rounded-xl p-3 md:p-4 border border-zinc-100 flex flex-col items-center">
            <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Established</span>
            <span className="font-poppins font-extrabold text-[#0B9E50] text-sm md:text-lg">2001 • Kangra</span>
          </div>
        </div>

        {/* Right Content (Text) */}
        <div className="flex flex-col gap-6 text-left max-w-[615px]">
          <div>
            <span className="font-sans font-bold text-xs text-[#898989] uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="font-poppins font-extrabold text-[38px] md:text-[44px] text-zinc-900 leading-[1.2] tracking-tight mt-2">
              Welcome to <span className="text-[#0B9E50]">Green View</span> <br className="hidden sm:block" />
              Sr. Sec School
            </h2>
          </div>
          
          <p className="font-sans text-[#4B5563] text-[15px] leading-relaxed">
            Green View Senior Secondary School was established in 2001 with a vision to provide quality education in a nurturing environment. Affiliated with HPBOSE, the school has grown into a trusted institution for students from Nursery to XII. With experienced faculty, well-equipped labs, sports facilities, and a strong focus on academics and values, Green View has been shaping confident and responsible learners for over 25 years.
          </p>

          {/* Blockquote */}
          <div className="bg-gradient-to-br from-[#fcfcfc] to-white shadow-[0px_10px_30px_-20px_rgba(17,24,39,0.2)] border border-zinc-200/60 rounded-2xl p-6 md:p-8 relative mt-2 flex gap-4 items-start">
            <span className="text-[#0B9E50]/50 text-4xl leading-none font-serif pt-1 shrink-0">"</span>
            <div className="flex flex-col gap-3">
              <p className="font-serif italic text-zinc-800 text-[18px] leading-relaxed">
                Green view didn't just teach you how to study — it taught you how to think, how to lead, and how to stay grounded.
              </p>
              <p className="font-sans text-[13px] text-zinc-500 font-medium">Chetan kumar · Head Boy, 2025–26</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-0 bg-gradient-to-b from-white to-[#FBFAF7] shadow-[0px_18px_40px_-28px_rgba(17,24,39,0.25)] rounded-2xl border border-zinc-200/50 py-4 px-6 mt-4 divide-x divide-zinc-200/60 items-center justify-between">
            <div className="flex flex-col items-center justify-center flex-1 px-2">
              <span className="font-poppins font-extrabold text-[28px] text-zinc-900">25+</span>
              <span className="font-sans text-[13px] text-zinc-500 mt-1 text-center font-medium">Years in education</span>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 px-2">
              <span className="font-poppins font-extrabold text-[28px] text-zinc-900">68</span>
              <span className="font-sans text-[13px] text-zinc-500 mt-1 text-center font-medium">Qualified teachers</span>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 px-2">
              <span className="font-poppins font-extrabold text-[28px] text-zinc-900">1:25</span>
              <span className="font-sans text-[13px] text-zinc-500 mt-1 text-center font-medium">Average class ratio</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="inline-flex h-[44px] px-6 items-center justify-center bg-[#0B9E50] hover:bg-[#098744] text-white font-sans font-semibold text-[13px] rounded-full shadow-[0px_8px_20px_0px_rgba(11,158,80,0.25)] transition-all duration-300">
              Talk to Admissions
            </a>
            <a href="#" className="inline-flex h-[44px] px-6 items-center justify-center bg-white hover:bg-zinc-50 text-zinc-900 font-sans font-semibold text-[13px] border border-zinc-200 rounded-full shadow-sm transition-colors">
              See Academics
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. NOTICE BOARD COMPONENT
   ========================================================================== */
export function NoticeBoard() {
  const notices = [
    { month: "JUL", day: "15", text: "Early Bird Registrations End", isNew: true },
    { month: "JUL", day: "20", text: "First Semester Exams Begin", isNew: false },
    { month: "AUG", day: "05", text: "Annual Sports Meet 2026", isNew: false },
    { month: "AUG", day: "15", text: "Independence Day Celebrations", isNew: false },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-16 md:py-24 px-4 overflow-hidden border-t border-zinc-100">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Notice Board Title */}
        <div className="flex-shrink-0 flex flex-col text-left max-w-[400px]">
          <h2 className="font-serif font-bold text-5xl md:text-[64px] text-zinc-900 uppercase leading-[1.1] tracking-wide">
            Official <br/>
            <span className="text-[#0B9E50]">Board</span> <br/>
            Notices
          </h2>
        </div>

        {/* Right Side: Notices List */}
        <div className="flex-1 w-full max-w-[800px] flex flex-col gap-4 relative">
          {/* Top glowing accent for depth (Optional, per design vibe) */}
          <div className="absolute -top-10 -left-10 w-[200px] h-[200px] bg-[#0B9E50]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col gap-3 relative z-10">
            {notices.map((notice, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 md:gap-6 px-6 py-4 rounded-[10px] bg-white shadow-sm border border-zinc-100 hover:shadow-md hover:border-zinc-200 transition-all group cursor-pointer"
              >
                <div className="bg-[#0B9E50]/10 text-[#0B9E50] flex flex-col items-center justify-center rounded-[8px] w-[55px] h-[55px] shrink-0">
                  <span className="font-sans font-bold text-[11px] leading-none mb-1">{notice.month}</span>
                  <span className="font-poppins font-bold text-[20px] leading-none">{notice.day}</span>
                </div>
                <p className="font-poppins font-medium text-[15px] text-zinc-800 flex-1 group-hover:text-[#0B9E50] transition-colors">
                  {notice.text}
                </p>
                {notice.isNew && (
                  <span className="hidden sm:block bg-red-100 text-red-600 font-sans font-bold text-[10px] uppercase px-2 py-1 rounded">
                    New
                  </span>
                )}
                <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#0B9E50] group-hover:text-white transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-start mt-4 z-10 pl-2">
            <a href="#" className="inline-flex h-[44px] px-6 items-center justify-center bg-[#0B9E50] hover:bg-[#098744] text-white font-sans font-semibold text-[13px] rounded-full shadow-[0px_8px_20px_0px_rgba(11,158,80,0.25)] transition-all duration-300">
              View All Notices
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
