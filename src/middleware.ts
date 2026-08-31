import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================================
// MIDDLEWARE: Redirect vercel.app URLs to custom domain
// Prevents duplicate content and canonical confusion
// ============================================================================

// Preferred canonical host — the www HTTPS variant. Every other variant
// (vercel.app preview, bare apex, non-www) is 301-redirected here so the
// canonical tag always matches the URL all variants resolve to.
const PREFERRED_HOST = "www.alleppeyhouseboat.online";
const APEX_DOMAIN = "alleppeyhouseboat.online";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();

  // Never redirect localhost / dev hosts.
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return NextResponse.next();
  }

  // 1) vercel.app preview URLs → canonical host
  if (host.includes("vercel.app")) {
    const url = request.nextUrl.clone();
    url.host = PREFERRED_HOST;
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  // 2) Bare apex / any non-www variant of the custom domain → www variant
  if (host === APEX_DOMAIN || (host.endsWith(APEX_DOMAIN) && host !== PREFERRED_HOST)) {
    const url = request.nextUrl.clone();
    url.host = PREFERRED_HOST;
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Only run middleware on public pages (not API routes or static files)
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
