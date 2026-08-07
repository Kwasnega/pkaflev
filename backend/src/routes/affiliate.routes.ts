import { Router } from 'express';
import { 
  getAffiliateDashboard, 
  getAffiliateLeaderboard, 
  requestPayout 
} from '../controllers/affiliate.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/leaderboard', getAffiliateLeaderboard);             // Public or user leaderboard view
router.get('/dashboard/:affiliateId', verifyToken, getAffiliateDashboard); // Dashboard stats & history
router.post('/payout-request', verifyToken, requestPayout);        // Request a payout

export default router;