"use client";

import React, { useState } from "react";
import { Binary, FlaskConical, PenTool, BookOpen, Database, Download, Printer } from "lucide-react";

import AggregateStats from "../components/academics/AggregateStats";
import SubjectCards from "../components/academics/SubjectCards";

interface Subject {
  name: string;
  marks: number;
  maxMarks: number;
  grade: string;
  remarks: string;
  icon: any;
  color: string;
  classAvg: number;
}

export default function AcademicsTab() {
  const [selectedTerm, setSelectedTerm] = useState<string>("Unit Test-II");

  // Mock data for each term in the Academic calendar
  const termData: Record<string, { termName: string; subjects: Subject[] }> = {
    "Unit Test-I": {
      termName: "Unit Test-I (May 2026)",
      subjects: [
        { name: "Mathematics", marks: 92, maxMarks: 100, grade: "A1", remarks: "Good logical execution", icon: Binary, color: "text-blue-600 bg-blue-50 border-blue-100/50", classAvg: 75 },
        { name: "Science (Physics/Chem)", marks: 90, maxMarks: 100, grade: "A1", remarks: "Good experimental grasp", icon: FlaskConical, color: "text-emerald-600 bg-emerald-50 border-emerald-100/50", classAvg: 78 },
        { name: "English Core", marks: 89, maxMarks: 100, grade: "A2", remarks: "Strong comprehension", icon: PenTool, color: "text-purple-600 bg-purple-50 border-purple-100/50", classAvg: 80 },
        { name: "Social Science", marks: 85, maxMarks: 100, grade: "A2", remarks: "Detailed descriptions", icon: BookOpen, color: "text-amber-600 bg-amber-50 border-amber-100/50", classAvg: 74 },
        { name: "Computer Science", marks: 95, maxMarks: 100, grade: "A1", remarks: "Great logic building", icon: Database, color: "text-cyan-600 bg-cyan-50 border-cyan-100/50", classAvg: 82 }
      ]
    },
    "Unit Test-II": {
      termName: "Unit Test-II (July 2026)",
      subjects: [
        { name: "Mathematics", marks: 95, maxMarks: 100, grade: "A1", remarks: "Excellent logical skills", icon: Binary, color: "text-blue-600 bg-blue-50 border-blue-100/50", classAvg: 78 },
        { name: "Science (Physics/Chem)", marks: 92, maxMarks: 100, grade: "A1", remarks: "Great conceptual clarity", icon: FlaskConical, color: "text-emerald-600 bg-emerald-50 border-emerald-100/50", classAvg: 80 },
        { name: "English Core", marks: 94, maxMarks: 100, grade: "A1", remarks: "Superb vocabulary", icon: PenTool, color: "text-purple-600 bg-purple-50 border-purple-100/50", classAvg: 82 },
        { name: "Social Science", marks: 88, maxMarks: 100, grade: "A2", remarks: "Good analytical answers", icon: BookOpen, color: "text-amber-600 bg-amber-50 border-amber-100/50", classAvg: 77 },
        { name: "Computer Science", marks: 98, maxMarks: 100, grade: "A1", remarks: "Outstanding coding", icon: Database, color: "text-cyan-600 bg-cyan-50 border-cyan-100/50", classAvg: 84 }
      ]
    },
    "Half-Yearly Mock": {
      termName: "Half-Yearly Mock (July 2026)",
      subjects: [
        { name: "Mathematics", marks: 90, maxMarks: 100, grade: "A1", remarks: "Solid algebra foundation", icon: Binary, color: "text-blue-600 bg-blue-50 border-blue-100/50", classAvg: 73 },
        { name: "Science (Physics/Chem)", marks: 87, maxMarks: 100, grade: "A2", remarks: "Perform labs carefully", icon: FlaskConical, color: "text-emerald-600 bg-emerald-50 border-emerald-100/50", classAvg: 76 },
        { name: "English Core", marks: 91, maxMarks: 100, grade: "A1", remarks: "Creative writing is good", icon: PenTool, color: "text-purple-600 bg-purple-50 border-purple-100/50", classAvg: 79 },
        { name: "Social Science", marks: 82, maxMarks: 100, grade: "B1", remarks: "Focus on history dates", icon: BookOpen, color: "text-amber-600 bg-amber-50 border-amber-100/50", classAvg: 70 },
        { name: "Computer Science", marks: 96, maxMarks: 100, grade: "A1", remarks: "Excellent practical answers", icon: Database, color: "text-cyan-600 bg-cyan-50 border-cyan-100/50", classAvg: 81 }
      ]
    }
  };

  const currentData = termData[selectedTerm] || termData["Unit Test-II"];
  const subjects = currentData.subjects;

  const totalObtained = subjects.reduce((sum, sub) => sum + sub.marks, 0);
  const totalMax = subjects.reduce((sum, sub) => sum + sub.maxMarks, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-5 w-full animate-fadeIn pb-12">
      {/* Action panel with term selection & print buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-3.5 rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] shrink-0">
        {/* Toggle Switch (Pill Segmented Control) */}
        <div className="bg-slate-100/80 p-0.5 rounded-lg flex items-center w-full sm:w-auto border border-slate-200/20 select-none">
          {Object.keys(termData).map((term) => (
            <button
              key={term}
              onClick={() => setSelectedTerm(term)}
              className="text-[10px] font-bold py-1.5 px-3 rounded-md transition-all duration-200 cursor-pointer bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/30 data-[active=true]:bg-white data-[active=true]:text-slate-800 data-[active=true]:shadow-xs"
              data-active={selectedTerm === term}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto justify-end select-none">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-600 font-bold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer transition-colors w-full sm:w-auto font-sans"
          >
            <Printer size={13} />
            <span>Print Grades</span>
          </button>
          
          <button
            onClick={() => alert("Report Card download started. Please check your downloads.")}
            className="flex items-center justify-center gap-2 bg-brand-green hover:bg-emerald-700 text-white font-bold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer shadow-xs transition-colors w-full sm:w-auto font-sans"
          >
            <Download size={13} />
            <span>Report Card</span>
          </button>
        </div>
      </div>

      {/* Aggregate metrics */}
      <AggregateStats
        totalObtained={totalObtained}
        totalMax={totalMax}
        percentage={percentage}
        currentTerm={currentData.termName}
      />

      {/* Subjects cards ledger */}
      <SubjectCards subjects={subjects} />
    </div>
  );
}
