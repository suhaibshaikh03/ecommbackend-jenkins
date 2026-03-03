const express = require("express");
require("dotenv").config();
const cors = require("cors");
const DBconnection = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://main.d2nqpdh1lkjybd.amplifyapp.com"
    ],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
DBconnection();

// Routes
app.get("/", (req, res) => {
    res.send("E-Commerce Backend API is running Suhaib!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
