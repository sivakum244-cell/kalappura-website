import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

// ============================================================================
// SITEMAP FOR GOOGLE SEARCH CONSOLE
// Automatically generated for all public indexable pages
// Submit at: https://search.google.com/search-console > Sitemaps
// URL: https://www.alleppeyhouseboat.online/sitemap.xml
// ============================================================================

// Regenerate hourly so newly published blog posts appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.alleppeyhouseboat.online";

  // Pull every published blog post so each article is submitted to Google.
  // Wrapped in try/catch: if the DB is unreachable at build time, the static
  // routes below are still returned and the build never breaks.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });
    // Blog posts are kept at LOW priority so Google focuses its limited crawl
    // budget on the commercial "money" pages (home, booking, prices, rooms,
    // cruises, pillar) rather than spreading it thin across ~150 articles.
    // This directly addresses the "Discovered – currently not indexed" issue.
    blogEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }));
  } catch {
    blogEntries = [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Booking page - high commercial intent
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Book-now marketing landing (ad traffic) & guest photos (social proof)
    {
      url: `${baseUrl}/book-now`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guest-photos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Individual houseboat pages
    {
      url: `${baseUrl}/rooms/standard-cabin-on-boat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rooms/double-twin-room-lake-view`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rooms/suite-with-river-view`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // SEO Landing Pages
    {
      url: `${baseUrl}/alleppey-houseboats`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/alleppey-backwaters`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/budget-houseboat-alleppey`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/houseboat-packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/houseboat-prices`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/houseboat-cost-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/luxury-houseboats`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/overnight-houseboat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/day-cruise-houseboat-alleppey`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/honeymoon-houseboat-alleppey`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Long-tail SEO pages
    {
      url: `${baseUrl}/how-to-reach`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/alleppey-vs-kumarakom`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vembanad-lake-houseboat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kuttanad-houseboat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kainakari-houseboat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Trust / info pages
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cancellation-refund`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...blogEntries];
}

