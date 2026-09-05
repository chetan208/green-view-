"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Mail, Phone, BookOpen, GraduationCap, ClipboardList, Calendar, ArrowUpRight, FlaskConical, User, Settings, LogOut, LayoutDashboard, Headset, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setSearchQuery("");
      setActiveMobileDropdown(null);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

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
    { 
      name: "ABOUT", 
      href: "#about",
      hasDropdown: true,
      dropdownItems: [
        { name: "About School", desc: "School history & vision", href: "/about", icon: BookOpen },
        { name: "Our Teachers", desc: "Meet our dedicated faculty", href: "/teachers", icon: GraduationCap }
      ]
    },
    { 
      name: "ACADEMICS", 
      href: "#academics", 
      hasDropdown: true,
      dropdownItems: [
        { name: "Primary (Nursery–5)", desc: "Foundation years", href: "/academics/primary", icon: GraduationCap },
        { name: "High School (6–10)", desc: "Core curriculum", href: "/academics/high-school", icon: BookOpen },
        { name: "Senior Secondary (11–12)", desc: "Medical & Non-Medical", href: "/academics/senior", icon: FlaskConical },
        { name: "Study Material", desc: "Syllabus & Reference Notes", href: "/academics/study-material", icon: ClipboardList },
        { name: "Academic Calendar", desc: "Important Events & Holidays", href: "/academics/calendar", icon: Calendar }
      ]
    },
    { name: "ADMISSIONS", href: "/admissions" },
    { name: "NOTICES", href: "/notices" },
    { name: "TRANSPORT", href: "/transport" },
    { name: "FACILITIES", href: "/facilities" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CONTACT", href: "/contact", mobileOnly: true }
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

  const [searchQuery, setSearchQuery] = useState("");

  const allSearchableItems = navItems.flatMap(item => {
    const items = [];
    if (!item.hasDropdown) {
      items.push({ name: item.name, href: item.href, desc: "" });
    } else {
      items.push({ name: item.name, href: item.href, desc: "Explore section" });
      if (item.dropdownItems) {
        item.dropdownItems.forEach(sub => {
          items.push({ name: sub.name, href: sub.href, desc: sub.desc || "" });
        });
      }
    }
    return items;
  });

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-brand-green/20 text-emerald-700 rounded-sm px-[2px]">{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredSearchItems = searchQuery.trim() !== "" 
    ? allSearchableItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300 flex flex-col`}
    >
      {/* Top Bar */}
      <div className={`w-full bg-brand-green text-white flex justify-center transition-all duration-300 overflow-hidden ${(isScrolled || pathname?.startsWith('/admin')) ? "h-0 opacity-0" : "h-7 opacity-100 hidden md:flex"}`}>
        <div className="max-w-7xl w-full px-6 md:px-8 flex justify-between items-center h-full text-[10px] font-semibold md:font-bold tracking-wider uppercase">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> info@greenviewschool.edu.in</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> 98165 21168, 01892252115</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/academics/calendar" className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors">
              <Calendar className="w-3.5 h-3.5 opacity-80" /> Calendar
            </Link>
            <Link href="/student-portal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors">
              <User className="w-3.5 h-3.5 opacity-80" /> Student Portal
            </Link>
            <Link href="/contact" className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors">
              <Headset className="w-3.5 h-3.5 opacity-80" /> Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto w-full px-6 md:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-2.5" : "py-4"}`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/*  Logo Image */}
          <div className="w-13 h-13 relative shrink-0">
            <img
              src="/images/logo.png"
              alt="Green View Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-semibold md:font-black text-brand-navy text-lg md:text-xl leading-none tracking-tight">
               Green View
            </span>
            <span className="text-[7px] text-brand-navy font-medium md:font-bold tracking-widest uppercase mt-1.5 leading-none">
              Senior Secondary School
            </span>
          </div>
        </Link>
       

        {/* Desktop Navigation Links */}
        <motion.nav 
          variants={navContainerVariants}
          initial="hidden"
          animate="show"
          className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium md:font-semibold text-slate-700 text-xs tracking-wider"
        >
          {navItems.filter(item => !item.mobileOnly).map((item) => {
            const isItemActive = pathname === item.href || (item.hasDropdown && item.dropdownItems?.some(sub => pathname.startsWith(sub.href)));
            return (
            <motion.div 
              key={item.name} 
              variants={navItemVariants} 
              whileHover={{ y: -1 }}
              className="relative group py-0"
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 transition-colors relative py-1 ${isItemActive ? 'text-brand-green' : 'hover:text-brand-navy'}`}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 group-hover:rotate-180 ${isItemActive ? 'text-brand-green' : 'text-slate-400'}`} />}
                {/* Subtle underline hover/active effect */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-green transition-all duration-300 ${isItemActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>

              {/* Hover Dropdown Menu Card */}
              {item.hasDropdown && item.dropdownItems && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-72 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-[0_10px_45px_-8px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 p-3 flex flex-col gap-1">
                  {item.dropdownItems.map((subItem) => {
                    const Icon = subItem.icon;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fafbfc] transition-all text-left"
                      >
                        <div className="flex items-center gap-3">
                          {Icon && (
                            <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 group-hover/item:bg-brand-green/10 group-hover/item:text-brand-green flex items-center justify-center transition-all shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-[11px] font-semibold md:font-black text-slate-800 group-hover/item:text-brand-green transition-colors leading-normal uppercase tracking-wider">
                              {subItem.name}
                            </span>
                            {subItem.desc && (
                              <span className="text-[9px] text-slate-400 font-semibold md:font-bold mt-1 leading-none normal-case">
                                {subItem.desc}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-brand-green group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )})}
        </motion.nav>

        {/* Right Controls: Login & Hamburger */}
        <div className="flex items-center gap-4">
          
          {/* Desktop User Profile / Login Control */}
          <div className="relative group hidden lg:block">
            {isAuthenticated && user ? (
              <>
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="flex items-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-2 py-1.5 pr-3 rounded-full font-semibold md:font-bold text-xs md:text-sm text-slate-700 tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 text-white flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm">
                    {user.photoUrl ? (
                      <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-bold">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                    )}
                  </div>
                  <span className="max-w-[90px] truncate">{user.name || "User"}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:rotate-180" />
                </motion.button>

                {/* Profile Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden flex flex-col">
                  
                  {/* User Info Header */}
                  <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-slate-800 truncate">{user.name || "User"}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{user.role === 'user' ? (user.accessLevel || 'Staff') : 'Student'}</span>
                  </div>

                  <div className="p-2 flex flex-col gap-1">
                    {/* Super Admin sees both ERP and Admin */}
                    {(user.accessLevel === 'superadmin' || (user.accessLevel as string) === 'super_admin') && (
                      <>
                        <Link href="/erp" className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-green/10 text-slate-600 hover:text-brand-green transition-colors text-left text-xs font-semibold">
                          <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-brand-green transition-colors" /> ERP Portal
                        </Link>
                        <Link href="/admin" className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-green/10 text-slate-600 hover:text-brand-green transition-colors text-left text-xs font-semibold">
                          <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-brand-green transition-colors" /> Admin Portal
                        </Link>
                      </>
                    )}

                    {/* Admin sees only Admin portal */}
                    {user.accessLevel === 'admin' && (
                      <Link href="/admin" className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-green/10 text-slate-600 hover:text-brand-green transition-colors text-left text-xs font-semibold">
                        <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-brand-green transition-colors" /> Admin Portal
                      </Link>
                    )}

                    {/* Student sees My Dashboard */}
                    {user.role === 'student' && (
                      <Link href="/student-portal" className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-green/10 text-slate-600 hover:text-brand-green transition-colors text-left text-xs font-semibold">
                        <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-brand-green transition-colors" /> My Dashboard
                      </Link>
                    )}

                    <Link 
                      href={user.role === 'student' ? "/student-portal" : "/profile-settings"}
                      className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-green/10 text-slate-600 hover:text-brand-green transition-colors text-left text-xs font-semibold"
                    >
                      <Settings className="w-4 h-4 text-slate-400 group-hover:text-brand-green transition-colors" /> Profile Settings
                    </Link>
                  </div>
                  
                  <div className="p-2 border-t border-slate-100">
                    <button onClick={logout} className="group flex items-center w-full gap-3 p-2.5 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors text-left text-xs font-semibold cursor-pointer border-0 bg-transparent">
                      <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
                <Link
                  href="/auth/login"
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-6 py-2.5 rounded-xl font-semibold md:font-bold text-xs md:text-sm tracking-wide transition-all shadow-sm shadow-emerald-500/10 cursor-pointer"
                >
                  Login
                </Link>
            )}
          </div>

          {/* Mobile Hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-brand-green hover:bg-brand-green/5 transition-colors focus:outline-none"
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
            {/* Mobile Search Bar */}
            <div className="relative mb-2">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search website..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
              />
            </div>

            {searchQuery.trim() !== "" ? (
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item, idx) => (
                    <Link
                      key={item.href + idx}
                      href={item.href}
                      onClick={() => { setIsMobileMenuOpen(false); setSearchQuery(""); }}
                      className="flex flex-col p-3 bg-slate-50/80 border border-slate-100 rounded-xl hover:bg-brand-green/10 hover:border-brand-green/30 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-800">{highlightMatch(item.name, searchQuery)}</span>
                      {item.desc && <span className="text-[10px] text-slate-500 font-medium mt-0.5">{highlightMatch(item.desc, searchQuery)}</span>}
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs font-medium text-slate-400">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            ) : (
              <>
                {navItems.map((item, idx) => {
                  const isItemActive = pathname === item.href || (item.hasDropdown && item.dropdownItems?.some(sub => pathname.startsWith(sub.href)));
                  return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                    className="flex flex-col gap-1.5"
                  >
                    {item.hasDropdown && item.dropdownItems ? (
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => setActiveMobileDropdown(activeMobileDropdown === item.name ? null : item.name)}
                          className={`flex items-center justify-between text-xs font-semibold md:font-black ${isItemActive ? 'text-brand-green' : 'text-slate-700'} hover:text-brand-green py-2 border-b border-slate-50 transition-colors uppercase tracking-wider w-full text-left`}
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMobileDropdown === item.name ? 'rotate-180 text-brand-green' : 'text-slate-400'}`} />
                        </button>
                        <AnimatePresence>
                          {activeMobileDropdown === item.name && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 flex flex-col gap-3 border-l border-slate-100 mb-2 mt-1">
                                {item.dropdownItems.map((subItem) => {
                                  const Icon = subItem.icon;
                                  return (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="py-1.5 transition-colors flex items-center gap-2.5"
                                    >
                                      {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                                      <div className="flex-grow flex flex-col">
                                        <span className="text-[10px] font-semibold md:font-extrabold text-slate-500 hover:text-brand-green uppercase tracking-wider block leading-none">
                                          {subItem.name}
                                        </span>
                                        {subItem.desc && (
                                          <span className="text-[8.5px] text-slate-400 font-semibold md:font-bold block mt-1.5 normal-case leading-none">
                                            {subItem.desc}
                                          </span>
                                        )}
                                      </div>
                                      <ArrowUpRight className="w-3 h-3 text-slate-400 shrink-0" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-xs font-semibold md:font-black ${isItemActive ? 'text-brand-green' : 'text-slate-700'} hover:text-brand-green py-2 border-b border-slate-50 transition-colors uppercase tracking-wider block`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                )})}
              </>
            )}
            
            {/* Mobile Login / User Profile Links */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.03, duration: 0.2 }}
              className="flex flex-col gap-2.5 pt-4 mt-2 border-t border-slate-100"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {isAuthenticated ? "My Account" : "Account Sign In"}
              </span>
              
              {isAuthenticated && user ? (
                <div className="flex flex-col gap-2 w-full">
                  {(user.accessLevel === 'superadmin' || (user.accessLevel as string) === 'super_admin') && (
                    <div className="flex gap-2">
                      <Link href="/erp" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 bg-brand-green text-white rounded-xl py-3 px-4 font-semibold text-center text-xs tracking-wide">
                        ERP Portal
                      </Link>
                      <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 bg-brand-green/10 text-brand-green rounded-xl py-3 px-4 font-semibold text-center text-xs tracking-wide">
                        Admin Portal
                      </Link>
                    </div>
                  )}

                  {user.accessLevel === 'admin' && (
                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-brand-green text-white rounded-xl py-3 px-4 font-semibold text-center text-xs tracking-wide">
                      Admin Portal
                    </Link>
                  )}

                  {user.role === 'student' && (
                    <Link href="/student-portal" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-brand-green text-white rounded-xl py-3 px-4 font-semibold text-center text-xs tracking-wide">
                      My Dashboard
                    </Link>
                  )}

                  <div className="flex gap-2">
                    <Link 
                      href={user.role === 'student' ? "/student-portal" : "/profile-settings"} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 px-4 font-semibold text-center text-xs tracking-wide"
                    >
                      Settings
                    </Link>

                    <button 
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                      className="flex-1 bg-rose-50 text-rose-600 rounded-xl py-3 px-4 font-semibold text-center text-xs tracking-wide border-0 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 w-full">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl py-3 px-4 font-semibold text-center text-xs tracking-wide transition-colors"
                  >
                    Login to Portal
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
