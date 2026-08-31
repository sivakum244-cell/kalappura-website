import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import ConversionPixels from "@/components/ConversionPixels";
import Providers from "@/components/Providers";
import { SITE_URL, ROOMS } from "@/lib/constants";
import { displayFont, bodyFont, accentFont } from "@/lib/fonts";

// Preferred canonical origin (www HTTPS). Never default to the bare/non-www host,
// otherwise the canonical tag will mismatch the URL all variants redirect to.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kalappura Houseboats | Alleppey Houseboat Booking",
    template: "%s | Kalappura Houseboats",
  },
  description:
    "Book private luxury houseboats in Alleppey, Kerala. 1, 2 & 3 bedroom AC boats with all meals & backwater cruise. Best price guarantee, instant confirmation.",
  keywords: [
    "Alleppey houseboat",
    "Alappuzha houseboat",
    "Kerala houseboat booking",
    "Alleppey houseboat booking",
    "luxury houseboat Alleppey",
    "private houseboat Alleppey",
    "Kerala backwater houseboat",
    "overnight houseboat Alleppey",
    "houseboat Alleppey price",
    "Kalappura Houseboats",
  ],
  authors: [{ name: "Kalappura Houseboats & Tours" }],
  creator: "Kalappura Houseboats & Tours",
  publisher: "Kalappura Houseboats & Tours",
  openGraph: {
    title: "Kalappura Houseboats | Private Luxury Houseboats in Alleppey, Kerala",
    description:
      "Book 1, 2 or 3 bedroom private houseboats in Alleppey. All meals included, AC rooms, backwater cruise through Vembanad Lake & Kerala canals. Best price guarantee.",
    type: "website",
    locale: "en_IN",
    siteName: "Kalappura Houseboats & Tours",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/images/gallery/drone-1.jpg`,
        width: 1200,
        height: 630,
        alt: "Kalappura luxury houseboat cruising through Alleppey backwaters in Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalappura Houseboats | Alleppey Houseboat Booking",
    description:
      "Private luxury houseboats in Alleppey, Kerala. 1-3 bedroom AC boats, all meals included. Book direct for best prices.",
    images: [`${baseUrl}/images/gallery/drone-1.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  // verification: {
  //   google: "REPLACE_WITH_YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  // },
  verification: {
    google: "Cciss3iW2mQVmoa9Ox3m3iKRhS4DWycO_NTNVZmhMtU",
    other: {
      "msvalidate.01": "4CD9FB1E8F38C7B06F00D00BEF44F433",
    },
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Kalappura Houseboats & Tours",
        description: "Private luxury houseboats in Alleppey (Alappuzha), Kerala backwaters",
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/booking?room={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Kalappura Houseboats & Tours",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/gallery/drone-1.jpg`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9895053528",
          contactType: "reservations",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Malayalam"],
        },
        sameAs: [
          "https://www.instagram.com/kalappurahouseboats",
          "https://www.facebook.com/kalappurahouseboats",
        ],
      },
      {
        "@type": "LodgingBusiness",
        "@id": `${baseUrl}/#business`,
        name: "Kalappura Houseboats & Tours",
        description:
          "Private luxury houseboats on Kerala backwaters in Alleppey (Alappuzha). Traditional kettuvallam houseboats with modern amenities, AC bedrooms, all meals included, and backwater cruises through Vembanad Lake.",
        url: baseUrl,
        telephone: "+91-9895053528",
        email: "info@kalappurahouseboats.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mullackal Ward, Iron Bridge P.O, Thirumala East Gate Road",
          addressLocality: "Alleppey",
          addressRegion: "Kerala",
          postalCode: "688011",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.4981,
          longitude: 76.3388,
        },
        image: `${baseUrl}/images/gallery/drone-1.jpg`,
        hasMap: "https://maps.google.com/?q=9.4981,76.3388",
        areaServed: [
          { "@type": "City", name: "Alleppey" },
          { "@type": "City", name: "Alappuzha" },
          { "@type": "State", name: "Kerala" },
        ],
        numberOfRooms: ROOMS.reduce((sum, r) => sum + r.bedrooms, 0),
        priceRange: "₹15,000 - ₹24,000",
        starRating: { "@type": "Rating", ratingValue: "5" },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
          { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
          { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
          { "@type": "LocationFeatureSpecification", name: "Room Service", value: true },
        ],
        // Offers are generated from the real room types & prices in the codebase.
        makesOffer: ROOMS.map((room) => ({
          "@type": "Offer",
          name: room.name,
          priceCurrency: "INR",
          price: room.price,
          url: `${baseUrl}/rooms/${room.slug}`,
          availability: "https://schema.org/InStock",
        })),
        checkinTime: "12:00",
        checkoutTime: "09:00",
        availableLanguage: ["English", "Hindi", "Malayalam"],
        paymentAccepted: "Cash, Credit Card, Debit Card, UPI",
        currenciesAccepted: "INR",
      },
    ],
  };

  return (
    <html lang="en" className={`scroll-smooth ${displayFont.variable} ${bodyFont.variable} ${accentFont.variable}`}>
      <head>
        {/* Fonts are self-hosted via next/font — no external font preconnects needed */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Preload hero image for faster LCP */}
        <link rel="preload" as="image" href="/images/hero.jpg" fetchPriority="high" />
        {/* llms.txt reference for AI discoverability */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        {/* Google Tag Manager - Head */}
        <GoogleTagManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) — must be immediately after <body> */}
        <GoogleTagManagerNoScript />
        {/* Skip to main content — first focusable element (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-gold-500 focus:px-5 focus:py-3 focus:text-white focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        {/* Analytics & Conversion Tracking */}
        <GoogleAnalytics />
        <ConversionPixels />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
