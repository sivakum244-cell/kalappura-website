import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Kalappura Houseboats" },
  description:
    "Terms of Service for Kalappura Houseboats & Tours — booking, payment, cancellation, check-in/out policies and guest responsibilities.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const lastUpdated = "August 2026";

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Terms of Service</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Terms of Service</h1>
          <p className="text-sm text-gray-400 mt-3">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>
            These Terms of Service govern your booking and stay with Kalappura Houseboats & Tours
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By making a booking, you agree to these terms.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Booking & Payment</h2>
          <ul>
            <li>All prices are per room per night and include applicable meals and the backwater cruise.</li>
            <li>18% GST applies to all bookings.</li>
            <li>A 20% advance payment is required to confirm your booking; the balance is payable at the property on check-in.</li>
            <li>We accept credit/debit cards, UPI, net banking, and cash.</li>
            <li>Prices may vary by season and are confirmed at the time of booking.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Check-in & Check-out</h2>
          <ul>
            <li>Check-in is at 12:00 PM (noon).</li>
            <li>Check-out is at 9:00 AM the following morning.</li>
            <li>As per Kerala Tourism regulations, houseboats anchor by 5:00 PM and do not cruise at night.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Cancellation Policy</h2>
          <ul>
            <li>Free cancellation up to 7 days before check-in.</li>
            <li>Cancellations within 7 days of check-in are charged 50% of the booking amount.</li>
            <li>No-shows are charged the full booking amount.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Guests & Occupancy</h2>
          <ul>
            <li>Each room accommodates a maximum number of guests as specified for that boat type.</li>
            <li>Children under 5 stay free; children aged 6-11 are charged ₹1,000 per night.</li>
            <li>An extra bed is available at ₹1,000 per night.</li>
            <li>Life jackets are provided; guests are expected to follow the crew&apos;s safety instructions.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Guest Responsibilities</h2>
          <ul>
            <li>Guests are responsible for their personal belongings during the stay.</li>
            <li>Pets are not permitted on the houseboats.</li>
            <li>Any damage to the houseboat caused by guests may be charged accordingly.</li>
            <li>We reserve the right to refuse service in cases of unsafe or inappropriate behaviour.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Weather & Force Majeure</h2>
          <p>
            Houseboats are covered and operate in most weather conditions. During heavy monsoon or unforeseen
            circumstances beyond our control, cruising may be limited for safety. In such cases we will do our best
            to accommodate you, but we are not liable for disruptions caused by weather or events outside our control.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Contact</h2>
          <p>
            For any questions about these terms, contact us at{" "}
            <a href="mailto:info@kalappurahouseboats.com">info@kalappurahouseboats.com</a> or call{" "}
            <a href="tel:+919895053528">+91 98950 53528</a>.
          </p>
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/privacy" className="text-sm text-gold-600 hover:underline">Privacy Policy</Link>
          <span className="text-gray-300">•</span>
          <Link href="/contact" className="text-sm text-gold-600 hover:underline">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
