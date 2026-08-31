import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ============================================================================
// TEST ENDPOINT - Admin only, uses env vars only (no hardcoded credentials)
// ============================================================================

export async function GET(request: NextRequest) {
  // Require admin auth
  const authHeader = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!smtpUser || !smtpPass) {
    return NextResponse.json({
      success: false,
      error: "SMTP not configured. Set SMTP_USER and SMTP_PASSWORD env vars.",
      configured: { SMTP_HOST: !!smtpHost, SMTP_PORT: !!smtpPort, SMTP_USER: !!smtpUser, SMTP_PASSWORD: !!smtpPass, ADMIN_EMAIL: !!adminEmail },
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost || "smtp.gmail.com",
      port: Number(smtpPort) || 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Kalappura Houseboats" <${smtpUser}>`,
      to: adminEmail || smtpUser,
      subject: "✅ Kalappura Email Test - Working!",
      html: `<h2>Email is working!</h2><p>SMTP configuration is correct.</p><p>Sent at: ${new Date().toISOString()}</p>`,
    });

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${adminEmail || smtpUser}`,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
