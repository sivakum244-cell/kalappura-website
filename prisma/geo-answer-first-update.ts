// ============================================================================
// GEO ANSWER-FIRST UPDATE — prepends a quotable "Key facts / short answer" block
// to the pillar guide and the price-2026 post, and adds a primary-source note.
// Reads current content from DB and modifies it (idempotent: guarded by markers).
// Run from project root: node node_modules/ts-node/dist/bin.js prisma/geo-answer-first-update.ts
// ============================================================================

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Marker so re-running doesn't duplicate the inserted block.
const MARKER = "<!-- geo-keyfacts -->";

const PILLAR_KEYFACTS = `${MARKER}
<div class="not-prose" style="border:1px solid #eee;border-radius:12px;padding:16px;margin-bottom:20px;background:#faf8f3">
<p><strong>Quick answer:</strong> An Alleppey (Alappuzha) houseboat is a private overnight backwater cruise in Kerala. At Kalappura, rates run <strong>₹15,000–₹24,000 per room per night</strong> and include all meals, an AC bedroom and the cruise (plus 18% GST). Check-in is <strong>12:00 PM</strong> and check-out <strong>9:00 AM</strong> the next day. Boats cruise the afternoon and anchor by about 5:00 PM.</p>
</div>
`;

const PRICE_ANSWER = `${MARKER}
<p><strong>Short answer:</strong> An Alleppey houseboat costs <strong>₹15,000 per room per night</strong> for the Standard package, <strong>₹19,000</strong> for Premium and <strong>₹24,000</strong> for Semi Luxury — each including all meals, an AC bedroom and the backwater cruise, plus 18% GST.</p>
`;

// A light, accurate primary-source note (no invented stats). Kerala Tourism is the
// authority behind the "anchor by 5 PM / no night cruising" rule referenced on-site.
const SOURCE_NOTE = `
<p style="font-size:0.85em;color:#666"><em>Houseboat operating rules (including daytime cruising and anchoring before dark) follow <a href="https://www.keralatourism.org/" rel="nofollow noopener" target="_blank">Kerala Tourism</a> guidelines. GST is applied at the prevailing Government of India rate (currently 18%).</em></p>
`;

async function updatePost(slug: string, prepend: string, appendSource: boolean) {
  const post = await prisma.blogPost.findUnique({ where: { slug }, select: { content: true } });
  if (!post) {
    console.log(`  ! ${slug} not found, skipping`);
    return;
  }
  if (post.content.includes(MARKER)) {
    console.log(`  = ${slug} already updated, skipping`);
    return;
  }
  let newContent = prepend + "\n" + post.content;
  if (appendSource && !post.content.includes("keralatourism.org")) {
    newContent = newContent + "\n" + SOURCE_NOTE;
  }
  await prisma.blogPost.update({ where: { slug }, data: { content: newContent } });
  console.log(`  \u2713 ${slug} updated`);
}

async function run() {
  console.log("Applying answer-first + source updates...");
  await updatePost("kerala-houseboat-guide", PILLAR_KEYFACTS, true);
  await updatePost("alleppey-houseboat-price-2026", PRICE_ANSWER, true);
  console.log("Done.");
}

run().catch(console.error).finally(() => prisma.$disconnect());
