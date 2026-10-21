// ============================================================================
// NEW BLOG SEED — 6 fresh articles (distinct topics, SEO-optimized)
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/new-blog-seed.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PILLAR = "/blog/kerala-houseboat-guide";

const articles = [
  {
    slug: "what-to-pack-alleppey-houseboat-trip",
    title: "What to Pack for an Alleppey Houseboat Trip: Complete Checklist (2026)",
    excerpt: "The complete Alleppey houseboat packing list for 2026. Exactly what to bring for an overnight Kerala backwater cruise — clothing, essentials, toiletries, and what to leave at home.",
    coverImage: "/images/gallery/deck-1.jpg",
    category: "tips",
    tags: "Alleppey houseboat packing list, what to pack houseboat, Kerala backwater trip, houseboat essentials, overnight houseboat, travel checklist",
    content: `
<p>Packing for an Alleppey houseboat trip is different from packing for a regular hotel stay. You're spending an overnight on the Kerala backwaters, meals are provided, space is compact, and the climate is warm and humid. Pack smart and you'll be comfortable; overpack and you'll just be lugging bags around a boat.</p>

<p>This complete packing checklist covers exactly what to bring for an overnight Alleppey houseboat cruise in 2026 — plus a few things you can safely leave at home.</p>

<h2>The Short Answer: Pack Light</h2>
<p>Because your Alleppey houseboat trip is a single overnight stay (check-in 12:00 PM, check-out 9:00 AM), you only need a small bag or backpack. All meals, drinking water, towels, and bedding are provided onboard. Focus on light cotton clothing, sun protection, personal medication, and a power bank.</p>

<h2>Clothing to Pack</h2>
<ul>
<li><strong>Light cotton clothes</strong> — Kerala is warm and humid. Breathable cotton or linen keeps you comfortable during the afternoon cruise.</li>
<li><strong>One warm layer</strong> — a light sweater or shawl for the AC bedroom at night and the cool early morning on the water.</li>
<li><strong>Comfortable sandals or slip-ons</strong> — you'll be removing footwear often on the boat, so slip-ons are easier than laces.</li>
<li><strong>A change of clothes</strong> — one fresh set for the next morning is plenty.</li>
<li><strong>A hat or cap</strong> — the deck gets direct sun in the afternoon.</li>
</ul>

<h2>Sun & Insect Protection</h2>
<ul>
<li><strong>Sunscreen</strong> (SPF 30+) — the open deck and water reflection increase sun exposure.</li>
<li><strong>Sunglasses</strong> — glare off the backwaters can be strong midday.</li>
<li><strong>Mosquito repellent</strong> — useful in the evening after the boat anchors, especially near village canals.</li>
</ul>

<h2>Toiletries & Personal Items</h2>
<ul>
<li>Toothbrush, toothpaste, and a small toiletry kit</li>
<li>Any prescription medication you take regularly</li>
<li>A basic first-aid item or two (band-aids, antacid, motion-sickness tablets if you're sensitive)</li>
<li>Wet wipes and hand sanitiser</li>
<li>Lip balm — the sun and breeze can dry your lips</li>
</ul>
<p>Note: towels, soap, and hot water in the private bathroom are provided, so you don't need to carry bath towels.</p>

<h2>Electronics</h2>
<ul>
<li><strong>Power bank</strong> — the single most useful item. Charging points are available, but a power bank keeps your camera and phone going during the cruise.</li>
<li><strong>Phone charger</strong> and cable</li>
<li><strong>Camera</strong> — the sunsets, kingfishers, and misty mornings are worth it</li>
</ul>

<h2>Documents & Money</h2>
<ul>
<li>A government photo ID (required at check-in for all adult guests)</li>
<li>Your booking confirmation (digital is fine)</li>
<li>Some cash — handy for tips or buying from small village vendors, as card signal can be patchy on the water</li>
</ul>

<h2>What You Can Leave at Home</h2>
<ul>
<li><strong>Bath towels and bed linen</strong> — provided onboard</li>
<li><strong>Drinking water and food</strong> — all meals and water are included</li>
<li><strong>Heavy luggage</strong> — it's one night; a large suitcase is awkward in a compact cabin</li>
<li><strong>Formal wear</strong> — the vibe is relaxed and casual</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Do I need to bring my own towels?</h3>
<p>No. Towels, soap, and hot water are provided in the private bathroom on every Kalappura houseboat.</p>

<h3>Is there a place to charge my phone on the houseboat?</h3>
<p>Yes, charging points are available onboard. We still recommend carrying a power bank so you can charge freely during the afternoon cruise.</p>

<h3>What should I wear on an Alleppey houseboat?</h3>
<p>Light, breathable cotton clothing for the warm afternoon, plus one warm layer for the AC bedroom and cool morning. Casual and comfortable is best.</p>

<p>For more trip planning, read our full <a href="${PILLAR}">Kerala Houseboat Guide</a>, check <a href="/houseboat-prices">houseboat prices</a>, or see <a href="/blog/what-food-served-alleppey-houseboat">what food is served onboard</a>.</p>

<h3>Ready for the backwaters?</h3>
<p><a href="/booking">Check availability and book your Alleppey houseboat</a> with instant confirmation and free cancellation up to 7 days before check-in.</p>
`,
  },
  {
    slug: "alleppey-backwater-wildlife-birdwatching",
    title: "Birds & Wildlife on the Alleppey Backwaters: A Spotter's Guide",
    excerpt: "From kingfishers to cormorants and otters, the Alleppey backwaters are alive with wildlife. Here's what you can spot from your houseboat, when to look, and the best times for birdwatching.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "experience",
    tags: "Alleppey wildlife, backwater birds, kingfisher, birdwatching Kerala, houseboat wildlife, Vembanad Lake birds",
    content: `
<p>Most people book an Alleppey houseboat for the scenery and the food — then discover the backwaters are also one of Kerala's most rewarding places to watch wildlife. The calm waters, paddy fields, and village canals attract dozens of bird species and the occasional otter, all visible right from your deck.</p>

<p>This spotter's guide covers what you can realistically see on a cruise, when to look, and how to make the most of it without any special equipment.</p>

<h2>Why the Backwaters Are Great for Wildlife</h2>
<p>The Alleppey backwaters sit within the Vembanad-Kol wetland, one of the largest wetland systems in India and a Ramsar-recognised site. Wetlands like this concentrate fish, insects, and plant life, which in turn draws birds and small mammals. Because a houseboat moves slowly and quietly, you get remarkably close without disturbing the animals.</p>

<h2>Birds You Can Commonly Spot</h2>
<ul>
<li><strong>Kingfishers</strong> — the small blue-and-orange common kingfisher and the larger white-throated kingfisher are frequent along the canals, often perched on stakes over the water.</li>
<li><strong>Cormorants and darters</strong> — you'll see them diving for fish and drying their wings on branches.</li>
<li><strong>Egrets and herons</strong> — little egrets, pond herons, and purple herons stalk the shallows near paddy fields.</li>
<li><strong>Brahminy kite</strong> — this handsome chestnut-and-white raptor is a common sight circling over the lakes.</li>
<li><strong>Waterfowl</strong> — during the cooler months, migratory ducks and waders arrive on Vembanad Lake.</li>
</ul>

<h2>Other Wildlife</h2>
<p>Beyond birds, sharp-eyed guests sometimes spot smooth-coated otters slipping through the water at dawn, monitor lizards basking on the banks, and terrapins near quiet canal edges. Fish are everywhere — watching local fishermen work their nets is part of the experience.</p>

<h2>Best Time for Birdwatching</h2>
<p>Wildlife is most active in the <strong>early morning (6:00–8:30 AM)</strong> and the <strong>late afternoon before the boat anchors at 5 PM</strong>. The light is soft, the heat is lower, and birds are feeding. If birdwatching matters to you, mention it during booking — the crew can time part of the cruise through quieter, wildlife-rich canals.</p>

<p>Season-wise, <strong>November to February</strong> adds migratory species to the resident birds, making it the richest period. Read our <a href="/blog/best-time-alleppey-houseboat">best time to visit guide</a> for the full seasonal breakdown.</p>

<h2>Tips for Spotting More</h2>
<ul>
<li>Keep noise low on the deck — quiet boats see more.</li>
<li>Bring binoculars if you have them; a zoom camera works too.</li>
<li>Watch the edges where water meets vegetation — that's where kingfishers and herons hunt.</li>
<li>Scan the sky over open lakes for kites and eagles.</li>
<li>Ask the crew — they know the canals and can point out what you'd otherwise miss.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Do I need binoculars to see wildlife?</h3>
<p>No, but they help. Kingfishers, egrets, and kites are easily seen with the naked eye. Binoculars or a zoom camera let you enjoy the smaller and more distant birds.</p>

<h3>What's the best time of day to see birds?</h3>
<p>Early morning and late afternoon are best, when birds are feeding and the light is soft.</p>

<p>For everything else about planning your trip, read our full <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to explore the backwaters?</h3>
<p><a href="/booking">Book your Alleppey houseboat</a> and watch the wildlife drift past your deck.</p>
`,
  },
  {
    slug: "alleppey-houseboat-photography-guide",
    title: "Alleppey Houseboat Photography Guide: Best Shots & Timing",
    excerpt: "How to capture stunning photos on your Alleppey houseboat trip. Best times for light, what to shoot, camera and phone tips, and the most photogenic moments of the backwater cruise.",
    coverImage: "/images/gallery/sunset-1.jpg",
    category: "tips",
    tags: "Alleppey photography, houseboat photos, backwater photography, Kerala travel photography, sunset photography, drone Alleppey",
    content: `
<p>The Alleppey backwaters are one of the most photogenic places in India — mirror-still water, coconut palms, misty mornings, and sunsets that light up the whole lake. Whether you shoot on a phone or a full camera, a houseboat trip gives you constantly changing scenes. Here's how to get the best shots.</p>

<h2>The Golden Hours Matter Most</h2>
<p>The two best windows are the <strong>afternoon-to-sunset cruise</strong> and the <strong>early morning before check-out</strong>. Midday light is harsh and flat; golden hour makes the water glow and adds long, soft shadows. Since the boat anchors around 5 PM, position yourself on the deck as the sun drops for the best sunset frames.</p>

<h2>What to Photograph</h2>
<ul>
<li><strong>Reflections</strong> — calm canals turn into mirrors. Shoot low, close to the waterline, to double the scene.</li>
<li><strong>Village life</strong> — fishermen casting nets, women washing by the ghats, children waving from the banks.</li>
<li><strong>The boat itself</strong> — the curved bamboo roof and wooden deck framed against the water make a classic Kerala shot.</li>
<li><strong>Sunset over Vembanad Lake</strong> — the wide open lake gives you an uninterrupted horizon.</li>
<li><strong>Misty mornings</strong> — early fog over the water is magical and only lasts an hour or two.</li>
<li><strong>Food and details</strong> — the fresh Kerala meals and welcome drinks make great close-ups.</li>
</ul>

<h2>Phone Photography Tips</h2>
<ul>
<li>Tap to lock focus and lower exposure slightly for sunsets so colours stay rich.</li>
<li>Use the grid and place the horizon on the lower third for sky-heavy shots.</li>
<li>Wide-angle for the boat and scenery; portrait mode for people and food.</li>
<li>Clean the lens — sea spray and humidity leave a haze.</li>
</ul>

<h2>Camera Photography Tips</h2>
<ul>
<li>A polarising filter cuts glare off the water and deepens the sky.</li>
<li>Bring a zoom for birds and distant village scenes (see our <a href="/blog/alleppey-backwater-wildlife-birdwatching">wildlife guide</a>).</li>
<li>Shoot in RAW to recover detail in bright skies and dark shadows.</li>
<li>Keep a lens cloth handy for humidity.</li>
</ul>

<h2>A Note on Drones</h2>
<p>Aerial shots of a houseboat cutting through the backwaters are spectacular, but drone use is regulated in India and near waterways. If you plan to fly one, check current DGCA rules and always ask the crew and local authorities first. Respect other boats and villagers' privacy.</p>

<h2>Protect Your Gear</h2>
<p>Humidity and water spray are the main risks. Carry a dry pouch or zip bag, keep silica gel with your camera, and avoid leaving equipment on the open deck in direct sun.</p>

<h2>Frequently Asked Questions</h2>
<h3>What's the best time for sunset photos?</h3>
<p>The hour before the boat anchors at 5 PM. Get on the deck early and watch the light change over the open lake.</p>

<h3>Can I fly a drone from the houseboat?</h3>
<p>Only if you comply with India's drone regulations and get permission from the crew and local authorities. Rules near waterways are strict, so check before you travel.</p>

<p>Planning your trip? Start with our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to capture the backwaters?</h3>
<p><a href="/booking">Book your Alleppey houseboat</a> and bring your camera.</p>
`,
  },
  {
    slug: "how-to-reach-alleppey-houseboat",
    title: "How to Reach Alleppey for Your Houseboat: Airport, Train & Road Guide",
    excerpt: "Getting to Alleppey (Alappuzha) for your houseboat trip is easy. Here's how to reach by air, train, and road — distances, travel times, and where to board your houseboat.",
    coverImage: "/images/gallery/drone-1.jpg",
    category: "tips",
    tags: "how to reach Alleppey, Alleppey travel, Cochin airport to Alleppey, Alappuzha railway station, houseboat boarding point",
    content: `
<p>Alleppey (Alappuzha) is one of the most accessible backwater destinations in Kerala, well connected by air, rail, and road. This guide covers every way to get there, realistic travel times, and where to board your houseboat once you arrive.</p>

<h2>By Air</h2>
<p>The nearest airport is <strong>Cochin International Airport (COK)</strong>, about <strong>85 km</strong> from Alleppey — roughly a 2 to 2.5 hour drive depending on traffic. It has good domestic and international connections. From the airport you can take a pre-paid taxi, an app cab, or arrange a pickup.</p>
<p>Trivandrum International Airport (TRV) is another option, about 155 km south (3.5–4 hours by road).</p>

<h2>By Train</h2>
<p><strong>Alappuzha Railway Station</strong> is well connected to major cities across India and sits about <strong>2.5 km</strong> from the main boarding area — around 10 minutes by auto-rickshaw or taxi. Trains from Kochi (Ernakulam), Trivandrum, and beyond stop here regularly. Rail is often the most relaxed and scenic way to arrive.</p>

<h2>By Road</h2>
<p>Alleppey is on the NH-66 corridor and easy to reach by car or bus:</p>
<ul>
<li><strong>From Kochi:</strong> ~55 km, about 1.5 hours</li>
<li><strong>From Kumarakom:</strong> ~30 km, about 1 hour</li>
<li><strong>From Kovalam/Trivandrum:</strong> ~155 km, about 3.5–4 hours</li>
</ul>
<p>KSRTC and private buses run frequently, and self-drive or chauffeured cabs are widely available. See our comparison of <a href="/alleppey-vs-kumarakom">Alleppey vs Kumarakom</a> if you're deciding between backwater bases.</p>

<h2>Where Do You Board the Houseboat?</h2>
<p>Houseboats depart from a jetty near the main boarding area in Alleppey. After you book, you'll receive the exact boarding point and directions. Free parking is available at the dock if you drive. Check-in is at <strong>12:00 PM</strong>, so plan your arrival with a little buffer for traffic.</p>

<h2>Getting Around Locally</h2>
<p>Auto-rickshaws are the easiest way to cover short distances within Alleppey. App-based cabs operate too, though availability can vary. For the dock, most guests take an auto or arrange a transfer.</p>

<h2>Travel Tips</h2>
<ul>
<li>Aim to reach the dock by 11:30 AM for a smooth noon check-in.</li>
<li>If flying into Kochi, book your onward taxi in advance during peak season.</li>
<li>Keep your booking confirmation and a photo ID handy for check-in.</li>
<li>Read our <a href="/blog/what-to-pack-alleppey-houseboat-trip">packing checklist</a> before you set off.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Which airport is closest to Alleppey?</h3>
<p>Cochin International Airport (COK), about 85 km away — roughly a 2 to 2.5 hour drive.</p>

<h3>How far is Alappuzha railway station from the houseboat?</h3>
<p>About 2.5 km, around 10 minutes by auto-rickshaw or taxi from the main boarding area.</p>

<h3>Is parking available at the dock?</h3>
<p>Yes, free parking is available at the dock if you arrive by car.</p>

<p>For the complete planning picture, read our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready to plan your trip?</h3>
<p><a href="/booking">Book your Alleppey houseboat</a> and we'll send you the exact boarding details.</p>
`,
  },
  {
    slug: "things-to-do-alleppey-besides-houseboat",
    title: "Things to Do in Alleppey Besides the Houseboat",
    excerpt: "A houseboat is the highlight, but Alleppey has plenty more. Beaches, temples, village walks, canoe tours, and local food — here's what to do before or after your backwater cruise.",
    coverImage: "/images/gallery/interior-1.jpg",
    category: "travel",
    tags: "things to do Alleppey, Alleppey beach, Alappuzha attractions, Kerala village tour, canoe backwaters, Alleppey sightseeing",
    content: `
<p>An overnight houseboat cruise is the reason most people come to Alleppey, but the town and its surroundings reward anyone who stays an extra day. Here are the best things to do before or after your backwater trip.</p>

<h2>Alleppey Beach</h2>
<p>About 3 km from the centre, Alleppey Beach has a historic pier, a lighthouse nearby, and long stretches of sand that are lovely at sunset. It's a relaxed spot to unwind after your cruise.</p>

<h2>Canoe & Village Tours</h2>
<p>Where big houseboats can't go, small canoes can. A guided canoe tour takes you deep into the narrow canals of Kuttanad, past paddy fields below sea level, coir-making villages, and everyday Kerala life up close. It's the perfect complement to the wider views from a houseboat.</p>

<h2>Mullakkal Temple & Local Heritage</h2>
<p>The Mullakkal Rajarajeswari Temple, about 0.5 km from the centre, is a well-known local landmark. Combine it with a walk through Mullakkal market for spices, textiles, and street snacks.</p>

<h2>Kuttanad — The Rice Bowl of Kerala</h2>
<p>Kuttanad is one of the few places on earth where farming happens below sea level. A drive or cruise through its emerald paddy fields is a striking sight and a great photo opportunity (see our <a href="/blog/alleppey-houseboat-photography-guide">photography guide</a>).</p>

<h2>Try the Local Food</h2>
<p>Beyond the meals on your houseboat, Alleppey's toddy shops (kallu shaap) serve fiery, authentic Kerala dishes — duck roast, karimeen (pearl spot) fry, and tapioca. For something sweet, look out for local bakeries and fresh tender coconut by the roadside. Curious what you'll eat onboard? Read <a href="/blog/what-food-served-alleppey-houseboat">what food is served on a houseboat</a>.</p>

<h2>The Nehru Trophy Boat Race</h2>
<p>If you visit around August, the Nehru Trophy Boat Race on Punnamada Lake is one of Kerala's most thrilling spectacles — massive snake boats with dozens of rowers competing before huge crowds. Dates vary each year, so check ahead.</p>

<h2>Suggested 2-Day Plan</h2>
<ul>
<li><strong>Day 1:</strong> Arrive, board your houseboat at noon, cruise and stay overnight.</li>
<li><strong>Day 2:</strong> Check out at 9 AM, take a morning canoe village tour, visit Mullakkal Temple, then relax at Alleppey Beach for sunset.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Is one day enough for Alleppey?</h3>
<p>An overnight houseboat covers the highlight in a day, but adding a second day for a canoe tour, the beach, and local food makes the trip far richer.</p>

<h3>What is Alleppey famous for besides houseboats?</h3>
<p>Its beach and pier, the Nehru Trophy Boat Race, the paddy fields of Kuttanad, coir industry, and authentic Kerala cuisine.</p>

<p>Planning the whole trip? Our <a href="${PILLAR}">Kerala Houseboat Guide</a> ties it all together.</p>

<h3>Ready to build your Alleppey trip around a houseboat?</h3>
<p><a href="/booking">Book your Alleppey houseboat</a> as the centrepiece of your visit.</p>
`,
  },
  {
    slug: "alleppey-houseboat-monsoon-experience",
    title: "Alleppey Houseboat in the Monsoon: What It's Really Like",
    excerpt: "Is a monsoon houseboat trip in Alleppey worth it? Here's what a Kerala backwater cruise is really like in the rains — the atmosphere, the savings, what to expect, and how to prepare.",
    coverImage: "/images/gallery/river-1.jpg",
    category: "experience",
    tags: "Alleppey monsoon, monsoon houseboat, Kerala backwaters rain, off-season houseboat, monsoon travel Kerala, rainy season Alleppey",
    content: `
<p>Most guides tell you to visit Alleppey between October and February — and that's true for classic sunny weather. But the monsoon (June to September) offers a completely different, and for some travellers better, backwater experience. Here's what it's really like, and whether it's right for you.</p>

<h2>The Atmosphere Is Unbeatable</h2>
<p>Monsoon transforms the backwaters. The landscape turns intensely green, the lakes swell, mist hangs over the water, and rain drums gently on the boat's bamboo roof while you stay warm and dry inside. It's moody, cinematic, and deeply peaceful — the version of Kerala you see in films.</p>

<h2>You'll Have the Backwaters (Almost) to Yourself</h2>
<p>Monsoon is the off-season, so there are far fewer tourists and far fewer boats on the water. If you want quiet, privacy, and an authentic feel without the peak-season crowds, this is the time.</p>

<h2>The Prices Are the Lowest of the Year</h2>
<p>Rates drop significantly in the monsoon — often up to 30% lower than peak season. For budget-conscious travellers who don't mind rain, it's the best value on the calendar. See our <a href="/blog/alleppey-houseboat-price-2026">2026 price guide</a> for the full breakdown.</p>

<h2>What About the Cruise?</h2>
<p>Houseboats operate through the monsoon. On heavy-rain days, cruising may be shortened for safety, but the boat remains a comfortable shelter — all meals are still served onboard, the AC bedrooms stay cosy, and the covered deck lets you enjoy the rain without getting soaked. The schedule (noon check-in, 5 PM anchoring, 9 AM check-out) stays the same.</p>

<h2>Who Should Choose a Monsoon Trip?</h2>
<ul>
<li>Travellers who love atmospheric, rainy-day moods over bright sunshine</li>
<li>Couples wanting a quiet, private, romantic escape</li>
<li>Photographers chasing mist, reflections, and dramatic skies</li>
<li>Budget travellers who want the best rates of the year</li>
</ul>

<h2>Who Might Prefer Another Season?</h2>
<p>If you specifically want long uninterrupted cruising, guaranteed clear sunsets, or you're travelling with very young children who dislike rain, the October–February window may suit you better. Compare seasons in our <a href="/blog/best-time-alleppey-houseboat">best time to visit guide</a>.</p>

<h2>How to Prepare for a Monsoon Cruise</h2>
<ul>
<li>Pack a light rain jacket or umbrella and quick-dry clothes</li>
<li>Bring a dry bag for your phone and camera</li>
<li>Carry mosquito repellent — the evenings can be buggy after rain</li>
<li>Keep footwear that handles wet decks (grippy sandals)</li>
<li>See our full <a href="/blog/what-to-pack-alleppey-houseboat-trip">packing checklist</a></li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Do houseboats run during the monsoon?</h3>
<p>Yes. Houseboats operate year-round. On heavy-rain days cruising may be shortened for safety, but meals, AC bedrooms, and the covered deck keep you comfortable throughout.</p>

<h3>Is the monsoon a good time to visit Alleppey?</h3>
<p>It's excellent for atmosphere, privacy, and value — up to 30% cheaper — if you don't mind rain. For guaranteed sunshine, October to February is better.</p>

<p>For the complete seasonal and booking picture, read our <a href="${PILLAR}">Kerala Houseboat Guide</a>.</p>

<h3>Ready for a monsoon backwater escape?</h3>
<p><a href="/booking">Book your Alleppey houseboat</a> and experience Kerala at its greenest.</p>
`,
  },
];

async function seed() {
  console.log("Publishing new blog articles...");
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
