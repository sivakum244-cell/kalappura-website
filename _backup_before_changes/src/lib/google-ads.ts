// ============================================================================
// GOOGLE ADS CONVERSION TRACKING
// Configure in .env: NEXT_PUBLIC_GOOGLE_ADS_ID and conversion labels
// Get from: https://ads.google.com > Tools > Conversions
// ============================================================================

export function trackConversion(conversionLabel: string, value?: number) {
  if (typeof window === "undefined") return;

  const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtagFn) return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!adsId) return;

  gtagFn("event", "conversion", {
    send_to: `${adsId}/${conversionLabel}`,
    value: value || 0,
    currency: "INR",
  });
}

// Pre-built conversion functions
export function trackBookingConversion(value: number) {
  trackConversion(process.env.NEXT_PUBLIC_GADS_BOOKING_LABEL || "BOOKING_LABEL", value);
}

export function trackCallConversion() {
  trackConversion(process.env.NEXT_PUBLIC_GADS_CALL_LABEL || "CALL_LABEL");
}

export function trackWhatsAppConversion() {
  trackConversion(process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL || "WHATSAPP_LABEL");
}
