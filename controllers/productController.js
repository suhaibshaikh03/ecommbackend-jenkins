const Product = require("../models/productModel");

// @desc    Get all products (with optional filtering, search, and sort)
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = {};

        // Filter by category
        if (category && category !== "all") {
            query.category = category;
        }

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Build sort options
        let sortOptions = {};
        switch (sort) {
            case "asc":
                sortOptions.price = 1;
                break;
            case "desc":
                sortOptions.price = -1;
                break;
            case "oldest":
                sortOptions.createdAt = 1;
                break;
            case "newest":
            default:
                sortOptions.createdAt = -1;
                break;
        }

        const products = await Product.find(query).sort(sortOptions);

        // Convert Mongoose Map to plain object for frontend compatibility
        const formattedProducts = products.map((product) => {
            const productObj = product.toObject();
            if (productObj.images instanceof Map) {
                productObj.images = Object.fromEntries(productObj.images);
            }
            return productObj;
        });

        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productObj = product.toObject();
        if (productObj.images instanceof Map) {
            productObj.images = Object.fromEntries(productObj.images);
        }

        res.json(productObj);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getProducts, getProductById };
