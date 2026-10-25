import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Group Houseboat Booking in Alleppey | Kalappura" },
  description:
    "Planning an Alleppey houseboat for a large group? Book private 2 & 3 bedroom boats, or multiple boats cruising together. All meals included, coordinated route, best group rate booking direct.",
  keywords: [
    "group houseboat booking alleppey",
    "houseboat for large group kerala",
    "multiple houseboats alleppey",
    "3 bedroom houseboat group",
    "corporate houseboat alleppey",
    "friends group houseboat kerala",
  ],
  alternates: { canonical: "/group-booking" },
  openGraph: {
    type: "website",
    title: "Group Houseboat Booking in Alleppey | Kalappura Houseboats",
    description:
      "Private 2 & 3 bedroom houseboats and multi-boat group cruises in Alleppey. All meals included, coordinated route, best group rate when you book direct.",
    url: "/group-booking",
    images: [
      {
        url: "/images/gallery/dining-1.jpg",
        width: 1200,
        height: 630,
        alt: "Group dining on a Kalappura houseboat in Alleppey",
      },
    ],
  },
};

export default function GroupBookingPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Group Booking", item: "https://www.alleppeyhouseboat.online/group-booking" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many people can one Alleppey houseboat hold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 2 bedroom houseboat holds up to 6 guests and a 3 bedroom houseboat holds up to 9 guests. For larger groups, multiple boats can cruise the same route together.",
        },
      },
      {
        "@type": "Question",
        name: "Can we book multiple houseboats for a big group?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. For groups larger than 9, we arrange multiple private houseboats cruising the same route, with coordinated check-in, meals and anchoring so the whole party stays together.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a discount for group bookings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Booking directly gives the best group rate as there is no agent commission. Share your dates and group size for a tailored quote with best price guarantee and flexible cancellation.",
        },
      },
      {
        "@type": "Question",
        name: "Are houseboats good for corporate offsites or celebrations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. A private houseboat suits corporate offsites, reunions, birthdays and anniversaries, with space for shared meals and the option to add celebration arrangements.",
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
            <span className="text-white">Group Booking</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Group Houseboat Booking in Alleppey
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Travelling with a big group? Book a private 3 bedroom houseboat, or multiple boats cruising
            together — with all meals included and the whole party on the same backwater route.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
          Private Houseboats Built for Groups
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          A houseboat is one of the easiest ways to keep a group together in Alleppey. Instead of
          splitting across hotel rooms and restaurants, everyone shares one private boat — the deck,
          the dining area, and the cruise. Meals are cooked onboard, and the route is coordinated so
          no one gets left behind.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">2 Bedroom Houseboat — up to 6</h3>
            <p className="text-sm text-gray-600">
              Two private bedrooms plus a shared living and dining area. Ideal for a small group or
              close family. <Link href="/rooms/double-twin-room-lake-view" className="text-gold-600 hover:underline">View the 2 bedroom boat</Link>.
            </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">3 Bedroom Houseboat — up to 9</h3>
            <p className="text-sm text-gray-600">
              The most shared space, for larger or joint families and groups.
              {" "}<Link href="/rooms/standard-cabin-on-boat" className="text-gold-600 hover:underline">View the 3 bedroom boat</Link>.
            </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">Multiple boats — 10+ guests</h3>
            <p className="text-sm text-gray-600">
              For bigger parties, several private boats cruise the same route together with
              coordinated check-in, meals and anchoring.
            </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-1">Occasions &amp; offsites</h3>
            <p className="text-sm text-gray-600">
              Great for reunions, birthdays, anniversaries and corporate offsites. Celebration
              arrangements can be added on request.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand-50 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">How Group Booking Works</h2>
          <ol className="space-y-4 text-gray-600">
            <li><strong className="text-gray-900">1. Tell us your group.</strong> Share your dates, number of adults and children, and any dietary needs.</li>
            <li><strong className="text-gray-900">2. We match the boats.</strong> One 3 bedroom boat, or multiple boats on the same route for larger groups.</li>
            <li><strong className="text-gray-900">3. Confirm with 20% advance.</strong> Balance is paid at the property; free cancellation up to 7 days before check-in.</li>
            <li><strong className="text-gray-900">4. Cruise together.</strong> Coordinated check-in at noon, shared meals, and an evening anchor at a scenic spot.</li>
          </ol>
          <p className="text-gray-600 mt-6">
            Read more in our <Link href="/blog/family-group-houseboat-alleppey-backwater-escape" className="text-gold-600 hover:underline">family &amp; group backwater escape guide</Link>,
            or compare options in the <Link href="/blog/kerala-houseboat-guide" className="text-gold-600 hover:underline">Kerala Houseboat Guide</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-14 text-center">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Get a Group Quote</h2>
        <p className="text-gray-600 mb-6">
          Booking direct gives the best group rate — no agent commission, best price guarantee, and flexible cancellation.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/booking" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Request a Group Booking
          </Link>
          <Link href="/houseboat-prices" className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            View Prices
          </Link>
        </div>
      </section>
    </main>
  );
}
