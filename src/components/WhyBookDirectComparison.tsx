"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhyBookDirectComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const comparisons = [
    {
      feature: "Price per night",
      direct: "₹15,000",
      ota: "₹17,500–₹19,000",
      directWins: true,
    },
    {
      feature: "Instant confirmation",
      direct: "✓",
      ota: "✓",
      directWins: false,
    },
    {
      feature: "Free cancellation (7 days)",
      direct: "✓",
      ota: "Sometimes",
      directWins: true,
    },
    {
      feature: "Pay only 20% advance",
      direct: "✓",
      ota: "Full payment upfront",
      directWins: true,
    },
    {
      feature: "Direct WhatsApp support",
      direct: "✓",
      ota: "✗ Via platform only",
      directWins: true,
    },
    {
      feature: "Special request handling",
      direct: "Direct with crew",
      ota: "Via middleman",
      directWins: true,
    },
    {
      feature: "Best price guarantee",
      direct: "✓",
      ota: "✗",
      directWins: true,
    },
    {
      feature: "Flexible date changes",
      direct: "Free (subject to availability)",
      ota: "Fees may apply",
      directWins: true,
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-emerald-50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
            Save More
          </span>
          <h2 className="section-title">Why Book Direct With Us?</h2>
          <p className="section-subtitle mx-auto">
            Skip the middleman. Booking directly gives you better prices, more flexibility, and personal service.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
            <div className="px-4 py-3 md:px-6 md:py-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</p>
            </div>
            <div className="px-4 py-3 md:px-6 md:py-4 text-center bg-emerald-50 border-x border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Book Direct</p>
              <p className="text-[10px] text-emerald-600 mt-0.5">alleppeyhouseboat.online</p>
            </div>
            <div className="px-4 py-3 md:px-6 md:py-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">OTA Platforms</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Booking.com, MakeMyTrip, etc.</p>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}
            >
              <div className="px-4 py-3 md:px-6 md:py-4 flex items-center">
                <span className="text-sm text-gray-700">{row.feature}</span>
              </div>
              <div className={`px-4 py-3 md:px-6 md:py-4 text-center flex items-center justify-center border-x ${row.directWins ? "bg-emerald-50/50 border-emerald-50" : "border-gray-50"}`}>
                <span className={`text-sm font-semibold ${row.directWins ? "text-emerald-700" : "text-gray-700"}`}>
                  {row.direct}
                </span>
              </div>
              <div className="px-4 py-3 md:px-6 md:py-4 text-center flex items-center justify-center">
                <span className="text-sm text-gray-500">{row.ota}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Savings callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-lg">
            <div className="text-left">
              <p className="text-sm font-semibold">Save up to ₹4,000/night</p>
              <p className="text-xs text-emerald-200">by booking directly on our website</p>
            </div>
            <a href="/booking" className="px-4 py-2 bg-white text-emerald-700 font-bold rounded-xl text-sm hover:bg-emerald-50 transition-colors">
              Book Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
