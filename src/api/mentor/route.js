const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/mentor";

// @desc    Create mentor
// @route   POST /mentor/add
// @access  Private/admin
router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  upload.mentor,
  controller.create
);

// @desc    Get all mentor
// @route   GET /mentor
// @access  Public
router.get(`${endpoint}`, controller.getAll);

// @desc    Update  mentor
// @route   PUT /mentor
// @access  Private/admin
router.put(
  `${endpoint}`,
  auth.authenticate,
  auth.isAdmin,
  upload.mentor,
  controller.update
);

module.exports = router;
