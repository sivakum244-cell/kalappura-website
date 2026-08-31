import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// AVAILABILITY API - Returns blocked dates + rates from database
// ============================================================================

export async function GET() {
  try {
    const [blockedDatesData, ratesData] = await Promise.all([
      prisma.blockedDate.findMany({ orderBy: { date: "asc" } }),
      prisma.roomRate.findMany({ orderBy: { date: "asc" } }),
    ]);

    // Group blocked dates by room type
    const blockedDates: Record<string, string[]> = {
      "suite-river-view": [],
      "double-twin-room": [],
      "standard-cabin": [],
    };

    for (const bd of blockedDatesData) {
      if (bd.roomType === "all") {
        blockedDates["suite-river-view"].push(bd.date);
        blockedDates["double-twin-room"].push(bd.date);
        blockedDates["standard-cabin"].push(bd.date);
      } else if (blockedDates[bd.roomType]) {
        blockedDates[bd.roomType].push(bd.date);
      }
    }

    // Convert rates to a lookup map: { "2026-08-15_standard-cabin": 17500 }
    const rates: Record<string, number> = {};
    for (const r of ratesData) {
      rates[`${r.date}_${r.roomType}`] = r.price;
    }

    return NextResponse.json({
      success: true,
      blockedDates,
      rates,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[AVAILABILITY] Error:", error);
    return NextResponse.json({
      success: true,
      blockedDates: { "suite-river-view": [], "double-twin-room": [], "standard-cabin": [] },
      rates: {},
      lastUpdated: new Date().toISOString(),
    });
  }
}
