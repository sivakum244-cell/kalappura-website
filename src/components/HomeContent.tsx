"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
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
import HomeSEOContent from "@/components/HomeSEOContent";
import GuestPhotosSection from "@/components/GuestPhotosSection";
import WhyBookDirectComparison from "@/components/WhyBookDirectComparison";
import SocialProofPopup from "@/components/SocialProofPopup";
import StickyMobileBar from "@/components/StickyMobileBar";

export default function HomeContent() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <Hero />
      <TrustBadges />
      <WhyBookDirect />
      <PropertyOverview />
      <HomeSEOContent />
      <Gallery />
      <Rooms />
      <WhyBookDirectComparison />
      <Packages />
      <Experiences />
      <Amenities />
      <Location />
      <Reviews />
      <GuestPhotosSection />
      <HostSection />
      <FAQ />
      <Footer />
      <FloatingButtons />
      <AIChatbot />
      <SocialProofPopup />
      <StickyMobileBar />
    </main>
  );
}
