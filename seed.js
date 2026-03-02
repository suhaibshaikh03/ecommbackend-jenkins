const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/productModel");

const products = [
    {
        name: "Adidas CoreFit T-Shirt",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 39.9,
        sizes: ["s", "m", "l", "xl", "xxl"],
        colors: ["gray", "purple", "green"],
        images: {
            gray: "/products/1g.png",
            purple: "/products/1p.png",
            green: "/products/1gr.png",
        },
        category: "t-shirts",
    },
    {
        name: "Puma Ultra Warm Zip",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 59.9,
        sizes: ["s", "m", "l", "xl"],
        colors: ["gray", "green"],
        images: { gray: "/products/2g.png", green: "/products/2gr.png" },
        category: "jackets",
    },
    {
        name: "Nike Air Essentials Pullover",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 69.9,
        sizes: ["s", "m", "l"],
        colors: ["green", "blue", "black"],
        images: {
            green: "/products/3gr.png",
            blue: "/products/3b.png",
            black: "/products/3bl.png",
        },
        category: "jackets",
    },
    {
        name: "Nike Dri Flex T-Shirt",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 29.9,
        sizes: ["s", "m", "l"],
        colors: ["white", "pink"],
        images: { white: "/products/4w.png", pink: "/products/4p.png" },
        category: "t-shirts",
    },
    {
        name: "Under Armour StormFleece",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 49.9,
        sizes: ["s", "m", "l"],
        colors: ["red", "orange", "black"],
        images: {
            red: "/products/5r.png",
            orange: "/products/5o.png",
            black: "/products/5bl.png",
        },
        category: "jackets",
    },
    {
        name: "Nike Air Max 270",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 59.9,
        sizes: ["40", "42", "43", "44"],
        colors: ["gray", "white"],
        images: { gray: "/products/6g.png", white: "/products/6w.png" },
        category: "shoes",
    },
    {
        name: "Nike Ultraboost Pulse",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 69.9,
        sizes: ["40", "42", "43"],
        colors: ["gray", "pink"],
        images: { gray: "/products/7g.png", pink: "/products/7p.png" },
        category: "shoes",
    },
    {
        name: "Levi's Classic Denim",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 59.9,
        sizes: ["s", "m", "l"],
        colors: ["blue", "green"],
        images: { blue: "/products/8b.png", green: "/products/8gr.png" },
        category: "dresses",
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("MongoDB Connected for seeding...");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Existing products cleared.");

        // Insert new products
        const createdProducts = await Product.insertMany(products);
        console.log(`${createdProducts.length} products seeded successfully!`);

        // Log product IDs for reference
        createdProducts.forEach((p) => {
            console.log(`  - ${p.name}: ${p._id}`);
        });

        await mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedProducts();
