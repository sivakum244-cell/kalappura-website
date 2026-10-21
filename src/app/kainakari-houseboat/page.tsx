import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Kainakari Houseboat Cruise | Alleppey Village Backwaters",
  description:
    "Cruise Kainakari on a private houseboat from Alleppey — the classic village backwater route with narrow canals, paddy fields and authentic Kerala village life.",
  keywords: [
    "kainakari houseboat",
    "kainakari backwater cruise",
    "kainakari village alleppey",
    "alleppey village houseboat route",
    "houseboat kainakari kerala",
  ],
  alternates: { canonical: "/kainakari-houseboat" },
  openGraph: {
    type: "website",
    title: "Kainakari Houseboat Cruise | Alleppey Village Backwaters",
    description:
      "Private houseboat cruises through Kainakari — Alleppey's classic village backwater route with narrow canals and paddy fields.",
    url: "/kainakari-houseboat",
    images: [{ url: `${baseUrl}/images/gallery/river-1.jpg`, width: 1200, height: 630, alt: "Houseboat on the Kainakari village canals near Alleppey, Kerala" }],
  },
};

export default function KainakariPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Kainakari Houseboat", item: `${baseUrl}/kainakari-houseboat` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is Kainakari?",
        acceptedAnswer: { "@type": "Answer", text: "Kainakari is a group of backwater villages near Alleppey (Alappuzha), Kerala, laced with narrow canals and surrounded by paddy fields. It's a classic part of the Alleppey houseboat cruise route." },
      },
      {
        "@type": "Question",
        name: "What is a Kainakari houseboat cruise like?",
        acceptedAnswer: { "@type": "Answer", text: "It takes you through narrow village canals where you see everyday Kerala life up close — homes along the water, people fishing and farming, coconut groves and paddy fields — a more intimate contrast to the open lakes." },
      },
      {
        "@type": "Question",
        name: "Do Alleppey houseboats go to Kainakari?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Kainakari is one of the most popular village stretches on the Alleppey houseboat route, often combined with Vembanad Lake and other canals." },
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Kainakari Houseboat</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Kainakari Houseboat Cruise
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cruise the Kainakari village backwaters on a private houseboat from Alleppey — narrow
            canals, paddy fields, and an up-close look at authentic Kerala village life.
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About Kainakari</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Kainakari is a cluster of backwater villages near Alleppey (Alappuzha), threaded with narrow
          canals and surrounded by paddy fields. It's one of the most loved stretches of the Alleppey
          houseboat route because it takes you off the open lakes and into the intimate, everyday world of
          the backwaters — where life has revolved around the water for generations.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">What You'll See in Kainakari</h2>
        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li>• Narrow village canals lined with homes and greenery</li>
          <li>• Paddy fields and coconut groves</li>
          <li>• Villagers fishing, farming and going about daily life</li>
          <li>• Small temples, churches and toddy shops</li>
          <li>• Kingfishers and other backwater birds up close</li>
          <li>• A quieter, more intimate contrast to the open lakes</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-6">
          Kainakari is often combined with <Link href="/vembanad-lake-houseboat" className="text-gold-600 hover:underline">Vembanad Lake</Link> and the
          {" "}<Link href="/kuttanad-houseboat" className="text-gold-600 hover:underline">Kuttanad</Link> paddy region on the same cruise.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">How to Cruise Kainakari</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Kainakari features on the standard Alleppey houseboat route. Book a private
          {" "}<Link href="/alleppey-houseboats" className="text-gold-600 hover:underline">Alleppey houseboat</Link> for an overnight
          stay or a <Link href="/day-cruise-houseboat-alleppey" className="text-gold-600 hover:underline">day cruise</Link>, and read the full
          {" "}<Link href="/blog/kerala-houseboat-guide" className="text-gold-600 hover:underline">Kerala Houseboat Guide</Link> to plan your trip.
        </p>

        <div className="text-center bg-sand-50 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Ready to explore Kainakari?</h2>
          <p className="text-gray-600 text-sm mb-5">Book a private houseboat and cruise the village backwaters of Alleppey.</p>
          <Link href="/booking" className="inline-block px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
            Check Availability &amp; Book
          </Link>
        </div>
      </section>
    </main>
  );
}
