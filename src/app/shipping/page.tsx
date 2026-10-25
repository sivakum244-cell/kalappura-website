import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Shipping & Delivery Policy | Kalappura Houseboats" },
  description:
    "Shipping & Delivery policy for Kalappura Houseboats — a houseboat booking service, so no physical products ship. Confirmations arrive by email, SMS or WhatsApp.",
  alternates: { canonical: "/shipping" },
  robots: { index: true, follow: true },
};

export default function ShippingPage() {
  const lastUpdated = "October 2026";

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Shipping &amp; Delivery</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Shipping &amp; Delivery Policy</h1>
          <p className="text-sm text-gray-400 mt-3">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>
            Kalappura Houseboats &amp; Tours (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides houseboat
            stays and backwater cruise experiences in Alleppey (Alappuzha), Kerala. We are a <strong>service
            provider</strong> — we do not sell or ship any physical products. This policy explains how your booking
            and confirmation are delivered.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">No Physical Shipping</h2>
          <p>
            As our offering is a houseboat booking and stay (a service), there is no physical shipment, courier, or
            delivery of goods involved. No shipping charges apply to any booking.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Delivery of Your Booking Confirmation</h2>
          <ul>
            <li>On successful booking, a confirmation with your Booking ID and stay details is delivered <strong>instantly / within a few minutes</strong>.</li>
            <li>Confirmations are sent electronically via email, SMS, and/or WhatsApp to the contact details you provide at booking.</li>
            <li>Please ensure your email address and mobile number are entered correctly so the confirmation reaches you.</li>
            <li>If you do not receive your confirmation within a reasonable time, contact us and we will resend it.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Service Delivery (Your Stay)</h2>
          <ul>
            <li>Your houseboat experience is &quot;delivered&quot; on your chosen check-in date.</li>
            <li>Check-in is at 12:00 PM (noon) and check-out is at 9:00 AM the following morning at the designated boarding jetty, which we confirm with you before arrival.</li>
            <li>All meals, the backwater cruise, and the onboard crew are provided as part of the booked package.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">Payment</h2>
          <p>
            A 20% advance confirms your booking; the balance is payable at the property on check-in. For details on
            cancellations and refunds, please see our{" "}
            <Link href="/cancellation-refund">Cancellation &amp; Refund Policy</Link>.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Contact</h2>
          <p>
            For any questions about your booking or confirmation, contact us at{" "}
            <a href="mailto:info@kalappurahouseboats.com">info@kalappurahouseboats.com</a> or call{" "}
            <a href="tel:+919895053528">+91 98950 53528</a>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/terms" className="text-sm text-gold-600 hover:underline">Terms of Service</Link>
          <span className="text-gray-300">•</span>
          <Link href="/privacy" className="text-sm text-gold-600 hover:underline">Privacy Policy</Link>
          <span className="text-gray-300">•</span>
          <Link href="/cancellation-refund" className="text-sm text-gold-600 hover:underline">Cancellation &amp; Refund</Link>
          <span className="text-gray-300">•</span>
          <Link href="/contact" className="text-sm text-gold-600 hover:underline">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
