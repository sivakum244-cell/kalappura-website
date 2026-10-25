import type { Metadata } from "next";
import BookNowLanding from "@/components/BookNowLanding";

export const metadata: Metadata = {
  title: { absolute: "Book Alleppey Houseboat | Best Price Guarantee" },
  description:
    "Book a private luxury houseboat in Alleppey. All meals, AC & backwater cruise included. Best price guarantee, 20% advance, instant confirmation.",
  alternates: { canonical: "/book-now" },
  // Landing page for ads — keep it focused, allow indexing but it's mainly for paid traffic
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Book Alleppey Houseboat | Best Price Guarantee",
    description: "Private luxury houseboats in Alleppey. All meals, AC, cruise included. Book direct and save.",
    url: "/book-now",
  },
};

export default function BookNowPage() {
  return <BookNowLanding />;
}
