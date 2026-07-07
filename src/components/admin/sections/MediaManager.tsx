'use client';

import React, { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Upload, FolderHeart, Video, ArrowLeft, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type MediaItem = 
  | { id: string; type: 'image'; url: string }
  | { id: string; type: 'youtube'; videoId: string; thumbnail: string };

type Album = {
  id: number;
  name: string;
  cover: string;
  media: MediaItem[];
};

export default function MediaManager() {
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 1,
      name: "Annual Function 2025",
      cover: "/images/hero.png",
      media: [
        { id: "m1", type: "image", url: "/images/hero.png" },
        { id: "m2", type: "youtube", videoId: "M7lc1UVf-VE", thumbnail: "/images/hero.png" }
      ]
    },
    {
      id: 2,
      name: "Sports Meet",
      cover: "/images/hero-students.png",
      media: [
        { id: "m3", type: "image", url: "/images/hero-students.png" }
      ]
    },
    {
      id: 3,
      name: "Campus Tour",
      cover: "/images/facilities-hero.png",
      media: [
        { id: "m4", type: "image", url: "/images/facilities-hero.png" },
        { id: "m5", type: "youtube", videoId: "tO01J-M3g0U", thumbnail: "/images/facilities-hero.png" }
      ]
    }
  ]);

  const [activeAlbumId, setActiveAlbumId] = useState<number | null>(null);
  
  // Forms
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [newMediaType, setNewMediaType] = useState<'image' | 'youtube'>('image');
  const [newMediaYoutubeUrl, setNewMediaYoutubeUrl] = useState("");

  const activeAlbum = albums.find(a => a.id === activeAlbumId);

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;
    const newAlbum: Album = {
      id: Date.now(),
      name: newAlbumName,
      cover: "/images/hero.png", // Default placeholder for now
      media: []
    };
    setAlbums([newAlbum, ...albums]);
    setNewAlbumName("");
    setShowAlbumForm(false);
  };

  const handleDeleteAlbum = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this album and all its media?")) {
      setAlbums(albums.filter(a => a.id !== id));
      if (activeAlbumId === id) setActiveAlbumId(null);
    }
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAlbum) return;

    let newMedia: MediaItem;
    if (newMediaType === 'image') {
      newMedia = { id: Date.now().toString(), type: 'image', url: "/images/hero-students.png" }; // Placeholder
    } else {
      // Extract video ID roughly
      let videoId = "M7lc1UVf-VE"; 
      if (newMediaYoutubeUrl.includes("v=")) {
        videoId = newMediaYoutubeUrl.split("v=")[1].split("&")[0];
      } else if (newMediaYoutubeUrl.includes("youtu.be/")) {
        videoId = newMediaYoutubeUrl.split("youtu.be/")[1].split("?")[0];
      }
      newMedia = { id: Date.now().toString(), type: 'youtube', videoId, thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` };
    }

    const updatedAlbums = albums.map(a => {
      if (a.id === activeAlbumId) {
        // Automatically set the cover to the first image if it's currently a placeholder or empty
        const isFirstMedia = a.media.length === 0;
        return {
          ...a,
          media: [newMedia, ...a.media],
          cover: (isFirstMedia && newMedia.type === 'image') ? newMedia.url : a.cover
        };
      }
      return a;
    });

    setAlbums(updatedAlbums);
    setNewMediaType('image');
    setNewMediaYoutubeUrl("");
    setShowMediaForm(false);
  };

  const handleDeleteMedia = (mediaId: string) => {
    if (!activeAlbum) return;
    if (confirm("Delete this media item?")) {
      const updatedAlbums = albums.map(a => {
        if (a.id === activeAlbumId) {
          return { ...a, media: a.media.filter(m => m.id !== mediaId) };
        }
        return a;
      });
      setAlbums(updatedAlbums);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Media Gallery Manager</h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Organize photos and videos into albums for the public gallery.</p>
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
            className="space-y-6"
          >
            <div className="flex justify-end">
              {!showAlbumForm && (
                <button 
                  onClick={() => setShowAlbumForm(true)}
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-sm border-0 cursor-pointer"
                >
                  <FolderHeart size={16} /> Create Album
                </button>
              )}
            </div>

            {showAlbumForm && (
              <form onSubmit={handleCreateAlbum} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Create New Album</h3>
                  <button type="button" onClick={() => setShowAlbumForm(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Album Name *</label>
                  <input type="text" autoFocus required value={newAlbumName} onChange={e => setNewAlbumName(e.target.value)} placeholder="e.g., Annual Sports Day 2026" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-brand-green font-medium transition" />
                </div>

                <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer">
                  Save Album
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {albums.map((album) => (
                <div 
                  key={album.id}
                  onClick={() => { setActiveAlbumId(album.id); setShowAlbumForm(false); }}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <Image 
                      src={album.cover}
                      alt={album.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 flex items-center justify-between bg-white relative z-10">
                    <div className="flex flex-col">
                      <h3 className="text-base font-semibold text-slate-800 group-hover:text-brand-green transition-colors truncate pr-2">
                        {album.name}
                      </h3>
                      <span className="text-xs font-medium text-slate-400 mt-0.5">
                        {album.media.length} Items
                      </span>
                    </div>
                    <button 
                      onClick={(e) => handleDeleteAlbum(album.id, e)}
                      className="text-slate-300 hover:text-rose-600 transition bg-white border border-slate-100 hover:border-rose-200 hover:bg-rose-50 rounded p-2 cursor-pointer shadow-sm shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 2: SINGLE ALBUM CONTENTS */}
        {activeAlbumId && activeAlbum && (
          <motion.div
            key="media-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Breadcrumb / Top Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setActiveAlbumId(null); setShowMediaForm(false); }}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-brand-green uppercase tracking-widest leading-tight">Album</span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-tight truncate max-w-[200px] sm:max-w-md">
                    {activeAlbum.name}
                  </h3>
                </div>
              </div>
              
              {!showMediaForm && (
                <button 
                  onClick={() => setShowMediaForm(true)}
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer shrink-0"
                >
                  <Plus size={14} /> Add Media
                </button>
              )}
            </div>

            {/* Media Upload Form */}
            {showMediaForm && (
              <form onSubmit={handleAddMedia} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Upload to {activeAlbum.name}</h3>
                  <button type="button" onClick={() => setShowMediaForm(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer">Cancel</button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Media Type</label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${newMediaType === 'image' ? 'border-brand-green bg-emerald-50 text-brand-green' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}>
                      <input type="radio" name="mediaType" value="image" checked={newMediaType === 'image'} onChange={() => setNewMediaType('image')} className="hidden" />
                      <ImageIcon size={20} className="mb-2" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Photo File</span>
                    </label>
                    <label className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${newMediaType === 'youtube' ? 'border-red-500 bg-red-50 text-red-600' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}>
                      <input type="radio" name="mediaType" value="youtube" checked={newMediaType === 'youtube'} onChange={() => setNewMediaType('youtube')} className="hidden" />
                      <Video size={20} className="mb-2" />
                      <span className="text-xs font-semibold uppercase tracking-wider">YouTube Video</span>
                    </label>
                  </div>
                </div>

                {newMediaType === 'image' ? (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Select Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-all">
                      <Upload size={24} className="text-slate-400 mb-2" />
                      <p className="text-sm font-semibold text-slate-600">Click to upload photo (.jpg, .png)</p>
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">YouTube Video Link</label>
                    <input type="url" required value={newMediaYoutubeUrl} onChange={e => setNewMediaYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-red-500 font-medium transition" />
                  </div>
                )}

                <button type="submit" className={`w-full text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer ${newMediaType === 'image' ? 'bg-brand-green hover:bg-brand-green-dark' : 'bg-red-600 hover:bg-red-700'}`}>
                  {newMediaType === 'image' ? 'Upload Photo' : 'Add Video'}
                </button>
              </form>
            )}

            {/* Media Grid */}
            {activeAlbum.media.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {activeAlbum.media.map((item) => {
                  const isVideo = item.type === 'youtube';
                  const src = isVideo ? item.thumbnail : item.url;

                  return (
                    <div key={item.id} className="group relative aspect-square w-full rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
                      <Image 
                        src={src}
                        alt="Media item"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Video Badge */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:bg-red-600 transition-colors">
                            <Play size={16} className="text-white fill-white ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Hover Controls */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-2">
                        <button 
                          onClick={() => handleDeleteMedia(item.id)}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-rose-500 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-sm border border-white/20"
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
              <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                  <ImageIcon size={28} />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">Album is Empty</h3>
                <p className="text-xs font-medium text-slate-500">Upload photos or link YouTube videos to fill this album.</p>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
