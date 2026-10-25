"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-segment error boundary. Catches render/runtime errors (e.g. a failed DB
// call on a page) and shows a friendly recovery screen instead of a crash.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for monitoring (Vercel captures console output).
    console.error("[app error boundary]", error);
  }, [error]);

  return (
    <main id="main-content" className="min-h-screen bg-sand-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Something went wrong on our end
        </h1>
        <p className="text-gray-600 mb-8">
          We hit an unexpected problem loading this page. Please try again — or reach us directly
          and we&apos;ll help right away.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
          <Link href="/" className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            Back to Home
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          Need help now? Call{" "}
          <a href="tel:+919895053528" className="text-gold-600 hover:underline">+91 98950 53528</a>{" "}
          or{" "}
          <a href="https://wa.me/919895053528" className="text-emerald-600 hover:underline">WhatsApp us</a>.
        </p>
      </div>
    </main>
  );
}
