import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// GET /api/rates - Public: Get rates for date range
// POST /api/rates - Admin: Set/update rates
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomType = searchParams.get("roomType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const where: Record<string, unknown> = {};
    if (roomType) where.roomType = roomType;
    if (date) {
      where.date = date;
    } else if (from && to) {
      where.date = { gte: from, lte: to };
    }

    const rates = await prisma.roomRate.findMany({
      where,
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ success: true, rates });
  } catch (error) {
    console.error("[RATES] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch rates" }, { status: 500 });
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
    const { dates, roomType, price } = body;

    if (!roomType || !price) {
      return NextResponse.json({ success: false, error: "roomType and price required" }, { status: 400 });
    }

    // dates can be single date or array or date range {from, to}
    let dateList: string[] = [];
    if (Array.isArray(dates)) {
      dateList = dates;
    } else if (typeof dates === "string") {
      dateList = [dates];
    } else if (dates.from && dates.to) {
      // Generate date range
      const start = new Date(dates.from);
      const end = new Date(dates.to);
      const current = new Date(start);
      while (current <= end) {
        dateList.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    }

    // Upsert each date
    const results = [];
    for (const date of dateList) {
      const result = await prisma.roomRate.upsert({
        where: { date_roomType: { date, roomType } },
        update: { price },
        create: { date, roomType, price },
      });
      results.push(result);
    }

    return NextResponse.json({
      success: true,
      message: `${results.length} rate(s) updated`,
      count: results.length,
    });
  } catch (error) {
    console.error("[RATES] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update rates" }, { status: 500 });
  }
}
