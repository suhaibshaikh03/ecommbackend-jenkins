const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        // Making this optional to prevent validation errors
        // The product info is stored separately in the order anyway
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    selectedSize: { type: String, required: true },
    selectedColor: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [orderItemSchema],
        shippingInfo: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
        },
        subtotal: { type: Number, required: true },
        discount: { type: Number, required: true },
        shippingFee: { type: Number, default: 10 },
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
