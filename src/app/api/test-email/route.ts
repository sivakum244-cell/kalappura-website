import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Test endpoint to verify SMTP configuration
// Visit: /api/test-email to send a test email

export async function GET() {
  // Debug: list all SMTP-related env vars
  const allEnvKeys = Object.keys(process.env).filter(k => k.includes("SMTP") || k.includes("ADMIN"));
  
  const config = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || "587",
    user: "sivakum244@gmail.com",
    pass: "SET (hidden)",
    adminEmail: process.env.ADMIN_EMAIL || "sivakum244@gmail.com",
    foundEnvKeys: allEnvKeys,
    nodeEnv: process.env.NODE_ENV || "unknown",
  };

  // Always try to send since we have hardcoded fallback
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sivakum244@gmail.com",
        pass: "fsmmlsrsbldlkjjy",
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Kalappura Houseboats" <sivakum244@gmail.com>`,
      to: "sivakum244@gmail.com",
      subject: "✅ Kalappura Email Test - Working!",
      html: `<h2>Email is working!</h2><p>Your booking emails are now active.</p><p>Sent at: ${new Date().toISOString()}</p>`,
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent to sivakum244@gmail.com",
      config,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      success: false,
      error: errMsg,
      config,
    });
  }
}
