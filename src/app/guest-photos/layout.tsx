import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

// ============================================================================
// GUEST PHOTOS — SEO metadata + structured data
// The page itself is a client component (interactive gallery + upload), so
// metadata and JSON-LD live in this server layout wrapper.
// ============================================================================

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Alleppey Houseboat Pictures | Real Photo Gallery",
  description:
    "Browse real Alleppey houseboat pictures shared by guests — backwater views, sunsets, food, cabins and Kerala houseboat photos captured during genuine trips with Kalappura.",
  keywords: [
    "alleppey houseboat pictures",
    "Alleppey houseboat photos",
    "Kerala houseboat pictures",
    "Alleppey houseboat images",
    "Kerala backwater photos",
    "houseboat gallery Alleppey",
  ],
  alternates: { canonical: "/guest-photos" },
  openGraph: {
    title: "Guest Photo Gallery | Kalappura Houseboats",
    description:
      "Real photos from guests of their Alleppey houseboat experience on the Kerala backwaters.",
    url: "/guest-photos",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/gallery/drone-1.jpg`,
        width: 1200,
        height: 630,
        alt: "Guest photos of Kalappura houseboats on the Alleppey backwaters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guest Photo Gallery | Kalappura Houseboats",
    description: "Real guest photos from Alleppey houseboat stays with Kalappura.",
  },
};

export default function GuestPhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Alleppey Houseboat Pictures",
    description:
      "Real Alleppey houseboat pictures shared by guests of their Kerala houseboat stay with Kalappura Houseboats on the backwaters.",
    url: `${baseUrl}/guest-photos`,
    isPartOf: { "@type": "WebSite", name: "Kalappura Houseboats & Tours", url: baseUrl },
    about: {
      "@type": "LodgingBusiness",
      name: "Kalappura Houseboats & Tours",
      url: baseUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Guest Photos", item: `${baseUrl}/guest-photos` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
