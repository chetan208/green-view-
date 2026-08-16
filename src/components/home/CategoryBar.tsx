import React from "react";

export default function CategoryBar() {
  const items = [
    {
      title: "Smart Classrooms",
      image: "/images/smart_classroom.png",
    },
    {
      title: "Science & Chemistry Labs",
      image: "/images/science_lab.png",
    },
    {
      title: "Computer & IT Lab",
      image: "/images/computer_lab.png",
    },
    {
      title: "World-Class Library",
      image: "/images/library.png",
    },
    {
      title: "Art & Creative Studio",
      image: "/images/art.png",
    },
    {
      title: "Safe Transport",
      image: "/images/school_bus.png",
    },
  ];

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
          animation: marquee-cat 30s linear infinite;
        }
        .animate-marquee-cat:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Scrolling Inner Container */}
      <div className="flex gap-6 whitespace-nowrap animate-marquee-cat pl-6">
        {scrollingItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white p-2.5 pr-6 rounded-full border border-slate-100/80 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-emerald-100 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            {/* Circular Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Title */}
            <span className="font-semibold md:font-extrabold text-slate-800 text-xs md:text-sm tracking-tight">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
