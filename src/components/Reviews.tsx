"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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

  // Review + AggregateRating structured data (10-point scale) built from the
  // real REVIEWS + SITE_CONFIG data. Enables star-rating rich results.
  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE_CONFIG.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE_CONFIG.rating,
      bestRating: 10,
      worstRating: 1,
      reviewCount: SITE_CONFIG.reviewCount,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 10,
        worstRating: 1,
      },
      name: r.title,
      reviewBody: r.text,
    })),
  };

  return (
    <section id="reviews" className="section-padding bg-gradient-luxury" ref={ref}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
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

          {/* Verifiable third-party review sources */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href={SITE_CONFIG.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read and leave Kalappura Houseboats reviews on Google (opens in a new tab)"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              {/* Google G */}
              <svg className="w-4 h-4" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Reviews on Google
            </a>
            <a
              href={SITE_CONFIG.tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read Kalappura Houseboats reviews on TripAdvisor (opens in a new tab)"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 underline-offset-2 hover:underline"
            >
              <span className="text-emerald-600" aria-hidden="true">◉◉</span>
              Reviews on TripAdvisor
              <svg aria-hidden="true" focusable="false" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
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
              <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
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
          <Link href="/review" className="btn-outline inline-flex items-center gap-2">
            Read &amp; Leave a Review
            <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
