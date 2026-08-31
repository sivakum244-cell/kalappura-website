"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simulated recent bookings based on common guest patterns
const recentBookings = [
  { name: "Rahul & Priya", city: "Mumbai", room: "1 Bedroom Houseboat", time: "2 hours ago" },
  { name: "Sarah T.", city: "London", room: "3 Bedroom Houseboat", time: "5 hours ago" },
  { name: "Anil Kumar", city: "Bangalore", room: "2 Bedroom Houseboat", time: "8 hours ago" },
  { name: "Hans M.", city: "Berlin", room: "1 Bedroom Houseboat", time: "12 hours ago" },
  { name: "Deepika & Family", city: "Delhi", room: "3 Bedroom Houseboat", time: "1 day ago" },
  { name: "James & Emma", city: "Sydney", room: "1 Bedroom Houseboat", time: "1 day ago" },
  { name: "Arjun S.", city: "Chennai", room: "2 Bedroom Houseboat", time: "2 days ago" },
  { name: "Marie L.", city: "Paris", room: "1 Bedroom Houseboat", time: "2 days ago" },
];

export default function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if user dismissed
    if (dismissed) return;

    // Show first popup after 8 seconds
    const firstTimer = setTimeout(() => {
      setVisible(true);
    }, 8000);

    return () => clearTimeout(firstTimer);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    // Show next one after 25 seconds
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % recentBookings.length);
      setVisible(true);
    }, 25000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [visible, currentIndex, dismissed]);

  const booking = recentBookings[currentIndex];

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-24 md:bottom-6 left-4 z-[80] max-w-[320px]"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
            {/* Close button */}
            <button
              onClick={() => { setVisible(false); setDismissed(true); }}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Dismiss"
            >
              <svg aria-hidden="true" focusable="false" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              {/* Content */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {booking.name} <span className="font-normal text-gray-500">from {booking.city}</span>
                </p>
                <p className="text-xs text-gray-600">
                  Booked <span className="font-medium text-emerald-600">{booking.room}</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{booking.time}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
