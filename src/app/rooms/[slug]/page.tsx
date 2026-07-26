"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ROOMS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function RoomDetailPage() {
  const params = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const room = ROOMS.find((r) => r.slug === params.slug);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Room Not Found
          </h1>
          <Link href="/" className="text-gold-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/#rooms"
            className="flex items-center gap-2 text-gray-700 hover:text-gold-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Rooms</span>
          </Link>
          <motion.a
            href={`/booking?room=${room.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 gold-gradient text-white font-semibold rounded-xl shadow-gold text-sm"
          >
            Book This Room
          </motion.a>
        </div>
      </div>

      <div className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mb-12"
          >
            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <img
                    src={room.images[activeImage]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {activeImage + 1} / {room.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-hidden">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-shrink-0 w-24 h-24 lg:w-full lg:h-32 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? "border-gold-500 shadow-gold"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${room.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            {/* Room Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Title & Badge */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-gold-50 text-gold-700 text-sm font-medium rounded-full mb-3">
                  {room.badge}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {room.name}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-sand-50 rounded-2xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {room.bedrooms}
                  </p>
                  <p className="text-sm text-gray-500">Bedroom{room.bedrooms > 1 ? "s" : ""}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{room.size}</p>
                  <p className="text-sm text-gray-500">Room Size</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {room.maxGuests}
                  </p>
                  <p className="text-sm text-gray-500">Max Guests</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{room.beds}</p>
                  <p className="text-sm text-gray-500">Bed Type</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                  Room Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl"
                    >
                      <svg
                        className="w-4 h-4 text-emerald-500 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                  Room Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {room.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                  Policies
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
                    <svg className="w-5 h-5 text-emerald-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Free Cancellation</p>
                      <p className="text-sm text-gray-600">
                        Cancel up to 7 days before check-in for a full refund.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Check-in: 12:00 PM</p>
                      <p className="text-sm text-gray-600">
                        Check-out by 9:00 AM. Late check-out available on request.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gold-50 rounded-xl">
                    <svg className="w-5 h-5 text-gold-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Meals Included</p>
                      <p className="text-sm text-gray-600">
                        Breakfast, lunch, evening tea, and dinner included in all bookings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Card (Sticky) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-white rounded-3xl border border-gray-200 shadow-luxury p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(room.price)}
                    </span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(room.originalPrice)}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                      Save {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none"
                    >
                      {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map(
                        (n) => (
                          <option key={n} value={n}>
                            {n} Guest{n > 1 ? "s" : ""}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm text-red-700 font-medium">
                    Only {room.availability} room{room.availability > 1 ? "s" : ""} left!
                  </span>
                </div>

                {/* Book Button */}
                <motion.a
                  href={`/booking?room=${room.id}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-center py-4 gold-gradient text-white font-bold rounded-xl shadow-gold text-lg"
                >
                  Book Now
                </motion.a>

                {/* Trust Items */}
                <div className="mt-4 space-y-2">
                  {[
                    "Best Price Guarantee",
                    "Instant Confirmation",
                    "No Credit Card Needed",
                    "Free Cancellation*",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-xs text-gray-500">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
