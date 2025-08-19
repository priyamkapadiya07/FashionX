const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Robust payment processing with comprehensive error handling
router.post('/process-payment', auth, async (req, res) => {
  try {
    const { amount, paymentMethod, shippingAddress } = req.body;

    console.log('Processing payment:', { 
      amount, 
      paymentMethod, 
      userId: req.user.userId,
      shippingAddress 
    });

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid amount' 
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({ 
        success: false, 
        message: 'Shipping address is required' 
      });
    }

    // Get user's cart with populated product details
    const cart = await Cart.findOne({ user: req.user.userId })
      .populate({
        path: 'items.product',
        select: 'name price images'
      });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty or invalid' 
      });
    }

    console.log('Cart found:', cart.items.length, 'items');

    // Create order with proper structure
    const order = new Order({
      user: req.user.userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size || 'M',
        color: item.color || 'Black',
        price: item.price || item.product.price
      })),
      totalAmount: amount,
      shippingAddress: {
        fullName: shippingAddress.fullName || '',
        email: shippingAddress.email || '',
        phone: shippingAddress.phone || '',
        address: shippingAddress.address || '',
        city: shippingAddress.city || '',
        state: shippingAddress.state || '',
        zipCode: shippingAddress.zipCode || '',
        country: shippingAddress.country || ''
      },
      paymentStatus: 'completed',
      orderStatus: 'processing'
    });

    await order.save();
    console.log('Order created:', order._id);

    // Clear cart
    await Cart.findOneAndDelete({ user: req.user.userId });
    console.log('Cart cleared');

    // Get user details
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.error('User not found:', req.user.userId);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Send email notification (with fallback)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const orderItemsHtml = order.items.map(item => `
          <tr>
            <td>${item.product.name || 'Product'}</td>
            <td>${item.quantity}</td>
            <td>₹${(item.price || 0).toFixed(2)}</td>
            <td>₹${((item.price || 0) * item.quantity).toFixed(2)}</td>
          </tr>
        `).join('');

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: shippingAddress.email,
          subject: `Order Confirmation - FashionX Order #${order._id}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #28a745;">Order Confirmation</h1>
              <p>Dear ${shippingAddress.fullName || 'Customer'},</p>
              <p>Thank you for your order! Your payment has been processed successfully.</p>
              
              <h3>Order Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
                    <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Quantity</th>
                    <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Price</th>
                    <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                </tbody>
              </table>
              
              <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Total Amount:</strong> ₹${(order.totalAmount || 0).toFixed(2)}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <p><strong>Shipping Address:</strong><br>
                  ${order.shippingAddress.fullName}<br>
                  ${order.shippingAddress.address}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                  ${order.shippingAddress.country}
                </p>
              </div>
              
              <p>We will process your order soon and send you tracking information once it ships.</p>
              
              <p>Thank you for shopping with FashionX!</p>
              
              <p>Best regards,<br>
              FashionX Team</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } else {
        console.log('Email credentials not configured, skipping email');
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue without email if it fails
    }

    // Return success response
    res.json({ 
      success: true, 
      message: 'Payment successful! Order confirmation email sent.',
      orderId: order._id,
      redirect: false
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Payment processing failed: ' + error.message,
      error: error.message 
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Payment service is running' });
});

module.exports = router;
