"use client";

import Script from "next/script";

// ============================================================================
// CONVERSION TRACKING PIXELS
// Google Ads + Facebook (Meta) Pixel
//
// Set these environment variables on Vercel:
//   NEXT_PUBLIC_GOOGLE_ADS_ID = AW-XXXXXXXXXX (Google Ads conversion ID)
//   NEXT_PUBLIC_FB_PIXEL_ID   = XXXXXXXXXXXXXXX (Facebook Pixel ID)
// ============================================================================

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export default function ConversionPixels() {
  return (
    <>
      {/* Google Ads Conversion Tracking */}
      {GOOGLE_ADS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `}
          </Script>
        </>
      )}

      {/* Facebook (Meta) Pixel */}
      {FB_PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Facebook Pixel noscript fallback */}
      {FB_PIXEL_ID && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  );
}

// ============================================================================
// CONVERSION TRACKING HELPERS
// Call these when key actions happen (booking, contact, etc.)
// ============================================================================

type WindowWithTracking = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Track a completed booking (purchase) across all platforms
 */
export function trackConversion(bookingId: string, value: number, roomType?: string) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithTracking;

  // Google Ads conversion
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (w.gtag && adsId && conversionLabel) {
    w.gtag("event", "conversion", {
      send_to: `${adsId}/${conversionLabel}`,
      value: value,
      currency: "INR",
      transaction_id: bookingId,
    });
  }

  // GA4 purchase event
  if (w.gtag) {
    w.gtag("event", "purchase", {
      transaction_id: bookingId,
      value: value,
      currency: "INR",
      items: [{ item_name: roomType || "Houseboat Booking" }],
    });
  }

  // Facebook Pixel purchase
  if (w.fbq) {
    w.fbq("track", "Purchase", {
      value: value,
      currency: "INR",
      content_name: roomType || "Houseboat Booking",
      content_type: "product",
    });
  }
}

/**
 * Track when a user starts the booking process
 */
export function trackInitiateCheckout(roomType: string) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithTracking;

  if (w.gtag) {
    w.gtag("event", "begin_checkout", { item_name: roomType, currency: "INR" });
  }
  if (w.fbq) {
    w.fbq("track", "InitiateCheckout", { content_name: roomType });
  }
}

/**
 * Track lead/contact actions (WhatsApp, phone, enquiry)
 */
export function trackLead(method: string) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithTracking;

  if (w.gtag) {
    w.gtag("event", "generate_lead", { method });
  }
  if (w.fbq) {
    w.fbq("track", "Lead", { content_name: method });
  }
}
