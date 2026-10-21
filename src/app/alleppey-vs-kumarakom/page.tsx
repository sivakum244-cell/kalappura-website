import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alleppey vs Kumarakom Houseboat | Which is Better for You?",
  description:
    "Alleppey vs Kumarakom houseboat comparison — which Kerala backwater destination is right for you? Compare scenery, activities, crowds, and experience. Book your Alleppey houseboat with Kalappura.",
  keywords: [
    "Alleppey vs Kumarakom houseboat",
    "Alleppey or Kumarakom",
    "best Kerala backwater destination",
    "Kumarakom vs Alleppey",
    "which houseboat destination Kerala",
  ],
  alternates: { canonical: "/alleppey-vs-kumarakom" },
  openGraph: {
    type: "website",
    title: "Alleppey vs Kumarakom Houseboat | Kalappura Houseboats",
    description: "Which Kerala backwater destination is right for you? Honest comparison of Alleppey vs Kumarakom houseboats.",
    url: "/alleppey-vs-kumarakom",
  },
};

export default function AlleppeyVsKumarakomPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Alleppey vs Kumarakom", item: "https://www.alleppeyhouseboat.online/alleppey-vs-kumarakom" },
    ],
  };

  const comparison = [
    { feature: "Backwater network", alleppey: "Largest & most extensive canal network", kumarakom: "Smaller, focused around Vembanad Lake" },
    { feature: "Houseboat options", alleppey: "Widest choice — most boats operate here", kumarakom: "Fewer boats, more limited" },
    { feature: "Village life", alleppey: "Rich village canals, paddy fields, daily life", kumarakom: "More resort-focused, less village access" },
    { feature: "Bird watching", alleppey: "Good — herons, kingfishers, cormorants", kumarakom: "Excellent — famous bird sanctuary nearby" },
    { feature: "Crowd level", alleppey: "More popular, more activity on water", kumarakom: "Quieter, more secluded" },
    { feature: "Accessibility", alleppey: "Easy — own railway station, near NH66", kumarakom: "Slightly more remote" },
    { feature: "Best for", alleppey: "First-timers, families, full backwater experience", kumarakom: "Those wanting quiet & bird watching" },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-emerald-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Alleppey vs Kumarakom</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alleppey vs Kumarakom Houseboat
          </h1>
          <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
            Both are beautiful Kerala backwater destinations. Here&apos;s an honest comparison to help you choose the right one for your trip.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
          <p>
            Alleppey (Alappuzha) and Kumarakom are the two most popular houseboat
            destinations in Kerala. Both sit on the famous Vembanad Lake and offer
            traditional kettuvallam houseboat experiences. The main difference comes
            down to the type of experience you want.
          </p>
          <p>
            <strong>Choose Alleppey</strong> if you want the full backwater experience —
            the largest network of canals, the most houseboat options, vibrant village
            life, and easy access. It&apos;s the classic Kerala houseboat destination and
            ideal for first-time visitors and families.
          </p>
          <p>
            <strong>Choose Kumarakom</strong> if you prefer a quieter, more secluded
            experience with excellent bird watching, especially near the Kumarakom Bird
            Sanctuary. It&apos;s more resort-focused and less crowded.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
            <div className="px-4 py-4">
              <p className="text-xs font-medium text-gray-500 uppercase">Feature</p>
            </div>
            <div className="px-4 py-4 text-center bg-emerald-50 border-x border-emerald-100">
              <p className="text-sm font-bold text-emerald-700">Alleppey</p>
            </div>
            <div className="px-4 py-4 text-center">
              <p className="text-sm font-medium text-gray-600">Kumarakom</p>
            </div>
          </div>
          {comparison.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 ? "bg-gray-50/30" : ""}`}>
              <div className="px-4 py-3 flex items-center">
                <span className="text-sm font-medium text-gray-700">{row.feature}</span>
              </div>
              <div className="px-4 py-3 text-center bg-emerald-50/40 border-x border-emerald-50 flex items-center justify-center">
                <span className="text-xs text-gray-700">{row.alleppey}</span>
              </div>
              <div className="px-4 py-3 text-center flex items-center justify-center">
                <span className="text-xs text-gray-500">{row.kumarakom}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Our Verdict</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            For most travellers — especially first-timers, families, and groups — <strong>Alleppey</strong> offers
            the richest and most complete houseboat experience. You get the widest choice of boats, the most
            extensive backwater network, and authentic village life along the cruise. That&apos;s why Alleppey
            remains the most popular houseboat destination in Kerala.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            At Kalappura Houseboats, we operate private houseboats cruising through the best routes of the
            Alleppey backwaters — Vembanad Lake, Punnamada Lake, and the village canals of Kainakari and
            Kuttanad.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Book an Alleppey Houseboat
            </Link>
            <Link href="/alleppey-houseboats" className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 text-sm transition-colors">
              View Our Houseboats
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

