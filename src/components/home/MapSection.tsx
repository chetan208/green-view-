"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function MapSection() {
  const leftContainerVariants = {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  } as const;

  return (
    <section id="contact" className="w-full py-12 md:py-16 px-4 md:px-6 bg-white flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl bg-gradient-to-r from-[#e6f4ea] via-[#c2f0db] to-[#15803d]/90 border border-[#0fa958]/20 rounded-[32px] overflow-hidden shadow-sm p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch"
      >
        
        {/* Left Side: Contact Info Details */}
        <motion.div 
          variants={leftContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-1 flex flex-col justify-between"
        >
          <div>
            {/* Subtitle */}
            <motion.span 
              variants={itemVariants} 
              className="text-[10px] md:text-xs font-bold text-[#0fa958] uppercase tracking-[0.25em] mb-3 block select-none"
            >
              Visit & Contact
            </motion.span>

            {/* Main Title */}
            <motion.h2 
              variants={itemVariants} 
              className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8"
            >
              We’d love to meet you <br />
              at campus
            </motion.h2>

            {/* Contact Items */}
            <div className="flex flex-col gap-6">
              
              {/* Address */}
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#0fa958] mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-sm md:text-base leading-tight">
                    Green View Senior Secondary School
                  </span>
                  <span className="text-slate-600 text-xs md:text-sm font-semibold mt-1 leading-relaxed max-w-sm">
                    Plot 18, Tonk Road, Near Muhana Mandi Road, Sanganer, Jaipur – 302029, Rajasthan
                  </span>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#0fa958] mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-sm md:text-base leading-tight">
                    +91 9XXXX 12450 / 0141-272 0450
                  </span>
                  <span className="text-slate-600 text-xs md:text-sm font-semibold mt-1 select-none">
                    Office: Mon–Sat, 8:00 AM – 2:30 PM
                  </span>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#0fa958] mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-sm md:text-base leading-tight">
                    admissions@greenviewschool.in
                  </span>
                  <span className="text-slate-600 text-xs md:text-sm font-semibold mt-1 select-none">
                    We reply within one working day
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Bottom Action CTA Buttons */}
          <motion.div variants={itemVariants} className="flex items-center gap-3.5 mt-8 lg:mt-4">
            <motion.a 
              href="https://wa.me/919999999999"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-[#0fa958] text-white hover:bg-emerald-700 px-6 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              {/* WhatsApp Icon SVG */}
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.382 9.86-9.764.001-2.607-1.012-5.059-2.852-6.903C16.638 2.093 14.18 1.08 11.579 1.08c-5.437 0-9.857 4.382-9.86 9.765-.001 1.83.488 3.618 1.417 5.176L2.127 21.3l5.52-1.449.001-.001-.001.001-.001.001zm10.29-6.495c-.272-.136-1.61-.795-1.86-.886-.25-.091-.432-.136-.613.136-.182.273-.703.886-.862 1.068-.159.182-.318.205-.59.069-.272-.136-1.15-.424-2.19-1.353-.809-.722-1.355-1.614-1.514-1.886-.159-.273-.017-.42.12-.556.122-.122.272-.318.408-.477.136-.159.182-.273.272-.455.091-.181.046-.34-.023-.477-.069-.136-.613-1.477-.84-2.023-.222-.534-.486-.46-.666-.46-.173-.001-.371-.002-.57-.002-.198 0-.522.074-.795.371-.272.296-1.042 1.016-1.042 2.477 0 1.46 1.065 2.872 1.213 3.074.149.202 2.099 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.61-.659 1.838-1.296.227-.637.227-1.183.159-1.296-.068-.113-.25-.204-.523-.34z" />
              </svg>
              <span>WhatsApp</span>
              <span className="text-xs font-bold leading-none">→</span>
            </motion.a>
            <motion.a 
              href="tel:+919999912450"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white text-slate-800 hover:bg-slate-50 px-6 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all shadow-sm text-center"
            >
              Call Now
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side: Visual Map Frame */}
        <div className="flex-1 w-full flex flex-col justify-between gap-3">
          
          {/* Map Image container */}
          <motion.div 
            initial={{ scale: 0.97, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full h-72 rounded-[24px] overflow-hidden border border-slate-100 shadow-md relative bg-slate-50"
          >
            <iframe
              src="https://maps.google.com/maps?q=Green%20View%20Public%20School,%20Dadh,%20Himachal%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />

            {/* Overlay White Card FIND US */}
            <div className="absolute bottom-4 left-4 z-20 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 max-w-[190px] flex flex-col select-none">
              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Find Us
              </span>
              <span className="text-xs md:text-sm font-black text-slate-800 mt-1.5 leading-none">
                Kangra, HP
              </span>
              <span className="text-[10px] text-slate-500 font-semibold mt-1 leading-tight">
                near halipad, Dadh, Tambar
              </span>
              <a 
                href="https://maps.google.com/?q=Green+View+Public+School+Dadh+Himachal+Pradesh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-black text-[#0fa958] underline mt-2 block hover:text-emerald-700 leading-none"
              >
                Open in Google Maps →
              </a>
            </div>

            {/* Overlay Translucent tag: Map preview */}
            <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm border border-slate-200/50 py-1 px-3 rounded-full text-[9px] font-bold text-slate-400 select-none">
              Map preview
            </div>
          </motion.div>

          {/* Muted school bus coverage text */}
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[10px] md:text-xs font-bold text-[#052e16] tracking-tight leading-tight text-left select-none max-w-md pl-1 mt-2 block"
          >
            School buses cover: Sanganer, Pratap Nagar, Jagatpura, Malviya Nagar, Mansarovar Ext., Sitapura.
          </motion.span>

        </div>

      </motion.div>
    </section>
  );
}
