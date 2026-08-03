import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// AVAILABILITY API - Returns blocked dates from admin panel
// Used by the booking form to show available/unavailable status
// ============================================================================

export async function GET() {
  try {
    const blockedDates = await prisma.blockedDate.findMany({
      orderBy: { date: "asc" },
    });

    // Group by room type
    const grouped: Record<string, string[]> = {
      "suite-river-view": [],
      "double-twin-room": [],
      "standard-cabin": [],
    };

    for (const bd of blockedDates) {
      if (bd.roomType === "all") {
        grouped["suite-river-view"].push(bd.date);
        grouped["double-twin-room"].push(bd.date);
        grouped["standard-cabin"].push(bd.date);
      } else if (grouped[bd.roomType]) {
        grouped[bd.roomType].push(bd.date);
      }
    }

    return NextResponse.json({
      success: true,
      blockedDates: grouped,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[AVAILABILITY] Error:", error);
    // Return empty if DB fails (don't block bookings)
    return NextResponse.json({
      success: true,
      blockedDates: {
        "suite-river-view": [],
        "double-twin-room": [],
        "standard-cabin": [],
      },
      lastUpdated: new Date().toISOString(),
    });
  }
}
