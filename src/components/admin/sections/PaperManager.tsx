'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Trash2,
  FileText,
  Download,
  Upload,
  Video,
  CheckSquare,
  BookOpen,
  ArrowLeft,
  GraduationCap,
  FlaskConical,
  Loader2,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Presentation,
  Search,
  X,
  Play,
  FileCheck,
  BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StudyMaterialApi from '@/services/studyMaterialApi';
import { StudyMaterialItem, StudyMaterialType } from '@/types/studyMaterial';

const CLASSES = [
  'Class I', 'Class II', 'Class III', 'Class IV', 'Class V',
  'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X',
  'Class XI', 'Class XII'
];

const getIconForClass = (idx: number) => {
  if (idx < 5) return GraduationCap;
  if (idx < 10) return BookOpen;
  return FlaskConical;
};

const getDescForClass = (name: string, num: number) => {
  if (num <= 5) return `Primary syllabus worksheets and basic notes for ${name}.`;
  if (num <= 10) return `CBSE curriculum syllabus, notes and practice papers for ${name}.`;
  return `Advanced board preparation notes, lectures & papers for ${name}.`;
};

const getDefaultSubjects = (className: string) => {
  const num = CLASSES.indexOf(className) + 1;
  if (num <= 5) return ['Mathematics', 'English', 'EVS', 'Hindi'];
  if (num <= 10) return ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'];
  return ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Computer Science', 'Accountancy', 'Economics'];
};

export default function PaperManager() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<StudyMaterialType>('notes');
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customSubjects, setCustomSubjects] = useState<Record<string, string[]>>({});
  
  // Real API Data
  const [materials, setMaterials] = useState<StudyMaterialItem[]>([]);
  const [materialsSummary, setMaterialsSummary] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeVideo, setActiveVideo] = useState<StudyMaterialItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    chapterNumber: number;
    chapterName: string;
    title: string;
    description: string;
    youtubeUrl: string;
    paperYear: string;
    examType: string;
    totalMarks: string;
  }>({
    chapterNumber: 1,
    chapterName: '',
    title: '',
    description: '',
    youtubeUrl: '',
    paperYear: '2024-25',
    examType: 'Sample Paper',
    totalMarks: '80'
  });

  // Load summary for counts
  const loadSummary = async () => {
    try {
      const res = await StudyMaterialApi.getStructure();
      if (res.materialsSummary) {
        setMaterialsSummary(res.materialsSummary);
      }
    } catch (e) {
      console.error('Failed to load summary:', e);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  // Fetch materials for selected class, subject, and activeTab
  const loadMaterials = async () => {
    if (!selectedClass || !selectedSubject) return;
    setIsLoading(true);
    try {
      const data = await StudyMaterialApi.adminGetMaterials({
        className: selectedClass,
        subjectName: selectedSubject,
        type: activeTab
      });
      setMaterials(data);
    } catch (err) {
      console.error('Failed to fetch admin materials:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, [selectedClass, selectedSubject, activeTab]);

  const currentSubjects = useMemo(() => {
    if (!selectedClass) return [];
    const defaults = getDefaultSubjects(selectedClass);
    const custom = customSubjects[selectedClass] || [];
    
    // Also include subjects from summary if any
    const summarySubjects = materialsSummary
      .filter((m) => m._id.className === selectedClass)
      .map((m) => m._id.subjectName);

    return Array.from(new Set([...defaults, ...custom, ...summarySubjects]));
  }, [selectedClass, customSubjects, materialsSummary]);

  const handleAddSubject = () => {
    if (!selectedClass) return;
    const newSub = prompt(`Enter new subject name for ${selectedClass}:`);
    if (newSub && newSub.trim()) {
      setCustomSubjects((prev) => ({
        ...prev,
        [selectedClass]: [...(prev[selectedClass] || []), newSub.trim()]
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      chapterNumber: 1,
      chapterName: '',
      title: '',
      description: '',
      youtubeUrl: '',
      paperYear: '2024-25',
      examType: 'Sample Paper',
      totalMarks: '80'
    });
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !selectedSubject) return;

    if (!formData.title || !formData.chapterName) {
      alert('Please provide Chapter Name and Title.');
      return;
    }

    if (activeTab === 'notes' || activeTab === 'papers') {
      if (!selectedFile) {
        alert('Please select a PDF document to upload.');
        return;
      }
    }

    if (activeTab === 'lectures' && !formData.youtubeUrl) {
      alert('Please provide a valid YouTube video URL.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('className', selectedClass);
      data.append('subjectName', selectedSubject);
      data.append('chapterNumber', formData.chapterNumber.toString());
      data.append('chapterName', formData.chapterName);
      data.append('type', activeTab);
      data.append('title', formData.title);
      data.append('description', formData.description || '');

      if (activeTab === 'lectures') {
        data.append('youtubeUrl', formData.youtubeUrl);
      } else if (selectedFile) {
        data.append('pdf', selectedFile);
      }

      if (activeTab === 'papers') {
        data.append('paperYear', formData.paperYear);
        data.append('examType', formData.examType);
        if (formData.totalMarks) {
          data.append('totalMarks', formData.totalMarks);
        }
      }

      await StudyMaterialApi.adminCreateMaterial(data);

      setShowModal(false);
      setSelectedFile(null);
      await loadMaterials();
      await loadSummary();
    } catch (error: any) {
      console.error('Error saving study material:', error);
      alert(`Error saving material: ${error.message || 'Server error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material and remove its cloud file?')) {
      return;
    }
    try {
      await StudyMaterialApi.adminDeleteMaterial(id);
      setMaterials((prev) => prev.filter((m) => m._id !== id));
      await loadSummary();
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('Failed to delete material');
    }
  };

  const handleSeed = async () => {
    if (!confirm('Initialize standard syllabus and sample resources into database?')) return;
    try {
      setIsLoading(true);
      await StudyMaterialApi.adminSeedDefaults();
      await loadMaterials();
      await loadSummary();
      alert('Standard syllabus initialized successfully!');
    } catch (e) {
      alert('Seed complete or already initialized.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
      setActiveVideo(null);
      setSearchQuery('');
    } else {
      setSelectedClass(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <div className="space-y-6 text-slate-800 min-h-[500px]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">Study Materials Manager</h2>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage Cloudinary PDF Notes, YouTube Lectures, and Question Papers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSeed}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> Seed Syllabus
          </button>
        </div>
      </div>

      {/* Breadcrumb Navigation when viewing nested levels */}
      {(selectedClass || selectedSubject) && (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="text-xs md:text-sm font-semibold text-slate-500 flex items-center gap-2">
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
                      !selectedSubject ? 'text-slate-900 font-bold' : 'cursor-pointer hover:text-brand-green transition-colors'
                    }`}
                    onClick={() => {
                      setSelectedSubject(null);
                      setActiveVideo(null);
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

          <div className="flex items-center gap-2">
            {selectedSubject && (
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${selectedSubject}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-green font-medium transition"
                />
              </div>
            )}
            <button
              onClick={loadMaterials}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ==================== STEP 1: CLASS SELECTION ==================== */}
        {!selectedClass && (
          <motion.div
            key="class-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Select Class to Manage
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CLASSES.map((clsName, idx) => {
                const classNum = idx + 1;
                const IconComponent = getIconForClass(idx);
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
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-white rounded-2xl border border-slate-200 p-5 flex flex-col items-center text-center hover:border-brand-green/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer w-full text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-emerald-50 group-hover:text-brand-green flex items-center justify-center mb-3 transition-colors">
                      <IconComponent className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    <h4 className="text-base font-bold text-slate-800 mb-1 group-hover:text-brand-green transition-colors">
                      {clsName}
                    </h4>
                    <p className="text-slate-400 text-xs font-normal line-clamp-2 mb-3">
                      {getDescForClass(clsName, classNum)}
                    </p>

                    <div className="mt-auto pt-2.5 border-t border-slate-100 w-full flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-brand-green transition-colors">
                      <span>Manage</span>
                      {classMaterialCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-brand-green text-[10px] font-bold">
                          {classMaterialCount} files
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Subjects for {selectedClass}
              </h3>
              <button
                onClick={handleAddSubject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-slate-300 hover:border-brand-green bg-white text-xs font-bold text-slate-600 hover:text-brand-green transition cursor-pointer"
              >
                <Plus size={14} /> Add Subject
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentSubjects.map((subName) => {
                const subMaterialCount = materialsSummary
                  .filter((m) => m._id.className === selectedClass && m._id.subjectName === subName)
                  .reduce((acc, curr) => acc + curr.count, 0);

                return (
                  <button
                    key={subName}
                    onClick={() => {
                      setSelectedSubject(subName);
                      setActiveTab('notes');
                      setActiveVideo(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 hover:border-brand-green/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer w-full text-left"
                  >
                    <div className="w-11 h-11 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-emerald-50 group-hover:text-brand-green flex items-center justify-center transition-colors shrink-0">
                      <BookMarked className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm font-bold text-slate-800 group-hover:text-brand-green transition-colors truncate">
                        {subName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {subMaterialCount > 0 ? (
                          <span className="text-emerald-700 font-semibold">{subMaterialCount} materials</span>
                        ) : (
                          '0 materials uploaded'
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================== STEP 3: TABBED MATERIAL HUB (SAME AS PUBLIC VIEW) ==================== */}
        {selectedClass && selectedSubject && (
          <motion.div
            key="material-hub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Top Interactive Material Type Tabs (Pill style matching public site) */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex overflow-x-auto no-scrollbar max-w-full gap-1.5 p-1.5 bg-slate-100 rounded-2xl flex-nowrap shadow-inner">
                {/* Notes Tab */}
                <button
                  onClick={() => {
                    setActiveTab('notes');
                    setActiveVideo(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'notes'
                      ? 'bg-white text-brand-green shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4 text-blue-500" /> PDF Notes
                </button>

                {/* Video Lectures Tab */}
                <button
                  onClick={() => {
                    setActiveTab('lectures');
                    setActiveVideo(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'lectures'
                      ? 'bg-white text-brand-green shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Presentation className="w-4 h-4 text-red-500" /> Video Lectures
                </button>

                {/* Question Papers Tab */}
                <button
                  onClick={() => {
                    setActiveTab('papers');
                    setActiveVideo(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'papers'
                      ? 'bg-white text-brand-green shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CheckSquare className="w-4 h-4 text-emerald-500" /> Question Papers
                </button>
              </div>

              {/* Add New Material Button (Context-Aware) */}
              <button
                onClick={handleOpenAddModal}
                className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-sm border-0 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                <span>
                  {activeTab === 'notes' && 'Upload PDF Notes'}
                  {activeTab === 'lectures' && 'Add Video Lecture'}
                  {activeTab === 'papers' && 'Upload Question Paper'}
                </span>
              </button>
            </div>

            {/* Video Modal Player if active */}
            {activeVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-800 p-4 md:p-6 mb-2"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-white">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-red-500" />
                    <span className="font-bold text-sm md:text-base">
                      {activeVideo.videoTitle || activeVideo.title}
                    </span>
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
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                      Video stream not available
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Material List Grouped by Chapters */}
            {isLoading ? (
              <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
                <Loader2 className="w-6 h-6 animate-spin text-brand-green mr-2" />
                <span className="text-sm font-semibold text-slate-600">Loading {activeTab}...</span>
              </div>
            ) : groupedChapters.length > 0 ? (
              <div className="space-y-6">
                {groupedChapters.map((chapter) => (
                  <div key={chapter.chapterNumber} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-brand-green flex items-center justify-center text-xs font-bold shrink-0">
                        {chapter.chapterNumber}
                      </div>
                      <h4 className="text-sm md:text-base font-bold text-slate-800 tracking-tight">
                        {chapter.chapterName}
                      </h4>
                      <span className="text-xs font-semibold text-slate-400">
                        ({chapter.items.length} {activeTab})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {chapter.items.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between gap-4"
                        >
                          <div className="flex flex-col gap-1.5">
                            {/* Type badge and downloads count */}
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <span className="flex items-center gap-1">
                                {item.type === 'notes' && <FileText className="w-3.5 h-3.5 text-blue-500" />}
                                {item.type === 'lectures' && <Video className="w-3.5 h-3.5 text-red-500" />}
                                {item.type === 'papers' && <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />}
                                <span>{item.type}</span>
                              </span>

                              {item.downloadsCount > 0 && (
                                <span className="text-slate-400">{item.downloadsCount} downloads</span>
                              )}
                            </div>

                            <h5 className="font-bold text-slate-900 text-sm leading-snug">
                              {item.title}
                            </h5>

                            {item.description && (
                              <p className="text-slate-500 text-xs font-normal line-clamp-2">
                                {item.description}
                              </p>
                            )}

                            {item.type === 'papers' && (
                              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mt-1">
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {item.examType || 'Sample Paper'}
                                </span>
                                {item.paperYear && (
                                  <span className="text-slate-400">{item.paperYear}</span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Video Thumbnail if lecture */}
                          {item.type === 'lectures' && item.thumbnailUrl && (
                            <div
                              onClick={() => setActiveVideo(item)}
                              className="relative aspect-video rounded-xl overflow-hidden group/thumb cursor-pointer bg-slate-100"
                            >
                              <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-200"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                                  <Play className="w-4 h-4 fill-white ml-0.5" />
                                </div>
                              </div>
                              {item.duration && (
                                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold">
                                  {item.duration}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action Footer */}
                          <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase">
                              {item.formattedSize || (item.youtubeUrl ? 'YouTube' : 'PDF')}
                            </span>

                            <div className="flex items-center gap-2">
                              {item.pdfUrl && (
                                <a
                                  href={item.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 rounded-xl transition cursor-pointer"
                                  title="Preview PDF"
                                >
                                  <ExternalLink size={14} />
                                </a>
                              )}

                              {item.type === 'lectures' && (
                                <button
                                  onClick={() => setActiveVideo(item)}
                                  className="text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 p-2 rounded-xl transition cursor-pointer"
                                  title="Play Video"
                                >
                                  <Play size={14} />
                                </button>
                              )}

                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 p-2 rounded-xl transition cursor-pointer"
                                title="Delete material"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mb-3">
                  <BookOpen className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">
                  No {activeTab} Found
                </h4>
                <p className="text-xs text-slate-500 max-w-sm font-medium mb-4">
                  No {activeTab} uploaded yet for {selectedSubject} ({selectedClass}). Click the button below to add one.
                </p>
                <button
                  onClick={handleOpenAddModal}
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus size={14} /> Add {activeTab === 'notes' ? 'Notes' : activeTab === 'lectures' ? 'Lecture' : 'Paper'}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== CLEAN CONTEXT-AWARE UPLOAD MODAL ==================== */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {activeTab === 'notes' && 'Upload PDF Notes'}
                  {activeTab === 'lectures' && 'Add Video Lecture'}
                  {activeTab === 'papers' && 'Upload Question Paper'}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {selectedSubject} • {selectedClass}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Chapter # *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.chapterNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, chapterNumber: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-brand-green font-medium transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Chapter / Topic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.chapterName}
                    onChange={(e) => setFormData({ ...formData, chapterName: e.target.value })}
                    placeholder="e.g., Chapter 1: Introduction"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-brand-green font-medium transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Material Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={
                    activeTab === 'notes'
                      ? 'e.g., Complete Formula Sheet & Notes'
                      : activeTab === 'lectures'
                      ? 'e.g., Concepts & Problem Solving Class'
                      : 'e.g., Annual Exam 2024-25 Sample Paper'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-brand-green font-medium transition"
                />
              </div>

              {/* YouTube Video URL if lectures */}
              {activeTab === 'lectures' ? (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-brand-green font-medium transition"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Upload PDF Document *
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                    <Upload size={20} className="text-slate-400 mb-1" />
                    <p className="text-xs font-semibold text-slate-600">
                      {selectedFile ? selectedFile.name : 'Click to browse PDF file'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Extra Paper Fields */}
              {activeTab === 'papers' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Exam Type
                    </label>
                    <input
                      type="text"
                      value={formData.examType}
                      onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                      placeholder="e.g. Sample Paper, Unit Test"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-brand-green font-medium transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Academic Year
                    </label>
                    <input
                      type="text"
                      value={formData.paperYear}
                      onChange={(e) => setFormData({ ...formData, paperYear: e.target.value })}
                      placeholder="e.g. 2024-25"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-brand-green font-medium transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Brief Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key topics or instructions..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-brand-green font-medium transition resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm border-0 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </>
                  ) : (
                    'Save Material'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
