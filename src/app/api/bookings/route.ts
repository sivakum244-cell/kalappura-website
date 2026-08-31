import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookingSchema, generateBookingId } from "@/lib/booking-utils";
import { sendAdminNotification, sendGuestConfirmation } from "@/lib/email";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import { sanitizeInput, sanitizePhone, sanitizeEmail } from "@/lib/sanitize";

// ============================================================================
// POST /api/bookings - Create a new booking
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Rate limit: max 5 bookings per IP per 10 minutes
    const ip = getClientIP(request);
    const { limited } = rateLimit(`booking:${ip}`, 5, 10 * 60 * 1000);
    if (limited) {
      return NextResponse.json(
        { success: false, error: "Too many booking attempts. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Sanitize inputs before validation
    if (body.guestName) body.guestName = sanitizeInput(body.guestName);
    if (body.mobile) body.mobile = sanitizePhone(body.mobile);
    if (body.email) body.email = sanitizeEmail(body.email);
    if (body.additionalNotes) body.additionalNotes = sanitizeInput(body.additionalNotes);

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

    // Generate truly unique booking ID using millisecond timestamp
    const now = Date.now();
    const d = new Date(now);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const ms = String(now).slice(-6); // last 6 digits of timestamp (unique per millisecond)
    const bookingId = `KHB-${year}${month}${day}-${ms}`;

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
        utmSource: (body.utmSource || "").toString().slice(0, 100),
        utmMedium: (body.utmMedium || "").toString().slice(0, 100),
        utmCampaign: (body.utmCampaign || "").toString().slice(0, 100),
        sourceLabel: (body.sourceLabel || "Direct / Organic").toString().slice(0, 150),
        status: "Pending",
      },
    });

    // Return success immediately - booking is saved
    // Email is sent separately via /api/send-booking-email with pricing data from the client

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
      // Rate limit failed login attempts: max 5 per IP per 15 minutes
      const ip = getClientIP(request);
      const { limited } = rateLimit(`admin:${ip}`, 5, 15 * 60 * 1000);
      if (limited) {
        return NextResponse.json(
          { success: false, error: "Too many failed attempts. Try again later." },
          { status: 429 }
        );
      }
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
