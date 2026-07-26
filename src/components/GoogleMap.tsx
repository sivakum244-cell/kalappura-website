"use client";

import { useEffect, useRef } from "react";

// ============================================================================
// GOOGLE MAPS API INTEGRATION
// Replace with your Google Maps API Key
// Get it from: https://console.cloud.google.com/apis/credentials
// Enable: Maps JavaScript API, Places API, Directions API
// ============================================================================

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

// Kalappura Houseboats coordinates (Alleppey, Kerala)
const PROPERTY_LOCATION = { lat: 9.4981, lng: 76.3388 };

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MAPS_API_KEY || !mapRef.current) return;

    // Load Google Maps script dynamically
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    function initMap() {
      if (!mapRef.current || !(window as unknown as Record<string, unknown>).google) return;

      const google = (window as unknown as { google: { maps: typeof import("google.maps") } }).google;

      const map = new google.maps.Map(mapRef.current, {
        center: PROPERTY_LOCATION,
        zoom: 15,
        styles: [
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#e0f2fe" }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5ebe0" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d1fae5" }] },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Custom marker
      new google.maps.Marker({
        position: PROPERTY_LOCATION,
        map,
        title: "Kalappura Houseboats & Tours",
        animation: google.maps.Animation.DROP,
      });
    }
  }, []);

  // Fallback to iframe if API key not provided
  if (!MAPS_API_KEY) {
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.9!2d76.3388!3d9.4981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjknNTMuMiJOIDc2wrAyMCcxOS43IkU!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "400px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Kalappura Houseboats Location"
      />
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[400px] rounded-3xl"
      style={{ minHeight: "400px" }}
    />
  );
}
