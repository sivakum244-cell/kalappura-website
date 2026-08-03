// ============================================================================
// DYNAMIC PRICING - Date-based room rates
// Rates can vary by month and day of week
// Update this file when Booking.com rates change
// ============================================================================

interface MonthlyRate {
  weekday: number; // Sun-Thu
  weekend: number; // Fri-Sat
}

interface RoomPricing {
  [month: string]: MonthlyRate; // Format: "YYYY-MM" or "default"
}

// Pricing for each boat type
// Add new months as needed: "2026-10", "2026-11", etc.
const PRICING: Record<string, RoomPricing> = {
  "standard-cabin": {
    // 3 Bedroom Houseboat
    "2026-08": { weekday: 17500, weekend: 20000 },
    "2026-09": { weekday: 18500, weekend: 18500 },
    default: { weekday: 17500, weekend: 20000 },
  },
  "double-twin-room": {
    // 2 Bedroom Houseboat
    "2026-08": { weekday: 16500, weekend: 18500 },
    "2026-09": { weekday: 17500, weekend: 17500 },
    default: { weekday: 16500, weekend: 18500 },
  },
  "suite-river-view": {
    // Single Bedroom Houseboat
    "2026-08": { weekday: 17500, weekend: 20000 },
    "2026-09": { weekday: 18500, weekend: 18500 },
    default: { weekday: 17500, weekend: 20000 },
  },
};

// Get the price for a specific date and room type
export function getRoomPrice(roomType: string, checkInDate: string): number {
  if (!checkInDate) {
    // Return default weekday price
    const defaultRate = PRICING[roomType]?.default || { weekday: 17500, weekend: 20000 };
    return defaultRate.weekday;
  }

  const date = new Date(checkInDate);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const dayOfWeek = date.getDay(); // 0=Sun, 5=Fri, 6=Sat
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

  // Get rate for the month, fallback to default
  const roomPricing = PRICING[roomType];
  if (!roomPricing) return 17500;

  const monthRate = roomPricing[month] || roomPricing.default || { weekday: 17500, weekend: 20000 };

  return isWeekend ? monthRate.weekend : monthRate.weekday;
}

// Check if a date is weekend
export function isWeekendDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 5 || day === 6;
}

// Get display rates for homepage (show range)
export function getDisplayRates(roomType: string): { from: number; weekend: number } {
  const defaultRate = PRICING[roomType]?.default || { weekday: 17500, weekend: 20000 };
  return { from: defaultRate.weekday, weekend: defaultRate.weekend };
}
