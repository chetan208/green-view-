import React from "react";
import Link from "next/link";
import { Star, ShieldAlert, CheckCircle, ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-emerald-50/50 via-white to-white flex justify-center relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-green-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side Info */}
        <div className="flex flex-col flex-1 text-center lg:text-left items-center lg:items-start">
          
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100/50 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Admissions Open 2026-27
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
              Green view
            </span> <br />
            Sr. Sec. School
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-lg mb-8 leading-relaxed font-medium">
            Empowering students to achieve academic excellence, develop character, and embrace life-long learning in a safe, nurturing and innovative environment.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <Link
              href="#admission"
              className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 text-center"
            >
              Apply Online
            </Link>
            <Link
              href="#about"
              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-600 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 text-center"
            >
              Learn More
            </Link>
          </div>

          {/* Rating / Proof Badges */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-emerald-50/50 border border-emerald-100/40 rounded-2xl">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-800"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${
                      num === 1
                        ? "1534528741775-53994a69daeb"
                        : num === 2
                        ? "1507003211169-0a1dd7228f2d"
                        : num === 3
                        ? "1494790108377-be9c29b29330"
                        : "1500648767791-00dcc994a43e"
                    }?auto=format&fit=crop&q=80&w=80&h=80`}
                    alt="Parent Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
                <span className="text-sm font-bold text-slate-800 ml-1">4.9 / 5</span>
              </div>
              <span className="text-xs text-slate-500 font-semibold mt-0.5">
                Loved by 5,000+ Happy Parents & Alumni
              </span>
            </div>
          </div>

        </div>

        {/* Right Side Visuals */}
        <div className="flex-1 w-full flex justify-center relative">
          
          {/* Main School Building Graphic Card */}
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
              alt="Green View School Main Building"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            
            {/* Image badge: ESTD 1996 */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
              <div className="bg-emerald-500 p-2 rounded-xl text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-800 font-extrabold text-sm leading-none">
                  Best Infrastructure
                </span>
                <span className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-wider">
                  State-of-the-art campus
                </span>
              </div>
            </div>
          </div>

          {/* Floater Badge: ESTD 1996 */}
          <div className="absolute -top-6 -left-6 bg-emerald-700 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-black shadow-lg border-4 border-white transform -rotate-12 animate-bounce duration-[3000ms]">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-80 leading-none">
              ESTD
            </span>
            <span className="text-lg tracking-tight mt-1">1996</span>
          </div>

        </div>

      </div>
    </section>
  );
}
