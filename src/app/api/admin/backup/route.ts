import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

// ============================================================================
// GET /api/admin/backup - Export all data as JSON (admin only)
// This provides a downloadable backup of all bookings, blog posts, etc.
// For the 3-2-1 backup strategy: save this JSON to a separate location.
// ============================================================================

export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [bookings, blockedDates, roomRates, blogPosts, guestPhotos] = await Promise.all([
      prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.blockedDate.findMany(),
      prisma.roomRate.findMany(),
      prisma.blogPost.findMany(),
      prisma.guestPhoto.findMany(),
    ]);

    const backup = {
      exportedAt: new Date().toISOString(),
      version: "1.0",
      data: {
        bookings: { count: bookings.length, records: bookings },
        blockedDates: { count: blockedDates.length, records: blockedDates },
        roomRates: { count: roomRates.length, records: roomRates },
        blogPosts: { count: blogPosts.length, records: blogPosts },
        guestPhotos: { count: guestPhotos.length, records: guestPhotos },
      },
      summary: {
        totalBookings: bookings.length,
        confirmedBookings: bookings.filter((b) => b.status === "Confirmed").length,
        totalBlogPosts: blogPosts.length,
        totalGuestPhotos: guestPhotos.length,
      },
    };

    // Return as downloadable JSON
    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="kalappura-backup-${new Date().toISOString().split("T")[0]}.json"`,
      },
    });
  } catch (error) {
    console.error("[BACKUP] Error:", error);
    return NextResponse.json({ success: false, error: "Backup failed" }, { status: 500 });
  }
}
