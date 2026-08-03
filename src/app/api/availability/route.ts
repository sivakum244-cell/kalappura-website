import { NextResponse } from "next/server";

// ============================================================================
// AVAILABILITY API - Syncs with Booking.com iCal Feed
// Fetches blocked dates from Booking.com calendar export
// 
// Configure your iCal URLs in .env:
// ICAL_URL_1BR = "your booking.com ical link for 1 bedroom"
// ICAL_URL_2BR = "your booking.com ical link for 2 bedroom"
// ICAL_URL_3BR = "your booking.com ical link for 3 bedroom"
// ============================================================================

// iCal URLs from Booking.com (set in .env)
const ICAL_URLS: Record<string, string> = {
  "suite-river-view": process.env.ICAL_URL_1BR || "",
  "double-twin-room": process.env.ICAL_URL_2BR || "",
  "standard-cabin": process.env.ICAL_URL_3BR || "",
};

// Parse iCal format to extract booked dates
function parseICal(icalData: string): { start: string; end: string; summary: string }[] {
  const events: { start: string; end: string; summary: string }[] = [];
  const lines = icalData.split("\n").map((l) => l.trim());

  let inEvent = false;
  let currentEvent: { start: string; end: string; summary: string } = { start: "", end: "", summary: "" };

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      currentEvent = { start: "", end: "", summary: "" };
    } else if (line === "END:VEVENT") {
      inEvent = false;
      if (currentEvent.start && currentEvent.end) {
        events.push(currentEvent);
      }
    } else if (inEvent) {
      if (line.startsWith("DTSTART")) {
        // Format: DTSTART;VALUE=DATE:20260801 or DTSTART:20260801T120000Z
        const value = line.split(":").pop() || "";
        currentEvent.start = formatICalDate(value);
      } else if (line.startsWith("DTEND")) {
        const value = line.split(":").pop() || "";
        currentEvent.end = formatICalDate(value);
      } else if (line.startsWith("SUMMARY")) {
        currentEvent.summary = line.split(":").slice(1).join(":") || "Booked";
      }
    }
  }

  return events;
}

// Convert iCal date (20260801 or 20260801T120000Z) to YYYY-MM-DD
function formatICalDate(icalDate: string): string {
  const clean = icalDate.replace(/[TZ]/g, "").substring(0, 8);
  if (clean.length === 8) {
    return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(6, 8)}`;
  }
  return icalDate;
}

// Get all dates between start and end (exclusive of end)
function getDatesBetween(start: string, end: string): string[] {
  const dates: string[] = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const current = new Date(startDate);
  while (current < endDate) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export async function GET() {
  try {
    const blockedDates: Record<string, string[]> = {
      "suite-river-view": [],
      "double-twin-room": [],
      "standard-cabin": [],
    };

    // Fetch iCal for each room type
    for (const [roomType, url] of Object.entries(ICAL_URLS)) {
      if (!url) continue;

      try {
        const response = await fetch(url, {
          next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) continue;

        const icalData = await response.text();
        const events = parseICal(icalData);

        // Collect all blocked dates
        const dates: string[] = [];
        for (const event of events) {
          const eventDates = getDatesBetween(event.start, event.end);
          dates.push(...eventDates);
        }

        blockedDates[roomType] = [...new Set(dates)].sort();
      } catch (err) {
        console.error(`[ICAL] Failed to fetch for ${roomType}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      blockedDates,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[AVAILABILITY] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
