const express = require("express");
const router = express.Router();
const {
  getAllSymbols,
  getStockProfile,
} = require("../controllers/StockController");
const requireAuth = require("../middleware/requireAuth");

// Authneticate requests
router.use(requireAuth);

// Get all stock ticker symbols
router.get("/all-symbols", getAllSymbols);

// Get a the companies profile based on stock ticker
router.get("/:symbol", getStockProfile);

module.exports = router;
