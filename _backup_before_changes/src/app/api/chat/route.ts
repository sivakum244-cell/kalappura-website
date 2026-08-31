import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// AI CHATBOT API ROUTE - Powered by Google Gemini
// Configure GEMINI_API_KEY in .env
// Get your key: https://aistudio.google.com/apikey
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `You are the AI booking assistant for Kalappura Houseboats & Tours, a luxury houseboat property in Alleppey (Alappuzha), Kerala, India.

Property Details:
- Location: Mullackal Ward, Iron Bridge P.O, Thirumala East Gate Road, Alleppey, Kerala 688011
- Phone/WhatsApp: +91 98950 53528
- Rating: 9.7/10 (275+ reviews)
- Check-in: 12:00 PM, Check-out: 9:00 AM

Room Types:
1. Standard Cabin on Boat - ₹16,500/night (1 bedroom, 1 queen bed + 1 futon, max 2 guests, 10 sqm)
2. Double/Twin Room with Lake View - ₹15,300/night (2 bedrooms, queen or twin beds, max 4 guests, 12 sqm)
3. Suite with River View - ₹16,200/night (1 bedroom + living room, king bed, max 2 guests, 18 sqm)

All rooms include: AC, private bathroom, kitchen, balcony, lake/river view, WiFi, mini bar
All bookings include: Breakfast, lunch, evening tea, and dinner

Activities: Sunset cruise, village walk, fishing, canoeing, kayaking, bird watching, candlelight dinner, cooking class

Food: Traditional Kerala cuisine, seafood, vegetarian, vegan, continental options available

Cancellation: Free cancellation up to 7 days before check-in.

Special packages: Weekend Escape (20% off), Honeymoon Package (25% off), Family Package (15% off), Monsoon Special (30% off)

Guidelines:
- Be friendly, helpful, and concise
- Always mention the WhatsApp number +91 98950 53528 for booking
- Recommend direct booking for best prices
- Keep responses under 150 words
- Use emojis sparingly for a friendly tone`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: "Please type a message!" }, { status: 400 });
    }

    // If Gemini API key is not configured, use fallback responses
    if (!GEMINI_API_KEY) {
      const reply = getFallbackResponse(message);
      return NextResponse.json({ reply });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\nUser question: " + message }] },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("[GEMINI] API error:", response.status);
      return NextResponse.json({ reply: getFallbackResponse(message) });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[CHAT API] Error:", error);
    return NextResponse.json({
      reply: "I'm having trouble right now. Please WhatsApp us at +91 98950 53528 for instant help! 🙏",
    });
  }
}

// Fallback responses when Gemini is not configured
function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
    return "Our room rates:\n\n🛏️ Standard Cabin: ₹16,500/night\n🛏️ Double/Twin Room: ₹15,300/night\n🛏️ Suite: ₹16,200/night\n\nAll meals included! Book direct for 10% off. WhatsApp: +91 98950 53528";
  }
  if (lower.includes("room") || lower.includes("cabin") || lower.includes("suite")) {
    return "We have 3 room types:\n\n1️⃣ Standard Cabin (₹16,500) - Queen bed, 2 guests\n2️⃣ Double/Twin Room (₹15,300) - 4 guests, lake view\n3️⃣ Suite (₹16,200) - King bed, river view, living room\n\nAll include AC, WiFi, meals! WhatsApp to book: +91 98950 53528";
  }
  if (lower.includes("food") || lower.includes("meal") || lower.includes("veg")) {
    return "🍽️ All meals included: Breakfast, lunch, tea & dinner!\n\nWe serve authentic Kerala cuisine, seafood, vegetarian, vegan & continental. Special dietary needs accommodated. Our chef prepares everything fresh on board!";
  }
  if (lower.includes("check") || lower.includes("time")) {
    return "⏰ Check-in: 12:00 PM (noon)\n⏰ Check-out: 9:00 AM\n\nEarly check-in/late check-out available on request. WhatsApp: +91 98950 53528";
  }
  if (lower.includes("cancel")) {
    return "✅ Free cancellation up to 7 days before check-in!\n\nWithin 7 days: 50% charge. No-show: full charge. We're flexible - just let us know!";
  }
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("available")) {
    return "Ready to book? 🎉\n\n1️⃣ Use our booking form on the website\n2️⃣ Or WhatsApp us directly: +91 98950 53528\n\nDirect bookings get 10% off + free upgrades when available!";
  }
  if (lower.includes("activity") || lower.includes("do") || lower.includes("experience")) {
    return "🌅 Activities available:\n\n• Sunset cruise\n• Village walk\n• Fishing\n• Canoeing & kayaking\n• Bird watching\n• Candlelight dinner\n• Cooking class\n\nAll can be arranged during your stay!";
  }
  if (lower.includes("location") || lower.includes("address") || lower.includes("reach") || lower.includes("direction")) {
    return "📍 We're in Alleppey (Alappuzha), Kerala\n\nAddress: Mullackal Ward, Iron Bridge P.O, Thirumala East Gate Road\n\n🚗 From Cochin Airport: ~85 km (2 hrs)\n🚂 Alleppey Station: 2.5 km\n\nWe offer airport pickup! WhatsApp: +91 98950 53528";
  }

  return "Thanks for your message! 😊\n\nFor quick answers about booking, rooms, or activities, just ask! Or reach us directly:\n\n📞 +91 98950 53528\n💬 WhatsApp: wa.me/919895053528\n\nWe respond within minutes!";
}
