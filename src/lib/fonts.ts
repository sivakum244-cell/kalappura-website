// ============================================================================
// SELF-HOSTED FONTS via next/font/google
// ----------------------------------------------------------------------------
// Replaces the render-blocking `@import` of Google Fonts that previously sat at
// the top of globals.css. next/font:
//   - self-hosts the font files (no extra DNS/connection to fonts.gstatic.com)
//   - applies `font-display: swap` automatically (fixes the "Font Display" audit)
//   - preloads only the subsets used, reducing render-blocking and CLS
// The exposed CSS variables are wired into Tailwind's fontFamily tokens.
// ============================================================================
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";

export const displayFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const accentFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-accent",
});

export const fontVariables = `${displayFont.variable} ${bodyFont.variable} ${accentFont.variable}`;
