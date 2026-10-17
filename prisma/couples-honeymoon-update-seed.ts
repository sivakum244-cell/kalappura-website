// ============================================================================
// COUPLES & HONEYMOON UPDATE SEED — enriches existing
// "alleppey-houseboat-romantic-couples-guide" and broadens meta to cover
// the "couples & honeymoon" keyword. Same slug — avoids cannibalization.
// Run from project root: node node_modules/ts-node/dist/bin.js prisma/couples-honeymoon-update-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  {
    slug: "alleppey-houseboat-romantic-couples-guide",
    title: "Best Houseboat in Alleppey for Couples & Honeymoon",
    excerpt: "Planning a Kerala honeymoon? Discover how to choose a private Alleppey houseboat for couples, including rooms, food, cruise duration and romantic experiences.",
    coverImage: "/images/gallery/bedroom-1.jpg",
    category: "experience",
    tags: "best houseboat in alleppey for couples, alleppey houseboat for honeymoon, romantic houseboat alleppey, couple getaway kerala, private houseboat couples, honeymoon backwater kerala",
    content: `
<p>Few places are as romantic as the Kerala backwaters, and a private houseboat is made for two. Whether it's a honeymoon, anniversary, or just a getaway, here's how couples can make the most of it.</p>

<h2>Why Choose a Houseboat for a Kerala Honeymoon?</h2>
<p>A honeymoon is about spending time together, and the Kerala backwaters provide a naturally peaceful setting. A private houseboat combines accommodation, cruising, food, scenic views, privacy, sunset and an overnight stay — all in one experience.</p>

<h2>Choose the Right Boat</h2>
<p>Couples usually prefer a private houseboat rather than a shared arrangement. The <a href="/rooms/suite-with-river-view">1 bedroom private houseboat</a> is ideal for two — the entire boat to yourselves, a private deck, and river views, with complete privacy. For couples wanting more space, or travelling with another couple, the <a href="/rooms/double-twin-room-lake-view">2 bedroom option</a> may suit better. For extra comfort, see our <a href="/luxury-houseboats">luxury houseboats</a>.</p>

<h2>Day Cruise or Overnight?</h2>
<p>For couples, an overnight stay provides more time to enjoy the experience. A typical experience may include:</p>
<p><strong>Afternoon boarding &rarr; backwater cruise &rarr; sunset &rarr; dinner &rarr; overnight stay &rarr; morning views</strong></p>
<p>Prefer a shorter option? See our <a href="/day-cruise-houseboat-alleppey">day cruise page</a>.</p>

<h2>Romantic Touches to Arrange</h2>
<ul>
<li>Flower bed decoration in the AC bedroom</li>
<li>A candlelight dinner on your private deck</li>
<li>A cake for a special occasion</li>
<li>A welcome drink at sunset</li>
</ul>
<p>See full ideas in our <a href="/blog/alleppey-houseboat-honeymoon-decoration-ideas">decoration ideas guide</a> — arrange these when booking.</p>

<h2>The Most Romantic Moments</h2>
<p>You don't need an elaborate itinerary. Some of the most memorable moments are simple:</p>
<ul>
<li><strong>Sunset from the deck</strong> — boats anchor by 5 PM for an uninterrupted view (see the <a href="/blog/alleppey-houseboat-sunset-cruise-guide">sunset guide</a>).</li>
<li>Dinner together under the stars on the quiet, anchored boat.</li>
<li>Photographing the backwaters.</li>
<li>Sitting on the deck as village life drifts by.</li>
<li>Waking up to sunrise mist over the water.</li>
</ul>

<h2>Honeymoon Food</h2>
<p>Couples can enjoy freshly cooked Kerala cuisine during the cruise. If you have dietary requirements, communicate them during booking. See our <a href="/blog/alleppey-houseboat-food-menu-veg-nonveg">food menu guide</a>.</p>

<h2>Anniversary and Birthday Celebrations</h2>
<p>A private houseboat is also ideal for:</p>
<ul>
<li>Anniversaries</li>
<li>Birthdays</li>
<li>Proposals</li>
<li>Couple trips</li>
<li>Special celebrations</li>
</ul>
<p>Ask the operator what celebration arrangements are available before booking. See our <a href="/blog/alleppey-houseboat-anniversary-celebration">anniversary celebration guide</a>.</p>

<h2>Best Time for a Couple's Houseboat Trip</h2>
<p>Couples can visit throughout the year. The cooler travel season (Nov-Feb) is popular for comfortable weather, while the monsoon offers a greener, more atmospheric setting. See <a href="/blog/alleppey-houseboat-monsoon-vs-winter">monsoon vs winter</a>.</p>

<h2>Privacy Note</h2>
<p>Book the whole boat (or the 1 bedroom) so it's just the two of you — no shared spaces. See <a href="/blog/private-vs-shared-houseboat-alleppey">private vs shared</a>. For a dedicated page, visit our <a href="/honeymoon-houseboat-alleppey">honeymoon houseboat page</a>.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is an Alleppey houseboat good for honeymoon?</h3>
<p>Yes. A private houseboat provides couples with a peaceful, private and distinctive Kerala experience — romantic sunsets, dinner under the stars, and river views.</p>

<h3>Which houseboat is suitable for couples?</h3>
<p>A private 1-bedroom houseboat is the common choice for couples — the whole boat to yourselves.</p>

<h3>Is overnight better for a honeymoon?</h3>
<p>Yes. An overnight stay gives couples more time to experience the evening and morning backwaters, including sunset and sunrise.</p>

<h3>Can couples celebrate an anniversary or birthday?</h3>
<p>Yes. Ask the operator about available celebration arrangements — flower decoration, a candlelight dinner and a cake can usually be arranged when booking.</p>

<h3>Is Kalappura suitable for honeymoon couples?</h3>
<p>Yes. Kalappura offers private houseboat options suitable for couples and small groups.</p>

<p>Plan the trip with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to plan your getaway?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a>.</p>
`,
  },
];

async function seed() {
  console.log("Updating couples & honeymoon article...");
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
  console.log(`Done! ${articles.length} article updated.`);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
