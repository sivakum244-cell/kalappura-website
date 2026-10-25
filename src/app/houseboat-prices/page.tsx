import type { Metadata } from "next";
import Link from "next/link";
import LivePriceStrip from "@/components/LivePriceStrip";
import ReviewsStrip from "@/components/ReviewsStrip";

export const metadata: Metadata = {
  title: { absolute: "Alleppey Houseboat Price 2026 | Rates Per Night" },
  description:
    "Alleppey houseboat prices from ₹15,000/room/night — see 1, 2 & 3 bedroom boat house rates with all meals, AC & cruise included. Transparent pricing, no hidden charges, book direct for the best rate.",
  keywords: [
    "Alleppey houseboat price",
    "Alleppey houseboat rates",
    "Alleppey boat house price",
    "Alleppey boat house rates",
    "Alappuzha houseboat price",
    "Alleppey houseboat cost",
    "Kerala houseboat rate per night",
    "houseboat booking Alleppey price",
  ],
  alternates: {
    canonical: "/houseboat-prices",
  },
  openGraph: {
    type: "website",
    title: "Alleppey Houseboat Prices & Rates | Kalappura Houseboats",
    description: "Transparent houseboat pricing from ₹15,000/room/night. 1, 2 & 3 bedroom boats. All meals, AC, cruise included.",
    url: "/houseboat-prices",
  },
};

const PRICING_FAQS = [
  { q: "How much does a houseboat in Alleppey cost?", a: "Houseboat rates at Kalappura start from ₹15,000 per room per night for the Standard package. This includes all meals, AC bedroom, and a backwater cruise. Premium costs ₹19,000 and Semi Luxury costs ₹24,000 per room/night." },
  { q: "Is the price per person or per room?", a: "All our prices are per room per night, not per person. Each room accommodates 2 adults + 1 child or extra bed." },
  { q: "Are there any hidden charges?", a: "No hidden charges. The only additional cost is 18% GST on the total amount. Children (6-11) and extra beds are ₹1,000/night. Children under 5 stay free." },
  { q: "Is there a difference between weekday and weekend rates?", a: "The base boat rate is slightly higher on Fridays and Saturdays (weekends). The package pricing remains the same." },
  { q: "What payment options are available?", a: "We accept all major credit/debit cards, UPI, net banking, and cash. You only need to pay 20% advance at booking; the balance is paid at the property." },
];

export default function HouseboatPricesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Houseboat Prices", item: "https://www.alleppeyhouseboat.online/houseboat-prices" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-amber-900 to-amber-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-amber-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Houseboat Prices</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alleppey Houseboat Prices & Rates
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto font-medium mb-3">
            An Alleppey houseboat costs ₹15,000 to ₹24,000 per room per night, including all meals, an AC bedroom and the backwater cruise (plus 18% GST).
          </p>
          <p className="text-base text-amber-200 max-w-2xl mx-auto">
            Transparent pricing for all our houseboats. All rates are per room per night and include meals, cruise, and crew.
          </p>
        </div>
      </div>

      {/* Pricing Table */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
          Houseboat Rates by Boat Type & Package
        </h2>

        {/* Pricing Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold text-gray-900 border-b">Houseboat</th>
                <th className="text-center p-4 font-semibold text-gray-900 border-b">Standard</th>
                <th className="text-center p-4 font-semibold text-gray-900 border-b">Premium</th>
                <th className="text-center p-4 font-semibold text-gray-900 border-b">Semi Luxury</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">
                  <Link href="/rooms/suite-with-river-view" className="font-medium text-gray-900 hover:text-gold-600 transition-colors">
                    1 Bedroom Houseboat
                  </Link>
                  <p className="text-xs text-gray-500">Up to 3 guests • Couples & Honeymoon</p>
                </td>
                <td className="p-4 text-center font-semibold text-gray-900">₹15,000</td>
                <td className="p-4 text-center font-semibold text-gray-900">₹19,000</td>
                <td className="p-4 text-center font-semibold text-gray-900">₹24,000</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="p-4">
                  <Link href="/rooms/double-twin-room-lake-view" className="font-medium text-gray-900 hover:text-gold-600 transition-colors">
                    2 Bedroom Houseboat
                  </Link>
                  <p className="text-xs text-gray-500">Up to 6 guests • Small families & Friends</p>
                </td>
                <td className="p-4 text-center font-semibold text-gray-900">₹15,000</td>
                <td className="p-4 text-center font-semibold text-gray-900">₹19,000</td>
                <td className="p-4 text-center font-semibold text-gray-900">₹24,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <Link href="/rooms/standard-cabin-on-boat" className="font-medium text-gray-900 hover:text-gold-600 transition-colors">
                    3 Bedroom Houseboat
                  </Link>
                  <p className="text-xs text-gray-500">Up to 9 guests • Families & Groups</p>
                </td>
                <td className="p-4 text-center font-semibold text-gray-900">₹15,000</td>
                <td className="p-4 text-center font-semibold text-gray-900">₹19,000</td>
                <td className="p-4 text-center font-semibold text-gray-900">₹24,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          All prices are per room per night. 18% GST applicable. Weekend rates (Fri-Sat) may vary.
          Children (6-11): ₹1,000 extra. Extra bed: ₹1,000. Children under 5 stay free.
        </p>

        {/* Live current rates (pulled from admin DB rates) */}
        <div className="mt-12 p-6 bg-sand-50 rounded-2xl">
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Current Starting Rates</h3>
          <p className="text-sm text-gray-600 mb-4">
            Live starting rates per boat, updated in real time. The base boat rate varies by date and day of the week
            (Fridays and Saturdays are slightly higher). Package pricing (Standard/Premium/Semi Luxury) is added on top.
          </p>
          <LivePriceStrip />
          <p className="text-xs text-gray-500 mt-3">
            Note: These are current base boat rates and may change during peak season and holidays.
            For exact pricing on your dates, check availability on the booking page.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-emerald-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">What&apos;s Included in the Price</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Overnight backwater cruise (12 PM to 9 AM next day)",
              "All meals: lunch, tea & snacks, dinner, breakfast",
              "Private houseboat with crew (captain, chef, helper)",
              "Air-conditioned bedrooms",
              "Private bathrooms with hot water",
              "Free parking at dock",
              "Free cancellation up to 7 days before",
              "Only 20% advance, balance at property",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Charges */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Additional Charges</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-700">18% GST</span>
            <span className="text-sm font-medium text-gray-900">Applicable on total amount</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-700">Child (6-11 years)</span>
            <span className="text-sm font-medium text-gray-900">₹1,000 per night</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-700">Extra bed</span>
            <span className="text-sm font-medium text-gray-900">₹1,000 per night</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-700">Child under 5</span>
            <span className="text-sm font-medium text-emerald-700">Free</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Pricing FAQ</h2>
          <div className="space-y-4">
            {PRICING_FAQS.map((faq) => (
              <div key={faq.q} className="p-5 bg-white rounded-2xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ReviewsStrip />

      <section className="py-16 px-4 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Book Now
          </Link>
          <Link href="/houseboat-packages" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            Compare Packages
          </Link>
          <Link href="/alleppey-houseboats" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            View Houseboats
          </Link>
        </div>
      </section>
    </main>
  );
}

