import type { Metadata } from "next";
import Link from "next/link";
import { ROOMS, SITE_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Alleppey Houseboats & Boat House | Private Booking in Alappuzha",
  description:
    "Explore and book private houseboats (boat house) in Alleppey (Alappuzha), Kerala. 1, 2 & 3 bedroom AC houseboats with all meals, backwater cruise, and onboard chef. Book direct for best prices.",
  keywords: [
    "Alleppey houseboat",
    "Alleppey houseboats",
    "Alleppey boat house",
    "Alleppey boat house booking",
    "houseboats in Alleppey",
    "Alappuzha houseboat",
    "private houseboat Alleppey",
    "Kerala houseboat",
    "Alleppey backwater cruise",
    "houseboat booking Alleppey",
  ],
  alternates: {
    canonical: "/alleppey-houseboats",
  },
  openGraph: {
    type: "website",
    title: "Alleppey Houseboats | Private Houseboats in Alappuzha",
    description:
      "1, 2 & 3 bedroom private houseboats in Alleppey. AC rooms, all meals, backwater cruise. Book direct for best prices.",
    url: "/alleppey-houseboats",
    images: [{ url: "/images/gallery/drone-1.jpg", width: 1200, height: 630, alt: "Private houseboat on Alleppey backwaters, Kerala" }],
  },
};

export default function AlleppeyHouseboatsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Alleppey Houseboats", item: "https://www.alleppeyhouseboat.online/alleppey-houseboats" },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Alleppey Houseboats</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Houseboats in Alleppey (Alappuzha)
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Private luxury houseboats on Kerala backwaters. Choose the right boat for your group and cruise through Vembanad Lake, Punnamada Lake, and village canals.
          </p>
        </div>
      </div>

      {/* Houseboats Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Houseboat Fleet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={`${room.name} - private houseboat in Alleppey with ${room.bedrooms} bedroom${room.bedrooms > 1 ? "s" : ""}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gold-700">
                  {room.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{room.beds}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>🛏️ {room.bedrooms} Bedroom{room.bedrooms > 1 ? "s" : ""} • {room.size}</p>
                  <p>👥 Up to {room.maxGuests} guests</p>
                  <p>❄️ Air Conditioned • All meals included</p>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(room.price)}</span>
                  <span className="text-sm text-gray-500">/room/night</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/rooms/${room.slug}`} className="flex-1 text-center py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 text-sm transition-colors">
                    Details
                  </Link>
                  <Link href={`/booking?room=${room.id}`} className="flex-1 text-center py-2.5 bg-amber-600 text-white font-semibold rounded-xl text-sm hover:bg-amber-700 transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-gray">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About Alleppey Houseboats</h2>
          <p>
            Alleppey (officially Alappuzha) is known as the &quot;Venice of the East&quot; and is the most popular destination for houseboat experiences in Kerala. The backwater network here includes Vembanad Lake — one of the largest lakes in India — along with narrow village canals, paddy fields, and coconut-lined waterways.
          </p>
          <p>
            Kalappura Houseboats operates private houseboats that cruise through these backwaters. Each houseboat comes with its own crew including a captain, chef, and helper. All our boats are traditional kettuvallam-style vessels with modern amenities like air conditioning, private bathrooms, and fully equipped kitchens.
          </p>
          <h3 className="font-display text-xl font-bold text-gray-900">What makes our houseboats different?</h3>
          <ul>
            <li>Private boats — never shared with other groups</li>
            <li>All meals included — authentic Kerala cuisine prepared fresh onboard</li>
            <li>AC bedrooms with private bathrooms</li>
            <li>Cruise routes through both lake and village canals</li>
            <li>Direct booking with best price guarantee</li>
            <li>Free cancellation up to 7 days before check-in</li>
          </ul>

          <h3 className="font-display text-xl font-bold text-gray-900">Choosing the right houseboat</h3>
          <p>
            We offer three boat sizes to match different group needs:
          </p>
          <ul>
            <li><strong>1 Bedroom Houseboat</strong> — ideal for couples and honeymooners (up to 3 guests)</li>
            <li><strong>2 Bedroom Houseboat</strong> — suited for small families and friend groups (up to 6 guests)</li>
            <li><strong>3 Bedroom Houseboat</strong> — perfect for large families and groups (up to 9 guests)</li>
          </ul>
          <p>
            All boats can be booked with Standard, Premium, or Semi Luxury packages depending on your preference for food variety and AC availability.
          </p>

          <h3 className="font-display text-xl font-bold text-gray-900">Alleppey Houseboat Booking Made Simple</h3>
          <p>
            Booking an Alleppey houseboat (also called a &quot;boat house&quot; in Kerala) with Kalappura is quick and direct. Pick your dates, choose a boat and package, and confirm online or over WhatsApp with just a 20% advance — the balance is paid at the property. Whether you search for an &quot;Alleppey houseboat booking&quot;, an &quot;Alappuzha boat house&quot;, or a &quot;Kerala houseboat&quot;, you reach the same private, traditional kettuvallam experience. <Link href="/booking">Start your houseboat booking here</Link> or compare rates on our <Link href="/houseboat-prices">houseboat prices page</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Ready to book your houseboat?</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Check availability, choose your dates, and book online with instant confirmation. Only 20% advance required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Book Online
          </Link>
          <Link href="/houseboat-prices" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            View Prices
          </Link>
          <a href="https://wa.me/919895053528?text=Hi! I'd like to book a houseboat in Alleppey." target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BA5A] transition-colors">
            WhatsApp Us
          </a>
        </div>
      </section>

      {/* Footer links */}
      <section className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/houseboat-packages" className="text-gray-500 hover:text-gold-600 transition-colors">Houseboat Packages</Link>
          <Link href="/houseboat-prices" className="text-gray-500 hover:text-gold-600 transition-colors">Houseboat Prices</Link>
          <Link href="/luxury-houseboats" className="text-gray-500 hover:text-gold-600 transition-colors">Luxury Houseboats</Link>
          <Link href="/overnight-houseboat" className="text-gray-500 hover:text-gold-600 transition-colors">Overnight Houseboat</Link>
          <Link href="/booking" className="text-gray-500 hover:text-gold-600 transition-colors">Book Now</Link>
        </div>
      </section>
    </main>
  );
}

