'use client';

import React, { useState, useEffect } from "react";
import { Plus, Edit2, BookOpen, Search, AlertCircle, X, Check } from "lucide-react";
import { erpApi, Class } from "@/services/erpApi";

export default function AcademicsManager() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState({
    className: "",
    sections: [] as string[]
  });
  const [newSection, setNewSection] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await erpApi.classes.list();
      if (res.success) {
        setClasses(res.classes);
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cls?: Class) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({
        className: cls.className,
        sections: cls.sections || []
      });
    } else {
      setEditingClass(null);
      setFormData({ className: "", sections: [] });
    }
    setNewSection("");
    setIsModalOpen(true);
  };

  const handleAddSection = () => {
    if (!newSection.trim()) return;
    const sectionUpper = newSection.trim().toUpperCase();
    if (!formData.sections.includes(sectionUpper)) {
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, sectionUpper]
      }));
    }
    setNewSection("");
  };

  const handleRemoveSection = (sectionToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s !== sectionToRemove)
    }));
  };

  const handleSave = async () => {
    if (!formData.className.trim()) {
      alert("Class Name is required");
      return;
    }

    try {
      setSaving(true);
      if (editingClass) {
        await erpApi.classes.updateClass(editingClass._id, {
          className: formData.className,
          sections: formData.sections
        });
      } else {
        await erpApi.classes.createClass({
          className: formData.className,
          sections: formData.sections
        });
      }
      await fetchClasses();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to save class");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold font-serif text-slate-900">Academics Manager</h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Manage classes, sections, and academic structure.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer"
        >
          <Plus size={16} /> Add New Class
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-600 p-4 rounded-xl flex items-start gap-3 border border-rose-100">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Class Name</th>
                <th className="px-6 py-4">Sections</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classes.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500 text-sm">
                    No classes found. Add your first class to get started.
                  </td>
                </tr>
              ) : (
                classes.map(cls => (
                  <tr key={cls._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <BookOpen size={14} />
                        </div>
                        <span className="font-semibold text-slate-800 text-sm">{cls.className}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {(!cls.sections || cls.sections.length === 0) ? (
                          <span className="text-xs text-slate-400 italic">No sections</span>
                        ) : (
                          cls.sections.map(sec => (
                            <span key={sec} className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
                              {sec}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleOpenModal(cls)}
                        className="p-1.5 text-slate-400 hover:text-brand-green hover:bg-emerald-50 rounded-lg transition-colors border-0 bg-transparent cursor-pointer"
                        title="Edit Class"
                      >
                        <Edit2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !saving && setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">
                {editingClass ? "Edit Class & Sections" : "Add New Class"}
              </h3>
              <button 
                onClick={() => !saving && setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-0 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Class Name</label>
                <input
                  type="text"
                  value={formData.className}
                  onChange={e => setFormData({...formData, className: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow"
                  placeholder="e.g. Class 10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sections</label>
                
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSection}
                    onChange={e => setNewSection(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSection();
                      }
                    }}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow uppercase"
                    placeholder="e.g. A, B, C"
                    maxLength={5}
                  />
                  <button 
                    onClick={handleAddSection}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-semibold transition border-0 cursor-pointer shrink-0"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.sections.length === 0 ? (
                    <span className="text-xs text-slate-400 italic py-1">No sections added yet</span>
                  ) : (
                    formData.sections.map(sec => (
                      <span key={sec} className="pl-2.5 pr-1 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5 text-sm font-bold">
                        {sec}
                        <button 
                          onClick={() => handleRemoveSection(sec)}
                          className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-emerald-100 text-emerald-600 transition-colors border-0 cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Add sections that apply to this class (e.g. A, B, Medical, Non-Medical).</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors border-0 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving || !formData.className.trim()}
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-dark rounded-lg transition-colors shadow-sm disabled:opacity-50 border-0 cursor-pointer flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} /> Save Class
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
