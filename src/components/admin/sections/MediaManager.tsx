'use client';

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, Upload, FolderHeart, Video, ArrowLeft, Play, Loader2, Files, X, AlertTriangle, CheckSquare, Square, ShieldAlert, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  getFoldersApi, 
  getFolderByIdApi, 
  createFolderApi, 
  deleteFolderApi, 
  addMediaToFolderApi, 
  addMultipleMediaToFolderApi, 
  deleteMediaApi,
  deleteMultipleMediaApi
} from "@/lib/api";

type MediaItem = {
  _id?: string;
  id?: string;
  mediaType: 'image' | 'video';
  url: string;
  title?: string;
  publicId?: string;
};

type Album = {
  _id?: string;
  id?: string | number;
  name: string;
  media: MediaItem[];
};

interface PreviewFileItem {
  id: string;
  file: File;
  previewUrl: string;
  sizeMB: number;
  isOverLimit: boolean; // size > 10 MB
}

const MAX_FILE_LIMIT = 50;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// Helper: Robust YouTube Video ID extractor
const getYoutubeVideoId = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
};

export default function MediaManager() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(false);
  const [albumLoading, setAlbumLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Selection state for uploaded items batch delete
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);

  // Forms
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [uploadMode, setUploadMode] = useState<'files' | 'youtube'>('files');
  
  // File previews and validation state
  const [previewFiles, setPreviewFiles] = useState<PreviewFileItem[]>([]);
  const [mediaTitle, setMediaTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Custom Delete Modal States
  const [folderToDelete, setFolderToDelete] = useState<{ id: string; name: string } | null>(null);
  const [typedFolderName, setTypedFolderName] = useState("");
  
  const [mediaToDelete, setMediaToDelete] = useState<{ type: 'single' | 'batch'; id?: string; count?: number } | null>(null);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await getFoldersApi();
      if (res && res.folders) {
        setAlbums(res.folders);
      }
    } catch (err) {
      console.error("Error fetching folders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchSingleAlbum = async (folderId: string) => {
    setAlbumLoading(true);
    try {
      const res = await getFolderByIdApi(folderId);
      if (res && res.folder) {
        setActiveAlbum(res.folder);
      }
    } catch (err) {
      console.error("Error fetching folder details:", err);
    } finally {
      setAlbumLoading(false);
      setSelectedMediaIds([]);
    }
  };

  useEffect(() => {
    if (activeAlbumId) {
      fetchSingleAlbum(activeAlbumId);
    } else {
      setActiveAlbum(null);
      setSelectedMediaIds([]);
    }
  }, [activeAlbumId]);

  // Clean up object URLs when preview files change or unmount
  const clearPreviews = () => {
    previewFiles.forEach(item => {
      if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
    setPreviewFiles([]);
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    let rawFiles = Array.from(e.target.files);

    if (rawFiles.length + previewFiles.length > MAX_FILE_LIMIT) {
      alert(`Maximum selection limit is ${MAX_FILE_LIMIT} images at once. Only the first ${MAX_FILE_LIMIT} images were added.`);
      rawFiles = rawFiles.slice(0, MAX_FILE_LIMIT - previewFiles.length);
    }

    const newPreviewItems: PreviewFileItem[] = rawFiles.map((file, idx) => {
      const sizeMB = parseFloat((file.size / (1024 * 1024)).toFixed(2));
      const isOverLimit = file.size > MAX_FILE_SIZE_BYTES;
      const previewUrl = file.type.startsWith('image/') || file.type.startsWith('video/')
        ? URL.createObjectURL(file)
        : '';

      return {
        id: `${file.name}-${Date.now()}-${idx}`,
        file,
        previewUrl,
        sizeMB,
        isOverLimit
      };
    });

    setPreviewFiles(prev => [...prev, ...newPreviewItems]);
    e.target.value = "";
  };

  const removePreviewItem = (id: string) => {
    setPreviewFiles(prev => {
      const target = prev.find(p => p.id === id);
      if (target && target.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  const toggleSelectMediaItem = (mediaId: string) => {
    setSelectedMediaIds(prev => 
      prev.includes(mediaId) ? prev.filter(id => id !== mediaId) : [...prev, mediaId]
    );
  };

  const toggleSelectAllMedia = () => {
    if (!activeAlbum || !activeAlbum.media) return;
    const allIds = activeAlbum.media.map(m => (m._id || m.id) as string).filter(Boolean);
    if (selectedMediaIds.length === allIds.length) {
      setSelectedMediaIds([]);
    } else {
      setSelectedMediaIds(allIds);
    }
  };

  // Trigger Custom Folder Delete Modal
  const openFolderDeleteModal = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFolderToDelete({ id, name });
    setTypedFolderName("");
  };

  // Confirm Folder Delete
  const confirmDeleteFolder = async () => {
    if (!folderToDelete) return;
    if (typedFolderName.trim() !== folderToDelete.name.trim()) return;

    setSubmitting(true);
    try {
      await deleteFolderApi(folderToDelete.id);
      if (activeAlbumId === folderToDelete.id) setActiveAlbumId(null);
      await fetchAlbums();
      setFolderToDelete(null);
      setTypedFolderName("");
    } catch (err) {
      console.error("Error deleting folder:", err);
      alert("Failed to delete folder");
    } finally {
      setSubmitting(false);
    }
  };

  // Trigger Custom Media Delete Modal (Single or Batch)
  const openSingleMediaDeleteModal = (mediaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaToDelete({ type: 'single', id: mediaId });
  };

  const openBatchMediaDeleteModal = () => {
    if (selectedMediaIds.length === 0) return;
    setMediaToDelete({ type: 'batch', count: selectedMediaIds.length });
  };

  // Confirm Media Delete
  const confirmDeleteMedia = async () => {
    if (!mediaToDelete) return;

    setSubmitting(true);
    try {
      if (mediaToDelete.type === 'single' && mediaToDelete.id) {
        await deleteMediaApi(mediaToDelete.id);
      } else if (mediaToDelete.type === 'batch' && selectedMediaIds.length > 0) {
        await deleteMultipleMediaApi(selectedMediaIds);
        setSelectedMediaIds([]);
      }

      if (activeAlbumId) {
        await fetchSingleAlbum(activeAlbumId);
      }
      await fetchAlbums();
      setMediaToDelete(null);
    } catch (err) {
      console.error("Error deleting media:", err);
      alert("Failed to delete media item(s)");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;

    setSubmitting(true);
    try {
      await createFolderApi(newAlbumName.trim());
      await fetchAlbums();
      setNewAlbumName("");
      setShowAlbumForm(false);
    } catch (err) {
      console.error("Error creating folder:", err);
      alert("Failed to create folder. Folder name might already exist.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAlbumId) return;

    setSubmitting(true);
    try {
      if (uploadMode === 'youtube') {
        if (!youtubeUrl.trim()) {
          alert("Please enter a valid YouTube video URL");
          setSubmitting(false);
          return;
        }

        await addMediaToFolderApi(activeAlbumId, {
          title: mediaTitle.trim() || 'YouTube Video',
          mediaType: 'video',
          youtubeUrl: youtubeUrl.trim()
        });
      } else {
        if (previewFiles.length === 0) {
          alert("Please select at least one image to upload");
          setSubmitting(false);
          return;
        }

        const overLimitFiles = previewFiles.filter(p => p.isOverLimit);
        if (overLimitFiles.length > 0) {
          alert(`Cannot upload! ${overLimitFiles.length} image(s) exceed the 10 MB size limit. Please remove oversized images before proceeding.`);
          setSubmitting(false);
          return;
        }

        if (previewFiles.length === 1) {
          const formData = new FormData();
          formData.append("media", previewFiles[0].file);
          if (mediaTitle.trim()) {
            formData.append("title", mediaTitle.trim());
          }
          await addMediaToFolderApi(activeAlbumId, formData);
        } else {
          const formData = new FormData();
          previewFiles.forEach(item => {
            formData.append("media", item.file);
          });
          await addMultipleMediaToFolderApi(activeAlbumId, formData);
        }
      }

      await fetchSingleAlbum(activeAlbumId);
      await fetchAlbums();

      clearPreviews();
      setYoutubeUrl("");
      setMediaTitle("");
      setShowMediaForm(false);
    } catch (err) {
      console.error("Error adding media:", err);
      alert("Failed to add media to folder");
    } finally {
      setSubmitting(false);
    }
  };

  const getYoutubeEmbedThumbnailUrl = (url: string) => {
    const videoId = getYoutubeVideoId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return "/images/hero.png";
  };

  const youtubeVideoId = getYoutubeVideoId(youtubeUrl);
  const hasOverLimitFiles = previewFiles.some(p => p.isOverLimit);

  return (
    <div className="w-full space-y-6 text-slate-800 relative">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Media Gallery Manager</h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Organize & batch delete photos & YouTube videos in folder albums.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* VIEW 1: ALBUMS LIST */}
        {!activeAlbumId && (
          <motion.div
            key="albums-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 w-full"
          >
            <div className="flex justify-end">
              {!showAlbumForm && (
                <button 
                  onClick={() => setShowAlbumForm(true)}
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-sm border-0 cursor-pointer"
                >
                  <FolderHeart size={16} /> Create Folder Album
                </button>
              )}
            </div>

            {showAlbumForm && (
              <form onSubmit={handleCreateAlbum} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-150 w-full">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Create New Folder Album</h3>
                  <button type="button" onClick={() => setShowAlbumForm(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Folder Name *</label>
                  <input type="text" autoFocus required value={newAlbumName} onChange={e => setNewAlbumName(e.target.value)} placeholder="e.g., Annual Sports Day 2026" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer disabled:opacity-50">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : "Save Folder"}
                </button>
              </form>
            )}

            {loading ? (
              <div className="flex items-center justify-center p-16 text-slate-400 gap-2">
                <Loader2 size={22} className="animate-spin" />
                <span className="text-sm font-medium">Loading gallery folders...</span>
              </div>
            ) : albums.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {albums.map((album) => {
                  const albumIdStr = (album._id || album.id) as string;
                  let coverUrl = "/images/hero.png";
                  if (album.media && album.media.length > 0) {
                    const first = album.media[0];
                    coverUrl = first.mediaType === 'video' && first.url.includes('youtube') 
                      ? getYoutubeEmbedThumbnailUrl(first.url) 
                      : first.url;
                  }
                  return (
                    <div 
                      key={albumIdStr}
                      onClick={() => { setActiveAlbumId(albumIdStr); setShowAlbumForm(false); }}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 cursor-pointer flex flex-col w-full"
                    >
                      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                        <Image 
                          src={coverUrl}
                          alt={album.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 flex items-center justify-between bg-white relative z-10">
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold text-slate-800 group-hover:text-brand-green transition-colors truncate pr-2">
                            {album.name}
                          </h3>
                          <span className="text-xs font-medium text-slate-400 mt-0.5">
                            {album.media ? album.media.length : 0} Items
                          </span>
                        </div>
                        <button 
                          onClick={(e) => openFolderDeleteModal(albumIdStr, album.name, e)}
                          className="text-slate-300 hover:text-rose-600 transition bg-white border border-slate-100 hover:border-rose-200 hover:bg-rose-50 rounded p-2 cursor-pointer shadow-sm shrink-0"
                          title="Delete Folder Album"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 w-full">
                <p className="text-sm font-medium">No folder albums created yet. Click &quot;Create Folder Album&quot; to begin.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: SINGLE ALBUM CONTENTS */}
        {activeAlbumId && (
          <motion.div
            key="media-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 w-full"
          >
            {/* Breadcrumb / Top Bar */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setActiveAlbumId(null); setShowMediaForm(false); clearPreviews(); setYoutubeUrl(""); setMediaTitle(""); }}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0 border-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-brand-green uppercase tracking-widest leading-tight">Folder</span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-tight truncate max-w-[200px] sm:max-w-md">
                    {activeAlbum ? activeAlbum.name : "Folder Details"}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {activeAlbum && activeAlbum.media && activeAlbum.media.length > 0 && (
                  <button 
                    onClick={toggleSelectAllMedia}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border-0 cursor-pointer"
                  >
                    {selectedMediaIds.length === activeAlbum.media.length ? <CheckSquare size={14} className="text-brand-green" /> : <Square size={14} />}
                    {selectedMediaIds.length === activeAlbum.media.length ? "Deselect All" : "Select All"}
                  </button>
                )}

                {!showMediaForm && (
                  <button 
                    onClick={() => setShowMediaForm(true)}
                    className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer shrink-0"
                  >
                    <Plus size={14} /> Add Media (Max 50 Photos)
                  </button>
                )}
              </div>
            </div>

            {/* Batch Action Delete Bar */}
            {selectedMediaIds.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 px-5 flex items-center justify-between shadow-sm w-full"
              >
                <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
                  <CheckSquare size={16} className="text-rose-600" />
                  <span>{selectedMediaIds.length} media item(s) selected for deletion</span>
                </div>
                <button
                  onClick={openBatchMediaDeleteModal}
                  disabled={submitting}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition border-0 cursor-pointer disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Delete Selected ({selectedMediaIds.length})
                </button>
              </motion.div>
            )}

            {/* Media Upload Form with Live Previews & Size Validation */}
            {showMediaForm && (
              <form onSubmit={handleAddMedia} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-150 w-full">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Add Media to {activeAlbum?.name}</h3>
                  <button type="button" onClick={() => { setShowMediaForm(false); clearPreviews(); setYoutubeUrl(""); setMediaTitle(""); }} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
                </div>

                {/* Upload Mode Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Select Upload Mode</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setUploadMode('files')}
                      className={`flex-1 p-3.5 rounded-xl border-2 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition ${
                        uploadMode === 'files' ? 'border-brand-green bg-emerald-50 text-brand-green' : 'border-slate-100 bg-white text-slate-500'
                      }`}
                    >
                      <Files size={18} /> Batch Image Upload (Max 50 Files)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('youtube')}
                      className={`flex-1 p-3.5 rounded-xl border-2 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition ${
                        uploadMode === 'youtube' ? 'border-red-500 bg-red-50 text-red-600' : 'border-slate-100 bg-white text-slate-500'
                      }`}
                    >
                      <Video size={18} /> Add YouTube Video Link
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Title / Caption (Optional)</label>
                  <input 
                    type="text" 
                    value={mediaTitle} 
                    onChange={e => setMediaTitle(e.target.value)} 
                    placeholder="e.g., Annual Day Performance" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" 
                  />
                </div>

                {uploadMode === 'files' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Select Images (Max 50, Max 10MB per file) *
                      </label>
                      <span className={`text-xs font-bold ${previewFiles.length === MAX_FILE_LIMIT ? 'text-amber-600' : 'text-brand-green'}`}>
                        Selected: {previewFiles.length} / {MAX_FILE_LIMIT} images
                      </span>
                    </div>

                    {/* Drag & Select Button */}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-all overflow-hidden relative">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*,video/*" 
                        onChange={handleFileSelection} 
                        disabled={previewFiles.length >= MAX_FILE_LIMIT}
                        className="hidden" 
                      />
                      <div className="flex flex-col items-center text-center">
                        <Upload size={24} className="text-slate-400 mb-1.5" />
                        <p className="text-sm font-semibold text-slate-700">Click to select images to upload</p>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">Supports PNG, JPG, JPEG (Max 10MB per file)</p>
                      </div>
                    </label>

                    {/* Oversized Warning Alert Banner */}
                    {hasOverLimitFiles && (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-3 text-rose-700 text-xs font-semibold">
                        <AlertTriangle size={18} className="shrink-0 text-rose-500 mt-0.5" />
                        <div>
                          <p className="font-bold">Oversized files detected (&gt;10MB)!</p>
                          <p className="text-[11px] font-medium text-rose-600 mt-0.5">
                            One or more selected images exceed the 10 MB limit (highlighted in red below). Please click the &quot;X&quot; button to remove them before uploading.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Image Previews Grid */}
                    {previewFiles.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700">Image Previews ({previewFiles.length}):</span>
                          <button 
                            type="button" 
                            onClick={clearPreviews} 
                            className="text-[11px] font-semibold text-rose-600 hover:underline bg-transparent border-0 cursor-pointer"
                          >
                            Clear All Selection
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-80 overflow-y-auto p-1 scrollbar-thin">
                          {previewFiles.map((item) => (
                            <div 
                              key={item.id}
                              className={`group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border transition-all ${
                                item.isOverLimit 
                                  ? 'border-2 border-rose-500 bg-rose-50/50 shadow-md ring-2 ring-rose-200' 
                                  : 'border-slate-200 shadow-sm'
                              }`}
                            >
                              {item.previewUrl ? (
                                <img 
                                  src={item.previewUrl} 
                                  alt={item.file.name} 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-bold text-xs">
                                  {item.file.name}
                                </div>
                              )}

                              {/* Size Badge */}
                              <div className={`absolute bottom-0 inset-x-0 p-1 text-[9px] font-bold text-center truncate ${
                                item.isOverLimit ? 'bg-rose-600 text-white' : 'bg-black/70 text-white'
                              }`}>
                                {item.sizeMB} MB {item.isOverLimit ? ' (REJECTED > 10MB)' : ''}
                              </div>

                              {/* Remove Item Button */}
                              <button 
                                type="button"
                                onClick={() => removePreviewItem(item.id)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer border-0 shadow-md"
                                title="Remove / Reject this image"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">YouTube Video URL *</label>
                    <input 
                      type="url" 
                      required 
                      value={youtubeUrl} 
                      onChange={e => setYoutubeUrl(e.target.value)} 
                      placeholder="https://www.youtube.com/watch?v=..." 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-red-500 font-medium transition" 
                    />

                    {/* LIVE YOUTUBE VIDEO PREVIEW */}
                    {youtubeVideoId ? (
                      <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> Valid YouTube Video Link Detected
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase">Live Player Preview</span>
                        </div>
                        <div className="relative w-full aspect-video max-w-3xl mx-auto rounded-xl bg-black overflow-hidden shadow-md border border-slate-200">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                            title="Live YouTube Video Preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        </div>
                      </div>
                    ) : youtubeUrl.trim().length > 5 ? (
                      <p className="text-[11px] text-amber-600 font-semibold mt-2 flex items-center gap-1">
                        <AlertTriangle size={13} /> Please enter a valid YouTube link (e.g., https://www.youtube.com/watch?v=...)
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        Note: Paste a YouTube link above to see an instant live video player preview.
                      </p>
                    )}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={submitting || (uploadMode === 'files' && (previewFiles.length === 0 || hasOverLimitFiles)) || (uploadMode === 'youtube' && !youtubeVideoId)} 
                  className={`w-full text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    uploadMode === 'youtube' ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-green hover:bg-brand-green-dark'
                  }`}
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : uploadMode === 'youtube' ? (
                    'Save YouTube Video Link'
                  ) : hasOverLimitFiles ? (
                    'Remove Oversized Images (>10MB) to Upload'
                  ) : (
                    `Upload ${previewFiles.length} Selected Image(s)`
                  )}
                </button>
              </form>
            )}

            {/* Uploaded Media Grid with Checkboxes */}
            {albumLoading ? (
              <div className="flex items-center justify-center p-16 text-slate-400 gap-2">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm font-medium">Loading folder items...</span>
              </div>
            ) : activeAlbum && activeAlbum.media && activeAlbum.media.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 w-full">
                {activeAlbum.media.map((item) => {
                  const mediaIdStr = (item._id || item.id) as string;
                  const isSelected = selectedMediaIds.includes(mediaIdStr);
                  const isYoutube = item.url.includes('youtube') || item.mediaType === 'video';
                  const displaySrc = isYoutube && item.url.includes('youtube') ? getYoutubeEmbedThumbnailUrl(item.url) : item.url;

                  return (
                    <div 
                      key={mediaIdStr} 
                      onClick={() => toggleSelectMediaItem(mediaIdStr)}
                      className={`group relative aspect-square w-full rounded-xl bg-slate-100 overflow-hidden border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-2 border-brand-green shadow-md ring-2 ring-emerald-200/60' 
                          : 'border-slate-200 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <Image 
                        src={displaySrc}
                        alt={item.title || "Media item"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />

                      {/* Selection Checkbox overlay */}
                      <div className="absolute top-2 left-2 z-20">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shadow-sm ${
                          isSelected ? 'bg-brand-green text-white' : 'bg-black/40 text-white/80 hover:bg-black/60'
                        }`}>
                          {isSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                        </div>
                      </div>
                      
                      {isYoutube && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:bg-red-600 transition-colors">
                            <Play size={16} className="text-white fill-white ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Single Delete Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-2 pointer-events-none">
                        <button 
                          onClick={(e) => openSingleMediaDeleteModal(mediaIdStr, e)}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-rose-500 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-sm border border-white/20 pointer-events-auto"
                          title="Delete media"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center w-full">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                  <ImageIcon size={28} />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">Folder is Empty</h3>
                <p className="text-xs font-medium text-slate-500">Upload photos or add YouTube video links to fill this folder.</p>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* ==================== CUSTOM MODAL 1: FOLDER DELETE CONFIRMATION ==================== */}
      <AnimatePresence>
        {folderToDelete && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setFolderToDelete(null); setTypedFolderName(""); }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 flex flex-col space-y-5"
            >
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-900 text-lg">Delete Folder Album</h3>
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Danger Zone Action</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
                <p>
                  This action will permanently delete the folder album <strong className="text-slate-900 font-bold">&quot;{folderToDelete.name}&quot;</strong> and all associated media from Cloudinary and database.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-[11px]">
                  To confirm, type <strong className="font-bold text-slate-900 select-all">&quot;{folderToDelete.name}&quot;</strong> in the box below:
                </div>
              </div>

              <div>
                <input
                  type="text"
                  autoFocus
                  value={typedFolderName}
                  onChange={(e) => setTypedFolderName(e.target.value)}
                  placeholder={`Type "${folderToDelete.name}" to confirm`}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-rose-500 font-bold text-slate-800 transition"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setFolderToDelete(null); setTypedFolderName(""); }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting || typedFolderName.trim() !== folderToDelete.name.trim()}
                  onClick={confirmDeleteFolder}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-0 shadow-sm"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  Permanently Delete Folder
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== CUSTOM MODAL 2: MEDIA DELETE CONFIRMATION ==================== */}
      <AnimatePresence>
        {mediaToDelete && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMediaToDelete(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 flex flex-col space-y-5"
            >
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                  <Trash2 size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-900 text-lg">
                    {mediaToDelete.type === 'batch' ? `Delete ${mediaToDelete.count} Media Items` : "Delete Media Item"}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">Confirm Deletion</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {mediaToDelete.type === 'batch' 
                  ? `Are you sure you want to permanently delete all ${mediaToDelete.count} selected media items from this album? This action cannot be undone.`
                  : "Are you sure you want to delete this media item from the album? This action cannot be undone."}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setMediaToDelete(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={confirmDeleteMedia}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border-0 shadow-sm"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
