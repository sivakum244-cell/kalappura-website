import { createClient } from "@supabase/supabase-js";

// ============================================================================
// SUPABASE CLIENT CONFIGURATION
// ============================================================================
//
// Setup Instructions:
// 1. Go to https://supabase.com and create a new project
// 2. Go to Settings > API
// 3. Copy "Project URL" → NEXT_PUBLIC_SUPABASE_URL
// 4. Copy "anon public" key → NEXT_PUBLIC_SUPABASE_ANON_KEY
// 5. Copy "service_role" key → SUPABASE_SERVICE_ROLE_KEY (for server-side only)
// 6. Go to Settings > Database
// 7. Copy "Connection string (URI)" → DATABASE_URL in .env
// 8. Copy "Direct connection" → DIRECT_URL in .env
//
// Storage Setup:
// 1. Go to Storage in Supabase dashboard
// 2. Create a bucket called "room-images" (set to Public)
// 3. Create a bucket called "gallery" (set to Public)
//
// Auth Setup:
// 1. Go to Authentication > Providers
// 2. Enable Email provider (already enabled by default)
// 3. Optionally enable Google OAuth for admin login
//
// Realtime Setup:
// 1. Go to Database > Replication
// 2. Enable realtime for the "Booking" table
// ============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client-side Supabase client (uses anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (uses service role key, bypasses RLS)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export default supabase;
