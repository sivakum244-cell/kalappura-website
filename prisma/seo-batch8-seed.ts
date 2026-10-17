// ============================================================================
// SEO BATCH 8 SEED — 5 new articles (3D2N itinerary, AC vs non-AC, inclusions, instagram spots, worth it)
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seo-batch8-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  {
    slug: "alleppey-houseboat-3-days-2-nights-itinerary",
    title: "Alleppey Houseboat 3 Days 2 Nights Itinerary: The Complete Plan",
    excerpt: "A complete 3 day, 2 night Alleppey itinerary built around a houseboat — day by day, from arrival to departure, blending backwater cruising with beaches, canoe tours and local sights.",
    coverImage: "/images/gallery/drone-1.jpg",
    category: "travel",
    tags: "alleppey 3 days 2 nights, alleppey houseboat itinerary, 3 day alleppey plan, alleppey 2 night houseboat, kerala backwater itinerary, alleppey travel plan",
    content: `
<p>Two nights in Alleppey gives you the perfect balance: a full houseboat experience plus time to explore the town and backwaters at a relaxed pace. Here's a complete 3 day, 2 night itinerary.</p>

<h2>Day 1 — Arrival &amp; Alleppey Town</h2>
<ul>
<li><strong>Morning:</strong> Arrive in Alleppey (see <a href="/blog/how-to-reach-alleppey-houseboat">how to reach Alleppey</a>) and check into a hotel or homestay.</li>
<li><strong>Afternoon:</strong> Visit Mullakkal temple and market, then relax at Alleppey Beach and pier.</li>
<li><strong>Evening:</strong> Sunset at the beach and a local Kerala dinner.</li>
</ul>

<h2>Day 2 — The Houseboat Cruise (Overnight)</h2>
<ul>
<li><strong>12:00 PM:</strong> Board your private <a href="/alleppey-houseboats">houseboat</a> and set off with a fresh lunch onboard.</li>
<li><strong>Afternoon:</strong> Cruise the backwaters — <a href="/vembanad-lake-houseboat">Vembanad Lake</a>, canals and paddy fields. Add a <a href="/kainakari-houseboat">village canoe tour</a>.</li>
<li><strong>5:00 PM:</strong> Anchor for the night; enjoy tea, snacks and a stunning <a href="/blog/alleppey-houseboat-sunset-cruise-guide">sunset</a>.</li>
<li><strong>Evening:</strong> Dinner on the deck under the stars, then a peaceful backwater night.</li>
</ul>

<h2>Day 3 — Sunrise, Breakfast &amp; Departure</h2>
<ul>
<li><strong>7:00 AM:</strong> Wake to mist and birdsong, morning cruise, and breakfast onboard.</li>
<li><strong>9:00 AM:</strong> Check out from the houseboat.</li>
<li><strong>Late morning:</strong> Optional Kuttanad paddy-field drive or last-minute shopping before you leave.</li>
</ul>

<h2>Tips for This Itinerary</h2>
<ul>
<li>Book the houseboat for the middle night so you have relaxed arrival and departure days.</li>
<li>Travel off-peak for better rates — see the <a href="/blog/best-time-alleppey-houseboat">best time to visit</a>.</li>
<li>Prefer a single overnight instead? See our <a href="/blog/alleppey-houseboat-2-day-1-night-itinerary">2 day 1 night itinerary</a>.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Is 3 days enough for Alleppey?</h3>
<p>Yes. Three days with two nights lets you enjoy a full overnight houseboat cruise plus the town, beach and backwater sights at a relaxed pace.</p>

<h3>How many nights should I spend on the houseboat?</h3>
<p>One night onboard is the classic experience. In a 3-day trip, spend the middle night on the boat and the other nights on land.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to plan your trip?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "alleppey-houseboat-ac-non-ac-difference",
    title: "AC vs Non-AC Alleppey Houseboat: What's the Real Difference?",
    excerpt: "AC or non-AC Alleppey houseboat? Here's the real difference in comfort, cost and AC timing — and how to choose the right option for the Kerala backwater climate.",
    coverImage: "/images/gallery/bedroom-1.jpg",
    category: "tips",
    tags: "ac vs non ac houseboat, alleppey houseboat ac, non ac houseboat kerala, houseboat ac timing, best houseboat ac alleppey, ac houseboat difference",
    content: `
<p>One of the first choices when booking is AC or non-AC. It affects comfort, price, and how you sleep. Here's the real difference so you can pick the right option for Kerala's warm climate.</p>

<h2>The Key Thing: AC Timing</h2>
<p>On most Alleppey houseboats, the AC does <strong>not</strong> run 24 hours. Because boats anchor at night and run AC on a generator, air conditioning is typically available for the night sleeping hours (commonly around 9 PM to 6 AM). During the day, the open deck and natural breeze on the water keep you cool. Always confirm the exact AC hours for your boat and package.</p>

<h2>AC Houseboat — Pros &amp; Cons</h2>
<ul>
<li><strong>Pros:</strong> comfortable, cool sleep at night; better in summer and for kids/elderly.</li>
<li><strong>Cons:</strong> costs more; AC usually runs only during set night hours.</li>
</ul>

<h2>Non-AC Houseboat — Pros &amp; Cons</h2>
<ul>
<li><strong>Pros:</strong> cheaper; the breeze off the water is naturally cooling, especially in cooler months.</li>
<li><strong>Cons:</strong> can feel warm and humid at night in summer.</li>
</ul>

<h2>Which Should You Choose?</h2>
<ul>
<li><strong>Choose AC</strong> for summer (Mar-May), for families with young kids, elderly guests, or if you simply sleep better cool. All Kalappura boats include an AC bedroom.</li>
<li><strong>Non-AC can be fine</strong> in the cooler, breezier months (Nov-Feb) if you're on a tight budget.</li>
</ul>
<p>See how comfort maps to our tiers on the <a href="/houseboat-packages">packages page</a> and current rates on the <a href="/houseboat-prices">prices page</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>Does the AC run all night on an Alleppey houseboat?</h3>
<p>Usually for set night hours (often around 9 PM to 6 AM) rather than 24/7, because it runs on a generator while anchored. Confirm the exact hours for your boat when booking.</p>

<h3>Is an AC houseboat worth it?</h3>
<p>In summer or with kids and elderly guests, yes — cool night sleep makes a big difference. In cooler months, non-AC can be comfortable thanks to the breeze off the water.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to book a comfortable boat?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "alleppey-houseboat-what-is-included",
    title: "What's Included in an Alleppey Houseboat Package? (Full List)",
    excerpt: "Exactly what's included in an Alleppey houseboat package — meals, AC, crew, the cruise — and what's usually extra, so you know precisely what you're paying for before you book.",
    coverImage: "/images/gallery/dining-1.jpg",
    category: "tips",
    tags: "what is included alleppey houseboat, houseboat package inclusions, alleppey houseboat meals included, houseboat what you get, houseboat inclusions exclusions, alleppey package details",
    content: `
<p>Before booking, it helps to know exactly what your money covers. A houseboat package bundles a lot into one price — here's the full list of what's included and what's usually extra.</p>

<h2>What's Included</h2>
<ul>
<li><strong>The whole private boat</strong> — bedroom(s), bathroom(s), living area and open deck</li>
<li><strong>AC bedroom</strong> (usually during set night hours)</li>
<li><strong>All meals</strong> — lunch, evening tea &amp; snacks, dinner and next-day breakfast, cooked fresh onboard</li>
<li><strong>Welcome drink</strong> on arrival</li>
<li><strong>The cruise</strong> — an afternoon backwater cruise and overnight stay</li>
<li><strong>Full crew</strong> — captain, an assistant, and an onboard chef</li>
<li><strong>Fuel and standard operating costs</strong></li>
</ul>
<p>For the meal detail, see our <a href="/blog/alleppey-houseboat-food-menu-veg-nonveg">food menu guide</a>.</p>

<h2>What's Usually Extra</h2>
<ul>
<li><strong>GST (18%)</strong> as applicable</li>
<li><strong>Extra guests / child charges</strong> beyond the room's base occupancy</li>
<li><strong>Package upgrades</strong> (Premium / Semi Luxury) for more amenities and food variety</li>
<li><strong>Add-ons</strong> — canoe tours, honeymoon decoration, cake, special requests</li>
<li><strong>Alcohol</strong> (not provided; policies vary — ask when booking)</li>
<li><strong>Travel to/from Alleppey</strong> and any tips for the crew (optional)</li>
</ul>
<p>For a full cost picture, see our <a href="/blog/alleppey-houseboat-budget-cost-breakdown">budget breakdown</a> or use the <a href="/houseboat-cost-calculator">cost calculator</a>.</p>

<h2>How Packages Differ</h2>
<p>Higher tiers add more comfort, amenities and food variety. Compare Standard, Premium and Semi Luxury on the <a href="/houseboat-packages">packages page</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>Are meals included in an Alleppey houseboat?</h3>
<p>Yes — lunch, evening snacks, dinner and next-day breakfast are all included and cooked fresh onboard.</p>

<h3>What is not included?</h3>
<p>Typically GST, extra-guest charges, package upgrades, optional add-ons, alcohol, travel to Alleppey and crew tips.</p>

<h3>Is the whole boat private?</h3>
<p>Yes — when you book the boat (or a room on a larger boat) you get private space; all Kalappura boats are private charters.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to book?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "alleppey-houseboat-instagram-photo-spots",
    title: "Alleppey Houseboat Instagram Spots: Where to Get the Best Photos",
    excerpt: "The most photogenic moments and spots on an Alleppey houseboat trip — from sunset decks to paddy-field canals — plus simple tips for Instagram-worthy backwater photos.",
    coverImage: "/images/gallery/sunset-1.jpg",
    category: "experience",
    tags: "alleppey houseboat instagram, alleppey photo spots, houseboat photography alleppey, instagrammable kerala backwaters, best photos alleppey houseboat, kerala backwater photo",
    content: `
<p>An Alleppey houseboat trip is endlessly photogenic. Here are the best spots and moments for standout photos, plus a few simple tips to capture the backwaters at their best.</p>

<h2>The Best Photo Spots &amp; Moments</h2>
<ul>
<li><strong>The open deck at golden hour</strong> — you, the boat, and the glowing backwaters. The classic shot.</li>
<li><strong>Sunset over Vembanad Lake</strong> — wide open water and dramatic colour; boats anchor by 5 PM for an uninterrupted view (see the <a href="/blog/alleppey-houseboat-sunset-cruise-guide">sunset guide</a>).</li>
<li><strong>Palm-lined canals</strong> — the boat framed by coconut palms reflecting on still water.</li>
<li><strong>Kuttanad paddy fields</strong> — vivid green fields lining the water in the <a href="/kuttanad-houseboat">Kuttanad region</a>.</li>
<li><strong>Village canals by canoe</strong> — up-close, authentic scenes in <a href="/kainakari-houseboat">Kainakari</a>.</li>
<li><strong>Sunrise mist</strong> — soft, dreamy morning light over the water.</li>
<li><strong>The food spread</strong> — a Kerala sadhya or fresh karimeen fry makes a great flat-lay.</li>
</ul>

<h2>Quick Tips for Great Shots</h2>
<ul>
<li>Shoot at golden hour (early morning and just before sunset) for the best light.</li>
<li>Include the deck railing or boat edge for a sense of place.</li>
<li>Use reflections on the still water for symmetry.</li>
<li>Keep your phone/camera secure near the water's edge.</li>
</ul>
<p>For camera settings and timing, see our full <a href="/blog/alleppey-houseboat-photography-guide">houseboat photography guide</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>What's the most Instagrammable spot on a houseboat?</h3>
<p>The open deck at golden hour, and sunset over Vembanad Lake — both give that classic, glowing backwater shot.</p>

<h3>When is the best light for photos?</h3>
<p>Early morning (sunrise mist) and the hour before sunset, when the light is soft and golden.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to capture it yourself?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "is-alleppey-houseboat-worth-it",
    title: "Is an Alleppey Houseboat Worth It? An Honest Look",
    excerpt: "Is an Alleppey houseboat actually worth it? An honest look at the experience, cost and who it suits — plus how to make sure you get real value from your Kerala backwater trip.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "tips",
    tags: "is alleppey houseboat worth it, alleppey houseboat worth, houseboat value kerala, alleppey houseboat review, worth booking houseboat, kerala backwater worth it",
    content: `
<p>It's a fair question before spending on a trip: is an Alleppey houseboat actually worth it? Here's an honest look at the experience, the value, and who it suits best.</p>

<h2>The Short Answer</h2>
<p>For most travellers, yes. A private houseboat is a genuinely unique experience — you get an entire boat, all meals, and a slow cruise through some of India's most beautiful scenery, all bundled into one price. Few holidays feel this relaxing.</p>

<h2>What Makes It Worth It</h2>
<ul>
<li><strong>All-inclusive value:</strong> the boat, four meals, crew and cruise are in one package — see <a href="/blog/alleppey-houseboat-what-is-included">what's included</a>.</li>
<li><strong>Privacy:</strong> the boat is yours — no crowds, no shared spaces.</li>
<li><strong>The scenery:</strong> palm-lined canals, paddy fields, and sunsets over Vembanad Lake.</li>
<li><strong>Effortless:</strong> everything comes to you; no rushing between sights.</li>
</ul>

<h2>Who It's Best For</h2>
<ul>
<li><strong>Couples &amp; honeymooners</strong> — privacy and romance (see <a href="/honeymoon-houseboat-alleppey">honeymoon options</a>)</li>
<li><strong>Families</strong> — space, safety and freshly cooked meals</li>
<li><strong>Nature lovers</strong> — birdlife and calm waterways</li>
</ul>

<h2>When It Might Not Suit You</h2>
<p>If you want fast-paced sightseeing, nightlife, or lots of activities, a slow overnight cruise may feel too quiet — a <a href="/day-cruise-houseboat-alleppey">day cruise</a> might suit better. It's about pace, not quality.</p>

<h2>How to Make Sure You Get Value</h2>
<ul>
<li><strong>Book direct</strong> to avoid agent mark-ups — see <a href="/blog/why-book-houseboat-direct">why book direct</a>.</li>
<li>Fill the boat with a group to lower the per-person cost.</li>
<li>Travel off-peak for better rates (see <a href="/blog/best-time-alleppey-houseboat">best time to visit</a>).</li>
<li>Confirm inclusions, AC hours and the route before booking.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Is an Alleppey houseboat worth the money?</h3>
<p>For most travellers, yes — the boat, all meals, crew and cruise are included, and the private experience is genuinely unique. Book direct and off-peak for the best value.</p>

<h3>Is one night enough?</h3>
<p>One overnight is the classic experience and enough to enjoy the full cruise, sunset, dinner and sunrise. Add nights on land if you want to see more of the area.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to experience it?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
];

async function seed() {
  console.log("Publishing SEO batch 8 articles...");
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
