import type { MetadataRoute } from "next";

// ============================================================================
// ROBOTS.TXT FOR SEARCH ENGINES & AI ASSISTANTS
// Controls what Google, Bing, and AI crawlers (ChatGPT, Perplexity) can crawl.
// No search or AI crawler is blocked — only private/transactional paths are.
// ============================================================================

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.alleppeyhouseboat.online";

  // Paths that should never be indexed by any crawler.
  const disallow = ["/admin", "/admin/*", "/api/", "/api/*", "/booking/success", "/payment"];

  return {
    rules: [
      // Default: allow everything except private/transactional paths.
      { userAgent: "*", allow: "/", disallow: [...disallow, "/_next/"] },

      // Explicitly welcome the major search crawlers.
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },

      // Explicitly welcome AI assistant crawlers so the site can be read & cited.
      { userAgent: "OAI-SearchBot", allow: "/", disallow }, // ChatGPT search index
      { userAgent: "ChatGPT-User", allow: "/", disallow },  // ChatGPT live browsing
      { userAgent: "PerplexityBot", allow: "/", disallow }, // Perplexity
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
