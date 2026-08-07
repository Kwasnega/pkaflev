import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import { sendEmailNotification } from '../services/email.service.js';

/**
 * Review Payout Request (Approve or Decline with reason)
 */
export const reviewPayoutRequest = async (req: Request, res: Response) => {
  try {
    const { payoutId } = req.params;
    const { action, declineReason } = req.body; // action: 'approve' | 'decline'

    const payout = await prisma.payout.findUnique({
      where: { payout_id: Number(payoutId) },
      include: { affiliate: { include: { user: true } } },
    });

    if (!payout) {
      return res.status(404).json({ error: 'Payout request not found' });
    }

    if (payout.status !== 'pending') {
      return res.status(400).json({ error: `This payout request has already been ${payout.status}` });
    }

    if (action === 'approve') {
      const payoutAmount = Number(payout.amount);
      const currentBalance = Number(payout.affiliate.available_balance);

      if (payoutAmount > currentBalance) {
        return res.status(400).json({ error: 'Affiliate does not have sufficient available balance for this payout' });
      }

      // Execute approval: update payout status and decrease available_balance atomically
      await prisma.$transaction(async (tx) => {
        await tx.payout.update({
          where: { payout_id: payout.payout_id },
          data: { status: 'approved' },
        });

        await tx.affiliate.update({
          where: { affiliate_id: payout.affiliate_id },
          data: { available_balance: { decrement: payoutAmount } },
        });
      });

      // Send Payout Approved Email
      if (payout.affiliate.user?.email) {
        await sendEmailNotification(
          payout.affiliate.user.email,
          'Payout Request Approved',
          `<p>Hello ${payout.affiliate.name},</p>
           <p>Your payout request of <strong>GHS ${payoutAmount.toFixed(2)}</strong> has been approved and processed.</p>`
        );
      }

      return res.status(200).json({ success: true, message: 'Payout approved successfully' });
    } 
    
    if (action === 'decline') {
      if (!declineReason) {
        return res.status(400).json({ error: 'A decline reason is required when rejecting a payout' });
      }

      await prisma.payout.update({
        where: { payout_id: payout.payout_id },
        data: { 
          status: 'declined', 
          decline_reason: declineReason 
        },
      });

      // Send Payout Declined Email with reason
      if (payout.affiliate.user?.email) {
        await sendEmailNotification(
          payout.affiliate.user.email,
          'Payout Request Declined',
          `<p>Hello ${payout.affiliate.name},</p>
           <p>Your payout request of <strong>GHS ${Number(payout.amount).toFixed(2)}</strong> has been declined.</p>
           <p><strong>Reason:</strong> ${declineReason}</p>`
        );
      }

      return res.status(200).json({ success: true, message: 'Payout declined successfully' });
    }

    res.status(400).json({ error: 'Invalid action. Must be "approve" or "decline"' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Manage Affiliate Accounts (Suspend or Reactivate)
 */
export const manageAffiliateStatus = async (req: Request, res: Response) => {
  try {
    const { affiliateId } = req.params;
    const { status } = req.body; // status: 'active' | 'suspended'

    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ error: 'Invalid account status. Use "active" or "suspended"' });
    }

    const updatedAffiliate = await prisma.affiliate.update({
      where: { affiliate_id: Number(affiliateId) },
      data: { account_status: status },
    });

    res.status(200).json({
      success: true,
      message: `Affiliate account successfully updated to ${status}`,
      affiliate: updatedAffiliate,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Export Sales Records as CSV
 */
export const exportSalesCSV = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: true,
        order_items: {
          include: { product: true },
        },
      },
      orderBy: { order_date: 'desc' },
    });

    // Build CSV Header
    let csvString = 'Order ID,Client Email,Amount Paid (GHS),Status,Order Date\n';

    // Build CSV Rows
    for (const order of orders) {
      csvString += `${order.order_id},"${order.client.email}",${order.amount_paid},${order.status},"${order.order_date.toISOString()}"\n`;
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=sales_records.csv');
    res.status(200).send(csvString);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};