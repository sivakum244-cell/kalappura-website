import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "How to Reach Alleppey Houseboat | Airport & Train" },
  description:
    "How to reach Kalappura Houseboats in Alleppey, Kerala — directions from Cochin Airport (85 km), Alleppey Railway Station (2.5 km) and by road.",
  keywords: [
    "how to reach Alleppey houseboat",
    "Cochin airport to Alleppey houseboat",
    "Alleppey houseboat directions",
    "how to reach Alappuzha",
    "Alleppey railway station to houseboat",
  ],
  alternates: { canonical: "/how-to-reach" },
  openGraph: {
    type: "website",
    title: "How to Reach Alleppey Houseboat | Kalappura Houseboats",
    description: "Directions to our houseboat dock from Cochin airport, railway station, and by road. Free parking available.",
    url: "/how-to-reach",
  },
};

export default function HowToReachPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "How to Reach", item: "https://www.alleppeyhouseboat.online/how-to-reach" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How far is Alleppey from Cochin airport?",
        acceptedAnswer: { "@type": "Answer", text: "Cochin International Airport (COK) is approximately 85 km from our houseboat dock in Alleppey, about a 2-hour drive. We can arrange airport pickup on request." },
      },
      {
        "@type": "Question",
        name: "Is there parking at the houseboat dock?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, free private parking is available at our dock in Alleppey. You can safely leave your vehicle during your overnight houseboat stay." },
      },
      {
        "@type": "Question",
        name: "How far is Alleppey Railway Station from the dock?",
        acceptedAnswer: { "@type": "Answer", text: "Alleppey Railway Station is just 2.5 km from our dock, about an 8-minute drive. Auto-rickshaws and taxis are readily available." },
      },
    ],
  };

  const routes = [
    {
      icon: "✈️",
      title: "By Air — Cochin International Airport",
      distance: "85 km • ~2 hours",
      details: [
        "Nearest airport: Cochin International Airport (COK)",
        "Take a pre-paid taxi or cab to Alleppey (Alappuzha)",
        "Drive time is approximately 2 hours via NH66",
        "We can arrange airport pickup on request — contact us in advance",
        "Trivandrum Airport is an alternative (155 km, ~3.5 hours)",
      ],
    },
    {
      icon: "🚆",
      title: "By Train — Alleppey Railway Station",
      distance: "2.5 km • ~8 minutes",
      details: [
        "Alleppey (Alappuzha) Railway Station is well-connected to major cities",
        "Direct trains from Chennai, Bangalore, Trivandrum, Ernakulam",
        "From the station, take an auto-rickshaw or taxi to our dock (8 min)",
        "Share your train details and we can guide your driver to the dock",
      ],
    },
    {
      icon: "🚌",
      title: "By Road — Bus / Car",
      distance: "Well-connected",
      details: [
        "Alleppey is on NH66, well-connected by road",
        "KSRTC buses run frequently from Cochin, Trivandrum, Kottayam",
        "Alleppey KSRTC bus stand is about 2 km from our dock",
        "If driving, free parking is available at our dock",
        "Use Google Maps directions to 'Kalappura Houseboats Alleppey'",
      ],
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">How to Reach</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How to Reach Our Alleppey Houseboat
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Getting to Kalappura Houseboats in Alleppey (Alappuzha), Kerala is easy by air, train, or road. Here are complete directions.
          </p>
        </div>
      </div>

      {/* Routes */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        {routes.map((route) => (
          <div key={route.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{route.icon}</span>
              <div>
                <h2 className="font-display text-xl font-bold text-gray-900">{route.title}</h2>
                <p className="text-sm text-gold-600 font-medium">{route.distance}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {route.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Address & Map */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Our Dock Address</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
            <p className="text-gray-700 leading-relaxed mb-4">
              Mullackal Ward, Iron Bridge P.O<br />
              Thirumala East Gate Road<br />
              Alleppey (Alappuzha), Kerala 688011, India
            </p>
            <a
              href="https://maps.google.com/?q=Kalappura+Houseboats+Alleppey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="mt-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <p className="text-sm text-emerald-800">
              <strong>Need pickup?</strong> Contact us on WhatsApp at{" "}
              <a href="https://wa.me/919895053528" className="underline font-medium">+91 98950 53528</a>{" "}
              and we&apos;ll help arrange transport or guide your driver to the dock.
            </p>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Distances from Key Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ["Alleppey Railway Station", "2.5 km • 8 min"],
            ["Alleppey KSRTC Bus Stand", "2 km • 7 min"],
            ["Alleppey Beach", "3 km • 10 min"],
            ["Vembanad Lake", "1 km • 5 min"],
            ["Mullakkal Temple", "0.5 km • 2 min"],
            ["Cochin International Airport", "85 km • 2 hr"],
          ].map(([place, dist]) => (
            <div key={place} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-700">{place}</span>
              <span className="text-sm font-medium text-gray-900">{dist}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand-50 py-12 px-4 text-center">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Ready to plan your trip?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/booking" className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
            Book Your Houseboat
          </Link>
          <Link href="/alleppey-houseboats" className="px-6 py-2.5 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 text-sm transition-colors">
            View Houseboats
          </Link>
        </div>
      </section>
    </main>
  );
}

