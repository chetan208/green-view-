"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 2.8 11 3 11c1 .2 2 .1 3-.1-4-2.8-4-8-4-8 1.3 1.1 2.8 1.8 4.4 2C4.2 1.4 10-2.3 13 2.1c1.5-.3 3-.9 4.3-1.6-1.1 1.7-2.6 3-4.1 3.9 1.4-.4 2.8-1 4.2-1.7Z"/></svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 7.1C2 8.7 1.8 10.3 1.8 12s.2 3.3.7 4.9c.5 1.5 1.5 2.5 3 2.8 2.1.4 5.3.6 6.5.6s4.4-.2 6.5-.6c1.5-.3 2.5-1.3 3-2.8.5-1.6.7-3.2.7-4.9s-.2-3.3-.7-4.9c-.5-1.5-1.5-2.5-3-2.8-2.1-.4-5.3-.6-6.5-.6s-4.4.2-6.5.6c-1.5.3-2.5 1.3-3 2.8z"/><path d="m9.8 15.5 6-3.5-6-3.5z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function ContactDetails() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-8"
    >
      <h2 className="text-2xl font-semibold md:font-bold text-[#1f2937]" style={{ fontFamily: "Georgia, serif" }}>
        Get in Touch
      </h2>
      
      <div className="flex flex-col gap-6">
        {/* Address */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className="font-semibold md:font-bold text-slate-800 text-sm md:text-base">Address</h3>
            <p className="text-slate-500 text-sm mt-0.5">Knowledge Park, Education Lane, New Delhi - 110001</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className="font-semibold md:font-bold text-slate-800 text-sm md:text-base">Phone</h3>
            <p className="text-slate-500 text-sm mt-0.5">+91 11 2345 6789</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className="font-semibold md:font-bold text-slate-800 text-sm md:text-base">Email</h3>
            <p className="text-slate-500 text-sm mt-0.5">info@greenview.edu.in</p>
          </div>
        </div>

        {/* School Timings */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-[#147a42]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className="font-semibold md:font-bold text-slate-800 text-sm md:text-base">School Timings</h3>
            <p className="text-slate-500 text-sm mt-0.5">Monday - Saturday: 8:00 AM - 2:30 PM</p>
          </div>
        </div>
      </div>

      {/* Follow Us */}
      <div className="bg-[#f8fafc] rounded-2xl p-6 mt-4">
        <h3 className="font-semibold md:font-bold text-slate-800 text-sm mb-4">Follow Us</h3>
        <div className="flex gap-3">
          <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
            <TwitterIcon className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
            <YoutubeIcon className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:text-[#147a42] hover:shadow-sm transition-all border border-slate-100">
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
