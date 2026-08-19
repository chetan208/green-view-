'use client';

import React from "react";
import { motion } from "framer-motion";
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> 166d41025b345d62754fa7041de81076b6e3caa3
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
<<<<<<< HEAD
      // Card background: Dark Green from the logo
      className="group relative bg-[#005b31] rounded-[20px] p-3 shadow-xl flex flex-col items-center hover:-translate-y-1 transition-transform duration-300 w-full max-w-[320px] mx-auto isolate overflow-hidden"
    >
=======
      className="relative w-full max-w-[200px] sm:max-w-[240px] mx-auto aspect-[4/5] rounded-lg sm:rounded-2xl md:rounded-[24px] bg-white shadow-sm sm:shadow-lg isolate overflow-hidden"
    >
      {/* Background Image / Fallback */}
      <div className="absolute inset-0 pb-[38px] sm:pb-[56px] md:pb-[72px]">
        {topper.imageUrl ? (
          <Image 
            src={topper.imageUrl} 
            alt={topper.name} 
            fill 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300">
            <span className="text-4xl sm:text-7xl font-black">{topper.name.charAt(0)}</span>
          </div>
        )}
      </div>

>>>>>>> 166d41025b345d62754fa7041de81076b6e3caa3
      {/* Delete Button (Admin Only) */}
      {onDelete && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(topper._id); }}
<<<<<<< HEAD
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
=======
          className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-30 w-6 h-6 sm:w-8 sm:h-8 bg-white hover:bg-rose-500 rounded-full text-rose-500 hover:text-white shadow-md flex items-center justify-center transition-colors cursor-pointer border border-rose-100"
        >
          <Trash2 size={11} className="sm:w-3.5 sm:h-3.5" />
        </button>
      )}

      {/* Bottom Ultra-Compact White Overlay Box */}
      <div className="absolute bottom-0.5 left-0.5 right-0.5 sm:bottom-1.5 sm:left-1.5 sm:right-1.5 bg-white/95 backdrop-blur-xs rounded-md sm:rounded-xl md:rounded-[14px] py-0.5 px-1 sm:py-1.5 sm:px-2 md:py-2 shadow-[0_1px_8px_rgba(0,0,0,0.05)] border border-slate-100 z-20 flex flex-col justify-center items-center gap-0">
        <h3 className="text-[10px] sm:text-sm md:text-base font-black text-slate-900 uppercase tracking-wide line-clamp-1 w-full text-center leading-none mt-0.5">
          {topper.name}
        </h3>
        <div className="text-xs sm:text-base md:text-lg font-black text-emerald-600 tracking-tight leading-none my-0.5">
          {topper.percentage}%
        </div>
        <div className="text-[7px] sm:text-[9px] md:text-[10px] font-semibold text-slate-500 uppercase tracking-tight text-center leading-none mb-0.5">
          Class {topper.class} &bull; {topper.session}
        </div>
      </div>
>>>>>>> 166d41025b345d62754fa7041de81076b6e3caa3
    </motion.div>
  );
}
