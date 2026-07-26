# Kalappura Houseboats & Tours - Premium Booking Website

A luxury hotel booking website built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

### Prerequisites
- Node.js 18+ (Download from https://nodejs.org)
- npm (comes with Node.js)

### Installation

```bash
# Navigate to the project directory
cd kalappura-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Custom SVG + Lucide React
- **Fonts:** Playfair Display, Inter, Cormorant Garamond (Google Fonts)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles & Tailwind config
│   ├── rooms/[slug]/       # Dynamic room detail pages
│   └── booking/            # Multi-step booking flow
├── components/
│   ├── Header.tsx          # Sticky navigation
│   ├── Hero.tsx            # Full-screen video hero
│   ├── BookingEngine.tsx   # Glass-morphism booking form
│   ├── WhyBookDirect.tsx   # Direct booking benefits
│   ├── PropertyOverview.tsx # About the property
│   ├── Gallery.tsx         # Masonry image gallery with lightbox
│   ├── Rooms.tsx           # 3 room type cards
│   ├── Experiences.tsx     # Activities & experiences
│   ├── Amenities.tsx       # Amenity icon grid
│   ├── FoodSection.tsx     # Cuisine & dining
│   ├── Location.tsx        # Google Maps & nearby attractions
│   ├── Reviews.tsx         # Guest reviews with ratings
│   ├── SpecialOffers.tsx   # Seasonal packages
│   ├── HostSection.tsx     # Meet the team
│   ├── FAQ.tsx             # Animated accordion
│   ├── Footer.tsx          # Footer with newsletter
│   └── FloatingButtons.tsx # WhatsApp, Call, Book Now FABs
└── lib/
    ├── constants.ts        # Site config, rooms, reviews data
    └── utils.ts            # Utility functions
```

## Features

- Full-screen cinematic hero with video background
- Glass-morphism booking engine
- Masonry gallery with lightbox viewer
- Animated room cards with live availability
- Multi-step booking flow
- Floating WhatsApp & action buttons
- Mobile-responsive bottom navigation
- SEO optimized with Schema.org markup
- Smooth scroll animations with Framer Motion
- Custom scrollbar & selection colors

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## Customization

- Update property details in `src/lib/constants.ts`
- Modify color palette in `tailwind.config.ts`
- Replace placeholder images with actual property photos
- Update Google Maps embed with correct coordinates
- Add real phone/WhatsApp numbers

## License

Private - Kalappura Houseboats & Tours
