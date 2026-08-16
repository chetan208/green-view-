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
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

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
      
      <main className="flex-grow pt-24 pb-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#006a37]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-1/4 h-1/4 bg-[#0fa958]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#006a37] px-4 py-2 rounded-full font-bold text-sm mb-6 border border-[#006a37]/10 shadow-sm">
              <Trophy size={16} />
              HALL OF FAME
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Our Academic <span className="text-[#006a37] inline-block relative">Achievers<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="#0fa958" strokeWidth="3" fill="transparent"/></svg></span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-medium">
              We take immense pride in our students who have set benchmarks of excellence. Their hard work and dedication continue to inspire generations of Green View students.
            </p>
          </div>

          {toppers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Trophy size={64} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-2xl font-bold text-slate-400">No records found</h3>
              <p className="text-slate-500 mt-2">Achievers list is currently being updated.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
