"use client";

import React, { useEffect, useState } from "react";
import { Award, Star, Trophy } from "lucide-react";
import axios from "axios";

interface Topper {
  _id: string;
  name: string;
  class: string;
  marks: number;
  percentage: number;
  imageUrl: string;
  session: string;
}

export default function ToppersSection() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/top-results`);
        if (response.data.success) {
          setToppers(response.data.results);
        }
      } catch (error) {
        console.error("Failed to fetch toppers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchToppers();
  }, []);

  // Use dummy data as fallback if API fails or is empty initially for demo purposes
  // The user provided these specific toppers from 2022-2025
  const fallbackToppers: Topper[] = [
    { _id: "1", name: "Mannat", class: "10th", marks: 672, percentage: 96, imageUrl: "", session: "2024-2025" },
    { _id: "2", name: "Vanshika", class: "10th", marks: 672, percentage: 96, imageUrl: "", session: "2023-2024" },
    { _id: "3", name: "Anshika", class: "10th", marks: 665, percentage: 95, imageUrl: "", session: "2021-2022" },
    { _id: "4", name: "Divya Sharma", class: "10th", marks: 658, percentage: 94, imageUrl: "", session: "2021-2022" },
  ];

  const displayToppers = toppers.length > 0 ? toppers : fallbackToppers;

  return (
    <section className="py-24 bg-[#F8F9FF] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#006a37]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#0fa958]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#006a37] px-4 py-2 rounded-full font-bold text-sm mb-6 border border-[#006a37]/10">
            <Trophy size={16} />
            STATE MERIT LIST HOLDERS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Our Hall of <span className="text-[#006a37] inline-block relative">Fame<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="#0fa958" strokeWidth="3" fill="transparent"/></svg></span>
          </h2>
          <p className="text-slate-600 text-lg">
            Celebrating the exceptional achievements of our students in the HPBOSE Matriculation Board Exams. Consistent excellence, year after year.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
             <div className="animate-pulse flex gap-2 items-center text-slate-400 font-bold"><Trophy className="animate-bounce" /> Loading Toppers...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayToppers.map((topper, index) => (
              <div 
                key={topper._id} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 relative group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative background shape */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#E6F4EA] rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0" />
                <div className="absolute right-4 top-4 text-[#006a37] z-10 opacity-20 group-hover:opacity-100 transition-opacity">
                   <Award size={32} />
                </div>

                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-6 border-4 border-white shadow-md overflow-hidden relative">
                    {topper.imageUrl ? (
                       <img src={topper.imageUrl} alt={topper.name} className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0fa958] to-[#006a37] text-white font-bold text-3xl">
                         {topper.name.charAt(0)}
                       </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-1">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-black rounded-full mb-2">
                       {topper.session}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{topper.name}</h3>
                    <p className="text-sm font-semibold text-slate-500">Class {topper.class}</p>
                    
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-3xl font-black text-[#0fa958] leading-none">{topper.percentage}%</span>
                      </div>
                      <div className="flex justify-center gap-0.5 mt-2 text-amber-400">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-slate-500 font-medium max-w-3xl mx-auto">
            These outstanding results reflect our commitment to being <strong className="text-[#006a37]">No. 1 in Academics</strong>. 
            Join us and be part of a legacy that includes top performers like Kanishka (93.1%), Trisha (92.5%), and Khushi (91%).
          </p>
        </div>
      </div>
    </section>
  );
}
