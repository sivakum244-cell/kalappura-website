"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AMENITIES } from "@/lib/constants";

const amenityIcons: Record<string, JSX.Element> = {
  car: <path d="M7 17m-2 0a2 2 0 104 0 2 2 0 10-4 0M17 17m-2 0a2 2 0 104 0 2 2 0 10-4 0M5 17H3v-6l2-5h9l4 5h1a2 2 0 012 2v4h-2m-4 0H9" />,
  plane: <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
  utensils: <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />,
  coffee: <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 2v4M10 2v4M14 2v4" />,
  wifi: <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />,
  users: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
  ban: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM4.93 4.93l14.14 14.14" />,
  "cup-soda": <path d="M6 8h12l-1.5 12a2 2 0 01-2 2h-5a2 2 0 01-2-2L6 8zM5 4h14M10 4V2M14 4V2M8 8l1 8M16 8l-1 8" />,
  "chef-hat": <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 019.18 0A4 4 0 0118 13.87V21H6v-7.13zM6 17h12" />,
  mountain: <path d="M8 3l4 8 5-5 2 15H2L8 3z" />,
  waves: <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.4 2 5 2c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.4 2 5 2c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />,
  sparkles: <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />,
  shirt: <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />,
  bell: <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />,
  accessibility: <path d="M12 2a2 2 0 100 4 2 2 0 000-4zM16 8H8l1 6h6l1-6zM12 14v8M8 22l2-4M16 22l-2-4" />,
  fish: <path d="M6.5 12c4.5-4.5 8-2 11 1-3 3-6.5 5.5-11 1zM3.5 12L2 10l2-1-1-2 3 1M15 12h.01" />,
  sparkle: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};

export default function Amenities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-sand-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-teak-100 text-teak-700 text-sm font-medium rounded-full mb-4">
            Facilities
          </span>
          <h2 className="section-title">Amenities & Services</h2>
          <p className="section-subtitle mx-auto">
            Everything you need for a comfortable and luxurious stay on the water.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {AMENITIES.map((amenity, index) => (
            <motion.div
              key={amenity.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gold-200 hover:shadow-card transition-all duration-300 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-50 to-sand-100 flex items-center justify-center text-gold-600 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {amenityIcons[amenity.icon]}
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {amenity.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
