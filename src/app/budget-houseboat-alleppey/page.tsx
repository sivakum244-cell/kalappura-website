import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: { absolute: "Budget Houseboat in Alleppey | Cheap Deals & Tips" },
  description:
    "Looking for a budget or cheap houseboat in Alleppey? Here's how to get the best value — monsoon deals up to 30% off, book-direct savings, and honest tips for an affordable Kerala backwater cruise.",
  keywords: [
    "budget houseboat Alleppey",
    "cheap houseboat Alleppey",
    "affordable Alleppey houseboat",
    "low cost houseboat Kerala",
    "budget Kerala backwater cruise",
  ],
  alternates: { canonical: "/budget-houseboat-alleppey" },
  openGraph: {
    type: "website",
    title: "Budget Houseboat in Alleppey | Cheap Deals & Value Tips",
    description:
      "Get the best value on an Alleppey houseboat — monsoon discounts, book-direct savings, and honest budget tips.",
    url: "/budget-houseboat-alleppey",
    images: [{ url: `${baseUrl}/images/gallery/river-1.jpg`, width: 1200, height: 630, alt: "Budget houseboat cruise on the Alleppey backwaters" }],
  },
};

export default function BudgetHouseboatPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Budget Houseboat Alleppey", item: `${baseUrl}/budget-houseboat-alleppey` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the cheapest way to book an Alleppey houseboat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Travel in the monsoon season (June–September) for up to 30% off, choose the Standard package, book a weekday (Sunday–Thursday), and book directly with the operator to avoid third-party commission markups.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a budget houseboat in Alleppey cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Standard package starts around ₹15,000 per room per night including all meals, AC bedroom and the backwater cruise. Monsoon-season weekday rates are the lowest of the year.",
        },
      },
      {
        "@type": "Question",
        name: "Are cheap houseboats in Alleppey safe and comfortable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. A budget (Standard) package still includes a private AC bedroom, private bathroom, all meals, and a trained crew. You save mainly on AC hours and food variety, not on safety or basics.",
        },
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-emerald-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Budget Houseboat</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Budget Houseboat in Alleppey
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            A cheap Alleppey houseboat doesn&apos;t mean cutting corners. Here&apos;s how to get the best value
            on a private Kerala backwater cruise — with all meals, AC, and crew still included.
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">How to Get the Cheapest Alleppey Houseboat</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          The good news: even the most affordable option here is a <strong>private</strong> houseboat with a private
          AC bedroom, private bathroom, all four meals, and a full crew. You save on package extras, not on the essentials.
          These are the four levers that lower your price:
        </p>

        <div className="space-y-5">
          <div className="p-5 bg-emerald-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">1. Travel in the monsoon (June–September)</h3>
            <p className="text-sm text-gray-600">
              Off-season rates drop up to 30%, and the backwaters are at their greenest. See our
              {" "}<Link href="/blog/alleppey-houseboat-monsoon-experience" className="text-emerald-700 hover:underline">monsoon houseboat guide</Link> for what to expect.
            </p>
          </div>
          <div className="p-5 bg-emerald-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">2. Choose the Standard package</h3>
            <p className="text-sm text-gray-600">
              Standard starts around ₹15,000/room/night and still includes all meals, an AC bedroom, and the cruise.
              You save on AC hours and food variety. Compare on the
              {" "}<Link href="/houseboat-packages" className="text-emerald-700 hover:underline">packages page</Link>.
            </p>
          </div>
          <div className="p-5 bg-emerald-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">3. Book a weekday</h3>
            <p className="text-sm text-gray-600">
              Sunday–Thursday base rates are lower than Friday–Saturday. Shifting your dates by a day or two can save meaningfully.
            </p>
          </div>
          <div className="p-5 bg-emerald-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">4. Book direct, not through OTAs</h3>
            <p className="text-sm text-gray-600">
              Third-party sites add commission that inflates your price. Booking directly gives you the best rate,
              flexible dates, and free cancellation up to 7 days before check-in.
            </p>
          </div>
        </div>

        <div className="mt-8 p-5 bg-sand-50 rounded-2xl">
          <h3 className="font-semibold text-gray-900 mb-2">Estimate your budget in seconds</h3>
          <p className="text-sm text-gray-600 mb-3">
            Use our free <Link href="/houseboat-cost-calculator" className="text-gold-600 hover:underline">houseboat cost calculator</Link> to
            see the total for your dates and group, or view the full <Link href="/houseboat-prices" className="text-gold-600 hover:underline">price list</Link>.
          </p>
        </div>

        <h2 className="font-display text-2xl font-bold text-gray-900 mt-10 mb-4">What You Still Get on a Budget</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Private houseboat — never shared",
            "Air-conditioned bedroom(s)",
            "All meals: lunch, tea & snacks, dinner, breakfast",
            "Private bathroom with hot water",
            "Trained crew (captain, chef, helper)",
            "Backwater cruise through Vembanad Lake & canals",
            "Free parking at the dock",
            "Free cancellation up to 7 days before",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-emerald-600 rounded-2xl p-8 text-white">
          <h2 className="font-display text-xl font-bold mb-2">Ready to book an affordable houseboat?</h2>
          <p className="text-emerald-100 text-sm mb-5">Book direct for the best price, with only 20% advance.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors text-sm">
              Check Availability &amp; Book
            </Link>
            <Link href="/houseboat-cost-calculator" className="px-6 py-3 border-2 border-white/60 text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-sm">
              Estimate My Cost
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
