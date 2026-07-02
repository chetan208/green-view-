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

  const inputStyles = "w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-[#0fa958]/10 transition-all outline-none text-[13px] font-medium placeholder:text-slate-400 text-slate-800";

  return (
    <section className="w-full py-12 lg:py-20 px-4 md:px-8 bg-[#f8f9fa] flex justify-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-brand-green/10 text-brand-green mb-4 md:mb-6">
            <MessageSquareText className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-3 md:mb-4">
            Have Questions Before Applying?
          </h2>
          <p className="text-[12px] md:text-sm text-slate-500 font-medium leading-relaxed max-w-lg mb-6 md:mb-8">
            Choosing the right school is a big decision. If you have any doubts regarding the curriculum, fee structure, or admission process, our counselors are here to help. Drop us a message!
          </p>
          
          <div className="flex flex-col gap-4 text-sm font-semibold text-slate-700 w-full max-w-md bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 border-b border-slate-100 pb-3">
              <span className="text-slate-400">Admission Helpdesk</span>
              <span className="text-slate-800">+91 98765 43210</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 border-b border-slate-100 pb-3">
              <span className="text-slate-400">Email Address</span>
              <span className="text-slate-800 break-all">admissions@greenview.edu.in</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
              <span className="text-slate-400">Counseling Hours</span>
              <span className="text-slate-800">09:00 AM - 04:00 PM</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-[1.2] w-full max-w-[500px]">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Enquiry</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">We usually respond within 24 hours.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Parent's Name</label>
                    <input required type="text" className={inputStyles} placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
                    <input required type="tel" className={inputStyles} placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Child's Class</label>
                    <select required className={inputStyles}>
                      <option value="">Select Class</option>
                      <option value="Pre-Primary">Nursery - UKG</option>
                      <option value="Primary">Class I - V</option>
                      <option value="Middle">Class VI - VIII</option>
                      <option value="Secondary">Class IX - X</option>
                      <option value="Senior Secondary">Class XI - XII</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Email (Optional)</label>
                    <input type="email" className={inputStyles} placeholder="john@example.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Your Message</label>
                  <textarea required rows={3} className={`${inputStyles} py-3 h-auto resize-none`} placeholder="I would like to know about..." />
                </div>

                <button type="submit" className="mt-2 w-full h-11 rounded-xl bg-brand-green hover:bg-[#0d924c] text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md shadow-brand-green/20">
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
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
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
