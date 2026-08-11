"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Download,
  FileText,
  Play,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Video,
  BookMarked,
  CheckSquare,
  Presentation,
  Search,
  ExternalLink,
  Eye,
  Calendar,
  Award,
  Loader2,
  X,
  FileCheck,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StudyMaterialApi from "@/services/studyMaterialApi";
import { StudyMaterialItem, StudyMaterialType } from "@/types/studyMaterial";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const getIconForClass = (num: number) => {
  if (num <= 5) return GraduationCap;
  if (num <= 10) return BookOpen;
  return FlaskConical;
};

const getDescForClass = (name: string, num: number) => {
  if (num <= 5) return `Primary syllabus worksheets, foundational notes and tutorials for ${name}.`;
  if (num <= 10) return `CBSE curriculum syllabus guidelines, subject notes, and practice papers for ${name}.`;
  return `Advanced board preparation notes, video lectures, and previous year question papers for ${name}.`;
};

const getDefaultSubjectsForClass = (num: number): string[] => {
  if (num <= 5) return ["Mathematics", "English", "EVS", "Hindi"];
  if (num <= 10) return ["Mathematics", "Science", "Social Science", "English", "Hindi"];
  return ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science", "Accountancy", "Economics"];
};

export default function MaterialGrid() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<StudyMaterialType>("notes");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Real dynamic backend data state
  const [materials, setMaterials] = useState<StudyMaterialItem[]>([]);
  const [materialsSummary, setMaterialsSummary] = useState<any[]>([]);
  const [customSubjectsCatalog, setCustomSubjectsCatalog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState<StudyMaterialItem | null>(null);

  // Initial structure load
  useEffect(() => {
    async function loadStructure() {
      try {
        const structure = await StudyMaterialApi.getStructure();
        if (structure.materialsSummary) {
          setMaterialsSummary(structure.materialsSummary);
        }
        if (structure.subjectsCatalog) {
          setCustomSubjectsCatalog(structure.subjectsCatalog);
        }
      } catch (err) {
        console.error("Failed to load initial academic structure:", err);
      }
    }
    loadStructure();
  }, []);

  // Fetch materials when Class or Subject changes
  useEffect(() => {
    if (!selectedClass || !selectedSubject) {
      setMaterials([]);
      return;
    }

    async function loadMaterials() {
      setIsLoading(true);
      try {
        const data = await StudyMaterialApi.getMaterials({
          className: selectedClass || undefined,
          subjectName: selectedSubject || undefined,
          type: activeTab
        });
        setMaterials(data);
      } catch (error) {
        console.error("Failed to fetch study materials:", error);
        setMaterials([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadMaterials();
  }, [selectedClass, selectedSubject, activeTab]);

  // Calculate dynamic subjects for selected class
  const classSubjects = useMemo(() => {
    if (!selectedClass) return [];
    const classNum = parseInt(selectedClass.replace("Class ", "")) || (CLASSES_LIST.indexOf(selectedClass) + 1);
    const defaults = getDefaultSubjectsForClass(classNum);
    
    // Add subjects from database catalog for this class
    const dbSubjects = customSubjectsCatalog
      .filter((s) => s.className === selectedClass)
      .map((s) => s.subjectName);

    // Add subjects from summary
    const summarySubjects = materialsSummary
      .filter((m) => m._id.className === selectedClass)
      .map((m) => m._id.subjectName);

    return Array.from(new Set([...defaults, ...dbSubjects, ...summarySubjects]));
  }, [selectedClass, customSubjectsCatalog, materialsSummary]);

  // Group materials by chapter
  const groupedChapters = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const filtered = materials.filter((m) => {
      if (!query) return true;
      return (
        m.title.toLowerCase().includes(query) ||
        m.chapterName.toLowerCase().includes(query) ||
        (m.description && m.description.toLowerCase().includes(query))
      );
    });

    const groups: { [key: string]: { chapterNumber: number; chapterName: string; items: StudyMaterialItem[] } } = {};

    filtered.forEach((item) => {
      const key = `${item.chapterNumber}-${item.chapterName}`;
      if (!groups[key]) {
        groups[key] = {
          chapterNumber: item.chapterNumber,
          chapterName: item.chapterName,
          items: []
        };
      }
      groups[key].items.push(item);
    });

    return Object.values(groups).sort((a, b) => a.chapterNumber - b.chapterNumber);
  }, [materials, searchQuery]);

  // Download handler
  const handleDownload = async (item: StudyMaterialItem, url?: string) => {
    const targetUrl = url || item.pdfUrl;
    if (!targetUrl) return;

    // Track download in background
    StudyMaterialApi.trackDownload(item._id);

    // Open/Download file
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  // Video play handler
  const handlePlayVideo = (item: StudyMaterialItem) => {
    setActiveVideo(item);
    StudyMaterialApi.trackView(item._id);
  };

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
      setActiveVideo(null);
      setSearchQuery("");
    } else {
      setSelectedClass(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col gap-8 min-h-[500px]">
      {/* Breadcrumb Navigation */}
      {(selectedClass || selectedSubject) && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-brand-green/40 hover:bg-emerald-50/50 text-slate-700 hover:text-brand-green transition-all cursor-pointer shadow-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="text-xs md:text-sm font-medium md:font-semibold text-slate-500 flex items-center gap-2">
              <span
                className="cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => {
                  setSelectedClass(null);
                  setSelectedSubject(null);
                  setActiveVideo(null);
                }}
              >
                All Classes
              </span>
              {selectedClass && (
                <>
                  <span className="text-slate-300">/</span>
                  <span
                    className={`${
                      !selectedSubject
                        ? "text-slate-900 font-bold"
                        : "text-brand-green cursor-pointer hover:underline"
                    }`}
                    onClick={() => {
                      if (selectedSubject) {
                        setSelectedSubject(null);
                        setActiveVideo(null);
                      }
                    }}
                  >
                    {selectedClass}
                  </span>
                </>
              )}
              {selectedSubject && (
                <>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-900 font-bold">{selectedSubject}</span>
                </>
              )}
            </div>
          </div>

          {/* Search bar inside Subject/Material View */}
          {selectedSubject && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search in ${selectedSubject}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ==================== STEP 1: CLASS SELECTION ==================== */}
        {!selectedClass && (
          <motion.div
            key="class-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-serif">
                  Select Your Class
                </h2>
                <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
                  Choose a grade level to explore verified notes, video lectures, and practice question papers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {CLASSES_LIST.map((clsName, idx) => {
                const classNum = idx + 1;
                const IconComponent = getIconForClass(classNum);
                const desc = getDescForClass(clsName, classNum);
                const classMaterialCount = materialsSummary
                  .filter((m) => m._id.className === clsName)
                  .reduce((acc, curr) => acc + curr.count, 0);

                return (
                  <button
                    key={clsName}
                    onClick={() => {
                      setSelectedClass(clsName);
                      setSelectedSubject(null);
                      setActiveVideo(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group bg-white rounded-3xl border border-slate-100/90 p-7 flex flex-col items-center text-center shadow-[0_2px_12px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-6px_rgba(15,169,88,0.12)] hover:border-brand-green/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full relative overflow-hidden text-left"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7 stroke-[1.75]" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-brand-green transition-colors">
                      {clsName}
                    </h3>
                    <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2 mb-3">
                      {desc}
                    </p>

                    <div className="mt-auto pt-3 border-t border-slate-50 w-full flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-brand-green transition-colors">
                      <span>Explore Resources</span>
                      {classMaterialCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-brand-green text-[10px] font-bold">
                          {classMaterialCount} items
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================== STEP 2: SUBJECT SELECTION ==================== */}
        {selectedClass && !selectedSubject && (
          <motion.div
            key="subject-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-serif">
                Select Subject for <span className="text-brand-green">{selectedClass}</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
                Choose a subject to access organized chapter-wise study materials.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {classSubjects.map((subName) => {
                const subMaterialCount = materialsSummary
                  .filter((m) => m._id.className === selectedClass && m._id.subjectName === subName)
                  .reduce((acc, curr) => acc + curr.count, 0);

                return (
                  <button
                    key={subName}
                    onClick={() => {
                      setSelectedSubject(subName);
                      setActiveTab("notes");
                      setActiveVideo(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group bg-white rounded-2xl border border-slate-100/90 p-6 flex items-center gap-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,169,88,0.1)] hover:border-brand-green/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer w-full text-left"
                  >
                    <div className="w-13 h-13 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-brand-green flex items-center justify-center transition-colors shrink-0 shadow-sm">
                      <BookMarked className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors truncate">
                        {subName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium mt-1 flex items-center gap-1.5">
                        {subMaterialCount > 0 ? (
                          <span className="text-emerald-700 font-semibold">{subMaterialCount} materials available</span>
                        ) : (
                          <span>Standard CBSE Syllabus</span>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================== STEP 3: MATERIAL HUB (NOTES / LECTURES / PAPERS) ==================== */}
        {selectedClass && selectedSubject && (
          <motion.div
            key="material-hub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            {/* Top Interactive Material Type Tabs */}
            <div className="w-full flex justify-start md:justify-center border-b border-slate-100 pb-4">
              <div className="flex overflow-x-auto no-scrollbar max-w-full gap-1.5 md:gap-2 p-1.5 bg-slate-100/90 rounded-2xl flex-nowrap shadow-inner">
                {/* Notes Tab */}
                <button
                  onClick={() => {
                    setActiveTab("notes");
                    setActiveVideo(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "notes"
                      ? "bg-white text-brand-green shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4" /> PDF Notes
                </button>

                {/* Video Lectures Tab */}
                <button
                  onClick={() => {
                    setActiveTab("lectures");
                    setActiveVideo(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "lectures"
                      ? "bg-white text-brand-green shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Presentation className="w-4 h-4" /> Video Lectures
                </button>

                {/* Question Papers Tab */}
                <button
                  onClick={() => {
                    setActiveTab("papers");
                    setActiveVideo(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "papers"
                      ? "bg-white text-brand-green shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <CheckSquare className="w-4 h-4" /> Question Papers
                </button>
              </div>
            </div>

            {/* Video Modal Player if active */}
            {activeVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 p-4 md:p-6 mb-2"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-white">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-red-500" />
                    <span className="font-bold text-sm md:text-base">{activeVideo.videoTitle || activeVideo.title}</span>
                  </div>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="aspect-video w-full mt-4 rounded-2xl overflow-hidden bg-black shadow-inner">
                  {activeVideo.youtubeVideoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : activeVideo.youtubeUrl ? (
                    <iframe
                      src={activeVideo.youtubeUrl}
                      title={activeVideo.title}
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                      Video stream not available
                    </div>
                  )}
                </div>

                {activeVideo.description && (
                  <p className="text-slate-400 text-xs md:text-sm mt-4 font-normal leading-relaxed">
                    {activeVideo.description}
                  </p>
                )}
              </motion.div>
            )}

            {/* Material Content List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-4 animate-pulse"
                  >
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-6 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/2 mt-auto" />
                  </div>
                ))}
              </div>
            ) : groupedChapters.length > 0 ? (
              <div className="space-y-8">
                {groupedChapters.map((chapter) => (
                  <div key={chapter.chapterNumber} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center text-xs font-bold shrink-0">
                        {chapter.chapterNumber}
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">
                        {chapter.chapterName}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {chapter.items.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between gap-4"
                        >
                          <div className="flex flex-col gap-1.5">
                            {/* Type and Meta Badges */}
                            <div className="flex items-center justify-between gap-2 flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <span className="flex items-center gap-1 text-slate-500">
                                {item.type === "notes" && <FileText className="w-3.5 h-3.5 text-blue-500" />}
                                {item.type === "lectures" && <Video className="w-3.5 h-3.5 text-red-500" />}
                                {item.type === "papers" && <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />}
                                <span>{item.type}</span>
                              </span>

                              {item.downloadsCount > 0 && (
                                <span className="text-[10px] font-semibold text-slate-400">
                                  {item.downloadsCount} downloads
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                              {item.title}
                            </h4>

                            {item.description && (
                              <p className="text-slate-500 text-xs font-normal line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* NOTES SPECIFIC ACTIONS */}
                          {item.type === "notes" && (
                            <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                                {item.formattedSize || "PDF"}
                              </span>
                              <button
                                onClick={() => handleDownload(item)}
                                className="inline-flex items-center gap-1.5 bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                              >
                                <Download className="w-3.5 h-3.5" /> Download PDF
                              </button>
                            </div>
                          )}

                          {/* LECTURES SPECIFIC ACTIONS */}
                          {item.type === "lectures" && (
                            <div className="flex flex-col border-t border-slate-50 pt-3 mt-1 gap-3">
                              {/* Thumbnail preview if available */}
                              {item.thumbnailUrl && (
                                <div
                                  onClick={() => handlePlayVideo(item)}
                                  className="relative aspect-video rounded-xl overflow-hidden group/thumb cursor-pointer bg-slate-100"
                                >
                                  <img
                                    src={item.thumbnailUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/20 flex items-center justify-center transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                                      <Play className="w-4 h-4 fill-white ml-0.5" />
                                    </div>
                                  </div>
                                  {item.duration && (
                                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold">
                                      {item.duration}
                                    </span>
                                  )}
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[150px]">
                                  {item.duration ? `Duration: ${item.duration}` : "YouTube Lecture"}
                                </span>
                                <button
                                  onClick={() => handlePlayVideo(item)}
                                  className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5" /> Watch Lecture
                                </button>
                              </div>
                            </div>
                          )}

                          {/* PAPERS SPECIFIC ACTIONS */}
                          {item.type === "papers" && (
                            <div className="flex flex-col border-t border-slate-50 pt-3 mt-1 gap-2">
                              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px]">
                                  {item.examType || "Sample Paper"}
                                </span>
                                {item.paperYear && (
                                  <span className="text-slate-400 font-bold">{item.paperYear}</span>
                                )}
                              </div>

                              <div className="flex items-center justify-between pt-2">
                                <span className="text-[11px] font-semibold text-slate-400 uppercase">
                                  {item.formattedSize || "PDF"}
                                </span>
                                <div className="flex items-center gap-2">
                                  {item.hasSolution && item.solutionPdfUrl && (
                                    <button
                                      onClick={() => handleDownload(item, item.solutionPdfUrl)}
                                      className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                                    >
                                      <FileCheck className="w-3 h-3" /> Solution
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDownload(item)}
                                    className="inline-flex items-center gap-1.5 bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                                  >
                                    <Download className="w-3.5 h-3.5" /> Download Paper
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  No {activeTab} Uploaded Yet
                </h3>
                <p className="text-xs md:text-sm text-slate-500 max-w-md font-medium">
                  Materials for <span className="text-slate-800 font-semibold">{selectedSubject}</span> ({selectedClass}) will be uploaded by faculty shortly.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CLASSES_LIST = [
  "Class I", "Class II", "Class III", "Class IV", "Class V",
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
  "Class XI", "Class XII"
];
