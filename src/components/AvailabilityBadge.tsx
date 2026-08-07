"use client";

import { useState, useEffect } from "react";

interface AvailabilityData {
  blockedDates: Record<string, string[]>;
  rates: Record<string, number>;
  lastUpdated: string;
}

export function useAvailability() {
  const [data, setData] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function isDateBlocked(
  date: string,
  roomType: string,
  blockedDates: Record<string, string[]> | undefined
): boolean {
  if (!blockedDates) return false;
  const dates = blockedDates[roomType] || [];
  return dates.includes(date);
}

export default function AvailabilityBadge({
  checkIn,
  roomType,
  blockedDates,
}: {
  checkIn: string;
  roomType: string;
  blockedDates: Record<string, string[]> | undefined;
}) {
  if (!checkIn || !blockedDates) return null;

  const blocked = isDateBlocked(checkIn, roomType, blockedDates);

  if (blocked) {
    return (
      <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs text-red-700 font-medium">
          This date is not available for the selected houseboat. Please choose a different date.
        </span>
      </div>
    );
  }

  return (
    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-emerald-500" />
      <span className="text-xs text-emerald-700 font-medium">
        Available! (Synced with Booking.com)
      </span>
    </div>
  );
}
