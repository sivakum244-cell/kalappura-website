"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyBookDirect from "@/components/WhyBookDirect";
import PropertyOverview from "@/components/PropertyOverview";
import Gallery from "@/components/Gallery";
import Rooms from "@/components/Rooms";
import Experiences from "@/components/Experiences";
import Amenities from "@/components/Amenities";
import Location from "@/components/Location";
import Reviews from "@/components/Reviews";
import Packages from "@/components/Packages";
import HostSection from "@/components/HostSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhyBookDirect />
      <PropertyOverview />
      <Gallery />
      <Rooms />
      <Experiences />
      <Amenities />
      <Location />
      <Reviews />
      <Packages />
      <HostSection />
      <FAQ />
      <Footer />
      <FloatingButtons />
      <AIChatbot />
    </main>
  );
}
