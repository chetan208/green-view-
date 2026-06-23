import React from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      stars: 5,
      quote: "The academic standards at Green View are outstanding, but what truly sets it apart is the focus on holistic growth. My daughter has become incredibly confident, expressive, and responsible.",
      name: "Manisha Sharma",
      role: "Parent of Khushi (Grade VIII)",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      stars: 5,
      quote: "We relocated from Delhi and were worried about my son's adjustment. The teachers were incredibly supportive, welcoming him with personal care. The sports facilities are fantastic too!",
      name: "Amit Singhal",
      role: "Parent of Aarav (Grade X)",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      stars: 5,
      quote: "Highly recommended school for anyone searching for quality values, disciplined environment, and premium teaching methods. The smart classrooms and computer labs are exceptional.",
      name: "Karan Gupta",
      role: "Parent of Diya (Grade V)",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-slate-50 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-600" />
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Reviews
            </span>
            <span className="h-px w-8 bg-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            What Parents Say About Us
          </h2>
          <p className="text-slate-500 font-medium mt-4 max-w-lg">
            Read stories and feedback from parents about their child&apos;s growth and experiences at our school.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              {/* Large quote icon watermark */}
              <Quote className="w-12 h-12 text-slate-50 absolute top-6 right-6 -z-0 opacity-80 group-hover:text-emerald-50 transition-colors" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold italic mb-8">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6 relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 bg-slate-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-extrabold text-slate-800 text-sm block">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
