import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Alleppey Backwaters Guide | Kerala Backwaters Explained",
  description:
    "A complete guide to the Alleppey backwaters — what they are, the lakes and canals you'll cruise (Vembanad, Punnamada, Kuttanad), wildlife, best time to visit, and how to experience them by houseboat.",
  keywords: [
    "Alleppey backwaters",
    "Kerala backwaters",
    "Alappuzha backwaters",
    "Vembanad Lake",
    "backwater cruise Alleppey",
  ],
  alternates: { canonical: "/alleppey-backwaters" },
  openGraph: {
    type: "website",
    title: "Alleppey Backwaters Guide | Kerala Backwaters Explained",
    description:
      "What the Alleppey backwaters are, the lakes and canals you'll cruise, wildlife, best time to visit, and how to experience them.",
    url: "/alleppey-backwaters",
    images: [{ url: `${baseUrl}/images/gallery/drone-1.jpg`, width: 1200, height: 630, alt: "Aerial view of the Alleppey backwaters in Kerala" }],
  },
};

export default function AlleppeyBackwatersPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Alleppey Backwaters", item: `${baseUrl}/alleppey-backwaters` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the Alleppey backwaters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Alleppey (Alappuzha) backwaters are a network of interconnected lakes, canals, rivers and lagoons in Kerala, fed by rivers and the Arabian Sea. They include Vembanad Lake, Punnamada Lake, and the Kuttanad farming region, and are famous for houseboat cruises.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best way to see the Alleppey backwaters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An overnight houseboat cruise is the classic way — you drift slowly through lakes and village canals with meals served onboard. For narrow canals, a small canoe or country-boat tour goes deeper into the villages.",
        },
      },
      {
        "@type": "Question",
        name: "When is the best time to visit the Alleppey backwaters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "November to February offers the most comfortable weather and clear skies. The monsoon (June–September) is lush, dramatic, and the best value, with fewer crowds.",
        },
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Alleppey Backwaters</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The Alleppey Backwaters: A Complete Guide
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Kerala&apos;s most famous backwater network — the lakes, canals and villages you&apos;ll cruise,
            the wildlife you&apos;ll see, and how to experience it all.
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-14 prose-none">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">What Are the Alleppey Backwaters?</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          The Alleppey (Alappuzha) backwaters are a vast, interconnected web of lakes, canals, rivers and lagoons that
          run parallel to the Arabian Sea coast in Kerala. Freshwater from the rivers meets the sea here, creating a
          unique ecosystem of palm-fringed waterways, paddy fields, and village life lived entirely around the water.
          Alleppey sits at the heart of this network and is known as the &quot;Venice of the East.&quot;
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">The Lakes &amp; Waterways You&apos;ll Cruise</h2>
        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li>• <strong>Vembanad Lake</strong> — the largest lake in Kerala, with wide open views and spectacular sunsets.</li>
          <li>• <strong>Punnamada Lake</strong> — home of the famous Nehru Trophy Boat Race. See our <Link href="/blog/nehru-trophy-boat-race-guide" className="text-gold-600 hover:underline">boat race guide</Link>.</li>
          <li>• <strong>Kuttanad</strong> — the &quot;Rice Bowl of Kerala,&quot; where farming happens below sea level. Read the <Link href="/blog/kuttanad-rice-bowl-kerala-guide" className="text-gold-600 hover:underline">Kuttanad guide</Link>.</li>
          <li>• <strong>Village canals</strong> — narrow waterways through Kainakari and other villages, where you glimpse authentic Kerala life.</li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Wildlife on the Backwaters</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          The wetlands teem with birdlife — kingfishers, egrets, herons, cormorants and Brahminy kites are common, with
          migratory species arriving in the cooler months. Otters and monitor lizards appear too. For a full spotter&apos;s
          list, see our <Link href="/blog/alleppey-backwater-wildlife-birdwatching" className="text-gold-600 hover:underline">backwater wildlife guide</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Best Time to Visit</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          <strong>November to February</strong> offers the most comfortable weather. The <strong>monsoon (June–September)</strong> is
          lush, dramatic and the best value. Our <Link href="/blog/best-time-alleppey-houseboat" className="text-gold-600 hover:underline">month-by-month guide</Link> breaks it down.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">How to Experience the Backwaters</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          The classic way is an overnight <Link href="/alleppey-houseboats" className="text-gold-600 hover:underline">Alleppey houseboat</Link> cruise —
          drifting slowly through the lakes and canals with fresh Kerala meals served onboard. For the narrowest village
          canals, a small canoe tour goes deeper. Read the complete <Link href="/blog/kerala-houseboat-guide" className="text-gold-600 hover:underline">Kerala Houseboat Guide</Link> to plan your trip.
        </p>

        {/* CTA */}
        <div className="mt-10 text-center bg-sand-50 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Ready to cruise the Alleppey backwaters?</h2>
          <p className="text-gray-600 text-sm mb-5">Book a private houseboat and experience Kerala&apos;s waterways firsthand.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Book a Houseboat
            </Link>
            <Link href="/alleppey-houseboats" className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors text-sm">
              View Houseboats
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
