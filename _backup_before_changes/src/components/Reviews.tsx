"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { REVIEWS, SITE_CONFIG } from "@/lib/constants";

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ratingCategories = [
    { name: "Cleanliness", score: 9.8 },
    { name: "Comfort", score: 9.7 },
    { name: "Location", score: 9.8 },
    { name: "Facilities", score: 9.5 },
    { name: "Staff", score: 9.9 },
    { name: "Value", score: 9.6 },
  ];

  return (
    <section id="reviews" className="section-padding bg-gradient-luxury" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-4">
            Guest Reviews
          </span>
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle mx-auto">
            Real reviews from verified guests who experienced our hospitality.
          </p>
        </motion.div>

        {/* Rating Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            {/* Overall Score */}
            <div className="text-center md:border-r border-gray-100 md:pr-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500 text-white">
                <span className="text-3xl font-bold">{SITE_CONFIG.rating}</span>
              </div>
              <p className="font-bold text-gray-900 mt-3">Exceptional</p>
              <p className="text-sm text-gray-500">
                {SITE_CONFIG.reviewCount}+ verified reviews
              </p>
              <div className="flex justify-center mt-2">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-gold-400 text-lg">
                    {star}
                  </span>
                ))}
              </div>
            </div>

            {/* Category Ratings */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ratingCategories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{cat.name}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {cat.score}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(cat.score / 10) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-luxury transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-sm font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {review.flag} {review.country}
                    </p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold">
                  {review.rating}
                </div>
              </div>

              {/* Content */}
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400">{review.date}</span>
                <span className="text-xs text-emerald-600 font-medium">
                  ✓ Verified Guest
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-10"
        >
          <button className="btn-outline inline-flex items-center gap-2">
            Read All {SITE_CONFIG.reviewCount}+ Reviews
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
