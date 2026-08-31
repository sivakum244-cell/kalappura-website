import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// GET /api/analytics - Admin analytics data
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";

    if (authHeader !== adminPassword) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Get all bookings
    const allBookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    // --- Basic Stats ---
    const totalBookings = allBookings.length;
    const pendingBookings = allBookings.filter((b) => b.status === "Pending").length;
    const confirmedBookings = allBookings.filter((b) => b.status === "Confirmed").length;
    const cancelledBookings = allBookings.filter((b) => b.status === "Cancelled").length;
    const completedBookings = allBookings.filter((b) => b.status === "Completed").length;

    // --- This Month ---
    const thisMonthBookings = allBookings.filter((b) => {
      const d = new Date(b.createdAt);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });

    // --- Last Month ---
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
    const lastMonthBookings = allBookings.filter((b) => {
      const d = new Date(b.createdAt);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    });

    // --- Revenue Calculation (estimate based on numberOfRooms * base package price) ---
    const packagePrices: Record<string, number> = {
      standard: 15000,
      premium: 19000,
      luxury: 24000,
    };

    const calculateRevenue = (bookings: typeof allBookings) => {
      return bookings
        .filter((b) => b.status === "Confirmed" || b.status === "Completed")
        .reduce((sum, b) => {
          // Calculate nights
          const checkIn = new Date(b.checkIn);
          const checkOut = new Date(b.checkOut);
          const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
          const pricePerRoom = 15000; // Base standard package
          return sum + (b.numberOfRooms * pricePerRoom * nights);
        }, 0);
    };

    const totalRevenue = calculateRevenue(allBookings);
    const thisMonthRevenue = calculateRevenue(thisMonthBookings);
    const lastMonthRevenue = calculateRevenue(lastMonthBookings);

    // --- Room Popularity ---
    const roomCounts: Record<string, number> = {};
    allBookings.forEach((b) => {
      roomCounts[b.roomType] = (roomCounts[b.roomType] || 0) + 1;
    });

    const roomPopularity = Object.entries(roomCounts)
      .map(([roomType, count]) => ({
        roomType,
        name: roomType === "standard-cabin" ? "3 Bedroom" :
              roomType === "double-twin-room" ? "2 Bedroom" :
              roomType === "suite-river-view" ? "1 Bedroom" : roomType,
        count,
        percentage: totalBookings > 0 ? Math.round((count / totalBookings) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // --- Cancellation Rate ---
    const cancellationRate = totalBookings > 0
      ? Math.round((cancelledBookings / totalBookings) * 100)
      : 0;

    // --- Monthly Trends (last 6 months) ---
    const monthlyTrends = [];
    for (let i = 5; i >= 0; i--) {
      const m = new Date(thisYear, thisMonth - i, 1);
      const monthBookings = allBookings.filter((b) => {
        const d = new Date(b.createdAt);
        return d.getMonth() === m.getMonth() && d.getFullYear() === m.getFullYear();
      });
      monthlyTrends.push({
        month: m.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
        bookings: monthBookings.length,
        confirmed: monthBookings.filter((b) => b.status === "Confirmed" || b.status === "Completed").length,
        revenue: calculateRevenue(monthBookings),
      });
    }

    // --- Occupancy (next 30 days) ---
    const blockedDates = await prisma.blockedDate.findMany();
    const occupancyDays = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];

      // Check if booked on this date
      const bookedOnDate = allBookings.filter((b) =>
        (b.status === "Confirmed" || b.status === "Pending") &&
        b.checkIn <= dateStr && b.checkOut > dateStr
      ).length;

      const blockedOnDate = blockedDates.filter((bd) => bd.date === dateStr).length;

      occupancyDays.push({
        date: dateStr,
        booked: bookedOnDate,
        blocked: blockedOnDate,
        available: Math.max(0, 3 - bookedOnDate - blockedOnDate), // 3 boats total
      });
    }

    const totalSlots30Days = 30 * 3; // 30 days * 3 boats
    const occupiedSlots = occupancyDays.reduce((sum, d) => sum + d.booked + d.blocked, 0);
    const occupancyRate = Math.round((occupiedSlots / totalSlots30Days) * 100);

    // --- Top Countries ---
    const countryCounts: Record<string, number> = {};
    allBookings.forEach((b) => {
      countryCounts[b.country] = (countryCounts[b.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // --- Booking Sources (marketing attribution) ---
    const sourceCounts: Record<string, number> = {};
    allBookings.forEach((b) => {
      const label = (b as { sourceLabel?: string }).sourceLabel || "Direct / Organic";
      sourceCounts[label] = (sourceCounts[label] || 0) + 1;
    });
    const bookingSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);

    // --- Average Group Size ---
    const avgGroupSize = totalBookings > 0
      ? Math.round(allBookings.reduce((sum, b) => sum + b.adults + b.children, 0) / totalBookings * 10) / 10
      : 0;

    // --- Recent Bookings ---
    const recentBookings = allBookings.slice(0, 5).map((b) => ({
      bookingId: b.bookingId,
      guestName: b.guestName,
      roomType: b.roomType,
      checkIn: b.checkIn,
      status: b.status,
      createdAt: b.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalBookings,
          pendingBookings,
          confirmedBookings,
          cancelledBookings,
          completedBookings,
          cancellationRate,
          avgGroupSize,
        },
        revenue: {
          total: totalRevenue,
          thisMonth: thisMonthRevenue,
          lastMonth: lastMonthRevenue,
          growth: lastMonthRevenue > 0
            ? Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
            : 0,
        },
        occupancy: {
          rate: occupancyRate,
          next30Days: occupancyDays,
        },
        roomPopularity,
        monthlyTrends,
        topCountries,
        bookingSources,
        recentBookings,
        thisMonth: {
          bookings: thisMonthBookings.length,
          confirmed: thisMonthBookings.filter((b) => b.status === "Confirmed" || b.status === "Completed").length,
        },
      },
    });
  } catch (error) {
    console.error("[ANALYTICS API] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
  }
}
