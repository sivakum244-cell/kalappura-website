import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import CostCalculator from "@/components/CostCalculator";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: { absolute: "Alleppey Houseboat Cost Calculator | Trip Price Estimate" },
  description:
    "Free Alleppey houseboat cost calculator. Estimate your total price instantly — choose boat, package, nights, rooms and guests to see the full cost including GST. Transparent, no hidden charges.",
  keywords: [
    "Alleppey houseboat cost calculator",
    "houseboat price calculator Kerala",
    "Alleppey houseboat cost estimate",
    "how much does an Alleppey houseboat cost",
    "Kerala houseboat price calculator",
  ],
  alternates: { canonical: "/houseboat-cost-calculator" },
  openGraph: {
    title: "Alleppey Houseboat Cost Calculator",
    description:
      "Estimate your Alleppey houseboat trip cost instantly — boat, package, nights, guests, and GST included.",
    url: "/houseboat-cost-calculator",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/gallery/drone-1.jpg`,
        width: 1200,
        height: 630,
        alt: "Alleppey houseboat cost calculator by Kalappura Houseboats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alleppey Houseboat Cost Calculator",
    description: "Estimate your Kerala houseboat trip cost instantly, GST included.",
  },
};

export default function CostCalculatorPage() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Alleppey Houseboat Cost Calculator",
    url: `${baseUrl}/houseboat-cost-calculator`,
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    description:
      "A free calculator that estimates the total cost of an Alleppey houseboat trip based on boat type, package, nights, rooms and guests, including 18% GST.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@type": "Organization", name: "Kalappura Houseboats & Tours", url: baseUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Houseboat Cost Calculator", item: `${baseUrl}/houseboat-cost-calculator` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the Alleppey houseboat cost calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The total is the per-room nightly rate (which varies by boat, package and date) multiplied by the number of rooms and nights, plus ₹1,000 per child (6-11) and ₹1,000 per extra bed, with 18% GST added. Children under 5 stay free.",
        },
      },
      {
        "@type": "Question",
        name: "Is the calculator estimate the final price?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is an accurate estimate using current base rates. Prices can change on peak dates and holidays, so check availability on the booking page for the exact quote for your dates.",
        },
      },
      {
        "@type": "Question",
        name: "How much advance payment is needed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only 20% advance confirms your booking; the balance is paid at the property on check-in day.",
        },
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-amber-900 to-amber-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-amber-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cost Calculator</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alleppey Houseboat Cost Calculator
          </h1>
          <p className="text-lg text-amber-200 max-w-2xl mx-auto">
            Estimate your total houseboat trip cost in seconds. Choose your boat, package, dates and guests
            to see a transparent, all-inclusive price with GST.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <CostCalculator />
      </section>

      {/* How pricing works — the citable, linkable explainer */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">How Alleppey Houseboat Pricing Works</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Alleppey houseboat prices are charged <strong>per room per night</strong>, not per person. The final
          cost depends on four things: the boat type, the package you choose, your dates, and the number of
          rooms and nights. Here is exactly how the estimate above is built:
        </p>
        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li>• <strong>Base nightly rate</strong> — varies by boat and date (weekends and peak season are higher).</li>
          <li>• <strong>Package upgrade</strong> — Standard is the base; Premium and Semi Luxury add more AC hours, food variety, and a longer cruise route.</li>
          <li>• <strong>Rooms × nights</strong> — the nightly rate multiplied across your stay.</li>
          <li>• <strong>Children (6-11): ₹1,000/night</strong> each; under 5 stay free.</li>
          <li>• <strong>Extra bed: ₹1,000/night</strong> each.</li>
          <li>• <strong>18% GST</strong> is added to the subtotal.</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-6">
          For a full breakdown of rates, see our <Link href="/houseboat-prices" className="text-gold-600 hover:underline">houseboat prices page</Link>,
          compare options on the <Link href="/houseboat-packages" className="text-gold-600 hover:underline">packages page</Link>, or read the
          complete <Link href="/blog/kerala-houseboat-guide" className="text-gold-600 hover:underline">Kerala Houseboat Guide</Link>.
          When you are ready, <Link href="/booking" className="text-gold-600 hover:underline">check availability and book</Link> for an exact quote.
        </p>

        <div className="p-5 bg-sand-50 rounded-2xl text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">Free to use and share</p>
          <p>
            Writing about Kerala backwater travel? You are welcome to reference this calculator and link back to it.
            It is kept up to date with our current rates.
          </p>
        </div>
      </section>
    </main>
  );
}
