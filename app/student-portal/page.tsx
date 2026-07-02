"use client";

import React, { useState, useEffect } from "react";
import PortalLogin from "../../src/components/student-portal/PortalLogin";
import PortalDashboard from "../../src/components/student-portal/PortalDashboard";

export default function StudentPortalPage() {
  const [student, setStudent] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if session exists in localStorage
    const savedStudent = localStorage.getItem("gv_student");
    if (savedStudent) {
      try {
        setStudent(JSON.parse(savedStudent));
      } catch (e) {
        localStorage.removeItem("gv_student");
      }
    }
  }, []);

  const handleLoginSuccess = (studentData: any) => {
    setStudent(studentData);
    localStorage.setItem("gv_student", JSON.stringify(studentData));
  };

  const handleLogout = () => {
    setStudent(null);
    localStorage.removeItem("gv_student");
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] pt-28 md:pt-36 pb-20 px-4 md:px-8 lg:px-16 flex flex-col justify-start items-center relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl w-full flex flex-col gap-6 md:gap-8">
        
        {/* Main Portal Title */}
        <div className="flex flex-col items-center text-center select-none mb-2">
          <span className="text-[10px] md:text-xs font-semibold md:font-bold text-brand-green uppercase tracking-[0.25em] mb-1.5">
            Academic Hub
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:font-extrabold text-brand-navy tracking-tight leading-tight">
            Student Portal
          </h1>
        </div>

        {/* Dynamic Authentication View */}
        {student ? (
          <PortalDashboard student={student} onLogout={handleLogout} />
        ) : (
          <PortalLogin onLoginSuccess={handleLoginSuccess} />
        )}

      </div>
    </div>
  );
}
