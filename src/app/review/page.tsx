import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Leave a Review | Kalappura Houseboats, Alleppey",
  description:
    "Enjoyed your stay with Kalappura Houseboats in Alleppey? Share your experience with a quick Google review — it takes less than a minute and means the world to our small team.",
  alternates: { canonical: "/review" },
  openGraph: {
    type: "website",
    title: "Leave a Review | Kalappura Houseboats",
    description: "Share your Alleppey houseboat experience with a quick Google review.",
    url: "/review",
  },
  // This is a guest-action page, not an SEO landing page — keep it out of the index
  // so it doesn't compete with content pages, but let guests reach it via direct link/QR.
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  const googleUrl = SITE_CONFIG.googleReviewUrl;
  const tripAdvisorUrl = SITE_CONFIG.tripAdvisorUrl;

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-sand-50 to-white">
      <section className="max-w-xl mx-auto px-4 py-16 md:py-24 text-center">
        {/* Heading */}
        <div className="mb-8">
          <div className="flex justify-center gap-1 mb-5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} className="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How was your stay with us?
          </h1>
          <p className="text-gray-600 leading-relaxed">
            We&apos;re a small, family-run team on the Alleppey backwaters, and your words genuinely
            help us. If you enjoyed your houseboat experience, we&apos;d be so grateful if you shared
            it with a quick review. It takes less than a minute.
          </p>
        </div>

        {/* Primary CTA — Google */}
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-gold-400 transition-all mb-4"
        >
          {/* Google "G" mark */}
          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          <span className="font-semibold text-gray-900">Review us on Google</span>
        </a>

        {/* Secondary CTA — TripAdvisor */}
        <a
          href={tripAdvisorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-3.5 px-6 bg-white border border-gray-200 rounded-2xl hover:border-gold-400 transition-all mb-10 text-sm"
        >
          <span className="font-medium text-gray-700">Or review us on TripAdvisor</span>
        </a>

        {/* Reassurance */}
        <p className="text-xs text-gray-400 mb-10">
          You&apos;ll be taken to Google (or TripAdvisor) to post your review. Thank you for taking the time.
        </p>

        {/* Soft fallback for anything less than perfect */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 text-left">
          <h2 className="font-semibold text-gray-900 mb-1 text-sm">Something wasn&apos;t right?</h2>
          <p className="text-sm text-gray-600">
            If any part of your stay fell short, we&apos;d like the chance to make it right. Please{" "}
            <Link href="/contact" className="text-gold-600 hover:underline">contact us directly</Link>{" "}
            and we&apos;ll do our best to help.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Link href="/" className="text-sm text-gray-500 hover:text-gold-600 transition-colors">
            ← Back to Kalappura Houseboats
          </Link>
        </div>
      </section>
    </main>
  );
}
