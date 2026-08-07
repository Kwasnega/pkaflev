import { Router } from 'express';
import { 
  reviewPayoutRequest, 
  manageAffiliateStatus, 
  exportSalesCSV 
} from '../controllers/admin.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// All admin routes should ideally be protected by token and admin role check
router.patch('/payouts/:payoutId', verifyToken, reviewPayoutRequest);       // Approve/Decline payouts
router.patch('/affiliates/:affiliateId/status', verifyToken, manageAffiliateStatus); // Suspend/Reactivate affiliate
router.get('/sales/export', verifyToken, exportSalesCSV);                   // Export sales records CSV

export default router;