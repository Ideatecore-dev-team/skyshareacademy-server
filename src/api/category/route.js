const express = require("express");
const auth = require("../../middleware/auth");

const controller = require("./controller");

const router = express.Router();
const endpoint = "/category";

// @desc    Create category
// @route   POST /category/add
// @access  Private/admin
router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  controller.create
);

// @desc    Get all category
// @route   GET /category
// @access  Private/admin
router.get(
  `${endpoint}`,
  auth.authenticate,
  auth.isAdmin,
  controller.getAll
);

// @desc    Get category by id
// @route   GET /category/:categoryId
// @access  Private/admin
router.get(
  `${endpoint}/:categoryId`,
  auth.authenticate,
  auth.isAdmin,
  controller.getById
);

// @desc    Update category
// @route   PUT /category/:categoryId
// @access  Private/admin
router.put(
  `${endpoint}/:categoryId`,
  auth.authenticate,
  auth.isAdmin,
  controller.update
);

// @desc    Delete category
// @route   DELETE /category/:categoryId
// @access  Private/admin
router.delete(
  `${endpoint}/:categoryId`,
  auth.authenticate,
  auth.isAdmin,
  controller.remove
);

module.exports = router;
