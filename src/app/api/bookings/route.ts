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

    // Generate unique booking ID
    // Count today's bookings to get the sequence number
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCount = await prisma.booking.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const bookingId = generateBookingId(todayCount + 1);

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

    // Send emails (non-blocking - don't fail the booking if emails fail)
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

      Promise.allSettled([
        sendAdminNotification(emailData),
        sendGuestConfirmation(emailData),
      ]).catch(() => {});
    } catch (emailErr) {
      console.error("[BOOKING] Email preparation failed:", emailErr);
    }

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
    console.error("[BOOKING API] Error creating booking:", errName, errMsg, JSON.stringify(error));
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create booking: " + errMsg,
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
