"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SPECIAL_OFFERS } from "@/lib/constants";

export default function SpecialOffers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="offers" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-4">
            Limited Time
          </span>
          <h2 className="section-title">Special Offers</h2>
          <p className="section-subtitle mx-auto">
            Exclusive packages and seasonal deals only available for direct
            bookings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIAL_OFFERS.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl overflow-hidden shadow-card card-hover border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                  {offer.discount}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {offer.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                    {offer.validUntil}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    Book Now →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
