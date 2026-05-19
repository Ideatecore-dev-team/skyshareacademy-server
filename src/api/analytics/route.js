const express = require("express");
const auth = require("../../middleware/auth");
const controller = require("./controller");

const router = express.Router();

// Public route to log page hits & performance metrics from the main client site
router.post("/analytics/track", controller.trackPageView);

// Admin-only route to retrieve aggregated visitor charts & core web vitals speed performance
router.get(
  "/analytics/dashboard",
  auth.authenticate,
  auth.isAdmin,
  controller.getAnalyticsDashboard
);

module.exports = router;
