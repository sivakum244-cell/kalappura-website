// ============================================================================
// NEW BLOG BATCH 11 — 10 articles
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/blog-batch-11-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  {
    slug: "alleppey-houseboat-vs-resort-kumarakom",
    title: "Alleppey Houseboat vs a Kumarakom Resort: Which to Pick?",
    excerpt:
      "Torn between an Alleppey houseboat and a Kumarakom backwater resort? An honest comparison of privacy, views, food, cost and who each option suits best.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "travel",
    tags: "alleppey houseboat vs resort, kumarakom resort vs houseboat, kerala backwater stay comparison, houseboat or resort kerala",
    content: `
<p>Both put you on the Kerala backwaters, but the experience is very different. A houseboat moves with you through the water; a resort keeps you in one beautiful spot. Here's how to choose. For the full category overview, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Privacy and space</h2>
<p>A private houseboat is entirely yours — no shared corridors or restaurants. A resort offers more room to roam on land but shares common areas. If privacy is the priority, the houseboat wins.</p>

<h2>Views and movement</h2>
<p>On a houseboat the scenery constantly changes as you cruise from <a href="/vembanad-lake-houseboat">Vembanad Lake</a> into village canals. A resort gives one fixed (often lovely) view. See the <a href="/alleppey-vs-kumarakom">Alleppey vs Kumarakom comparison</a> for the destinations themselves.</p>

<h2>Food</h2>
<p>Houseboat meals are cooked fresh onboard and included — see the <a href="/blog/alleppey-houseboat-food-experience">food experience</a>. Resorts offer more variety and dining venues.</p>

<h2>Cost</h2>
<p>For a couple, a private 1 bedroom houseboat can be excellent value since everything's included. Compare current <a href="/houseboat-prices">houseboat prices</a>.</p>

<h2>Who each suits</h2>
<p>Choose the houseboat for a private, once-in-a-lifetime cruise; choose a resort for a longer, stay-put holiday. Many travellers do both — a resort night plus an <a href="/overnight-houseboat">overnight houseboat</a>.</p>

<h3>Ready to cruise?</h3>
<p><a href="/booking">Book a private Alleppey houseboat</a> and see the backwaters from the water.</p>
`,
  },
  {
    slug: "alleppey-houseboat-booking-timeline",
    title: "How Far in Advance to Book an Alleppey Houseboat",
    excerpt:
      "When should you book your Alleppey houseboat? A simple timeline by season — peak, shoulder and monsoon — so you lock in the right boat at the best rate.",
    coverImage: "/images/gallery/drone-1.jpg",
    category: "travel",
    tags: "when to book alleppey houseboat, houseboat booking advance, book houseboat early, alleppey houseboat availability",
    content: `
<p>Book too late and the best boats are gone; book at the right time and you get your pick at a better rate. Here's a simple timeline. For planning essentials, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Peak season (December–February)</h2>
<p>Book 3–6 weeks ahead, and even earlier for Christmas and New Year — those dates sell out first. See our <a href="/blog/alleppey-houseboat-christmas-new-year-2026">festive season guide</a>.</p>

<h2>Shoulder months (March–May, Sept–Nov)</h2>
<p>1–3 weeks ahead is usually fine. Good weather returning and more availability.</p>

<h2>Monsoon (June–September)</h2>
<p>You can often book just days ahead and still get the lowest rates of the year — see the <a href="/blog/alleppey-houseboat-monsoon-season-guide">monsoon guide</a>.</p>

<h2>Weekends vs weekdays</h2>
<p>Weekends fill faster and cost more everywhere. If your dates flex, a weekday cruise is easier to book and better value — compare on the <a href="/houseboat-prices">prices page</a>.</p>

<h3>Lock in your dates</h3>
<p><a href="/booking">Check availability and book direct</a> with only 20% advance.</p>
`,
  },
  {
    slug: "alleppey-houseboat-cost-per-person",
    title: "Alleppey Houseboat Cost Per Person: How to Work It Out",
    excerpt:
      "Houseboats are priced per room, not per person — so how much is it each? A simple way to work out the per-person cost of an Alleppey houseboat for your group.",
    coverImage: "/images/gallery/blog-cover.jpg",
    category: "travel",
    tags: "alleppey houseboat cost per person, houseboat price per head, split houseboat cost, cheap houseboat per person",
    content: `
<p>A common confusion: houseboats are priced <strong>per room per night</strong>, not per person. That's actually good news for groups. Here's how to work out the per-person cost. For the full pricing picture, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>The simple maths</h2>
<p>Take the boat's nightly rate, add 18% GST, then divide by the number of guests. Because the price is per room, the more people share the boat, the lower the cost each.</p>

<h2>Why groups get the best value</h2>
<p>A full <a href="/rooms/standard-cabin-on-boat">3 bedroom boat</a> for 9 guests splits far cheaper per head than a <a href="/rooms/suite-with-river-view">1 bedroom boat</a> for two. For larger parties, see <a href="/group-booking">group booking</a>.</p>

<h2>What's already included</h2>
<p>Remember the per-person figure covers accommodation, all meals, and the cruise — not just a bed. That makes it better value than it first looks.</p>

<h2>Estimate it instantly</h2>
<p>Use the <a href="/houseboat-cost-calculator">cost calculator</a> to get a total with GST, then divide by your group size. Current rates are on the <a href="/houseboat-prices">prices page</a>.</p>

<h3>Get your group quote</h3>
<p><a href="/booking">Book direct</a> for the best per-person rate.</p>
`,
  },
  {
    slug: "alleppey-houseboat-couples-vs-family-boat",
    title: "Couple or Family? Choosing the Right Alleppey Houseboat",
    excerpt:
      "The right Alleppey houseboat depends on who's travelling. A quick guide to picking a boat for a couple, a family with kids, or a group of friends.",
    coverImage: "/images/gallery/interior-1.jpg",
    category: "travel",
    tags: "houseboat for couples vs family, choose houseboat alleppey, family houseboat, couple houseboat, group houseboat",
    content: `
<p>The same boat that's perfect for honeymooners can feel tight for a family. Matching the boat to your travel party is the single most important choice. Here's a quick guide. See also the <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>For couples</h2>
<p>A private <a href="/rooms/suite-with-river-view">1 bedroom houseboat</a> is ideal — the whole boat to yourselves, river views, and a private deck. Add romantic touches with the <a href="/honeymoon-houseboat-alleppey">honeymoon package</a>.</p>

<h2>For families with kids</h2>
<p>A <a href="/rooms/double-twin-room-lake-view">2 bedroom boat</a> gives parents and children separate space plus a shared living area. Life jackets are provided and the chef can make milder food — see the <a href="/blog/family-group-houseboat-alleppey-backwater-escape">family guide</a>.</p>

<h2>For groups of friends</h2>
<p>A <a href="/rooms/standard-cabin-on-boat">3 bedroom boat</a> (up to 9) keeps everyone together with the most shared deck and dining space. For 10+, see <a href="/group-booking">group booking</a>.</p>

<h2>Rule of thumb</h2>
<p>Roughly two adults per bedroom. Beyond that, think about how much shared space you'll want in the evening, not just where everyone sleeps.</p>

<h3>Pick your boat</h3>
<p><a href="/booking">Check availability and book</a> the right houseboat for your group.</p>
`,
  },
  {
    slug: "alleppey-houseboat-what-not-to-expect",
    title: "Alleppey Houseboat: What NOT to Expect",
    excerpt:
      "Setting expectations straight before your Alleppey houseboat trip — the common myths about night cruising, hotel-style service and non-stop movement, explained honestly.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "travel",
    tags: "alleppey houseboat myths, houseboat expectations, what not to expect houseboat, honest houseboat guide",
    content: `
<p>A houseboat trip is wonderful — but a few common expectations can trip people up. Knowing what <em>not</em> to expect makes the real experience even better. For the complete picture, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Don't expect the boat to cruise all night</h2>
<p>By regulation, houseboats anchor by evening. Nights are still and quiet — which is the point. See the <a href="/blog/what-to-expect-alleppey-houseboat-overnight">overnight walkthrough</a>.</p>

<h2>Don't expect a big hotel buffet</h2>
<p>Meals are a set spread of fresh Kerala dishes cooked to order, not a buffet with endless choice. Most guests love it — see the <a href="/blog/alleppey-houseboat-food-experience">food experience</a>.</p>

<h2>Don't expect constant sightseeing</h2>
<p>The cruise is about slowing down, not ticking off attractions. The scenery and the pace <em>are</em> the experience.</p>

<h2>Don't expect to check in early</h2>
<p>Boarding is at noon and checkout is 9 AM the next day — plan your arrival around it.</p>

<h2>Don't expect to book cheapest = best</h2>
<p>Compare inclusions, not just price. A slightly higher quote with better food, route and AC can be far better value. See <a href="/blog/alleppey-houseboat-booking-mistakes">booking mistakes to avoid</a>.</p>

<h3>Now you're ready</h3>
<p><a href="/booking">Book your houseboat</a> knowing exactly what to expect.</p>
`,
  },
  {
    slug: "alleppey-houseboat-rainy-day-activities",
    title: "What to Do on an Alleppey Houseboat When It Rains",
    excerpt:
      "Rain on your houseboat day? It's not a washout. Here's what to do — and why a rainy Alleppey backwater cruise can be one of the most atmospheric of all.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "travel",
    tags: "alleppey houseboat rain, rainy day houseboat, monsoon houseboat activities, houseboat when it rains",
    content: `
<p>Rain doesn't cancel a houseboat trip — the boat is built for it, with a covered deck and dining area. In fact, a rainy cruise is quiet, green and atmospheric. Here's how to enjoy it. See also the <a href="/blog/alleppey-houseboat-monsoon-season-guide">monsoon season guide</a> and the <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Watch the rain from the covered deck</h2>
<p>There's something special about watching rain sweep across the backwaters with a hot tea in hand. The covered deck keeps you dry while you take it in.</p>

<h2>Enjoy a long, slow meal</h2>
<p>Rainy spells are perfect for lingering over the onboard Kerala meals the crew prepares fresh.</p>

<h2>Photography</h2>
<p>Overcast light and misty banks make for moody, beautiful shots — see our <a href="/blog/alleppey-backwater-sunrise-sunset">light and photography guide</a>.</p>

<h2>Just slow down</h2>
<p>Rain is the ultimate cue to do nothing — read, nap, and let the backwaters drift past. It's the trip at its most restful.</p>

<h3>Embrace the green season</h3>
<p><a href="/booking">Book a monsoon houseboat</a> for lush scenery and the best rates.</p>
`,
  },
  {
    slug: "alleppey-houseboat-phone-free-digital-detox",
    title: "A Phone-Free Houseboat: Digital Detox on the Backwaters",
    excerpt:
      "An Alleppey houseboat is the perfect place to switch off. How to plan a phone-free, digital-detox cruise and why the slow pace of the backwaters makes it easy.",
    coverImage: "/images/gallery/sunset-1.jpg",
    category: "travel",
    tags: "digital detox houseboat, phone free holiday kerala, slow travel alleppey, unplug backwaters",
    content: `
<p>Between the slow cruise, the quiet evening anchor and the lack of anywhere to rush to, a houseboat is one of the easiest places to put your phone down. Here's how to make a cruise a genuine reset. For planning, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Why the backwaters make it easy</h2>
<p>There's no itinerary to manage and nothing to book minute-to-minute. The pace does the work — see what an <a href="/blog/what-to-expect-alleppey-houseboat-overnight">overnight stay</a> actually feels like.</p>

<h2>Simple ground rules</h2>
<ul>
<li>Agree a "phones away" window with your group</li>
<li>Use the camera only for sunrise and sunset</li>
<li>Let the crew handle the plan — that's their job</li>
<li>Bring a book instead of a screen</li>
</ul>

<h2>What you'll notice instead</h2>
<p>Birdsong, the change of light, the smell of lunch cooking, village life drifting past. The quiet is the luxury.</p>

<h2>Good to know</h2>
<p>Signal does work on most of the route if you need it — so a detox is a choice, not a constraint.</p>

<h3>Switch off on the water</h3>
<p><a href="/booking">Book an overnight houseboat</a> and give yourself a real break.</p>
`,
  },
  {
    slug: "alleppey-houseboat-local-village-experiences",
    title: "Local Village Life You'll See from an Alleppey Houseboat",
    excerpt:
      "The best part of an Alleppey cruise is the everyday village life along the canals. Here's what you'll see — and how to experience local Kuttanad culture from the water.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "travel",
    tags: "alleppey village life, kuttanad culture houseboat, local experience backwaters, village canals alleppey",
    content: `
<p>The open lake is beautiful, but it's the narrow village canals that make an Alleppey cruise unforgettable — real daily life, up close, from the deck. Here's what to look for. See also the <a href="/blog/alleppey-backwaters-explained">backwaters explained</a> and the <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Everyday life along the banks</h2>
<p>As the boat slips into the <a href="/kainakari-houseboat">Kainakari</a> canals you'll pass people fishing, washing clothes by the water, children heading to school by canoe, and small shops and toddy stalls.</p>

<h2>The Rice Bowl of Kerala</h2>
<p>Cruising <a href="/kuttanad-houseboat">Kuttanad</a>, you see farming below sea level — green paddy fields held back by bunds, a landscape found almost nowhere else.</p>

<h2>Churches, temples and festivals</h2>
<p>Small churches and temples line the waterways, and if you're lucky you'll catch a local festival or a snake-boat crew practising.</p>

<h2>How to experience it respectfully</h2>
<p>Wave back, ask the crew about what you're seeing, and keep noise low in the villages. The slow, quiet boat is what lets you get this close.</p>

<h3>See the real backwaters</h3>
<p><a href="/booking">Book a cruise</a> that includes the village canals, not just the lake.</p>
`,
  },
  {
    slug: "alleppey-houseboat-best-deck-time",
    title: "Making the Most of Deck Time on Your Alleppey Houseboat",
    excerpt:
      "The open deck is where the houseboat magic happens. How to make the most of deck time on an Alleppey cruise — the best hours, what to bring, and what to watch for.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "travel",
    tags: "houseboat deck alleppey, best time on houseboat deck, houseboat views, alleppey cruise deck tips",
    content: `
<p>The bedrooms are comfortable, but the open deck is the heart of a houseboat. It's where you'll watch the backwaters go by, eat, and relax. Here's how to make the most of it. For the essentials, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>The best hours on deck</h2>
<p>Late afternoon into sunset, and the first hour after sunrise, are the finest — soft light, cooler air, and the most wildlife. See the <a href="/blog/alleppey-backwater-sunrise-sunset">sunrise and sunset guide</a>.</p>

<h2>What to bring up</h2>
<ul>
<li>Sunglasses and a hat for the afternoon</li>
<li>A light layer for the cool evening</li>
<li>Your camera for the golden hour</li>
<li>A book for the slow spells</li>
</ul>

<h2>What to watch for</h2>
<p>Kingfishers on the stakes, village life on the banks, other boats, and the shift from open lake to narrow canal. The scenery is always changing.</p>

<h2>Deck meals</h2>
<p>Ask to have tea or dinner served on the deck when the weather's good — it's the best seat on the boat.</p>

<h3>Claim your spot on deck</h3>
<p><a href="/booking">Book an overnight houseboat</a> and enjoy the view.</p>
`,
  },
  {
    slug: "alleppey-houseboat-return-guest-guide",
    title: "Been Before? A Return Guest's Guide to Alleppey Houseboats",
    excerpt:
      "Already cruised the Alleppey backwaters once? Here's how to make a return houseboat trip feel fresh — new routes, longer stays, different seasons and boat types.",
    coverImage: "/images/gallery/drone-1.jpg",
    category: "travel",
    tags: "return houseboat trip alleppey, second houseboat visit, repeat alleppey cruise, new houseboat experience",
    content: `
<p>If you've already done the classic overnight cruise, a second trip can be even better — because now you can tailor it. Here's how returning guests keep it fresh. For the basics, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Try a different season</h2>
<p>If you went in winter, see the backwaters in the <a href="/blog/alleppey-houseboat-monsoon-season-guide">monsoon</a> — totally different mood, lush and quiet, at the lowest rates.</p>

<h2>Stay longer</h2>
<p>Add a night. A <a href="/blog/alleppey-houseboat-2-night-itinerary">2 night cruise</a> reaches quieter canals a single night can't.</p>

<h2>Change the boat</h2>
<p>Travelled as a couple last time? Bring the family on a <a href="/rooms/double-twin-room-lake-view">2 bedroom</a> or <a href="/rooms/standard-cabin-on-boat">3 bedroom boat</a>, or treat yourselves to the <a href="/luxury-houseboats">luxury option</a>.</p>

<h2>Explore deeper</h2>
<p>Ask the crew for the <a href="/blog/alleppey-houseboat-local-village-experiences">village canal routes</a> and quieter stretches you may have missed.</p>

<h3>Come back to the backwaters</h3>
<p><a href="/booking">Book your return cruise</a> — and make it a new experience.</p>
`,
  },
];

async function seed() {
  console.log("Publishing new blog batch 11 (10 articles)...");
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
