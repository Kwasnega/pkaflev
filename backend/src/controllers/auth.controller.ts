import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmailNotification } from '../services/email.service.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, name, referral_code } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        role: role || 'client', // 'client', 'affiliate', 'admin'
      },
    });

    let affiliateLink = '';

    // If role is affiliate, automatically create their affiliate tracking info
    if (role === 'affiliate') {
      const generatedCode = referral_code || Math.random().toString(36).substring(2, 8);
      affiliateLink = `${process.env.FRONTEND_URL}/ref/${generatedCode}`;
      
      await prisma.affiliate.create({
        data: {
          user_id: user.user_id,
          name: name || email.split('@')[0],
          referral_code: generatedCode,
          referral_link: affiliateLink,
        },
      });
    }

    // Send welcome email based on user role using the provided registration email
    const emailSubject = role === 'affiliate' 
      ? 'Welcome to Our Affiliate Program!' 
      : 'Welcome to Our Platform!';

    const emailBody = role === 'affiliate'
      ? `<h3>Welcome aboard, Partner!</h3>
         <p>Your affiliate account has been successfully created.</p>
         <p>Your unique referral link is: <strong>${affiliateLink}</strong></p>`
      : `<h3>Hello ${name || 'there'},</h3>
         <p>Your account has been successfully registered with <strong>${email}</strong>.</p>
         <p>We are thrilled to have you shop with us!</p>`;

    await sendEmailNotification(email, emailSubject, emailBody);

    res.status(201).json({ message: 'User registered successfully and welcome email sent', userId: user.user_id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1d' }
    );

    // Send security login notification email
    await sendEmailNotification(
      user.email,
      'New Login Security Alert',
      `<p>Hello,</p>
       <p>We detected a successful login to your account using <strong>${user.email}</strong>.</p>
       <p>If this was you, no further action is required.</p>`
    );

    res.status(200).json({ token, role: user.role, userId: user.user_id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};