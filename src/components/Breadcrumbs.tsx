import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export interface Crumb {
  name: string;
  href?: string; // omit on the current (last) page
}

// Reusable breadcrumb that renders BOTH the visible nav and BreadcrumbList
// JSON-LD, so every page gets consistent breadcrumb rich-result eligibility
// from a single source of truth.
export default function Breadcrumbs({
  items,
  className = "text-sm text-gray-400 mb-4",
  linkClassName = "hover:text-gold-600 transition-colors",
  currentClassName = "text-gray-600",
}: {
  items: Crumb[];
  className?: string;
  linkClassName?: string;
  currentClassName?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href ? `${BASE_URL}${c.href}` : undefined,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className={className}>
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={c.name}>
              {c.href && !isLast ? (
                <Link href={c.href} className={linkClassName}>{c.name}</Link>
              ) : (
                <span className={currentClassName}>{c.name}</span>
              )}
              {!isLast && <span className="mx-2" aria-hidden="true">/</span>}
            </span>
          );
        })}
      </nav>
    </>
  );
}
