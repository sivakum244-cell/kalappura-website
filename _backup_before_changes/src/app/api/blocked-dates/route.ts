import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// GET /api/blocked-dates - Public: Get all blocked dates
// POST /api/blocked-dates - Admin: Add blocked dates
// DELETE /api/blocked-dates - Admin: Remove blocked dates
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
      raw: blockedDates,
    });
  } catch (error) {
    console.error("[BLOCKED-DATES] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    if (authHeader !== adminPassword) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dates, roomType, reason } = body;

    // dates can be a single date string or array of dates
    const dateList = Array.isArray(dates) ? dates : [dates];
    const type = roomType || "all";
    const reasonText = reason || "Booked on Booking.com";

    const created = [];
    for (const date of dateList) {
      try {
        const entry = await prisma.blockedDate.create({
          data: { date, roomType: type, reason: reasonText },
        });
        created.push(entry);
      } catch {
        // Skip duplicates
      }
    }

    return NextResponse.json({
      success: true,
      message: `${created.length} date(s) blocked`,
      created,
    });
  } catch (error) {
    console.error("[BLOCKED-DATES] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to block dates" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    if (authHeader !== adminPassword) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, date, roomType } = body;

    if (id) {
      await prisma.blockedDate.delete({ where: { id } });
    } else if (date && roomType) {
      await prisma.blockedDate.deleteMany({ where: { date, roomType } });
    }

    return NextResponse.json({ success: true, message: "Unblocked" });
  } catch (error) {
    console.error("[BLOCKED-DATES] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to unblock" }, { status: 500 });
  }
}
