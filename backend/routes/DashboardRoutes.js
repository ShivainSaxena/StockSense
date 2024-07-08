const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getDashboardStocksData,
  addDashboardStock,
  deleteDashboardStock,
} = require("../controllers/DashboardController");

// Authneticate requests
router.use(requireAuth);

// Retrieve all information for stocks saved in dashboard
router.get("/", getDashboardStocksData);

// Create a new stock in dashboard
router.post("/", addDashboardStock);

// Delete stock from dashboard
router.delete("/", deleteDashboardStock);

module.exports = router;
