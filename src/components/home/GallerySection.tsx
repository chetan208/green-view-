import React from "react";
import { Image as ImageIcon, ExternalLink } from "lucide-react";

export default function GallerySection() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400",
      title: "Science Exhibition 2026",
      tag: "Academic",
    },
    {
      url: "https://images.unsplash.com/photo-1577896851231-70ee18881754?auto=format&fit=crop&q=80&w=400",
      title: "Annual Sports Day Meet",
      tag: "Sports",
    },
    {
      url: "https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&q=80&w=400",
      title: "Computer Laboratory Class",
      tag: "Facilities",
    },
    {
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
      title: "Art & Craft Workshops",
      tag: "Creative",
    },
    {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
      title: "Interactive Smart Class Sessions",
      tag: "Academic",
    },
    {
      url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=400",
      title: "Graduation Convocation",
      tag: "Celebration",
    },
    {
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
      title: "Reading Week in Library",
      tag: "Creative",
    },
    {
      url: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=400",
      title: "Cultural Festival Dance",
      tag: "Celebration",
    },
    {
      url: "https://images.unsplash.com/photo-1491841573190-7cc372a24349?auto=format&fit=crop&q=80&w=400",
      title: "Junior Section Play Day",
      tag: "Sports",
    },
  ];

  return (
    <section id="events" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-emerald-50/20 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-600" />
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Gallery & Media
            </span>
            <span className="h-px w-8 bg-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Events at <span className="text-emerald-600">Green View</span>
          </h2>
          <p className="text-slate-500 font-medium mt-4 max-w-lg">
            A visual tour of our campus celebrations, students activities, exhibitions and achievements.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-video rounded-3xl overflow-hidden shadow-md border border-slate-100 cursor-pointer"
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Floating Tag */}
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md">
                {img.tag}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/70 transition-all duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                    {img.title}
                    <ExternalLink className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-[10px] text-slate-300 font-bold uppercase mt-1 tracking-wider">
                    Click to view full album
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className="mt-12 bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-600 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-sm flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          View Complete Photo Gallery
        </button>

      </div>
    </section>
  );
}
