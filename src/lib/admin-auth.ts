import { NextRequest } from "next/server";
import crypto from "crypto";

// ============================================================================
// ADMIN AUTHENTICATION HELPER
// Validates admin access via either:
// 1. HttpOnly session cookie (preferred, secure)
// 2. x-admin-password header (backward compatibility)
// ============================================================================

export function verifyAdmin(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  // Check HttpOnly cookie first (more secure)
  const sessionCookie = request.cookies.get("admin_session")?.value;
  if (sessionCookie) {
    const expectedToken = crypto
      .createHash("sha256")
      .update(`${adminPassword}-${process.env.DATABASE_URL || "secret"}-kalappura-session`)
      .digest("hex");

    if (sessionCookie === expectedToken) {
      return true;
    }
  }

  // Fallback: check header (backward compatible with existing admin panel)
  const headerPassword = request.headers.get("x-admin-password");
  if (headerPassword === adminPassword) {
    return true;
  }

  return false;
}
