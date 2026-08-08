import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import { sendEmailNotification } from '../services/email.service.js';

/**
 * Get Affiliate Dashboard Data (Earnings, Balance, Referrals History)
 */
export const getAffiliateDashboard = async (req: Request, res: Response) => {
  try {
    const { affiliateId } = req.params;

    const affiliate = await prisma.affiliate.findUnique({
      where: { affiliate_id: Number(affiliateId) },
      include: {
        referrals: {
          include: { order: { include: { client: true } } },
          orderBy: { date_referred: 'desc' },
        },
        payouts: {
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate account not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        affiliate_id: affiliate.affiliate_id,
        name: affiliate.name,
        account_status: affiliate.account_status,
        referral_code: affiliate.referral_code,
        referral_link: affiliate.referral_link,
        commissionsEarned: affiliate.commissions_earned,
        available_balance: affiliate.available_balance,
        numberOfReferrals: affiliate.number_of_referrals,
        referralsHistory: affiliate.referrals,
        payoutsHistory: affiliate.payouts,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Leaderboard (Active affiliates only, shows first name + referral count only, no commissions)
 */
export const getAffiliateLeaderboard = async (req: Request, res: Response) => {
  try {
    const activeAffiliates = await prisma.affiliate.findMany({
      where: { account_status: 'active' },
      select: {
        name: true,
        number_of_referrals: true,
      },
      orderBy: {
        number_of_referrals: 'desc',
      },
      take: 10, // Top 10 leaderboard
    });

    // Format to expose only first name and referral count
    const leaderboard = activeAffiliates.map((aff) => {
      const firstName = aff.name.split(' ')[0];
      return {
        firstName,
        numberOfReferrals: aff.number_of_referrals,
      };
    });

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Request a Payout (Enforces GHS 500 threshold and available balance limits)
 */
export const requestPayout = async (req: Request, res: Response) => {
  try {
    const { affiliateId, amount } = req.body;
    const requestedAmount = Number(amount);

    if (!requestedAmount || requestedAmount <= 0) {
      return res.status(400).json({ error: 'A valid payout amount is required' });
    }

    const affiliate = await prisma.affiliate.findUnique({
      where: { affiliate_id: Number(affiliateId) },
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate account not found' });
    }

    // Suspended affiliates cannot request payouts
    if (affiliate.account_status === 'suspended') {
      return res.status(403).json({ error: 'Account is suspended. Payout requests are blocked.' });
    }

    const availableBalance = Number(affiliate.available_balance);
    const MINIMUM_THRESHOLD = 500; // GHS 500 minimum payout threshold

    // Check minimum threshold
    if (requestedAmount < MINIMUM_THRESHOLD) {
      return res.status(400).json({ 
        error: `Minimum payout threshold is GHS ${MINIMUM_THRESHOLD}. Your requested amount is below the limit.` 
      });
    }

    // Check if request exceeds current available balance
    if (requestedAmount > availableBalance) {
      return res.status(400).json({ 
        error: `Requested amount exceeds your current available balance of GHS ${availableBalance.toFixed(2)}` 
      });
    }

    // Create payout request with status = 'pending'
    const payout = await prisma.payout.create({
      data: {
        affiliate_id: affiliate.affiliate_id,
        amount: requestedAmount,
        status: 'pending',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Payout request submitted successfully and is pending admin review',
      payout,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};