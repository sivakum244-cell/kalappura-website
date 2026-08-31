import type { Metadata } from "next";
import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = BASE_URL;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, coverImage: true, slug: true },
    });

    if (!post) {
      return { title: "Post Not Found" };
    }

    return {
      title: post.title,
      description: post.excerpt || `Read about ${post.title} on the Kalappura Houseboats blog.`,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug}`,
        type: "article",
        images: post.coverImage ? [{ url: `${baseUrl}${post.coverImage}`, width: 1200, height: 630, alt: post.title }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch {
    notFound();
  }

  if (!post || !post.published) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `${BASE_URL}${post.coverImage}` : undefined,
    author: {
      "@type": "Organization",
      name: post.author || "Kalappura Houseboats",
    },
    publisher: {
      "@type": "Organization",
      name: "Kalappura Houseboats & Tours",
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-gold-600 transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{post.title}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-0.5 bg-gold-100 text-gold-700 text-xs font-medium rounded-full">
            {post.category}
          </span>
          {post.publishedAt && (
            <time className="text-sm text-gray-500" dateTime={post.publishedAt.toISOString()}>
              {post.publishedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          )}
          <span className="text-sm text-gray-400">by {post.author}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Content — sanitized to prevent XSS */}
        <div
          className="prose prose-gray prose-lg max-w-none
            prose-headings:font-display prose-headings:text-gray-900
            prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
              .replace(/on\w+="[^"]*"/gi, "")
              .replace(/on\w+='[^']*'/gi, "")
              .replace(/javascript:/gi, "")
              .replace(/<iframe/gi, "&lt;iframe")
              .replace(/<object/gi, "&lt;object")
              .replace(/<embed/gi, "&lt;embed")
          }}
        />

        {/* Tags */}
        {post.tags && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.split(",").map((tag) => (
                <span key={tag.trim()} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 p-6 bg-sand-50 rounded-2xl text-center">
          <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
            Ready to book your houseboat?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Experience everything you just read about. Book direct for best prices.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
              Book Now
            </Link>
            <Link href="/alleppey-houseboats" className="px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 text-sm transition-colors">
              View Houseboats
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
