"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin 
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-16 flex flex-col gap-10">
        
        {/* Top Header Section */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-slate-500">
            <Link href="/" className="text-[#0fa958] hover:underline">Home</Link> / <span>Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] tracking-tight mt-1" style={{ fontFamily: "Georgia, serif" }}>
            Contact <span className="text-[#147a42]">Us</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-2">
            We&apos;d love to hear from you. Reach out to us for any queries.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-4">
          
          {/* Left Column (Get in Touch) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-2xl font-bold text-[#1f2937]" style={{ fontFamily: "Georgia, serif" }}>
              Get in Touch
            </h2>
            
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">Address</h3>
                  <p className="text-slate-500 text-sm mt-0.5">Knowledge Park, Education Lane, New Delhi - 110001</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">Phone</h3>
                  <p className="text-slate-500 text-sm mt-0.5">+91 11 2345 6789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">Email</h3>
                  <p className="text-slate-500 text-sm mt-0.5">info@greenview.edu.in</p>
                </div>
              </div>

              {/* School Timings */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">School Timings</h3>
                  <p className="text-slate-500 text-sm mt-0.5">Monday - Saturday: 8:00 AM - 2:30 PM</p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="bg-[#f8fafc] rounded-2xl p-6 mt-4">
              <h3 className="font-bold text-slate-800 text-sm mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
                  <Facebook className="w-4 h-4" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
                  <Instagram className="w-4 h-4" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
                  <Twitter className="w-4 h-4" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
                  <Youtube className="w-4 h-4" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
                  <Linkedin className="w-4 h-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#f8fafc] rounded-[2rem] p-8 md:p-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8">
              Send us a Message
            </h2>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-600">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your name" 
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-600">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Your email" 
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold text-slate-600">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="Subject" 
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-600">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Your message" 
                  rows={5}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full h-14 bg-[#0a5c32] hover:bg-[#084b28] text-white font-bold rounded-xl mt-2 transition-colors shadow-md shadow-emerald-900/10"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
