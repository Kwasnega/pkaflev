import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateAndSendOtp, verifyOtp, verifySmtpConnection } from '../services/otp.service.js';

const router = Router();

// OTP health check
router.get('/otp-health', async (_req: Request, res: Response) => {
  try {
    await verifySmtpConnection();
    return res.status(200).json({ status: 'success', message: 'SMTP connection is healthy' });
  } catch (error) {
    console.error('SMTP Health Check Error:', error);
    const message = error instanceof Error ? error.message : 'SMTP health check failed';
    return res.status(503).json({ status: 'error', message });
  }
});

// Request OTP
router.post('/request-otp', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: 'error', message: 'Email is required' });
    }

    await generateAndSendOtp(email);
    return res.status(200).json({ status: 'success', message: 'OTP sent to your email' });
  } catch (error) {
    console.error('OTP Send Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send OTP';
    const isMailError = message.includes('SMTP') || message.includes('send OTP email');
    return res.status(isMailError ? 502 : 500).json({
      status: 'error',
      message: isMailError ? 'Failed to deliver OTP email. Please try again later.' : 'Failed to send OTP',
    });
  }
});

// Verify OTP
router.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ status: 'error', message: 'Email and code are required' });
    }

    const isValid = await verifyOtp(email, code);
    if (!isValid) {
      return res.status(400).json({ status: 'error', message: 'Invalid or expired OTP code' });
    }

    return res.status(200).json({ status: 'success', message: 'OTP verified successfully' });
  } catch (error) {
    console.error('OTP Verify Error:', error);
    return res.status(500).json({ status: 'error', message: 'Verification failed' });
  }
});

export default router;