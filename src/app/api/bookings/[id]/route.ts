import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// PATCH /api/bookings/[id] - Update booking status or details
// ============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Auth check
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    if (authHeader !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Find existing booking
    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update only allowed fields
    const allowedFields = [
      "status",
      "guestName",
      "mobile",
      "email",
      "country",
      "checkIn",
      "checkOut",
      "eta",
      "adults",
      "children",
      "infants",
      "roomType",
      "numberOfRooms",
      "foodRequirements",
      "specialRequests",
      "additionalNotes",
      "paymentPreference",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      booking: updated,
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.error("[BOOKING API] Error updating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE /api/bookings/[id] - Delete a booking
// ============================================================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Auth check
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    if (authHeader !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if exists
    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    await prisma.booking.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("[BOOKING API] Error deleting booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
