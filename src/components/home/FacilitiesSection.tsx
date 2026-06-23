import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FacilitiesSection() {
  const cards = [
    {
      title: "Holistic Education",
      image: "https://images.unsplash.com/photo-1577896851231-70ee18881754?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Smart Classrooms",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Global Curriculum",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500",
    },
    {
      title: "Future Ready Skills",
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <section id="facilities" className="w-full py-10 px-6 md:px-12 lg:px-24 bg-[#d5f0e3] flex justify-center">
      <div className="max-w-7xl w-full flex flex-col">
        
        {/* Subtitle */}
        <span className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-[0.25em] text-center mb-3">
          Choose Green View?
        </span>

        {/* Title and See All row */}
        <div className="flex items-center justify-between mb-8 relative">
          {/* Empty spacer on the left to help centering on desktop */}
          <div className="hidden md:block w-20" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center flex-1">
            Why Learn With Us?
          </h2>

          <Link
            href="#events"
            className="flex items-center gap-1 font-bold text-slate-900 hover:text-emerald-700 text-sm md:text-base transition-colors"
          >
            See All
            <span className="text-xs">▸</span>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group flex flex-col bg-[#1e293b] rounded-3xl overflow-hidden shadow-lg border border-emerald-800/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-800">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Container */}
              <div className="py-4 px-4 text-center">
                <span className="text-white font-extrabold text-sm md:text-base tracking-tight block">
                  {card.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
