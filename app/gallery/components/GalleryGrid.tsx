"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Share2, X, Image as ImageIcon } from "lucide-react";
import { getFoldersApi } from "@/lib/api";

type MediaItem = {
  type: 'image' | 'youtube';
  url: string;
  videoId?: string;
  thumbnail?: string;
};

type Album = {
  id: string | number;
  name: string;
  cover: string;
  media: MediaItem[];
};

export default function GalleryGrid() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getFoldersApi()
      .then(res => {
        if (isMounted && res && res.folders) {
          const mapped: Album[] = res.folders.map((f: any) => {
            const mediaList: MediaItem[] = (f.media || []).map((m: any) => ({
              type: m.mediaType === 'video' ? 'youtube' : 'image',
              url: m.url,
              videoId: m.publicId || 'M7lc1UVf-VE',
              thumbnail: m.url
            }));

            const coverUrl = mediaList.length > 0 ? mediaList[0].url : "/images/hero.png";

            return {
              id: f._id,
              name: f.name,
              cover: coverUrl,
              media: mediaList
            };
          });
          setAlbums(mapped);
        }
      })
      .catch((err) => {
        console.error("Error fetching gallery folders:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null || !activeAlbum) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, activeAlbum]);

  const handleNext = () => {
    if (!activeAlbum || selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % activeAlbum.media.length);
  };

  const handlePrev = () => {
    if (!activeAlbum || selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + activeAlbum.media.length) % activeAlbum.media.length);
  };

  const handleDownload = async () => {
    if (!activeAlbum || selectedIndex === null) return;
    const currentMedia = activeAlbum.media[selectedIndex];
    
    if (currentMedia.type !== 'image') return;
    
    try {
      const response = await fetch(currentMedia.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `GreenView_Media_${selectedIndex + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error downloading image:", err);
      const a = document.createElement("a");
      a.href = currentMedia.url;
      a.download = `GreenView_Media_${selectedIndex + 1}.png`;
      a.target = "_blank";
      a.click();
    }
  };

  const handleShare = async () => {
    if (!activeAlbum || selectedIndex === null) return;
    const currentMedia = activeAlbum.media[selectedIndex];
    
    let urlToShare = currentMedia.url;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Green View School Gallery',
          text: `Check out this media from ${activeAlbum.name}`,
          url: urlToShare,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(urlToShare);
      alert("Link copied to clipboard!");
    }
  };

  const activeMediaItem = activeAlbum && selectedIndex !== null ? activeAlbum.media[selectedIndex] : null;

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      
      {/* Lightbox / Fullscreen Viewer */}
      <AnimatePresence>
        {selectedIndex !== null && activeAlbum && activeMediaItem && (
          <div className="fixed inset-0 z-[9999] flex flex-col bg-black">
            
            {/* Top Toolbar */}
            <div className="w-full p-4 md:p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex flex-col pointer-events-none">
                <span className="text-white font-medium text-sm md:text-base tracking-wide drop-shadow-md">
                  {activeAlbum.name}
                </span>
                <span className="text-white/80 font-medium text-xs drop-shadow-md">
                  {selectedIndex + 1} of {activeAlbum.media.length}
                </span>
              </div>
              <button 
                onClick={() => setSelectedIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Media Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden w-full">
              {/* Prev Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors hidden sm:flex cursor-pointer border-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.98, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
                  drag={activeMediaItem.type === 'image' ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (activeMediaItem.type !== 'image') return;
                    if (offset.x < -50 || velocity.x < -400) handleNext();
                    else if (offset.x > 50 || velocity.x > 400) handlePrev();
                  }}
                >
                  {activeMediaItem.type === 'image' ? (
                    <Image 
                      src={activeMediaItem.url}
                      alt={`Fullscreen View ${selectedIndex + 1}`}
                      fill
                      className="object-contain pointer-events-none"
                      sizes="100vw"
                      quality={100}
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative z-50">
                      <iframe
                        src={`https://www.youtube.com/embed/${activeMediaItem.videoId || 'M7lc1UVf-VE'}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors hidden sm:flex cursor-pointer border-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Mobile swipe overlays */}
              {activeMediaItem.type === 'image' && (
                <>
                  <div className="absolute inset-y-0 left-0 w-1/4 z-40 sm:hidden" onClick={handlePrev} />
                  <div className="absolute inset-y-0 right-0 w-1/4 z-40 sm:hidden" onClick={handleNext} />
                </>
              )}
            </div>

            {/* Bottom Toolbar */}
            <div className="w-full p-6 flex justify-center items-center gap-8 z-50 bg-gradient-to-t from-black/60 to-transparent">
              <button 
                onClick={handleShare}
                className="flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider">Share</span>
              </button>
              
              {activeMediaItem?.type === 'image' && (
                <button 
                  onClick={handleDownload}
                  className="flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider">Download</span>
                </button>
              )}
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* Main Albums / Photos View */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-20">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: ALBUMS LIST */}
          {!activeAlbum && (
            <motion.div 
              key="albums-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col mb-10">
                <span className="text-brand-green font-semibold tracking-[0.2em] uppercase text-xs mb-2">Our Campus</span>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Photo & Video Albums</h1>
                <p className="text-slate-500 font-medium mt-3 max-w-lg">
                  Explore memories, moments, and videos captured across various events and campus life at Green View.
                </p>
              </div>

              {loading ? (
                <div className="text-center py-20 text-slate-400 text-sm font-medium">
                  Loading gallery albums...
                </div>
              ) : albums.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                  {albums.map((album) => (
                    <div 
                      key={album.id} 
                      onClick={() => {
                        setActiveAlbum(album);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex flex-col group cursor-pointer"
                    >
                      <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-slate-200 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-slate-100">
                        <Image 
                          src={album.cover}
                          alt={album.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          unoptimized
                        />
                      </div>
                      
                      <div className="flex flex-col px-2">
                        <h2 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-brand-green transition-colors truncate">
                          {album.name}
                        </h2>
                        <span className="text-sm text-slate-500 font-medium mt-1">
                          {album.media ? album.media.length : 0} Items
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty / Coming Soon Component */
                <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm flex flex-col items-center justify-center max-w-md mx-auto my-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center mb-4">
                    <ImageIcon size={32} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-2">Photo Gallery — Coming Soon</h2>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Photo albums and campus video memories are currently being curated. Check back soon for exciting updates!
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* VIEW 2: SINGLE ALBUM MEDIA */}
          {activeAlbum && (
            <motion.div 
              key="photos-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col mb-10">
                <button 
                  onClick={() => setActiveAlbum(null)}
                  className="text-sm font-semibold text-slate-500 hover:text-brand-green transition-colors self-start mb-4 uppercase tracking-widest cursor-pointer bg-transparent border-0"
                >
                  &larr; Back to Albums
                </button>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  {activeAlbum.name}
                </h1>
                <span className="text-brand-green font-medium mt-2">{activeAlbum.media.length} Items</span>
              </div>

              {activeAlbum.media.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {activeAlbum.media.map((item, idx) => {
                    const isVideo = item.type === 'youtube';
                    const src = isVideo ? (item.thumbnail || item.url) : item.url;
                    return (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedIndex(idx)}
                        className="relative aspect-square w-full rounded-2xl bg-slate-200 cursor-pointer overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                      >
                        <Image 
                          src={src}
                          alt={`Media ${idx + 1} from ${activeAlbum.name}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        
                        {isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium text-xs">
                  No media uploaded to this album yet.
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
