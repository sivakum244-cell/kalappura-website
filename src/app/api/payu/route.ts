import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ============================================================================
// PayU Payment Integration
// Test URL: https://test.payu.in/_payment
// Production URL: https://secure.payu.in/_payment
// ============================================================================

const PAYU_KEY = process.env.PAYU_KEY || "CvJSrz";
const PAYU_SALT = process.env.PAYU_SALT || "RiQcJHjDdqafa6Cv8KMHOKIxtfUBK3dG";
const PAYU_TEST_MODE = process.env.PAYU_TEST_MODE !== "false"; // default true
const PAYU_URL = PAYU_TEST_MODE
  ? "https://test.payu.in/_payment"
  : "https://secure.payu.in/_payment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kalappura-website.vercel.app";

// Generate SHA-512 hash for PayU
function generateHash(params: {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
}): string {
  const hashString = `${PAYU_KEY}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||||${PAYU_SALT}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
}

// POST /api/payu - Generate payment form data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const txnid = `KHB${Date.now()}`;
    const amount = String(body.amount);
    const productinfo = body.productinfo || "Houseboat Booking";
    const firstname = body.firstname || "";
    const email = body.email || "";
    const phone = body.phone || "";
    const bookingId = body.bookingId || "";

    const hash = generateHash({
      txnid,
      amount,
      productinfo,
      firstname,
      email,
    });

    const payuData = {
      key: PAYU_KEY,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      hash,
      surl: `${SITE_URL}/api/payu/success?bookingId=${bookingId}`,
      furl: `${SITE_URL}/api/payu/failure?bookingId=${bookingId}`,
      service_provider: "payu_paisa",
      udf1: bookingId,
    };

    return NextResponse.json({
      success: true,
      payuUrl: PAYU_URL,
      payuData,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
