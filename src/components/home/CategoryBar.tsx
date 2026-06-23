import React from "react";

export default function CategoryBar() {
  const items = [
    {
      title: "Smart Classrooms",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=80&h=80",
    },
    {
      title: "Holistic Education",
      image: "https://images.unsplash.com/photo-1577896851231-70ee18881754?auto=format&fit=crop&q=80&w=80&h=80",
    },
    {
      title: "STEM & Robotics",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=80&h=80",
    },
    {
      title: "World-Class Library",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=80&h=80",
    },
    {
      title: "Collaborative Labs",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=80&h=80",
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
            className="flex items-center gap-3 bg-white p-2.5 pr-6 rounded-full border border-slate-100/80 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-emerald-100 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            {/* Circular Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-50 shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Title */}
            <span className="font-extrabold text-slate-800 text-xs md:text-sm tracking-tight">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
