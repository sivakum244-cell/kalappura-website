// ============================================================================
// GOOGLE BUSINESS PROFILE INTEGRATION
// Links to your Google Business reviews and information
// ============================================================================

export const GOOGLE_BUSINESS = {
  // Your Google Business Profile Place ID
  // Find it: https://developers.google.com/maps/documentation/places/web-service/place-id
  placeId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "YOUR_PLACE_ID",

  // Direct review link - guests can leave reviews here
  reviewLink: "https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review",

  // Google Maps link
  mapsLink: "https://maps.google.com/?cid=YOUR_CID_NUMBER",

  // Google Business Profile link
  profileLink: "https://www.google.com/maps/place/Kalappura+Houseboats",
};

// Generate Google review link for the property
export function getGoogleReviewLink(): string {
  return GOOGLE_BUSINESS.reviewLink;
}

// Generate Google Maps directions link
export function getDirectionsLink(fromLat?: number, fromLng?: number): string {
  const dest = "9.4981,76.3388"; // Kalappura coordinates
  if (fromLat && fromLng) {
    return `https://www.google.com/maps/dir/${fromLat},${fromLng}/${dest}`;
  }
  return `https://www.google.com/maps/dir//${dest}`;
}
