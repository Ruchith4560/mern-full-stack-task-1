// src/routes/productRoutes.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/productController");
const validate = require("../middleware/validate");

// ─── Validation rules ───────────────────────────────────────────────────────
const productValidation = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 chars"),
  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("category")
    .notEmpty().withMessage("Category is required")
    .isIn(["electronics", "clothing", "food", "books", "other"])
    .withMessage("Invalid category"),
  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
];

const patchValidation = [
  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  body("category")
    .optional()
    .isIn(["electronics", "clothing", "food", "books", "other"])
    .withMessage("Invalid category"),
];

// ─── Routes ─────────────────────────────────────────────────────────────────
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", productValidation, validate, createProduct);
router.put("/:id", productValidation, validate, updateProduct);
router.patch("/:id", patchValidation, validate, patchProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
