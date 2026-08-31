import nodemailer from "nodemailer";
import { getRoomName, formatBookingDate } from "./booking-utils";

// ============================================================================
// EMAIL TRANSPORTER
// Configure SMTP in .env file (see .env.example for instructions)
// ============================================================================

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "sivakum244@gmail.com",
      pass: process.env.SMTP_PASSWORD || "fsmmlsrsbldlkjjy",
    },
    connectionTimeout: 5000,
    greetingTimeout: 3000,
    socketTimeout: 5000,
  });
}

// ============================================================================
// SEND EMAIL HELPER
// ============================================================================

async function sendEmail(to: string, subject: string, html: string) {
  const smtpUser = process.env.SMTP_USER || "sivakum244@gmail.com";
  const smtpPass = process.env.SMTP_PASSWORD || "fsmmlsrsbldlkjjy";

  if (!smtpUser || !smtpPass) {
    console.log("[EMAIL] SMTP not configured. Skipping email to:", to);
    console.log("[EMAIL] Subject:", subject);
    return { success: true, skipped: true };
  }

  try {
    const transporter = createTransporter();
    const fromName = process.env.SMTP_FROM_NAME || "Kalappura Houseboats";
    const fromEmail = process.env.SMTP_FROM_EMAIL || "sivakum244@gmail.com";

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log("[EMAIL] Sent successfully to:", to);
    return { success: true, skipped: false };
  } catch (error) {
    console.error("[EMAIL] Failed to send:", error);
    return { success: false, error };
  }
}

// ============================================================================
// BOOKING DATA TYPE (for email templates)
// ============================================================================

interface BookingEmailData {
  bookingId: string;
  guestName: string;
  mobile: string;
  email: string;
  country: string;
  checkIn: string;
  checkOut: string;
  eta: string;
  adults: number;
  children: number;
  infants: number;
  roomType: string;
  numberOfRooms: number;
  foodRequirements: string;
  specialRequests: string;
  additionalNotes: string;
  paymentPreference: string;
  createdAt: string;
  packageType?: string;
  totalAmount?: number;
  gstAmount?: number;
  advanceAmount?: number;
  balanceAmount?: number;
  packageExtra?: number;
}

// ============================================================================
// ADMIN NOTIFICATION EMAIL
// ============================================================================

export async function sendAdminNotification(data: BookingEmailData) {
  const adminEmail = "josejkalappurackal@gmail.com,sivakum244@gmail.com";
  const subject = `🏠 New Booking: ${data.bookingId} - ${data.guestName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#d4a853,#fbbf24);border-radius:16px 16px 0 0;padding:30px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;">🏠 New Booking Received</h1>
      <p style="color:#fff;margin:8px 0 0;opacity:0.9;font-size:14px;">Kalappura Houseboats & Tours</p>
    </div>

    <!-- Body -->
    <div style="background:#fff;padding:30px;border-radius:0 0 16px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Booking ID Badge -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
        <p style="margin:0;font-size:12px;color:#166534;text-transform:uppercase;letter-spacing:1px;">Booking ID</p>
        <p style="margin:4px 0 0;font-size:24px;font-weight:bold;color:#166534;">${data.bookingId}</p>
      </div>

      <!-- Guest Information -->
      <h2 style="color:#1f2937;font-size:16px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;margin-top:24px;">👤 Guest Information</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${data.guestName}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#1f2937;">${data.mobile}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#1f2937;">${data.email || "Not provided"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Country</td><td style="padding:8px 0;color:#1f2937;">${data.country}</td></tr>
      </table>

      <!-- Stay Details -->
      <h2 style="color:#1f2937;font-size:16px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;margin-top:24px;">📅 Stay Details</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Check-in</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${formatBookingDate(data.checkIn)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Check-out</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${formatBookingDate(data.checkOut)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">ETA</td><td style="padding:8px 0;color:#1f2937;">${data.eta}</td></tr>
      </table>

      <!-- Guests -->
      <h2 style="color:#1f2937;font-size:16px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;margin-top:24px;">👥 Guests</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Adults</td><td style="padding:8px 0;color:#1f2937;">${data.adults}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Children (6-11)</td><td style="padding:8px 0;color:#1f2937;">${data.children}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Infants (0-5)</td><td style="padding:8px 0;color:#1f2937;">${data.infants}</td></tr>
      </table>

      <!-- Accommodation -->
      <h2 style="color:#1f2937;font-size:16px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;margin-top:24px;">🏠 Accommodation</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Room Type</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${getRoomName(data.roomType)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Number of Rooms</td><td style="padding:8px 0;color:#1f2937;">${data.numberOfRooms}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Package</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${data.packageType === "luxury" ? "Semi Luxury" : data.packageType === "premium" ? "Premium" : "Standard"}</td></tr>
      </table>

      <!-- Payment Details -->
      <h2 style="color:#1f2937;font-size:16px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;margin-top:24px;">💰 Payment Details</h2>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin-top:12px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#6b7280;">Total Amount (incl. 18% GST)</td><td style="padding:6px 0;color:#1f2937;font-weight:700;text-align:right;">₹${data.totalAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">GST (18%)</td><td style="padding:6px 0;color:#1f2937;text-align:right;">₹${data.gstAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          <tr style="border-top:1px solid #d1fae5;"><td style="padding:6px 0;color:#6b7280;">Payment Mode</td><td style="padding:6px 0;color:#1f2937;font-weight:600;text-align:right;">${data.paymentPreference === "pay-at-property" ? "20% Advance + Balance at Property" : data.paymentPreference === "online-payment" ? "Full Online Payment" : "Bank Transfer"}</td></tr>
          ${data.paymentPreference === "pay-at-property" ? `
          <tr><td style="padding:6px 0;color:#059669;font-weight:600;">Advance Paid (20%)</td><td style="padding:6px 0;color:#059669;font-weight:700;text-align:right;">₹${data.advanceAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#d97706;font-weight:600;">Balance at Property</td><td style="padding:6px 0;color:#d97706;font-weight:700;text-align:right;">₹${data.balanceAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          ` : ""}
        </table>
      </div>

      <!-- Food & Requests -->
      <h2 style="color:#1f2937;font-size:16px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;margin-top:24px;">🍽️ Food & Special Requests</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Food</td><td style="padding:8px 0;color:#1f2937;">${data.foodRequirements || "No preference"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Requests</td><td style="padding:8px 0;color:#1f2937;">${data.specialRequests || "None"}</td></tr>
        ${data.additionalNotes ? `<tr><td style="padding:8px 0;color:#6b7280;">Notes</td><td style="padding:8px 0;color:#1f2937;">${data.additionalNotes}</td></tr>` : ""}
      </table>

      <!-- Footer -->
      <div style="margin-top:30px;padding-top:20px;border-top:2px solid #f3f4f6;text-align:center;">
        <p style="font-size:12px;color:#9ca3af;margin:0;">Booking received on ${data.createdAt}</p>
        <p style="font-size:12px;color:#9ca3af;margin:4px 0 0;">Status: <strong style="color:#d97706;">Pending</strong></p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return sendEmail(adminEmail, subject, html);
}

// ============================================================================
// GUEST CONFIRMATION EMAIL
// ============================================================================

export async function sendGuestConfirmation(data: BookingEmailData) {
  if (!data.email) {
    console.log("[EMAIL] No guest email provided, skipping confirmation.");
    return { success: true, skipped: true };
  }

  const subject = `✅ Booking Confirmed - ${data.bookingId} | Kalappura Houseboats`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#065f46,#10b981);border-radius:16px 16px 0 0;padding:40px 30px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;">Thank You! 🎉</h1>
      <p style="color:#d1fae5;margin:8px 0 0;font-size:16px;">Your booking has been received</p>
    </div>

    <!-- Body -->
    <div style="background:#fff;padding:30px;border-radius:0 0 16px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Greeting -->
      <p style="font-size:16px;color:#1f2937;line-height:1.6;">
        Dear <strong>${data.guestName}</strong>,
      </p>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;">
        Thank you for choosing <strong>Kalappura Houseboats & Tours</strong>! We are delighted to confirm that we have received your reservation request. Our team will review and confirm your booking shortly.
      </p>

      <!-- Booking ID -->
      <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:12px;padding:20px;text-align:center;margin:24px 0;">
        <p style="margin:0;font-size:12px;color:#166534;text-transform:uppercase;letter-spacing:1px;">Your Booking ID</p>
        <p style="margin:8px 0 0;font-size:28px;font-weight:bold;color:#166534;letter-spacing:2px;">${data.bookingId}</p>
        <p style="margin:8px 0 0;font-size:12px;color:#4ade80;">Please save this for your reference</p>
      </div>

      <!-- Booking Summary -->
      <h2 style="color:#1f2937;font-size:16px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;margin-top:28px;">📋 Booking Summary</h2>
      
      <div style="background:#fefdfb;border:1px solid #f5ebe0;border-radius:12px;padding:20px;margin-top:12px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:10px 0;color:#6b7280;width:130px;">Property</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">Kalappura Houseboats & Tours</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Room Type</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">${getRoomName(data.roomType)}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Check-in</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">📅 ${formatBookingDate(data.checkIn)}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Check-out</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">📅 ${formatBookingDate(data.checkOut)}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Arrival Time</td><td style="padding:10px 0;color:#1f2937;">⏰ ${data.eta}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Guests</td><td style="padding:10px 0;color:#1f2937;">${data.adults} Adult${data.adults > 1 ? "s" : ""}${data.children > 0 ? `, ${data.children} Child${data.children > 1 ? "ren" : ""}` : ""}${data.infants > 0 ? `, ${data.infants} Infant${data.infants > 1 ? "s" : ""}` : ""}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Rooms</td><td style="padding:10px 0;color:#1f2937;">${data.numberOfRooms}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Package</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">${data.packageType === "luxury" ? "Semi Luxury" : data.packageType === "premium" ? "Premium" : "Standard"}</td></tr>
        </table>
      </div>

      <!-- Payment Summary -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-top:16px;">
        <h3 style="color:#166534;margin:0 0 12px;font-size:14px;">💰 Payment Summary</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#4b5563;">Total Amount (incl. 18% GST)</td><td style="padding:6px 0;color:#1f2937;font-weight:700;text-align:right;">₹${data.totalAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#4b5563;">Payment Mode</td><td style="padding:6px 0;color:#1f2937;font-weight:600;text-align:right;">${data.paymentPreference === "pay-at-property" ? "20% Advance + Balance at Property" : data.paymentPreference === "online-payment" ? "Full Online Payment" : "Bank Transfer"}</td></tr>
          ${data.paymentPreference === "pay-at-property" ? `
          <tr style="border-top:1px solid #bbf7d0;"><td style="padding:8px 0;color:#059669;font-weight:600;">Advance (20%)</td><td style="padding:8px 0;color:#059669;font-weight:700;text-align:right;">₹${data.advanceAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#d97706;font-weight:600;">Balance at Property</td><td style="padding:6px 0;color:#d97706;font-weight:700;text-align:right;">₹${data.balanceAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          ` : `
          <tr style="border-top:1px solid #bbf7d0;"><td style="padding:8px 0;color:#059669;font-weight:600;">Amount</td><td style="padding:8px 0;color:#059669;font-weight:700;text-align:right;">₹${data.totalAmount?.toLocaleString("en-IN") || "—"}</td></tr>
          `}
        </table>
      </div>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px;margin-top:24px;">
        <h3 style="color:#1e40af;margin:0 0 8px;font-size:14px;">📞 What happens next?</h3>
        <p style="color:#1e40af;margin:0;font-size:13px;line-height:1.6;">
          Our reservation team will contact you within 2 hours to confirm availability and finalize your booking. You can also reach us directly for any questions.
        </p>
      </div>

      <!-- Contact -->
      <div style="margin-top:24px;text-align:center;">
        <p style="font-size:13px;color:#6b7280;margin:0;">Contact us anytime:</p>
        <p style="font-size:14px;margin:8px 0;">
          📞 <a href="tel:+919895053528" style="color:#d4a853;text-decoration:none;font-weight:600;">+91 98950 53528</a>
        </p>
        <p style="font-size:14px;margin:4px 0;">
          💬 <a href="https://wa.me/919895053528" style="color:#25D366;text-decoration:none;font-weight:600;">WhatsApp Us</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="margin-top:30px;padding-top:20px;border-top:2px solid #f3f4f6;text-align:center;">
        <p style="font-size:13px;color:#6b7280;margin:0;font-weight:600;">Kalappura Houseboats & Tours</p>
        <p style="font-size:12px;color:#9ca3af;margin:4px 0;">Mullackal Ward, Iron Bridge P.O, Alleppey, Kerala 688011</p>
        <p style="font-size:11px;color:#d1d5db;margin:12px 0 0;">This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return sendEmail(data.email, subject, html);
}

// ============================================================================
// BOOKING CONFIRMED - ADMIN NOTIFICATION
// Sent to admin when booking status is changed to "Confirmed"
// ============================================================================

export async function sendAdminConfirmedNotification(data: BookingEmailData) {
  const adminEmail = "josejkalappurackal@gmail.com,sivakum244@gmail.com";
  const subject = `✅ Booking CONFIRMED: ${data.bookingId} - ${data.guestName}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#065f46,#10b981);border-radius:16px 16px 0 0;padding:30px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;">✅ Booking Confirmed</h1>
      <p style="color:#d1fae5;margin:8px 0 0;font-size:14px;">You confirmed this reservation</p>
    </div>
    <div style="background:#fff;padding:30px;border-radius:0 0 16px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
        <p style="margin:0;font-size:12px;color:#166534;text-transform:uppercase;letter-spacing:1px;">Booking ID</p>
        <p style="margin:4px 0 0;font-size:24px;font-weight:bold;color:#166534;">${data.bookingId}</p>
        <p style="margin:8px 0 0;font-size:14px;color:#059669;font-weight:600;">STATUS: CONFIRMED ✅</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:130px;">Guest</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${data.guestName}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#1f2937;">${data.mobile}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#1f2937;">${data.email || "Not provided"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Room</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${getRoomName(data.roomType)} × ${data.numberOfRooms}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Check-in</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${formatBookingDate(data.checkIn)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Check-out</td><td style="padding:8px 0;color:#1f2937;font-weight:600;">${formatBookingDate(data.checkOut)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">ETA</td><td style="padding:8px 0;color:#1f2937;">${data.eta}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Guests</td><td style="padding:8px 0;color:#1f2937;">${data.adults} Adults, ${data.children} Children, ${data.infants} Infants</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Food</td><td style="padding:8px 0;color:#1f2937;">${data.foodRequirements || "No preference"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Requests</td><td style="padding:8px 0;color:#1f2937;">${data.specialRequests || "None"}</td></tr>
      </table>
      <div style="margin-top:20px;padding-top:16px;border-top:2px solid #f3f4f6;text-align:center;">
        <p style="font-size:12px;color:#9ca3af;">Reminder: Prepare room and food requirements for this guest.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return sendEmail(adminEmail, subject, html);
}

// ============================================================================
// BOOKING CONFIRMED - GUEST NOTIFICATION
// Sent to guest when their booking is confirmed by admin
// ============================================================================

export async function sendGuestBookingConfirmed(data: BookingEmailData) {
  if (!data.email) {
    console.log("[EMAIL] No guest email provided, skipping confirmation notification.");
    return { success: true, skipped: true };
  }

  const subject = `🎉 Your Booking is CONFIRMED! ${data.bookingId} | Kalappura Houseboats`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:16px 16px 0 0;padding:40px 30px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:32px;">🎉</h1>
      <h2 style="color:#fff;margin:10px 0 0;font-size:24px;">Booking Confirmed!</h2>
      <p style="color:#d1fae5;margin:8px 0 0;font-size:14px;">Your reservation has been confirmed by our team</p>
    </div>
    <div style="background:#fff;padding:30px;border-radius:0 0 16px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      <p style="font-size:16px;color:#1f2937;line-height:1.6;">
        Dear <strong>${data.guestName}</strong>,
      </p>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;">
        Great news! Your booking at <strong>Kalappura Houseboats & Tours</strong> has been <strong style="color:#059669;">confirmed</strong>. We are looking forward to welcoming you!
      </p>

      <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:12px;padding:20px;text-align:center;margin:24px 0;">
        <p style="margin:0;font-size:12px;color:#166534;text-transform:uppercase;letter-spacing:1px;">Confirmed Booking</p>
        <p style="margin:8px 0 0;font-size:28px;font-weight:bold;color:#166534;letter-spacing:2px;">${data.bookingId}</p>
        <p style="margin:10px 0 0;font-size:14px;color:#059669;font-weight:700;">✅ CONFIRMED</p>
      </div>

      <div style="background:#fefdfb;border:1px solid #f5ebe0;border-radius:12px;padding:20px;margin-top:16px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:10px 0;color:#6b7280;width:130px;">Property</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">Kalappura Houseboats & Tours</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Room</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">${getRoomName(data.roomType)}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Check-in</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">📅 ${formatBookingDate(data.checkIn)} at ${data.eta}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Check-out</td><td style="padding:10px 0;color:#1f2937;font-weight:600;">📅 ${formatBookingDate(data.checkOut)}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Guests</td><td style="padding:10px 0;color:#1f2937;">${data.adults} Adult${data.adults > 1 ? "s" : ""}${data.children > 0 ? `, ${data.children} Child${data.children > 1 ? "ren" : ""}` : ""}${data.infants > 0 ? `, ${data.infants} Infant${data.infants > 1 ? "s" : ""}` : ""}</td></tr>
          <tr style="border-top:1px solid #f3f4f6;"><td style="padding:10px 0;color:#6b7280;">Rooms</td><td style="padding:10px 0;color:#1f2937;">${data.numberOfRooms}</td></tr>
        </table>
      </div>

      <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:12px;padding:16px;margin-top:20px;">
        <h3 style="color:#92400e;margin:0 0 8px;font-size:14px;">📋 Reminders</h3>
        <ul style="color:#92400e;margin:0;padding-left:18px;font-size:13px;line-height:1.8;">
          <li>Check-in time: 12:00 PM (noon)</li>
          <li>Check-out time: 9:00 AM</li>
          <li>Bring a valid photo ID</li>
          <li>All meals (breakfast, lunch, tea & dinner) are included</li>
          <li>Free cancellation up to 7 days before check-in</li>
        </ul>
      </div>

      <div style="margin-top:24px;text-align:center;">
        <p style="font-size:13px;color:#6b7280;margin:0;">Questions? Contact us anytime:</p>
        <p style="font-size:14px;margin:8px 0;">
          📞 <a href="tel:+919895053528" style="color:#d4a853;text-decoration:none;font-weight:600;">+91 98950 53528</a>
          &nbsp;|&nbsp;
          💬 <a href="https://wa.me/919895053528" style="color:#25D366;text-decoration:none;font-weight:600;">WhatsApp</a>
        </p>
      </div>

      <div style="margin-top:30px;padding-top:20px;border-top:2px solid #f3f4f6;text-align:center;">
        <p style="font-size:13px;color:#6b7280;margin:0;font-weight:600;">Kalappura Houseboats & Tours</p>
        <p style="font-size:12px;color:#9ca3af;margin:4px 0;">Mullackal Ward, Iron Bridge P.O, Alleppey, Kerala 688011</p>
        <p style="font-size:14px;color:#059669;margin:12px 0 0;font-weight:600;">See you soon! 🌊</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return sendEmail(data.email, subject, html);
}
