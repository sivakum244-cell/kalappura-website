"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ROOMS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function RoomDetailContent() {
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
            Houseboat Not Found
          </h1>
          <Link href="/#rooms" className="text-gold-600 hover:underline">
            ← Browse All Houseboats
          </Link>
        </div>
      </div>
    );
  }

  // Generate descriptive alt texts for room images
  const getImageAlt = (index: number) => {
    const altTexts = [
      `${room.name} exterior view - Kalappura Houseboats, Alleppey`,
      `${room.name} bedroom with AC and backwater views`,
      `${room.name} private bathroom with modern amenities`,
      `${room.name} living area and deck on Kerala backwaters`,
      `${room.name} dining area onboard the houseboat`,
      `Backwater view from ${room.name} deck, Alleppey`,
      `${room.name} kitchen area with traditional Kerala setup`,
      `${room.name} terrace overlooking Vembanad Lake`,
      `${room.name} interior furnishings and decor`,
      `Sunset view from ${room.name} on Alleppey backwaters`,
    ];
    return altTexts[index % altTexts.length];
  };

  // Room-specific SEO descriptions for structured content
  const roomDescription = {
    "standard-cabin": {
      highlight: "Ideal for families and groups",
      suitableFor: "families, friend groups, and large parties",
    },
    "double-twin-room": {
      highlight: "Perfect for small families and friends",
      suitableFor: "small families, couples travelling together, and friend groups",
    },
    "suite-river-view": {
      highlight: "Ideal for couples and honeymooners",
      suitableFor: "couples, honeymooners, and solo travellers seeking privacy",
    },
  };

  const roomInfo = roomDescription[room.id as keyof typeof roomDescription];

  // JSON-LD structured data for this room
  const roomJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${room.name} - Kalappura Houseboats`,
    description: room.description,
    image: room.images.map(
      (img) => `${typeof window !== "undefined" ? window.location.origin : "https://alleppeyhouseboat.online"}${img}`
    ),
    brand: {
      "@type": "Brand",
      name: "Kalappura Houseboats & Tours",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: room.price,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      url: `https://alleppeyhouseboat.online/rooms/${room.slug}`,
      seller: {
        "@type": "Organization",
        name: "Kalappura Houseboats & Tours",
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Bedrooms", value: room.bedrooms },
      { "@type": "PropertyValue", name: "Max Guests", value: room.maxGuests },
      { "@type": "PropertyValue", name: "Air Conditioning", value: "Yes" },
      { "@type": "PropertyValue", name: "Meals Included", value: "All meals" },
      { "@type": "PropertyValue", name: "Location", value: "Alleppey, Kerala" },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://alleppeyhouseboat.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Houseboats",
        item: "https://alleppeyhouseboat.online/alleppey-houseboats",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: room.name,
        item: `https://alleppeyhouseboat.online/rooms/${room.slug}`,
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/#rooms"
            className="flex items-center gap-2 text-gray-700 hover:text-gold-600 transition-colors"
          >
            <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">All Houseboats</span>
          </Link>
          {/* Breadcrumb (visible for SEO, subtle styling) */}
          <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1 text-xs text-gray-400">
            <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/alleppey-houseboats" className="hover:text-gold-600 transition-colors">Houseboats</Link>
            <span>/</span>
            <span className="text-gray-600">{room.name}</span>
          </nav>
          <motion.a
            href={`/booking?room=${room.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 gold-gradient text-white font-semibold rounded-xl shadow-gold text-sm"
          >
            Book This Houseboat
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
                    alt={getImageAlt(activeImage)}
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
                    alt={`${room.name} photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
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
                  {room.name} — Alleppey Backwaters
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {room.description}
                </p>
                {roomInfo && (
                  <p className="text-sm text-gray-500 mt-2">
                    {roomInfo.highlight}. This private houseboat in Alleppey (Alappuzha) is suitable for {roomInfo.suitableFor}.
                  </p>
                )}
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
                  <p className="text-sm text-gray-500">Boat Size</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {room.maxGuests}
                  </p>
                  <p className="text-sm text-gray-500">Max Guests</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">AC</p>
                  <p className="text-sm text-gray-500">Air Conditioned</p>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                  What&apos;s Included in Your Stay
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Overnight backwater cruise",
                    "All meals (lunch, tea, dinner, breakfast)",
                    "Air-conditioned bedroom",
                    "Private bathroom",
                    "Onboard kitchen & chef",
                    "Cruise through Vembanad Lake",
                    "Village canal cruise",
                    "Free parking at dock",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 py-1.5">
                      <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                  Houseboat Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl"
                    >
                      <svg aria-hidden="true" focusable="false"
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
              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                  Policies
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
                    <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-emerald-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-blue-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-gold-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">All Meals Included</p>
                      <p className="text-sm text-gray-600">
                        Breakfast, lunch, evening tea with snacks, and dinner included in all bookings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal links to related pages */}
              <div className="p-6 bg-sand-50 rounded-2xl">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-3">
                  Explore More
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="/houseboat-packages" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-colors">
                    View Packages
                  </Link>
                  <Link href="/houseboat-prices" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-colors">
                    See All Prices
                  </Link>
                  <Link href="/alleppey-houseboats" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-colors">
                    All Houseboats
                  </Link>
                  <Link href="/overnight-houseboat" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-colors">
                    Overnight Stay Info
                  </Link>
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
                    <span className="text-gray-500">/room/night</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(room.originalPrice)}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                      Save {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+ 18% GST • All meals included</p>
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
                    Only {room.availability} boat{room.availability > 1 ? "s" : ""} left!
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

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/919895053528?text=Hi! I'm interested in the ${room.name} for ${checkIn || "upcoming dates"}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 mt-3 bg-[#25D366] text-white font-medium rounded-xl text-sm hover:bg-[#20BA5A] transition-colors"
                >
                  Enquire on WhatsApp
                </a>

                {/* Trust Items */}
                <div className="mt-4 space-y-2">
                  {[
                    "Best Price Guarantee",
                    "Instant Confirmation",
                    "20% Advance, Balance at Property",
                    "Free Cancellation (7 days prior)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <svg aria-hidden="true" focusable="false"
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
