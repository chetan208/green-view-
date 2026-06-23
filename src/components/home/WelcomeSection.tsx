import React from "react";
import { Check, Calendar, Trophy, GraduationCap, Play } from "lucide-react";

export default function WelcomeSection() {
  const highlights = [
    "Holistic development focus with co-curricular excellence",
    "Smart interactive classrooms & modern science labs",
    "Expert mentors committed to individual student care",
  ];

  const subStats = [
    { icon: Trophy, value: "50+", label: "National Awards" },
    { icon: Calendar, value: "60+", label: "Creative Courses" },
    { icon: GraduationCap, value: "1,400+", label: "Active Students" },
  ];

  return (
    <section id="about" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white flex justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side: Images & Floating Badges */}
        <div className="flex-1 w-full relative flex justify-center">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800"
              alt="Students in classroom"
              className="w-full h-full object-cover"
            />
            {/* Play video overlay button */}
            <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
              <button className="bg-white text-emerald-600 hover:bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110">
                <Play className="w-6 h-6 fill-emerald-600 ml-1" />
              </button>
            </div>
          </div>
          
          {/* Badge */}
          <div className="absolute -bottom-6 right-4 md:-right-6 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400">
            <Trophy className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none">Top Rank</span>
              <span className="text-[10px] uppercase font-bold tracking-widest mt-1 text-emerald-100">
                In School Education
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Text details */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-600" />
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Who We Are
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Welcome to <span className="text-emerald-600">Greenview</span> <br />
            Sr. Sec. School
          </h2>

          <p className="text-slate-600 mb-6 leading-relaxed font-medium">
            Since our establishment, we have been dedicated to providing a high-quality education that inspires students to achieve their full potential. Our balanced approach fosters intellectual curiosity, physical strength, and ethical value.
          </p>

          {/* Highlights List */}
          <ul className="flex flex-col gap-3 mb-8">
            {highlights.map((h, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                </div>
                <span className="text-slate-700 font-semibold text-sm md:text-base leading-relaxed">
                  {h}
                </span>
              </li>
            ))}
          </ul>

          {/* Mini Stats Card Grid */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 mb-8">
            {subStats.map((item, index) => (
              <div key={index} className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="w-4 h-4 text-emerald-600" />
                  <span className="text-lg md:text-xl font-black text-slate-800">
                    {item.value}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider text-center sm:text-left">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Read More button */}
          <button className="w-fit bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-md shadow-emerald-600/10">
            Read More About Us
          </button>

        </div>

      </div>
    </section>
  );
}
