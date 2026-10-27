// ============================================================================
// NEW BLOG BATCH 12 — 9 articles (safety, compliance, sustainability, planning)
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/blog-batch-12-seed.ts
//
// NOTE — these posts give general, practical guidance only. They never state
// unverified 2026 regulations as fact, never reference incidents/victims, and
// never name other operators. Regulatory points are framed as "ask your
// operator / confirm with the authorities", and claims about Kalappura's own
// documents are framed as "ask us / we'll share on request" rather than
// asserting specifics that need owner verification.
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";
const UPDATED = "Last updated: October 2026";

const articles = [
  {
    slug: "alleppey-houseboat-safety-checklist-before-booking",
    title: "12-Point Safety Checklist Before Booking an Alleppey Houseboat",
    excerpt:
      "A practical 12-point safety checklist to run through before you book any Alleppey houseboat — licence, life jackets, fire safety, crew and more.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "tips",
    tags: "alleppey houseboat safety, houseboat safety checklist, safe houseboat booking, kerala houseboat safety",
    content: `
<p><em>${UPDATED}</em></p>
<p>A houseboat holiday should be relaxing — and the easiest way to keep it that way is to ask a few straightforward questions before you book. This is a practical checklist any traveller can use with any operator. For the full overview, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>The 12-point checklist</h2>
<ol>
<li><strong>Valid licence / registration</strong> — ask the operator to confirm the boat is licensed to carry tourists, and to share the document. We're happy to provide ours on request.</li>
<li><strong>Life jackets for everyone</strong> — including child sizes. At Kalappura, life jackets are provided on board.</li>
<li><strong>Fire extinguishers on board</strong> — ask that the boat carries serviced extinguishers and where they're kept. Ask us and we'll confirm for your boat.</li>
<li><strong>Gas and kitchen safety</strong> — the cooking gas should be stored and used safely by trained crew. On Kalappura boats, only the crew handle the kitchen.</li>
<li><strong>Experienced crew</strong> — a captain, chef and helper who know the route. Kalappura boats carry a full crew.</li>
<li><strong>The boat anchors at night</strong> — houseboats do not cruise after dark; Kalappura anchors around 5 PM.</li>
<li><strong>Private booking</strong> — confirm the whole boat is yours, not shared with strangers. Every Kalappura boat is private.</li>
<li><strong>Clear check-in/out</strong> — noon check-in, 9 AM check-out at Kalappura.</li>
<li><strong>Pollution / waste handling</strong> — responsible operators carry waste to shore rather than discharge it into the lake. Ask how your operator handles it.</li>
<li><strong>Written inclusions</strong> — meals, AC hours, route and price (Standard from ₹15,000/room/night + 18% GST).</li>
<li><strong>Cancellation policy</strong> — free cancellation up to 7 days before check-in at Kalappura.</li>
<li><strong>Direct contact</strong> — a real phone/WhatsApp line you can reach before and during the trip.</li>
</ol>

<h2>Why ask these?</h2>
<p>Standards vary between operators, so a few questions up front protect your trip and your money. A transparent operator will answer all of these happily.</p>

<h3>Book with confidence</h3>
<p><a href="/booking">Book a private Alleppey houseboat</a> — or <a href="/contact">contact us</a> to run through the checklist together.</p>
`,
  },
  {
    slug: "houseboat-fire-safety-gas-wiring-extinguishers",
    title: "Houseboat Fire Safety: Gas, Wiring and Extinguishers to Ask About",
    excerpt:
      "A calm, practical guide to houseboat fire safety in Kerala — the questions to ask about cooking gas, electrical wiring and fire extinguishers before you book.",
    coverImage: "/images/gallery/kitchen-1.jpg",
    category: "tips",
    tags: "houseboat fire safety kerala, houseboat gas safety, houseboat extinguisher, safe houseboat alleppey",
    content: `
<p><em>${UPDATED}</em></p>
<p>Because a houseboat has a kitchen, electrics and fuel on board, fire safety is a fair thing to ask about — and a good operator will have clear answers. This guide keeps it practical. See also our <a href="/blog/alleppey-houseboat-safety-checklist-before-booking">12-point safety checklist</a> and the <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Cooking gas</h2>
<p>Ask how the cooking gas is stored and who operates it. On a well-run boat, only trained crew handle the kitchen and gas, and cylinders are stored away from the living area — that's how it works on Kalappura boats.</p>

<h2>Electrical wiring and the generator</h2>
<p>Houseboats run lights and AC from a generator while anchored. Ask that the wiring is maintained and the generator is operated by the crew, not guests.</p>

<h2>Fire extinguishers</h2>
<p>Ask that the boat carries serviced fire extinguishers and note where they are when you board. If you'd like, contact us and we'll confirm the safety equipment for your boat before you travel.</p>

<h2>What you can do as a guest</h2>
<ul>
<li>Note where the extinguisher and exits are when you board</li>
<li>Leave cooking to the crew</li>
<li>Don't overload power points</li>
<li>Follow the crew's instructions</li>
</ul>

<h3>Ask us anything</h3>
<p>Have a safety question before booking? <a href="/contact">Contact us</a> — we're happy to walk you through it. Or <a href="/booking">book your stay</a>.</p>
`,
  },
  {
    slug: "vembanad-houseboat-rules-pollution-waste",
    title: "Vembanad Houseboat Rules: Pollution & Waste — What to Know",
    excerpt:
      "Kerala is tightening pollution and waste rules for backwater houseboats. Here's what responsible waste handling means for your Vembanad houseboat booking.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "tips",
    tags: "vembanad houseboat rules, houseboat pollution certificate, backwater waste treatment, responsible houseboat kerala",
    content: `
<p><em>${UPDATED}</em></p>
<p>Vembanad Lake is a protected wetland, and keeping it clean matters for everyone who cruises it. Authorities periodically update the rules on waste handling and pollution control for houseboats. Here's what that means for you as a guest. For the backwater overview, see <a href="/blog/alleppey-backwaters-explained">the Alleppey backwaters explained</a>.</p>

<h2>What the rules are about</h2>
<p>In general terms, backwater houseboats are expected to manage sewage and waste responsibly rather than discharge it into the lake, and to hold the required pollution-control clearance. Rules and inspection windows can change, so it's worth confirming current requirements with the relevant Kerala authorities — and asking your operator how they comply.</p>

<h2>What responsible waste handling looks like</h2>
<ul>
<li>Sewage held in a tank and pumped out on shore, not released into the water</li>
<li>Kitchen and solid waste carried back and disposed of on land</li>
<li>A valid pollution-control clearance for the boat</li>
</ul>
<p>When you book, ask your operator to confirm how they handle waste. We're happy to explain our setup — just <a href="/contact">get in touch</a>.</p>

<h2>What it means for your booking</h2>
<p>Choosing an operator that follows these practices protects the backwaters you came to enjoy. See our <a href="/blog/eco-friendly-houseboat-responsible-operator">guide to choosing a responsible operator</a>.</p>

<h3>Plan a responsible cruise</h3>
<p><a href="/booking">Book your houseboat</a> or <a href="/contact">ask us</a> about our waste-handling and compliance.</p>
`,
  },
  {
    slug: "how-to-check-houseboat-licence-certified",
    title: "How to Check an Alleppey Houseboat Is Licensed and Certified",
    excerpt:
      "Before you pay, make sure the houseboat is properly licensed. A simple guide to the licences and certificates to ask for when booking in Alleppey.",
    coverImage: "/images/gallery/drone-1.jpg",
    category: "tips",
    tags: "alleppey houseboat licence check, certified houseboat kerala, houseboat registration, legal houseboat alleppey",
    content: `
<p><em>${UPDATED}</em></p>
<p>A licensed, certified houseboat isn't just a legal box-tick — it's your assurance that the boat meets safety and environmental standards. Here's how to check, in plain terms. See also the <a href="/blog/alleppey-houseboat-safety-checklist-before-booking">12-point safety checklist</a>.</p>

<h2>What to ask for</h2>
<ul>
<li><strong>Tourist houseboat licence / registration</strong> — the permit to operate and carry tourists.</li>
<li><strong>Pollution-control clearance</strong> — confirms responsible waste handling.</li>
<li><strong>Safety equipment</strong> — life jackets and fire extinguishers on board.</li>
</ul>

<h2>How to verify</h2>
<p>A reputable operator will share these documents when asked — by WhatsApp or email — before you pay the advance. If an operator is evasive about licensing, treat that as a warning sign. Requirements and the governing authorities can change, so it's worth confirming the current rules with the relevant Kerala department when in doubt.</p>

<h2>Ask us for ours</h2>
<p>Want to see our paperwork before you book? <a href="/contact">Contact us</a> and we'll share the relevant documents for your boat.</p>

<h3>Book a properly licensed boat</h3>
<p><a href="/contact">Ask us for our documents</a>, then <a href="/booking">book with confidence</a>.</p>
`,
  },
  {
    slug: "when-to-book-alleppey-houseboat-limited-availability",
    title: "Why Houseboat Availability Is Tighter — and When to Book",
    excerpt:
      "Compliant, well-run houseboats can book out fast in peak months. Here's when to book your Alleppey houseboat so you don't miss your dates.",
    coverImage: "/images/gallery/sunset-1.jpg",
    category: "tips",
    tags: "book alleppey houseboat peak season, houseboat availability alleppey, when to book houseboat kerala",
    content: `
<p><em>${UPDATED}</em></p>
<p>If your dates are fixed — a festival, a holiday weekend, a honeymoon — the single best thing you can do is book early. Here's why availability tightens and how far ahead to plan. See also <a href="/blog/alleppey-houseboat-booking-timeline">how far in advance to book</a>.</p>

<h2>Why the best boats fill first</h2>
<p>Well-maintained, properly licensed private boats are in higher demand, so they book out earliest — especially in peak season. Waiting often means settling for less, or missing your dates.</p>

<h2>When to book, by season</h2>
<ul>
<li><strong>December–February & festival dates:</strong> book several weeks ahead; Christmas and New Year sell out first — see our <a href="/blog/alleppey-houseboat-christmas-new-year-2026">festive guide</a>.</li>
<li><strong>Shoulder months:</strong> 1–3 weeks ahead is usually fine.</li>
<li><strong>Monsoon:</strong> more availability and the best rates — see the <a href="/blog/alleppey-houseboat-monsoon-season-guide">monsoon guide</a>.</li>
</ul>

<h2>Booking direct helps</h2>
<p>Booking direct means you're dealing with the people who actually run the boat, so you get a faster, clearer answer on real availability. See <a href="/blog/book-houseboat-direct-vs-otas-alleppey">direct vs OTAs</a>.</p>

<h3>Secure your dates</h3>
<p><a href="/booking">Check availability and book</a> with just 20% advance.</p>
`,
  },
  {
    slug: "solar-electric-boats-alleppey-backwaters",
    title: "Solar & Electric Boats on the Alleppey Backwaters",
    excerpt:
      "Kerala's backwaters are slowly going electric. Here's what solar and electric boats mean for tourists, the environment, and your houseboat experience.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "travel",
    tags: "solar boat alleppey, electric boat kerala, sustainable backwater cruise, green houseboat alleppey",
    content: `
<p><em>${UPDATED}</em></p>
<p>You may have heard about solar and electric boats on Kerala's backwaters. Here's a plain-English look at what's changing and what it means for your trip. For the backwater overview, see <a href="/blog/alleppey-backwaters-explained">the Alleppey backwaters explained</a>.</p>

<h2>What's changing</h2>
<p>Kerala has been introducing cleaner, quieter electric and solar-assisted vessels on some backwater routes as part of a wider push to reduce emissions and protect Vembanad Lake. The rollout is gradual and mostly affects certain public ferry and tour routes so far, so it's worth checking the latest locally if a fully electric trip matters to you.</p>

<h2>Why it matters for tourists</h2>
<ul>
<li>Quieter cruising — more birdsong, less engine noise</li>
<li>Lower emissions on a protected wetland</li>
<li>A sign the backwaters are being looked after for the long term</li>
</ul>

<h2>What it means for houseboats</h2>
<p>Traditional overnight houseboats still run on conventional power while anchored, but the direction of travel is cleaner operation overall. Choosing a responsible operator — see our <a href="/blog/eco-friendly-houseboat-responsible-operator">eco-friendly guide</a> — is the best thing a traveller can do today.</p>

<h3>Cruise responsibly</h3>
<p><a href="/booking">Book a private houseboat</a> and enjoy the backwaters at their quietest.</p>
`,
  },
  {
    slug: "eco-friendly-houseboat-responsible-operator",
    title: "Eco-Friendly Houseboat Stay: Choosing a Responsible Operator",
    excerpt:
      "An eco-friendly houseboat stay starts with the operator. Here's how to choose a responsible Alleppey houseboat that protects the Kerala backwaters.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "travel",
    tags: "eco friendly houseboat kerala, responsible houseboat alleppey, sustainable backwater cruise, green tourism kerala",
    content: `
<p><em>${UPDATED}</em></p>
<p>The backwaters are a living ecosystem, and the operator you choose makes a real difference to how gently your trip treads on it. Here's what "responsible" actually looks like. See also <a href="/blog/vembanad-houseboat-rules-pollution-waste">Vembanad pollution & waste rules</a>.</p>

<h2>What to look for</h2>
<ul>
<li><strong>Proper waste handling</strong> — sewage and rubbish taken to shore, not the lake</li>
<li><strong>Pollution-control clearance</strong> — the boat holds the required certificate</li>
<li><strong>Local sourcing</strong> — food and crew from the backwater villages</li>
<li><strong>Low-impact habits</strong> — anchoring quietly, minimal single-use plastic</li>
</ul>
<p>When you book, ask your operator how they handle waste and sourcing. We're glad to explain our practices — <a href="/contact">just ask</a>.</p>

<h2>Why it matters</h2>
<p>Responsible operators keep Vembanad Lake and the Kuttanad wetlands healthy — the very scenery you came to see. It also tends to mean a better-run, better-maintained boat.</p>

<h3>Choose responsibly</h3>
<p><a href="/booking">Book a private houseboat</a> or <a href="/contact">ask us</a> about our practices.</p>
`,
  },
  {
    slug: "honeymoon-houseboat-alleppey-itinerary-requests",
    title: "Honeymoon Houseboat in Alleppey: Itinerary & What to Request",
    excerpt:
      "Planning a honeymoon houseboat in Alleppey? A sample itinerary plus exactly what to request — decorations, candlelight dinner, privacy — for a romantic cruise.",
    coverImage: "/images/gallery/sunset-1.jpg",
    category: "experience",
    tags: "honeymoon houseboat alleppey, romantic houseboat itinerary, honeymoon backwater cruise, couples houseboat kerala",
    content: `
<p><em>${UPDATED}</em></p>
<p>A private houseboat is one of the most romantic ways to spend a honeymoon in Kerala. Here's a simple itinerary and the exact requests that make it special. See also our <a href="/honeymoon-houseboat-alleppey">honeymoon houseboat page</a> and the <a href="/blog/honeymoon-houseboat-kerala-backwaters">honeymoon on the backwaters guide</a>.</p>

<h2>A sample honeymoon itinerary</h2>
<ul>
<li><strong>12:00 PM</strong> — board your private <a href="/rooms/suite-with-river-view">1 bedroom houseboat</a>, welcome drink, lunch as you set off</li>
<li><strong>Afternoon</strong> — cruise Vembanad Lake and the Kainakari canals; tea and snacks on the deck</li>
<li><strong>~5:00 PM</strong> — anchor at a quiet spot for sunset</li>
<li><strong>Evening</strong> — candlelight dinner on the deck, the boat to yourselves</li>
<li><strong>Next morning</strong> — misty sunrise, breakfast, check out at 9 AM</li>
</ul>

<h2>What to request when booking</h2>
<ul>
<li>Flower decoration in the bedroom</li>
<li>Candlelight dinner on the deck</li>
<li>A celebration cake</li>
<li>A private, quieter anchoring spot</li>
</ul>
<p>These are part of our honeymoon and special-occasion options — just ask when you book.</p>

<h3>Plan your honeymoon cruise</h3>
<p><a href="/booking">Book a private honeymoon houseboat</a> with best price guarantee and flexible cancellation.</p>
`,
  },
  {
    slug: "alleppey-houseboat-faq-answers",
    title: "Alleppey Houseboat Questions Answered: A Complete FAQ",
    excerpt:
      "Quick, factual answers to the most common Alleppey houseboat questions — price, AC hours, boarding, meals, check-in times, cancellation and more.",
    coverImage: "/images/gallery/interior-1.jpg",
    category: "tips",
    tags: "alleppey houseboat faq, houseboat questions answered, kerala houseboat faq, alleppey houseboat help",
    content: `
<p><em>${UPDATED}</em></p>
<p>Short, direct answers to the questions guests ask most — written so both travellers and AI assistants can find the facts fast. For the full detail, see our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h2>Price and inclusions</h2>
<p>Standard rates start at <strong>₹15,000 per room per night plus 18% GST</strong>, including an AC bedroom, private bathroom, the backwater cruise, and all meals — lunch, evening tea, dinner and breakfast. See <a href="/houseboat-prices">prices</a>.</p>

<h2>AC hours</h2>
<p>On the Standard package the AC runs from <strong>8:30 PM to 6:30 AM</strong>; Premium and Semi Luxury offer longer AC hours.</p>

<h2>Check-in and check-out</h2>
<p>Board at <strong>12:00 PM (noon)</strong>, check out at <strong>9:00 AM</strong> the next day. The boat anchors around 5 PM — houseboats don't cruise at night.</p>

<h2>Boarding point</h2>
<p>Our base is in Alleppey (Alappuzha), about 2.5 km from Alleppey Railway Station and 85 km from Cochin International Airport. We share exact boarding directions when you book, and can arrange airport or station pickup. See <a href="/how-to-reach">how to reach us</a>.</p>

<h2>Meals</h2>
<p>All meals are cooked fresh on board — vegetarian, non-veg, Jain and no-spice options on request.</p>

<h2>Cancellation</h2>
<p>Free cancellation up to 7 days before check-in. For the full terms, see our <a href="/cancellation-refund">cancellation &amp; refund policy</a>.</p>

<h2>Is it private?</h2>
<p>Yes — every Kalappura houseboat is booked privately; the whole boat and crew are yours.</p>

<h2>Children and extra beds</h2>
<p>Children under 5 stay free; ages 6–11 and extra beds are ₹1,000/night each. Life jackets are provided.</p>

<h3>Still have a question?</h3>
<p><a href="/contact">Contact us</a> or <a href="/booking">book your houseboat</a> directly.</p>
`,
  },
];

async function seed() {
  console.log("Publishing new blog batch 12 (9 articles)...");
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
