"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MessageSquareText } from "lucide-react";

export default function AdmissionEnquiry() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="w-full py-20 px-6 bg-slate-50 border-t border-slate-100 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0fa958]/10 text-[#0fa958] mb-6">
            <MessageSquareText className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Have Questions Before Applying?
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-lg mb-8">
            Choosing the right school is a big decision. If you have any doubts regarding the curriculum, fee structure, or admission process, our counselors are here to help. Drop us a message!
          </p>
          
          <div className="flex flex-col gap-4 text-sm font-semibold text-slate-700 w-full max-w-md bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-slate-400">Admission Helpdesk</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-slate-400">Email Address</span>
              <span>admissions@greenview.edu.in</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Counseling Hours</span>
              <span>09:00 AM - 04:00 PM</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-[1.2] w-full max-w-xl">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Quick Enquiry Form</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Parent's Name</label>
                    <input required type="text" className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 transition-all outline-none text-sm font-medium" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
                    <input required type="tel" className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 transition-all outline-none text-sm font-medium" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Child's Current Class</label>
                    <select required className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 transition-all outline-none text-sm font-medium bg-white">
                      <option value="">Select Class</option>
                      <option value="Pre-Primary">Pre-Primary (Nursery/KG)</option>
                      <option value="Primary">Primary (I - V)</option>
                      <option value="Middle">Middle (VI - VIII)</option>
                      <option value="Secondary">Secondary (IX - X)</option>
                      <option value="Senior Secondary">Senior Secondary (XI - XII)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email (Optional)</label>
                    <input type="email" className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 transition-all outline-none text-sm font-medium" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Message</label>
                  <textarea required rows={4} className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#0fa958] focus:ring-2 focus:ring-[#0fa958]/20 transition-all outline-none text-sm font-medium resize-none" placeholder="I would like to know about..." />
                </div>

                <button type="submit" className="mt-2 w-full h-12 rounded-xl bg-slate-900 hover:bg-[#0fa958] text-white font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 hover:shadow-[#0fa958]/20">
                  <span>Submit Enquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-4"
              >
                <div className="w-16 h-16 bg-[#0fa958]/10 rounded-full flex items-center justify-center text-[#0fa958]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Enquiry Submitted!</h3>
                <p className="text-slate-500 font-medium max-w-sm">
                  Thank you for reaching out. Our admissions counselor will get back to you within 24 working hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Ask Another Question
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
