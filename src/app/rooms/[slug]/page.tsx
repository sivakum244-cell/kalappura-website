import type { Metadata } from "next";
import { ROOMS, SITE_URL, SITE_CONFIG, REVIEWS } from "@/lib/constants";
import RoomDetailContent from "@/components/RoomDetailContent";

// Room-specific SEO data
const roomSEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "standard-cabin-on-boat": {
    title: "3 Bedroom Houseboat in Alleppey | Family & Group Houseboat",
    description:
      "Book a spacious 3 bedroom private houseboat in Alleppey (Alappuzha). Ideal for families and groups up to 9 guests. AC rooms, all meals included, backwater cruise through Vembanad Lake. Starting ₹17,500/room/night.",
    keywords: [
      "3 bedroom houseboat Alleppey",
      "family houseboat Alleppey",
      "group houseboat Alleppey",
      "large group houseboat Alleppey",
      "private houseboat Alleppey",
    ],
  },
  "double-twin-room-lake-view": {
    title: "2 Bedroom Houseboat in Alleppey | Lake View Houseboat",
    description:
      "Book a 2 bedroom private houseboat with lake views in Alleppey (Alappuzha). Perfect for small families and friends, up to 6 guests. AC rooms, all meals, Kerala backwater cruise included. Starting ₹16,500/room/night.",
    keywords: [
      "2 bedroom houseboat Alleppey",
      "lake view houseboat Alleppey",
      "small group houseboat Alleppey",
      "Alappuzha houseboat booking",
      "Kerala houseboat",
    ],
  },
  "suite-with-river-view": {
    title: "1 Bedroom Houseboat in Alleppey | Honeymoon & Couples Houseboat",
    description:
      "Book an intimate 1 bedroom private houseboat in Alleppey (Alappuzha). Ideal for couples and honeymooners. Complete privacy, river views, AC room, all meals, and backwater cruise. Starting ₹17,500/night.",
    keywords: [
      "1 bedroom houseboat Alleppey",
      "honeymoon houseboat Alleppey",
      "Alleppey houseboat for couples",
      "private houseboat Alleppey",
      "luxury houseboat Alleppey",
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seo = roomSEO[slug];
  const room = ROOMS.find((r) => r.slug === slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

  if (!seo || !room) {
    return {
      title: "Houseboat Not Found",
      robots: { index: false, follow: false },
    };
  }

  const ogDescription = trimForSocial(seo.description);

  return {
    // `absolute` keeps the room title within length by dropping the layout's
    // "| Kalappura Houseboats" suffix (the titles are self-describing).
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/rooms/${slug}`,
    },
    openGraph: {
      title: seo.title,
      // OG/social descriptions are trimmed to <=200 chars (social preview limit);
      // the full detail stays in the meta description above.
      description: ogDescription,
      url: `/rooms/${slug}`,
      type: "website",
      images: [
        {
          url: `${baseUrl}${room.images[0]}`,
          width: 1200,
          height: 630,
          alt: `${room.name} - Kalappura Houseboats, Alleppey`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: ogDescription,
      images: [`${baseUrl}${room.images[0]}`],
    },
  };
}

// Trim a description to <=200 chars on a word boundary for social (OG/Twitter) cards.
function trimForSocial(text: string, max = 200): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trimEnd() + "…";
}

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  const seo = roomSEO[slug];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

  // Product + Offer schema uses ONLY genuine prices from the codebase.
  // Breadcrumbs reflect the real navigation path Home → Houseboats → this room.
  const jsonLd = room
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            name: room.name,
            description: seo?.description || room.description,
            image: room.images.slice(0, 3).map((img) => `${baseUrl}${img}`),
            brand: { "@type": "Brand", name: "Kalappura Houseboats & Tours" },
            offers: {
              "@type": "Offer",
              url: `${baseUrl}/rooms/${slug}`,
              priceCurrency: "INR",
              price: room.price,
              availability: "https://schema.org/InStock",
              priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
            },
            // Real aggregate rating from SITE_CONFIG (10-point scale).
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: SITE_CONFIG.rating,
              bestRating: 10,
              worstRating: 1,
              reviewCount: SITE_CONFIG.reviewCount,
            },
            // A sample of genuine guest reviews from REVIEWS.
            review: REVIEWS.slice(0, 3).map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.name },
              datePublished: r.date,
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: 10,
                worstRating: 1,
              },
              name: r.title,
              reviewBody: r.text,
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
              { "@type": "ListItem", position: 2, name: "Alleppey Houseboats", item: `${baseUrl}/alleppey-houseboats` },
              { "@type": "ListItem", position: 3, name: room.name, item: `${baseUrl}/rooms/${slug}` },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <RoomDetailContent />
    </>
  );
}
