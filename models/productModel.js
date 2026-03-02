const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        shortDescription: {
            type: String,
            required: [true, "Short description is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: 0,
        },
        sizes: {
            type: [String],
            required: true,
        },
        colors: {
            type: [String],
            required: true,
        },
        images: {
            type: Map,
            of: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "all",
                "t-shirts",
                "shoes",
                "accessories",
                "bags",
                "dresses",
                "jackets",
                "gloves",
            ],
            default: "all",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
