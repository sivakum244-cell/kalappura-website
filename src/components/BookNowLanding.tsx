"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { captureUtmParams, getSourceLabel } from "@/lib/utm-tracking";
import { trackLead } from "@/components/ConversionPixels";

export default function BookNowLanding() {
  // Capture UTM parameters when an ad visitor lands here
  useEffect(() => {
    captureUtmParams();
  }, []);

  const handleWhatsApp = () => {
    trackLead("whatsapp");
  };

  const handlePhone = () => {
    trackLead("phone");
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Private luxury houseboat on Alleppey backwaters, Kerala"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white py-16">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="text-gold-400">★</span>
            <span className="text-sm font-medium">Rated 9.8/10 • #1 on Tripadvisor • Airbnb Superhost</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Book Your Private Alleppey Houseboat
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8">
            Private luxury houseboats with all meals, AC bedrooms, and a backwater cruise through Kerala&apos;s Vembanad Lake. Best price guarantee.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl shadow-2xl hover:scale-105 transition-transform text-lg"
            >
              Check Availability & Book
            </Link>
            <a
              href={`https://wa.me/919895053528?text=Hi! I'd like to book an Alleppey houseboat.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-semibold rounded-2xl hover:bg-[#20BA5A] transition-colors text-lg flex items-center justify-center gap-2"
            >
              <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-white/70">
            {["All Meals Included", "20% Advance Only", "Free Cancellation*", "Instant Confirmation"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book Direct — quick value props */}
      <section className="py-12 px-4 bg-emerald-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "💰", title: "Best Price Guarantee", desc: "Book direct and save up to ₹4,000/night vs OTAs" },
            { icon: "🍽️", title: "Everything Included", desc: "All meals, AC bedroom, backwater cruise, onboard crew" },
            { icon: "🛡️", title: "Risk-Free Booking", desc: "Only 20% advance, free cancellation 7 days prior" },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="font-display text-lg font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Boat options */}
      <section className="py-14 px-4 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          Choose Your Houseboat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "1 Bedroom", best: "Couples & Honeymoon", guests: "Up to 3 guests", price: "₹15,000", id: "suite-river-view" },
            { name: "2 Bedroom", best: "Small Families", guests: "Up to 6 guests", price: "₹15,000", id: "double-twin-room" },
            { name: "3 Bedroom", best: "Families & Groups", guests: "Up to 9 guests", price: "₹15,000", id: "standard-cabin" },
          ].map((boat) => (
            <div key={boat.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-display text-xl font-bold text-gray-900">{boat.name} Houseboat</h3>
              <p className="text-sm text-gold-600 font-medium mt-1">{boat.best}</p>
              <p className="text-xs text-gray-500 mt-1">{boat.guests}</p>
              <p className="text-2xl font-bold text-gray-900 mt-4">{boat.price}<span className="text-sm font-normal text-gray-500">/room/night</span></p>
              <Link
                href={`/booking?room=${boat.id}`}
                className="block w-full mt-4 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm"
              >
                Book This Boat
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Starting prices per room per night. 18% GST applicable. All meals & cruise included.
        </p>
      </section>

      {/* Social proof */}
      <section className="py-12 px-4 bg-sand-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-gold-500 text-2xl">★</span>
            ))}
          </div>
          <p className="text-lg text-gray-700 italic mb-3">
            &quot;The most peaceful experience of our trip. Beautiful boat, amazing food, and wonderful hosts. Highly recommend booking direct with Kalappura.&quot;
          </p>
          <p className="text-sm text-gray-500">— Verified guest review • {SITE_CONFIG.reviewCount}+ reviews • {SITE_CONFIG.rating}/10 rating</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-white to-emerald-50">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ready to Cruise the Kerala Backwaters?
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Check available dates and secure your private houseboat with just 20% advance. Instant confirmation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/booking" className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform text-lg">
            Book Now
          </Link>
          <a href={`tel:${SITE_CONFIG.phone}`} onClick={handlePhone} className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-gold-400 transition-colors text-lg">
            Call {SITE_CONFIG.phone}
          </a>
        </div>
      </section>
    </main>
  );
}
