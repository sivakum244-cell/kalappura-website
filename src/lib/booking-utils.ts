import { z } from "zod";

// ============================================================================
// BOOKING ID GENERATOR
// Format: KHB-YYYYMMDD-XXXX (e.g., KHB-20260725-0001)
// ============================================================================

export function generateBookingId(sequenceNumber: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const seq = String(sequenceNumber).padStart(4, "0");
  return `KHB-${year}${month}${day}-${seq}`;
}

// ============================================================================
// VALIDATION SCHEMA (Zod)
// ============================================================================

export const bookingSchema = z.object({
  guestName: z
    .string()
    .min(2, "Guest name must be at least 2 characters")
    .max(100, "Guest name too long"),
  mobile: z
    .string()
    .min(7, "Mobile number must be at least 7 digits")
    .max(20, "Mobile number too long"),
  email: z.string().optional().default(""),
  country: z.string().min(1, "Country is required").default("India"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  eta: z.string().min(1, "Estimated time of arrival is required"),
  adults: z.number().int().min(1, "At least 1 adult required").max(20),
  children: z.number().int().min(0).max(10).default(0),
  infants: z.number().int().min(0).max(5).default(0),
  roomType: z.enum(["standard-cabin", "double-twin-room", "suite-river-view"], {
    errorMap: () => ({ message: "Please select a valid room type" }),
  }),
  numberOfRooms: z.number().int().min(1).max(10).default(1),
  foodRequirements: z.array(z.string()).default([]),
  foodAllergyDetails: z.string().max(500).default(""),
  specialRequests: z.array(z.string()).default([]),
  additionalNotes: z.string().max(1000).default(""),
  paymentPreference: z
    .enum(["pay-at-property", "online-payment", "bank-transfer"])
    .default("pay-at-property"),
  extraBed: z.number().int().min(0).max(5).default(0),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms & conditions",
  }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// ============================================================================
// ROOM TYPE HELPERS
// ============================================================================

export const ROOM_TYPES: Record<
  string,
  { name: string; price: number; maxGuests: number; maxRooms: number }
> = {
  "standard-cabin": {
    name: "3 Bedroom Houseboat",
    price: 16500,
    maxGuests: 6,
    maxRooms: 3,
  },
  "double-twin-room": {
    name: "2 Bedroom Houseboat",
    price: 15300,
    maxGuests: 4,
    maxRooms: 2,
  },
  "suite-river-view": {
    name: "Single Bedroom Houseboat",
    price: 16200,
    maxGuests: 2,
    maxRooms: 1,
  },
};

export function getRoomName(roomType: string): string {
  return ROOM_TYPES[roomType]?.name || roomType;
}

export function getRoomPrice(roomType: string): number {
  return ROOM_TYPES[roomType]?.price || 0;
}

// ============================================================================
// STATUS HELPERS
// ============================================================================

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export const STATUS_COLORS: Record<BookingStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
  Completed: "bg-blue-100 text-blue-800",
};

// ============================================================================
// FORMAT HELPERS
// ============================================================================

export function formatBookingDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
