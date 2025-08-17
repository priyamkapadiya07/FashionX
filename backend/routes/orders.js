const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Create order
router.post("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Fetch user profile data
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure all required fields have values with fallbacks
    const shippingAddress = {
      fullName: user.name || "Customer",
      email: user.email || "no-email@example.com",
      phone: user.phone || "0000000000",
      address: user.address?.street || "No address provided",
      city: user.address?.city || "No city provided",
      state: user.address?.state || "No state provided",
      zipCode: user.address?.zipCode || "000000",
      country: user.address?.country || "No country provided"
    };

    const order = new Order({
      user: req.user.userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      shippingAddress
    });

    await order.save();
    await Cart.findOneAndDelete({ user: req.user.userId });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate("items.product", "name price images")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Cancel order
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user.userId 
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus !== 'processing') {
      return res.status(400).json({ 
        message: "Order can only be canceled when status is 'processing'" 
      });
    }

    order.orderStatus = 'canceled';
    order.updatedAt = new Date();
    await order.save();

    res.json({ message: "Order canceled successfully", order });
  } catch (error) {
    console.error("Order cancel error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get order by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user.userId 
    }).populate("items.product", "name price images");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
