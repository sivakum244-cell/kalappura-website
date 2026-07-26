"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function HostSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-gradient-luxury" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-4">
            Your Hosts
          </span>
          <h2 className="section-title mb-8">Meet Our Team</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-gray-100"
        >
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-3xl font-display font-bold mb-4 shadow-gold">
              JJ
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900">
              Jose J
            </h3>
            <p className="text-gold-600 font-medium mb-4">Owner & Host</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">
              &quot;Welcome to Kalappura! I&apos;ve spent over 15 years in hospitality,
              ensuring every guest experiences the true beauty of Kerala&apos;s
              backwaters. Our team is dedicated to making your stay unforgettable -
              from the moment you board until your departure. We treat every guest
              as family.&quot;
            </p>

            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg">
              {[
                { label: "Years Experience", value: "15+" },
                { label: "Happy Guests", value: "5000+" },
                { label: "Response Time", value: "<1 hr" },
                { label: "Languages", value: "4" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-sand-50 rounded-xl">
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
