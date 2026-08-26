"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { facilitiesData } from "@/data/facilitiesData";

export default function FacilitiesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-8 md:py-12 px-6 md:px-12 lg:px-24 bg-[#eefcf3] flex flex-col items-center border-y border-emerald-100 overflow-hidden">
      <div className="max-w-6xl w-full">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight">
              Explore Our <span className="text-[#0B9E50]">Facilities</span>
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-lg">
              State-of-the-art resources and vibrant spaces for holistic growth.
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 sm:self-end pb-1">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-1 text-slate-900 hover:text-[#0B9E50] font-semibold text-sm transition-colors"
            >
              <span>See All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Facilities Cards (Vertical on Mobile, Horizontal Scroll on Desktop) */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-cols-1 gap-5 sm:flex sm:overflow-x-auto sm:snap-x sm:snap-mandatory sm:pb-4 sm:[&::-webkit-scrollbar]:hidden sm:[-ms-overflow-style:none] sm:[scrollbar-width:none]"
        >
          {facilitiesData.map((item, index) => (
            <div
              key={item.id}
              className={`sm:snap-start sm:flex-none w-full sm:w-[320px] bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col ${index >= 3 ? 'hidden sm:flex' : 'flex'}`}
            >
              {/* Image */}
              <div className="h-40 overflow-hidden relative bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-base text-slate-900 mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1">{item.shortDesc}</p>
                <Link
                  href={`/facilities#${item.id}`}
                  className="text-xs font-semibold text-[#0B9E50] inline-flex items-center gap-1 mt-auto group/link"
                >
                  Explore <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile See All Button */}
        <div className="mt-5 sm:hidden w-full">
          <Link
            href="/facilities"
            className="inline-flex items-center justify-center w-full bg-white border-2 border-[#0B9E50] text-[#0B9E50] hover:bg-[#0fa958] hover:text-white hover:border-[#0fa958] py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            <span>See All Facilities</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
