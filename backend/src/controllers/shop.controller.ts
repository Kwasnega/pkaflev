import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import { initializePaystackTransaction } from '../services/paystack.service.js';
import { sendEmailNotification } from '../services/email.service.js';

/**
 * Handle user checkout, inventory validation, silent referral lookup, 1.5% discount, 
 * and Paystack payment initialization (creates order as 'pending' first).
 */
export const checkoutOrder = async (req: Request, res: Response) => {
  try {
    const { clientId, items, referralCode } = req.body; 
    // items layout: [{ productId, quantity }]

    let originalTotalAmount = 0;
    const orderItemsData = [];

    // 1. Validate products and inventory stock, storing permanent price snapshot
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { product_id: item.productId } });
      if (!product || product.stock_quantity < item.quantity) {
        return res.status(400).json({ error: `Product unavailable or insufficient stock for ID: ${item.productId}` });
      }

      const price = Number(product.price);
      originalTotalAmount += price * item.quantity;
      orderItemsData.push({
        product_id: product.product_id,
        quantity: item.quantity,
        price_at_purchase: price, // Permanent snapshot of original price
      });
    }

    // 2. Lookup affiliate silently if a referral code was passed
    let affiliateId = null;
    let finalAmount = originalTotalAmount;

    if (referralCode) {
      const affiliate = await prisma.affiliate.findUnique({ where: { referral_code: referralCode } });
      
      // Suspended affiliates stop crediting new referrals
      if (affiliate && affiliate.account_status === 'active') {
        affiliateId = affiliate.affiliate_id;
        // Automatically apply 1.5% discount to referred orders
        const discount = originalTotalAmount * 0.015;
        finalAmount = originalTotalAmount - discount;
      }
    }

    // 3. Create the order as 'pending' BEFORE payment is attempted
    const order = await prisma.order.create({
      data: {
        client_id: clientId,
        affiliate_id: affiliateId,
        amount_paid: finalAmount,
        status: 'pending',
        order_items: {
          create: orderItemsData,
        },
      },
      include: { client: true },
    });

    // 4. Initialize Paystack transaction
    const paystackResponse = await initializePaystackTransaction(
      order.client.email,
      finalAmount,
      { orderId: order.order_id, affiliateId }
    );

    // Send pending order email notification to the client's registered email
    await sendEmailNotification(
      order.client.email,
      'Order Received - Pending Payment',
      `<h3>Order #${order.order_id} Received</h3>
       <p>Your order total is amounting to <strong>GHS ${finalAmount.toFixed(2)}</strong>.</p>
       <p>Please complete your payment using the link provided to confirm your order.</p>`
    );

    res.status(200).json({
      message: 'Checkout initialized successfully and pending notification sent',
      order_id: order.order_id,
      authorization_url: paystackResponse.data.authorization_url,
      reference: paystackResponse.data.reference,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Handle Paystack Webhook/Callback to process payment success or permanent failure
 */
export const handlePaymentWebhook = async (req: Request, res: Response) => {
  try {
    const event = req.body;

    // Handle successful charge
    if (event.event === 'charge.success') {
      const data = event.data;
      const orderId = Number(data.metadata?.orderId);
      const affiliateId = data.metadata?.affiliateId ? Number(data.metadata.affiliateId) : null;

      const order = await prisma.order.findUnique({
        where: { order_id: orderId },
        include: { order_items: true, client: true },
      });

      if (!order || order.status !== 'pending') {
        return res.status(400).json({ error: 'Order not found or already processed' });
      }

      // Calculate original total from permanent snapshots (price_at_purchase * quantity)
      let originalTotal = 0;
      for (const item of order.order_items) {
        originalTotal += Number(item.price_at_purchase) * item.quantity;
      }

      // Wrap successful payment updates & affiliate commission triggering in a single transaction
      await prisma.$transaction(async (tx) => {
        // 1. Update order status to success/paid
        await tx.order.update({
          where: { order_id: orderId },
          data: { status: 'success' },
        });

        // 2. Process affiliate rewards if an active affiliate is attached
        if (affiliateId) {
          const affiliate = await tx.affiliate.findUnique({ where: { affiliate_id: affiliateId } });

          if (affiliate && affiliate.account_status === 'active') {
            // Commission calculated at 3.5% of the original price
            const commissionAmount = originalTotal * 0.035;

            // Trigger ALL THREE updates together: commissions_earned, available_balance, number_of_referrals
            await tx.affiliate.update({
              where: { affiliate_id: affiliateId },
              data: {
                commissions_earned: { increment: commissionAmount },
                available_balance: { increment: commissionAmount },
                number_of_referrals: { increment: 1 },
              },
            });

            // Log entry into affiliate_referrals
            await tx.affiliateReferral.create({
              data: {
                client_id: order.client_id,
                affiliate_id: affiliateId,
                order_id: order.order_id,
                commission_amount: commissionAmount,
              },
            });

            // Send Referral Earned Email to Affiliate
            const affiliateUser = await tx.user.findUnique({ where: { user_id: affiliate.user_id } });
            if (affiliateUser) {
              await sendEmailNotification(
                affiliateUser.email,
                'New Referral Commission Earned!',
                `<p>Hello ${affiliate.name},</p>
                 <p>You have successfully earned a commission of <strong>GHS ${commissionAmount.toFixed(2)}</strong> from a new referral order (#${order.order_id}).</p>`
              );
            }
          }
        }
      });

      return res.status(200).json({ status: 'success processed' });
    }

    // Handle failed payments permanently (no retry on the same order_id)
    if (event.event === 'charge.failed') {
      const data = event.data;
      const orderId = Number(data.metadata?.orderId);

      if (orderId) {
        await prisma.order.update({
          where: { order_id: orderId },
          data: { status: 'failed' },
        });
      }

      return res.status(200).json({ status: 'failure recorded permanently' });
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Add a new product to the database (Admin function)
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { product_name, description, price, cost_price, stock_quantity, image_url } = req.body;

    if (!product_name || !price || stock_quantity === undefined) {
      return res.status(400).json({ error: 'Product name, price, and stock quantity are required' });
    }

    const newProduct = await prisma.product.create({
      data: {
        product_name,
        description,
        price: Number(price),
        cost_price: cost_price ? Number(cost_price) : 0,
        stock_quantity: Number(stock_quantity),
        image: image_url || null, // Matches Prisma schema field 'image'
      },
    });

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Fetch all products for the frontend shop catalog
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Restock product inventory levels (Admin function)
 */
export const restockProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { quantityToAdd } = req.body;

    const parsedProductId = Number(productId);
    if (!productId || isNaN(parsedProductId)) {
      return res.status(400).json({ error: 'A valid product ID is required' });
    }

    if (!quantityToAdd || quantityToAdd <= 0) {
      return res.status(400).json({ error: 'A valid quantity to add is required' });
    }

    const updatedProduct = await prisma.product.update({
      where: { product_id: parsedProductId },
      data: {
        stock_quantity: {
          increment: Number(quantityToAdd),
        },
      },
    });

    res.status(200).json({
      message: 'Product restocked successfully',
      product: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Calculate total revenue, cost, and net profit from successful orders (Admin dashboard function)
 */
export const calculateProfits = async (req: Request, res: Response) => {
  try {
    const successfulOrders = await prisma.order.findMany({
      where: { status: 'success' },
      include: {
        order_items: {
          include: {
            product: true,
          },
        },
      },
    });

    let totalRevenue = 0;
    let totalCost = 0;

    for (const order of successfulOrders) {
      for (const item of order.order_items) {
        const sellingPrice = Number(item.price_at_purchase);
        const quantity = item.quantity;
        totalRevenue += sellingPrice * quantity;

        const costPrice = Number((item.product as any).cost_price || 0);
        totalCost += costPrice * quantity;
      }
    }

    const netProfit = totalRevenue - totalCost;

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalCost,
        netProfit,
        totalCompletedOrders: successfulOrders.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update order status and trigger automated email updates (e.g., 'ready_for_pickup', 'delivered', 'success')
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; 

    const updatedOrder = await prisma.order.update({
      where: { order_id: Number(orderId) },
      data: { status },
      include: { client: true },
    });

    let subject = 'Order Status Update';
    let message = `<p>Your order status has been updated to: <strong>${status}</strong></p>`;

    if (status === 'success') {
      subject = 'Payment Confirmed - Order Processing';
      message = `<h3>Payment Successful!</h3>
                 <p>We have received your payment for Order #${updatedOrder.order_id}. Your items are now being prepared.</p>`;
    } else if (status === 'ready_for_pickup') {
      subject = 'Your Order is Ready for Pickup!';
      message = `<h3>Good news!</h3>
                 <p>Order #${updatedOrder.order_id} is now available for pickup at our designated location.</p>`;
    } else if (status === 'delivered') {
      subject = 'Order Delivered Successfully';
      message = `<h3>Thank you for shopping with us!</h3>
                 <p>Order #${updatedOrder.order_id} has been marked as delivered.</p>`;
    }

    await sendEmailNotification(updatedOrder.client.email, subject, message);

    res.status(200).json({
      message: 'Order status updated and email notification sent successfully',
      order: updatedOrder,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};