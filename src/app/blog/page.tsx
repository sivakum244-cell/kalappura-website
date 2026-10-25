import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog | Alleppey Houseboat Travel Guide & Tips",
  description:
    "Read travel guides, tips, and stories about Alleppey houseboats, Kerala backwaters, and planning your perfect houseboat trip. Expert advice from Kalappura Houseboats.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Kalappura Houseboats",
    description: "Travel guides, tips, and stories about Alleppey houseboats and Kerala backwaters.",
    url: "/blog",
  },
};

// ISR: prerender and cache the blog index, regenerating hourly so newly
// published posts appear without a redeploy (matches sitemap revalidate).
export const revalidate = 3600;

export default async function BlogPage() {
  let posts: { id: string; slug: string; title: string; excerpt: string; coverImage: string; category: string; publishedAt: Date | null; author: string }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        category: true,
        publishedAt: true,
        author: true,
      },
    });
  } catch (e) {
    // DB might not have the table yet — that's fine, show empty state
    console.log("Blog posts table not available yet:", e);
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alleppeyhouseboat.online" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.alleppeyhouseboat.online/blog" },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alleppey Houseboat Blog
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Travel guides, tips, and stories to help you plan the perfect houseboat experience on Kerala backwaters.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No articles published yet</p>
            <p className="text-gray-400 text-sm">Check back soon for travel guides and tips.</p>
            <Link href="/" className="inline-block mt-6 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                {post.coverImage && (
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    {post.publishedAt && (
                      <span className="text-xs text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-display text-lg font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                  )}
                  <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-sand-50 py-12 px-4 text-center">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Ready to experience it yourself?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/booking" className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
            Book a Houseboat
          </Link>
          <Link href="/alleppey-houseboats" className="px-6 py-2.5 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 text-sm transition-colors">
            View Houseboats
          </Link>
        </div>
      </section>
    </main>
  );
}

