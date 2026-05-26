// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());                              // allow cross-origin requests
app.use(express.json());                      // parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));                       // HTTP request logger

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 CRUD API is running!",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
    },
  });
});

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use("/api/products", productRoutes);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Central error handler (must be last) ────────────────────────────────────
app.use(errorHandler);

module.exports = app;
