import type { Metadata } from "next";
import BookingPageContent from "@/components/BookingPageContent";

export const metadata: Metadata = {
  title: "Book a Houseboat in Alleppey | Instant Confirmation",
  description:
    "Book your private houseboat in Alleppey (Alappuzha) online. Choose from 1, 2 & 3 bedroom houseboats with all meals included. Best price guarantee, 20% advance only, instant confirmation. Free cancellation up to 7 days before.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Book a Houseboat in Alleppey | Kalappura Houseboats",
    description:
      "Book private houseboats in Alleppey online. 1-3 bedroom AC boats, all meals, backwater cruise. Instant confirmation, best price guarantee.",
    url: "/booking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Houseboat in Alleppey",
    description: "Instant online booking for Alleppey houseboats. 20% advance, balance at property.",
  },
};

export default function BookingPage() {
  return <BookingPageContent />;
}
