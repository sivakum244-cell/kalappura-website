import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Test endpoint to verify SMTP configuration
// Visit: /api/test-email to send a test email

export async function GET() {
  // Debug: list all SMTP-related env vars
  const allEnvKeys = Object.keys(process.env).filter(k => k.includes("SMTP") || k.includes("ADMIN"));
  
  const config = {
    host: process.env.SMTP_HOST || "NOT SET",
    port: process.env.SMTP_PORT || "NOT SET",
    user: process.env.SMTP_USER ? "SET (hidden)" : "NOT SET",
    pass: process.env.SMTP_PASSWORD ? "SET (hidden)" : "NOT SET",
    adminEmail: process.env.ADMIN_EMAIL || "NOT SET",
    foundEnvKeys: allEnvKeys,
    nodeEnv: process.env.NODE_ENV || "unknown",
  };

  // Check if configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return NextResponse.json({
      success: false,
      error: "SMTP not configured",
      config,
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();

    // Send test email
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    await transporter.sendMail({
      from: `"Kalappura Test" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: "✅ Kalappura Email Test - Working!",
      html: `<h2>Email is working!</h2><p>If you received this, your SMTP configuration is correct.</p><p>Sent at: ${new Date().toISOString()}</p>`,
    });

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${adminEmail}`,
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
