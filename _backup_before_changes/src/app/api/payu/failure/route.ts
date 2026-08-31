import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// PayU Failure Callback
// Called by PayU when payment fails or is cancelled
// ============================================================================

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kalappura-website.vercel.app";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const bookingId = new URL(request.url).searchParams.get("bookingId") || (formData.get("udf1") as string) || "";
    const error = formData.get("error_Message") as string || "Payment failed";

    console.log("[PAYU FAILURE] Payment failed for booking:", bookingId, "Error:", error);

    // Redirect back to booking page with error
    return NextResponse.redirect(
      `${SITE_URL}/booking?room=standard-cabin&error=payment_failed`,
      { status: 303 }
    );
  } catch (error) {
    console.error("[PAYU FAILURE] Error:", error);
    return NextResponse.redirect(`${SITE_URL}/booking?error=payment_failed`, { status: 303 });
  }
}
