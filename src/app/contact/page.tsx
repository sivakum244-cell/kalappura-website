import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Kalappura Houseboats | Alleppey, Kerala",
  description:
    "Contact Kalappura Houseboats in Alleppey (Alappuzha), Kerala. Call or WhatsApp +91 98950 53528, email info@kalappurahouseboats.com, or visit our dock. We reply within an hour.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Kalappura Houseboats",
    description: "Get in touch — call, WhatsApp, or email. We reply within an hour.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.alleppeyhouseboat.online/contact" },
    ],
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Kalappura Houseboats & Tours",
    // Primary NAP number (kept consistent across site + citations).
    telephone: SITE_CONFIG.phone,
    email: "info@kalappurahouseboats.com",
    // Both reservation lines exposed as contact points.
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phone,
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Malayalam"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phoneSecondary,
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Malayalam"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mullackal Ward, Iron Bridge P.O, Thirumala East Gate Road",
      addressLocality: "Alleppey",
      addressRegion: "Kerala",
      postalCode: "688011",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 9.4981, longitude: 76.3388 },
    url: "https://www.alleppeyhouseboat.online",
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question or ready to book? We&apos;re here to help — and we reply within an hour.
          </p>
        </div>
      </div>

      {/* Contact methods */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <a href={`tel:${SITE_CONFIG.phone}`} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
            <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-3">
              <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
            <p className="text-sm text-gold-600 font-medium">{SITE_CONFIG.phone}</p>
            <p className="text-sm text-gold-600 font-medium mt-0.5">{SITE_CONFIG.phoneSecondary}</p>
          </a>

          {/* WhatsApp */}
          <a href={`https://wa.me/919895053528`} target="_blank" rel="noopener noreferrer" className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
              <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
            <p className="text-sm text-emerald-600 font-medium">+91 98950 53528</p>
          </a>

          {/* Email */}
          <a href={`mailto:${SITE_CONFIG.email}`} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-sm text-blue-600 font-medium break-all">{SITE_CONFIG.email}</p>
          </a>
        </div>

        {/* Address + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Visit Our Dock</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mullackal Ward, Iron Bridge P.O<br />
              Thirumala East Gate Road<br />
              Alleppey (Alappuzha), Kerala 688011<br />
              India
            </p>
            <a href="https://maps.google.com/?q=Kalappura+Houseboats+Alleppey" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Get Directions
            </a>
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p><strong>Check-in:</strong> 12:00 PM &nbsp;•&nbsp; <strong>Check-out:</strong> 9:00 AM</p>
              <p><strong>We speak:</strong> English, Hindi, Malayalam & more</p>
              <p><strong>Response time:</strong> Under 1 hour</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.9!2d76.3388!3d9.4981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjknNTMuMiJOIDc2wrAyMCcxOS43IkU!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kalappura Houseboats Location"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-sand-50 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Ready to book your houseboat?</h2>
          <p className="text-gray-600 text-sm mb-5">The fastest way to confirm your stay is to book online or message us on WhatsApp.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Book Online
            </Link>
            <a href="https://wa.me/919895053528?text=Hi! I have a question about booking a houseboat." target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BA5A] transition-colors text-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

