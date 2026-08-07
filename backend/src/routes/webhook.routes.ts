import { Router } from 'express';
import { handlePaystackWebhook } from '../controllers/webhook.controller.js';

const router = Router();

// Paystack webhook listener endpoint
router.post('/paystack', handlePaystackWebhook);

export default router;