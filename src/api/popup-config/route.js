const express = require("express");
const auth = require("../../middleware/auth");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/popup-config";

// @desc    Get popup configuration
// @route   GET /popup-config
// @access  Public
router.get(`${endpoint}`, controller.get);

// @desc    Update popup configuration
// @route   PUT /popup-config
// @access  Private/admin
router.put(
  `${endpoint}`,
  auth.authenticate,
  auth.isAdmin,
  controller.update
);

module.exports = router;
