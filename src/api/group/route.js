const express = require("express");
const auth = require("../../middleware/auth");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/group";

// @desc    Create group
// @route   POST /group/add
// @access  Private/admin
router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  controller.create
);

// @desc    Get all group
// @route   GET /group
// @access  Public
router.get(`${endpoint}`, controller.getAll);

// @desc    Get group by id
// @route   GET /group/:groupId
// @access  Public
router.get(`${endpoint}/:groupId`, controller.getById);

// @desc    Update group
// @route   PUT /group/:groupId
// @access  Private/admin
router.put(
  `${endpoint}/:groupId`,
  auth.authenticate,
  auth.isAdmin,
  controller.update
);

// @desc    Delete group
// @route   DELETE /group/:groupId
// @access  Private/admin
router.delete(
  `${endpoint}/:groupId`,
  auth.authenticate,
  auth.isAdmin,
  controller.remove
);

// @desc    Get group by school_id
// @route   GET /group/school/:schoolId
// @access  Public
router.get(`${endpoint}/school/:schoolId`, controller.getGroupBySchoolId);

module.exports = router;
