"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Rooms", href: "#rooms" },
    { name: "Gallery", href: "#gallery" },
    { name: "Experiences", href: "#experiences" },
    { name: "Reviews", href: "#reviews" },
    { name: "Offers", href: "#offers" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isScrolled
                  ? "bg-gold-500 text-white"
                  : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
                <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                <path d="M12 10v4" />
                <path d="M12 2v3" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-display text-lg font-bold leading-tight transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Kalappura
              </p>
              <p
                className={`text-xs font-body transition-colors duration-300 ${
                  isScrolled ? "text-gray-500" : "text-white/70"
                }`}
              >
                Houseboats & Tours
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? "text-gray-700 hover:text-gold-600 hover:bg-gold-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                isScrolled
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-white/10 text-white backdrop-blur-sm border border-white/20"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
              <span>★ {SITE_CONFIG.rating} Exceptional</span>
            </div>

            <a
              href="#rooms"
              className={`hidden md:inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? "bg-gold-500 text-white shadow-gold hover:bg-gold-600"
                  : "bg-white text-gray-900 hover:bg-gold-50"
              }`}
            >
              Book Now
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white/98 backdrop-blur-xl shadow-2xl rounded-b-3xl border-b border-gray-100 lg:hidden"
          >
            <nav className="p-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-gold-600 hover:bg-gold-50 rounded-xl font-medium transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="#rooms"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center btn-primary"
                >
                  Book Now
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
