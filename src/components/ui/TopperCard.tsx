'use client';

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Trash2 } from "lucide-react";

export interface Topper {
  _id: string;
  name: string;
  class: string;
  percentage: number;
  imageUrl: string;
  session: string;
  marks?: number;
}

interface TopperCardProps {
  topper: Topper;
  index: number;
  onDelete?: (id: string) => void;
}

export default function TopperCard({ topper, index, onDelete }: TopperCardProps) {
  const getRankBadgeColor = (i: number) => {
    if (i === 0) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-amber-500/50';
    if (i === 1) return 'bg-gradient-to-r from-slate-300 to-slate-500 text-white shadow-slate-500/50';
    if (i === 2) return 'bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-orange-500/50';
    return 'bg-gradient-to-r from-[#0fa958] to-[#006a37] text-white shadow-emerald-500/50';
  };

  const getRankText = (i: number) => {
    if (i === 0) return '1ST RANK';
    if (i === 1) return '2ND RANK';
    if (i === 2) return '3RD RANK';
    return `${i + 1}TH RANK`;
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 isolate"
    >
      {/* Background Image / Fallback */}
      <div className="absolute inset-0 bg-slate-900">
        {topper.imageUrl ? (
          <Image 
            src={topper.imageUrl} 
            alt={topper.name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-600">
            <span className="text-7xl font-black opacity-30">{topper.name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Gradient Overlays for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Rank Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider flex items-center gap-1.5 shadow-lg border border-white/20 backdrop-blur-sm ${getRankBadgeColor(index)}`}>
          <Award size={14} />
          {getRankText(index)}
        </div>
      </div>

      {/* Delete Button (Admin Only) */}
      {onDelete && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(topper._id); }}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/10 hover:bg-rose-500 backdrop-blur-md rounded-full text-white/80 hover:text-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-white/20 cursor-pointer -translate-y-2 group-hover:translate-y-0"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        
        {/* Score prominently displayed */}
        <div className="mb-2">
          <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-[#0fa958] drop-shadow-sm">
            {topper.percentage}%
          </span>
        </div>

        {/* Student Name */}
        <h3 className="text-2xl font-bold text-white mb-1 leading-tight line-clamp-2 drop-shadow-md">
          {topper.name}
        </h3>

        {/* Details Row */}
        <div className="flex items-center gap-3 mt-3 text-sm font-medium text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {topper.class}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>Batch {topper.session}</span>
        </div>
      </div>
      
      {/* Decorative hover glare effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -skew-x-12 translate-x-full group-hover:-translate-x-full" style={{ transition: 'all 1.5s ease' }} />
    </motion.div>
  );
}
