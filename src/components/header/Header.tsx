"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "CONTACT", href: "/contact" },
    { name: "MORE", href: "#more", hasDropdown: true },
  ];

  const navContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
  } as const;

  const navItemVariants = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  } as const;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300 flex flex-col`}
    >
      {/* Top Bar */}
      <div className={`w-full bg-[#0fa958] text-white flex justify-center transition-all duration-300 overflow-hidden ${isScrolled ? "h-0 opacity-0" : "h-7 opacity-100 hidden md:flex"}`}>
        <div className="max-w-7xl w-full px-6 md:px-8 flex justify-between items-center h-full text-[10px] font-bold tracking-wider uppercase">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> info@greenviewschool.edu.in</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> +91 98765 43210</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="#alumni" className="hover:text-emerald-200 transition-colors">Alumni</Link>
            <Link href="#careers" className="hover:text-emerald-200 transition-colors">Careers</Link>
            <Link href="#portal" className="hover:text-emerald-200 transition-colors">Student Portal</Link>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto w-full px-6 md:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-2.5" : "py-4"}`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* GV Logo Image */}
          <div className="w-10 h-10 relative shrink-0">
            <img
              src="/images/logo.png"
              alt="Green View Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#0c3c86] text-base md:text-lg leading-none tracking-tight">
              Green view
            </span>
            <span className="text-[7px] text-[#0c3c86] font-black tracking-widest uppercase mt-1.5 leading-none">
              A Senior Secondary School
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <motion.nav 
          variants={navContainerVariants}
          initial="hidden"
          animate="show"
          className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-slate-700 text-xs tracking-wider"
        >
          {navItems.map((item) => (
            <motion.div key={item.name} variants={navItemVariants} whileHover={{ y: -1 }}>
              <Link
                href={item.href}
                className="flex items-center gap-1 hover:text-[#0c3c86] transition-colors relative group py-1"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="w-3 h-3 text-slate-400" />}
                {/* Subtle underline hover effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0fa958] transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Right Controls: Login & Hamburger */}
        <div className="flex items-center gap-4">
          
          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden lg:block">
            <Link
              href="#login"
              className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-6 py-2 rounded-full font-bold text-xs md:text-sm tracking-wide transition-all shadow-sm block text-center"
            >
              Login
            </Link>
          </motion.div>

          {/* Mobile Hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#0fa958] hover:bg-[#0fa958]/5 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-slate-100 px-6 py-6 bg-white flex flex-col gap-4 overflow-hidden"
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-black text-slate-700 hover:text-[#0fa958] py-2 border-b border-slate-50 transition-colors uppercase tracking-wider block"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
