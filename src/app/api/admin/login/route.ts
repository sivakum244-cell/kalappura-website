import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

// ============================================================================
// POST /api/admin/login - Authenticate admin and set HttpOnly cookie
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limit: max 5 login attempts per IP per 15 minutes
    const { limited } = rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000);
    if (limited) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // Create a simple session token (hash of password + secret)
    const crypto = await import("crypto");
    const sessionToken = crypto
      .createHash("sha256")
      .update(`${adminPassword}-${process.env.DATABASE_URL || "secret"}-kalappura-session`)
      .digest("hex");

    // Set HttpOnly secure cookie
    const response = NextResponse.json({ success: true, message: "Logged in" });
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[ADMIN LOGIN] Error:", error);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
