import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Alleppey Houseboat Booking | Kalappura Houseboats",
  description:
    "Book your Alleppey houseboat with Kalappura. Private 1, 2 & 3 bedroom AC boats on the Kerala backwaters with traditional cuisine, cruise & all meals. From ₹15,000/night.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kalappura Houseboats | Private Luxury Houseboats in Alleppey",
    description:
      "Experience Kerala backwaters aboard private luxury houseboats. 1, 2 & 3 bedroom boats with AC, all meals, and cruise through Alleppey canals. Book direct for best rates.",
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
      <HomeContent />
    </>
  );
}
