"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { getFoldersApi } from "@/lib/api";

type Album = {
  id: string;
  name: string;
  cover: string;
  totalMediaCount: number;
};

// Helper: Extract YouTube video ID
const getYoutubeVideoId = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
};

// Skeleton Album Card Component
function SkeletonAlbumCard() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="relative aspect-square w-full rounded-[2rem] bg-slate-200 mb-4 border border-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent animate-shimmer" />
      </div>
      <div className="h-4 bg-slate-200 rounded-md w-3/4 mb-2" />
      <div className="h-3 bg-slate-200 rounded-md w-1/3" />
    </div>
  );
}

export default function GalleryAlbumsView() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoadingAlbums(true);
    getFoldersApi()
      .then(res => {
        if (isMounted && res && res.folders) {
          const mapped: Album[] = res.folders.map((f: any) => {
            const coverItem = f.coverMedia;
            let coverUrl = "/images/hero.png";
            if (coverItem) {
              if (coverItem.mediaType === 'video' && coverItem.url.includes('youtube')) {
                const vid = getYoutubeVideoId(coverItem.url);
                coverUrl = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : "/images/hero.png";
              } else {
                coverUrl = coverItem.url;
              }
            }

            return {
              id: String(f._id || f.id),
              name: f.name,
              cover: coverUrl,
              totalMediaCount: f.totalMediaCount || 0
            };
          });
          setAlbums(mapped);
        }
      })
      .catch((err) => {
        console.error("Error fetching gallery folders:", err);
      })
      .finally(() => {
        if (isMounted) setLoadingAlbums(false);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <div className="flex flex-col mb-10">
            <span className="text-brand-green font-semibold tracking-[0.2em] uppercase text-xs mb-2">Our Campus</span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Photo &amp; Video Albums</h1>
            <p className="text-slate-500 font-medium mt-3 max-w-lg">
              Explore memories, moments, and videos captured across various events and campus life at Green View.
            </p>
          </div>

          {loadingAlbums ? (
            /* Skeleton Album Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
              {Array.from({ length: 8 }).map((_, idx) => (
                <SkeletonAlbumCard key={idx} />
              ))}
            </div>
          ) : albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
              {albums.map((album) => (
                <Link
                  key={album.id} 
                  href={`/gallery/${album.id}`}
                  className="flex flex-col group cursor-pointer no-underline"
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
                      {album.totalMediaCount} Items
                    </span>
                  </div>
                </Link>
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
      </div>
    </div>
  );
}
