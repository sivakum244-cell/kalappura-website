import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification, sendGuestConfirmation } from "@/lib/email";

// ============================================================================
// POST /api/send-booking-email
// Called from the client AFTER booking is saved successfully
// This way the booking never waits for email delivery
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const emailData = {
      bookingId: data.bookingId || "",
      guestName: data.guestName || "",
      mobile: data.mobile || "",
      email: data.email || "",
      country: data.country || "",
      checkIn: data.checkIn || "",
      checkOut: data.checkOut || "",
      eta: data.eta || "",
      adults: data.adults || 0,
      children: data.children || 0,
      infants: data.infants || 0,
      roomType: data.roomType || "",
      numberOfRooms: data.numberOfRooms || 1,
      foodRequirements: data.foodRequirements || "",
      specialRequests: data.specialRequests || "",
      additionalNotes: data.additionalNotes || "",
      paymentPreference: data.paymentPreference || "",
      createdAt: data.createdAt || new Date().toISOString(),
      packageType: data.packageType || "standard",
      totalAmount: data.totalAmount || 0,
      gstAmount: data.gstAmount || 0,
      advanceAmount: data.advanceAmount || 0,
      balanceAmount: data.balanceAmount || 0,
      packageExtra: data.packageExtra || 0,
    };

    const results = await Promise.allSettled([
      sendAdminNotification(emailData),
      sendGuestConfirmation(emailData),
    ]);

    const adminResult = results[0];
    const guestResult = results[1];

    return NextResponse.json({
      success: true,
      admin: adminResult.status === "fulfilled" ? "sent" : "failed",
      guest: guestResult.status === "fulfilled" ? "sent" : "failed",
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("[SEND-EMAIL] Error:", errMsg);
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
