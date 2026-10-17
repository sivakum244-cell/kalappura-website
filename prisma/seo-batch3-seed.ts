// ============================================================================
// SEO BATCH 3 SEED — 3 long-tail articles (cancellation, check-in/AC timing, book direct)
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seo-batch3-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  {
    slug: "alleppey-houseboat-cancellation-policy",
    title: "Alleppey Houseboat Cancellation Policy: What to Know Before You Book",
    excerpt: "Understand the Alleppey houseboat cancellation policy before booking — free cancellation windows, advance payment, refunds, and how booking direct gives you more flexibility.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "tips",
    tags: "alleppey houseboat cancellation policy, houseboat refund policy, alleppey houseboat advance payment, free cancellation houseboat, houseboat booking terms Kerala",
    content: `
<p>Before booking any Alleppey houseboat, it's smart to understand the cancellation policy — what happens if your plans change, how much advance you pay, and when you can get a refund. Policies vary between operators, so here's what to look for and how ours works.</p>

<h2>How Much Advance Do You Pay?</h2>
<p>At Kalappura, only a <strong>20% advance</strong> is needed to confirm your booking. The remaining balance is paid at the property on check-in day. This keeps your upfront commitment low compared to full-prepayment options common on some third-party sites.</p>

<h2>Free Cancellation Window</h2>
<p>We offer <strong>free cancellation up to 7 days before check-in</strong>. If you cancel within that window, you're not charged. This gives you flexibility to plan with confidence.</p>

<h2>Cancellations Closer to Check-In</h2>
<ul>
<li><strong>7 days or more before check-in:</strong> free cancellation.</li>
<li><strong>Within 7 days of check-in:</strong> a portion of the booking amount may be charged.</li>
<li><strong>No-show:</strong> the booking amount is typically charged in full.</li>
</ul>
<p>Exact terms can vary by season and package, so always confirm the current cancellation policy for your specific dates when you book.</p>

<h2>Why Booking Direct Helps</h2>
<p>Booking directly with the operator (rather than through an OTA) usually means clearer, more flexible cancellation terms and a direct point of contact if your plans change. Third-party platforms sometimes add their own stricter conditions on top. Read more in our <a href="/blog/book-houseboat-direct-vs-otas-alleppey">book direct vs OTAs guide</a>.</p>

<h2>Tips to Avoid Cancellation Charges</h2>
<ul>
<li>Book dates you're confident about, or stay outside the 7-day charge window.</li>
<li>Confirm the exact policy in writing when you book.</li>
<li>If plans are uncertain, ask about date changes rather than outright cancellation.</li>
<li>Keep your booking confirmation and contact details handy.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>What is the cancellation policy for an Alleppey houseboat?</h3>
<p>At Kalappura, free cancellation applies up to 7 days before check-in. Within 7 days a portion may be charged, and no-shows are charged in full. Confirm exact terms for your dates when booking.</p>

<h3>How much advance do I need to pay?</h3>
<p>Only 20% advance confirms your booking; the balance is paid at the property on check-in day.</p>

<h3>Can I change my dates instead of cancelling?</h3>
<p>Often yes, subject to availability. Contact the operator directly to request a date change rather than cancelling.</p>

<p>For everything else before booking, read our <a href="/blog/things-to-know-before-booking-alleppey-houseboat">booking guide</a> and the full <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to book with flexibility?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a> with only 20% advance and free cancellation up to 7 days before check-in.</p>
`,
  },
  {
    slug: "alleppey-houseboat-check-in-check-out-time",
    title: "Alleppey Houseboat Check-In & Check-Out Time (Plus AC Timing)",
    excerpt: "Alleppey houseboat check-in is at 12 PM and check-out at 9 AM. Here's the full daily schedule, AC timing by package, and what happens hour by hour on your overnight cruise.",
    coverImage: "/images/gallery/interior-1.jpg",
    category: "tips",
    tags: "alleppey houseboat check in check out time, houseboat AC timing, alleppey houseboat schedule, houseboat timings kerala, overnight houseboat check in",
    content: `
<p>Two of the most common questions before an Alleppey houseboat trip are: what time is check-in and check-out, and when does the AC run? Both are standardised across most operators. Here's the full picture so you can plan your day.</p>

<h2>Check-In and Check-Out Times</h2>
<p>Alleppey houseboat timings are standard:</p>
<ul>
<li><strong>Check-in: 12:00 PM (noon)</strong></li>
<li><strong>Check-out: 9:00 AM the next morning</strong></li>
</ul>
<p>This gives you a full afternoon cruise, sunset, dinner, an overnight stay, and breakfast before departure. Plan to reach the boarding point a little before noon — aim for around 11:30 AM to allow for traffic.</p>

<h2>AC Timing by Package</h2>
<p>Air conditioning isn't usually 24 hours; the hours depend on your package. This is a genuine, frequently-asked detail worth checking before you book:</p>
<ul>
<li><strong>Standard:</strong> AC roughly 8:30 PM – 6:30 AM (bedroom only)</li>
<li><strong>Premium:</strong> AC roughly 5:30 PM – 7:30 AM (bedroom/hall)</li>
<li><strong>Semi Luxury:</strong> AC available all the time</li>
</ul>
<p>If daytime AC matters to you, choose Premium or Semi Luxury. Compare them in our <a href="/blog/luxury-vs-standard-houseboat-alleppey">luxury vs standard guide</a> or on the <a href="/houseboat-packages">packages page</a>.</p>

<h2>Your Overnight Schedule, Hour by Hour</h2>
<ul>
<li><strong>12:00 PM</strong> — Check-in, welcome drink</li>
<li><strong>1:00 PM</strong> — Lunch onboard</li>
<li><strong>1:30–5:00 PM</strong> — Backwater cruise</li>
<li><strong>5:00 PM</strong> — Boat anchors for the night; evening tea &amp; snacks</li>
<li><strong>7:30–8:30 PM</strong> — Dinner</li>
<li><strong>9:00 AM next day</strong> — Breakfast &amp; check-out</li>
</ul>
<p>Note: as per Kerala Tourism rules, houseboats anchor by 5:00 PM and do not cruise at night. For a full breakdown, see our <a href="/blog/alleppey-houseboat-2-day-1-night-itinerary">2 day 1 night itinerary</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>What time is check-in and check-out on an Alleppey houseboat?</h3>
<p>Check-in is at 12:00 PM (noon) and check-out is at 9:00 AM the next morning — a standard overnight cruise.</p>

<h3>Does the houseboat AC run all night?</h3>
<p>It depends on the package. Standard runs AC roughly 8:30 PM–6:30 AM, Premium 5:30 PM–7:30 AM, and Semi Luxury has AC available all the time.</p>

<h3>Can I get early check-in or late check-out?</h3>
<p>It may be possible on request, subject to availability. Ask the operator when booking.</p>

<p>Planning the rest of your trip? Read the <a href="${PILLAR}">Kerala Houseboat Guide</a> and our <a href="/blog/what-to-pack-alleppey-houseboat-trip">packing checklist</a>.</p>

<h3>Ready to book your overnight cruise?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a> with instant confirmation.</p>
`,
  },
  {
    slug: "book-houseboat-direct-vs-otas-alleppey",
    title: "Book an Alleppey Houseboat Direct vs OTAs: Which Is Better?",
    excerpt: "Should you book an Alleppey houseboat directly or through an OTA like Booking.com? Here's an honest comparison of price, flexibility, communication and what booking direct actually saves.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "tips",
    tags: "book houseboat direct alleppey, houseboat without agent alleppey, book direct vs booking.com houseboat, alleppey houseboat direct booking, no commission houseboat kerala",
    content: `
<p>When booking an Alleppey houseboat, you can go directly through the operator's own website or through an online travel agency (OTA) like Booking.com, MakeMyTrip, or Goibibo. Both work — but they differ in price, flexibility, and how directly you can communicate. Here's an honest comparison.</p>

<h2>What Changes When You Book Direct?</h2>
<p>OTAs charge operators a commission, which is built into the price you see. Booking directly cuts out that middle layer, which typically means a better rate, more flexible terms, and a direct line to the people running the boat.</p>

<h2>Direct Booking — Advantages</h2>
<ul>
<li><strong>Best price</strong> — no OTA commission markup built into the rate</li>
<li><strong>Flexible payment</strong> — often a smaller advance (e.g. 20%), balance at the property</li>
<li><strong>Clearer cancellation terms</strong> — dealt with directly, not via a third party</li>
<li><strong>Direct communication</strong> — request add-ons (honeymoon décor, dietary needs) straight to the crew</li>
<li><strong>Date flexibility</strong> — easier to adjust when you talk to the operator directly</li>
</ul>

<h2>OTAs — Where They Help</h2>
<ul>
<li>Useful for discovery and comparing many operators quickly</li>
<li>Familiar checkout and buyer protection for first-time visitors</li>
<li>Consolidated reviews across many properties</li>
</ul>
<p>A sensible approach many travellers use: research and compare on OTAs, then book directly with the operator you like for the best rate and terms.</p>

<h2>What Booking Direct Saves You</h2>
<p>Exact savings vary, but avoiding OTA commission generally means either a lower price or more value (upgrades, flexibility) for the same price. Combined with our <strong>20% advance</strong> and <strong>free cancellation up to 7 days before check-in</strong>, direct booking is usually the better deal. See current rates on the <a href="/houseboat-prices">prices page</a> and estimate your total with the <a href="/houseboat-cost-calculator">cost calculator</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>Is it cheaper to book an Alleppey houseboat directly?</h3>
<p>Usually yes. OTAs build commission into their prices; booking directly with the operator avoids that markup and often comes with more flexible payment and cancellation terms.</p>

<h3>Is booking direct safe?</h3>
<p>Yes, when you book with a verified, well-reviewed operator through their official website with instant confirmation. Check reviews on Google and TripAdvisor first.</p>

<h3>Can I still compare options if I book direct?</h3>
<p>Absolutely — research on OTAs to compare, then book directly with your chosen operator for the best rate.</p>

<p>Learn more in our <a href="/blog/alleppey-houseboat-cancellation-policy">cancellation policy guide</a> and the full <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to book direct and save?</h3>
<p><a href="/booking">Book your Alleppey houseboat directly</a> for the best price, only 20% advance, and free cancellation up to 7 days before check-in.</p>
`,
  },
];

async function seed() {
  console.log("Publishing SEO batch 3 articles...");
  for (const a of articles) {
    await prisma.blogPost.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title, excerpt: a.excerpt, content: a.content,
        coverImage: a.coverImage, category: a.category, tags: a.tags,
        published: true, publishedAt: new Date(),
      },
      create: {
        ...a, author: "Kalappura Houseboats", published: true, publishedAt: new Date(),
      },
    });
    console.log(`  \u2713 ${a.title}`);
  }
  console.log(`Done! ${articles.length} articles published.`);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
