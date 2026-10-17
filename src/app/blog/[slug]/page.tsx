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

// ISR: render each post on-demand on first request, then cache and regenerate
// hourly (so edits appear without a redeploy). We intentionally do NOT use
// generateStaticParams here — build-time prerendering of every post is both
// slow and unsafe for this page, so posts render lazily and then cache.
export const revalidate = 3600;

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

  // Related guides: up to 3 other published posts in the same category (fall back
  // to any recent posts if the category is thin). Strengthens internal linking
  // and topical clustering for both readers and AI/search engines.
  let relatedPosts: { slug: string; title: string; category: string }[] = [];
  try {
    relatedPosts = await prisma.blogPost.findMany({
      where: { published: true, category: post.category, slug: { not: post.slug } },
      select: { slug: true, title: true, category: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    if (relatedPosts.length < 3) {
      const fillers = await prisma.blogPost.findMany({
        where: {
          published: true,
          slug: { notIn: [post.slug, ...relatedPosts.map((p) => p.slug)] },
        },
        select: { slug: true, title: true, category: true },
        orderBy: { publishedAt: "desc" },
        take: 3 - relatedPosts.length,
      });
      relatedPosts = [...relatedPosts, ...fillers];
    }
  } catch {
    relatedPosts = [];
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

  // Extract FAQ pairs from the content: an <h3>Question</h3> followed by one or
  // more <p>Answer</p> paragraphs (up to the next heading). Emits FAQPage schema
  // so the post's Q&A is eligible for rich results. Purely additive.
  const faqItems: { question: string; answer: string }[] = [];
  const stripTags = (html: string) =>
    html
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h[1-3][^>]*>|$)/gi;
  let m: RegExpExecArray | null;
  while ((m = h3Regex.exec(post.content)) !== null) {
    const question = stripTags(m[1]);
    // Only treat it as an FAQ if the question looks like a question.
    if (!question.includes("?")) continue;
    const paras = m[2].match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    const answer = paras.map((p) => stripTags(p)).join(" ").trim();
    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

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

        {/* Related guides — internal linking + topical clustering */}
        {relatedPosts.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Related guides</h2>
            <ul className="space-y-2">
              {relatedPosts.map((rp) => (
                <li key={rp.slug}>
                  <Link
                    href={`/blog/${rp.slug}`}
                    className="text-gold-600 hover:text-gold-700 hover:underline text-sm font-medium"
                  >
                    {rp.title}
                  </Link>
                </li>
              ))}
            </ul>
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
          <p className="text-xs text-gray-500 mt-4">
            Already stayed with us?{" "}
            <Link href="/review" className="text-gold-600 hover:underline">Leave a review</Link>{" "}— it means a lot to our small team.
          </p>
        </div>
      </article>
    </main>
  );
}
