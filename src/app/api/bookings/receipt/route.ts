import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// GET /api/bookings/receipt?id=KHB-XXXXXXXX-XXXXXX
// Public endpoint - returns booking data needed for receipt PDF generation
// Only returns non-sensitive info (no internal IDs)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json({ success: false, error: "Booking ID required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { bookingId },
      select: {
        bookingId: true,
        guestName: true,
        mobile: true,
        email: true,
        country: true,
        checkIn: true,
        checkOut: true,
        eta: true,
        roomType: true,
        numberOfRooms: true,
        adults: true,
        children: true,
        infants: true,
        foodRequirements: true,
        specialRequests: true,
        additionalNotes: true,
        paymentPreference: true,
        createdAt: true,
        status: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("[RECEIPT API] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch booking" }, { status: 500 });
  }
}
