'use client';

import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export interface Topper {
  _id: string;
  name: string;
  fatherName?: string;
  class: string;
  percentage: number;
  imageUrl: string;
  session: string;
  marks?: number;
}

interface TopperCardProps {
  topper: Topper;
  index?: number;
  onDelete?: (id: string) => void;
}

export default function TopperCard({ topper, index, onDelete }: TopperCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      // Card background: Dark Green from the logo
      className="group relative bg-[#005b31] rounded-[20px] p-3 shadow-xl flex flex-col items-center hover:-translate-y-1 transition-transform duration-300 w-full max-w-[320px] mx-auto isolate overflow-hidden"
    >
      {/* Delete Button (Admin Only) */}
      {onDelete && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(topper._id); }}
          className="absolute top-4 right-4 z-30 w-8 h-8 bg-black/40 hover:bg-rose-500 backdrop-blur-md rounded-full text-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      )}

      {/* Image Container with the Leaf Shape */}
      {/* Gradient using Light Green from the logo (#82C341) */}
      <div className="w-full aspect-[4/4.5] bg-gradient-to-b from-white to-[#82C341] rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px] rounded-bl-sm overflow-hidden flex items-end justify-center relative shadow-[3px_3px_10px_rgba(0,0,0,0.3)]">
        {topper.imageUrl ? (
          <img src={topper.imageUrl} alt={topper.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#005b31] font-bold text-5xl opacity-30">
            {topper.name.charAt(0)}
          </div>
        )}
      </div>
      
      {/* Text Content */}
      <div className="text-center mt-3 w-full px-1">
        {/* Name: Yellow from the logo (#ffcd00) */}
        <h3 className="text-[#ffcd00] font-bold text-[15px] md:text-[16px] leading-tight uppercase tracking-wide">
          {topper.name}
        </h3>
        <p className="text-white text-[12px] md:text-[13px] mt-0.5 leading-snug">
          {topper.fatherName ? `D/o Sh. ${topper.fatherName}` : "Student"}
        </p>
        
        <div className="w-full h-[1px] bg-white/20 my-2"></div>
        
        <div className="flex flex-col gap-0.5 items-center">
          <p className="text-white/90 text-xs md:text-[13px] font-medium uppercase">
            Class {topper.class} <span className="mx-1 opacity-50">|</span> Batch {topper.session}
          </p>
          <p className="text-white text-[13px] md:text-[14px] font-bold tracking-wide">
            {topper.percentage}% {topper.marks ? `(${topper.marks} Marks)` : ''}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
