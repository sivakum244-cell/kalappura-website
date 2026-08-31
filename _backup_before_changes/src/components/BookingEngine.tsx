"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BookingEngine() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-5">
          <h3 className="text-white font-display text-lg font-bold">Quick Booking</h3>
          <p className="text-white/50 text-xs mt-1">Check availability & prices</p>
        </div>

        <div className="space-y-4">
          {/* Check In */}
          <div>
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1 block">
              Check In
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 transition-all [color-scheme:dark]"
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1 block">
              Check Out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 transition-all [color-scheme:dark]"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1 block">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n} className="text-gray-900">
                  {n} Guest{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 gold-gradient text-white font-bold rounded-xl shadow-gold hover:shadow-lg transition-all duration-300 text-sm uppercase tracking-wider"
          >
            Check Availability
          </motion.button>
        </div>

        {/* Price hint */}
        <p className="text-center text-white/40 text-xs mt-4">
          From ₹15,300/night • 20% advance, balance at property
        </p>
      </div>
    </form>
  );
}
