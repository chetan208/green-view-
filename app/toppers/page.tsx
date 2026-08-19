import React from "react";
import axios from "axios";
import TopperCard, { Topper } from "@/components/ui/TopperCard";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Trophy } from "lucide-react";

export const metadata = {
  title: 'Our Achievers | Green View School',
  description: 'Celebrating the exceptional academic achievements of Green View School students.',
};

export const revalidate = 60; // Revalidate every minute

export default async function ToppersPage() {
  let toppers: Topper[] = [];
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.greenviewschool.in";

  try {
    const res = await axios.get(`${SERVER_URL}/api/top-results`);
    if (res.data.success) {
      toppers = res.data.results;
    }
  } catch (error) {
    console.error("Failed to fetch toppers:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FF]">
      <Header />
      
      <main className="flex-grow pt-14 sm:pt-20 md:pt-28 pb-12 md:pb-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#006a37]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-1/4 h-1/4 bg-[#0fa958]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Compact Header Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-[#E6F4EA] text-[#006a37] px-3 py-1 rounded-full font-bold text-xs mb-2.5 sm:mb-3 border border-[#006a37]/10 shadow-xs">
              <Trophy size={14} />
              HALL OF FAME
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-2 sm:mb-3">
              Our Academic <span className="text-[#006a37] inline-block relative">Achievers<svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="#0fa958" strokeWidth="3" fill="transparent"/></svg></span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-base md:text-lg font-medium leading-relaxed">
              We take immense pride in our students who have set benchmarks of excellence in board examinations.
            </p>
          </div>

          {toppers.length === 0 ? (
            <div className="text-center py-12 md:py-16 bg-white rounded-3xl border border-slate-100 shadow-xs">
              <Trophy size={40} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-slate-500">No records found</h3>
              <p className="text-xs text-slate-400 mt-1">Achievers list is currently being updated.</p>
            </div>
          ) : (
            /* 2 Cards per row on mobile (grid-cols-2), 4 on desktop */
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {toppers.map((topper, index) => (
                <TopperCard key={topper._id} topper={topper} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
