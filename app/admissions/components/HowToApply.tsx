"use client";

import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, FileText, Upload, Printer } from "lucide-react";

export default function HowToApply() {
  const steps = [
    {
      icon: <MousePointerClick className="w-6 h-6 text-brand-green" />,
      title: "Choose Pathway",
      desc: "Select the appropriate class group for your ward to access the correct application form."
    },
    {
      icon: <FileText className="w-6 h-6 text-brand-green" />,
      title: "Fill Details",
      desc: "Carefully enter all required personal, academic, and family information in the form."
    },
    {
      icon: <Upload className="w-6 h-6 text-brand-green" />,
      title: "Upload Photo",
      desc: "Provide a recent passport-sized photograph of the student along with valid details."
    },
    {
      icon: <Printer className="w-6 h-6 text-brand-green" />,
      title: "Submit & Print",
      desc: "Review your application, submit it securely, and print the generated acknowledgment receipt."
    }
  ];

  return (
    <section className="w-full py-24 px-6 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-normal md:font-semibold text-slate-900 tracking-tight mb-4"
          >
            How to Apply Online
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Our digital admission process is designed to be quick, secure, and hassle-free. Just follow these four simple steps to complete your registration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              className="relative flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center mb-6 relative z-10 border border-slate-100">
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-green text-white text-sm font-normal md:font-semibold flex items-center justify-center border-4 border-slate-50">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-lg font-normal md:font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {step.desc}
              </p>
              
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[60%] w-[80%] h-[2px] border-t-2 border-dashed border-slate-200" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-10 border-t border-slate-200 text-center flex flex-col items-center"
        >
          <p className="text-slate-500 font-medium mb-2">Need assistance with your application?</p>
          <div className="inline-flex gap-4 items-center">
            <span className="text-brand-navy font-normal md:font-semibold">Call: 01894-252115</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-brand-navy font-normal md:font-semibold">9816521168</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
