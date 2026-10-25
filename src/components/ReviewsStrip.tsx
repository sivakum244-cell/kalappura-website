import { REVIEWS, SITE_CONFIG } from "@/lib/constants";

// Compact, server-rendered social-proof strip for landing pages (booking, rooms,
// packages, prices). Shows the aggregate rating plus a few genuine guest reviews
// near the conversion point. No client JS — safe to drop into server components.
export default function ReviewsStrip({
  heading = "What Our Guests Say",
  count = 3,
}: {
  heading?: string;
  count?: number;
}) {
  const reviews = REVIEWS.slice(0, count);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12" aria-label="Guest reviews">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="text-gold-500 text-lg" aria-hidden="true">★★★★★</span>
          <span className="font-semibold text-gray-900">{SITE_CONFIG.rating}/10</span>
          <span className="text-sm text-gray-500">({SITE_CONFIG.reviewCount}+ guest reviews)</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900">{heading}</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.id} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1 text-gold-500 text-sm mb-2" aria-hidden="true">★★★★★</div>
            <blockquote className="text-sm text-gray-600 leading-relaxed mb-4">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-2 text-sm">
              <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-bold">
                {r.avatar}
              </span>
              <span className="font-medium text-gray-900">{r.name}</span>
              <span aria-hidden="true">{r.flag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
