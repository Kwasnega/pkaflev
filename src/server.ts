import 'dotenv/config';
import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes.js';
import shopRoutes from './routes/shop.routes.js';
import webhookRoutes from './routes/webhook.routes.js';
import affiliateRoutes from './routes/affiliate.routes.js';
import adminRoutes from './routes/admin.routes.js';


const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'API server is running smoothly' });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/admin', adminRoutes);

// Add this alongside your other routes
app.use('/api/affiliates', affiliateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});