"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GallerySection() {
  const allImages = [
    { src: "/images/classroom.png", alt: "Smart Classroom Activity" },
    { src: "/images/robotics.png", alt: "Classroom Activity" },
    { src: "/images/library.png", alt: "Modern Computer Lab" },
    { src: "/images/study.png", alt: "Students Study Hall" },
    { src: "/images/art.png", alt: "Art and Craft Room" },
    // Fillers for desktop to complete a 3x3 grid
    { src: "/images/classroom.png", alt: "Smart Classroom Activity (Alt View)" },
    { src: "/images/library.png", alt: "Modern Computer Lab (Alt View)" },
    { src: "/images/art.png", alt: "Art and Craft Room (Alt View)" },
    { src: "/images/study.png", alt: "Students Study Hall (Alt View)" },
  ];

  const [images, setImages] = React.useState(allImages);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImages(allImages.slice(0, 5));
      } else {
        setImages(allImages);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    <section id="gallery" className="w-full py-8 md:py-10 px-6 md:px-12  flex justify-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 select-none">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-xs font-bold text-[#0fa958] uppercase tracking-[0.25em] mb-1.5"
          >
            Our Campus
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight"
          >
            Explore Our <span className="text-[#0fa958]">World-Class Campus</span>
          </motion.h2>
        </div>

        {/* Gallery Grid with Staggered Slide In */}
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
              className="relative aspect-[1.85] w-full rounded-xl md:rounded-[20px] overflow-hidden shadow-sm border border-slate-100/80 hover:shadow-md cursor-pointer bg-slate-50"
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

      </div>
    </section>
  );
}

