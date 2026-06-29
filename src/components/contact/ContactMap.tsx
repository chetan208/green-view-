"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactMap() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full bg-white p-3 md:p-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100"
    >
      <div className="w-full h-[350px] md:h-[450px] rounded-[1.5rem] overflow-hidden relative bg-slate-50">
        <iframe 
          src="https://maps.google.com/maps?q=Green%20View%20Public%20School,%20Malan,%20Himachal%20Pradesh&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 absolute inset-0 filter contrast-[1.02]"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </motion.div>
  );
}
