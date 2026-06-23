import React from "react";

export default function StatsSection() {
  const stats = [
    { value: "30+", label: "Years of Trust" },
    { value: "5,000+", label: "Students Alumni" },
    { value: "120+", label: "Expert Teachers" },
    { value: "96%", label: "Passing Rate" },
  ];

  return (
    <section className="w-full bg-emerald-800 py-10 px-6 flex justify-center border-y border-emerald-900 shadow-inner">
      <div className="max-w-7xl w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-4 border-r last:border-r-0 border-emerald-700/50 max-md:[&:nth-child(even)]:border-r-0 max-md:border-r"
          >
            <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
              {stat.value}
            </span>
            <span className="text-xs md:text-sm font-bold text-emerald-100 uppercase tracking-widest">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
