import type { Metadata } from "next";
import Link from "next/link";
import GuestPhotosClient from "./GuestPhotosClient";

export const metadata: Metadata = {
  title: { absolute: "Alleppey Houseboat Pictures | Guest Photo Gallery" },
  description:
    "Real Alleppey houseboat pictures shared by guests of Kalappura Houseboats — backwater views, Kerala sunsets, onboard food and AC cabins.",
  keywords: [
    "Alleppey houseboat pictures",
    "Alleppey houseboat photos",
    "Kerala houseboat gallery",
    "Kalappura Houseboats guest photos",
    "Alleppey backwater photos",
  ],
  alternates: { canonical: "/guest-photos" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Alleppey Houseboat Pictures | Kalappura Houseboats",
    description:
      "Authentic Alleppey houseboat pictures from guests who cruised the Kerala backwaters with Kalappura Houseboats.",
    url: "/guest-photos",
    type: "website",
    images: [
      {
        url: "/images/gallery/drone-1.jpg",
        width: 1200,
        height: 630,
        alt: "Guest photos of Kalappura houseboats on the Alleppey backwaters",
      },
    ],
  },
};

export default function GuestPhotosPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Header — server-rendered so Google always sees the H1 and intro copy */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Guest Photos</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alleppey Houseboat Pictures
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Real Alleppey houseboat pictures captured by our guests — backwater views, sunsets, food, and cabins from genuine Kerala houseboat trips.
          </p>
        </div>
      </div>

      {/* Server-rendered intro content so crawlers always have indexable text */}
      <section className="max-w-3xl mx-auto px-4 pt-12 text-center">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
          Authentic Alleppey Houseboat Photos from Real Guests
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Every picture in this gallery was taken by a guest who stayed aboard a Kalappura houseboat
          in Alleppey (Alappuzha), Kerala. From sunrise over Vembanad Lake and sunsets from the open
          deck to freshly cooked Kerala meals and cosy AC cabins, these images show the real Alleppey
          houseboat experience, unfiltered and unstaged. Stayed with us? Add your own photos below.
        </p>
      </section>

      {/* Interactive gallery, upload form and lightbox (client component) */}
      <GuestPhotosClient />
    </main>
  );
}
