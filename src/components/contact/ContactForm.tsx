"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#f8fafc] rounded-[2rem] p-8 md:p-10 w-full"
    >
      <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-slate-800 mb-8">
        Send us a Message
      </h2>
      
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-semibold md:font-bold text-slate-600">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Your name" 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold md:font-bold text-slate-600">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Your email" 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-xs font-semibold md:font-bold text-slate-600">Subject</label>
          <input 
            type="text" 
            id="subject" 
            placeholder="Subject" 
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-xs font-semibold md:font-bold text-slate-600">Message</label>
          <textarea 
            id="message" 
            placeholder="Your message" 
            rows={5}
            className="w-full p-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#147a42]/20 focus:border-[#147a42] transition-all resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full h-14 bg-[#0a5c32] hover:bg-[#084b28] text-white font-semibold md:font-bold rounded-xl mt-2 transition-colors shadow-md shadow-emerald-900/10"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
}
