const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

// POST /api/orders (protected)
router.post("/", protect, createOrder);

// GET /api/orders/my (protected)
router.get("/my", protect, getMyOrders);

module.exports = router;
