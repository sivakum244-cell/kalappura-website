"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function HomeSEOContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-sand-50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center mb-8">
            Houseboat Holidays in Alleppey, Kerala
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            {/* Answer block — concise, factual summary for search engines & AI
                assistants to read and cite. Plain HTML text, not hidden. */}
            <p className="text-gray-800 font-medium">
              Kalappura runs private 1-, 2- and 3-bedroom air-conditioned houseboats
              from Alleppey. You board around noon, cruise Vembanad Lake and the
              Kainakari canals, anchor at 5 PM and check out at 9 AM. Standard rates
              start at ₹15,000 per room per night plus 18% GST, with lunch, evening
              tea, dinner and breakfast included. Air conditioning runs from 8:30 PM
              to 6:30 AM. Pay a 20% advance; the balance is due on arrival.
            </p>
            <p>
              Kalappura Houseboats offers a private, luxury houseboat experience on
              the backwaters of Alleppey (Alappuzha), Kerala. Our fleet of traditional
              kettuvallam houseboats are available with 1, 2, or 3 bedrooms — all
              with air conditioning, private bathrooms, and an onboard kitchen
              serving authentic Kerala cuisine. Cruise the backwaters of Vembanad
              Lake, the coconut-lined canals of Kuttanad, and the quiet lagoons that
              make Alleppey the most popular backwater destination in India.
            </p>
            <p>
              Whether you are planning a{" "}
              <Link href="/luxury-houseboats" className="text-gold-600 hover:text-gold-700 underline-offset-2 hover:underline">
                honeymoon houseboat cruise
              </Link>
              , a family vacation, or a group trip through the Kerala backwaters,
              our houseboats are designed for every occasion. Each booking includes
              an{" "}
              <Link href="/overnight-houseboat" className="text-gold-600 hover:text-gold-700 underline-offset-2 hover:underline">
                overnight stay
              </Link>{" "}
              with a cruise through Vembanad Lake, Punnamada Lake, and the village
              canals of Kainakari and Kuppappuram — surrounded by paddy fields,
              coconut groves, and the birdlife of the Kuttanad wetlands.
            </p>
            <p>
              We offer three{" "}
              <Link href="/houseboat-packages" className="text-gold-600 hover:text-gold-700 underline-offset-2 hover:underline">
                package options
              </Link>
              {" "}— Standard, Premium, and Semi Luxury — starting from ₹15,000
              per room per night. All packages include welcome drinks, lunch,
              evening tea with snacks, dinner, and breakfast the next morning.
              Enjoy fresh pearl-spot fish fry, traditional Kerala sadya, and
              seafood prepared with local spices from the backwater villages.
              Check our{" "}
              <Link href="/houseboat-prices" className="text-gold-600 hover:text-gold-700 underline-offset-2 hover:underline">
                houseboat rates
              </Link>
              {" "}for current pricing.
            </p>
          </div>

          {/* Helpful, search-intent content — day cruise vs overnight, price, inclusions */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                Day Cruise or Overnight Stay?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A day cruise is ideal if you have limited time and want a few hours
                on the water. For the full backwater experience — sunset on the deck,
                dinner under the stars and a quiet morning on the lake — we recommend an{" "}
                <Link href="/overnight-houseboat" className="text-gold-600 hover:text-gold-700 underline-offset-2 hover:underline">
                  overnight houseboat stay in Alleppey
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                What Does It Cost?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Alleppey houseboat prices depend on the boat size, season and meal
                plan. Our private boats start from ₹15,000 per room per night with
                all meals included. See the full{" "}
                <Link href="/houseboat-prices" className="text-gold-600 hover:text-gold-700 underline-offset-2 hover:underline">
                  Alleppey houseboat price list
                </Link>{" "}
                for 1, 2 and 3 bedroom boats.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                What Is Included?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every booking includes air-conditioned bedrooms, a private
                bathroom, a backwater cruise and freshly cooked Kerala meals —
                breakfast, lunch, evening tea and dinner. Compare our{" "}
                <Link href="/houseboat-packages" className="text-gold-600 hover:text-gold-700 underline-offset-2 hover:underline">
                  houseboat packages
                </Link>{" "}
                to choose the right one.
              </p>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {[
              { label: "Alleppey Houseboats", href: "/alleppey-houseboats" },
              { label: "Houseboat Packages", href: "/houseboat-packages" },
              { label: "Houseboat Prices", href: "/houseboat-prices" },
              { label: "Book a Houseboat", href: "/booking" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-gold-300 hover:shadow-card transition-all duration-300 text-sm font-medium text-gray-700 hover:text-gold-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
