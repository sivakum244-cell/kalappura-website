import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Luxury Houseboat in Kerala & Alleppey | Premium Boats" },
  description:
    "Book a luxury houseboat in Kerala (Alleppey). Private AC boats with premium amenities, onboard chef, all meals and a backwater cruise — ideal for couples.",
  keywords: [
    "luxury houseboat in kerala",
    "luxury houseboat Alleppey",
    "best houseboat in kerala",
    "best houseboat Alleppey",
    "premium houseboat Kerala",
    "Alleppey honeymoon houseboat",
    "private luxury houseboat Kerala",
  ],
  alternates: {
    canonical: "/luxury-houseboats",
  },
  openGraph: {
    type: "website",
    title: "Luxury Houseboats in Alleppey | Kalappura Houseboats",
    description: "Private luxury houseboats for honeymoons and premium experiences on Kerala backwaters.",
    url: "/luxury-houseboats",
    images: [{ url: "/images/rooms/suite-river-view/1.jpg", width: 1200, height: 630, alt: "Luxury private houseboat with river view, Alleppey" }],
  },
};

export default function LuxuryHouseboatsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Luxury Houseboats", item: "https://www.alleppeyhouseboat.online/luxury-houseboats" },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Luxury Houseboats</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Luxury Houseboat in Kerala &amp; Alleppey
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Private, intimate, and beautifully crafted. Among the best houseboats in Kerala, our luxury boats in Alleppey offer the perfect setting for honeymoons, anniversaries, and premium backwater experiences.
          </p>
        </div>
      </div>

      {/* What Makes it Luxury */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          The Luxury Houseboat Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src="/images/rooms/suite-river-view/1.jpg"
              alt="Luxury 1 bedroom houseboat interior with premium furnishings, Alleppey"
              className="w-full h-64 object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Private 1 Bedroom Houseboat</h3>
            <p className="text-gray-600 mb-4">
              Our 1 Bedroom Houseboat is designed for couples seeking complete privacy on the Kerala backwaters. You get an entire boat to yourselves — no other guests, no shared spaces. Just you, the water, and the crew taking care of everything.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-gold-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                Complete privacy — entire boat for your exclusive use
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-gold-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                Panoramic river and lake views from every angle
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-gold-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                Air conditioning, private bathroom, luxury furnishings
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-gold-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                Onboard chef preparing fresh Kerala cuisine
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-gold-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                Sunset views from the private deck
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/rooms/suite-with-river-view" className="inline-block px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honeymoon Section */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Honeymoon Houseboat in Alleppey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                A houseboat honeymoon in Alleppey is one of the most romantic experiences in India. Cruise through peaceful backwaters with your partner while the crew handles everything — from cooking to navigation.
              </p>
              <p className="text-gray-600 mb-4">
                For honeymoon bookings, you can add special requests during the booking process such as flower decoration, candlelight dinner setup, or cake arrangement. These can be noted in the special requests section of the booking form.
              </p>
              <h3 className="font-display text-lg font-bold text-gray-900 mt-6 mb-3">What couples love about our houseboats:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Complete privacy — private boat, private deck, private dining</li>
                <li>• Romantic sunset views over Vembanad Lake</li>
                <li>• Fresh Kerala cuisine served onboard</li>
                <li>• Wake up to serene backwater mornings</li>
                <li>• No crowds, no interruptions</li>
              </ul>
            </div>
            <div>
              <img
                src="/images/gallery/sunset-1.jpg"
                alt="Romantic sunset over Alleppey backwaters — perfect honeymoon setting"
                className="w-full h-72 object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Semi Luxury Package */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Semi Luxury Package — The Best Experience</h2>
        <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <p className="text-sm text-amber-700 font-medium">Our premium offering</p>
              <p className="text-2xl font-bold text-gray-900">₹24,000 <span className="text-sm font-normal text-gray-500">/room/night + GST</span></p>
            </div>
            <Link href="/booking" className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Book Semi Luxury
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-amber-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              AC available all the time (bedroom or hall)
            </li>
            <li className="flex items-center gap-2">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-amber-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              Premium seafood + chicken in every meal
            </li>
            <li className="flex items-center gap-2">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-amber-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              Extended 7-stop cruise route
            </li>
            <li className="flex items-center gap-2">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-amber-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              Welcome drink — Tender Coconut
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center border-t border-gray-100">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Book your luxury houseboat experience</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/booking?room=suite-river-view" className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Book 1 Bedroom (Couples)
          </Link>
          <Link href="/houseboat-packages" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            Compare Packages
          </Link>
          <a href="https://wa.me/919895053528?text=Hi! I'm interested in the luxury houseboat for my honeymoon." target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BA5A] transition-colors">
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  );
}

