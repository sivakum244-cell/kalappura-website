"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Best Price Guarantee",
    description: "Book direct and get the lowest price. We match any OTA rate plus give you an extra 10% off.",
    highlight: "Save 10-25%",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Flexible Cancellation",
    description: "Plans change, we understand. Free cancellation up to 7 days before your arrival date.",
    highlight: "Risk-Free",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "No Credit Card Needed",
    description: "Reserve your houseboat without any payment. Pay at property or choose online payment.",
    highlight: "Pay Later",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    title: "Exclusive Direct Offers",
    description: "Complimentary upgrades, welcome drinks, and special experiences only for direct bookers.",
    highlight: "VIP Perks",
  },
];

export default function WhyBookDirect() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-gradient-luxury" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-4">
            Direct Booking Benefits
          </span>
          <h2 className="section-title">Why Book Direct?</h2>
          <p className="section-subtitle mx-auto">
            Skip the middleman. Book directly with us and enjoy exclusive benefits
            you won&apos;t find anywhere else.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-white rounded-3xl p-8 shadow-card card-hover border border-gray-100/50"
            >
              {/* Highlight Badge */}
              <span className="absolute top-4 right-4 text-xs font-semibold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full">
                {benefit.highlight}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-50 flex items-center justify-center text-gold-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
