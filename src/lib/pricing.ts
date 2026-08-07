// ============================================================================
// DYNAMIC PRICING - Checks database first, falls back to defaults
// Admin can override any date's price from the dashboard
// ============================================================================

interface DateRange {
  from: number;
  to: number;
  weekday: number;
  weekend: number;
}

interface MonthConfig {
  ranges: DateRange[];
}

// Fallback pricing (used when no DB rate exists)
const PRICING: Record<string, Record<string, MonthConfig>> = {
  "standard-cabin": {
    "2026-08": { ranges: [{ from: 1, to: 22, weekday: 17500, weekend: 20000 }, { from: 23, to: 31, weekday: 20000, weekend: 20000 }] },
    "2026-09": { ranges: [{ from: 1, to: 30, weekday: 18500, weekend: 18500 }] },
    "2026-10": { ranges: [{ from: 1, to: 31, weekday: 20000, weekend: 20000 }] },
    "2026-11": { ranges: [{ from: 1, to: 30, weekday: 20000, weekend: 20000 }] },
  },
  "double-twin-room": {
    "2026-08": { ranges: [{ from: 1, to: 22, weekday: 16500, weekend: 18500 }, { from: 23, to: 31, weekday: 18500, weekend: 18500 }] },
    "2026-09": { ranges: [{ from: 1, to: 30, weekday: 17500, weekend: 17500 }] },
    "2026-10": { ranges: [{ from: 1, to: 17, weekday: 17500, weekend: 17500 }, { from: 18, to: 31, weekday: 19000, weekend: 19000 }] },
    "2026-11": { ranges: [{ from: 1, to: 30, weekday: 18500, weekend: 18500 }] },
  },
  "suite-river-view": {
    "2026-08": { ranges: [{ from: 1, to: 22, weekday: 17500, weekend: 20000 }, { from: 23, to: 31, weekday: 20000, weekend: 20000 }] },
    "2026-09": { ranges: [{ from: 1, to: 30, weekday: 18500, weekend: 18500 }] },
    "2026-10": { ranges: [{ from: 1, to: 17, weekday: 18500, weekend: 20000 }, { from: 18, to: 31, weekday: 20000, weekend: 20000 }] },
    "2026-11": { ranges: [{ from: 1, to: 30, weekday: 20000, weekend: 20000 }] },
  },
};

const DEFAULT_PRICING: Record<string, { weekday: number; weekend: number }> = {
  "standard-cabin": { weekday: 17500, weekend: 20000 },
  "double-twin-room": { weekday: 16500, weekend: 18500 },
  "suite-river-view": { weekday: 17500, weekend: 20000 },
};

// Get fallback price from hardcoded config
export function getFallbackPrice(roomType: string, checkInDate: string): number {
  if (!checkInDate) {
    const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
    return def.weekday;
  }

  const date = new Date(checkInDate);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

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

  for (const range of monthConfig.ranges) {
    if (day >= range.from && day <= range.to) {
      return isWeekend ? range.weekend : range.weekday;
    }
  }

  const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
  return isWeekend ? def.weekend : def.weekday;
}

// Client-side: get price (uses fallback, DB rates fetched separately)
export function getRoomPrice(roomType: string, checkInDate: string, dbRates?: Record<string, number>): number {
  // Check if DB has a rate for this specific date+room
  if (dbRates) {
    const key = `${checkInDate}_${roomType}`;
    if (dbRates[key]) return dbRates[key];
  }
  return getFallbackPrice(roomType, checkInDate);
}

export function isWeekendDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 5 || day === 6;
}

export function getDisplayRates(roomType: string): { from: number; weekend: number } {
  const def = DEFAULT_PRICING[roomType] || { weekday: 17500, weekend: 20000 };
  return { from: def.weekday, weekend: def.weekend };
}
