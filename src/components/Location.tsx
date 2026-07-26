"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const nearbyAttractions = [
  { name: "Mullakkal Temple", distance: "0.5 km", time: "2 min" },
  { name: "Alleppey Lighthouse", distance: "2 km", time: "8 min" },
  { name: "Alleppey Beach", distance: "3 km", time: "10 min" },
  { name: "Vembanad Lake", distance: "1 km", time: "5 min" },
  { name: "Alleppey Railway Station", distance: "2.5 km", time: "8 min" },
  { name: "Cochin International Airport", distance: "85 km", time: "2 hr" },
];

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-backwater-100 text-backwater-700 text-sm font-medium rounded-full mb-4">
            Prime Location
          </span>
          <h2 className="section-title">Where To Find Us</h2>
          <p className="section-subtitle mx-auto">
            Located in the heart of Alleppey, with easy access to all major
            attractions and backwater routes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden shadow-card border border-gray-100"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.9!2d76.3388!3d9.4981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjknNTMuMiJOIDc2wrAyMCcxOS43IkU!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] lg:h-full min-h-[400px]"
              title="Kalappura Houseboats Location"
            />
          </motion.div>

          {/* Nearby Attractions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sand-50 to-white border border-sand-200">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">
                Our Address
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mullackal Ward, Iron Bridge P.O
                <br />
                Thirumala East Gate Road
                <br />
                Alleppey, Kerala 688011, India
              </p>
              <a
                href="https://maps.google.com/?q=Kalappura+Houseboats+Alleppey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
              >
                <span>Get Directions</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>

            {/* Location Rating */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                  9.8
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Excellent Location</p>
                  <p className="text-sm text-gray-600">Top rated area in Alleppey</p>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                Nearby Attractions
              </h3>
              <div className="space-y-3">
                {nearbyAttractions.map((place) => (
                  <div
                    key={place.name}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gold-400" />
                      <span className="text-sm text-gray-700">{place.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">
                        {place.distance} • {place.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
