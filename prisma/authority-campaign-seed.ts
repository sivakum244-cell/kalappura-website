// ============================================================================
// KERALA HOUSEBOAT AUTHORITY CAMPAIGN — 5 articles
// Concepts 2-6 from the campaign brief (concept 1, the pillar guide, already
// exists at /blog/kerala-houseboat-guide).
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/authority-campaign-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  // ----------------------------------------------------------------------
  // 2) Houseboat Journey Planning Series
  // ----------------------------------------------------------------------
  {
    slug: "how-to-choose-kerala-houseboat-package",
    title: "How to Choose the Right Kerala Houseboat Package",
    excerpt:
      "Standard, Premium, Semi Luxury or Honeymoon? 1, 2 or 3 bedrooms? This planning guide helps you choose the right Alleppey houseboat package for a couple, family or group.",
    coverImage: "/images/gallery/interior-1.jpg",
    category: "travel",
    tags: "kerala houseboat package, how to choose houseboat alleppey, standard premium semi luxury houseboat, 1 2 3 bedroom houseboat, alleppey houseboat planning",
    content: `
<p>Choosing a Kerala houseboat is less about finding the "best" boat and more about finding the right one for your trip. The same boat that is perfect for a honeymoon can feel too small for a family, and the package that suits a quiet couple's cruise may be overkill for a short weekend trip.</p>
<p>This planning guide walks you through the two decisions that matter most — the <strong>package tier</strong> and the <strong>room layout</strong> — so you can self-select the right fit quickly. For the full picture of the backwater experience, start with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Step 1: Choose your package tier</h2>
<p>Kalappura offers Standard, Premium, Semi Luxury, and Honeymoon packages. The core experience — a private overnight cruise, onboard chef, and traditional Kerala design — stays the same. What changes is comfort, AC hours, food variety, and route length.</p>

<h3>Standard package</h3>
<p>Best for a simple, good-value overnight trip. AC runs at night, with a 5-stop cruise route and all meals included. Ideal for travellers who want the authentic experience without extras.</p>

<h3>Premium package</h3>
<p>The sensible middle ground. Extended AC hours, more non-vegetarian variety, and a longer 7-stop route. A good fit for families and small groups who want more comfort over a full day and night on board.</p>

<h3>Semi Luxury package</h3>
<p>All-time AC, premium food, and the extended route. Best when the boat is your room, dining space and deck for the whole stay and you want the most comfortable version of it.</p>

<h3>Honeymoon and special occasion</h3>
<p>Built around couples. Adds privacy-focused touches like flower decoration, candlelight dinner and cake. See the <a href="/honeymoon-houseboat-alleppey">honeymoon houseboat page</a> or our <a href="/blog/honeymoon-houseboat-kerala-backwaters">honeymoon on the backwaters guide</a>.</p>

<p>Compare all tiers side by side on the <a href="/houseboat-packages">houseboat packages page</a>, and estimate your total with the <a href="/houseboat-cost-calculator">cost calculator</a>.</p>

<h2>Step 2: Choose your room layout</h2>
<p>Pick the layout by how you will actually use the boat, not just by headcount.</p>
<ul>
<li><strong><a href="/rooms/suite-with-river-view">1 bedroom</a></strong> — intimate private stays for couples and solo travellers.</li>
<li><strong><a href="/rooms/double-twin-room-lake-view">2 bedroom</a></strong> — smaller families or close groups who want shared common space.</li>
<li><strong><a href="/rooms/standard-cabin-on-boat">3 bedroom</a></strong> — larger families and groups (up to 9 guests) travelling together.</li>
</ul>

<h2>Step 3: Overnight mindset, not day-trip mindset</h2>
<p>An overnight cruise is a mix of sailing, meals, and simply watching the banks go by. Travellers who expect constant movement are often surprised; the calmest part of the trip is usually the evening anchor. If you only have a few hours, a <a href="/day-cruise-houseboat-alleppey">day cruise</a> works — but the <a href="/overnight-houseboat">overnight stay</a> is the full experience.</p>

<h2>Frequently asked questions</h2>
<p><strong>Which package is best value?</strong><br>The Standard package for a simple overnight trip; Premium if you want more comfort over the full stay.</p>
<p><strong>How many bedrooms do I need?</strong><br>Roughly two adults per room. A couple needs 1, a family of four needs 2, a group of six or more needs 3.</p>
<p><strong>Can I upgrade the package later?</strong><br>Yes, subject to availability — just ask when you confirm.</p>

<h3>Ready to plan your trip?</h3>
<p>Match your group size and occasion to the right boat, then <a href="/booking">check availability and book direct</a>.</p>
`,
  },

  // ----------------------------------------------------------------------
  // 3) Honeymoon on the Backwaters
  // ----------------------------------------------------------------------
  {
    slug: "honeymoon-houseboat-kerala-backwaters",
    title: "Honeymoon Houseboat on the Kerala Backwaters",
    excerpt:
      "A private houseboat honeymoon on the Kerala backwaters — candlelight dinner, flower decoration, sunset cruise and complete privacy. Here's how to plan a romantic Alleppey stay.",
    coverImage: "/images/gallery/sunset-1.jpg",
    category: "travel",
    tags: "honeymoon houseboat kerala, romantic houseboat alleppey, honeymoon backwaters, candlelight dinner houseboat, honeymoon package alleppey",
    content: `
<p>Few honeymoon settings feel as private as a houseboat drifting through the Kerala backwaters. There are no corridors, no neighbours, and no front desk — just the two of you, the water, and a crew that stays quietly in the background.</p>
<p>This guide covers how to plan a honeymoon houseboat stay on the Kerala backwaters, what makes it romantic, and how to add the special touches. For the wider picture, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Why a houseboat suits a honeymoon</h2>
<p>A private overnight cruise gives couples something most hotels can't: total privacy in a constantly changing, beautiful setting. You watch the sunset from your own deck, have dinner cooked just for you, and wake up to mist over the water.</p>
<p>The <a href="/rooms/suite-with-river-view">1 bedroom houseboat</a> is designed for exactly this — the whole boat is yours, with a private bedroom, attached bathroom and open deck.</p>

<h2>Romantic touches you can add</h2>
<ul>
<li><strong>Flower decoration</strong> in the bedroom on arrival</li>
<li><strong>Candlelight dinner</strong> on the deck</li>
<li><strong>Celebration cake</strong> for anniversaries or just because</li>
<li><strong>A quiet sunset cruise</strong> before the boat anchors for the night</li>
</ul>
<p>These are part of Kalappura's honeymoon and special occasion packages — request them when you book. Details are on the <a href="/honeymoon-houseboat-alleppey">honeymoon houseboat page</a>.</p>

<h2>Best time for a romantic cruise</h2>
<p>December to February brings the coolest, clearest weather — ideal for evenings on the deck. The monsoon months (June to September) are quieter and more dramatic, with lush green banks and the lowest rates, if you don't mind some rain.</p>

<h2>Planning it as a gift</h2>
<p>A houseboat honeymoon also works as a gift for a couple. You can arrange the booking and the special-occasion extras in advance, then hand over the confirmation. Reach out on <a href="/booking">the booking page</a> or WhatsApp to arrange it.</p>

<h2>Frequently asked questions</h2>
<p><strong>Is the boat fully private for couples?</strong><br>Yes — the 1 bedroom houseboat is booked privately, so the whole boat is yours.</p>
<p><strong>Can you arrange decorations and a cake?</strong><br>Yes, with advance notice as part of the honeymoon or special occasion package.</p>
<p><strong>Is one night enough for a honeymoon cruise?</strong><br>One overnight stay captures the full sunset-to-sunrise experience; multi-night stays are available for a longer escape.</p>

<h3>Plan your honeymoon cruise</h3>
<p><a href="/booking">Check availability and book a private honeymoon houseboat</a> with best price guarantee and flexible cancellation.</p>
`,
  },

  // ----------------------------------------------------------------------
  // 4) Family and Group Backwater Escape
  // ----------------------------------------------------------------------
  {
    slug: "family-group-houseboat-alleppey-backwater-escape",
    title: "Family & Group Houseboat in Alleppey: A Backwater Escape",
    excerpt:
      "How Kerala houseboats work for families and groups — private 2 and 3 bedroom boats, shared meals, space for kids, and tips for planning a group backwater trip in Alleppey.",
    coverImage: "/images/gallery/dining-1.jpg",
    category: "travel",
    tags: "family houseboat alleppey, group houseboat alleppey, 2 bedroom houseboat, 3 bedroom houseboat, family backwater trip kerala, group booking houseboat",
    content: `
<p>Most houseboat content leans romantic, but Alleppey houseboats are just as good for families and groups. A private boat with two or three bedrooms gives everyone room to spread out, share meals together, and enjoy the backwaters without the logistics of a big group hotel booking.</p>
<p>This guide covers how a family or group houseboat trip works and how to choose the right boat. For the full picture, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Why a houseboat works for families and groups</h2>
<p>A private overnight cruise bundles accommodation, meals and sightseeing into one experience — no moving between a hotel and restaurants, no separate transport. Everyone stays together on the same boat, with shared deck and dining space for meals and conversation.</p>

<h2>Choosing the right boat size</h2>
<ul>
<li><strong><a href="/rooms/double-twin-room-lake-view">2 bedroom houseboat</a></strong> — a small family or a close group of up to 6. Two private bedrooms plus a shared living and dining area.</li>
<li><strong><a href="/rooms/standard-cabin-on-boat">3 bedroom houseboat</a></strong> — larger or joint families and groups up to 9. The most shared common space.</li>
</ul>
<p>For groups larger than 9, multiple boats can cruise the same route together. See all options on the <a href="/alleppey-houseboats">Alleppey houseboats page</a>.</p>

<h2>Travelling with kids</h2>
<p>Children are welcome. Life jackets are provided, children under 5 stay free, and ages 6–11 are charged a small per-night fee. The onboard chef can prepare milder, kid-friendly food — just mention it when booking.</p>

<h2>Meals for the whole group</h2>
<p>All meals are cooked fresh onboard: lunch, evening tea and snacks, dinner, and breakfast. Vegetarian, non-vegetarian and dietary needs (Jain, no-spice, allergies) can all be accommodated for a mixed group. See our <a href="/blog/what-food-served-alleppey-houseboat">food menu guide</a>.</p>

<h2>Planning a group booking</h2>
<p>Send your dates, group size and any dietary needs so the right boat and meal plan can be arranged. Booking direct keeps it simple and gives the best group rate — see <a href="/blog/direct-booking-advantage-alleppey-houseboat">the direct booking advantage</a>.</p>

<h2>Frequently asked questions</h2>
<p><strong>How many people fit on one houseboat?</strong><br>Up to 6 on a 2 bedroom and up to 9 on a 3 bedroom boat.</p>
<p><strong>Is it safe for children?</strong><br>Yes — life jackets are provided and the boat anchors safely at night with the crew onboard.</p>
<p><strong>Can a large group get multiple boats together?</strong><br>Yes, multiple boats can cruise the same route for groups over 9.</p>

<h3>Plan your family or group escape</h3>
<p><a href="/booking">Check availability and book a 2 or 3 bedroom houseboat</a> for your group.</p>
`,
  },

  // ----------------------------------------------------------------------
  // 5) The Alleppey Backwaters, Explained
  // ----------------------------------------------------------------------
  {
    slug: "alleppey-backwaters-explained",
    title: "The Alleppey Backwaters, Explained",
    excerpt:
      "What are the Alleppey backwaters? A simple guide to Vembanad Lake, Kuttanad canals, the villages and wildlife you'll see, and how to experience them on a Kerala houseboat cruise.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "travel",
    tags: "alleppey backwaters, kerala backwaters explained, vembanad lake, kuttanad canals, houseboat cruise kerala, backwater routes alleppey",
    content: `
<p>People often hear the phrase "Kerala backwaters" without a clear picture of what it means. This guide explains what the Alleppey backwaters actually are, what you'll see, and how a houseboat cruise lets you experience them. For planning and prices, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>What are the backwaters?</h2>
<p>The backwaters are a connected network of lakes, rivers, canals and lagoons running parallel to the Arabian Sea coast. Around Alleppey (Alappuzha), they form one of the densest and most scenic parts of the whole system — which is why it's the heart of Kerala houseboat tourism.</p>

<h2>Vembanad Lake</h2>
<p>The largest lake in Kerala and the open-water centrepiece of an Alleppey cruise. Wide horizons, big skies, and the best sunsets. Read more on the <a href="/vembanad-lake-houseboat">Vembanad Lake houseboat page</a>.</p>

<h2>Kuttanad — the Rice Bowl of Kerala</h2>
<p>One of the few places on earth where farming happens below sea level. Cruising Kuttanad, you pass green paddy fields, bunds and village canals. More on the <a href="/kuttanad-houseboat">Kuttanad houseboat page</a>.</p>

<h2>Village canals and Kainakari</h2>
<p>The narrow canals around Kainakari are where the backwaters feel most intimate — you glide past homes, small churches and temples, people fishing, and children waving from the banks. See the <a href="/kainakari-houseboat">Kainakari route page</a>.</p>

<h2>Wildlife you'll see</h2>
<p>Kingfishers, cormorants, egrets and herons are common along the water, especially in the early morning. The quieter village stretches are the best for birdwatching from the deck.</p>

<h2>How to experience it</h2>
<p>The backwaters are best seen slowly, from the deck of a private houseboat. A full <a href="/overnight-houseboat">overnight cruise</a> takes you from the open lake into the village canals and back, with meals and an evening anchor along the way. Explore the full destination on the <a href="/alleppey-backwaters">Alleppey backwaters page</a>.</p>

<h2>Frequently asked questions</h2>
<p><strong>What is the best part of the backwaters to see?</strong><br>A good cruise combines open Vembanad Lake views with the narrow Kainakari village canals — the contrast is the highlight.</p>
<p><strong>Can you see the backwaters in one day?</strong><br>A day cruise gives a taste, but an overnight stay shows the full day-to-night change in scenery and light.</p>
<p><strong>Is Alleppey better than Kumarakom for backwaters?</strong><br>Alleppey has the widest choice of routes and boats. See our <a href="/alleppey-vs-kumarakom">Alleppey vs Kumarakom comparison</a>.</p>

<h3>See the backwaters for yourself</h3>
<p><a href="/booking">Book a houseboat cruise</a> and experience Vembanad, Kuttanad and the village canals from the water.</p>
`,
  },

  // ----------------------------------------------------------------------
  // 6) Direct Booking Advantage
  // ----------------------------------------------------------------------
  {
    slug: "direct-booking-advantage-alleppey-houseboat",
    title: "The Direct Booking Advantage for Alleppey Houseboats",
    excerpt:
      "Why booking your Alleppey houseboat direct beats agents and OTAs — best price guarantee, flexible cancellation, no middleman mark-up, and a clearer, simpler booking.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "travel",
    tags: "book houseboat direct alleppey, best price guarantee houseboat, houseboat booking without agent, direct booking advantage, alleppey houseboat cancellation",
    content: `
<p>Once you've decided a Kerala houseboat is right for you, the last decision is how to book it. Booking direct with the operator is almost always the better choice — here's why. For the full category overview, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Why book direct instead of through an agent or OTA?</h2>
<p>Agents and online travel agencies add a mark-up and sit between you and the people who actually run the boat. Booking direct removes that layer, which usually means a better price and clearer communication about the boat, route and inclusions.</p>

<h2>What you get booking direct with Kalappura</h2>
<ul>
<li><strong>Best price guarantee</strong> — no agent commission baked into the rate</li>
<li><strong>Flexible cancellation</strong> — free cancellation up to 7 days before check-in</li>
<li><strong>Only 20% advance</strong> to confirm, balance at the property</li>
<li><strong>Direct communication</strong> about boat, package, route and dietary needs</li>
<li><strong>Help with arrival</strong> — airport and station pickup on request</li>
</ul>

<h2>How to compare before you book</h2>
<p>Don't compare on headline price alone. Check what each quote actually includes — room count, meals, route length, AC hours and cancellation terms. A cheaper quote with fewer inclusions is not really cheaper. Our <a href="/houseboat-prices">prices page</a> lists transparent rates, and the <a href="/houseboat-cost-calculator">cost calculator</a> estimates your total.</p>
<p>For a deeper comparison of booking channels, see <a href="/blog/book-houseboat-direct-vs-otas-alleppey">direct vs OTAs for Alleppey houseboats</a>.</p>

<h2>Frequently asked questions</h2>
<p><strong>Is booking direct really cheaper?</strong><br>Usually yes — you avoid the agent/OTA commission that's otherwise added to the rate.</p>
<p><strong>What is the cancellation policy?</strong><br>Free cancellation up to 7 days before check-in when you book direct with Kalappura.</p>
<p><strong>How much do I pay upfront?</strong><br>Just 20% advance to confirm; the balance is paid at the property.</p>

<h3>Book the right houseboat, directly</h3>
<p>You've learned the category — now <a href="/booking">book direct</a> for the best price and flexible terms.</p>
`,
  },
];

async function seed() {
  console.log("Publishing Kerala Houseboat Authority Campaign articles...");
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
