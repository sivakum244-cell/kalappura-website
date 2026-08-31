import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ============================================================================
// GET /api/blog - List blog posts (public: published only, admin: all)
// POST /api/blog - Create a new blog post (admin only)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD || "kalappura2025";
    const isAdmin = authHeader === adminPassword;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    if (!isAdmin) {
      where.published = true;
    }
    if (category) {
      where.category = category;
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        author: true,
        category: true,
        tags: true,
        published: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("[BLOG API] Error fetching posts:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 });
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
    const { title, slug, excerpt, content, coverImage, author, category, tags, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, error: "Title, slug, and content are required" }, { status: 400 });
    }

    // Generate slug from title if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: finalSlug,
        excerpt: excerpt || "",
        content,
        coverImage: coverImage || "",
        author: author || "Kalappura Houseboats",
        category: category || "travel",
        tags: tags || "",
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    if (errMsg.includes("Unique constraint")) {
      return NextResponse.json({ success: false, error: "A post with this slug already exists" }, { status: 409 });
    }
    console.error("[BLOG API] Error creating post:", error);
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}
