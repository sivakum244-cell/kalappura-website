"use client";

import { useState } from "react";
import Link from "next/link";
import { ROOMS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { getNightlyRate } from "@/lib/pricing";
import { useAvailability } from "@/components/AvailabilityBadge";

// ============================================================================
// ALLEPPEY HOUSEBOAT COST CALCULATOR
// Estimates total cost using the SAME pricing model as the booking page:
//   base nightly rate (live DB rate or seasonal fallback) + package upgrade,
//   × rooms × nights, plus ₹1,000/child (6-11), ₹1,000/extra bed, + 18% GST.
// This keeps calculator estimates consistent with the actual checkout total.
// ============================================================================

const PACKAGES = [
  { id: "standard", name: "Standard" },
  { id: "premium", name: "Premium" },
  { id: "luxury", name: "Semi Luxury" },
];

const CHILD_CHARGE = 1000;
const EXTRA_BED_CHARGE = 1000;
const GST_RATE = 0.18;

export default function CostCalculator() {
  const { data } = useAvailability();
  const dbRates = data?.rates as Record<string, number> | undefined;

  const [roomType, setRoomType] = useState("suite-river-view");
  const [packageType, setPackageType] = useState("standard");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [children, setChildren] = useState(0);
  const [extraBed, setExtraBed] = useState(0);

  const maxRooms = roomType === "standard-cabin" ? 3 : roomType === "double-twin-room" ? 2 : 1;
  const effectiveRooms = Math.min(rooms, maxRooms);

  const nightlyRate = getNightlyRate(roomType, packageType, checkIn, dbRates);
  const roomCost = nightlyRate * effectiveRooms * nights;
  const childrenCost = children * CHILD_CHARGE * nights;
  const extraBedCost = extraBed * EXTRA_BED_CHARGE * nights;
  const subtotal = roomCost + childrenCost + extraBedCost;
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;
  const advance = Math.round(total * 0.2);

  const bookingHref = `/booking?room=${roomType.replace("suite-river-view", "suite-river-view")}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      {/* Inputs */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Houseboat</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none"
          >
            {ROOMS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} (up to {r.maxGuests} guests)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Package</label>
          <div className="grid grid-cols-3 gap-2">
            {PACKAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPackageType(p.id)}
                className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                  packageType === p.id
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-200"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Check-in Date (optional)</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nights</label>
            <select
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} night{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Rooms</label>
            <select
              value={effectiveRooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none"
            >
              {Array.from({ length: maxRooms }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} room{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Children (6-11)</label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none"
            >
              {[0, 1, 2].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Extra Beds</label>
            <select
              value={extraBed}
              onChange={(e) => setExtraBed(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Children under 5 stay free. Estimates use current base rates and may change on peak dates.
          For an exact quote on your dates, check availability on the booking page.
        </p>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-24 h-fit">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6">
          <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Estimated Cost</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Rate ({formatPrice(nightlyRate)} × {effectiveRooms} × {nights}n)
              </span>
              <span className="font-medium">{formatPrice(roomCost)}</span>
            </div>
            {childrenCost > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Children ({children} × ₹1,000 × {nights}n)</span>
                <span className="font-medium">{formatPrice(childrenCost)}</span>
              </div>
            )}
            {extraBedCost > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Extra beds ({extraBed} × ₹1,000 × {nights}n)</span>
                <span className="font-medium">{formatPrice(extraBedCost)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-orange-600">
              <span>GST (18%)</span>
              <span className="font-medium">+{formatPrice(gst)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-bold text-gray-900">Estimated Total</span>
              <span className="font-bold text-gray-900 text-lg">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 bg-emerald-50 p-2 rounded-lg mt-1">
              <span className="font-medium">20% Advance</span>
              <span className="font-bold">{formatPrice(advance)}</span>
            </div>
          </div>

          <Link
            href={bookingHref}
            className="mt-5 block w-full text-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm"
          >
            Check Availability &amp; Book
          </Link>
          <Link
            href="/houseboat-prices"
            className="mt-2 block w-full text-center px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors text-sm"
          >
            View Full Price List
          </Link>
        </div>
      </div>
    </div>
  );
}
