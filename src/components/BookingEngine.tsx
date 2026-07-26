"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BookingEngine() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to rooms section
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-5xl mx-auto">
      <div className="glass-card-dark p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Check In */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider">
              Check In
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 transition-all [color-scheme:dark]"
              required
            />
          </div>

          {/* Check Out */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider">
              Check Out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 transition-all [color-scheme:dark]"
              required
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider">
              Guests
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="text-gray-900">
                      {n} Adult{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none cursor-pointer"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n} className="text-gray-900">
                      {n} Child{n !== 1 ? "ren" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider">
              Rooms
            </label>
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none cursor-pointer"
            >
              {[1, 2, 3].map((n) => (
                <option key={n} value={n} className="text-gray-900">
                  {n} Room{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Promo Code & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Promo Code (optional)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 gold-gradient text-white font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all duration-300 text-sm uppercase tracking-wider"
          >
            Search Availability
          </motion.button>
        </div>

        {/* Price Hint */}
        <p className="text-center text-white/50 text-xs mt-3">
          Starting from ₹15,300/night • No credit card needed • Free
          cancellation available
        </p>
      </div>
    </form>
  );
}
