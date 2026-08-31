"use client";

// ============================================================================
// UTM TRACKING
// Captures campaign parameters (utm_source, utm_medium, utm_campaign, etc.)
// and stores them so you can see which channel drove each booking.
// ============================================================================

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
const STORAGE_KEY = "kalappura_utm";

interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Ads click ID
  fbclid?: string; // Facebook click ID
  landing_page?: string;
  captured_at?: string;
}

/**
 * Capture UTM parameters from the current URL and store them.
 * Call this once on page load (e.g. in a top-level client component).
 */
export function captureUtmParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const captured: UtmData = {};
  let hasUtm = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      captured[key as keyof UtmData] = value;
      hasUtm = true;
    }
  });

  // Only overwrite if new UTM params are present (first-touch attribution preserved otherwise)
  if (hasUtm) {
    captured.landing_page = window.location.pathname;
    captured.captured_at = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // localStorage may be unavailable
    }
  }
}

/**
 * Get stored UTM data (to attach to a booking submission).
 */
export function getUtmData(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Get a readable source label for display/analytics.
 * e.g. "google / cpc / summer-campaign"
 */
export function getSourceLabel(): string {
  const utm = getUtmData();
  if (utm.gclid) return "Google Ads";
  if (utm.fbclid) return "Facebook/Instagram Ads";
  if (utm.utm_source) {
    return [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(" / ");
  }
  return "Direct / Organic";
}

/**
 * Clear UTM data (e.g. after a successful booking is attributed).
 */
export function clearUtmData() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
