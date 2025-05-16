const express = require("express");
const auth = require("../../middleware/auth");

const controller = require("./controller");

const router = express.Router();
const endpoint = "/contact";

// @desc    Create category
// @route   POST /contact/add
// @access  Public
router.post(`${endpoint}/add`, controller.create);

// @desc    Get all category
// @route   GET /contact/add
// @access  Private/admin
router.get(
  `${endpoint}`,
  auth.authenticate,
  auth.isAdmin,
  controller.getAll
);

module.exports = router;
