import React from "react";
import { Quote } from "lucide-react";

export default function PrincipalMessage() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-emerald-50/20 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Principal Image Card */}
        <div className="flex-1 w-full max-w-sm relative flex justify-center lg:justify-start">
          <div className="relative group">
            {/* Background green decorative offset border */}
            <div className="absolute -inset-4 rounded-3xl border-2 border-emerald-500/20 transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            
            {/* Main Image Container */}
            <div className="w-72 h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800"
                alt="Principal Portrait"
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            {/* Visual badge label */}
            <div className="absolute bottom-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-50">
              <span className="text-emerald-700 font-extrabold text-xs tracking-wider uppercase">
                25+ Yrs Leadership
              </span>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-[1.5] flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-600" />
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              Leadership Word
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Principal&apos;s Message
          </h2>

          <div className="relative mb-6">
            {/* Large Decorative Quote Icon */}
            <Quote className="w-12 h-12 text-emerald-100 absolute -top-4 -left-4 -z-10 transform -rotate-180" />
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium italic pl-6 border-l-4 border-emerald-500">
              &quot;Welcome to Green view Sr. Sec. School. Our mission is to guide students on their journey of education, teaching them to think critically, behave ethically, and act with compassion. We believe in providing an environment that values curiosity and fosters creativity, ensuring that every child is prepared to lead in tomorrow&apos;s world.&quot;
            </p>
          </div>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium pl-6">
            Education is not merely about acquiring knowledge but learning skills to apply it dynamically. We partner with parents to ensure every student feels supported and inspired to attain their goals.
          </p>

          <div className="pl-6">
            <span className="block font-black text-slate-800 text-lg">
              Dr. Rajesh Sharma
            </span>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1 block">
              Principal, Green view School
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
