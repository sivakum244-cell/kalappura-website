"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TrustBadges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
        >
          {/* Booking.com */}
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-[#003580] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <text x="2" y="18" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">B.</text>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold text-[#003580]">9.8</span>
                <span className="text-xs font-medium text-gray-500">/10</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Booking.com Rating</p>
              <p className="text-[10px] text-gray-400">Exceptional • Guest Favourite</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200" />

          {/* TripAdvisor */}
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-[#00AF87] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 24 24" fill="white">
                <circle cx="8" cy="14" r="3" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="16" cy="14" r="3" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="8" cy="14" r="1" fill="white" />
                <circle cx="16" cy="14" r="1" fill="white" />
                <path d="M12 6C8 6 5 8 4 10h3a5 5 0 015-3 5 5 0 015 3h3c-1-2-4-4-8-4z" fill="white" />
                <path d="M12 4l2-2M12 4l-2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold text-[#00AF87]">#1</span>
                <span className="text-xs font-medium text-gray-500">of 118</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Tripadvisor Ranking</p>
              <p className="text-[10px] text-gray-400">Top Houseboat in Alleppey</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200" />

          {/* Airbnb Superhost */}
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-[#FF5A5F] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.5 2 6 5 6 8c0 4 6 12 6 12s6-8 6-12c0-3-2.5-6-6-6z" fill="none" stroke="white" strokeWidth="1.5" />
                <path d="M12 5a3.5 3.5 0 00-3.5 3.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5A3.5 3.5 0 0012 5z" fill="white" fillOpacity="0.3" />
                <circle cx="12" cy="8.5" r="1.5" fill="white" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-[#FF5A5F]">Superhost</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Airbnb Recognition</p>
              <p className="text-[10px] text-gray-400">Consecutive years • Top rated</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
