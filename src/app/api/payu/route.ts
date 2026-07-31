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
  udf1?: string;
}): string {
  // PayU hash formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
  const udf1 = params.udf1 || "";
  const udf2 = "";
  const udf3 = "";
  const udf4 = "";
  const udf5 = "";
  const hashString = `${PAYU_KEY}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${PAYU_SALT}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
}

// POST /api/payu - Generate payment form data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const txnid = `KHB${Date.now()}`;
    const amount = parseFloat(String(body.amount)).toFixed(2);
    const productinfo = body.productinfo || "Houseboat Booking";
    const firstname = body.firstname || "Guest";
    const email = body.email || "test@kalappurahouseboats.com";
    const phone = body.phone || "9895053528";
    const bookingId = body.bookingId || "";

    const hash = generateHash({
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      udf1: bookingId,
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
