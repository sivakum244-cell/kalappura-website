// ============================================================================
// SEO BATCH 7 SEED — 5 new articles (elderly, cruise route, honeymoon decor, budget, day-in-the-life)
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seo-batch7-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  {
    slug: "alleppey-houseboat-for-elderly-parents",
    title: "Alleppey Houseboat for Elderly Parents: A Comfortable, Easy Guide",
    excerpt: "Planning an Alleppey houseboat trip with elderly parents or senior travellers? Here's how to make it comfortable and safe — boarding, AC comfort, food, mobility and the right boat to choose.",
    coverImage: "/images/gallery/interior-1.jpg",
    category: "tips",
    tags: "alleppey houseboat for elderly, houseboat for senior citizens kerala, houseboat for parents, comfortable houseboat alleppey, houseboat for old age, accessible houseboat kerala",
    content: `
<p>An Alleppey houseboat is one of the most relaxing, low-effort holidays in India — which makes it a wonderful choice for elderly parents and senior travellers. With a little planning, it's comfortable, calm, and easy. Here's how to make it perfect for them.</p>

<h2>Why It Suits Senior Travellers</h2>
<p>Unlike a sightseeing trip with lots of walking, a houseboat comes to you. Your parents sit back on a comfortable deck while the scenery drifts by. There's no rushing, no crowds, and everything — bedroom, bathroom, dining, deck — is a few steps away on one boat.</p>

<h2>Choosing the Right Boat</h2>
<ul>
<li><strong>AC bedroom:</strong> essential for comfortable rest in Kerala's warm climate — every Kalappura boat has an AC bedroom.</li>
<li><strong>1 bedroom boat for a couple:</strong> the <a href="/rooms/suite-with-river-view">1 bedroom houseboat</a> keeps everything close and private.</li>
<li><strong>Bigger boat for a family:</strong> a <a href="/rooms/double-twin-room-lake-view">2 bedroom</a> or <a href="/rooms/standard-cabin-on-boat">3 bedroom</a> boat lets you travel together and keep an eye on elderly parents.</li>
</ul>

<h2>Boarding &amp; Mobility Tips</h2>
<ul>
<li>Boarding is from a jetty onto the boat — mention limited mobility in advance so the crew can assist and pick an easy jetty.</li>
<li>Move slowly on the deck; the crew is on hand to help.</li>
<li>Pack any regular medicines, and keep them in your day bag.</li>
<li>Bring comfortable non-slip footwear.</li>
</ul>

<h2>Food &amp; Comfort</h2>
<p>Meals are freshly cooked onboard, and you can request mild, less-spicy, or specific food for older guests — just note it when booking. See our <a href="/blog/alleppey-houseboat-food-menu-veg-nonveg">food menu guide</a>.</p>

<h2>Best Time to Go</h2>
<p>For the gentlest weather, choose <strong>November to February</strong> — cool, dry, and pleasant. See our <a href="/blog/best-time-alleppey-houseboat">best time to visit guide</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>Is a houseboat suitable for elderly parents?</h3>
<p>Yes. It's a calm, low-effort holiday with everything on one boat, an AC bedroom for rest, and freshly cooked food. Mention any mobility needs in advance so the crew can assist with boarding.</p>

<h3>Can the food be made less spicy for seniors?</h3>
<p>Yes. You can request mild or specific meals when booking, and note any dietary needs or allergies.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to book a comfortable trip?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "best-houseboat-cruise-route-alleppey",
    title: "Best Houseboat Cruise Route in Alleppey: Where Do You Actually Go?",
    excerpt: "Where does an Alleppey houseboat actually cruise? Here's a clear guide to the backwater routes — Punnamada, Vembanad Lake, Kuttanad and the village canals — and what you'll see along the way.",
    coverImage: "/images/gallery/drone-1.jpg",
    category: "travel",
    tags: "alleppey houseboat route, houseboat cruise route alleppey, where do houseboats go alleppey, backwater cruise route kerala, punnamada vembanad route, alleppey houseboat itinerary route",
    content: `
<p>One of the most common questions before booking is simple: where does the houseboat actually go? Here's a clear guide to the Alleppey backwater cruise routes and what you'll see along the way.</p>

<h2>How Houseboat Cruising Works</h2>
<p>Most boats board around noon and cruise through the afternoon, then anchor by 5:00 PM (Kerala Tourism rules mean no cruising after dark). So your route is an afternoon loop through the backwaters near Alleppey, returning to a quiet anchoring spot for the night.</p>

<h2>The Main Areas You Cruise</h2>
<ul>
<li><strong>Punnamada &amp; the town canals:</strong> the classic starting stretch, home of the <a href="/blog/nehru-trophy-boat-race-guide">Nehru Trophy Boat Race</a>.</li>
<li><strong>Vembanad Lake:</strong> the wide open <a href="/vembanad-lake-houseboat">largest lake in Kerala</a> — big skies and spectacular sunsets.</li>
<li><strong>Kuttanad backwaters:</strong> the famous below-sea-level <a href="/kuttanad-houseboat">paddy region</a>, lush green fields lining the water.</li>
<li><strong>Village canals (Kainakari):</strong> narrower waterways past <a href="/kainakari-houseboat">village life</a> — often explored by a small canoe.</li>
</ul>

<h2>What You'll See</h2>
<p>Palm-lined canals, paddy fields, village homes, churches and temples, fishermen at work, and abundant birdlife. It's the everyday rhythm of the backwaters, up close.</p>

<h2>Big Boat vs Canoe</h2>
<p>Large houseboats cruise the wider canals and lake. To reach the narrowest village waterways, many trips add a small canoe tour — the best way to get deep into the backwaters.</p>

<h2>Note on Routes</h2>
<p>Exact routes depend on the operator, boat size, water levels, and package. Confirm your specific cruise route and any canoe add-on when booking.</p>

<h2>Frequently Asked Questions</h2>
<h3>Where do Alleppey houseboats cruise?</h3>
<p>Through the backwaters near Alleppey — typically Punnamada, Vembanad Lake, the Kuttanad paddy region and village canals — before anchoring for the night by 5 PM.</p>

<h3>Does the houseboat cruise at night?</h3>
<p>No. Boats anchor by around 5:00 PM per Kerala Tourism rules, so cruising happens during the day and you enjoy a peaceful anchored evening.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to cruise the backwaters?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "alleppey-houseboat-honeymoon-decoration-ideas",
    title: "Alleppey Houseboat Honeymoon Decoration Ideas: Make It Romantic",
    excerpt: "Planning a romantic houseboat honeymoon in Alleppey? Here are decoration and surprise ideas — flower decor, candlelight dinner, cake, and how to arrange them for the perfect backwater celebration.",
    coverImage: "/images/gallery/bedroom-1.jpg",
    category: "experience",
    tags: "alleppey houseboat honeymoon decoration, romantic houseboat decoration, honeymoon houseboat flower decoration, candlelight dinner houseboat, romantic surprise houseboat alleppey, honeymoon backwater kerala",
    content: `
<p>A private houseboat is already one of the most romantic settings in India — and a few thoughtful touches turn it into an unforgettable honeymoon. Here are decoration and surprise ideas for your Alleppey backwater celebration.</p>

<h2>Flower Decoration</h2>
<p>The classic honeymoon touch: fresh flower petals arranged on the bed and around the AC bedroom, often as a heart or "welcome" design. It's the most-requested addition and instantly sets a romantic mood.</p>

<h2>Candlelight Dinner on the Deck</h2>
<p>Dinner is cooked fresh onboard — arrange for a candlelight setup on your private deck, under the stars, over the still backwaters. Add your favourite Kerala dishes; see the <a href="/blog/alleppey-houseboat-food-menu-veg-nonveg">food menu guide</a>.</p>

<h2>Cake &amp; Celebration</h2>
<p>Celebrating an anniversary or a special milestone too? A cake can be arranged onboard — see our <a href="/blog/alleppey-houseboat-anniversary-celebration">anniversary celebration guide</a> for more ideas.</p>

<h2>Other Romantic Touches</h2>
<ul>
<li>A "Happy Honeymoon" banner or simple balloon decoration in the room</li>
<li>Welcome drink and evening tea served on the deck at sunset</li>
<li>A private sunset moment — boats anchor by 5 PM, so you get an uninterrupted view (see our <a href="/blog/alleppey-houseboat-sunset-cruise-guide">sunset guide</a>)</li>
</ul>

<h2>Which Boat for a Honeymoon?</h2>
<p>The <a href="/rooms/suite-with-river-view">1 bedroom private houseboat</a> is ideal — the whole boat to yourselves, a private deck, and river views. For extra comfort, see our <a href="/luxury-houseboats">luxury houseboats</a> and our full <a href="/honeymoon-houseboat-alleppey">honeymoon houseboat page</a>.</p>

<h2>How to Arrange It</h2>
<p>Request decorations and surprises <strong>at the time of booking</strong> so the crew can prepare in advance. Some add-ons may carry a small charge — confirm details and timing when you book.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can I get flower decoration on a honeymoon houseboat?</h3>
<p>Yes. Flower bed decoration is the most popular honeymoon request. Arrange it when booking so the crew can prepare it before you board.</p>

<h3>Is a candlelight dinner possible on the boat?</h3>
<p>Yes. Dinner is cooked onboard and can be set up as a candlelight dinner on your private deck. Mention it in advance.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to plan a romantic honeymoon?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "alleppey-houseboat-budget-cost-breakdown",
    title: "Alleppey Houseboat Budget: A Realistic Cost Breakdown for Your Trip",
    excerpt: "How much does an Alleppey houseboat trip really cost? A realistic budget breakdown — boat, meals, extras, taxes and travel — so you can plan your Kerala backwater trip with no surprises.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "tips",
    tags: "alleppey houseboat budget, houseboat cost breakdown, alleppey houseboat price, how much houseboat kerala, houseboat trip budget, cheap houseboat alleppey cost",
    content: `
<p>Planning a trip budget? A houseboat is often better value than people expect, because so much is included. Here's a realistic cost breakdown so you can plan your Alleppey trip with no surprises.</p>

<h2>What's Usually Included</h2>
<p>An overnight houseboat package typically bundles a lot into one price:</p>
<ul>
<li>Private AC bedroom(s) and the whole boat's common areas</li>
<li>All meals — lunch, evening snacks, dinner and breakfast</li>
<li>The afternoon cruise and overnight stay</li>
<li>Crew, captain and onboard chef</li>
</ul>

<h2>The Main Cost: The Boat</h2>
<p>Price depends on the number of bedrooms, the package tier, and the season. A 1 bedroom boat is the most affordable; larger boats cost more but split well across a group. Peak season (Dec-Jan, festivals) is priciest; the monsoon is cheapest. See live pricing on our <a href="/houseboat-prices">houseboat prices page</a> and compare tiers on the <a href="/houseboat-packages">packages page</a>.</p>

<h2>Common Extras to Budget For</h2>
<ul>
<li><strong>Extra guests / child charges</strong> beyond the room's base occupancy</li>
<li><strong>Package upgrade</strong> (Premium / Semi Luxury) for more amenities and food variety</li>
<li><strong>GST (18%)</strong> as applicable on the booking</li>
<li><strong>Add-ons</strong> like a canoe tour or honeymoon decoration</li>
<li><strong>Travel to Alleppey</strong> (train/flight/taxi) — see <a href="/blog/how-to-reach-alleppey-houseboat">how to reach Alleppey</a></li>
<li><strong>Tips</strong> for the crew (optional, appreciated)</li>
</ul>

<h2>How to Get the Best Value</h2>
<ul>
<li>Travel in shoulder or monsoon season for lower rates</li>
<li>Fill the boat — cost per person drops with a bigger group</li>
<li><strong>Book direct</strong> to avoid agent mark-ups — see <a href="/blog/why-book-houseboat-direct">why book direct</a></li>
<li>Book early for peak dates to lock in availability and price</li>
</ul>
<p>Want an exact figure? Use our <a href="/houseboat-cost-calculator">houseboat cost calculator</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>How much does an Alleppey houseboat cost?</h3>
<p>It varies by bedrooms, package and season. The 1 bedroom boat is most affordable, and most meals and the cruise are included. Check the <a href="/houseboat-prices">prices page</a> for current rates.</p>

<h3>Are meals included in the price?</h3>
<p>Yes — an overnight package includes lunch, evening snacks, dinner and breakfast, cooked onboard.</p>

<h3>How can I make it cheaper?</h3>
<p>Travel off-peak, fill the boat with a group, and book direct to avoid agent commissions.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to see prices and book?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
  {
    slug: "day-in-the-life-alleppey-houseboat",
    title: "A Day in the Life on an Alleppey Houseboat: Hour by Hour",
    excerpt: "What is a day on an Alleppey houseboat actually like? Follow an hour-by-hour walk through a real backwater cruise — from noon boarding to next-morning check-out — so you know exactly what to expect.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "experience",
    tags: "day on alleppey houseboat, houseboat experience alleppey, what happens on a houseboat, alleppey houseboat day schedule, backwater cruise experience, houseboat routine kerala",
    content: `
<p>Wondering what a houseboat day actually feels like? Here's an hour-by-hour walk through a typical overnight Alleppey backwater cruise, so you know exactly what to expect.</p>

<h2>12:00 PM — Boarding</h2>
<p>You arrive at the jetty and step aboard your private houseboat. The crew welcomes you with a fresh welcome drink, shows you the AC bedroom, bathroom, dining area and open deck, and you settle in.</p>

<h2>12:30 PM — Cruise Begins &amp; Lunch</h2>
<p>The boat casts off and glides into the backwaters. Soon after, a freshly cooked Kerala lunch is served onboard — rice, curries, thoran, and the local karimeen fish if you like (see the <a href="/blog/alleppey-houseboat-food-menu-veg-nonveg">food menu guide</a>).</p>

<h2>1:30-4:30 PM — The Afternoon Cruise</h2>
<p>The heart of the trip. You drift past palm-lined canals, paddy fields, and village life, across open stretches of <a href="/vembanad-lake-houseboat">Vembanad Lake</a>. Relax on the deck, nap, read, or simply watch the backwaters go by. Some trips add a small canoe tour into the narrow <a href="/kainakari-houseboat">village canals</a>.</p>

<h2>4:30 PM — Evening Tea &amp; Snacks</h2>
<p>Tea, coffee and hot snacks like banana fritters are served as the light turns golden.</p>

<h2>5:00 PM — Anchoring &amp; Sunset</h2>
<p>By 5:00 PM the boat anchors for the night (Kerala Tourism rules — no cruising after dark). You watch an unhurried sunset over the still water from your deck — often the highlight of the trip. See our <a href="/blog/alleppey-houseboat-sunset-cruise-guide">sunset guide</a>.</p>

<h2>7:30-8:30 PM — Dinner</h2>
<p>A relaxed dinner cooked fresh onboard, under the stars. Couples can request a candlelight setup — see <a href="/honeymoon-houseboat-alleppey">honeymoon options</a>. Afterwards, the quiet backwater night is remarkably peaceful.</p>

<h2>7:00 AM Next Day — Sunrise &amp; Breakfast</h2>
<p>Wake to mist over the water and birdsong. The boat may cruise a little more in the morning, and breakfast — dosa, puttu, idli or eggs — is served.</p>

<h2>9:00 AM — Check-out</h2>
<p>The cruise winds back to the jetty for a 9:00 AM check-out, relaxed and recharged.</p>

<h2>Frequently Asked Questions</h2>
<h3>What time do you board and check out?</h3>
<p>Boarding is around 12:00 PM (noon) and check-out is 9:00 AM the next morning.</p>

<h3>Does the boat move all night?</h3>
<p>No. It anchors by around 5:00 PM and stays put through the peaceful night, cruising again briefly in the morning.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to experience it yourself?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
];

async function seed() {
  console.log("Publishing SEO batch 7 articles...");
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
