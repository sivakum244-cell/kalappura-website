import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

// ============================================================================
// Razorpay — Verify Payment Signature
// POST /api/razorpay/verify
// Verifies the payment signature returned by Razorpay Checkout.
// Algorithm: HMAC_SHA256(order_id + "|" + payment_id, KEY_SECRET)
// Docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
// ============================================================================

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    if (!RAZORPAY_KEY_SECRET) {
      console.error("[RAZORPAY] Missing RAZORPAY_KEY_SECRET env var");
      return NextResponse.json(
        { success: false, error: "Payment gateway is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = body;

    // Missing fields → 400.
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing payment verification fields." },
        { status: 400 }
      );
    }

    // Recreate the signature and compare.
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Constant-time comparison to avoid timing attacks.
    const provided = Buffer.from(String(razorpay_signature));
    const expected = Buffer.from(expectedSignature);
    const signatureValid =
      provided.length === expected.length &&
      crypto.timingSafeEqual(provided, expected);

    if (!signatureValid) {
      console.error("[RAZORPAY] Signature mismatch — payment NOT verified", {
        razorpay_order_id,
        razorpay_payment_id,
      });
      // Do NOT mark as paid.
      return NextResponse.json(
        { success: false, error: "Payment verification failed." },
        { status: 400 }
      );
    }

    // Signature valid → mark the booking as confirmed (best-effort; mirrors PayU flow).
    if (bookingId) {
      try {
        await prisma.booking.update({
          where: { bookingId: String(bookingId) },
          data: {
            status: "Confirmed",
            paymentPreference: `Razorpay - ${razorpay_payment_id}`,
          },
        });
      } catch (dbErr) {
        // Payment is verified even if the booking row can't be found/updated;
        // log it but still return success so the guest isn't blocked.
        console.error("[RAZORPAY] Booking update failed after verification:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("[RAZORPAY] Verify route error:", error);
    return NextResponse.json(
      { success: false, error: "Server error verifying payment." },
      { status: 500 }
    );
  }
}
