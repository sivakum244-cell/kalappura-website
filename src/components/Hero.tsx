"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingEngine from "./BookingEngine";
import { SITE_CONFIG } from "@/lib/constants";

const heroImages = [
  "/images/gallery/drone-1.jpg",
  "/images/rooms/standard-cabin/1.jpg",
  "/images/rooms/suite-river-view/1.jpg",
  "/images/rooms/double-twin-room/1.jpg",
  "/images/gallery/sunset-1.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImage]}
              alt="Kalappura Houseboats"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        
        {/* Animated grain texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"1\"/%3E%3C/svg%3E')" }} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-32 h-32 rounded-full border border-gold-400/20"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-10 w-48 h-48 rounded-full border border-white/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-4 h-4 border border-gold-400/30 rotate-45"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-left">
            {/* Location Tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Alleppey, Kerala • India</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              <span className="block">Cruise the</span>
              <span className="block relative">
                <span className="text-gradient-gold">Backwaters</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                />
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 font-accent font-light text-white/80">in Pure Luxury</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed"
            >
              Handcrafted traditional houseboats with modern luxury. 
              Wake up to serene backwaters, savor authentic Kerala cuisine, 
              and create memories that last a lifetime.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold text-sm">{SITE_CONFIG.rating}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Exceptional</p>
                  <p className="text-white/50 text-xs">{SITE_CONFIG.reviewCount}+ reviews</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <span className="text-gold-400 text-lg">★</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">5-Star</p>
                  <p className="text-white/50 text-xs">Luxury Stay</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-backwater-500/20 flex items-center justify-center">
                  <span className="text-backwater-400 text-lg">🚢</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">3 Boat Types</p>
                  <p className="text-white/50 text-xs">1, 2 & 3 Bedroom</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#rooms"
                className="px-8 py-4 gold-gradient text-white font-semibold rounded-2xl shadow-gold hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-sm uppercase tracking-wider"
              >
                View Houseboats
              </a>
              <a
                href="https://wa.me/919895053528?text=Hi! I'd like to know more about houseboat bookings."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </motion.div>

            {/* Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/10"
            >
              {["Best Price Guarantee", "Instant Confirmation", "Free Cancellation*", "20% Advance Only"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-xs text-white/60">
                  <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Booking Engine */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hidden lg:block"
          >
            <BookingEngine />
          </motion.div>
        </div>

        {/* Mobile Booking Engine (below on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="lg:hidden mt-10"
        >
          <BookingEngine />
        </motion.div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentImage ? "w-8 h-2 bg-gold-400" : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 right-8 z-10 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/40 text-xs uppercase tracking-widest rotate-90 origin-center translate-y-6">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
