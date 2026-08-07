import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import crypto from 'crypto';

export const handlePaystackWebhook = async (req: Request, res: Response) => {
  try {
    // Verify Paystack cryptographic signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const event = req.body;

    if (event.event === 'charge.success') {
      const data = event.data;
      const orderId = data.metadata?.orderId;
      const affiliateId = data.metadata?.affiliateId;

      if (orderId) {
        // Mark order as paid
        const updatedOrder = await prisma.order.update({
          where: { order_id: Number(orderId) },
          data: { status: 'paid' },
        });

        // Handle affiliate commission payout tracking (e.g. 10% rate)
        if (affiliateId) {
          const commissionRate = 0.10; 
          const commissionAmount = Number(updatedOrder.amount_paid) * commissionRate;

          await prisma.affiliateReferral.create({
            data: {
              client_id: updatedOrder.client_id,
              affiliate_id: Number(affiliateId),
              order_id: updatedOrder.order_id,
              commission_amount: commissionAmount,
            },
          });

          // Increment affiliate's total lifetime earnings
          await prisma.affiliate.update({
            where: { affiliate_id: Number(affiliateId) },
            data: {
              commissions_earned: {
                increment: commissionAmount,
              },
            },
          });
        }
      }
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};