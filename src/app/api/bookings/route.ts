import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookingSchema, generateBookingId } from "@/lib/booking-utils";
import { sendAdminNotification, sendGuestConfirmation } from "@/lib/email";

// ============================================================================
// POST /api/bookings - Create a new booking
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Generate unique booking ID using full timestamp (guaranteed unique)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const secs = String(now.getSeconds()).padStart(2, "0");
    const bookingId = `KHB-${year}${month}${day}-${hours}${mins}${secs}`;

    // Save to database
    const booking = await prisma.booking.create({
      data: {
        bookingId,
        guestName: data.guestName,
        mobile: data.mobile,
        email: data.email || "",
        country: data.country || "India",
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        eta: data.eta,
        adults: data.adults,
        children: data.children || 0,
        infants: data.infants || 0,
        roomType: data.roomType,
        numberOfRooms: data.numberOfRooms || 1,
        foodRequirements: Array.isArray(data.foodRequirements) ? data.foodRequirements.join(", ") : "",
        foodAllergyDetails: data.foodAllergyDetails || "",
        specialRequests: Array.isArray(data.specialRequests) ? data.specialRequests.join(", ") : "",
        additionalNotes: data.additionalNotes || "",
        paymentPreference: data.paymentPreference || "pay-at-property",
        status: "Pending",
      },
    });

    // Return success immediately - booking is saved
    // Email sending disabled temporarily for debugging
    /*
    try {
      const emailData = {
        bookingId: booking.bookingId,
        guestName: booking.guestName,
        mobile: booking.mobile,
        email: booking.email || "",
        country: booking.country,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        eta: booking.eta,
        adults: booking.adults,
        children: booking.children,
        infants: booking.infants,
        roomType: booking.roomType,
        numberOfRooms: booking.numberOfRooms,
        foodRequirements: booking.foodRequirements,
        specialRequests: booking.specialRequests,
        additionalNotes: booking.additionalNotes,
        paymentPreference: booking.paymentPreference,
        createdAt: new Date(booking.createdAt).toISOString(),
      };

      const emailTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Email timeout")), 5000));
      await Promise.race([
        Promise.allSettled([
          sendAdminNotification(emailData),
          sendGuestConfirmation(emailData),
        ]),
        emailTimeout,
      ]).catch((err) => {
        console.log("[BOOKING] Email skipped (timeout or error):", err);
      });
    } catch (emailErr) {
      console.error("[BOOKING] Email failed:", emailErr);
    }
    */

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.bookingId,
        message: "Booking created successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const errName = error instanceof Error ? error.name : "Unknown";
    console.error("[BOOKING API v3] Error creating booking:", errName, errMsg);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create booking (v3): " + errMsg,
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET /api/bookings - List all bookings (Admin)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    // Simple password check via header
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";

    if (authHeader !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse query params for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};
    if (status && status !== "all") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { guestName: { contains: search } },
        { bookingId: { contains: search } },
        { mobile: { contains: search } },
        { email: { contains: search } },
      ];
    }

    // Fetch bookings
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[BOOKING API] Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
