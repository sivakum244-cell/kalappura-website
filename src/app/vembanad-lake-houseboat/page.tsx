import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Vembanad Lake Houseboat Cruise | Alleppey Backwaters",
  description:
    "Cruise Vembanad Lake on a private houseboat from Alleppey. The largest lake in Kerala — open backwater views, sunsets, birdlife and village canals on an overnight or day cruise.",
  keywords: [
    "vembanad lake houseboat",
    "vembanad lake houseboat cruise",
    "vembanad lake alleppey",
    "houseboat vembanad lake kerala",
    "alleppey backwater cruise vembanad",
  ],
  alternates: { canonical: "/vembanad-lake-houseboat" },
  openGraph: {
    type: "website",
    title: "Vembanad Lake Houseboat Cruise | Alleppey",
    description:
      "Private houseboat cruises on Vembanad Lake — Kerala's largest lake — from Alleppey. Open views, sunsets and backwater villages.",
    url: "/vembanad-lake-houseboat",
    images: [{ url: `${baseUrl}/images/gallery/drone-1.jpg`, width: 1200, height: 630, alt: "Houseboat cruising Vembanad Lake in Alleppey, Kerala" }],
  },
};

export default function VembanadLakePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Vembanad Lake Houseboat", item: `${baseUrl}/vembanad-lake-houseboat` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do Alleppey houseboats cruise on Vembanad Lake?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Alleppey houseboat cruises pass through Vembanad Lake, the largest lake in Kerala, along with village canals and smaller lakes such as Punnamada. The exact route depends on your package." },
      },
      {
        "@type": "Question",
        name: "What can you see on a Vembanad Lake cruise?",
        acceptedAnswer: { "@type": "Answer", text: "Wide open water and horizon views, spectacular sunsets, birdlife including egrets and kingfishers, fishing boats, and the villages and paddy fields along the shore." },
      },
      {
        "@type": "Question",
        name: "Is Vembanad Lake good for sunset views?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — its wide, open expanse makes it one of the best spots in Alleppey for uninterrupted sunset views from a houseboat deck." },
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
            <span className="text-white">Vembanad Lake Houseboat</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Vembanad Lake Houseboat Cruise
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cruise the largest lake in Kerala on a private houseboat from Alleppey — wide open
            water, glorious sunsets, and the backwater villages that line its shores.
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About Vembanad Lake</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Vembanad is the largest lake in Kerala and the heart of the Alleppey (Alappuzha) backwater network.
          Stretching across several districts, it's a vast, calm expanse of water fringed by coconut palms,
          paddy fields, and villages. A houseboat cruise here balances the grand, open scenery of the lake with
          the intimate charm of the narrow village canals that feed into it.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">What You'll See on the Lake</h2>
        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li>• Wide, open water with uninterrupted horizon views</li>
          <li>• Spectacular sunsets from your houseboat deck</li>
          <li>• Birdlife — egrets, herons, cormorants and kingfishers</li>
          <li>• Traditional fishing boats and Chinese fishing nets</li>
          <li>• Punnamada Lake, home of the Nehru Trophy Boat Race</li>
          <li>• Villages and paddy fields along the shoreline</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-6">
          For the birdlife in detail, see our <Link href="/blog/alleppey-backwater-wildlife-birdwatching" className="text-gold-600 hover:underline">backwater wildlife guide</Link>,
          and for the boat race, our <Link href="/blog/nehru-trophy-boat-race-guide" className="text-gold-600 hover:underline">Nehru Trophy guide</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">How to Cruise Vembanad Lake</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Vembanad Lake is part of the standard Alleppey houseboat cruise route. Book a private
          {" "}<Link href="/alleppey-houseboats" className="text-gold-600 hover:underline">Alleppey houseboat</Link> for an
          overnight stay, or a shorter <Link href="/day-cruise-houseboat-alleppey" className="text-gold-600 hover:underline">day cruise</Link>.
          Check current rates on the <Link href="/houseboat-prices" className="text-gold-600 hover:underline">prices page</Link> or read the full
          {" "}<Link href="/blog/kerala-houseboat-guide" className="text-gold-600 hover:underline">Kerala Houseboat Guide</Link>.
        </p>

        <div className="text-center bg-sand-50 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Ready to cruise Vembanad Lake?</h2>
          <p className="text-gray-600 text-sm mb-5">Book a private houseboat and watch the sun set over Kerala's largest lake.</p>
          <Link href="/booking" className="inline-block px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
            Check Availability &amp; Book
          </Link>
        </div>
      </section>
    </main>
  );
}
