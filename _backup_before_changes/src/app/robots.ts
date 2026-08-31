import type { MetadataRoute } from "next";

// ============================================================================
// ROBOTS.TXT FOR SEARCH ENGINES
// Controls what Google and other bots can crawl
// ============================================================================

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kalappurahouseboats.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/booking/success"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
