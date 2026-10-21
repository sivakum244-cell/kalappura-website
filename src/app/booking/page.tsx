import type { Metadata } from "next";
import BookingPageContent from "@/components/BookingPageContent";

import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Alleppey Houseboat Booking Online | Kalappura" },
  description:
    "Book your Alleppey houseboat (boat house) online in minutes — 1, 2 & 3 bedroom AC boats, all meals included, just 20% advance, instant confirmation & free cancellation up to 7 days before check-in.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    type: "website",
    title: "Book a Houseboat in Alleppey | Kalappura Houseboats",
    description:
      "Book private houseboats in Alleppey online. 1-3 bedroom AC boats, all meals, backwater cruise. Instant confirmation, best price guarantee.",
    url: "/booking",
    images: [
      {
        url: "/images/gallery/drone-1.jpg",
        width: 1200,
        height: 630,
        alt: "Kalappura houseboat cruising the Alleppey backwaters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Houseboat in Alleppey",
    description: "Instant online booking for Alleppey houseboats. 20% advance, balance at property.",
  },
};

export default function BookingPage() {
  return (
    <>
      {/* Server-rendered H1 — always present in the initial HTML for crawlers,
          even though the interactive form below is a client component inside
          Suspense. Visually hidden so it does not duplicate the form's heading. */}
      <h1 className="sr-only">Alleppey Houseboat Booking — Book Your Kerala Backwater Houseboat</h1>

      <BookingPageContent />

      {/* Server-rendered content for crawlers: real text + internal links,
          below the interactive booking form. Does not affect the form. */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 border-t border-gray-100">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Booking Your Alleppey Houseboat</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Reserve a private houseboat in Alleppey (Alappuzha) on the Kerala backwaters. Choose a
          1, 2, or 3 bedroom boat and a Standard, Premium, or Semi Luxury package. Every booking
          includes an AC bedroom, all meals cooked onboard, and an overnight backwater cruise.
          You pay just 20% advance to confirm, with the balance at the property, and free
          cancellation up to 7 days before check-in.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Check-in is at 12:00 PM and check-out at 9:00 AM the next day. Need help choosing? Explore
          the options below or contact us and we'll help you pick the right boat for your group.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <Link href="/alleppey-houseboats" className="text-gold-600 hover:underline">All Alleppey houseboats</Link>
          <Link href="/houseboat-prices" className="text-gold-600 hover:underline">Houseboat prices</Link>
          <Link href="/houseboat-packages" className="text-gold-600 hover:underline">Packages compared</Link>
          <Link href="/rooms/suite-with-river-view" className="text-gold-600 hover:underline">1 bedroom houseboat</Link>
          <Link href="/rooms/double-twin-room-lake-view" className="text-gold-600 hover:underline">2 bedroom houseboat</Link>
          <Link href="/rooms/standard-cabin-on-boat" className="text-gold-600 hover:underline">3 bedroom houseboat</Link>
          <Link href="/luxury-houseboats" className="text-gold-600 hover:underline">Luxury houseboats</Link>
          <Link href="/honeymoon-houseboat-alleppey" className="text-gold-600 hover:underline">Honeymoon houseboat</Link>
          <Link href="/houseboat-cost-calculator" className="text-gold-600 hover:underline">Cost calculator</Link>
          <Link href="/faq" className="text-gold-600 hover:underline">Booking FAQ</Link>
          <Link href="/contact" className="text-gold-600 hover:underline">Contact us</Link>
          <Link href="/" className="text-gold-600 hover:underline">Home</Link>
        </div>
      </section>
    </>
  );
}
