import { Router } from 'express';
import { 
  calculateProfits, 
  checkoutOrder, 
  restockProduct, 
  updateOrderStatus, 
  getAllProducts, 
  createProduct 
} from '../controllers/shop.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// --- Product Routes ---
router.get('/products', getAllProducts);               // Get all products for the client shop UI catalog
router.post('/products', createProduct);               // Admin add a new product to the database

// --- Order & Checkout Routes ---
router.post('/checkout', checkoutOrder);               // Initialize order checkout with Paystack
router.post('/order', verifyToken, checkoutOrder);     // Protected order checkout route (requires Bearer token)

// --- Admin & Inventory Management Routes ---
router.patch('/restock/:productId', restockProduct);      // Admin restock inventory
router.get('/profits', calculateProfits);                 // Admin analytics dashboard
router.patch('/order-status/:orderId', updateOrderStatus);// Admin/System order status updates

export default router;