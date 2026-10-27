import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Alleppey Houseboat Booking | Private AC Boats ₹15,000+" },
  description:
    "Book a private AC houseboat in Alleppey direct. 1-3 bedroom boats, all meals and cruise included. 20% advance, rest on arrival. Chat on WhatsApp.",
  keywords: [
    "Alleppey houseboat",
    "Alleppey houseboat booking",
    "Alleppey boat house",
    "Alleppey boat house booking",
    "Alappuzha houseboat booking",
    "houseboat booking Alleppey",
    "Kerala houseboat booking",
    "private houseboat Alleppey",
    "best houseboat in Alleppey",
    "houseboat in Alleppey",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Alleppey Houseboat Booking | Private AC Boats ₹15,000+",
    description:
      "Book a private AC houseboat in Alleppey direct. 1-3 bedroom boats, all meals and cruise included. 20% advance, rest on arrival.",
    url: "/",
    images: [
      {
        url: "/images/gallery/drone-1.jpg",
        width: 1200,
        height: 630,
        alt: "Kalappura luxury houseboat on Alleppey backwaters, Kerala",
      },
    ],
  },
};

export default function Home() {
  // FAQ structured data for search engine rich results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Speakable schema for voice assistants (Google Assistant, Alexa)
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kalappura Houseboats — Private Houseboats in Alleppey, Kerala",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".section-title", ".section-subtitle", "h1", "h2"],
    },
    mainEntity: {
      "@type": "TouristAttraction",
      name: "Kalappura Houseboats & Tours",
      description: "Private luxury houseboat stays on the backwaters of Alleppey (Alappuzha), Kerala. Traditional kettuvallam houseboats with AC, all meals, and backwater cruise through Vembanad Lake.",
      touristType: ["Couples", "Families", "Honeymooners", "Groups", "Nature Lovers"],
      availableLanguage: ["English", "Hindi", "Malayalam", "French", "German", "Chinese"],
      isAccessibleForFree: false,
      publicAccess: true,
    },
  };

  // Offer schema for the Standard package starting price (₹15,000/room/night +
  // 18% GST). Uses only the confirmed advertised Standard rate.
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Standard Package — Private Alleppey Houseboat (per room, per night)",
    description:
      "Private AC houseboat in Alleppey with all meals (lunch, evening tea, dinner, breakfast) and an overnight backwater cruise. Standard rate per room per night; 18% GST additional.",
    price: "15000",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: "https://www.alleppeyhouseboat.online/booking",
    seller: {
      "@type": "LodgingBusiness",
      name: "Kalappura Houseboats & Tours",
      url: "https://www.alleppeyhouseboat.online",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />
      <HomeContent />
    </>
  );
}
