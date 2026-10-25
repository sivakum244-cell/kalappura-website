import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Kalappura Houseboats" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Alleppey Houseboats", href: "/alleppey-houseboats" },
    { name: "Houseboat Prices", href: "/houseboat-prices" },
    { name: "Book Now", href: "/booking" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-sand-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-xl text-center">
        <p className="font-display text-6xl font-bold text-gold-500 mb-2">404</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          This page has drifted off course
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for isn&apos;t here. It may have moved, or the link may be
          out of date. Let&apos;s get you back on the water.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link href="/booking" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Book a Houseboat
          </Link>
          <Link href="/" className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors">
            Back to Home
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gold-600 hover:underline">
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
