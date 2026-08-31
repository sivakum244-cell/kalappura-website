import type { MetadataRoute } from "next";

// ============================================================================
// SITEMAP FOR GOOGLE SEARCH CONSOLE
// Automatically generated for all pages
// Submit at: https://search.google.com/search-console > Sitemaps
// URL: https://yoursite.com/sitemap.xml
// ============================================================================

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kalappurahouseboats.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rooms/standard-cabin-on-boat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rooms/double-twin-room-lake-view`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rooms/suite-with-river-view`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
