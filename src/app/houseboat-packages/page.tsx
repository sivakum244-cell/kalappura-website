import type { Metadata } from "next";
import Link from "next/link";
import ReviewsStrip from "@/components/ReviewsStrip";

export const metadata: Metadata = {
  title: { absolute: "Alleppey Houseboat Packages | Standard, Premium & Luxury" },
  description:
    "Compare Alleppey houseboat packages — Standard (₹15,000), Premium (₹19,000) & Semi Luxury (₹24,000) per room/night. All meals, AC & cruise included.",
  keywords: [
    "Alleppey houseboat packages",
    "houseboat package Alleppey",
    "Kerala houseboat package",
    "Alappuzha houseboat package",
    "houseboat stay Alleppey",
  ],
  alternates: {
    canonical: "/houseboat-packages",
  },
  openGraph: {
    type: "website",
    title: "Alleppey Houseboat Packages | Kalappura Houseboats",
    description: "Standard, Premium & Semi Luxury packages. All meals, AC, backwater cruise included. Compare and book.",
    url: "/houseboat-packages",
  },
};

const packages = [
  {
    name: "Standard Package",
    price: "₹15,000",
    perNote: "per room / per night + 18% GST",
    acNote: "AC in bedroom: 8:30 PM to 6:30 AM",
    highlights: [
      "Welcome Drinks — Lime Juice",
      "Lunch — Kerala Meals (Veg or Non-Veg)",
      "Evening Tea & Snacks",
      "Dinner — Chapati, dal, rice, curry",
      "Breakfast — choice of Idly/Puttu/Bread Toast",
      "Non-Veg: Pearl-spot fish fry + Chicken Curry",
    ],
    routes: "Kainakari Village, Kuppappuram Village, Vembanad Lake, Punnamada Lake, Pallathuruthi",
    badge: "Most Popular",
  },
  {
    name: "Premium Package",
    price: "₹19,000",
    perNote: "per room / per night + 18% GST",
    acNote: "AC in bedroom/hall: 5:30 PM to 7:30 AM",
    highlights: [
      "Welcome Drinks — Tender Coconut",
      "Lunch — Kerala Meals with 2 Non-Veg items",
      "Evening Tea & Snacks",
      "Dinner — with seafood + chicken",
      "Full Breakfast (all options served)",
      "Extended cruise routes (7 stops)",
    ],
    routes: "Kainakari, Kuppappuram, Vembanad Lake, Punnamada Lake, Meenappally Lake, Meenappally Village, Pallathuruthi",
    badge: "Upgrade",
  },
  {
    name: "Semi Luxury Package",
    price: "₹24,000",
    perNote: "per room / per night + 18% GST",
    acNote: "AC available all the time (bedroom or hall)",
    highlights: [
      "Welcome Drinks — Tender Coconut",
      "Lunch — Kerala Meals with 2 Non-Veg items",
      "Evening Tea & Snacks",
      "Dinner — premium seafood + chicken",
      "Full Breakfast (all options served)",
      "Extended cruise routes (7 stops)",
      "AC available all the time",
    ],
    routes: "Kainakari, Kuppappuram, Vembanad Lake, Punnamada Lake, Meenappally Lake, Meenappally Village, Pallathuruthi",
    badge: "Best Experience",
  },
];

export default function HouseboatPackagesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Houseboat Packages", item: "https://www.alleppeyhouseboat.online/houseboat-packages" },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-emerald-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Houseboat Packages</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alleppey Houseboat Packages
          </h1>
          <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
            Three packages to suit every budget. All include overnight stay, meals, backwater cruise, and onboard crew.
          </p>
        </div>
      </div>

      {/* Package Comparison */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow relative">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-4">
                {pkg.badge}
              </span>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-1">{pkg.name}</h2>
              <p className="text-3xl font-bold text-gray-900 mb-1">{pkg.price}</p>
              <p className="text-xs text-gray-500 mb-4">{pkg.perNote}</p>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm font-medium text-blue-700 mb-3">❄️ {pkg.acNote}</p>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Included:</h3>
                <ul className="space-y-1.5">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Cruise Route:</h3>
                <p className="text-xs text-gray-500">{pkg.routes}</p>
              </div>

              <Link href="/booking" className="block w-full text-center py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
                Book This Package
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Common Info */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">What All Packages Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Check-in at 12:00 PM, check-out at 9:00 AM",
              "Private houseboat — not shared with other groups",
              "Onboard crew: captain, chef, helper",
              "Cruise through village canals and lakes",
              "Free parking at the dock",
              "Children under 5 stay free",
              "18% GST applicable on all packages",
              "Extra bed available: ₹1,000/night",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 prose prose-gray max-w-none">
            <h3 className="font-display text-xl font-bold text-gray-900">Schedule for all packages</h3>
            <p>
              Regardless of which package you choose, the schedule is the same. You check in around 12:00 PM at our dock in Alleppey. After boarding, the cruise begins through the backwaters with a lunch break, then continues until evening anchoring at approximately 5:00 PM. The boat stays anchored overnight and you check out at 9:00 AM the next morning.
            </p>
            <h3 className="font-display text-xl font-bold text-gray-900">How to choose a package</h3>
            <p>
              The main differences between packages are food variety, AC duration, and cruise route length. The Standard package provides one non-veg dish per meal, AC only at night, and a 5-stop route. The Premium adds more non-veg options, extended evening AC, and a longer 7-stop route. The Semi Luxury gives full-time AC availability and premium food.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <ReviewsStrip />

      {/* CTA & Links */}
      <section className="py-16 px-4 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Book Now
          </Link>
          <Link href="/houseboat-prices" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            View All Prices
          </Link>
          <Link href="/alleppey-houseboats" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            View Houseboats
          </Link>
        </div>
      </section>
    </main>
  );
}

