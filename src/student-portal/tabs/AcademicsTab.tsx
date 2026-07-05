"use client";

import React from "react";
import { Binary, FlaskConical, PenTool, BookOpen, Database } from "lucide-react";

import AggregateStats from "../components/academics/AggregateStats";
import SubjectCards from "../components/academics/SubjectCards";

export default function AcademicsTab() {
  const subjects = [
    { name: "Mathematics", marks: 95, maxMarks: 100, grade: "A1", remarks: "Excellent logical skills", icon: Binary, color: "text-blue-600 bg-blue-50 border-blue-100/50" },
    { name: "Science (Physics/Chem)", marks: 92, maxMarks: 100, grade: "A1", remarks: "Great conceptual clarity", icon: FlaskConical, color: "text-emerald-600 bg-emerald-50 border-emerald-100/50" },
    { name: "English Core", marks: 94, maxMarks: 100, grade: "A1", remarks: "Superb vocabulary", icon: PenTool, color: "text-purple-600 bg-purple-50 border-purple-100/50" },
    { name: "Social Science", marks: 88, maxMarks: 100, grade: "A2", remarks: "Good analytical answers", icon: BookOpen, color: "text-amber-600 bg-amber-50 border-amber-100/50" },
    { name: "Computer Science", marks: 98, maxMarks: 100, grade: "A1", remarks: "Outstanding coding", icon: Database, color: "text-cyan-600 bg-cyan-50 border-cyan-100/50" }
  ];

  const totalObtained = subjects.reduce((sum, sub) => sum + sub.marks, 0);
  const totalMax = subjects.reduce((sum, sub) => sum + sub.maxMarks, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      <AggregateStats totalObtained={totalObtained} totalMax={totalMax} percentage={percentage} />
      <SubjectCards subjects={subjects} />
    </div>
  );
}
