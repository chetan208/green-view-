"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdmissionSection() {
  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    parentName: "",
    grade: "",
    email: "",
    dob: "",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        studentName: "",
        phone: "",
        parentName: "",
        grade: "",
        email: "",
        dob: "",
        message: "",
        consent: false,
      });
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const leftContainerVariants = {
    hidden: { opacity: 0, x: -35 },
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

  const rightContainerVariants = {
    hidden: { opacity: 0, x: 35 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  } as const;

  return (
    <section id="admission" className="w-full py-8 md:py-10 px-4 md:px-6 bg-white flex justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl bg-white border border-[#0fa958] rounded-[28px] overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch"
      >
        
        {/* Left Side: Information Card (Green Background) */}
        <motion.div 
          variants={leftContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-1 bg-[#0fa958] p-6 md:p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden select-none"
        >
          {/* Subtle light background circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl -z-10" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-xl -z-10" />

          <div>
            {/* Top Pill Badge */}
            <motion.div variants={itemVariants} className="inline-block bg-[#0c8e4a] px-5 py-1.5 rounded-full mb-5">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-100 block leading-none">
                Admission Open
              </span>
            </motion.div>
            
            {/* Heading */}
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-none mb-4">
              Admissions Open <br />
              <span className="text-yellow-400 mt-1 block">for 2026–27</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-emerald-50 text-xs md:text-sm mb-6 max-w-md leading-relaxed">
              Start your child's journey with Green View Senior Secondary School. Submit an enquiry and our school office will contact you with admission details.
            </motion.p>

            {/* 2x2 Grid of Available Classes */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.03 }}
                  className="border border-white/20 bg-white/5 rounded-2xl p-3 flex flex-col justify-between h-20 transition-colors hover:bg-white/10 cursor-pointer"
                >
                  <div>
                    <h4 className="font-extrabold text-xs text-white leading-none mb-1">
                      Classes Available
                    </h4>
                    <p className="text-[10px] text-emerald-100 leading-tight">
                      Nursery to Senior Secondary classes.
                    </p>
                  </div>
                  <span className="text-white text-xs font-bold self-end leading-none">→</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Action CTA Buttons */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mt-4 md:mt-0">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 max-w-[140px] bg-white text-[#0fa958] hover:bg-emerald-50 px-5 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Apply Now</span>
              <span className="text-xs font-bold leading-none">→</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 max-w-[140px] border border-white hover:bg-white/10 px-5 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5 text-white"
            >
              {/* Inline WhatsApp Logo SVG */}
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.382 9.86-9.764.001-2.607-1.012-5.059-2.852-6.903C16.638 2.093 14.18 1.08 11.579 1.08c-5.437 0-9.857 4.382-9.86 9.765-.001 1.83.488 3.618 1.417 5.176L2.127 21.3l5.52-1.449.001-.001-.001.001-.001.001zm10.29-6.495c-.272-.136-1.61-.795-1.86-.886-.25-.091-.432-.136-.613.136-.182.273-.703.886-.862 1.068-.159.182-.318.205-.59.069-.272-.136-1.15-.424-2.19-1.353-.809-.722-1.355-1.614-1.514-1.886-.159-.273-.017-.42.12-.556.122-.122.272-.318.408-.477.136-.159.182-.273.272-.455.091-.181.046-.34-.023-.477-.069-.136-.613-1.477-.84-2.023-.222-.534-.486-.46-.666-.46-.173-.001-.371-.002-.57-.002-.198 0-.522.074-.795.371-.272.296-1.042 1.016-1.042 2.477 0 1.46 1.065 2.872 1.213 3.074.149.202 2.099 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.61-.659 1.838-1.296.227-.637.227-1.183.159-1.296-.068-.113-.25-.204-.523-.34z" />
              </svg>
              <span>WhatsApp</span>
              <span className="text-xs font-bold leading-none">→</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side: Enquiry Form Panel (White Background) */}
        <motion.div 
          variants={rightContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-1 bg-white p-6 md:p-8 lg:p-10 flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-[340px]"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.15 }}
                  className="bg-emerald-100/60 p-4 rounded-full text-[#0fa958] mb-4"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                <h4 className="font-extrabold text-emerald-800 text-lg mb-2">
                  Enquiry Submitted!
                </h4>
                <p className="text-slate-600 text-xs font-bold max-w-xs leading-relaxed">
                  Thank you for your interest in Green View. Our admissions office will get in touch with you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className="flex flex-col gap-3.5"
              >
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  
                  {/* Student Name */}
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <label className="text-[10px] md:text-xs font-bold text-slate-700 mb-1.5 ml-0.5">
                      Student Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 text-xs md:text-sm font-semibold focus:outline-none focus:border-[#0fa958] transition-colors"
                      placeholder="Student name"
                    />
                  </motion.div>

                  {/* Phone / WhatsApp */}
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <label className="text-[10px] md:text-xs font-bold text-slate-700 mb-1.5 ml-0.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 text-xs md:text-sm font-semibold focus:outline-none focus:border-[#0fa958] transition-colors"
                      placeholder="+91 9XXXXXXXXX"
                    />
                  </motion.div>

                  {/* Parent Name */}
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <label className="text-[10px] md:text-xs font-bold text-slate-700 mb-1.5 ml-0.5">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      value={formData.parentName}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 text-xs md:text-sm font-semibold focus:outline-none focus:border-[#0fa958] transition-colors"
                      placeholder="Full name"
                    />
                  </motion.div>

                  {/* Class seeking admission */}
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <label className="text-[10px] md:text-xs font-bold text-slate-700 mb-1.5 ml-0.5">
                      Class seeking admission *
                    </label>
                    <select
                      name="grade"
                      required
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-600 text-xs md:text-sm font-semibold focus:outline-none focus:border-[#0fa958] transition-colors"
                    >
                      <option value="">Select class</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">L.KG</option>
                      <option value="UKG">U.KG</option>
                      <option value="I-V">Grades I - V</option>
                      <option value="VI-VIII">Grades VI - VIII</option>
                      <option value="IX-X">Grades IX - X</option>
                      <option value="XI-XII">Grades XI - XII</option>
                    </select>
                  </motion.div>

                  {/* Email Address */}
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <label className="text-[10px] md:text-xs font-bold text-slate-700 mb-1.5 ml-0.5">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 text-xs md:text-sm font-semibold focus:outline-none focus:border-[#0fa958] transition-colors"
                      placeholder="you@example.com"
                    />
                  </motion.div>

                  {/* D.O.B */}
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <label className="text-[10px] md:text-xs font-bold text-slate-700 mb-1.5 ml-0.5">
                      D.O.B
                    </label>
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 text-xs md:text-sm font-semibold focus:outline-none focus:border-[#0fa958] transition-colors"
                      placeholder="Date of Birth"
                    />
                  </motion.div>

                </div>

                {/* Message / Questions */}
                <motion.div variants={itemVariants} className="flex flex-col">
                  <label className="text-[10px] md:text-xs font-bold text-slate-700 mb-1.5 ml-0.5">
                    Message / Questions
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 text-xs md:text-sm font-semibold focus:outline-none focus:border-[#0fa958] transition-colors resize-none h-[64px]"
                    placeholder="Transport needed? Previous school? Anything we should know?"
                  />
                </motion.div>

                {/* Consent Checkbox */}
                <motion.div variants={itemVariants} className="flex items-start gap-2 mt-1 select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-3.5 h-3.5 text-[#0fa958] border-slate-300 rounded focus:ring-[#0fa958] mt-0.5 shrink-0 accent-[#0fa958]"
                  />
                  <label htmlFor="consent" className="text-[10px] md:text-xs font-medium text-slate-400 leading-tight">
                    I consent to Green View School contacting me about admissions on phone/WhatsApp.
                  </label>
                </motion.div>

                {/* Bottom Actions Row */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#0fa958] hover:bg-[#0c8e4a] text-white px-7 py-3 rounded-full font-bold text-xs tracking-wide transition-all shadow-md shadow-emerald-950/10 flex items-center justify-center shrink-0 w-full sm:w-auto text-center"
                  >
                    Send Enquiry
                  </motion.button>
                  <span className="text-[10px] md:text-xs font-semibold text-slate-400/90 leading-tight text-left sm:text-right select-none">
                    Your details will be shared with the school office only.
                  </span>
                </motion.div>

              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </section>
  );
}
