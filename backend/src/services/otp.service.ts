import crypto from 'crypto';
import nodemailer from 'nodemailer';
import prisma from '../utils/prisma.js';

const MAX_MAIL_ATTEMPTS = 3;
const MAIL_RETRY_DELAY_MS = 1000;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // will read 'smtp.mailgun.org'
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // Mailgun uses STARTTLS on port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function verifySmtpConnection(): Promise<void> {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
    throw new Error('SMTP configuration is incomplete. Check SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM.');
  }

  await transporter.verify();
}

async function sendOtpWithRetry(email: string, code: string): Promise<void> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_MAIL_ATTEMPTS; attempt += 1) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Your Verification Code',
        text: `Your OTP code is: ${code}. It expires in 10 minutes.`,
        html: `<p>Your OTP code is: <strong>${code}</strong>. It expires in 10 minutes.</p>`,
      });
      return;
    } catch (error) {
      lastError = error;
      console.warn(`OTP mail send attempt ${attempt} failed`, { email, error });
      if (attempt < MAX_MAIL_ATTEMPTS) {
        await delay(MAIL_RETRY_DELAY_MS);
      }
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Failed to send OTP email after ${MAX_MAIL_ATTEMPTS} attempts: ${message}`);
}

export async function generateAndSendOtp(email: string): Promise<void> {
  await verifySmtpConnection();

  // Generate a secure 6-digit code
  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

  // Invalidate any existing unused OTPs for this email
  await prisma.otpCode.deleteMany({ where: { email } });

  // Save new OTP to database
  const record = await prisma.otpCode.create({
    data: { email, code, expiresAt },
  });

  try {
    await sendOtpWithRetry(email, code);
  } catch (error) {
    console.error('OTP Mail Send Failure:', { email, error });
    await prisma.otpCode.delete({ where: { id: record.id } }).catch((cleanupError) => {
      console.error('Failed to clean up OTP after mail failure:', cleanupError);
    });
    throw error;
  }
}

export async function verifyOtp(email: string, code: string): Promise<boolean> {
  const record = await prisma.otpCode.findFirst({
    where: { email, code },
  });

  // If no record exists, return false
  if (!record) {
    return false;
  }

  // If the record exists but has expired, clean it up and return false
  if (record.expiresAt < new Date()) {
    await prisma.otpCode.delete({ where: { id: record.id } }).catch(() => {});
    return false; 
  }

  // Delete OTP after successful verification so it can't be reused
  await prisma.otpCode.delete({ where: { id: record.id } });
  return true;
}