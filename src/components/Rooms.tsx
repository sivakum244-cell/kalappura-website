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
            Our Houseboats
          </span>
          <h2 className="section-title">Choose Your Houseboat</h2>
          <p className="section-subtitle mx-auto">
            Three houseboat types to suit every group size.
            Each features traditional Kerala architecture with modern luxury.
          </p>
        </motion.div>

        {/* Boat Cards */}
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
              <div className="relative h-56 overflow-hidden">
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
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-medium text-white">Available</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name */}
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold text-gray-900 leading-tight">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {room.beds}
                  </p>
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
                    <span className="text-sm text-gray-500">/room/night</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">+ 18% GST • Max {room.maxGuests} guests</p>
                </div>

                {/* Room Details */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">🛏️</span>
                    <span>{room.bedrooms} Room{room.bedrooms > 1 ? "s" : ""} • {room.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">👥</span>
                    <span>Max {room.maxGuests} guests (2+1 per room)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">🍽️</span>
                    <span>All meals included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">❄️</span>
                    <span>Air Conditioning</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">🌊</span>
                    <span>Lake & River Views</span>
                  </div>
                </div>

                {/* Amenities quick list */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.amenities.slice(0, 5).map((amenity) => (
                    <span key={amenity} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-full text-[10px]">
                      {amenity}
                    </span>
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

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          All houseboats available with Standard, Premium & Semi Luxury packages.
          18% GST applicable. Children (6-11): ₹1,000 extra. • Extra bed: ₹1,000.
        </motion.p>
      </div>
    </section>
  );
}
