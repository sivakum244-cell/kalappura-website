import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Kalappura Houseboats",
  description:
    "Cancellation and refund policy for Kalappura Houseboats & Tours. Free cancellation up to 7 days before check-in, refund timelines, and how to request a cancellation for your Alleppey houseboat booking.",
  alternates: { canonical: "/cancellation-refund" },
  robots: { index: true, follow: true },
};

export default function CancellationRefundPage() {
  const lastUpdated = "October 2026";

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cancellation &amp; Refund</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Cancellation &amp; Refund Policy</h1>
          <p className="text-sm text-gray-400 mt-3">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>
            This Cancellation &amp; Refund Policy applies to houseboat bookings made with Kalappura Houseboats &amp; Tours
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By making a booking you agree to the terms below.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Cancellation Charges</h2>
          <ul>
            <li><strong>7 or more days before check-in:</strong> Free cancellation — full refund of any advance paid.</li>
            <li><strong>Within 7 days of check-in:</strong> 50% of the total booking amount is charged; the remaining amount is refunded.</li>
            <li><strong>No-show / same-day cancellation:</strong> The full booking amount is charged and is non-refundable.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">How to Cancel</h2>
          <p>
            To cancel or modify a booking, contact us as early as possible by phone or WhatsApp at{" "}
            <a href="tel:+919895053528">+91 98950 53528</a> or by email at{" "}
            <a href="mailto:info@kalappurahouseboats.com">info@kalappurahouseboats.com</a>, quoting your Booking ID.
            The cancellation charge is calculated based on the date we receive your cancellation request.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Refund Method &amp; Timeline</h2>
          <ul>
            <li>Eligible refunds are processed to the original payment method used at booking.</li>
            <li>Refunds are initiated within 5–7 business days of the confirmed cancellation.</li>
            <li>Depending on your bank or card issuer, it may take an additional 5–10 business days for the amount to reflect in your account.</li>
            <li>Applicable payment-gateway charges or taxes, where non-refundable, may be deducted from the refund.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Weather &amp; Force Majeure</h2>
          <p>
            Houseboats are covered and operate in most weather conditions. If a cruise cannot operate due to severe
            weather, government restrictions, or other circumstances beyond our control, we will offer a rescheduling
            of your stay to a mutually convenient date wherever possible. Refunds in such cases are handled on a
            case-by-case basis.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Advance Payment</h2>
          <p>
            A 20% advance confirms your booking, with the balance payable at the property on check-in. The advance is
            fully refundable under the free-cancellation window above.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Contact</h2>
          <p>
            For any questions about cancellations or refunds, contact us at{" "}
            <a href="mailto:info@kalappurahouseboats.com">info@kalappurahouseboats.com</a> or call{" "}
            <a href="tel:+919895053528">+91 98950 53528</a>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/terms" className="text-sm text-gold-600 hover:underline">Terms of Service</Link>
          <span className="text-gray-300">•</span>
          <Link href="/privacy" className="text-sm text-gold-600 hover:underline">Privacy Policy</Link>
          <span className="text-gray-300">•</span>
          <Link href="/shipping" className="text-sm text-gold-600 hover:underline">Shipping &amp; Delivery</Link>
          <span className="text-gray-300">•</span>
          <Link href="/contact" className="text-sm text-gold-600 hover:underline">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
