// ============================================================================
// DYNAMIC PRICING - Date-based room rates
// Rates vary by month, date range, and day of week
// Update this file when Booking.com rates change
// ============================================================================

interface DateRange {
  from: number; // day of month (1-31)
  to: number;   // day of month (1-31)
  weekday: number;
  weekend: number;
}

interface MonthConfig {
  ranges: DateRange[];
}

// Pricing configuration for each boat type
// Each month can have multiple date ranges with different rates
const PRICING: Record<string, Record<string, MonthConfig>> = {
  "standard-cabin": {
    // 3 Bedroom Houseboat
    "2026-08": {
      ranges: [
        { from: 1, to: 22, weekday: 17500, weekend: 20000 },
        { from: 23, to: 31, weekday: 20000, weekend: 20000 },
      ],
    },
    "2026-09": {
      ranges: [
        { from: 1, to: 30, weekday: 18500, weekend: 18500 },
      ],
    },
    "2026-10": {
      ranges: [
        { from: 1, to: 31, weekday: 20000, weekend: 20000 },
      ],
    },
  },
  "double-twin-room": {
    // 2 Bedroom Houseboat
    "2026-08": {
      ranges: [
        { from: 1, to: 22, weekday: 16500, weekend: 18500 },
        { from: 23, to: 31, weekday: 18500, weekend: 18500 },
      ],
    },
    "2026-09": {
      ranges: [
        { from: 1, to: 30, weekday: 17500, weekend: 17500 },
      ],
    },
    "2026-10": {
      ranges: [
        { from: 1, to: 17, weekday: 17500, weekend: 17500 },
        { from: 18, to: 31, weekday: 19000, weekend: 19000 },
      ],
    },
  },
  "suite-river-view": {
    // Single Bedroom Houseboat
    "2026-08": {
      ranges: [
        { from: 1, to: 22, weekday: 17500, weekend: 20000 },
        { from: 23, to: 31, weekday: 20000, weekend: 20000 },
      ],
    },
    "2026-09": {
      ranges: [
        { from: 1, to: 30, weekday: 18500, weekend: 18500 },
      ],
    },
    "2026-10": {
      ranges: [
        { from: 1, to: 17, weekday: 18500, weekend: 20000 },
        { from: 18, to: 31, weekday: 20000, weekend: 20000 },
      ],
    },
  },
};

// Default pricing (used when no specific month config exists)
const DEFAULT_PRICING: Record<string, { weekday: number; weekend: number }> = {
  "standard-cabin": { weekday: 17500, weekend: 20000 },
  "double-twin-room": { weekday: 16500, weekend: 18500 },
  "suite-river-view": { weekday: 17500, weekend: 20000 },
};

// Get the price for a specific date and room type
export function getRoomPrice(roomType: string, checkInDate: string): number {
  if (!checkInDate) {
    const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
    return def.weekday;
  }

  const date = new Date(checkInDate);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const day = date.getDate();
  const dayOfWeek = date.getDay(); // 0=Sun, 5=Fri, 6=Sat
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

  // Get month config
  const roomConfig = PRICING[roomType];
  if (!roomConfig) {
    const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
    return isWeekend ? def.weekend : def.weekday;
  }

  const monthConfig = roomConfig[month];
  if (!monthConfig) {
    const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
    return isWeekend ? def.weekend : def.weekday;
  }

  // Find the matching date range
  for (const range of monthConfig.ranges) {
    if (day >= range.from && day <= range.to) {
      return isWeekend ? range.weekend : range.weekday;
    }
  }

  // Fallback
  const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
  return isWeekend ? def.weekend : def.weekday;
}

// Check if a date is weekend (Fri/Sat)
export function isWeekendDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 5 || day === 6;
}

// Get display rates for homepage (show starting price)
export function getDisplayRates(roomType: string): { from: number; weekend: number } {
  const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
  return { from: def.weekday, weekend: def.weekend };
}
