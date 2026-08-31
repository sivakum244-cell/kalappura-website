"use client";

import Script from "next/script";

// ============================================================================
// GOOGLE ANALYTICS 4
// Replace GA_MEASUREMENT_ID with your actual GA4 Measurement ID
// Get it from: https://analytics.google.com > Admin > Data Streams
// Format: G-XXXXXXXXXX
// ============================================================================

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

export default function GoogleAnalytics() {
  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return null; // Skip if not configured

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}

// ============================================================================
// TRACKING HELPER FUNCTIONS
// Use these in your components to track events
// ============================================================================

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, params);
  }
}

// Pre-built tracking functions for common booking events
export function trackBookingStart(roomType: string) {
  trackEvent("begin_checkout", { item_name: roomType, currency: "INR" });
}

export function trackBookingComplete(bookingId: string, value: number) {
  trackEvent("purchase", {
    transaction_id: bookingId,
    value,
    currency: "INR",
    items: [{ item_name: "Houseboat Booking" }],
  });
}

export function trackRoomView(roomName: string) {
  trackEvent("view_item", { item_name: roomName });
}

export function trackPhoneClick() {
  trackEvent("contact_click", { method: "phone" });
}

export function trackWhatsAppClick() {
  trackEvent("contact_click", { method: "whatsapp" });
}
