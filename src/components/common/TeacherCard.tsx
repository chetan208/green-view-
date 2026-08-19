"use client";

import React from "react";

export interface TeacherCardProps {
  name: string;
  role?: string;
  designation?: string;
  quote?: string;
  qualification?: string;
  experience?: string;
  subjects?: string;
  image?: string;
}

export default function TeacherCard({
  name,
  role,
  designation,
  quote = "Inspiring young minds through active learning.",
  qualification = "B.tech",
  experience = "8+ years experience",
  subjects = "English, EVS",
  image = "https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=400&auto=format&fit=crop",
}: TeacherCardProps) {
  return (
    <div className="w-full bg-white rounded-[28px] p-3.5 sm:p-4 border border-slate-200/80 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Image Frame with Smooth Inner Radius */}
      <div className="w-full aspect-[1.08/1] rounded-[22px] overflow-hidden bg-slate-100 mb-3.5 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>

      {/* Text Info Section - Left Aligned matching exact Figma spacing & typography */}
      <div className="flex flex-col text-left px-1.5 pb-1">
        <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-tight tracking-tight">
          {name}
        </h3>
        
        {designation && (
          <p className="text-sm font-medium text-blue-600 mt-1">
            {designation}
          </p>
        )}

        {quote && (
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 leading-snug">
            {quote}
          </p>
        )}

        <p className="text-xs sm:text-[13px] text-slate-400 font-normal mt-1.5">
          {qualification ? `${qualification}  ` : ""}{experience || role}
        </p>

        {subjects && (
          <p className="text-xs sm:text-sm text-slate-800 font-bold mt-3.5">
            Subjects: <span className="font-bold text-slate-900">{subjects}</span>
          </p>
        )}
      </div>
    </div>
  );
}
