"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { getMediaApi } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function GallerySection() {
  const router = useRouter();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMediaApi({ limit: 6 })
      .then(res => {
        if (isMounted && res && res.media) {
          const mapped = res.media.map((m: any) => ({
            src: m.url,
            alt: m.title || "Campus Gallery Media",
            folderId: m.folder?._id || m.folder,
            mediaId: m._id || m.id
          }));
          setImages(mapped);
        }
      })
      .catch((err) => {
        console.error("Error fetching gallery media for home section:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  } as const;

  const imageCardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section id="gallery" className="w-full py-6 md:py-8 px-6 md:px-12 flex justify-center overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-4 select-none">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-xs font-semibold md:font-bold text-brand-green uppercase tracking-[0.25em] mb-1.5"
          >
            Our Campus
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-semibold md:font-extrabold text-slate-800 tracking-tight leading-tight"
          >
            Explore Our <span className="text-brand-green">World-Class Campus</span>
          </motion.h2>
        </div>

        {loading ? (
          <div className="text-slate-400 text-xs font-medium py-12">
            Loading campus gallery...
          </div>
        ) : images.length > 0 ? (
          /* Gallery Grid */
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"
          >
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                variants={imageCardVariants}
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  if (img.folderId && img.mediaId) {
                    router.push(`/gallery/${img.folderId}?mediaId=${img.mediaId}`);
                  } else {
                    router.push('/gallery');
                  }
                }}
                className="relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[1.85] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 hover:shadow-md bg-slate-50 cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Coming Soon Empty Component */
          <div className="bg-white border border-slate-200/80 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-sm max-w-lg w-full my-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center mb-3">
              <ImageIcon size={24} />
            </div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Campus Gallery — Coming Soon</h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-sm">
              Photos and media showcase will be available once uploaded via the admin portal.
            </p>
          </div>
        )}

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <a
            href="/gallery"
            className="inline-block bg-brand-green text-white hover:bg-emerald-700 px-8 py-3.5 rounded-full font-semibold md:font-bold text-sm tracking-wide transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
          >
            View All
          </a>
        </motion.div>

      </div>
    </section>
  );
}
