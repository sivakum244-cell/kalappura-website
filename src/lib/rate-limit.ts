// ============================================================================
// SIMPLE IN-MEMORY RATE LIMITER
// Note: On Vercel serverless, each function instance has its own memory.
// For production-grade rate limiting, use Vercel KV or Upstash Redis.
// This provides basic protection against rapid-fire abuse.
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 60000); // Clean every minute

/**
 * Check if a request should be rate limited
 * @param identifier - Usually IP address or a unique key
 * @param limit - Max requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns { limited: boolean, remaining: number }
 */
export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): { limited: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { limited: true, remaining: 0 };
  }

  entry.count++;
  return { limited: false, remaining: limit - entry.count };
}

/**
 * Get client IP from request headers (works on Vercel)
 */
export function getClientIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
