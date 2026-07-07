'use client';

import React, { useState, useMemo } from "react";
import { Plus, Trash2, FileText, Download, Upload, Video, CheckSquare, BookOpen, ArrowLeft, GraduationCap, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CLASSES = [
  "Class I", "Class II", "Class III", "Class IV", "Class V", 
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X", 
  "Class XI", "Class XII"
];

const getIconForClass = (idx: number) => {
  if (idx < 5) return <GraduationCap className="w-6 h-6 stroke-[1.5]" />;
  if (idx < 10) return <BookOpen className="w-6 h-6 stroke-[1.5]" />;
  return <FlaskConical className="w-6 h-6 stroke-[1.5]" />;
};

const getDefaultSubjects = (className: string) => {
  const num = CLASSES.indexOf(className) + 1;
  if (num <= 5) return ["Mathematics", "English", "EVS", "Hindi"];
  if (num <= 10) return ["Mathematics", "Science", "Social Science", "English", "Hindi"];
  return ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science", "Accountancy", "Business Studies", "Economics"];
};

export default function PaperManager() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [customSubjects, setCustomSubjects] = useState<Record<string, string[]>>({});

  const currentSubjects = useMemo(() => {
    if (!selectedClass) return [];
    const defaults = getDefaultSubjects(selectedClass);
    const custom = customSubjects[selectedClass] || [];
    return Array.from(new Set([...defaults, ...custom]));
  }, [selectedClass, customSubjects]);

  const handleAddSubject = () => {
    if (!selectedClass) return;
    const newSub = prompt(`Enter new subject name for ${selectedClass}:`);
    if (newSub && newSub.trim()) {
      setCustomSubjects(prev => ({
        ...prev,
        [selectedClass]: [...(prev[selectedClass] || []), newSub.trim()]
      }));
    }
  };

  const [materials, setMaterials] = useState([
    { id: 1, class: "Class XII", subject: "Physics", chapter: "Chapter 1: Electrostatics", type: "notes", title: "Handwritten Notes", size: "2.4 MB" },
    { id: 2, class: "Class XII", subject: "Physics", chapter: "Chapter 1: Electrostatics", type: "video", title: "Coulomb's Law Explained", size: "Link" },
    { id: 3, class: "Class XII", subject: "Physics", chapter: "Chapter 1: Electrostatics", type: "papers", title: "Previous Year PYQ", size: "1.2 MB" },
  ]);

  const [newMaterial, setNewMaterial] = useState({ chapter: "", type: "notes", title: "" });

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => m.class === selectedClass && m.subject === selectedSubject);
  }, [materials, selectedClass, selectedSubject]);

  const chapters = useMemo(() => {
    return Array.from(new Set(filteredMaterials.map(m => m.chapter)));
  }, [filteredMaterials]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.title || !newMaterial.chapter) return;

    setMaterials([...materials, { 
      id: Date.now(), 
      class: selectedClass!, 
      subject: selectedSubject!, 
      chapter: newMaterial.chapter, 
      type: newMaterial.type, 
      title: newMaterial.title, 
      size: newMaterial.type === 'video' ? 'Link' : '1.5 MB' 
    }]);
    setNewMaterial({ chapter: "", type: "notes", title: "" });
    setShowForm(false);
  };

  const getIconForType = (type: string) => {
    if (type === 'notes') return <FileText size={16} className="text-blue-500" />;
    if (type === 'video') return <Video size={16} className="text-red-500" />;
    return <CheckSquare size={16} className="text-emerald-500" />;
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Study Materials Manager</h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Upload and organize notes, videos, and question papers.</p>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      {(selectedClass || selectedSubject) && (
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => {
              if (selectedSubject) setSelectedSubject(null);
              else setSelectedClass(null);
              setShowForm(false);
            }}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-semibold text-slate-500 flex items-center gap-2">
            <span className="cursor-pointer hover:text-brand-green" onClick={() => { setSelectedClass(null); setSelectedSubject(null); setShowForm(false); }}>Classes</span>
            {selectedClass && (
              <>
                <span className="text-slate-300">/</span>
                <span className={`${!selectedSubject ? "text-slate-800 font-bold" : "cursor-pointer hover:text-brand-green"}`} onClick={() => { setSelectedSubject(null); setShowForm(false); }}>
                  {selectedClass}
                </span>
              </>
            )}
            {selectedSubject && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-slate-800 font-bold">{selectedSubject}</span>
              </>
            )}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Class Selection */}
        {!selectedClass && (
          <motion.div
            key="classes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {CLASSES.map((cls, idx) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-brand-green/30 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-brand-green/10 group-hover:text-brand-green flex items-center justify-center transition-colors">
                  {getIconForClass(idx)}
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-brand-green">{cls}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* STEP 2: Subject Selection */}
        {selectedClass && !selectedSubject && (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {currentSubjects.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:border-brand-green/30 hover:shadow-md transition-all group cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-brand-green/10 group-hover:text-brand-green flex items-center justify-center transition-colors shrink-0">
                  <BookOpen size={20} />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-brand-green">{sub}</span>
              </button>
            ))}
            
            <button
              onClick={handleAddSubject}
              className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-5 flex items-center justify-center gap-2 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer text-slate-500 hover:text-slate-700"
            >
              <Plus size={20} />
              <span className="font-semibold">Add Subject</span>
            </button>
          </motion.div>
        )}

        {/* STEP 3: Materials Management */}
        {selectedClass && selectedSubject && (
          <motion.div
            key="materials"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex justify-end">
              {!showForm && (
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-sm border-0 cursor-pointer"
                >
                  <Plus size={16} /> Add Material
                </button>
              )}
            </div>

            {showForm && (
              <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Upload New Material for {selectedSubject}</h3>
                  <button type="button" onClick={() => setShowForm(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Chapter / Topic Name *</label>
                    <input type="text" required value={newMaterial.chapter} onChange={e => setNewMaterial({...newMaterial, chapter: e.target.value})} placeholder="e.g., Chapter 1: Introduction" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Material Title *</label>
                    <input type="text" required value={newMaterial.title} onChange={e => setNewMaterial({...newMaterial, title: e.target.value})} placeholder="e.g., Handwritten Notes" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Material Type *</label>
                  <div className="flex gap-4">
                    {['notes', 'video', 'papers'].map(type => (
                      <label key={type} className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${newMaterial.type === type ? 'border-brand-green bg-emerald-50 text-brand-green' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}>
                        <input type="radio" name="materialType" value={type} checked={newMaterial.type === type} onChange={e => setNewMaterial({...newMaterial, type: e.target.value})} className="hidden" />
                        {type === 'notes' && <FileText size={20} className="mb-2" />}
                        {type === 'video' && <Video size={20} className="mb-2" />}
                        {type === 'papers' && <CheckSquare size={20} className="mb-2" />}
                        <span className="text-xs font-semibold capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {newMaterial.type !== 'video' ? (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Upload File (PDF/Doc) *</label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-all">
                      <Upload size={20} className="text-slate-400 mb-1.5" />
                      <p className="text-xs font-semibold text-slate-600">Browse file to upload</p>
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Video Link (YouTube/Vimeo) *</label>
                    <input type="url" placeholder="https://youtube.com/..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                  </div>
                )}

                <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer">
                  Save Material
                </button>
              </form>
            )}

            <div className="space-y-6">
              {chapters.length > 0 ? chapters.map(chap => (
                <div key={chap} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 border-b border-slate-100 px-5 py-3">
                    <h3 className="text-sm font-bold text-slate-800">{chap}</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {filteredMaterials.filter(m => m.chapter === chap).map(m => (
                      <div key={m.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            m.type === 'notes' ? 'bg-blue-50 text-blue-500' :
                            m.type === 'video' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
                          }`}>
                            {getIconForType(m.type)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-800">{m.title}</h4>
                            <p className="text-xs font-medium text-slate-400 mt-0.5 capitalize">{m.type} • {m.size}</p>
                          </div>
                        </div>
                        <button onClick={() => setMaterials(materials.filter(item => item.id !== m.id))} className="text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition p-2 rounded-lg flex items-center justify-center cursor-pointer shrink-0 ml-auto sm:ml-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1">No Materials Found</h3>
                  <p className="text-xs font-medium text-slate-500">Upload notes, videos, or question papers to get started.</p>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
