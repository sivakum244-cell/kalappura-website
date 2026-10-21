import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Overnight Houseboat in Alleppey | Stay on Kerala Backwaters",
  description:
    "Book an overnight houseboat stay in Alleppey (Alappuzha). Check in at 12 PM, cruise through backwaters, anchor overnight, and check out at 9 AM. All meals, AC, and private crew included. From ₹15,000/night.",
  keywords: [
    "overnight houseboat Alleppey",
    "overnight houseboat Kerala",
    "houseboat stay Alleppey",
    "Alleppey backwater cruise",
    "day cruise Alleppey",
    "houseboat Alleppey 1 night",
  ],
  alternates: {
    canonical: "/overnight-houseboat",
  },
  openGraph: {
    type: "website",
    title: "Overnight Houseboat Stay in Alleppey | Kalappura Houseboats",
    description: "Stay overnight on a private houseboat in Alleppey. Backwater cruise, all meals, AC rooms. From ₹15,000/night.",
    url: "/overnight-houseboat",
    images: [{ url: "/images/gallery/sunset-1.jpg", width: 1200, height: 630, alt: "Overnight houseboat anchored on Alleppey backwaters at sunset" }],
  },
};

const OVERNIGHT_FAQS = [
  { q: "Is it safe to stay overnight on a houseboat?", a: "Yes. Our boats are anchored in safe, designated spots. Each boat has an experienced crew onboard throughout the night for safety. Life jackets are available for all guests." },
  { q: "What time does the AC run?", a: "Depends on your package. Standard: 8:30 PM–6:30 AM (bedroom only). Premium: 5:30 PM–7:30 AM (bedroom/hall). Semi Luxury: all the time." },
  { q: "Can I extend my stay to 2 nights?", a: "Yes, multi-night stays are available. Each additional night is charged at the same rate. Contact us to arrange extended cruises." },
  { q: "What happens if it rains?", a: "Houseboats are covered and weatherproof. You can cruise in light rain without any issues. In heavy monsoon conditions, cruising may be limited but the stay is still comfortable." },
  { q: "Is there phone signal on the backwaters?", a: "Mobile signal is generally available throughout the cruise route. WiFi is available on the boat, though signal strength may vary in deeper canal areas." },
];

export default function OvernightHouseboatPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Overnight Houseboat", item: "https://www.alleppeyhouseboat.online/overnight-houseboat" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: OVERNIGHT_FAQS.map((f) => ({
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
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-blue-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Overnight Houseboat</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Overnight Houseboat Stay in Alleppey
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Experience the magic of spending a night on the Kerala backwaters. Cruise through canals during the day, anchor at sunset, and wake up to peaceful mornings.
          </p>
        </div>
      </div>

      {/* How it Works - Timeline */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
          How the Overnight Stay Works
        </h2>
        <div className="space-y-6">
          {[
            { time: "12:00 PM", title: "Check-in & Welcome", desc: "Board your private houseboat at our dock in Alleppey. You are welcomed with drinks and the boat departs immediately for the backwater cruise." },
            { time: "1:00 PM", title: "Lunch on Board", desc: "Enjoy a traditional Kerala meal prepared fresh by your onboard chef. Choose vegetarian or non-vegetarian options." },
            { time: "1:30–5:00 PM", title: "Backwater Cruise", desc: "Cruise through Vembanad Lake, Punnamada Lake, and the village canals of Kainakari and Kuppappuram. Enjoy the scenery from the upper deck." },
            { time: "5:00 PM", title: "Evening Anchoring", desc: "The boat anchors at a scenic spot for the night. Enjoy evening tea and snacks while watching the sunset over the backwaters." },
            { time: "7:30–8:30 PM", title: "Dinner", desc: "A fresh dinner is served onboard — chapati, rice, curry, and non-veg options if chosen." },
            { time: "8:30 PM onwards", title: "Night on the Backwaters", desc: "AC is switched on in the bedrooms. Sleep to the sound of gentle water lapping against the boat." },
            { time: "7:00 AM", title: "Breakfast", desc: "Wake up to a fresh breakfast. Choose from idly, puttu, or bread toast with eggs and tea/coffee." },
            { time: "9:00 AM", title: "Check-out", desc: "The boat returns to the dock and you check out by 9:00 AM. Free parking available for your vehicle." },
          ].map((step, i) => (
            <div key={step.time} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {i + 1}
                </div>
                {i < 7 && <div className="w-px h-full bg-blue-100 mt-2" />}
              </div>
              <div className="pb-4">
                <p className="text-xs font-medium text-blue-600 mb-0.5">{step.time}</p>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Day Cruise vs Overnight */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
            Overnight Stay vs Day Cruise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">Overnight Stay (What we offer)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Check-in 12 PM, check-out 9 AM next day</li>
                <li>✓ All 4 meals + tea & snacks included</li>
                <li>✓ AC bedrooms for the night</li>
                <li>✓ Sunset + sunrise on the backwaters</li>
                <li>✓ Full cruise route through lakes & canals</li>
                <li>✓ Peaceful night anchored on the water</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">Day Cruise (Not offered currently)</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Typically 4-6 hours only</li>
                <li>• Usually only 1-2 meals</li>
                <li>• No overnight stay</li>
                <li>• Shorter cruise route</li>
                <li>• Miss the sunset/sunrise experience</li>
              </ul>
              <p className="text-xs text-gray-400 mt-3">We focus exclusively on overnight stays because the full day-night experience is what makes a houseboat trip truly memorable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">What to Bring on an Overnight Houseboat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Comfortable clothing and a light jacket for the evening",
            "Sunscreen and sunglasses for the deck cruise",
            "Camera for sunset and backwater photography",
            "Personal toiletries (towels are provided)",
            "Any special medications you may need",
            "Power bank — charging points are available but limited",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Overnight Houseboat FAQ</h2>
          <div className="space-y-4">
            {OVERNIGHT_FAQS.map((faq) => (
              <div key={faq.q} className="p-5 bg-white rounded-2xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Book your overnight houseboat experience</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Check in at noon, check out at 9 AM. All meals, AC, and crew included. From ₹15,000/room/night.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Book Now
          </Link>
          <Link href="/alleppey-houseboats" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            View Houseboats
          </Link>
          <Link href="/houseboat-prices" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            See Prices
          </Link>
        </div>
      </section>
    </main>
  );
}

