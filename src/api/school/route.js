const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/school";

// @desc    Create category
// @route   POST /school/add
// @access  Private/admin
router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  upload.school,
  controller.create
);

// @desc    Get all school
// @route   GET /school
// @access  Public
router.get(`${endpoint}`, controller.getAll);

// @desc    Get school by id
// @route   GET /school/:schoolId
// @access  Public
router.get(`${endpoint}/:schoolId`, controller.getById);

// @desc    Update school
// @route   PUT /school/:schoolId
// @access  Private/admin
router.put(
  `${endpoint}/:schoolId`,
  auth.authenticate,
  auth.isAdmin,
  upload.school,
  controller.update
);

// @desc    Delete school
// @route   DELETE /school/:schoolId
// @access  Private/admin
router.delete(
  `${endpoint}/:schoolId`,
  auth.authenticate,
  auth.isAdmin,
  controller.remove
);

module.exports = router;
