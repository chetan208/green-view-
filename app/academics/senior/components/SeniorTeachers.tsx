"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { erpApi } from "@/services/erpApi";

export default function SeniorTeachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const fetchTeachers = async (pageToFetch: number, isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const res = await erpApi.teachers.list({ category: 'senior', isTeacher: true, page: pageToFetch, limit: 12 });
      if (res.success && res.teachers) {
        const mapped = res.teachers.map((teacher: any) => {
          const getExperienceYears = (joinDate: string | Date | undefined) => {
            if (!joinDate) return "8+ years experience";
            const diffMs = Date.now() - new Date(joinDate).getTime();
            const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
            return diffYears > 0 ? `${diffYears}+ years experience` : "1+ years experience";
          };

          const qualification = teacher.staffProfile?.qualification || "B.Ed.";
          const experienceText = teacher.staffProfile?.experience || getExperienceYears(teacher.staffProfile?.joinDate);
          const qualExp = `${qualification} ${experienceText}`.trim();

          return {
            name: teacher.name,
            role: "Senior Secondary Teacher",
            bio: teacher.staffProfile?.bio || "Dedicated educator committed to student success.",
            experience: qualExp,
            subjects: teacher.staffProfile?.subject || "",
            image: teacher.photoUrl || "https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=400&auto=format&fit=crop"
          };
        });
        
        if (isInitial) setTeachers(mapped);
        else setTeachers(prev => [...prev, ...mapped]);

        setHasMore(res.teachers.length === 12);
      }
    } catch (error) {
      console.error("Failed to fetch senior teachers:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchTeachers(1, true);
  }, []);

  const fetchNextPage = useCallback(() => {
    if (!hasMore || loadingMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTeachers(nextPage, false);
  }, [page, hasMore, loadingMore, loading]);

  useEffect(() => {
    const target = observerTargetRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
        fetchNextPage();
      }
    }, { threshold: 0.1, rootMargin: '100px' });
    observer.observe(target);
    return () => { if (target) observer.unobserve(target); };
  }, [observerTargetRef, hasMore, loadingMore, loading, fetchNextPage]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (teachers.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-medium md:font-semibold text-center text-slate-900 mb-12"
        >
          Senior Section <span className="text-brand-green">Teachers</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {teachers.map((teacher, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 12) * 0.05 }}
              className="group bg-white rounded-[24px] border border-slate-100 p-5 flex flex-col items-start text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-full aspect-[1.15] mb-4 overflow-hidden rounded-[20px] bg-slate-50 relative">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" 
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{teacher.name}</h3>
              <span className="text-xs font-semibold text-blue-600 mb-1.5 block tracking-wide">{teacher.role}</span>
              <p className="text-xs font-normal text-slate-500 leading-relaxed mb-1 line-clamp-2 min-h-[34px]">
                {teacher.bio}
              </p>
              <p className="text-xs font-medium text-slate-400 mb-3">{teacher.experience}</p>
              {teacher.subjects && (
                <p className="text-xs font-normal text-slate-500 mt-auto">
                  Subjects: <span className="font-bold text-slate-800">{teacher.subjects}</span>
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div ref={observerTargetRef} className="py-6 flex flex-col items-center justify-center w-full min-h-[60px]">
          {loadingMore && (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-green"></div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Loading more...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
