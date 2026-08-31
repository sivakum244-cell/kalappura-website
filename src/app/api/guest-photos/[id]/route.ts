import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// PATCH /api/guest-photos/[id] - Approve/feature a photo (admin only)
// DELETE /api/guest-photos/[id] - Delete a photo (admin only)
// ============================================================================

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    if (authHeader !== adminPassword) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};
    if (body.approved !== undefined) updateData.approved = body.approved;
    if (body.featured !== undefined) updateData.featured = body.featured;

    const photo = await prisma.guestPhoto.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, photo });
  } catch (error) {
    console.error("[GUEST PHOTOS] Update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    if (authHeader !== adminPassword) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.guestPhoto.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Photo deleted" });
  } catch (error) {
    console.error("[GUEST PHOTOS] Delete error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
