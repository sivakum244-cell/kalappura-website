import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure consistent URL format (no trailing slash)
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    // ESLint is still skipped at build time to avoid style-rule warnings failing
    // the deploy. Run `npm run lint` locally to catch issues.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors now fail the build (the codebase is at zero tsc errors). This
    // turns the build into a real safety net so a broken commit fails loudly
    // instead of silently shipping.
    ignoreBuildErrors: false,
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        // Block admin routes from being embedded
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
      {
        // Prevent API responses from being cached by browsers
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        // Long-lived, immutable caching for static images in /public/images.
        // These files are content-addressed by path and rarely change, so a
        // 1-year max-age with immutable is safe and fixes the "Use Efficient
        // Cache Lifetimes" audit finding.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Fonts, favicon and other immutable static assets.
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Keyword-friendly URL aliases → existing canonical pages (301, permanent).
  // These avoid duplicate content while capturing high-intent search slugs.
  async redirects() {
    return [
      { source: "/alleppey-houseboat-price", destination: "/houseboat-prices", permanent: true },
      { source: "/alleppey-houseboat-prices", destination: "/houseboat-prices", permanent: true },
      { source: "/alleppey-houseboat-packages", destination: "/houseboat-packages", permanent: true },
      { source: "/alleppey-houseboat-booking", destination: "/booking", permanent: true },
      { source: "/1-bedroom-houseboat", destination: "/rooms/suite-with-river-view", permanent: true },
      { source: "/2-bedroom-houseboat", destination: "/rooms/double-twin-room-lake-view", permanent: true },
      { source: "/3-bedroom-houseboat", destination: "/rooms/standard-cabin-on-boat", permanent: true },
      { source: "/houseboats", destination: "/alleppey-houseboats", permanent: true },
    ];
  },
  // Enable gzip/brotli compression for text assets.
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
