'use client';

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
      className="relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] mx-auto aspect-[4/5] rounded-lg sm:rounded-[20px] bg-white shadow-sm sm:shadow-md isolate overflow-hidden"
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

      {/* Delete Button (Admin Only) */}
      {onDelete && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(topper._id); }}
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
    </motion.div>
  );
}
