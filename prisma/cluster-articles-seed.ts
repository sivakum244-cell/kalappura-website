// ============================================================================
// CLUSTER ARTICLES SEED — Supporting articles linking to the pillar guide
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/cluster-articles-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  {
    slug: "alleppey-houseboat-price-2026",
    title: "Alleppey Houseboat Price 2026: Complete Rate Guide",
    excerpt: "How much does an Alleppey houseboat cost in 2026? Full breakdown of prices by boat size, package, weekday vs weekend rates, and what's included.",
    coverImage: "/images/gallery/blog-cover.jpg",
    category: "tips",
    tags: "Alleppey houseboat price, houseboat cost, Kerala houseboat price, houseboat rates 2026",
    content: `
<p>One of the first questions every traveller asks is: how much does an Alleppey houseboat cost? Prices vary by boat size, package, and season. This guide gives you the complete 2026 rate breakdown so you can plan your budget with confidence.</p>

<h2>Starting Prices by Package</h2>
<p>At Kalappura Houseboats, all prices are per room per night and include meals, AC, and the backwater cruise (18% GST applies):</p>
<ul>
<li><strong>Standard Package</strong> — from ₹15,000/room/night</li>
<li><strong>Premium Package</strong> — from ₹19,000/room/night</li>
<li><strong>Semi Luxury Package</strong> — from ₹24,000/room/night</li>
</ul>

<h2>What Changes the Price?</h2>
<ul>
<li><strong>Boat size:</strong> 1, 2, or 3 bedroom — you pay per room, so a couple booking one room pays less than a family booking three.</li>
<li><strong>Package level:</strong> Standard, Premium, or Semi Luxury (differences in AC hours, food variety, and cruise route length).</li>
<li><strong>Day of week:</strong> Weekend rates (Friday–Saturday) are slightly higher than weekdays.</li>
<li><strong>Season:</strong> Peak season (Dec–Feb) is highest; monsoon (Jun–Sep) offers the best value.</li>
</ul>

<h2>What's Included in the Price</h2>
<ul>
<li>Overnight cruise (12 PM to 9 AM next day)</li>
<li>All meals: lunch, evening tea & snacks, dinner, breakfast</li>
<li>Air-conditioned bedroom(s)</li>
<li>Private bathroom, onboard crew, backwater cruise</li>
<li>Free parking at the dock</li>
</ul>

<h2>Additional Charges</h2>
<ul>
<li>18% GST on the total</li>
<li>Children 6–11: ₹1,000/night; under 5: free</li>
<li>Extra bed: ₹1,000/night</li>
</ul>

<h2>How to Get the Best Price</h2>
<p>Book directly with the operator rather than through OTAs — you avoid commission markups and often get free cancellation and flexible payment (20% advance). Travelling in the monsoon season can save you up to 30%.</p>

<p>For live rates on your exact dates, see our <a href="/houseboat-prices">houseboat prices page</a>, or read our full <a href="${PILLAR}">Kerala Houseboat Guide</a> for everything you need to know before booking.</p>

<h3>Ready to check prices?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a> with instant confirmation.</p>
`,
  },
  {
    slug: "day-cruise-vs-overnight-houseboat-alleppey",
    title: "Day Cruise vs Overnight Houseboat in Alleppey: Which Should You Choose?",
    excerpt: "Day cruise or overnight houseboat in Alleppey? Compare both experiences — duration, meals, cost, and what you see — to decide which is right for your trip.",
    coverImage: "/images/gallery/blog-cover.jpg",
    category: "tips",
    tags: "day cruise Alleppey, overnight houseboat, Alleppey houseboat, backwater cruise",
    content: `
<p>When planning a Kerala backwater trip, one big decision is whether to take a day cruise or stay overnight on a houseboat. Both have their place — here's how to decide.</p>

<h2>Day Cruise</h2>
<p>A day cruise typically lasts a few hours. You board, cruise through part of the backwaters, maybe have a meal, and return the same day. It's a good option if you're short on time or just want a quick taste of the backwaters.</p>
<p><strong>Downsides:</strong> You miss the sunset, the peaceful evening at anchor, the night on the water, and the misty sunrise — which are the most magical parts of the experience.</p>

<h2>Overnight Houseboat Stay</h2>
<p>An overnight stay is the complete experience. At Kalappura, you check in at 12 PM, cruise all afternoon, anchor at a scenic spot by 5 PM, enjoy dinner and a quiet night on the water, then wake up to a beautiful backwater morning before checking out at 9 AM.</p>
<p><strong>What you get:</strong> All four meals, an AC bedroom, sunset and sunrise views, and roughly 21 hours on the water — versus just a few hours on a day cruise.</p>

<h2>Which Is Better Value?</h2>
<p>Per hour of experience, the overnight stay offers far better value because it includes accommodation, all meals, and the full day-to-night cycle. For most travellers, one overnight stay is the sweet spot.</p>

<h2>Our Recommendation</h2>
<p>If you've travelled all the way to Kerala, do the overnight stay — it's what makes a houseboat trip unforgettable. Learn more on our <a href="/overnight-houseboat">overnight houseboat page</a>, or read the full <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to book?</h3>
<p><a href="/booking">Book your overnight Alleppey houseboat</a> today.</p>
`,
  },
  {
    slug: "alleppey-houseboat-vs-hotel",
    title: "Alleppey Houseboat vs Hotel: Which Is the Better Choice?",
    excerpt: "Houseboat or hotel in Alleppey? Compare the experience, privacy, food, views, and value to decide the best way to stay in Kerala's backwaters.",
    coverImage: "/images/gallery/blog-cover.jpg",
    category: "tips",
    tags: "Alleppey houseboat vs hotel, Kerala accommodation, houseboat stay, backwater hotel",
    content: `
<p>When visiting Alleppey, you can stay in a hotel/resort or on a houseboat. Both are good — but they offer very different experiences. Here's how to choose.</p>

<h2>The Houseboat Experience</h2>
<p>A houseboat is a moving, private accommodation on the water. You cruise through changing scenery, enjoy meals prepared fresh onboard, and wake up surrounded by backwaters. It's private (the whole boat is yours), immersive, and uniquely Keralan.</p>
<ul>
<li>Constantly changing views as you cruise</li>
<li>Complete privacy — no shared corridors or lobbies</li>
<li>All meals included and cooked onboard</li>
<li>Sunset and sunrise directly over the water</li>
</ul>

<h2>The Hotel Experience</h2>
<p>A hotel or resort is stationary. You get a fixed view, more space, and amenities like a pool or spa. It's better if you want to stay several nights in one place or prefer land-based comforts.</p>
<ul>
<li>More space and facilities (pool, gym, spa)</li>
<li>Better for longer stays</li>
<li>Fixed location and view</li>
</ul>

<h2>Which Should You Choose?</h2>
<p>For a first Kerala visit, a houseboat is the signature experience you can't get anywhere else. Many travellers do both — a night on a houseboat for the experience, plus a hotel for the rest of their stay. Since houseboat stays are typically one night, they combine perfectly with a hotel booking.</p>

<h2>Best of Both</h2>
<p>Do an overnight houseboat cruise with Kalappura, then continue to a hotel afterward. You get the unforgettable backwater experience without giving up land comforts for your whole trip.</p>

<p>Read our full <a href="${PILLAR}">Kerala Houseboat Guide</a> for everything you need to know, or <a href="/alleppey-houseboats">explore our houseboats</a>.</p>

<h3>Ready to experience the backwaters?</h3>
<p><a href="/booking">Book your Alleppey houseboat</a> now.</p>
`,
  },
  {
    slug: "best-houseboat-routes-alleppey",
    title: "Best Houseboat Routes in Alleppey: What You'll See on the Backwaters",
    excerpt: "Discover the best houseboat routes around Alleppey — from Vembanad Lake to the village canals of Kuttanad. Here's what you'll actually see on your cruise.",
    coverImage: "/images/gallery/blog-cover.jpg",
    category: "travel",
    tags: "Alleppey houseboat routes, Vembanad Lake, Kuttanad, backwater cruise route, Kerala backwaters",
    content: `
<p>The backwaters around Alleppey (Alappuzha) offer some of the most scenic cruising in India. Here's what you'll actually experience on the main routes — not just place names, but the sights and moments that make each stretch special.</p>

<h2>Vembanad Lake</h2>
<p>One of the largest lakes in India, Vembanad offers wide open water and expansive views. Cruising here feels peaceful and vast — you'll see other houseboats gliding in the distance, fishermen casting nets, and beautiful reflections at sunset.</p>

<h2>Punnamada Lake</h2>
<p>Famous as the venue for the Nehru Trophy Boat Race, Punnamada is a scenic stretch with open water and a sense of history. In race season, you may see practice runs of the iconic snake boats.</p>

<h2>Kainakari & Kuppappuram Village Canals</h2>
<p>This is where the backwater experience gets intimate. The boat moves through narrow canals lined with coconut palms, past homes, small churches and temples, and daily village life — people washing clothes by the water, children waving, and paddy fields stretching into the distance.</p>

<h2>Kuttanad — The Rice Bowl of Kerala</h2>
<p>Kuttanad is one of the few places in the world where farming happens below sea level. Cruising through, you'll see vast green paddy fields, bunds holding back the water, and a way of life shaped entirely by the backwaters.</p>

<h2>Extended Routes (Premium & Semi Luxury)</h2>
<p>With Premium and Semi Luxury packages, the route extends to include Meenappally Lake and Village and Pallathuruthi, giving you more time on the water and more variety of scenery.</p>

<h2>What Makes a Good Route</h2>
<p>The best routes balance open lake views with narrow village canals — the lakes give you the grand scenery, while the canals give you the authentic, up-close village experience. Kalappura's cruises are designed to include both.</p>

<p>For the complete picture, read our <a href="${PILLAR}">Kerala Houseboat Guide</a>, or <a href="/alleppey-houseboats">view our houseboats</a> and their cruise routes.</p>

<h3>Ready to cruise the backwaters?</h3>
<p><a href="/booking">Book your Alleppey houseboat</a> and experience these routes yourself.</p>
`,
  },
];

async function seed() {
  console.log("Publishing cluster articles...");
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
    console.log(`  ✓ ${a.title}`);
  }
  console.log("Done!");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
