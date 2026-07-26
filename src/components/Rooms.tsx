"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ROOMS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rooms" className="section-padding bg-sand-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-teak-100 text-teak-700 text-sm font-medium rounded-full mb-4">
            Our Accommodations
          </span>
          <h2 className="section-title">Choose Your Perfect Stay</h2>
          <p className="section-subtitle mx-auto">
            Three unique accommodation types, each offering luxury, comfort, and
            stunning backwater views.
          </p>
        </motion.div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ROOMS.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-card card-hover border border-gray-100/50"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gold-700">
                  {room.badge}
                </div>
                {/* Availability */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-medium text-white">
                    Only {room.availability} left
                  </span>
                </div>
                {/* Price overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm line-through">
                      {formatPrice(room.originalPrice)}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full font-medium">
                      Save {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Room Name & Price */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 leading-tight">
                      {room.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {room.bedrooms} Bedroom • {room.size} • Max {room.maxGuests} Guests
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-500">Starting from</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(room.price)}
                    </span>
                    <span className="text-sm text-gray-500">/night</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.amenities.slice(0, 6).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={`/rooms/${room.slug}`}
                    className="flex-1 text-center px-4 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 hover:text-gold-600 transition-all duration-300 text-sm"
                  >
                    View Details
                  </a>
                  <motion.a
                    href={`/booking?room=${room.id}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 text-center px-4 py-3 gold-gradient text-white font-semibold rounded-xl shadow-gold text-sm"
                  >
                    Book Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compare Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          All prices include breakfast, lunch, dinner & evening tea.
          15% GST applicable. Children (6-11): ₹1,000 extra. • Free cancellation up to 7 days before check-in.
        </motion.p>
      </div>
    </section>
  );
}
