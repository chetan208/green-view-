"use client";

import React, { useState } from "react";
import { Download, FileText, Play, ArrowLeft, GraduationCap, BookOpen, FlaskConical, Video, BookMarked, CheckSquare, Presentation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChapterMaterial {
  notesSize: string;
  paperSize: string;
  videoTitle: string;
}

interface Chapter {
  id: number;
  name: string;
  materials: ChapterMaterial;
}

interface Subject {
  name: string;
  chapters: Chapter[];
}

interface ClassData {
  name: string;
  icon: React.ComponentType<any>;
  desc: string;
  subjects: Subject[];
}

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const getIconForClass = (num: number) => {
  if (num <= 5) return GraduationCap;
  if (num <= 10) return BookOpen;
  return FlaskConical;
};

const getDescForClass = (name: string, num: number) => {
  if (num <= 5) return `Primary syllabus worksheets and basic notes for ${name}.`;
  if (num <= 10) return `Syllabus guidelines and subject notes for ${name}.`;
  return `Advanced study materials and board exam preparation logs for ${name}.`;
};

const getSubjectsForClass = (num: number): Subject[] => {
  if (num <= 5) {
    return [
      {
        name: "Mathematics",
        chapters: [
          { id: num * 10 + 1, name: "Chapter 1: Basic Operations", materials: { notesSize: "1.2 MB", paperSize: "800 KB", videoTitle: `Class ${romanNumerals[num-1]} Math Intro` } },
          { id: num * 10 + 2, name: "Chapter 2: Fun with Shapes", materials: { notesSize: "1.4 MB", paperSize: "750 KB", videoTitle: "Shapes & Geometrical Figures" } }
        ]
      },
      {
        name: "English",
        chapters: [
          { id: num * 10 + 3, name: "Chapter 1: Reading Skills", materials: { notesSize: "950 KB", paperSize: "600 KB", videoTitle: "Reading & Phonetics" } }
        ]
      }
    ];
  } else if (num <= 10) {
    return [
      {
        name: "Mathematics",
        chapters: [
          { id: num * 100 + 1, name: "Chapter 1: Algebra & Formulae", materials: { notesSize: "2.5 MB", paperSize: "1.2 MB", videoTitle: "Algebraic Operations" } },
          { id: num * 100 + 2, name: "Chapter 2: Geometry Foundations", materials: { notesSize: "2.1 MB", paperSize: "1.0 MB", videoTitle: "Triangles & Circles Theorems" } }
        ]
      },
      {
        name: "Science",
        chapters: [
          { id: num * 100 + 3, name: "Chapter 1: Matter & Reactions", materials: { notesSize: "3.2 MB", paperSize: "1.5 MB", videoTitle: "Chemical Bonds and States" } }
        ]
      }
    ];
  } else {
    return [
      {
        name: "Physics",
        chapters: [
          { id: num * 1000 + 1, name: "Chapter 1: Advanced Mechanics", materials: { notesSize: "4.8 MB", paperSize: "2.9 MB", videoTitle: "Quantum Mechanics & Motion" } },
          { id: num * 1000 + 2, name: "Chapter 2: Electromagnetic Fields", materials: { notesSize: "4.1 MB", paperSize: "2.4 MB", videoTitle: "Magnetic Flux & Induction" } }
        ]
      },
      {
        name: "Chemistry",
        chapters: [
          { id: num * 1000 + 3, name: "Chapter 1: Organic Formulations", materials: { notesSize: "5.1 MB", paperSize: "3.2 MB", videoTitle: "Carbon Chains & Hydrocarbons" } }
        ]
      }
    ];
  }
};

const studyData: ClassData[] = Array.from({ length: 12 }, (_, i) => {
  const classNum = i + 1;
  const className = `Class ${romanNumerals[i]}`;
  return {
    name: className,
    icon: getIconForClass(classNum),
    desc: getDescForClass(className, classNum),
    subjects: getSubjectsForClass(classNum)
  };
});

type MaterialTab = "notes" | "lectures" | "papers";

export default function MaterialGrid() {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTab, setActiveTab] = useState<MaterialTab>("notes");
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const handleSelectClass = (cls: ClassData) => {
    setSelectedClass(cls);
    setSelectedSubject(null);
    setActiveVideoId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSubject = (sub: Subject) => {
    setSelectedSubject(sub);
    setActiveTab("notes");
    setActiveVideoId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
      setActiveVideoId(null);
    } else {
      setSelectedClass(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col gap-8 min-h-[500px]">
      
      {/* Breadcrumb Navigation when viewing nested levels */}
      {(selectedClass || selectedSubject) && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-xs md:text-sm font-bold text-slate-500 flex items-center gap-2">
            <span>Classes</span>
            {selectedClass && (
              <>
                <span className="text-slate-300">/</span>
                <span className={`${!selectedSubject ? "text-slate-800 font-extrabold" : "text-brand-green cursor-pointer hover:underline"}`} onClick={() => selectedSubject && handleBack()}>
                  {selectedClass.name}
                </span>
              </>
            )}
            {selectedSubject && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-slate-800 font-extrabold">{selectedSubject.name}</span>
              </>
            )}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Class Selection */}
        {!selectedClass && (
          <motion.div
            key="class-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Select Class:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studyData.map((cls, idx) => {
                const IconComponent = cls.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectClass(cls)}
                    className="group bg-white rounded-3xl border border-slate-100 p-8 flex flex-col items-center text-center shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-800 mb-2 group-hover:text-brand-green transition-colors">{cls.name}</h3>
                    <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed">{cls.desc}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Subject Selection */}
        {selectedClass && !selectedSubject && (
          <motion.div
            key="subject-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              Select Subject for <span className="text-brand-green">{selectedClass.name}</span>:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {selectedClass.subjects.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSubject(sub)}
                  className="group bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer w-full text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-brand-green flex items-center justify-center transition-colors shrink-0">
                    <BookMarked className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-extrabold text-slate-800 group-hover:text-brand-green transition-colors">{sub.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                      {sub.chapters.length} Chapters Available
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3: Material Hub with Type Tabs */}
        {selectedClass && selectedSubject && (
          <motion.div
            key="material-hub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Top Hub Header Tabs */}
            <div className="w-full flex justify-start md:justify-center border-b border-slate-100 pb-3">
              <div className="flex overflow-x-auto no-scrollbar max-w-full gap-1 md:gap-2 p-1 bg-slate-100/80 rounded-2xl flex-nowrap">
                {/* Notes Tab */}
                <button
                  onClick={() => { setActiveTab("notes"); setActiveVideoId(null); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold text-[10px] md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "notes"
                      ? "bg-white text-brand-green shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" /> Notes
                </button>

                {/* Video Lectures Tab */}
                <button
                  onClick={() => { setActiveTab("lectures"); setActiveVideoId(null); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold text-[10px] md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "lectures"
                      ? "bg-white text-brand-green shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <Presentation className="w-3.5 h-3.5 md:w-4 md:h-4" /> Video Lectures
                </button>

                {/* Question Papers Tab */}
                <button
                  onClick={() => { setActiveTab("papers"); setActiveVideoId(null); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold text-[10px] md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "papers"
                      ? "bg-white text-brand-green shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5 md:w-4 md:h-4" /> Question Papers
                </button>
              </div>
            </div>

            {/* Hub Material Content Grid */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-2 capitalize">
                {activeTab === "notes" && "Chapter Notes"}
                {activeTab === "lectures" && "Video Lectures"}
                {activeTab === "papers" && "Chapter Practice Papers"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedSubject.chapters.map((chapter) => {
                  const isVideoActive = activeVideoId === chapter.id;
                  
                  return (
                    <div
                      key={chapter.id}
                      className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col justify-between gap-4"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {selectedSubject.name} — Chapter {chapter.id % 10}
                        </span>
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug">
                          {chapter.name}
                        </h3>
                      </div>

                      {/* Dynamic Content based on Active Tab */}
                      {activeTab === "notes" && (
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            File Size: {chapter.materials.notesSize}
                          </span>
                          <button
                            onClick={() => alert(`Downloading Notes: ${chapter.name}`)}
                            className="inline-flex items-center gap-1.5 bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" /> Download Notes
                          </button>
                        </div>
                      )}

                      {activeTab === "papers" && (
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            File Size: {chapter.materials.paperSize}
                          </span>
                          <button
                            onClick={() => alert(`Downloading Question Paper: ${chapter.name}`)}
                            className="inline-flex items-center gap-1.5 bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" /> Download Paper
                          </button>
                        </div>
                      )}

                      {activeTab === "lectures" && (
                        <div className="flex flex-col border-t border-slate-50 pt-4 mt-1 gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-400 uppercase truncate max-w-[150px]">
                              {chapter.materials.videoTitle}
                            </span>
                            <button
                              onClick={() => setActiveVideoId(isVideoActive ? null : chapter.id)}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                isVideoActive
                                  ? "bg-red-50 text-red-600 border-red-100"
                                  : "bg-red-50/50 hover:bg-red-500 text-red-600 hover:text-white border-transparent"
                              }`}
                            >
                              <Play className="w-3.5 h-3.5" /> {isVideoActive ? "Close" : "Watch"}
                            </button>
                          </div>
                          
                          {/* Inline Video Player Box */}
                          <AnimatePresence>
                            {isVideoActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden w-full"
                              >
                                <div className="bg-slate-900 aspect-video w-full rounded-xl flex flex-col items-center justify-center text-white p-4 border border-slate-800 shadow-inner relative">
                                  <Video className="w-8 h-8 text-red-500 mb-2 animate-pulse" />
                                  <h4 className="font-extrabold text-xs text-center leading-snug px-2 mb-1">
                                    {chapter.materials.videoTitle}
                                  </h4>
                                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider text-center">
                                    Demo Stream Player
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
