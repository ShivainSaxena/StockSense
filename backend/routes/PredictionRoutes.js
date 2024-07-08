const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const PredictTickerPrice = require("../controllers/PredictionController");

// Authenticate requests
router.use(requireAuth);

// Predict price of stock with specified ticker symbol
router.get("/:ticker", PredictTickerPrice);

module.exports = router;
