import React from "react";
import { Laptop, Dumbbell, BookOpen, Atom } from "lucide-react";

export default function FacilitiesSection() {
  const facilities = [
    {
      title: "Smart Classes",
      description: "Interactive flat panels and digital resources to make learning engaging.",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Sports Complex",
      description: "A vast playground and indoor facilities promoting active and healthy lifestyles.",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Digital Library",
      description: "Thousands of books, journals, and digital media archives to explore.",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Science Lab",
      description: "Modern labs equipped for physics, chemistry, and biology research.",
      icon: Atom,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <section id="facilities" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-emerald-50/30 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-600" />
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Our Features
            </span>
            <span className="h-px w-8 bg-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Why Learn With Us?
          </h2>
          <p className="text-slate-500 font-medium mt-4 max-w-lg">
            We provide world-class facilities and student support systems to enhance learning outcomes.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={fac.image}
                alt={fac.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-emerald-950/60 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Icon Badge */}
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl text-white">
                <fac.icon className="w-6 h-6" />
              </div>

              {/* Content Panel */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col">
                <h3 className="font-extrabold text-xl tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
