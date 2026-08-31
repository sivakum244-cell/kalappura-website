import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Kalappura Houseboats | Our Story & Hosts",
  description:
    "Learn about Kalappura Houseboats & Tours in Alleppey, Kerala. Meet host Jose J with 15+ years of hospitality experience, 5000+ happy guests, and a passion for Kerala backwaters.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Kalappura Houseboats | Our Story",
    description: "Meet the team behind Kalappura Houseboats — 15+ years of Kerala backwater hospitality.",
    url: "/about",
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://www.alleppeyhouseboat.online/about" },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Kalappura Houseboats
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A family-run houseboat experience on the backwaters of Alleppey (Alappuzha), Kerala.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
          <h2 className="font-display text-2xl font-bold text-gray-900">Our Story</h2>
          <p>
            Kalappura Houseboats & Tours is a family-run houseboat operator based in Alleppey (Alappuzha),
            the heart of Kerala&apos;s backwaters. We offer private, traditional kettuvallam houseboats that
            blend authentic Kerala heritage with the modern comforts today&apos;s travellers expect.
          </p>
          <p>
            Our goal is simple: to give every guest a genuine, memorable backwater experience — cruising
            past coconut groves and village canals, enjoying home-style Kerala cuisine cooked fresh onboard,
            and waking up to the peaceful mornings that only the backwaters can offer.
          </p>

          <h2 className="font-display text-2xl font-bold text-gray-900 mt-8">Meet Your Host</h2>
          <div className="bg-sand-50 rounded-2xl p-6 not-prose">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                JJ
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-gray-900">Jose J</h3>
                <p className="text-gold-600 font-medium text-sm">Owner & Host</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed italic">
              &quot;Welcome to Kalappura! I&apos;ve spent over 15 years in hospitality, ensuring every guest
              experiences the true beauty of Kerala&apos;s backwaters. Our team is dedicated to making your
              stay unforgettable — from the moment you board until your departure. We treat every guest as family.&quot;
            </p>
          </div>

          <h2 className="font-display text-2xl font-bold text-gray-900 mt-8">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
            {[
              { label: "Years Experience", value: "15+" },
              { label: "Happy Guests", value: "5000+" },
              { label: "Response Time", value: "<1 hr" },
              { label: "Languages", value: "4" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-white border border-gray-100 rounded-xl">
                <p className="text-2xl font-bold text-gold-600">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold text-gray-900 mt-8">Why Guests Choose Us</h2>
          <ul>
            <li>Private houseboats — never shared with other groups</li>
            <li>All meals included, prepared fresh onboard by our chef</li>
            <li>Air-conditioned bedrooms with private bathrooms</li>
            <li>Direct booking with best price guarantee</li>
            <li>Rated 9.8/10 on Booking.com, #1 on Tripadvisor, Airbnb Superhost</li>
            <li>Personal service and quick response — we reply in under an hour</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/booking" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
            Book Your Stay
          </Link>
          <Link href="/contact" className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 text-sm transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

