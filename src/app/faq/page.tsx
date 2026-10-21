import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Alleppey Houseboat FAQ | Common Questions Answered" },
  description:
    "Answers to common questions about Alleppey houseboats — pricing, meals, check-in times, AC, cancellation, family stays, honeymoon options, and more. Everything you need before booking.",
  keywords: [
    "Alleppey houseboat FAQ",
    "houseboat questions",
    "Alleppey houseboat check-in time",
    "houseboat meals included",
    "Alleppey houseboat cancellation",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    title: "Alleppey Houseboat FAQ | Kalappura Houseboats",
    description: "Common questions about Alleppey houseboats answered — pricing, meals, timing, cancellation, and more.",
    url: "/faq",
  },
};

// Additional long-tail FAQs (facts consistent with the rest of the site)
const extendedFaqs = [
  {
    category: "Booking & Pricing",
    items: [
      { q: "How much does an Alleppey houseboat cost per night?", a: "Our houseboats start at ₹15,000 per room per night for the Standard package, ₹19,000 for Premium, and ₹24,000 for Semi Luxury. All prices include meals, AC, and the backwater cruise. 18% GST is additional." },
      { q: "Is the price per person or per room?", a: "All prices are per room per night, not per person. Each room accommodates 2 adults plus 1 child or extra bed." },
      { q: "How much advance payment is needed?", a: "Only 20% advance is required to confirm your booking. The remaining balance is paid at the property on check-in day." },
      { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and cash. International cards are also accepted." },
    ],
  },
  {
    category: "Your Stay",
    items: [
      { q: "What time is check-in and check-out?", a: "Check-in is at 12:00 PM (noon) and check-out is at 9:00 AM the next morning, giving you a full overnight experience on the backwaters." },
      { q: "Are all meals included?", a: "Yes. Every booking includes lunch, evening tea with snacks, dinner, and breakfast — all prepared fresh onboard by our chef. Vegetarian and non-vegetarian options are available." },
      { q: "Is the houseboat air-conditioned?", a: "Yes, all bedrooms have AC. The duration depends on your package: Standard (8:30 PM–6:30 AM), Premium (5:30 PM–7:30 AM), Semi Luxury (all the time)." },
      { q: "Is the houseboat private or shared?", a: "All our houseboats are completely private. You get the entire boat for your group — never shared with strangers." },
      { q: "Does the boat cruise at night?", a: "No. As per Kerala Tourism regulations, houseboats anchor by 5:00 PM and do not cruise at night. You enjoy the evening at a scenic anchor point." },
    ],
  },
  {
    category: "Who It's For",
    items: [
      { q: "Is an Alleppey houseboat good for a honeymoon?", a: "Yes, our 1 Bedroom Houseboat is ideal for honeymooners — complete privacy, river views, and romantic settings. You can request flower decoration and candlelight dinner during booking." },
      { q: "Are houseboats safe for children and families?", a: "Absolutely. We are family-friendly and welcome children of all ages. Life jackets are available for all sizes. Children under 5 stay free; ages 6-11 are ₹1,000/night." },
      { q: "Can large groups book a houseboat?", a: "Yes. Our 3 Bedroom Houseboat accommodates up to 9 guests. For larger groups, we can arrange multiple boats cruising together on the same route." },
    ],
  },
  {
    category: "Practical Info",
    items: [
      { q: "What is the cancellation policy?", a: "Free cancellation up to 7 days before check-in. Cancellations within 7 days are charged 50% of the booking amount. No-shows are charged the full amount." },
      { q: "What happens if it rains?", a: "Houseboats are fully covered and weatherproof. Cruising continues in light rain. During heavy monsoon, cruising may be limited but your stay remains comfortable." },
      { q: "Is there WiFi and mobile signal?", a: "Yes, WiFi is available on the boat and mobile signal works throughout most of the cruise route. Signal may be weaker in deeper canal areas." },
      { q: "Is parking available?", a: "Yes, free private parking is available at our dock in Alleppey for the duration of your stay." },
      { q: "Are pets allowed?", a: "Unfortunately, pets are not allowed on our houseboats for safety and comfort reasons." },
    ],
  },
];

export default function FaqPage() {
  // Combine all FAQs for schema
  const allFaqs = [
    ...FAQS,
    ...extendedFaqs.flatMap((cat) => cat.items.map((i) => ({ question: i.q, answer: i.a }))),
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.alleppeyhouseboat.online/faq" },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">FAQ</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about booking and staying on an Alleppey houseboat with Kalappura.
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        {extendedFaqs.map((cat) => (
          <div key={cat.category}>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">{cat.category}</h2>
            <div className="space-y-4">
              {cat.items.map((item) => (
                <div key={item.q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-sand-50 py-12 px-4 text-center">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Still have questions?</h2>
        <p className="text-gray-600 text-sm mb-5">Chat with us directly on WhatsApp for instant answers.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://wa.me/919895053528?text=Hi! I have a question about houseboat booking." target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BA5A] transition-colors text-sm">
            Ask on WhatsApp
          </a>
          <Link href="/booking" className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
            Book Now
          </Link>
          <Link href="/how-to-reach" className="px-6 py-2.5 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 text-sm transition-colors">
            How to Reach
          </Link>
        </div>
      </section>
    </main>
  );
}

