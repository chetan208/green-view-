"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Bell, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about", hasDropdown: true },
    { name: "ACADEMICS", href: "#academics" },
    { name: "ADMISSIONS", href: "#admission" },
    { name: "FACILITIES", href: "#facilities" },
    { name: "CONTACT", href: "#contact" },
    { name: "MORE", href: "#more", hasDropdown: true },
  ];

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 ${
        isScrolled ? "top-2" : "top-6"
      }`}
    >
      <div
        className="mx-auto bg-white/95 backdrop-blur-md border border-slate-100 shadow-md transition-all duration-300 max-w-7xl rounded-full py-2.5 px-6 md:px-8"
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* GV Circular Logo Icon */}
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="#10b981" strokeWidth="6" />
                <path d="M30 45 L45 65 L70 30" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-800 text-lg md:text-xl leading-none tracking-tight">
                Green view
              </span>
              <span className="text-[7px] text-[#0fa958] font-black tracking-wider uppercase mt-1 leading-none">
                A Senior Secondary School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-extrabold text-slate-600 text-xs tracking-wider">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 hover:text-[#0fa958] transition-colors"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="w-3 h-3 text-slate-400" />}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Bell notification & Login */}
          <div className="flex items-center gap-4">
            
            {/* Notification Bell */}
            <button className="relative w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[7px] font-black text-white">
                1
              </span>
            </button>

            {/* Login Button */}
            <Link
              href="#login"
              className="bg-[#34d399] text-white hover:bg-emerald-600 px-6 py-2 rounded-full font-bold text-xs tracking-wide transition-all shadow-sm"
            >
              Login
            </Link>

            {/* Mobile Hamburger menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-50 px-4 py-6 bg-white flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-black text-slate-700 hover:text-[#0fa958] py-2 border-b border-slate-50 transition-colors uppercase tracking-wider"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
