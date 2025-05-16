const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/parent";

// @desc    Create parent
// @route   POST /parent/add
// @access  Private/admin
router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  upload.parent,
  controller.create
);

// @desc    Get all parent
// @route   GET /parent
// @access  Public
router.get(`${endpoint}`, controller.getAll);

// @desc    Update  parent
// @route   PUT /parent
// @access  Private/admin
router.put(
  `${endpoint}`,
  auth.authenticate,
  auth.isAdmin,
  upload.parent,
  controller.update
);

module.exports = router;
