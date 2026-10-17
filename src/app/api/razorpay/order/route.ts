import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// Razorpay — Create Order
// POST /api/razorpay/order
// Creates a Razorpay order via the REST API (no SDK dependency).
// Docs: https://razorpay.com/docs/api/orders/create/
//
// Env (server-side only):
//   RAZORPAY_KEY_ID      — rzp_test_... / rzp_live_...
//   RAZORPAY_KEY_SECRET  — NEVER exposed to the browser
// ============================================================================

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error("[RAZORPAY] Missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET env vars");
      return NextResponse.json(
        { success: false, error: "Payment gateway is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));

    // Amount comes in rupees from the client; convert to paise.
    const rupees = Number(body.amount);
    if (!Number.isFinite(rupees) || rupees <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid amount." },
        { status: 400 }
      );
    }
    const amountPaise = Math.round(rupees * 100);

    // Razorpay minimum is 100 paise (₹1).
    if (amountPaise < 100) {
      return NextResponse.json(
        { success: false, error: "Amount must be at least ₹1." },
        { status: 400 }
      );
    }

    const receipt = (body.receipt || body.bookingId || `rcpt_${Date.now()}`)
      .toString()
      .slice(0, 40); // Razorpay receipt max length is 40 chars.

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

    const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt,
        notes: {
          bookingId: body.bookingId || "",
          roomType: body.roomType || "",
        },
      }),
    });

    const data = await rzpResponse.json().catch(() => null);

    if (!rzpResponse.ok || !data?.id) {
      // 401 from Razorpay = bad credentials.
      const status = rzpResponse.status === 401 ? 401 : 500;
      console.error("[RAZORPAY] Order creation failed:", rzpResponse.status, data?.error);
      return NextResponse.json(
        {
          success: false,
          error:
            status === 401
              ? "Payment gateway authentication failed."
              : "Could not create payment order. Please try again.",
        },
        { status }
      );
    }

    return NextResponse.json({
      success: true,
      order_id: data.id,
      amount: data.amount, // in paise
      currency: data.currency,
      keyId: RAZORPAY_KEY_ID, // public key id for the checkout
    });
  } catch (error) {
    console.error("[RAZORPAY] Order route error:", error);
    return NextResponse.json(
      { success: false, error: "Server error creating payment order." },
      { status: 500 }
    );
  }
}
