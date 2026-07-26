"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  { icon: "❄️", label: "Air Conditioning" },
  { icon: "🚿", label: "Private Bathrooms" },
  { icon: "🍳", label: "Kitchenette" },
  { icon: "🌊", label: "Lake View" },
  { icon: "🏞️", label: "River View" },
  { icon: "🌅", label: "Private Balcony" },
  { icon: "🍛", label: "Traditional Kerala Food" },
  { icon: "✨", label: "Luxury Interiors" },
  { icon: "👨‍👩‍👧", label: "Family Friendly" },
  { icon: "💑", label: "Couple Friendly" },
];

export default function PropertyOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
              About Our Property
            </span>
            <h2 className="section-title mb-4">
              Comfortable Luxury Accommodation
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Located in Alleppey, Kalappura Houseboats & Tours offers handcrafted
              traditional Kerala houseboats featuring modern luxury amenities. Our
              houseboats are the perfect blend of heritage architecture and
              contemporary comfort, cruising through the serene backwaters of Kerala.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-sand-50 transition-colors"
                >
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 rounded-2xl overflow-hidden">
                  <img
                    src="/images/gallery/drone-1.jpg"
                    alt="Kerala backwaters aerial view"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden">
                  <img
                    src="/images/rooms/standard-cabin/1.jpg"
                    alt="Houseboat interior"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-64 rounded-2xl overflow-hidden">
                  <img
                    src="/images/rooms/double-twin-room/1.jpg"
                    alt="Luxury bedroom"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden">
                  <img
                    src="/images/gallery/sunset-1.jpg"
                    alt="Sunset view"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-luxury border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">9.7 / 10</p>
                  <p className="text-xs text-gray-500">275+ Guest Reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
