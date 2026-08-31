import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Kalappura Houseboats",
  description:
    "Privacy Policy for Kalappura Houseboats & Tours. Learn how we collect, use, and protect your personal information when you book a houseboat with us.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const lastUpdated = "August 2026";

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mt-3">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>
            Kalappura Houseboats & Tours (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy.
            This policy explains what information we collect when you use our website or book a houseboat, and how we use it.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Information We Collect</h2>
          <p>When you make a booking or enquiry, we collect information you provide directly, such as:</p>
          <ul>
            <li>Your name, mobile number, and email address</li>
            <li>Country of residence</li>
            <li>Booking details (dates, number of guests, room preference, food preferences, special requests)</li>
            <li>Payment preference (we do not store full card details — payments are processed securely by our payment gateway)</li>
          </ul>
          <p>We also collect standard technical data such as your IP address and browsing activity through analytics tools to improve our website.</p>

          <h2 className="font-display text-xl font-bold text-gray-900">How We Use Your Information</h2>
          <ul>
            <li>To process and confirm your booking</li>
            <li>To contact you about your reservation (by phone, WhatsApp, or email)</li>
            <li>To provide customer support and respond to enquiries</li>
            <li>To improve our website and services</li>
            <li>To send booking confirmations, receipts, and (if you opt in) special offers</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-gray-900">How We Protect Your Data</h2>
          <p>
            We use secure, encrypted connections (HTTPS) across our website. Payment transactions are handled by a
            trusted third-party payment gateway and we do not store your complete card information on our servers.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We only share it with service providers necessary to fulfil your
            booking (such as our payment gateway and email provider), and where required by law.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Cookies & Analytics</h2>
          <p>
            Our website uses cookies and analytics tools (such as Google Analytics) to understand how visitors use the site.
            You can disable cookies in your browser settings, though some features may not work as intended.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at any time by contacting us.
          </p>

          <h2 className="font-display text-xl font-bold text-gray-900">Contact Us</h2>
          <p>
            For any privacy-related questions, contact us at{" "}
            <a href="mailto:info@kalappurahouseboats.com">info@kalappurahouseboats.com</a> or call{" "}
            <a href="tel:+919895053528">+91 98950 53528</a>.
          </p>
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/terms" className="text-sm text-gold-600 hover:underline">Terms of Service</Link>
          <span className="text-gray-300">•</span>
          <Link href="/contact" className="text-sm text-gold-600 hover:underline">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
