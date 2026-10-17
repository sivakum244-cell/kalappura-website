"use client";

import { ROOMS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { getStartingFromPrice } from "@/lib/pricing";
import { useAvailability } from "@/components/AvailabilityBadge";

// ============================================================================
// LIVE PRICE STRIP — shows the current "starting from" rate per boat, pulled
// from the admin's live DB rates (falls back to defaults). Client component so
// the surrounding /houseboat-prices page can stay statically rendered for SEO.
// ============================================================================

const LABELS: Record<string, { name: string; guests: string }> = {
  "suite-river-view": { name: "1 Bedroom Boat", guests: "Up to 3 guests" },
  "double-twin-room": { name: "2 Bedroom Boat", guests: "Up to 6 guests" },
  "standard-cabin": { name: "3 Bedroom Boat", guests: "Up to 9 guests" },
};

const ORDER = ["suite-river-view", "double-twin-room", "standard-cabin"];

export default function LivePriceStrip() {
  const { data } = useAvailability();
  const dbRates = data?.rates as Record<string, number> | undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ORDER.map((roomId) => {
        const room = ROOMS.find((r) => r.id === roomId);
        if (!room) return null;
        const label = LABELS[roomId];
        const price = getStartingFromPrice(roomId, dbRates);
        return (
          <div key={roomId} className="p-4 bg-white rounded-xl border border-gray-100">
            <p className="font-semibold text-gray-900">{label.name}</p>
            <p className="text-sm text-gray-600">
              Starting from <span className="font-semibold text-gray-900">{formatPrice(price)}</span>/room/night
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{label.guests}</p>
          </div>
        );
      })}
    </div>
  );
}
