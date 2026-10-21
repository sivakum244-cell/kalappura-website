// ============================================================================
// BLOG SEED DATA
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/blog-seed.ts
// Or use the admin panel to create posts manually.
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const blogPosts = [
  {
    slug: "best-time-alleppey-houseboat",
    title: "Best Time to Visit Alleppey for a Houseboat Trip",
    excerpt: "Planning a houseboat trip in Alleppey? Here's a month-by-month breakdown of weather, crowds, and pricing to help you choose the perfect time for your Kerala backwater cruise.",
    coverImage: "/images/gallery/sunset-1.jpg",
    category: "travel",
    tags: "alleppey, best time to visit, kerala, houseboat, backwaters, seasonal guide",
    published: true,
    content: `
<p>Alleppey (Alappuzha) is one of the most popular houseboat destinations in India, and the experience changes significantly depending on when you visit. Here's what to expect each season.</p>

<h2>October to February — Peak Season</h2>
<p>This is the most popular time for houseboat trips in Alleppey. The monsoon has ended, temperatures are comfortable (22°C–32°C), and the backwaters are full and beautiful. Expect clear skies, pleasant evenings, and the best conditions for photography.</p>
<p><strong>What to know:</strong> This is peak tourist season, so houseboats get booked out quickly — especially around Christmas, New Year, and the Nehru Trophy Boat Race period. Book at least 2-3 weeks in advance during this season.</p>

<h2>March to May — Summer</h2>
<p>Temperatures rise to 33°C–36°C during summer, but houseboats offer relief because you're on the water with natural breeze. Air conditioning in the bedrooms makes nights comfortable. This is a good time for families during school holidays.</p>
<p><strong>Advantage:</strong> Slightly lower rates compared to peak season, and easier availability. The backwaters are calm and the sunsets are spectacular.</p>

<h2>June to September — Monsoon Season</h2>
<p>Kerala's monsoon brings heavy rainfall, especially in June and July. The backwaters swell and the landscape turns intensely green. Houseboats do operate during monsoon, but cruising may be limited on heavy rain days. The boat remains a comfortable shelter with all meals served onboard.</p>
<p><strong>Advantage:</strong> Lowest prices of the year (up to 30% off). The monsoon backwaters have a dramatic, photogenic quality. Very few tourists, so you get a peaceful, authentic experience.</p>

<h2>Our Recommendation</h2>
<p>For first-time visitors, <strong>November to February</strong> offers the best overall experience. For budget-conscious travellers who don't mind occasional rain, <strong>June to September</strong> offers significant savings. Summer (March-May) is ideal if you're combining with a family vacation during school holidays.</p>

<p>At Kalappura Houseboats, we operate year-round with all three packages (Standard, Premium, Semi Luxury) available in every season. All bookings include AC bedrooms, all meals, and a backwater cruise regardless of the time of year.</p>

<h2>Quick Tips</h2>
<ul>
<li>Book 2-3 weeks ahead during peak season (Oct-Feb)</li>
<li>Weekend rates (Fri-Sat) are slightly higher than weekdays</li>
<li>Check-in is at 12:00 PM, check-out at 9:00 AM — this is standard across all seasons</li>
<li>Monsoon season offers the best value with discounts up to 30%</li>
</ul>
`,
  },
  {
    slug: "things-to-know-before-booking-alleppey-houseboat",
    title: "10 Things to Know Before Booking an Alleppey Houseboat",
    excerpt: "First time booking a houseboat in Alleppey? Here are 10 essential things every traveller should know — from check-in times and meal schedules to payment and cancellation policies.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "tips",
    tags: "alleppey, houseboat tips, booking guide, first time, kerala backwaters",
    published: true,
    content: `
<p>Booking a houseboat in Alleppey can be confusing if it's your first time. Here are 10 things we wish every guest knew before they book.</p>

<h2>1. Check-in is at noon, not morning</h2>
<p>Houseboat check-in in Alleppey is standardly at 12:00 PM (noon). Check-out is at 9:00 AM the next morning. This gives you a full afternoon of cruising, an overnight stay, and breakfast before departure. Plan your travel accordingly — don't arrive at 8 AM expecting to board.</p>

<h2>2. All meals are included</h2>
<p>Every houseboat booking includes lunch, evening tea with snacks, dinner, and breakfast. You don't need to bring food or plan restaurant stops. An onboard chef prepares fresh Kerala cuisine during your stay. Vegetarian and non-vegetarian options are available.</p>

<h2>3. The boat anchors at 5 PM</h2>
<p>Due to Kerala Tourism Department regulations, houseboats must anchor by 5:00 PM and cannot cruise at night. After anchoring, you enjoy the evening at your scenic anchor point — perfect for sunset watching, dinner, and relaxation.</p>

<h2>4. AC timing depends on your package</h2>
<p>Air conditioning isn't 24 hours on most houseboats. Standard package: AC from 8:30 PM–6:30 AM (bedroom only). Premium: 5:30 PM–7:30 AM (bedroom/hall). Semi Luxury: AC available all the time. Choose your package based on how important AC is to you during the day.</p>

<h2>5. Private means private</h2>
<p>When you book a houseboat, you get the entire boat to yourself. You're not sharing with strangers. The crew (captain, chef, helper) stay in a separate area. This is your private floating hotel.</p>

<h2>6. You can book just 1 room on a larger boat</h2>
<p>If you're a couple, you don't need to book all 3 bedrooms on a 3-bedroom boat. You can book just 1 room. The price is per room per night, not per boat. Other rooms on the same boat may be booked by other groups, but your room and shared areas remain accessible.</p>

<h2>7. Payment is flexible</h2>
<p>Most operators, including us, require only 20% advance at the time of booking. The remaining 80% can be paid at the property on check-in day. Credit cards, debit cards, UPI, and cash are all accepted.</p>

<h2>8. Free cancellation is usually available</h2>
<p>At Kalappura Houseboats, cancellation is free up to 7 days before your check-in date. Within 7 days, 50% of the booking amount is charged. This gives you flexibility to change plans without losing your money.</p>

<h2>9. Mobile signal works on the backwaters</h2>
<p>You'll have mobile network coverage through most of the cruise route. WiFi is available on the boat. In deeper canal areas, signal may be weaker, but lakes and main waterways have full coverage.</p>

<h2>10. Book direct for best prices</h2>
<p>Booking directly with the houseboat operator (rather than through third-party travel sites) typically gives you the best price, more flexibility on dates, and direct communication for special requests. Third-party sites add commissions that either inflate your price or reduce service quality.</p>
`,
  },
  {
    slug: "alleppey-honeymoon-houseboat-guide",
    title: "Planning a Honeymoon Houseboat in Alleppey: Complete Guide",
    excerpt: "A houseboat honeymoon in Alleppey is one of India's most romantic experiences. Here's everything couples need to know — from choosing the right boat to special requests and what to expect.",
    coverImage: "/images/rooms/suite-river-view/1.jpg",
    category: "experience",
    tags: "honeymoon, alleppey, couples, romantic, houseboat, kerala, private boat",
    published: true,
    content: `
<p>Kerala's backwaters have been a top honeymoon destination in India for decades, and Alleppey (Alappuzha) is the most popular starting point. Here's everything couples need to know about planning a houseboat honeymoon.</p>

<h2>Why choose a houseboat for your honeymoon?</h2>
<p>A houseboat honeymoon offers something no hotel can — complete privacy on the water, changing scenery every hour, and an intimate dining experience prepared just for you. Wake up to misty backwater mornings, watch the sunset from your private deck, and fall asleep to the gentle sounds of water.</p>

<h2>Which boat to choose for couples?</h2>
<p>For honeymoons, we recommend the <strong>1 Bedroom Houseboat</strong> (Single Bedroom). You get an entire compact boat exclusively for yourselves — private bedroom, private deck, private dining. No other guests. The crew stays in a separate section and only appears when serving meals or navigating.</p>

<h2>What special arrangements are possible?</h2>
<p>During booking, you can add special requests such as:</p>
<ul>
<li>Flower decoration in the bedroom</li>
<li>Candlelight dinner setup on the deck</li>
<li>Cake arrangement for celebrations</li>
<li>Birthday or anniversary decorations</li>
</ul>
<p>These can be mentioned in the "Special Requests" section of the booking form. The crew will arrange them before your arrival.</p>

<h2>What's the schedule like?</h2>
<p>Check in at 12:00 PM. The boat cruises through scenic backwaters all afternoon — past village canals, coconut groves, and open lakes. By 5:00 PM, the boat anchors at a beautiful spot for the night. Enjoy sunset, dinner, and a peaceful night on the water. Next morning, breakfast is served and you check out by 9:00 AM.</p>

<h2>Which package for honeymoons?</h2>
<p>We recommend at least the <strong>Premium Package</strong> (₹19,000/night) for honeymoons. It includes:</p>
<ul>
<li>Extended AC (5:30 PM – 7:30 AM)</li>
<li>Tender coconut welcome drink</li>
<li>2 non-veg varieties per meal (fresh seafood + chicken)</li>
<li>Extended 7-stop cruise route through more scenic areas</li>
</ul>
<p>For the best possible experience, the <strong>Semi Luxury Package</strong> (₹24,000/night) offers full-time AC and premium food throughout.</p>

<h2>Best time for a honeymoon houseboat</h2>
<p>October to February offers the most romantic weather — cool evenings, clear skies, and comfortable temperatures. December-January is particularly popular for honeymoons due to the festive atmosphere and perfect weather.</p>

<h2>Tips for honeymoon couples</h2>
<ul>
<li>Book at least 2 weeks in advance, especially during peak season</li>
<li>Mention it's your honeymoon during booking — the crew loves making it special</li>
<li>Bring a camera — the sunset views are incredible</li>
<li>The 1 Bedroom boat accommodates up to 3 guests, so it's very spacious for a couple</li>
<li>Don't forget to mention any dietary preferences during booking</li>
</ul>
`,
  },
  {
    slug: "what-food-served-alleppey-houseboat",
    title: "What Food is Served on an Alleppey Houseboat? Complete Menu Guide",
    excerpt: "Wondering what you'll eat on a Kerala houseboat? Here's the full breakdown of meals, menus, and food options available during your Alleppey houseboat stay.",
    coverImage: "/images/gallery/food-1.jpg",
    category: "food",
    tags: "food, kerala cuisine, houseboat meals, alleppey, menu, vegetarian, non-veg",
    published: true,
    content: `
<p>One of the highlights of any houseboat trip in Alleppey is the food. All meals are prepared fresh onboard by a dedicated chef using local ingredients. Here's exactly what you can expect.</p>

<h2>How many meals are included?</h2>
<p>Every houseboat booking includes 4 meals + tea service:</p>
<ol>
<li><strong>Lunch</strong> — served soon after check-in (around 1:00 PM)</li>
<li><strong>Evening Tea & Snacks</strong> — around 4:30-5:00 PM</li>
<li><strong>Dinner</strong> — around 7:30-8:30 PM</li>
<li><strong>Breakfast</strong> — the next morning before check-out</li>
</ol>
<p>A welcome drink is also served when you board.</p>

<h2>Standard Package Menu</h2>
<h3>Lunch — Kerala Meals</h3>
<p>Rice, sambar, pappadam, long beans mezhukkupuratti, mixed veg thoran or cabbage thoran, pickle. Non-veg option: pearl-spot or any full fish fry.</p>

<h3>Dinner</h3>
<p>Chapati, dal, rice, curd, vegetable curry/thoran, pickle. Non-veg: chicken curry or roast.</p>

<h3>Breakfast (choose one)</h3>
<ul>
<li>Idly, sambar, coconut chutney, eggs, tea/coffee</li>
<li>Puttu, chickpeas masala or egg curry, tea/coffee</li>
<li>Bread toast, butter, jam, banana, eggs, tea/coffee</li>
</ul>

<h2>Premium & Semi Luxury Menu</h2>
<p>These packages include more variety:</p>
<ul>
<li>2 non-veg items per meal (seafood + chicken)</li>
<li>Seafood options: prawns, squid, king fish, pomfret, tuna (based on availability)</li>
<li>Full breakfast — all options served together, not just one choice</li>
<li>Welcome drink upgraded to tender coconut</li>
</ul>

<h2>Dietary preferences</h2>
<p>During booking, you can specify:</p>
<ul>
<li><strong>Pure vegetarian</strong> — no non-veg items served</li>
<li><strong>Non-vegetarian</strong> — includes fish, chicken, and seafood</li>
<li><strong>Jain food</strong> — can be arranged with advance notice</li>
<li><strong>Spice level</strong> — mild, medium, or full spice</li>
<li><strong>Allergies</strong> — mention any food allergies during booking</li>
</ul>

<h2>Is the food good?</h2>
<p>The food is one of the most-praised aspects in guest reviews. The chef uses fresh, locally sourced ingredients — fish often caught that morning, coconuts from nearby trees, spices ground fresh. It's authentic Kerala home-style cooking, not restaurant food. Most guests say the fish curry and pearl-spot fry are highlights they remember long after the trip.</p>

<h2>Can you bring your own food or alcohol?</h2>
<p>You're welcome to bring your own snacks or beverages. Many guests bring alcoholic beverages as houseboats don't typically provide them. Just let the crew know if you'd like glasses or ice.</p>
`,
  },
  {
    slug: "alleppey-houseboat-for-families-groups",
    title: "Alleppey Houseboat for Families & Groups: How to Choose the Right Boat",
    excerpt: "Travelling with family or a large group to Alleppey? Here's how to choose the right houseboat size, what to expect with kids, and tips for group bookings.",
    coverImage: "/images/rooms/standard-cabin/1.jpg",
    category: "tips",
    tags: "family, group, alleppey, houseboat, children, large group, 3 bedroom",
    published: true,
    content: `
<p>A houseboat trip is one of the best family and group activities in Kerala. But choosing the right boat for your group size makes all the difference. Here's how to decide.</p>

<h2>Which boat for which group?</h2>

<h3>1 Bedroom Houseboat (up to 3 guests)</h3>
<p>Best for: Couples, honeymooners, solo travellers. This is a compact private boat with one bedroom. Maximum 2 adults + 1 child or extra bed.</p>

<h3>2 Bedroom Houseboat (up to 6 guests)</h3>
<p>Best for: Small families (parents + 1-2 kids), two couples travelling together, small friend groups. You can book 1 or both bedrooms. Each room has its own bathroom.</p>

<h3>3 Bedroom Houseboat (up to 9 guests)</h3>
<p>Best for: Large families, joint family trips, friend groups of 5-9 people. This is our largest boat with a spacious common area, kitchen, and deck. You can book 1, 2, or all 3 bedrooms depending on your needs.</p>

<h2>Are houseboats safe for children?</h2>
<p>Yes. Our houseboats are family-friendly and we welcome children of all ages. Life jackets are available in all sizes. The deck has railing, and the crew keeps an eye out during the cruise. We've hosted many families with toddlers and young children safely.</p>

<h2>Children's pricing</h2>
<ul>
<li><strong>Under 5 years:</strong> Free (no extra charge)</li>
<li><strong>Age 6-11:</strong> ₹1,000 per night</li>
<li><strong>12+ years:</strong> Counted as adult</li>
<li><strong>Extra bed:</strong> ₹1,000 per night (futon mattress)</li>
</ul>

<h2>Tips for family/group bookings</h2>
<ul>
<li><strong>Book early:</strong> The 3-bedroom boat is the most popular and gets booked first during peak season</li>
<li><strong>Mention kids' ages:</strong> The chef can prepare milder food for children if informed in advance</li>
<li><strong>Bring entertainment:</strong> Card games, books, or music — the backwaters are peaceful but kids may need activities in the evening after anchoring</li>
<li><strong>School holidays:</strong> March-May is a great time for family trips with lower rates</li>
<li><strong>Special dietary needs:</strong> Mention any food allergies or preferences during booking</li>
</ul>

<h2>Can a large group (10+ people) book?</h2>
<p>For groups larger than 9, you'd need to book multiple boats. Contact us directly and we can arrange two boats cruising together on the same route, so your group stays connected while having separate sleeping quarters.</p>

<h2>Activities for families</h2>
<p>During the cruise, families enjoy:</p>
<ul>
<li>Watching village life from the deck</li>
<li>Bird watching (kingfishers, cormorants, egrets are common)</li>
<li>Photography from the upper deck</li>
<li>Sunset watching from the anchor point</li>
<li>Card games and board games in the evening</li>
<li>Early morning village walks (if requested)</li>
</ul>
`,
  },
];

async function seed() {
  console.log("Seeding blog posts...");

  for (const post of blogPosts) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          category: post.category,
          tags: post.tags,
          published: post.published,
          publishedAt: post.published ? new Date() : null,
        },
        create: {
          ...post,
          author: "Kalappura Houseboats",
          publishedAt: post.published ? new Date() : null,
        },
      });
      console.log(`  ✓ ${post.title}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${post.title}`, err);
    }
  }

  console.log("Done! Blog posts seeded.");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
