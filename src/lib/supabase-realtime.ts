import { supabase } from "./supabase";

// ============================================================================
// SUPABASE REALTIME
// Live booking notifications for admin dashboard
//
// Enable Realtime in Supabase:
// Dashboard > Database > Replication > Toggle ON for "Booking" table
// ============================================================================

type BookingChangeCallback = (payload: {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: Record<string, unknown>;
  old: Record<string, unknown>;
}) => void;

// Subscribe to booking changes (for admin dashboard)
export function subscribeToBookings(callback: BookingChangeCallback) {
  const channel = supabase
    .channel("booking-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Booking",
      },
      (payload) => {
        callback({
          eventType: payload.eventType as "INSERT" | "UPDATE" | "DELETE",
          new: payload.new as Record<string, unknown>,
          old: payload.old as Record<string, unknown>,
        });
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel);
  };
}

// Subscribe to new bookings only
export function subscribeToNewBookings(callback: (booking: Record<string, unknown>) => void) {
  const channel = supabase
    .channel("new-bookings")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "Booking",
      },
      (payload) => {
        callback(payload.new as Record<string, unknown>);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
