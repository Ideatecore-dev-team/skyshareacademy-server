const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/talent";

// @desc    Create talent
// @route   POST /talent/add
// @access  Private/admin
router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  upload.talent,
  controller.create
);

// @desc    Get all talent
// @route   GET /talent
// @access  Public
router.get(`${endpoint}`, controller.getAll);

// @desc    Update  talent
// @route   PUT /talent
// @access  Private/admin
router.put(
  `${endpoint}`,
  auth.authenticate,
  auth.isAdmin,
  upload.talent,
  controller.update
);

module.exports = router;
