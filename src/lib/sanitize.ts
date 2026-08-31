// ============================================================================
// INPUT SANITIZATION UTILITIES
// Prevents XSS, injection attacks, and malformed data
// ============================================================================

/**
 * Strip HTML tags from a string (for plain text inputs)
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Sanitize a string for safe storage and display
 * Removes script tags, event handlers, and dangerous patterns
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/data\s*:\s*text\/html/gi, "")
    .trim();
}

/**
 * Sanitize email address — basic validation
 */
export function sanitizeEmail(email: string): string {
  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleaned) ? cleaned : "";
}

/**
 * Sanitize phone number — keep only digits, +, and spaces
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\s\-()]/g, "").trim();
}

/**
 * Sanitize a URL slug — only lowercase letters, numbers, and hyphens
 */
export function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Sanitize a numeric input — return NaN-safe number
 */
export function sanitizeNumber(input: unknown, min = 0, max = 9999): number {
  const num = Number(input);
  if (isNaN(num)) return min;
  return Math.max(min, Math.min(max, Math.round(num)));
}

/**
 * Sanitize date string — ensure YYYY-MM-DD format
 */
export function sanitizeDate(date: string): string {
  const cleaned = date.trim();
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(cleaned)) return "";
  // Verify it's a valid date
  const parsed = new Date(cleaned);
  if (isNaN(parsed.getTime())) return "";
  return cleaned;
}

/**
 * Prevent NoSQL injection patterns (for search queries)
 */
export function sanitizeSearchQuery(query: string): string {
  return query
    .replace(/[${}]/g, "")
    .replace(/\.\./g, "")
    .trim()
    .slice(0, 200); // Max 200 chars for search
}
