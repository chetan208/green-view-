"use client";

import React from "react";
import { Trophy, Target, Leaf, Award, BarChart3, FileBadge } from "lucide-react";

export default function AwardsSection() {
  const awards = [
    {
      title: "Best School Award",
      subtitle: "Himachal Pradesh Education Department â€“ 2022",
      icon: Trophy,
    },
    {
      title: "State Science Olympiad Champions",
      subtitle: "3 consecutive years (2019â€“2021)",
      icon: Target,
    },
    {
      title: "National Green Campus Award",
      subtitle: "Ministry of Environment â€“ 2020",
      icon: Leaf,
    },
    {
      title: "District Sports Excellence Trophy",
      subtitle: "8 times district champion",
      icon: Award,
    },
    {
      title: "HPBOSE Outstanding Results",
      subtitle: "Recognition in 2023 & 2026",
      icon: BarChart3,
    },
    {
      title: "Times School Survey",
      subtitle: "Top 5 Schools in HP (2022, 2023)",
      icon: FileBadge,
    }
  ];

  return (
    <section className="w-full bg-white py-12 md:py-20 lg:py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col items-center gap-12 md:gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[#0fa958] font-bold text-[10px] md:text-xs uppercase tracking-[0.25em]">
            RECOGNITION
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Awards & <span className="text-[#0fa958]">Achievements</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mt-2 text-sm md:text-base leading-relaxed">
            Four decades of excellence, discipline, and community impact â€” recognised by institutions across Himachal Pradesh and India.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
          {awards.map((award, idx) => {
            const Icon = award.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#fafcfa] border border-[#c6f0d7] rounded-xl md:rounded-2xl p-6 md:p-8 flex items-start gap-4 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="text-slate-700 shrink-0 mt-0.5 bg-white p-2.5 rounded-lg shadow-sm border border-slate-100">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-slate-900 font-bold text-sm md:text-base leading-snug">
                    {award.title}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                    {award.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

