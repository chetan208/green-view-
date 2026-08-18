"use client";

import React, { useEffect, useState } from "react";
import { Award, Star, Trophy } from "lucide-react";
import axios from "axios";

interface Topper {
  _id: string;
  name: string;
  fatherName?: string;
  class: string;
  marks: number;
  percentage: number;
  imageUrl: string;
  session: string;
}

export default function ToppersSection() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.greenviewschool.in";

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
    { _id: "1", name: "Mannat", fatherName: "Rajesh Kumar", class: "10th", marks: 672, percentage: 96, imageUrl: "", session: "2024-2025" },
    { _id: "2", name: "Vanshika", fatherName: "Sanjay Sharma", class: "10th", marks: 672, percentage: 96, imageUrl: "", session: "2023-2024" },
    { _id: "3", name: "Anshika", fatherName: "Vijay Singh", class: "10th", marks: 665, percentage: 95, imageUrl: "", session: "2021-2022" },
    { _id: "4", name: "Divya Sharma", fatherName: "Ramesh Sharma", class: "10th", marks: 658, percentage: 94, imageUrl: "", session: "2021-2022" },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayToppers.map((topper) => (
              <div 
                key={topper._id} 
                className="bg-[#003823] rounded-2xl p-3 md:p-4 shadow-xl flex flex-col items-center hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Image Container with the Leaf Shape */}
                <div className="w-full aspect-square md:aspect-[4/4.5] bg-gradient-to-b from-white to-[#4ade80] rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px] rounded-bl-sm overflow-hidden flex items-end justify-center relative shadow-[3px_3px_10px_rgba(0,0,0,0.3)]">
                  {topper.imageUrl ? (
                     <img src={topper.imageUrl} alt={topper.name} className="w-full h-full object-cover" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-[#003823] font-bold text-5xl opacity-30">
                       {topper.name.charAt(0)}
                     </div>
                  )}
                </div>
                
                {/* Text Content */}
                <div className="text-center mt-3 w-full px-1">
                  <h3 className="text-[#fde047] font-bold text-[15px] md:text-[16px] leading-tight uppercase tracking-wide">
                    {topper.name}
                  </h3>
                  <p className="text-white text-[12px] md:text-[13px] mt-0.5 leading-snug">
                    {topper.fatherName ? `D/o Sh. ${topper.fatherName}` : "Student"}
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/20 my-2"></div>
                  
                  <div className="flex flex-col gap-0.5 items-center">
                    <p className="text-white/90 text-xs md:text-[13px] font-medium">
                      Class {topper.class}
                    </p>
                    <p className="text-white text-[13px] md:text-[14px] font-bold tracking-wide">
                      {topper.percentage}% ({topper.marks} Marks)
                    </p>
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
