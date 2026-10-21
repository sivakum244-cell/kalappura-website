import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: { absolute: "Kuttanad Houseboat | Rice Bowl of Kerala Cruise" },
  description:
    "Cruise Kuttanad, the Rice Bowl of Kerala, on a private houseboat from Alleppey. See below-sea-level paddy fields, village canals and backwater life on an overnight or day cruise.",
  keywords: [
    "kuttanad houseboat",
    "kuttanad backwater houseboat",
    "kuttanad cruise",
    "kuttanad paddy fields houseboat",
    "alleppey kuttanad backwaters",
  ],
  alternates: { canonical: "/kuttanad-houseboat" },
  openGraph: {
    type: "website",
    title: "Kuttanad Backwater Houseboat Cruise | Alleppey",
    description:
      "Private houseboat cruises through Kuttanad — the Rice Bowl of Kerala — with below-sea-level paddy fields and village canals.",
    url: "/kuttanad-houseboat",
    images: [{ url: `${baseUrl}/images/gallery/river-1.jpg`, width: 1200, height: 630, alt: "Houseboat cruising the Kuttanad backwaters and paddy fields in Kerala" }],
  },
};

export default function KuttanadPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Kuttanad Houseboat", item: `${baseUrl}/kuttanad-houseboat` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I cruise Kuttanad on an Alleppey houseboat?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Alleppey houseboat routes pass through parts of the Kuttanad region, letting you see its famous below-sea-level paddy fields and village canals from the water." },
      },
      {
        "@type": "Question",
        name: "Why is Kuttanad called the Rice Bowl of Kerala?",
        acceptedAnswer: { "@type": "Answer", text: "Kuttanad is a major rice-producing region farmed on land reclaimed from the backwaters — much of it below sea level, which is extremely rare worldwide." },
      },
      {
        "@type": "Question",
        name: "What is special about a Kuttanad cruise?",
        acceptedAnswer: { "@type": "Answer", text: "The vast green paddy fields sitting below the level of the surrounding water, the dykes and canals dividing them, duck farming, and authentic village life along the waterways." },
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
            <span className="text-white">Kuttanad Houseboat</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Kuttanad Backwater Houseboat Cruise
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cruise the Rice Bowl of Kerala on a private houseboat from Alleppey — emerald
            paddy fields below sea level, village canals, and authentic backwater life.
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About Kuttanad</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Kuttanad, known as the &quot;Rice Bowl of Kerala,&quot; is one of the very few regions on earth where
          farming happens below sea level. Fields are reclaimed from the backwaters and protected by dykes,
          with water pumped out to keep the paddy dry. Cruising through Kuttanad on a houseboat from Alleppey
          (Alappuzha) is a rare chance to see this ingenious landscape from the water.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">What You'll See in Kuttanad</h2>
        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li>• Vast green paddy fields stretching below sea level</li>
          <li>• Dykes and narrow canals dividing the fields</li>
          <li>• Duck farming along the waterways</li>
          <li>• Traditional villages and daily backwater life</li>
          <li>• Coconut groves, small churches and temples</li>
          <li>• Abundant birdlife in the wetlands</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-6">
          For a deeper look at the region, read our <Link href="/blog/kuttanad-rice-bowl-kerala-guide" className="text-gold-600 hover:underline">Kuttanad guide</Link>,
          and explore the wider waterways in our <Link href="/alleppey-backwaters" className="text-gold-600 hover:underline">Alleppey backwaters guide</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">How to Cruise Kuttanad</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Kuttanad is part of the Alleppey houseboat cruise route. Book a private
          {" "}<Link href="/alleppey-houseboats" className="text-gold-600 hover:underline">Alleppey houseboat</Link> for an overnight
          stay, or a <Link href="/day-cruise-houseboat-alleppey" className="text-gold-600 hover:underline">day cruise</Link>. See current
          rates on the <Link href="/houseboat-prices" className="text-gold-600 hover:underline">prices page</Link>.
        </p>

        <div className="text-center bg-sand-50 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Ready to cruise Kuttanad?</h2>
          <p className="text-gray-600 text-sm mb-5">Book a private houseboat and drift past the rice bowl of Kerala.</p>
          <Link href="/booking" className="inline-block px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
            Check Availability &amp; Book
          </Link>
        </div>
      </section>
    </main>
  );
}
