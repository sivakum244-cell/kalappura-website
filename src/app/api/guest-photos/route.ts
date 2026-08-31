import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createServerClient } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

// ============================================================================
// GET /api/guest-photos - List photos (public: approved only, admin: all)
// POST /api/guest-photos - Upload a photo (public - guest submission)
// ============================================================================

const BUCKET_NAME = "guest-photos";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    const isAdmin = authHeader === adminPassword;

    const where: Record<string, unknown> = {};
    if (!isAdmin) {
      where.approved = true;
    }

    const photos = await prisma.guestPhoto.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ success: true, photos });
  } catch (error) {
    console.error("[GUEST PHOTOS] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch photos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: max 3 uploads per IP per hour
    const ip = getClientIP(request);
    const { limited } = rateLimit(`photo:${ip}`, 3, 60 * 60 * 1000);
    if (limited) {
      return NextResponse.json(
        { success: false, error: "Too many uploads. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("photo") as File | null;
    const guestName = formData.get("guestName") as string || "";
    const caption = formData.get("caption") as string || "";
    const bookingId = formData.get("bookingId") as string || "";

    if (!file) {
      return NextResponse.json({ success: false, error: "No photo uploaded" }, { status: 400 });
    }

    if (!guestName.trim()) {
      return NextResponse.json({ success: false, error: "Guest name is required" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Only JPG, PNG, WebP, and HEIC images are allowed" }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File size must be under 10MB" }, { status: 400 });
    }

    // Upload to Supabase Storage
    const supabase = createServerClient();
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("[GUEST PHOTOS] Supabase upload error:", uploadError);
      return NextResponse.json({ success: false, error: "Failed to upload image. Please try again." }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uploadData.path);

    const imageUrl = urlData.publicUrl;

    // Save to database (not approved by default)
    const photo = await prisma.guestPhoto.create({
      data: {
        guestName: guestName.trim(),
        bookingId: bookingId.trim(),
        caption: caption.trim(),
        imageUrl,
        approved: false,
        featured: false,
      },
    });

    return NextResponse.json({ success: true, photo, message: "Photo submitted for review. Thank you!" }, { status: 201 });
  } catch (error) {
    console.error("[GUEST PHOTOS] Upload error:", error);
    return NextResponse.json({ success: false, error: "Failed to upload photo" }, { status: 500 });
  }
}
