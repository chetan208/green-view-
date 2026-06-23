"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf, ArrowRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Events", href: "#events" },
    { name: "Facilities", href: "#facilities" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full fixed top-4 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-emerald-100 rounded-full shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-3.5 md:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-50 p-2 rounded-full group-hover:bg-emerald-100 transition-colors">
              <Leaf className="w-5 h-5 text-emerald-600 fill-emerald-600/10" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-emerald-800 text-lg md:text-xl leading-none tracking-tight">
                Green view
              </span>
              <span className="text-[10px] text-emerald-600 font-bold tracking-widest uppercase mt-0.5">
                Sr. Sec. School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link
              href="#admission"
              className="hidden md:flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-emerald-50 px-6 py-6 bg-white rounded-b-3xl flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#admission"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 mt-2"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
