import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Honeymoon Houseboat in Alleppey | Romantic Kerala Cruise",
  description:
    "Book a honeymoon houseboat in Alleppey (Alappuzha), Kerala. Private boat, candlelight dinner, flower decoration, sunset cruise and all meals — a romantic backwater escape for couples.",
  keywords: [
    "honeymoon houseboat alleppey",
    "honeymoon houseboat in kerala",
    "romantic houseboat alleppey",
    "alleppey houseboat for couples",
    "honeymoon package alleppey houseboat",
    "candlelight dinner houseboat alleppey",
  ],
  alternates: { canonical: "/honeymoon-houseboat-alleppey" },
  openGraph: {
    type: "website",
    title: "Honeymoon Houseboat in Alleppey | Romantic Kerala Cruise",
    description:
      "A romantic private houseboat honeymoon on the Alleppey backwaters — candlelight dinner, flower decoration, sunset cruise and all meals.",
    url: "/honeymoon-houseboat-alleppey",
    images: [{ url: `${baseUrl}/images/gallery/sunset-1.jpg`, width: 1200, height: 630, alt: "Romantic honeymoon houseboat at sunset on the Alleppey backwaters" }],
  },
};

export default function HoneymoonHouseboatPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Honeymoon Houseboat", item: `${baseUrl}/honeymoon-houseboat-alleppey` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which houseboat is best for a honeymoon in Alleppey?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 1 bedroom private houseboat is ideal for honeymooners — the entire boat is yours, with a private bedroom, deck and dining. The Premium or Semi Luxury package adds extended AC, richer food and a longer cruise for a more special experience.",
        },
      },
      {
        "@type": "Question",
        name: "Can we arrange a candlelight dinner and flower decoration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can request romantic add-ons such as flower decoration, a candlelight dinner on the deck, or a cake in the Special Requests section during booking, and the crew will arrange them before you arrive.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best time for a honeymoon houseboat in Alleppey?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "October to February offers cool, clear, romantic weather. The monsoon (June to September) is lush, private and the best value if you don't mind occasional rain.",
        },
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Honeymoon Houseboat</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Honeymoon Houseboat in Alleppey
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A private houseboat honeymoon on the Kerala backwaters — complete privacy, a candlelight dinner
            under the stars, sunset cruising, and mornings that feel like a dream.
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Why a Houseboat Honeymoon in Alleppey?</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          A houseboat honeymoon in Alleppey is one of the most romantic experiences in India. You get an entire
          private boat to yourselves — no other guests, no shared spaces — drifting slowly through palm-fringed
          backwaters while the crew takes care of everything, from cooking to navigation. It's intimate, peaceful,
          and completely yours.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">The Perfect Boat for Couples</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          For honeymoons, the <Link href="/rooms/suite-with-river-view" className="text-gold-600 hover:underline">1 bedroom private houseboat</Link> is
          ideal — a private bedroom, private deck, and private dining, with panoramic river and lake views. For a more
          upscale experience, explore our <Link href="/luxury-houseboats" className="text-gold-600 hover:underline">luxury houseboats</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Romantic Add-Ons You Can Request</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            "Flower decoration in the bedroom",
            "Candlelight dinner on the deck",
            "Cake for the occasion",
            "Anniversary / celebration setup",
            "Sunset cruise and photography",
            "Fresh Kerala cuisine prepared onboard",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-rose-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">
          Add these in the &quot;Special Requests&quot; field during booking and the crew will set them up before you arrive.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Which Package for a Honeymoon?</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We recommend at least the Premium package for honeymoons — extended AC, a tender-coconut welcome, richer
          food, and a longer 7-stop cruise. For the full experience, the Semi Luxury package adds full-time AC and
          premium dining. Compare them on the <Link href="/houseboat-packages" className="text-gold-600 hover:underline">packages page</Link>,
          or read the <Link href="/blog/luxury-vs-standard-houseboat-alleppey" className="text-gold-600 hover:underline">luxury vs standard comparison</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Best Time for a Honeymoon Cruise</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          October to February offers cool, clear, romantic weather. The monsoon (June to September) is lush, private,
          and the best value. See our <Link href="/blog/best-time-alleppey-houseboat" className="text-gold-600 hover:underline">best time to visit guide</Link> and
          our detailed <Link href="/blog/alleppey-honeymoon-houseboat-guide" className="text-gold-600 hover:underline">honeymoon houseboat guide</Link> for planning tips.
        </p>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-8">
          <div className="p-5 bg-white rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Which houseboat is best for a honeymoon in Alleppey?</h3>
            <p className="text-sm text-gray-600">A 1 bedroom private houseboat with the Premium or Semi Luxury package — total privacy, river views, and romantic add-ons on request.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Can we arrange a candlelight dinner and flower decoration?</h3>
            <p className="text-sm text-gray-600">Yes — request them in the Special Requests section during booking, and the crew will arrange them before you arrive.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">What is the best time for a honeymoon houseboat?</h3>
            <p className="text-sm text-gray-600">October to February for cool, clear weather; the monsoon for a lush, private, better-value escape.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-sand-50 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Ready for your romantic backwater escape?</h2>
          <p className="text-gray-600 text-sm mb-5">Book a private honeymoon houseboat and let us make it special.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking?room=suite-river-view" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Book a Honeymoon Cruise
            </Link>
            <a href="https://wa.me/919895053528?text=Hi! We're planning our honeymoon and would like houseboat details." target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BA5A] transition-colors text-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
