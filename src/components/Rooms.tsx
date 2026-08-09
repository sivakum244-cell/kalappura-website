"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { formatPrice } from "@/lib/utils";

const PACKAGES = [
  {
    id: "standard",
    name: "Standard Package",
    price: 15000,
    image: "/images/rooms/standard-cabin/1.jpg",
    badge: "Most Popular",
    subtitle: "1 Night Stay",
    highlights: [
      "AC: 8:30 PM – 6:30 AM (Bedroom)",
      "Welcome Drinks: Lime Juice",
      "1 Non-Veg option per meal",
      "5 Cruise Routes",
      "All Meals Included",
      "Breakfast + Lunch + Tea + Dinner",
    ],
    routes: "Kainakari • Kuppappuram • Vembanad Lake • Punnamada Lake • Pallathuruthi",
    availability: 3,
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 19000,
    image: "/images/rooms/double-twin-room/1.jpg",
    badge: "Upgrade",
    subtitle: "1 Night Stay",
    highlights: [
      "AC: 5:30 PM – 7:30 AM (Bedroom/Hall)",
      "Welcome Drinks: Tender Coconut",
      "2 Non-Veg options per meal",
      "7 Cruise Routes",
      "All Meals Included",
      "Full Breakfast (all options served)",
    ],
    routes: "Kainakari • Kuppappuram • Vembanad Lake • Punnamada Lake • Meenappally Lake • Meenappally Village • Pallathuruthi",
    availability: 2,
  },
  {
    id: "luxury",
    name: "Semi Luxury Package",
    price: 24000,
    image: "/images/rooms/suite-river-view/1.jpg",
    badge: "Best Experience",
    subtitle: "1 Night Stay",
    highlights: [
      "AC: All the time (Bedroom or Hall)",
      "Welcome Drinks: Tender Coconut",
      "2 Non-Veg options per meal",
      "7 Cruise Routes",
      "All Meals Included",
      "Full Breakfast (all options served)",
    ],
    routes: "Kainakari • Kuppappuram • Vembanad Lake • Punnamada Lake • Meenappally Lake • Meenappally Village • Pallathuruthi",
    availability: 1,
  },
];

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
            Our Packages
          </span>
          <h2 className="section-title">Choose Your Package</h2>
          <p className="section-subtitle mx-auto">
            Three unique packages — same houseboats, different levels of luxury.
            All include meals, cruise, and stunning backwater views.
          </p>
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-card card-hover border border-gray-100/50"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gold-700">
                  {pkg.badge}
                </div>
                {/* Availability */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-medium text-white">
                    Available
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name & Subtitle */}
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold text-gray-900 leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{pkg.subtitle} • All 3 Boat Types</p>
                </div>

                {/* Price */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="text-sm text-gray-500">/room/night</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">+ 18% GST • Per room selected</p>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-5">
                  {pkg.highlights.map((highlight) => (
                    <div
                      key={highlight}
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
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Cruise Routes */}
                <div className="mb-5 p-3 bg-teal-50 rounded-xl">
                  <p className="text-xs font-medium text-teal-700 mb-1">🗺️ Cruise Routes:</p>
                  <p className="text-xs text-teal-600">{pkg.routes}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href="#offers"
                    className="flex-1 text-center px-4 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 hover:text-gold-600 transition-all duration-300 text-sm"
                  >
                    View Details
                  </a>
                  <motion.a
                    href={`/booking?room=standard-cabin&package=${pkg.id}`}
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
          All packages available on 1 Bedroom, 2 Bedroom & 3 Bedroom Houseboats.
          18% GST applicable. Children (6-11): ₹1,000 extra. • Free cancellation up to 7 days before check-in.
        </motion.p>
      </div>
    </section>
  );
}
