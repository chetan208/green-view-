"use client";

import React, { useEffect, useState } from "react";
import { Trophy, ArrowRight } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import TopperCard, { Topper } from "@/components/ui/TopperCard";

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

  if (!loading && toppers.length === 0) {
    return null;
  }

  // Only show top 8 on home page
  const displayedToppers = toppers.slice(0, 8);

  return (
    <section className="py-8 md:py-12 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#006a37]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#0fa958]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 md:mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#E6F4EA] text-[#006a37] px-3 py-1 rounded-full font-bold text-xs mb-3 border border-[#006a37]/10">
            <Trophy size={14} />
            STATE MERIT LIST HOLDERS
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-[1.1] mb-3">
            Our Hall of <span className="text-[#006a37] inline-block relative">Fame<svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="#0fa958" strokeWidth="3" fill="transparent"/></svg></span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Celebrating the exceptional achievements of our students in the HPBOSE Matriculation Board Exams. Consistent excellence, year after year.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
             <div className="animate-pulse flex gap-2 items-center text-slate-400 font-bold text-sm"><Trophy className="animate-bounce" size={16} /> Loading Toppers...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedToppers.map((topper, index) => (
              <div key={topper._id} className={index >= 4 ? "hidden sm:block" : "block"}>
                <TopperCard topper={topper} index={index} />
              </div>
            ))}
          </div>
        )}

        {!loading && toppers.length > 4 && (
          <div className={`mt-8 flex justify-center ${toppers.length <= 8 ? 'sm:hidden' : ''}`}>
            <Link 
              href="/toppers" 
              className="group inline-flex items-center gap-2 bg-white border-2 border-[#006a37]/20 text-[#006a37] px-5 py-2.5 rounded-xl font-bold hover:bg-[#006a37] hover:text-white hover:border-[#006a37] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm"
            >
              See All Our Achievers
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
