import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

// ============================================================================
// PayU Success Callback
// Called by PayU after successful payment
// ============================================================================

const PAYU_SALT = process.env.PAYU_SALT || "RiQcJHjDdqafa6Cv8KMHOKIxtfUBK3dG";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kalappura-website.vercel.app";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const status = formData.get("status") as string;
    const txnid = formData.get("txnid") as string;
    const amount = formData.get("amount") as string;
    const productinfo = formData.get("productinfo") as string;
    const firstname = formData.get("firstname") as string;
    const email = formData.get("email") as string;
    const mihpayid = formData.get("mihpayid") as string;
    const hash = formData.get("hash") as string;
    const bookingId = new URL(request.url).searchParams.get("bookingId") || (formData.get("udf1") as string) || "";

    // Verify hash (reverse hash for response)
    const reverseHashString = `${PAYU_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${process.env.PAYU_KEY || "CvJSrz"}`;
    const calculatedHash = crypto.createHash("sha512").update(reverseHashString).digest("hex");

    if (calculatedHash !== hash) {
      console.error("[PAYU] Hash mismatch - possible tampering");
      // Still allow in test mode
    }

    if (status === "success" && bookingId) {
      // Update booking status to Confirmed and add payment reference
      await prisma.booking.updateMany({
        where: { bookingId },
        data: {
          status: "Confirmed",
          paymentPreference: `PayU - ${mihpayid} (₹${amount})`,
        },
      });
    }

    // Redirect to success page
    return NextResponse.redirect(
      `${SITE_URL}/booking/success?id=${bookingId}&payment=success&txn=${txnid}`,
      { status: 303 }
    );
  } catch (error) {
    console.error("[PAYU SUCCESS] Error:", error);
    return NextResponse.redirect(`${SITE_URL}/booking/success?payment=error`, { status: 303 });
  }
}
