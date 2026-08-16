"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Share2, X, Image as ImageIcon, Sparkles } from "lucide-react";
import { getFolderByIdApi } from "@/lib/api";

type MediaItem = {
  id?: string;
  type: 'image' | 'youtube';
  url: string;
  videoId?: string;
  thumbnail?: string;
  title?: string;
};

const ITEMS_PER_PAGE = 12;

// Helper: Extract YouTube video ID
const getYoutubeVideoId = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
};

// Skeleton Card Component
function SkeletonMediaCard() {
  return (
    <div className="relative aspect-square w-full rounded-2xl bg-slate-200 animate-pulse overflow-hidden border border-slate-100">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent animate-shimmer" />
    </div>
  );
}

export default function SingleFolderGalleryPage() {
  const params = useParams();
  const folderId = params?.folderId as string;

  const [folderName, setFolderName] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Lightbox index
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Sentinel ref for infinite scroll
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  // Fetch paginated media batch from backend
  const loadMediaBatch = useCallback(async (pageNum: number, isInitial = false) => {
    if (!folderId) return;

    if (isInitial) {
      setLoadingInitial(true);
      setPage(1);
      setMediaItems([]);
    } else {
      setLoadingMore(true);
    }

    try {
      const res = await getFolderByIdApi(folderId, { page: pageNum, limit: ITEMS_PER_PAGE });
      if (res && res.folder) {
        if (res.folder.name) setFolderName(res.folder.name);
        
        const rawMedia = res.folder.media || [];
        const mappedItems: MediaItem[] = rawMedia.map((m: any) => {
          const isVideo = m.mediaType === 'video' || m.url.includes('youtube');
          const videoId = isVideo ? getYoutubeVideoId(m.url) || m.publicId || 'M7lc1UVf-VE' : undefined;
          const thumbnail = isVideo && videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : m.url;

          return {
            id: m._id || m.id,
            type: isVideo ? 'youtube' : 'image',
            url: m.url,
            videoId,
            thumbnail,
            title: m.title
          };
        });

        setMediaItems(prev => isInitial ? mappedItems : [...prev, ...mappedItems]);

        if (res.pagination) {
          setTotalCount(res.pagination.total || mappedItems.length);
          setHasMore(Boolean(res.pagination.hasMore));
        } else {
          setHasMore(mappedItems.length === ITEMS_PER_PAGE);
        }
      }
    } catch (err) {
      console.error("Error loading folder media batch:", err);
    } finally {
      if (isInitial) setLoadingInitial(false);
      else setLoadingMore(false);
    }
  }, [folderId]);

  // Initial load on mount or folderId change
  useEffect(() => {
    if (folderId) {
      loadMediaBatch(1, true);
    }
  }, [folderId, loadMediaBatch]);

  // Fetch next page function
  const fetchNextPage = useCallback(() => {
    if (!hasMore || loadingMore || loadingInitial) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadMediaBatch(nextPage, false);
  }, [hasMore, loadingMore, loadingInitial, page, loadMediaBatch]);

  // IntersectionObserver for Infinite Scroll
  useEffect(() => {
    const target = observerTargetRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loadingInitial) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '250px', threshold: 0.1 }
    );

    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [observerTargetRef, hasMore, loadingMore, loadingInitial, fetchNextPage]);

  // Lightbox Auto-Fetch Next Page when approaching end
  useEffect(() => {
    if (selectedIndex !== null && hasMore && !loadingMore && selectedIndex >= mediaItems.length - 2) {
      fetchNextPage();
    }
  }, [selectedIndex, mediaItems.length, hasMore, loadingMore, fetchNextPage]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null || mediaItems.length === 0) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, mediaItems]);

  const handleNext = () => {
    if (selectedIndex === null || mediaItems.length === 0) return;
    setSelectedIndex((prev) => (prev! + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null || mediaItems.length === 0) return;
    setSelectedIndex((prev) => (prev! - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleDownload = async () => {
    if (selectedIndex === null || !mediaItems[selectedIndex]) return;
    const currentMedia = mediaItems[selectedIndex];
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
    if (selectedIndex === null || !mediaItems[selectedIndex]) return;
    const currentMedia = mediaItems[selectedIndex];
    
    const urlToShare = currentMedia.url;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Green View School Gallery',
          text: `Check out this media from ${folderName || 'Gallery'}`,
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

  const activeMediaItem = selectedIndex !== null ? mediaItems[selectedIndex] : null;

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      
      {/* Lightbox / Fullscreen Media Viewer */}
      <AnimatePresence>
        {selectedIndex !== null && activeMediaItem && (
          <div className="fixed inset-0 z-[9999] flex flex-col bg-black">
            
            {/* Top Toolbar */}
            <div className="w-full p-4 md:p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
              <div className="flex flex-col pointer-events-none">
                <span className="text-white font-bold text-sm md:text-base tracking-wide drop-shadow-md">
                  {folderName || "Album Gallery"}
                </span>
                <span className="text-white/80 font-medium text-xs drop-shadow-md">
                  {selectedIndex + 1} of {totalCount || mediaItems.length}
                </span>
              </div>
              <button 
                onClick={() => setSelectedIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border-0 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Media Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden w-full">
              {/* Prev Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors hidden sm:flex cursor-pointer border-0 shadow-lg"
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
                      alt={activeMediaItem.title || `Fullscreen View ${selectedIndex + 1}`}
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
                className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors hidden sm:flex cursor-pointer border-0 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Mobile swipe touch areas */}
              {activeMediaItem.type === 'image' && (
                <>
                  <div className="absolute inset-y-0 left-0 w-1/4 z-40 sm:hidden" onClick={handlePrev} />
                  <div className="absolute inset-y-0 right-0 w-1/4 z-40 sm:hidden" onClick={handleNext} />
                </>
              )}
            </div>

            {/* Bottom Toolbar */}
            <div className="w-full p-6 flex justify-center items-center gap-8 z-50 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
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

      {/* Main Single Folder View */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <div className="flex flex-col mb-10">
            <Link 
              href="/gallery"
              className="text-sm font-semibold text-slate-500 hover:text-brand-green transition-colors self-start mb-4 uppercase tracking-widest cursor-pointer no-underline"
            >
              &larr; Back to Albums
            </Link>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                {folderName || "Album Gallery"}
              </h1>
              <span className="text-brand-green font-bold text-base md:text-xl">
                ({totalCount || mediaItems.length} Items)
              </span>
            </div>
          </div>

          {loadingInitial ? (
            /* Initial Batch Skeleton Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <SkeletonMediaCard key={idx} />
              ))}
            </div>
          ) : mediaItems.length > 0 ? (
            <div className="space-y-8">
              
              {/* Media Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {mediaItems.map((item, idx) => {
                  const isVideo = item.type === 'youtube';
                  const src = isVideo ? (item.thumbnail || item.url) : item.url;
                  return (
                    <motion.div 
                      key={item.id || idx} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: Math.min((idx % ITEMS_PER_PAGE) * 0.03, 0.3) }}
                      onClick={() => setSelectedIndex(idx)}
                      className="relative aspect-square w-full rounded-2xl bg-slate-200 cursor-pointer overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                    >
                      <Image 
                        src={src}
                        alt={item.title || `Media ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:bg-red-600 transition-colors">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Skeleton Cards rendered at bottom while loading next batch on scroll */}
                {loadingMore && Array.from({ length: 8 }).map((_, idx) => (
                  <SkeletonMediaCard key={`more-skeleton-${idx}`} />
                ))}
              </div>

              {/* Sentinel Element for Infinite Scroll */}
              <div ref={observerTargetRef} className="py-6 flex flex-col items-center justify-center w-full min-h-[60px]">
                {!hasMore && mediaItems.length > 0 && (
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 pt-4">
                    <Sparkles size={14} className="text-brand-green" />
                    <span>You&apos;ve viewed all {totalCount} items in this album</span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium text-xs">
              No media uploaded to this album yet.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
