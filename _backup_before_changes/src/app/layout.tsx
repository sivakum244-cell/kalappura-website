import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";

export const metadata: Metadata = {
  title: "Kalappura Houseboats & Tours | Luxury Houseboats in Alleppey, Kerala",
  description:
    "Experience Kerala's most beautiful backwaters aboard luxury houseboats. Handcrafted traditional houseboats with modern amenities. Best price guarantee, instant confirmation. Book direct and save!",
  keywords:
    "houseboat alleppey, kerala houseboat, luxury houseboat, alleppey backwaters, kalappura houseboats, kerala tourism, houseboat booking",
  openGraph: {
    title: "Kalappura Houseboats & Tours | Luxury Houseboats in Alleppey",
    description:
      "Experience Kerala's most beautiful backwaters. Luxury houseboats with authentic Kerala hospitality.",
    type: "website",
    locale: "en_IN",
    siteName: "Kalappura Houseboats & Tours",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalappura Houseboats & Tours",
    description: "Luxury Houseboats in Alleppey, Kerala",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Tag Manager - Head */}
        <GoogleTagManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Kalappura Houseboats & Tours",
              description:
                "Luxury houseboats on Kerala backwaters with authentic hospitality",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Mullackal Ward, Iron Bridge P.O, Thirumala East Gate Road",
                addressLocality: "Alleppey",
                addressRegion: "Kerala",
                postalCode: "688011",
                addressCountry: "IN",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "9.7",
                reviewCount: "275",
                bestRating: "10",
              },
              priceRange: "₹15,300 - ₹16,500",
              starRating: { "@type": "Rating", ratingValue: "5" },
              telephone: "+919895053528",
              url: "https://kalappurahouseboats.com",
              image: "https://kalappurahouseboats.com/images/gallery/drone-1.jpg",
              sameAs: [
                "https://www.instagram.com/kalappurahouseboats",
                "https://www.facebook.com/kalappurahouseboats"
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Analytics */}
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
