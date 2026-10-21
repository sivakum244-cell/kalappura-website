import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Alleppey Houseboat Day Cruise | One Day Boat Trip Guide",
  description:
    "Alleppey houseboat day cruise guide — timings, what's included, how a one day houseboat trip works, and how it compares to an overnight stay on the Kerala backwaters.",
  keywords: [
    "alleppey houseboat day cruise",
    "one day houseboat alleppey",
    "day cruise houseboat alleppey",
    "alleppey day boat trip",
    "kerala houseboat day trip",
    "alleppey backwater day cruise",
  ],
  alternates: { canonical: "/day-cruise-houseboat-alleppey" },
  openGraph: {
    type: "website",
    title: "Alleppey Houseboat Day Cruise | One Day Boat Trip",
    description:
      "How an Alleppey houseboat day cruise works — timings, inclusions, and whether a day trip or overnight suits you best.",
    url: "/day-cruise-houseboat-alleppey",
    images: [{ url: `${baseUrl}/images/gallery/deck-1.jpg`, width: 1200, height: 630, alt: "Alleppey houseboat day cruise on the Kerala backwaters" }],
  },
};

export default function DayCruisePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Houseboat Day Cruise", item: `${baseUrl}/day-cruise-houseboat-alleppey` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long is an Alleppey houseboat day cruise?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A day cruise typically runs a few hours during the daytime (commonly around a 4 to 6 hour window), without an overnight stay. Exact timing depends on the operator and package, so confirm when booking.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a day cruise and an overnight houseboat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A day cruise is a shorter daytime trip with no overnight stay. An overnight houseboat includes check-in at noon, an afternoon cruise, sunset, dinner, an overnight stay in an AC bedroom, and breakfast before a 9 AM check-out.",
        },
      },
      {
        "@type": "Question",
        name: "Is a day cruise or overnight houseboat better?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A day cruise suits travellers short on time or budget who want a taste of the backwaters. An overnight stay gives the full experience — sunset, night on the water, and sunrise. If you can spare the time, overnight is the more complete choice.",
        },
      },
      {
        "@type": "Question",
        name: "Does a day cruise include meals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many day cruises include lunch and refreshments, but inclusions vary by operator and package. Always check exactly what is included before booking.",
        },
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Houseboat Day Cruise</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alleppey Houseboat Day Cruise
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Short on time? A one day houseboat trip lets you experience the Alleppey backwaters
            in a few daytime hours — cruising, scenery, and a Kerala meal, without an overnight stay.
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">What Is a Houseboat Day Cruise?</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          A houseboat day cruise is a daytime backwater trip on a private houseboat, without staying the night.
          It's ideal for travellers passing through Alleppey (Alappuzha), families with young children, or anyone
          who wants a relaxed taste of the Kerala backwaters in a shorter window. You still cruise the canals and
          lakes, enjoy the scenery, and typically have a meal onboard — just condensed into a few hours.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Typical Day Cruise Timings</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Day cruises usually run for a few daytime hours. A common window is around 4 to 6 hours, though exact
          durations differ between operators and packages. A typical flow looks like:
        </p>
        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li>• <strong>Late morning boarding</strong> — settle in and set off</li>
          <li>• <strong>Cruise</strong> through village canals and open backwaters</li>
          <li>• <strong>Lunch onboard</strong> (where included) — fresh Kerala cuisine</li>
          <li>• <strong>Scenic stops</strong> for photos and views</li>
          <li>• <strong>Afternoon return</strong> to the boarding point</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-6">
          Because timings and routes vary, confirm the exact schedule for your chosen boat and date before booking.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">What's Typically Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            "Private houseboat for your group",
            "Daytime backwater cruise",
            "Lunch onboard (where included)",
            "Scenic canal and lake routes",
            "Crew to navigate and assist",
            "Photo stops along the way",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">
          Inclusions differ by operator and package, so always check what's covered. For a full breakdown of rates,
          see our <Link href="/houseboat-prices" className="text-gold-600 hover:underline">Alleppey houseboat prices</Link> page
          or estimate your total with the <Link href="/houseboat-cost-calculator" className="text-gold-600 hover:underline">cost calculator</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Day Cruise vs Overnight Houseboat</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          The big decision is whether to do a day cruise or stay overnight. Both are wonderful; they suit different travellers:
        </p>
        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li>• <strong>Choose a day cruise</strong> if you're short on time or budget, or travelling with very young children.</li>
          <li>• <strong>Choose an overnight houseboat</strong> for the full experience — afternoon cruise, sunset, dinner, a night on the water, and a misty sunrise.</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-6">
          For a detailed comparison, read our guide on
          {" "}<Link href="/blog/day-cruise-vs-overnight-houseboat-alleppey" className="text-gold-600 hover:underline">day cruise vs overnight houseboat</Link>,
          or explore the full <Link href="/overnight-houseboat" className="text-gold-600 hover:underline">overnight houseboat</Link> experience.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-8">
          <div className="p-5 bg-white rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">How long is an Alleppey houseboat day cruise?</h3>
            <p className="text-sm text-gray-600">A day cruise typically runs a few daytime hours (commonly around 4 to 6 hours) with no overnight stay. Exact timing depends on the operator and package.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Is a day cruise or overnight houseboat better?</h3>
            <p className="text-sm text-gray-600">A day cruise suits shorter trips and tighter budgets; an overnight stay gives the complete experience with sunset, dinner, and sunrise on the water.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Does a day cruise include meals?</h3>
            <p className="text-sm text-gray-600">Many day cruises include lunch and refreshments, but inclusions vary. Always check exactly what's included before booking.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-sand-50 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Plan your Alleppey backwater trip</h2>
          <p className="text-gray-600 text-sm mb-5">Tell us your dates and group, and we'll help you choose between a day cruise and an overnight stay.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Check Availability &amp; Book
            </Link>
            <a href="https://wa.me/919895053528?text=Hi! I'd like details on an Alleppey houseboat day cruise." target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BA5A] transition-colors text-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
