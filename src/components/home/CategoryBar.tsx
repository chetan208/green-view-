import React from "react";
import Link from "next/link";
import { facilitiesData } from "@/data/facilitiesData";

export default function CategoryBar() {
  // Use real facilities directly from facilitiesData
  const items = facilitiesData;

  // Duplicate scrolling items to ensure a seamless infinite loop
  const scrollingItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-white py-6 flex overflow-hidden border-t border-slate-100 relative">
      {/* CSS Keyframe Animation Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-cat {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee-cat {
          animation: marquee-cat 35s linear infinite;
        }
        .animate-marquee-cat:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Scrolling Inner Container */}
      <div className="flex gap-3 sm:gap-6 whitespace-nowrap animate-marquee-cat pl-3 sm:pl-6">
        {scrollingItems.map((item, idx) => (
          <Link
            key={`${item.id}-${idx}`}
            href={`/facilities#${item.id}`}
            className="flex items-center gap-2 sm:gap-3 bg-white p-1.5 sm:p-2.5 pr-4 sm:pr-6 rounded-full border border-slate-100/80 shadow-xs shadow-slate-100/50 hover:shadow-md hover:border-[#0B9E50] transition-all duration-300 whitespace-nowrap cursor-pointer group"
          >
            {/* Circular Image */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* Title */}
            <span className="font-semibold md:font-extrabold text-slate-800 text-[10px] sm:text-xs md:text-sm tracking-tight group-hover:text-[#0B9E50] transition-colors">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
