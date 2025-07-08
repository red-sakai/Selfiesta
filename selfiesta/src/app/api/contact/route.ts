declare module "nodemailer";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email, message } = await req.json();

  // Configure your SMTP transporter (use environment variables in production)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jheredmiguelrepublica14@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD, // Use an App Password, not your main password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "jheredmiguelrepublica14@gmail.com",
      subject: `Selfiesta Contact Form from ${email}`,
      text: message,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}