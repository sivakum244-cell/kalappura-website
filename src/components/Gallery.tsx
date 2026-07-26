"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const galleryImages = [
  {
    src: "/images/gallery/drone-1.jpg",
    alt: "Aerial view of Kerala backwaters",
    category: "Drone",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/gallery/deck-1.jpg",
    alt: "Luxury houseboat deck",
    category: "Deck",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/dining-1.jpg",
    alt: "Traditional Kerala dining",
    category: "Dining",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/bedroom-1.jpg",
    alt: "Luxury bedroom interior",
    category: "Bedroom",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/sunset-1.jpg",
    alt: "Sunset over backwaters",
    category: "Sunset",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/gallery/kitchen-1.jpg",
    alt: "Kitchen area",
    category: "Kitchen",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/river-1.jpg",
    alt: "River landscape",
    category: "River",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/food-1.jpg",
    alt: "Kerala food spread",
    category: "Food",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/interior-1.jpg",
    alt: "Interior decor",
    category: "Interior",
    span: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-backwater-100 text-backwater-700 text-sm font-medium rounded-full mb-4">
            Visual Journey
          </span>
          <h2 className="section-title">Property Gallery</h2>
          <p className="section-subtitle mx-auto">
            Take a virtual tour through our luxury houseboats and experience the
            beauty of Kerala backwaters.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group image-shine ${image.span}`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <button className="btn-outline inline-flex items-center gap-2">
            <span>View All Photos</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl w-full aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full object-cover"
              />
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Close lightbox"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(
                    selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(
                    selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">
                  {galleryImages[selectedImage].alt}
                </p>
                <p className="text-white/60 text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
