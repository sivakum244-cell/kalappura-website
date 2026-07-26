"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "KHB-XXXXXXXX-XXXX";

  return (
    <main className="min-h-screen bg-gradient-luxury flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-luxury p-8 md:p-10 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
        >
          <svg
            className="w-10 h-10 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-3xl font-bold text-gray-900 mb-2"
        >
          Booking Submitted!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Thank you for choosing Kalappura Houseboats & Tours.
          Our team will contact you shortly to confirm your reservation.
        </motion.p>

        {/* Booking ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6"
        >
          <p className="text-xs text-emerald-600 uppercase tracking-wider font-medium mb-1">
            Your Booking ID
          </p>
          <p className="text-2xl md:text-3xl font-bold text-emerald-700 tracking-wide">
            {bookingId}
          </p>
          <p className="text-xs text-emerald-500 mt-2">
            Save this ID for your reference
          </p>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 text-left"
        >
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            What happens next?
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📧</span>
              <span>Confirmation email sent to your inbox</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📞</span>
              <span>Our team will call/WhatsApp within 2 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">✅</span>
              <span>Booking status: <strong>Pending</strong> (will be confirmed shortly)</span>
            </li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/"
            className="flex-1 py-3 px-6 border-2 border-gray-200 text-gray-700 font-medium rounded-xl text-center hover:border-gold-400 hover:text-gold-600 transition-colors"
          >
            Back to Home
          </Link>
          <a
            href={`https://wa.me/919895053528?text=Hi! I just submitted a booking (${bookingId}). Please confirm.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-6 bg-[#25D366] text-white font-semibold rounded-xl text-center hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Confirm on WhatsApp
          </a>
        </motion.div>

        {/* Contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xs text-gray-400 mt-6"
        >
          Need help? Call us at{" "}
          <a href="tel:+919895053528" className="text-gold-600 hover:underline">
            +91 98950 53528
          </a>
        </motion.p>
      </motion.div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
