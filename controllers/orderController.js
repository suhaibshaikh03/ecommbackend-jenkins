const Order = require("../models/orderModel");

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("User:", req.user);
        
        const { items, shippingInfo } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items provided" });
        }

        if (!shippingInfo) {
            return res
                .status(400)
                .json({ message: "Shipping information is required" });
        }

        // Validate shippingInfo fields
        if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
            return res.status(400).json({ message: "All shipping information fields are required" });
        }

        // Calculate totals
        const subtotal = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const discount = subtotal * 0.1; // 10% discount as per frontend
        const shippingFee = 10; // As per frontend
        const totalAmount = subtotal - discount + shippingFee;

        console.log("Creating order with data:", {
            userId: req.user._id,
            itemsCount: items.length,
            shippingInfo,
            subtotal,
            discount,
            shippingFee,
            totalAmount
        });

        const orderData = {
            user: req.user._id,
            items,
            shippingInfo,
            subtotal,
            discount,
            shippingFee,
            totalAmount,
        };
        
        console.log("About to create order with data:", orderData);
        
        const order = await Order.create(orderData);

        res.status(201).json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        // Check if it's a validation error
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1,
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createOrder, getMyOrders };
